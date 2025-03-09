
import React, { useState, useEffect } from "react";
import axios from "axios";
import luhn from "luhn-generator";

function IMEIForm({
  onSecurityCheck,
  shippingInfos,
  carrierInfos,
  onAccountFieldsChange,
  initialAccountFields, // Receive initial data
}) {
  const token = localStorage.getItem("jwt_token");
  const [error, setError] = useState({ isValidError: "", isInvalidError: "" });
  const [phoneDetails, setPhoneDetails] = useState(null);
  const [accountFields, setAccountFields] = useState(initialAccountFields || []);


  // Sync accountFields with initialAccountFields
  useEffect(() => {
    if (initialAccountFields) {
      setAccountFields(initialAccountFields);
    } else {
      // Initialize with a default row if initialAccountFields is not provided
      setAccountFields([
        {
          portOutPin: "",
          phoneNumber: "",
          carrier: "",
          imei: "",
          buyPhoneNumber: false,
          tradeSmartphone: false,
          purchaseSmartphone: false,
          shippingAddress: { attentionname: "", shippingaddress: "", shippingcity: "", shippingstate: "", shippingzip: "" },
        },
      ]);
    }
  }, [initialAccountFields]);

  const [securityCheckStatus, setSecurityCheckStatus] = useState({
    blacklist: null,
    findMyiPhone: null,
    iCloudLock: null,
  });

  const fetchPhoneDetails = async (tac) => {
    setError({ isValidError: "", isInvalidError: "" });
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

      if (response.status === 200) {
        const data = response.data;
        setPhoneDetails({
          model: data.device.model || "Unknown Model",
          name: data.device.name || "Unknown Name",
          brand: data.device.brand || "Unknown Brand",
        });
      } else {
        setError({ isInvalidError: "Invalid IMEI number" });
        onSecurityCheck(false);
      }
    } catch (error) {
      setError({ isInvalidError: "Error fetching TAC details" });
    }
  };

  const validateIMEI = (imei) => {
    imei = imei.replace(/\D/g, "");
    if (imei.length !== 15) {
      setError({ isInvalidError: "IMEI must be 15 digits" });
      onSecurityCheck(false);
      return false;
    }
    const isValid = luhn.validate(imei);
    if (!isValid) {
      setError({ isInvalidError: "Invalid IMEI" });
    } else {
      setError({ isValidError: "IMEI is Valid!" });
    }
    return isValid;
  };

  const handleIMEIChange = async (e) => {
    e.preventDefault();
    const imei = e.target.value.trim();
    if (imei === "") {
      setError({ isValidError: "", isInvalidError: "" });
      setPhoneDetails(null);
      onSecurityCheck(true);
      return;
    }

    if (!validateIMEI(imei)) {
      setPhoneDetails(null);
      return;
    }

    const tac = imei.substring(0, 8);
    await fetchPhoneDetails(tac);
    await checkBlacklist(imei, onSecurityCheck);
  };

  const checkBlacklist = async (imei, onSecurityCheck) => {
    try {
      const response = await axios.get(
        `https://alpha.imeicheck.com/api/php-api/create?key=${process.env.REACT_APP_API_KEY}&service=5&imei=${imei}`
      );

      const blacklistStatus = response.data?.object?.blacklistStatus;
      const brand = response.data?.object?.brand;

      if (blacklistStatus) {
        setError({ isInvalidError: "Device is blacklisted" });
        onSecurityCheck(false);
        return;
      }
      if (brand === "Apple") {
        await checkFindMyiPhone(imei, onSecurityCheck);
      } else {
        onSecurityCheck(true);
      }
    } catch (error) {
      setError({ isInvalidError: "Could not verify blacklist status" });
      onSecurityCheck(false);
    }
  };

  const checkFindMyiPhone = async (imei, onSecurityCheck) => {
    try {
      const response = await axios.get(
        `https://alpha.imeicheck.com/api/php-api/create?key=${process.env.REACT_APP_API_KEY}&service=1&imei=${imei}`
      );

      const fmiEnabled = response.data?.object?.fmiOn || response.data?.object?.fmiON;

      if (fmiEnabled) {
        setError({ isInvalidError: "Find My iPhone is enabled. Cannot proceed" });
        onSecurityCheck(false);
        return;
      }
      await checkiCloudLock(imei, onSecurityCheck);
    } catch (error) {
      setError({ isInvalidError: "Could not verify Find My iPhone status" });
      onSecurityCheck(false);
    }
  };

  const checkiCloudLock = async (imei, onSecurityCheck) => {
    try {
      const response = await axios.get(
        `https://alpha.imeicheck.com/api/php-api/create?key=${process.env.REACT_APP_API_KEY}&service=4&imei=${imei}`
      );

      const iCloudLocked = response.data?.object?.lostMode;

      if (iCloudLocked) {
        setError({ isInvalidError: "Device is iCloud locked. Cannot proceed" });
        onSecurityCheck(false);
        return;
      }
      onSecurityCheck(true);
    } catch (error) {
      setError({ isInvalidError: "Could not verify iCloud lock status" });
      onSecurityCheck(false);
    }
  };


  // Function to handle changes in accountFields
  //  const handleFieldChange = (index, field, value) => {
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
    } else {
      // Otherwise, update the specific field
      updatedAccounts[index][field] = value;
    }

    setAccountFields(updatedAccounts);

    // Send the updated accountFields back to the parent
    onAccountFieldsChange(updatedAccounts);
  };



  const handleTradeSmartphoneChange = (index, value) => {
    const updatedAccounts = [...accountFields];
    updatedAccounts[index].tradeSmartphone = value === "trade";

    // If "Trade Smartphone" is selected, automatically enable "Purchase Smartphone"
    if (value === "trade") {
      updatedAccounts[index].purchaseSmartphone = true;
    }

    setAccountFields(updatedAccounts);
  };

  const handlePurchaseSmartphoneChange = (index, value) => {
    const updatedAccounts = [...accountFields];
    updatedAccounts[index].purchaseSmartphone = value === "purchase";
    setAccountFields(updatedAccounts);
  };

  const handleAddNewRow = () => {
    setAccountFields([
      ...accountFields,
      {
        portOutPin: "",
        phoneNumber: "",
        carrier: "",
        imei: "",
        buyPhoneNumber: false,
        tradeSmartphone: false,
        purchaseSmartphone: false,
        shippingAddress: { attentionname: "", shippingaddress: "", shippingcity: "", shippingstate: "", shippingzip: "" },
      },
    ]);
  };

  return (
    <div>
      <div className="container-fluid mx-auto">
        {accountFields.map((account, index) => (
          <div key={index} className="space-y-4 mb-8 p-6 bg-gray-50 rounded-lg shadow-sm">
            {/* Trade/Purchase Options with Gradient Background */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 px-3 py-3 rounded bg-slate-600 ">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Trade Smart Phone?</label>
                <select
                  value={account.tradeSmartphone ? "trade" : "notrade"}
                  onChange={(e) => handleTradeSmartphoneChange(index, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="trade">I Want to Trade Smartphone</option>
                  <option value="notrade">Bring Your Own Phone</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Purchase Smart Phone?</label>
                <select
                  value={account.purchaseSmartphone ? "purchase" : "nopurchase"}
                  onChange={(e) => handlePurchaseSmartphoneChange(index, e.target.value)}
                  disabled={account.tradeSmartphone} // Disable if "Trade Smartphone" is selected
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="purchase">I Want to Purchase Smartphone</option>
                  <option value="nopurchase">Bring Your Own Phone</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Want to Buy New Phone Number?</label>
                <select
                  value={account.buyPhoneNumber ? "true" : "false"}
                  onChange={(e) => handleFieldChange(index, "buyPhoneNumber", e.target.value === "true")}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>

            {/* Port Out PIN, Phone Number, and IMEI Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Port Out PIN</label>
                <input
                  type="text"
                  placeholder="Enter Port Out PIN"
                  value={account.portOutPin}
                  onChange={(e) => handleFieldChange(index, "portOutPin", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              {!account.buyPhoneNumber && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="text"
                    placeholder="Enter Phone Number"
                    value={account.phoneNumber}
                    onChange={(e) => handleFieldChange(index, "phoneNumber", e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
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

            {/* Phone Details Display */}
            {error.isValidError && (
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

            {/* Carrier and Shipping Address Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Carrier</label>
                <select
                  value={account.carrier}
                  onChange={(e) => handleFieldChange(index, "carrier", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select Carrier</option>
                  {carrierInfos.map((carrier, idx) => (
                    <option key={idx} value={carrier.currentwirelesscarrier}>
                      {carrier.currentwirelesscarrier}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Address</label>
                <select
                  value={account.shippingAddress?.attentionname || ""}
                  onChange={(e) => {
                    const selectedAddress = shippingInfos.find(info => info.attentionname === e.target.value);
                    handleFieldChange(index, "shippingAddress", selectedAddress || { attentionname: "", shippingaddress: "", shippingcity: "", shippingstate: "", shippingzip: "" });
                  }}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select Shipping Address</option>
                  {shippingInfos.map((info, idx) => (
                    <option key={idx} value={info.attentionname}>
                      {info.attentionname}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Security Check Status Display */}
            {securityCheckStatus.blacklist && (
              <div className={`p-2 mt-2 text-sm font-bold rounded ${securityCheckStatus.blacklist === "Passed" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                Blacklist Check: {securityCheckStatus.blacklist}
              </div>
            )}

            {securityCheckStatus.findMyiPhone && (
              <div className={`p-2 mt-2 text-sm font-bold rounded ${securityCheckStatus.findMyiPhone === "Passed" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                Find My iPhone: {securityCheckStatus.findMyiPhone}
              </div>
            )}

            {securityCheckStatus.iCloudLock && (
              <div className={`p-2 mt-2 text-sm font-bold rounded ${securityCheckStatus.iCloudLock === "Passed" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                iCloud Lock: {securityCheckStatus.iCloudLock}
              </div>
            )}

            {/* Error Messages */}
            {error.isValidError && (
              <div className="p-2 mt-2 text-sm font-bold text-green-600">
                {error.isValidError}
              </div>
            )}
            {error.isInvalidError && (
              <div className="p-2 mt-2 text-sm font-bold text-red-600">
                {error.isInvalidError}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add New Row Button */}
      <div className="flex justify-start mt-10">
        <button
          type="button"
          onClick={handleAddNewRow}
          className="bg-slate-800 text-white px-6 py-2 rounded font-bold"
        >
          Add New
        </button>
      </div>
    </div>
  );
}

export default IMEIForm;