import React, { useState } from "react";
import axios from "axios";

function IMEIForm({
  imeiNumbers,
  onImeiNumbersChange,
  onAccountFieldsChange,
  onPhoneNumbersChange,
  onShippingAddressesChange,
}) {
  const token = localStorage.getItem("jwt_token");
  const [errorUniqueCode, setErrorUniqueCode] = useState("");
  const [showAllImeis, setShowAllImeis] = useState(false);
  const [imeiInput, setImeiInput] = useState(""); // To store the new IMEI being added
  const [accountFields, setAccountFields] = useState([
    { accountNumber: "", portOutPin: "", phoneNumber: "", carrier: "", imei: "", shippingAddress: "" },
  ]);
  const [uniqueCode, setUniqueCode] = useState(""); // For storing the unique code
  const [selectedImeis, setSelectedImeis] = useState(new Set());
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [shippingAddresses, setShippingAddresses] = useState([]); // For storing existing shipping addresses
  const [newShippingAddress, setNewShippingAddress] = useState(""); // For storing the new address

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
    updatedAccounts.splice(index, 1); // Remove the row at the given index
    setAccountFields(updatedAccounts);
  };

  // Handle fetching data from unique code
  const handleUniqueCodeChange = async (code) => {
    setUniqueCode(code);

    if (code.trim()) {
      try {
        const response = await axios.get(
          `https://springprobackend-production.up.railway.app/api/order/fetch-data-by-unique-code/${code}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 404) {
          console.log("No response found for this code");
          return; // Exit early if no data found
        }

        const { accountFields, phoneNumbers, shippingAddresses } = response.data;

        setAccountFields(accountFields);
        onAccountFieldsChange(accountFields);
        onPhoneNumbersChange(phoneNumbers);
        onShippingAddressesChange(shippingAddresses);
        setShippingAddresses(shippingAddresses); // Store existing addresses
      } catch (error) {
        setErrorUniqueCode("No such unique code exists.");
      }
    }
  };

  // Add IMEI number
  const handleAddImei = () => {
    if (imeiInput) {
      onImeiNumbersChange([...imeiNumbers, imeiInput]);
      setImeiInput("");
    }
  };

  // Handle IMEI selection
  const handleSelectImei = (imei) => {
    const newSelectedImeis = new Set(selectedImeis);
    if (newSelectedImeis.has(imei)) {
      newSelectedImeis.delete(imei);
    } else {
      newSelectedImeis.add(imei);
    }
    setSelectedImeis(newSelectedImeis);
  };

  // Handle Shipping Address Change
  const handleShippingAddressChange = (imei, value) => {
    setShippingAddresses((prevState) => ({
      ...prevState,
      [imei]: value,
    }));
  };

  // Handle New Shipping Address Input Change
  const handleNewShippingAddressChange = (e) => {
    setNewShippingAddress(e.target.value);
  };

  const handleAddNewAddress = () => {
    if (newShippingAddress.trim()) {
      setShippingAddresses((prevAddresses) => [
        ...prevAddresses,
        newShippingAddress.trim(),
      ]);
      setNewShippingAddress(""); // Reset the input
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
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Phone Number"
                      value={account.phoneNumber}
                      onChange={(e) => handleFieldChange(index, "phoneNumber", e.target.value)}
                      className="border-b focus:outline-none border-gray-300 py-2 w-full"
                    />
                    <input
                      type="text"
                      placeholder="IMEI Number"
                      value={account.imei}
                      onChange={(e) => handleFieldChange(index, "imei", e.target.value)}
                      className="border-b focus:outline-none border-gray-300 py-2 w-full"
                    />
                  </div>

                  {/* IMEI Number */}
                  <div className="flex gap-2">
                    <select
                      value={account.carrier}
                      onChange={(e) => handleFieldChange(index, "carrier", e.target.value)}
                      className="border-b focus:outline-none border-gray-300 py-2 w-full"
                    >
                      <option value="">Select Carrier</option>
                      {/* Add carrier options here */}
                    </select>                    
                    {/* Shipping Address */}
                    <select
                      value={account.shippingAddress}
                      onChange={(e) => handleFieldChange(index, "shippingAddress", e.target.value)}
                      className="border-b focus:outline-none border-gray-300 py-2 w-full"
                    >
                      <option value="">Select Shipping Address</option>
                      {shippingAddresses.map((address, idx) => (
                        <option key={idx} value={address}>
                          {address}
                        </option>
                      ))}
                    </select>                    
                  </div>

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
          </div>
        </div>
      )}
    </div>
  );
}

export default IMEIForm;
