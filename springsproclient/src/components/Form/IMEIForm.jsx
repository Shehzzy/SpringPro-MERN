import React, { useState } from "react";
import axios from "axios";
import luhn from 'luhn-generator'

function IMEIForm({
  imeiNumbers,
  onImeiNumbersChange,
  onAccountFieldsChange,
  onPhoneNumbersChange,
  onShippingAddressesChange,
  shippingInfos,
  carrierInfos,
  buyPhoneNumber,
  setBuyPhoneNumber,
  phoneUniqueCode,
  setPhoneUniqueCode,
  handleBuyPhoneNumberChange,
  handlePhoneUniqueCodeChange,
  handlePromoCodeChange,
  promoCode,
  setPromoCode,
}) {
  const token = localStorage.getItem("jwt_token");
  const [error, setError] = useState("")
  const [errorphoneUniqueCode, setErrorphoneUniqueCode] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [numRows, setNumRows] = useState(0); // For tracking the number of rows
  const [accountFields, setAccountFields] = useState([]); // To store dynamic rows
  const [phoneDetails, setPhoneDetails] = useState(null);

  const fetchPhoneDetails = async (tac) => {
     
    setError("");
    console.log("Fetching phone details for TAC:", tac); // Debugging log

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
      console.log("API response received:", response); // Debugging log

      if (response.status !== 200)  setError("Invalid IMEI number");

      const data = await response.data;
      console.log("Fetched phone details:", data); // Debugging log

      setPhoneDetails({
        model: data.device.model || "Unknown Model",
        name: data.device.name || "Unknown Name",
        brand: data.device.brand || "Unknown Brand"
      });
    } catch (error) {
      setError("Invalid IMEI number");
      console.error("Error fetching TAC details:", error);
    }
  };


  const validateIMEI = (imei) => {
     
    imei = imei.replace(/\D/g, ''); // Remove any non-numeric characters
    if (imei.length !== 15) {
      setError("IMEI must be 15 digits");
      return false;
    }
    const isValid = luhn.validate(imei);
    if (!isValid) {
      setError("Invalid IMEI");
    }
    return isValid;
  };


  const handleIMEIChange = (e) => {
    const imei = e.target.value.trim();
    console.log("IMEI entered:", imei);
  
    // First validate the IMEI
    if (!validateIMEI(imei)) {
      setPhoneDetails(null);
      return;
    }
  
    const tac = imei.substring(0, 8); // Extract TAC (first 8 digits)
    console.log("Valid IMEI, TAC extracted:", tac);
  
    // Fetch details using TAC
    fetchPhoneDetails(tac);
  };

  

  // Handle input change for number of rows
  const handleNumRowsChange = (e) => {
    const value = e.target.value;

    // Ensure the input is numeric or empty (so backspace can work)
    const parsedValue = /^\d*$/.test(value) ? value : "1"; // Only allow numeric characters, default to "1" if invalid

    setNumRows(parsedValue);

    // Create an array of objects for the number of rows specified
    const newFields = Array.from({ length: value }, () => ({
      portOutPin: "",
      phoneNumber: "",
      carrier: "",
      imei: "",
      shippingAddress: "",
      tradeSmartphone: false, // Add tradeSmartphone state for each row
      purchaseSmartphone: false, // Add purchaseSmartphone state for each row
      buyPhoneNumber: false, // <-- Added here
    }));
    setAccountFields(newFields); // Update accountFields with new rows
  };

  // Handle field changes (to update the parent component if necessary)
  const handleFieldChange = (index, field, value) => {
    const updatedAccounts = [...accountFields];
    // If the field is shippingAddress, we need to handle it differently
    if (field.startsWith("shippingAddress.")) {
      const shippingField = field.split(".")[1]; // Get the specific field (e.g., "attentionName")
      updatedAccounts[index].shippingAddress = {
        ...updatedAccounts[index].shippingAddress,
        [shippingField]: value,
      };
    } else {
      updatedAccounts[index][field] = value;
    }
    setAccountFields(updatedAccounts);
    console.log(updatedAccounts, "This is imei form data");


    // Call the appropriate change handlers
    if (field === "accountNumber" || field === "portOutPin") {
      onAccountFieldsChange(updatedAccounts);
    } else if (field === "phoneNumber" || field === "carrier") {
      onPhoneNumbersChange(updatedAccounts);
    } else if (field.startsWith("shippingAddress.")) {
      onShippingAddressesChange(updatedAccounts);
    }
  };

  // Handle trade smartphone change
  const handleTradeSmartphoneChange = (index, value) => {
    const updatedAccounts = [...accountFields];
    updatedAccounts[index].tradeSmartphone = value === "trade";

    // Auto-select "I Want to Purchase Smartphone" if "I Want to Trade Smartphone" is selected
    if (value === "trade") {
      updatedAccounts[index].purchaseSmartphone = true;
    }

    setAccountFields(updatedAccounts);
  };

  // Handle purchase smartphone change
  const handlePurchaseSmartphoneChange = (index, value) => {
    const updatedAccounts = [...accountFields];
    updatedAccounts[index].purchaseSmartphone = value === "purchase";
    setAccountFields(updatedAccounts);
  };

  // Open Modal logic
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
        buyPhoneNumber: false, // <-- Added here
      }));
      setAccountFields(initialFields);
    }
    setShowModal(true);
  };

  // Add a new row dynamically
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
        buyPhoneNumber: false, // <-- Added here
      },
    ]);
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-4 mb-4">
        {/* Input for number of rows */}
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

            {/* Account, Phone, IMEI & Shipping Fields */}
            <div className="mt-6">
              {accountFields.map((account, index) => (
                <div key={index} className="space-y-4 mb-8 p-6 bg-gray-50 rounded-lg shadow-sm">
                  <div className="flex justify-between mt-4">
                    <h3 className="text-2xl font-bold text-center inter">
                      {index === 0 ? "Add Details" : `Add Details ${index + 1}`}
                    </h3>
                  </div>

                  {/* Trade, Purchase, and Buy Phone Number */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 px-3 py-3 rounded" style={{
                    background:
                      "linear-gradient(90deg, rgba(65 ,253 ,254) 0%, rgba(0,210,255,1) 100%)",
                  }}>
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
                      <label className="block inter text-sm font-medium text-gray-700 mb-2">Purchase Smart Phone?</label>
                      <select
                        className="w-full inter text-sm p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                        value={account.purchaseSmartphone ? "purchase" : "nopurchase"}
                        onChange={(e) => handlePurchaseSmartphoneChange(index, e.target.value)}
                        disabled={account.tradeSmartphone} // Disable if tradeSmartphone is true
                      >
                        <option value="purchase">I Want to Purchase Smartphone</option>
                        <option value="nopurchase">Bring Your Own Phone</option>
                      </select>
                    </div>

                    <div>
                      <label className="block inter text-sm font-medium text-gray-700 mb-2">Want to Buy New Phone Number?</label>
                      <select
                        className="w-full inter text-sm p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                        value={account.buyPhoneNumber ? "true" : "false"}
                        onChange={(e) =>
                          handleFieldChange(index, "buyPhoneNumber", e.target.value === "true")
                        }
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  </div>

                  {/* Port Out PIN, Phone Number, and IMEI Number */}
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


                    {/* Show IMEI only if both tradeSmartphone and purchaseSmartphone are false */}
                    {(!account.tradeSmartphone && !account.purchaseSmartphone) && (
                      <div>
                        <label className="block inter text-sm font-medium text-gray-700 mb-2">IMEI Number</label>
                        <input
                          type="number"
                          placeholder="Enter IMEI Number"
                          value={account.imei}
                          onChange={(e) =>
                            handleFieldChange(index, "imei", e.target.value)
                          }
                          onBlur={(e) => handleIMEIChange(e)}
                          className="w-full inter text-sm p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                        <p className="text-danger">{error && error}</p>


                      </div>
                    )}
                  </div>

                  {phoneDetails && error === "" && (
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

                  {/* Carrier and Shipping Address */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block inter text-sm font-medium text-gray-700 mb-2">Carrier</label>
                      <select
                        value={account.carrier}
                        onChange={(e) =>
                          handleFieldChange(index, "carrier", e.target.value)
                        }
                        className="w-full inter text-sm p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
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
                      <label className="block inter text-sm font-medium text-gray-700 mb-2">Shipping Address</label>
                      <select
                        value={account.shippingAddress}
                        onChange={(e) =>
                          handleFieldChange(index, "shippingAddress", e.target.value)
                        }
                        className="w-full inter text-sm p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                      >
                        <option value="">Select Shipping Address</option>
                        {shippingInfos.map((info, idx) => (
                          <option key={idx} value={info.shippingaddress}>
                            {info.shippingaddress}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Row Button */}
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
          </div>
        </div>
      )}
    </div>
  );
}

export default IMEIForm;