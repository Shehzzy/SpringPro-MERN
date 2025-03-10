import React, { useState } from "react";
import axios from "axios";
import luhn from 'luhn-generator';

function IMEIForm({
  onSecurityCheck,
  shippingInfos,
  carrierInfos,
  onAccountFieldsChange, // Receive the callback function
}) {
  const token = localStorage.getItem("jwt_token");
  const [error, setError] = useState({
    isValidError: "",
    isInvalidError: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [numRows, setNumRows] = useState(0);
  const [accountFields, setAccountFields] = useState([]);
  const [phoneDetails, setPhoneDetails] = useState(null);
  const fetchPhoneDetails = async (tac) => {
    setError({
      isValidError: "",
      isInvalidError: "",
    });
    console.log("Fetching phone details for TAC:", tac);

    try {
      const response = await axios.get(
        `https://springprobackend-production.up.railway.app/api/order/tac-lookup/${tac}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        // setError("Invalid IMEI number");
        setError({
          isValidError: "",
          isInvalidError: "Invalid IMEI number",
        });
        onSecurityCheck(false);
        return;
      }

      const data = response.data;
      setPhoneDetails({
        model: data.device.model || "Unknown Model",
        name: data.device.name || "Unknown Name",
        brand: data.device.brand || "Unknown Brand"
      });
    } catch (error) {
      // setError("Invalid IMEI number");
      setError({
        isValidError: "",
        isInvalidError: "Invalid IMEI number",
      });
      console.error("Error fetching TAC details:", error);
    }
  };

  const validateIMEI = (imei) => {
    imei = imei.replace(/\D/g, '');
    if (imei.length !== 15) {
      // setError("IMEI must be 15 digits");
      setError({
        isValidError: "",
        isInvalidError: "IMEI must be 15 digits",
      });

      onSecurityCheck(false);
      return false;
    }
    const isValid = luhn.validate(imei);
    if (!isValid) {
      // setError("Invalid IMEI");
      setError({
        isValidError: "",
        isInvalidError: "Invalid IMEI",
      });
    }
    setError({
      isValidError: "IMEI is Valid!",
      isInvalidError: "",
    });
    return isValid;
  };

  const handleIMEIChange = async (e) => {
    e.preventDefault();
    const imei = e.target.value.trim();
    console.log("IMEI entered:", imei);

    // Reset error state if IMEI is empty
    if (imei === "") {
      setError({
        isValidError: "",
        isInvalidError: "",
      });
      setPhoneDetails(null);
      setSecurityCheckStatus({
        blacklist: null,
        findMyiPhone: null,
        iCloudLock: null
      });
      onSecurityCheck(true); // Reset security check status
      return;
    }

    if (!validateIMEI(imei)) {
      setPhoneDetails(null);
      return;
    }

    const tac = imei.substring(0, 8);
    console.log("Valid IMEI, TAC extracted:", tac);
    await fetchPhoneDetails(tac);

    // Run Luhn check again on full IMEI
    if (!validateIMEI(imei)) {
      setPhoneDetails(null);
      return;
    }

    // Check blacklist status
    await checkBlacklist(imei, onSecurityCheck);
  };

  const [securityCheckStatus, setSecurityCheckStatus] = useState({
    blacklist: null,
    findMyiPhone: null,
    iCloudLock: null
  });


  //  This is 3 retries code 
  // const fetchWithRetries = async (url, retries = 3, delay = 1000) => {
  //   for (let attempt = 1; attempt <= retries; attempt++) {
  //     try {
  //       const response = await axios.get(url);

  //       // Check if response contains valid JSON structure
  //       if (!response.data || typeof response.data !== "object") {
  //         throw new Error("Malformed JSON response");
  //       }

  //       return response.data;
  //     } catch (error) {
  //       console.error(`API request failed (Attempt ${attempt}):`, error.message);

  //       if (attempt === retries) {
  //         throw new Error("Max retries reached. API request failed.");
  //       }

  //       await new Promise((resolve) => setTimeout(resolve, delay * attempt)); // Exponential backoff
  //     }
  //   }
  // };


  // const checkBlacklist = async (imei, onSecurityCheck) => {
  //   try {
  //     console.log("Checking blacklist for IMEI:", imei);

  //     const url = `https://alpha.imeicheck.com/api/php-api/create?key=${process.env.REACT_APP_API_KEY}&service=5&imei=${imei}`;
  //     const data = await fetchWithRetries(url); // ✅ Use retry function

  //     const blacklistStatus = data?.object?.blacklistStatus;
  //     const brand = data?.object?.brand;

  //     if (!data || !data.object) {
  //       throw new Error("Invalid JSON response. Re-fetching data...");
  //     }

  //     if (blacklistStatus) {
  //       setError("Device is blacklisted.");
  //       setSecurityCheckStatus((prev) => ({ ...prev, blacklist: "Failed" }));
  //       onSecurityCheck(false); // ✅ Block form submission
  //       return;
  //     }

  //     setSecurityCheckStatus((prev) => ({ ...prev, blacklist: "Passed" }));

  //     if (brand === "Apple") {
  //       await checkFindMyiPhone(imei, onSecurityCheck);
  //     } else {
  //       onSecurityCheck(true); // ✅ Allow form submission if no further checks
  //     }
  //   } catch (error) {
  //     console.error("Blacklist API error:", error);
  //     setError("Blacklist check failed. Please verify manually.");
  //     onSecurityCheck(true); // ✅ Allow cautious processing
  //   }
  // };


  // const checkFindMyiPhone = async (imei, onSecurityCheck) => {
  //   try {
  //     console.log("Checking Find My iPhone for IMEI:", imei);

  //     const url = `https://alpha.imeicheck.com/api/php-api/create?key=${process.env.REACT_APP_API_KEY}&service=1&imei=${imei}`;
  //     const data = await fetchWithRetries(url); // ✅ Use retry function

  //     const fmiEnabled = data?.object?.fmiOn || data?.object?.fmiON;

  //     if (!data || !data.object) {
  //       throw new Error("Invalid JSON response. Re-fetching data...");
  //     }

  //     if (fmiEnabled) {
  //       setError("Find My iPhone is enabled. Cannot proceed.");
  //       setSecurityCheckStatus((prev) => ({ ...prev, findMyiPhone: "Failed" }));
  //       onSecurityCheck(false); // ✅ Block form submission
  //       return;
  //     }

  //     setSecurityCheckStatus((prev) => ({ ...prev, findMyiPhone: "Passed" }));

  //     await checkiCloudLock(imei, onSecurityCheck);
  //   } catch (error) {
  //     console.error("Error checking Find My iPhone status:", error);
  //     setError("Could not verify Find My iPhone status.");
  //     onSecurityCheck(false); // Block form submission
  //   }
  // };


  // const checkiCloudLock = async (imei, onSecurityCheck) => {
  //   try {
  //     console.log("Checking iCloud Lock for IMEI:", imei);

  //     const url = `https://alpha.imeicheck.com/api/php-api/create?key=${process.env.REACT_APP_API_KEY}&service=4&imei=${imei}`;
  //     const data = await fetchWithRetries(url); // Use retry function

  //     const iCloudLocked = data?.object?.lostMode;

  //     if (!data || !data.object) {
  //       throw new Error("Invalid JSON response. Re-fetching data...");
  //     }

  //     if (iCloudLocked) {
  //       setError("Device is iCloud locked. Cannot proceed.");
  //       setSecurityCheckStatus((prev) => ({ ...prev, iCloudLock: "Failed" }));
  //       onSecurityCheck(false); //Block form submission
  //       return;
  //     }

  //     setSecurityCheckStatus((prev) => ({ ...prev, iCloudLock: "Passed" }));

  //     console.log("Device passed all security checks.");
  //     onSecurityCheck(true); // Allow form submission
  //   } catch (error) {
  //     console.error("Error checking iCloud lock status:", error);
  //     setError("Could not verify iCloud lock status.");
  //     onSecurityCheck(false); // Block form submission
  //   }
  // };


  // Current APIS = work perfectly
  const checkBlacklist = async (imei, onSecurityCheck) => {
    try {
      console.log("Checking blacklist for IMEI:", imei);

      const response = await axios.get(
        `https://alpha.imeicheck.com/api/php-api/create?key=${process.env.REACT_APP_API_KEY}&service=5&imei=${imei}`
      );
      console.log("Blacklist API Response:", response.data);

      const blacklistStatus = response.data?.object?.blacklistStatus;
      const brand = response.data?.object?.brand;

      if (blacklistStatus) {
        // setError("Device is blacklisted.");
        setError({
          isInvalidError: "Device is blacklisted",
          isValidError: "",
        })
        setSecurityCheckStatus((prev) => ({ ...prev, blacklist: "Failed" }));
        onSecurityCheck(false); // Block form submission
        return;
      }
      setSecurityCheckStatus((prev) => ({ ...prev, blacklist: "Passed" }));

      if (brand === "Apple") {
        await checkFindMyiPhone(imei, onSecurityCheck);
      } else {
        onSecurityCheck(true); // Allow form submission if no further checks
      }
    } catch (error) {
      console.error("Error checking blacklist:", error);
      // setError("Could not verify blacklist status.");
      setError({
        isValidError: "",
        isInValidError: "Could not verify blacklist status",
      })
      onSecurityCheck(false); // Block form submission
    }
  };

  const checkFindMyiPhone = async (imei, onSecurityCheck) => {
    try {
      console.log("Checking Find My iPhone for IMEI:", imei);

      const response = await axios.get(
        `https://alpha.imeicheck.com/api/php-api/create?key=${process.env.REACT_APP_API_KEY}&service=1&imei=${imei}`
      );
      console.log("Find My iPhone API Response:", response.data);

      const fmiEnabled = response.data?.object?.fmiOn || response.data?.object?.fmiON;

      if (fmiEnabled) {
        // setError("Find My iPhone is enabled. Cannot proceed.");
        setError({
          isValidError: "",
          isInvalidError: "Find My iPhone is enabled. Cannot proceed",
        })
        setSecurityCheckStatus((prev) => ({ ...prev, findMyiPhone: "Failed" }));
        onSecurityCheck(false); // Block form submission
        return;
      }
      setSecurityCheckStatus((prev) => ({ ...prev, findMyiPhone: "Passed" }));

      await checkiCloudLock(imei, onSecurityCheck);
    } catch (error) {
      console.error("Error checking Find My iPhone status:", error);
      // setError("Could not verify Find My iPhone status.");
      setError({
        isValidError: "",
        isInvalidError: "Could not verify Find My iPhone status",
      });
      onSecurityCheck(false); // Block form submission
    }
  };

  const checkiCloudLock = async (imei, onSecurityCheck) => {
    try {
      console.log("Checking iCloud Lock for IMEI:", imei);

      const response = await axios.get(
        `https://alpha.imeicheck.com/api/php-api/create?key=${process.env.REACT_APP_API_KEY}&service=4&imei=${imei}`
      );
      console.log("iCloud Lock API Response:", response.data);

      const iCloudLocked = response.data?.object?.lostMode;

      if (iCloudLocked) {
        // setError("Device is iCloud locked. Cannot proceed.");
        setError({
          isValidError: "",
          isInvalidError: "Device is iCloud locked. Cannot proceed",
        });
        setSecurityCheckStatus((prev) => ({ ...prev, iCloudLock: "Failed" }));
        onSecurityCheck(false); // Block form submission
        return;
      }
      setSecurityCheckStatus((prev) => ({ ...prev, iCloudLock: "Passed" }));

      console.log("Device passed all security checks.");
      onSecurityCheck(true); // Allow form submission
    } catch (error) {
      console.error("Error checking iCloud lock status:", error);
      // setError("Could not verify iCloud lock status.");
      setError({
        isValidError: "",
        isInvalidError: "Could not verify iCloud lock status",
      });
      onSecurityCheck(false); // Block form submission
    }
  };


  const handleNumRowsChange = (e) => {
    const value = e.target.value;
    const parsedValue = /^\d*$/.test(value) ? value : "1";
    setNumRows(parsedValue);

    const newFields = Array.from({ length: value }, () => ({
      portOutPin: "",
      phoneNumber: "",
      carrier: "",
      imei: "",
      shippingAddress: "",
      tradeSmartphone: false,
      purchaseSmartphone: false,
      buyPhoneNumber: false,
    }));
    setAccountFields(newFields);
  };

  // const handleFieldChange = (index, field, value) => {
  //   const updatedAccounts = [...accountFields];
  //   updatedAccounts[index][field] = value;
  //   setAccountFields(updatedAccounts);

  //   // Send the updated accountFields back to the parent
  //   onAccountFieldsChange(updatedAccounts);
  // };


  const handleFieldChange = (index, field, value) => {
    const updatedAccounts = [...accountFields];

    if (field === "shippingAddress") {
      // If the field is shippingAddress, update the entire shippingAddress object
      updatedAccounts[index].shippingAddress = value;
    } else if (field === "carrier") {
      // If the field is carrier, update the carrier and pre-fill the phone number
      const selectedCarrier = carrierInfos.find(
        (carrier) => carrier.uniqueCode === value
      );

      if (selectedCarrier) {
        updatedAccounts[index].carrier = value; // Update the carrier
        updatedAccounts[index].phoneNumber = selectedCarrier.phonenumber || ""; // Pre-fill the phone number
      }
    } else {
      // Otherwise, update the specific field
      updatedAccounts[index][field] = value;
    }

    setAccountFields(updatedAccounts);

    // Send the updated accountFields back to the parent
    onAccountFieldsChange(updatedAccounts);
  };


  const handleTradeSmartphoneChange = (index, value) => {
    debugger;
    const updatedAccounts = [...accountFields];
    updatedAccounts[index].tradeSmartphone = value === "trade";
    if (value === "trade") {
      updatedAccounts[index].purchaseSmartphone = true;
    }
    setAccountFields(updatedAccounts);
  };

  const handlePurchaseSmartphoneChange = (index, value) => {
    debugger;
    const updatedAccounts = [...accountFields];
    updatedAccounts[index].purchaseSmartphone = value === "purchase";
    setAccountFields(updatedAccounts);
  };

  const handleModalOpen = () => {
    if (accountFields.length === 0) {
      const initialFields = Array.from({ length: numRows }, () => ({
        portOutPin: "",
        phoneNumber: "",
        carrier: "",
        imei: "",
        shippingAddress: "",
        tradeSmartphone: false,
        purchaseSmartphone: false,
        buyPhoneNumber: false,
      }));
      setAccountFields(initialFields);
    }
    setShowModal(true);
  };

  const handleAddNewRow = () => {
    setAccountFields([
      ...accountFields,
      {
        portOutPin: "",
        phoneNumber: "",
        carrier: "",
        imei: "",
        shippingAddress: "",
        tradeSmartphone: false,
        purchaseSmartphone: false,
        buyPhoneNumber: false,
      },
    ]);
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-4 mb-4">
        <input
          type="text"
          value={numRows}
          onChange={handleNumRowsChange}
          className="border inter border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 w-20 sm:w-40"
        />
        <button
          onClick={handleModalOpen}
          type="button"
          style={{
            background:
              "linear-gradient(90deg, rgba(65 ,253 ,254) 0%, rgba(0,210,255,1) 100%)",
          }}
          className="text-white px-6 py-2 rounded font-bold inter"
        >
          Generate
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-20">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 p-6 relative z-60 max-h-[80vh] overflow-y-auto">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black z-10"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            <h2 className="text-3xl font-bold text-center mb-6 inter">
              Add IMEI and Account Information
            </h2>

            <div className="mt-6">
              {accountFields.map((account, index) => (
                <div key={index} className="space-y-4 mb-8 p-6 bg-gray-50 rounded-lg shadow-sm">
                  <div className="flex justify-between mt-4">
                    <h3 className="text-2xl font-bold text-center inter">
                      {index === 0 ? "Add Details" : `Add Details ${index + 1}`}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 px-3 py-3 rounded" style={{
                    background:
                      "linear-gradient(90deg, rgba(65 ,253 ,254) 0%, rgba(0,210,255,1) 100%)",
                  }}>
                    <div>
                      <label className="block inter text-sm font-medium text-gray-700 mb-2">Purchase Smart Phone?</label>
                      <select
                        className="w-full inter text-sm p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                        value={account.purchaseSmartphone ? "purchase" : "nopurchase"}
                        onChange={(e) => handlePurchaseSmartphoneChange(index, e.target.value)}
                        disabled={account.tradeSmartphone}
                      >
                        <option value="purchase">I Want to Purchase Smartphone</option>
                        <option value="nopurchase">Bring Your Own Phone</option>
                      </select>
                    </div>

                    <div>
                      <label className="block inter text-sm font-medium text-gray-700 mb-2">Trade Smart Phone?</label>
                      <select
                        className="w-full inter text-sm p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                        value={account.tradeSmartphone ? "trade" : "notrade"}
                        onChange={(e) => handleTradeSmartphoneChange(index, e.target.value)}
                      >
                        <option value="trade">I Want to Trade Smartphone</option>
                        <option value="notrade">Bring Your Own Phone</option>
                      </select>
                    </div>

                    <div>
                      <label className="block inter text-sm font-medium text-gray-700 mb-2">Are You Porting New Phone Number?</label>
                      <select
                        className="w-full inter text-sm p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                        value={account.buyPhoneNumber ? "true" : "false"}
                        onChange={(e) =>
                          handleFieldChange(index, "buyPhoneNumber", e.target.value === "true")
                        }
                      >
                        <option value="true">Buying New Phone Number</option>
                        <option value="false">Not Porting</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <label className="block inter text-sm font-medium text-gray-700 mb-2">Port Out PIN</label>
                      <input
                        type="text"
                        placeholder="Enter Port Out PIN"
                        value={account.portOutPin}
                        onChange={(e) =>
                          handleFieldChange(index, "portOutPin", e.target.value)
                        }
                        className="w-full inter text-sm p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                      />
                    </div>
                    {!account.buyPhoneNumber && (

                      <div>
                        <label className="block inter text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="text"
                          placeholder="Enter Phone Number"
                          value={account.phoneNumber}
                          onChange={(e) => handleFieldChange(index, "phoneNumber", e.target.value)}
                          className="w-full inter text-sm p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                      </div>
                    )}

                    {(account.tradeSmartphone && account.purchaseSmartphone) ||
                      (!account.tradeSmartphone && !account.purchaseSmartphone) ? (
                      <div>
                        <label className="block inter text-sm font-medium text-gray-700 mb-2">IMEI Number</label>
                        <input
                          type="text"
                          placeholder="Enter IMEI Number"
                          value={account.imei}
                          maxLength={15} // Restricts input length
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                            handleFieldChange(index, "imei", value);
                          }}
                          onBlur={(e) => handleIMEIChange(e)}
                          className="w-full inter text-sm p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />

                        <p className={error.isValidError ? "text-green-500" : "text-danger"}>
                          {error.isValidError || error.isInvalidError}
                        </p>
                      </div>
                    ) : null}
                  </div>

                  {error.isValidError !== "" && error.isInvalidError === "" && (
                    <div className="bg-white shadow-md rounded-lg p-4 mt-4 border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">Phone Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col items-center p-3 bg-gray-100 rounded-lg">
                          <span className="text-gray-500 text-sm">Brand</span>
                          <span className="text-lg font-semibold text-gray-700">{phoneDetails.brand || "Unknown"}</span>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-gray-100 rounded-lg">
                          <span className="text-gray-500 text-sm">Model</span>
                          <span className="text-lg font-semibold text-gray-700">{phoneDetails.model || "Unknown"}</span>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-gray-100 rounded-lg">
                          <span className="text-gray-500 text-sm">Name</span>
                          <span className="text-lg font-semibold text-gray-700">{phoneDetails.name || "Unknown"}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block inter text-sm font-medium text-gray-700 mb-2">Carrier</label>
                      <select
                        value={account.carrier}
                        onChange={(e) => handleFieldChange(index, "carrier", e.target.value)}
                        className="w-full inter text-sm p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                      >
                        <option value="">Select Carrier</option>
                        {carrierInfos.length > 0 && carrierInfos.some(carrier => carrier.uniqueCode) ? (
                          carrierInfos.map((carrier, idx) =>
                            carrier.uniqueCode && (
                              <option key={idx} value={carrier.uniqueCode}>
                                {carrier.currentwirelesscarrier} - {carrier.uniqueCode}
                              </option>
                            )
                          )
                        ) : (
                          <option disabled>No options available</option>
                        )}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Address</label>
                      <select
                        value={account.shippingAddress.uniqueCode} // Save only the uniqueCode
                        onChange={(e) => {
                          const selectedAddress = shippingInfos.find(
                            (info) => info.uniqueCode === e.target.value
                          );
                          handleFieldChange(index, "shippingAddress", selectedAddress || {
                            attentionName: "",
                            shippingaddress: "",
                            shippingcity: "",
                            shippingstate: "",
                            shippingzip: "",
                            uniqueCode: "", // Ensure uniqueCode is part of the shippingAddress object
                          });
                        }}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      >
                        <option value="">Select Shipping Address</option>
                        {shippingInfos.map((info, idx) => (
                          <option key={idx} value={info.uniqueCode}>
                            {info.attentionname} - {info.uniqueCode} {/* Display both attentionname and uniqueCode */}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-10">
              <button
                type="button"
                onClick={handleAddNewRow}
                style={{
                  background:
                    "linear-gradient(90deg, rgba(65 ,253 ,254) 0%, rgba(0,210,255,1) 100%)",
                }}
                className="text-white px-6 py-2 rounded inter font-bold"
              >
                Add New
              </button>
            </div>
            {securityCheckStatus.blacklist && (
              <div className={`p-2 mt-2 text-sm font-bold rounded ${securityCheckStatus.blacklist === "Passed" ? "bg-green-100 text-green-700" : "bg-danger text-white"}`}>
                Blacklist Check: {securityCheckStatus.blacklist}
              </div>
            )}

            {securityCheckStatus.findMyiPhone && (
              <div className={`p-2 mt-2 text-sm font-bold rounded ${securityCheckStatus.findMyiPhone === "Passed" ? "bg-green-100 text-green-700" : "bg-danger text-white"}`}>
                Find My iPhone: {securityCheckStatus.findMyiPhone}
              </div>
            )}

            {securityCheckStatus.iCloudLock && (
              <div className={`p-2 mt-2 text-sm font-bold rounded ${securityCheckStatus.iCloudLock === "Passed" ? "bg-green-100 text-green-700" : "bg-danger text-white"}`}>
                iCloud Lock: {securityCheckStatus.iCloudLock}
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

export default IMEIForm;