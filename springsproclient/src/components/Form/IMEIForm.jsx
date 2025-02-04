import React, { useState } from "react";
import axios from "axios";

function IMEIForm({
  imeiNumbers,
  onImeiNumbersChange,
  onAccountFieldsChange,
  onPhoneNumbersChange,
  onShippingAddressesChange,
  shippingInfos, // New prop for shipping information
  carrierInfos, // New prop for carrier information
}) {
  const token = localStorage.getItem("jwt_token");
  const [errorphoneUniqueCode, setErrorphoneUniqueCode] = useState("");
  const [showAllImeis, setShowAllImeis] = useState(false);
  const [imeiInput, setImeiInput] = useState("");
  const [accountFields, setAccountFields] = useState([
    { accountNumber: "", portOutPin: "", phoneNumber: "", carrier: "", imei: "", shippingAddress: "" },
  ]);
  const [phoneUniqueCode, setphoneUniqueCode] = useState("");
  const [selectedImeis, setSelectedImeis] = useState(new Set());
  const [showModal, setShowModal] = useState(false);
  const [shippingAddresses, setShippingAddresses] = useState([]); // For storing existing shipping addresses
  const [newShippingAddress, setNewShippingAddress] = useState("");
  const [tradeSmartphone, setTradeSmartphone] = useState(false); // State for trade smartphone
  const [buyPhoneNumber, setBuyPhoneNumber] = useState(false); // State for buy phone number

  // Handle changes in Account, Phone, IMEI, and Shipping Address
  const handleFieldChange = (index, field, value) => {
    const updatedAccounts = [...accountFields];
    updatedAccounts[index][field] = value;
    setAccountFields(updatedAccounts);

    // Update respective change in parent if necessary
    if (field === "accountNumber" || field === "portOutPin") {
      onAccountFieldsChange(updatedAccounts);
    } else if (field === "phoneNumber" || field === "carrier") {
      onPhoneNumbersChange(updatedAccounts);
    } else if (field === "shippingAddress") {
      onShippingAddressesChange(updatedAccounts);
    }
  };

  // Handle adding a new row with all fields
  const handleAddRow = () => {
    setAccountFields([
      ...accountFields,
      { accountNumber: "", portOutPin: "", phoneNumber: "", carrier: "", imei: "", shippingAddress: "" },
    ]);
  };

  // Handle removing a row
  const handleRemoveRow = (index) => {
    const updatedAccounts = [...accountFields];
    updatedAccounts.splice(index, 1);
    setAccountFields(updatedAccounts);
  };

  // Add IMEI number
  const handleAddImei = () => {
    if (imeiInput) {
      onImeiNumbersChange([...imeiNumbers, imeiInput]);
      setImeiInput("");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();


    // save this for later
    // const orderData = {
    //   imeiNumbers: imeiNumbers,
    //   accountFields: accountFields.map(account => ({
    //     accountNumber: account.accountNumber || "", // Default to empty string if not filled
    //     portOutPin: account.portOutPin || "", // Default to empty string if not filled
    //     phoneNumber: account.phoneNumber || "", // Default to empty string if not filled
    //     carrier: account.carrier || "", // Default to empty string if not filled
    //     imei: account.imei || "", // Default to empty string if not filled
    //     shippingAddress: account.shippingAddress || "", // Default to empty string if not filled
    //     tradeSmartphone: tradeSmartphone, // Include trade smartphone state
    //     buyPhoneNumber: buyPhoneNumber, // Include buy phone number state
    //     phoneUniqueCode: phoneUniqueCode || "", // Default to empty string if not filled
    //   })),
    //   shippingAddresses: shippingAddresses, // Assuming this is already handled
    // };
  

    const orderData = {
      imeiNumbers: imeiNumbers,
      accountFields: accountFields,
      phoneNumbers: accountFields.map(account => ({
        phoneNumber: account.phoneNumber,
        carrier: account.carrier,
      })),
      shippingAddresses: shippingAddresses,
      tradeSmartphone: tradeSmartphone, // Include trade smartphone state
      buyPhoneNumber: buyPhoneNumber, // Include buy phone number state
      phoneUniqueCode: phoneUniqueCode || "", // Default to empty string if not filled
    
    };

    try {
      const response = await axios.post(
        "https://springprobackend-production.up.railway.app/api/order/create-order",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        console.log("Order created successfully:", response.data);
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-teal-600 transition duration-200"
      >
        Open IMEI Form
      </button>

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
            <form onSubmit={handleSubmit}>
              <div className="mt-6">
                {accountFields.map((account, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex justify-between mt-4">
                      <h3 className="text-2xl font-bold text-center">
                        {index === 0 ? "Add Info" : `Add Info ${index + 1}`}
                      </h3>
                      {/* Remove Row Button */}
                      {accountFields.length > 1 && (
                        <button
                          style={{
                            background: "linear-gradient(90deg, rgba(65 ,253 ,254) 0%, rgba(0,210,255,1) 100%)"
                          }}
                          type="button"
                          onClick={() => handleRemoveRow(index)}
                          className="font-bold text-xs text-white transition-all px-6 py-2 border-2 border-tron-blue rounded-full bg-tron-blue hover:scale-85 hover:shadow-lg hover:bg-transparent no-underline"
                        >
                          REMOVE ROW
                        </button>
                      )}
                    </div>
                    {/* Trade Smartphone or Purchase New Smartphone */}
                    <div className="flex gap-4 mb-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="smartphoneOption"
                          value="trade"
                          checked={tradeSmartphone}
                          onChange={() => setTradeSmartphone(true)}
                        />
                        <span className="ml-2">Trade Smartphone</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="smartphoneOption"
                          value="purchase"
                          checked={!tradeSmartphone}
                          onChange={() => setTradeSmartphone(false)}
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
                          value="yes"
                          checked={buyPhoneNumber}
                          onChange={() => setBuyPhoneNumber(true)}
                        />
                        <span className="ml-2">Buy Phone Number (Yes)</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="buyPhoneNumber"
                          value="no"
                          checked={!buyPhoneNumber}
                          onChange={() => setBuyPhoneNumber(false)}
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
                        onChange={(e) => handleFieldChange(index, "accountNumber", e.target.value)}
                        className="border-b focus:outline-none border-gray-300 py-2 w-full"
                      />
                      <input
                        type="text"
                        placeholder="Port Out PIN"
                        value={account.portOutPin}
                        onChange={(e) => handleFieldChange(index, "portOutPin", e.target.value)}
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
                          onChange={(e) => handleFieldChange(index, "phoneNumber", e.target.value)}
                          className="border-b focus:outline-none border-gray-300 py-2 w-full"
                        />
                        {tradeSmartphone && (
                          <input
                            type="text"
                            placeholder="IMEI Number"
                            value={account.imei}
                            onChange={(e) => handleFieldChange(index, "imei", e.target.value)}
                            className="border-b focus:outline-none border-gray-300 py-2 w-full"
                          />
                        )}
                      </div>
                    )}

                    {/* Carrier and Shipping Address */}
                    <div className="flex gap-2">
                      <select
                        value={account.carrier}
                        onChange={(e) => handleFieldChange(index, "carrier", e.target.value)}
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
                        onChange={(e) => handleFieldChange(index, "shippingAddress", e.target.value)}
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

                    {/* Unique Code Dropdown */}
                    {tradeSmartphone && (
                      <div className="flex gap-2">
                        <select
                          value={phoneUniqueCode}
                          onChange={(e) => setphoneUniqueCode(e.target.value)}
                          className="border-b focus:outline-none border-gray-300 py-2 w-full"
                        >
                          <option value="">Select Promotion Code</option>
                          <option value="promo1">Promotion Code 1</option>
                          <option value="promo2">Promotion Code 2</option>
                        </select>
                      </div>
                    )}
                    {!tradeSmartphone && (
                      <div className="flex gap-2">
                        <select
                          value={phoneUniqueCode}
                          onChange={(e) => setphoneUniqueCode(e.target.value)}
                          className="border-b focus:outline-none border-gray-300 py-2 w-full"
                        >
                          <option value="">Select Buy New Phone Code</option>
                          <option value="newphone1">Buy New Phone Code 1</option>
                          <option value="newphone2">Buy New Phone Code 2</option>
                        </select>
                      </div>
                    )}
                  </div>
                ))}

                {/* Add New Button */}
                <div className="flex justify-center mt-4">
                  <button
                    type="button"
                    onClick={handleAddRow}
                    style={{
                      background: "linear-gradient(90deg, rgba(65 ,253 ,254) 0%, rgba(0,210,255,1) 100%)"
                    }}
                    className="font-bold text-sm text-white transition-all px-6 py-3 border-2 border-tron-blue rounded-full bg-tron-blue hover:scale-85 hover:shadow-lg hover:bg-transparent no-underline"
                  >
                    + Add New
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-teal-600 transition duration-200"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default IMEIForm;