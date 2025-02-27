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
  const [errorphoneUniqueCode, setErrorphoneUniqueCode] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [numRows, setNumRows] = useState(0); // For tracking the number of rows
  const [accountFields, setAccountFields] = useState([]); // To store dynamic rows

  // Handle input change for number of rows
  const handleNumRowsChange = (e) => {
    const value = parseInt(e.target.value, 10) || 0;
    setNumRows(value);

    // Create an array of objects for the number of rows specified
    const newFields = Array.from({ length: value }, () => ({
      accountNumber: "",
      portOutPin: "",
      phoneNumber: "",
      carrier: "",
      imei: "",
      shippingAddress: "",
      tradeSmartphone: false, // Add tradeSmartphone state for each row
      purchaseSmartphone: false, // Add purchaseSmartphone state for each row
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
        accountNumber: "",
        portOutPin: "",
        phoneNumber: "",
        carrier: "",
        imei: "",
        shippingAddress: "",
        tradeSmartphone: false,
        purchaseSmartphone: false,
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
        tradeSmartphone: false,
        purchaseSmartphone: false,
      },
    ]);
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-4 mb-4">
        {/* Input for number of rows */}
        <input
          type="number"
          min="0"
          value={numRows}
          onChange={handleNumRowsChange}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 w-20 sm:w-40"
          placeholder="Enter number of rows"
        />
        <button
          onClick={handleModalOpen}
          type="button"
          style={{
            background:
              "linear-gradient(90deg, rgba(65 ,253 ,254) 0%, rgba(0,210,255,1) 100%)",
          }}
          className="text-white px-6 py-2 rounded font-bold"
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
                <div key={index} className="space-y-4">
                  <div className="flex justify-between mt-4">
                    <h3 className="text-2xl font-bold text-center inter">
                      {index === 0 ? "Add Details" : `Add Details ${index + 1}`}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 mt-10 md:grid-cols-3 gap-6 px-6 py-3 rounded" style={{
                  background:
                    "linear-gradient(90deg, rgba(65 ,253 ,254) 0%, rgba(0,210,255,1) 100%)",
                }}>
                  <div>
                    <h6 className="text-sm font-medium text-white inter mb-2">Trade Smart Phone?</h6>
                    <select
                      className="border-b focus:outline-none rounded-lg border-gray-300 inter p-2 w-full text-sm"
                      value={account.tradeSmartphone ? "trade" : "notrade"}
                      onChange={(e) => handleTradeSmartphoneChange(index, e.target.value)}
                    >
                      <option value="trade">I Want to Trade Smartphone</option>
                      <option value="notrade">Bring Your Own Phone</option>
                    </select>
                  </div>

                  <div>
                    <h6 className="text-sm font-medium text-white inter mb-2">Purchase Smart Phone?</h6>
                    <select
                      className="border-b focus:outline-none rounded-lg border-gray-300 inter p-2 w-full text-sm"
                      value={account.purchaseSmartphone ? "purchase" : "nopurchase"}
                      onChange={(e) => handlePurchaseSmartphoneChange(index, e.target.value)}
                      disabled={account.tradeSmartphone} // Disable if tradeSmartphone is true
                    >
                      <option value="purchase">I Want to Purchase Smartphone</option>
                      <option value="nopurchase">Bring Your Own Phone</option>
                    </select>
                  </div>

                  <div>
                    <h6 className="text-sm font-medium text-white mb-2 inter">Want to Buy New Phone Number?</h6>                  
                    <select
                      className="border-b focus:outline-none rounded-lg border-gray-300 inter p-2 w-full text-sm"
                      value={buyPhoneNumber ? "true" : "false"}
                      onChange={(e) => handleBuyPhoneNumberChange(e.target.value === "true")}
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                  </div>
                  {/* Account Number and Port Out PIN */}
                  <div className="grid grid-cols-1 mt-10 md:grid-cols-2 gap-6">
                    <div className="grid grid-cols-1 mt-10 md:grid-cols-2 gap-6">
                      <div>
                        <h6 className="text-sm font-medium text-gray-700 mb-2 inter">Account Number</h6>
                        <input
                          type="text"
                          placeholder="Enter Account Number"
                          value={account.accountNumber}
                          onChange={(e) =>
                            handleFieldChange(index, "accountNumber", e.target.value)
                          }
                          className="border-b focus:outline-none border-gray-300 p-2 w-full inter text-sm"
                        />
                      </div>
                      <div>
                        <h6 className="text-sm font-medium text-gray-700 mb-2 inter">Port Out PIN</h6>
                        <input
                          type="text"
                          placeholder="Enter Port Out PIN"
                          value={account.portOutPin}
                          onChange={(e) =>
                            handleFieldChange(index, "portOutPin", e.target.value)
                          }
                          className="border-b focus:outline-none border-gray-300 p-2 w-full inter text-sm"
                        />
                      </div>
                    </div>
                    {/* Phone Number and Carrier */}
                    {!buyPhoneNumber && (
                    <div className="grid grid-cols-1 md:mt-10 md:grid-cols-2 gap-6">
                      <div>
                        <h6 className="text-sm font-medium text-gray-700 mb-2 inter">Phone Number</h6>
                        <input
                          type="text"
                          placeholder="Enter Phone Number"
                          value={account.phoneNumber}
                          onChange={(e) =>
                            handleFieldChange(index, "phoneNumber", e.target.value)
                          }
                          className="border-b focus:outline-none border-gray-300 p-2 w-full inter text-sm"
                        />
                      </div>
                      {/* Show IMEI only if both tradeSmartphone and purchaseSmartphone are false */}
                      {(!account.tradeSmartphone && !account.purchaseSmartphone) && (
                        <div>
                          <h6 className="text-sm font-medium text-gray-700 mb-2 inter">IMEI Number</h6>
                          <input
                            type="text"
                            placeholder="Enter IMEI Number"
                            value={account.imei}
                            onChange={(e) =>
                              handleFieldChange(index, "imei", e.target.value)
                            }
                            className="border-b focus:outline-none border-gray-300 py-2 w-full"
                          />
                        </div>
                      )}
                    </div>
                  )}
                  </div>

                  {/* Carrier and Shipping Address */}
                  <div className="grid grid-cols-1 md:mt-10 md:grid-cols-2 gap-6">
                    <div>
                    <h6 className="text-sm font-medium text-gray-700 mb-2 inter">Carrier</h6>
                      <select
                        value={account.carrier}
                        onChange={(e) =>
                          handleFieldChange(index, "carrier", e.target.value)
                        }
                        className="border-b focus:outline-none rounded-lg border-gray-300 inter p-2 w-full text-sm"
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
                      <h6 className="text-sm font-medium text-gray-700 mb-2 inter pl-2">Shipping Address</h6>
                      <select
                        value={account.shippingAddress}
                        onChange={(e) =>
                          handleFieldChange(index, "shippingAddress", e.target.value)
                        }
                        className="border-b focus:outline-none rounded-lg border-gray-300 inter p-2 w-full text-sm"
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
                className="text-white px-6 py-2 rounded font-bold"
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