import React, { useState } from "react";
import axios from "axios";

function IMEIForm({
  imeiNumbers,
  onImeiNumbersChange,
  onAccountFieldsChange,
  onPhoneNumbersChange,
  onShippingAddressesChange,
  shippingInfos,
  carrierInfos,
  tradeSmartphone,
  setTradeSmartphone,
  buyPhoneNumber,
  setBuyPhoneNumber,
  phoneUniqueCode,
  setPhoneUniqueCode,
  handleBuyPhoneNumberChange,
  handleTradeSmartphoneChange,
  handlePhoneUniqueCodeChange,
  handlePromoCodeChange,
  promoCode,
  setPromoCode,
}) {
  const token = localStorage.getItem("jwt_token");
  const [errorphoneUniqueCode, setErrorphoneUniqueCode] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [numRows, setNumRows] = useState(1); // For tracking the number of rows
  const [accountFields, setAccountFields] = useState([]); // To store dynamic rows

  // Handle input change for number of rows
  const handleNumRowsChange = (e) => {
    const value = parseInt(e.target.value, 10) || 1;
    setNumRows(value);

    // Create an array of objects for the number of rows specified
    const newFields = Array.from({ length: value }, () => ({
      accountNumber: "",
      portOutPin: "",
      phoneNumber: "",
      carrier: "",
      imei: "",
      shippingAddress: "",
    }));
    setAccountFields(newFields); // Update accountFields with new rows
  };

  // Handle field changes (to update the parent component if necessary)
  const handleFieldChange = (index, field, value) => {
    const updatedAccounts = [...accountFields];
    updatedAccounts[index][field] = value;
    setAccountFields(updatedAccounts);

    if (field === "accountNumber" || field === "portOutPin") {
      onAccountFieldsChange(updatedAccounts);
    } else if (field === "phoneNumber" || field === "carrier") {
      onPhoneNumbersChange(updatedAccounts);
    } else if (field === "shippingAddress") {
      onShippingAddressesChange(updatedAccounts);
    }
  };

  // Open Modal logic
  const handleModalOpen = () => {
    if (accountFields.length === 0) {
      const initialFields = Array.from({ length: numRows }, () => ({
        accountNumber: "",
        portOutPin: "",
        phoneNumber: "",
        carrier: "",
        imei: "",
        shippingAddress: "",
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
        accountNumber: "",
        portOutPin: "",
        phoneNumber: "",
        carrier: "",
        imei: "",
        shippingAddress: "",
      },
    ]);
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-4 mb-4">
        {/* Input for number of rows */}
        <input
          type="number"
          min="1"
          value={numRows}
          onChange={handleNumRowsChange}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 w-40"
          placeholder="Enter number of rows"
        />
        <button
          onClick={handleModalOpen}
          type="button"
          className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-teal-600 transition duration-200"
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

            <h2 className="text-3xl font-bold text-center mb-6">
              Add IMEI and Account Information
            </h2>

            {/* Account, Phone, IMEI & Shipping Fields */}
            <div className="mt-6">
              {accountFields.map((account, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex justify-between mt-4">
                    <h3 className="text-2xl font-bold text-center">
                      {index === 0 ? "Add Info" : `Add Info ${index + 1}`}
                    </h3>
                  </div>

                  {/* Trade Smartphone or Purchase New Smartphone */}
                  <div className="flex gap-4 mb-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="smartphoneOption"
                        value="true"
                        checked={tradeSmartphone}
                        onChange={() => handleTradeSmartphoneChange(true)}
                      />
                      <span className="ml-2">Trade Smartphone</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="smartphoneOption"
                        value="false"
                        checked={!tradeSmartphone}
                        onChange={() => handleTradeSmartphoneChange(false)}
                      />
                      <span className="ml-2">Purchase New Smartphone</span>
                    </label>
                  </div>

                  {/* Buy Phone Number */}
                  <div className="flex gap-4 mb-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="buyPhoneNumber"
                        value="true"
                        checked={buyPhoneNumber}
                        onChange={() => handleBuyPhoneNumberChange(true)}
                      />
                      <span className="ml-2">Buy Phone Number (Yes)</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="buyPhoneNumber"
                        value="false"
                        checked={!buyPhoneNumber}
                        onChange={() => handleBuyPhoneNumberChange(false)}
                      />
                      <span className="ml-2">Buy Phone Number (No)</span>
                    </label>
                  </div>

                  {/* Account Number and Port Out PIN */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Account Number"
                      value={account.accountNumber}
                      onChange={(e) =>
                        handleFieldChange(index, "accountNumber", e.target.value)
                      }
                      className="border-b focus:outline-none border-gray-300 py-2 w-full"
                    />
                    <input
                      type="text"
                      placeholder="Port Out PIN"
                      value={account.portOutPin}
                      onChange={(e) =>
                        handleFieldChange(index, "portOutPin", e.target.value)
                      }
                      className="border-b focus:outline-none border-gray-300 py-2 w-full"
                    />
                  </div>

                  {/* Phone Number and Carrier */}
                  {!buyPhoneNumber && (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Phone Number"
                        value={account.phoneNumber}
                        onChange={(e) =>
                          handleFieldChange(index, "phoneNumber", e.target.value)
                        }
                        className="border-b focus:outline-none border-gray-300 py-2 w-full"
                      />
                      {tradeSmartphone && (
                        <input
                          type="text"
                          placeholder="IMEI Number"
                          value={account.imei}
                          onChange={(e) =>
                            handleFieldChange(index, "imei", e.target.value)
                          }
                          className="border-b focus:outline-none border-gray-300 py-2 w-full"
                        />
                      )}
                    </div>
                  )}

                  {/* Carrier and Shipping Address */}
                  <div className="flex gap-2">
                    <select
                      value={account.carrier}
                      onChange={(e) =>
                        handleFieldChange(index, "carrier", e.target.value)
                      }
                      className="border-b focus:outline-none border-gray-300 py-2 w-full"
                    >
                      <option value="">Select Carrier</option>
                      {carrierInfos.map((carrier, idx) => (
                        <option key={idx} value={carrier.currentwirelesscarrier}>
                          {carrier.currentwirelesscarrier}
                        </option>
                      ))}
                    </select>
                    <select
                      value={account.shippingAddress}
                      onChange={(e) =>
                        handleFieldChange(index, "shippingAddress", e.target.value)
                      }
                      className="border-b focus:outline-none border-gray-300 py-2 w-full"
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
              ))}
            </div>

            {/* Add New Row Button */}
            <div className="flex justify-center mt-6">
              <button
                type="button"
                onClick={handleAddNewRow}
                className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-teal-600 transition duration-200"
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
