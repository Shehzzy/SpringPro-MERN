import React, { useState } from "react";

function IMEIForm({
  imeiNumbers, // This comes from the parent component as a prop
  onImeiNumbersChange, // This function will be used to update IMEI numbers in the parent
  onAccountFieldsChange, // This function will handle changes in account fields
  onPhoneNumbersChange, // This function will handle changes in phone numbers
  onShippingAddressesChange,
}) {
  const [showAllImeis, setShowAllImeis] = useState(false);
  const [imeiInput, setImeiInput] = useState(""); // To store the new IMEI being added
  const [accountFields, setAccountFields] = useState([
    { accountNumber: "", portOutPin: "" },
  ]); // Account fields state
  const [phoneNumbers, setPhoneNumbers] = useState([
    { phoneNumber: "", carrier: "" },
  ]); // Phone numbers state
  const [shippingAddresses, setShippingAddresses] = useState({}); // Stores shipping addresses for each IMEI
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  // Handle changes in account fields
  const handleAccountChange = (index, field, value) => {
    const updatedAccounts = [...accountFields];
    updatedAccounts[index][field] = value;
    setAccountFields(updatedAccounts);
    onAccountFieldsChange(updatedAccounts); // Pass the updated account fields back to the parent
  };

  // Handle changes in phone number fields
  const handlePhoneNumberChange = (index, field, value) => {
    const updatedPhoneNumbers = [...phoneNumbers];
    updatedPhoneNumbers[index][field] = value;
    setPhoneNumbers(updatedPhoneNumbers);
    onPhoneNumbersChange(updatedPhoneNumbers); // Pass updated phone numbers to the parent
  };

  // Handle changes in shipping address for a specific IMEI
  const handleShippingAddressChange = (imei, value) => {
    const updatedAddresses = { ...shippingAddresses };
    updatedAddresses[imei] = value;
    setShippingAddresses(updatedAddresses);

    // Call the handler to update the parent component
    onShippingAddressesChange(updatedAddresses);
  };

  // Add a new account field
  const addAccountField = () => {
    setAccountFields([...accountFields, { accountNumber: "", portOutPin: "" }]);
  };

  // Add a new phone number field
  const addPhoneNumberField = () => {
    setPhoneNumbers([...phoneNumbers, { phoneNumber: "", carrier: "" }]);
  };

  const [selectedImeis, setSelectedImeis] = useState(new Set());

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-teal-600 transition duration-200"
      >
        Open IMEI Form
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 p-6 relative z-60 max-h-[80vh] overflow-y-auto">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black z-10"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-center mb-6">
              Add IMEI and Account Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Accounts Ported In */}
              <div>
                <h6 className="text-sm font-medium text-gray-700 mb-2 text-center">
                  Accounts Ported In
                </h6>
                <div className="space-y-4">
                  {accountFields.map((account, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Account Number"
                        value={account.accountNumber}
                        onChange={(e) =>
                          handleAccountChange(
                            index,
                            "accountNumber",
                            e.target.value
                          )
                        }
                        className="border-b focus:outline-none border-gray-300 py-2 w-full"
                      />
                      <input
                        type="text"
                        placeholder="Port Out PIN"
                        value={account.portOutPin}
                        onChange={(e) =>
                          handleAccountChange(
                            index,
                            "portOutPin",
                            e.target.value
                          )
                        }
                        className="border-b focus:outline-none border-gray-300 py-2 w-full"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addAccountField}
                    className="mt-2 bg-[#41FDFE] text-black px-4 py-2 rounded-full hover:bg-teal-600 transition duration-200"
                  >
                    + Add Account
                  </button>
                </div>
              </div>

              {/* Phone Numbers Porting In */}
              <div>
                <h6 className="text-sm font-medium text-gray-700 mb-2 text-center">
                  Phone Numbers Porting In
                </h6>
                <div className="space-y-4">
                  {phoneNumbers.map((phone, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Phone Number"
                        value={phone.phoneNumber}
                        onChange={(e) =>
                          handlePhoneNumberChange(
                            index,
                            "phoneNumber",
                            e.target.value
                          )
                        }
                        className="border-b focus:outline-none border-gray-300 py-2 w-full"
                      />
                      <select
                        value={phone.carrier}
                        onChange={(e) =>
                          handlePhoneNumberChange(
                            index,
                            "carrier",
                            e.target.value
                          )
                        }
                        className="border-b focus:outline-none border-gray-300 py-2 w-full"
                      >
                        <option value="">Select Carrier</option>
                        <option value="T-Mobile">T-Mobile</option>
                        <option value="Verizon">Verizon</option>
                        <option value="AT&T">AT&T</option>
                        <option value="Cricket">Cricket</option>
                        <option value="Boost">Boost</option>
                        <option value="MetroPCS">MetroPCS</option>
                        <option value="Lycamobile">Lycamobile</option>
                        <option value="Altice">Altice</option>
                        <option value="Spectrum">Spectrum</option>
                        <option value="H2O">H2O</option>
                        <option value="RedPocket">RedPocket</option>
                        <option value="Visible">Visible</option>
                        <option value="Total Wireless">Total Wireless</option>
                      </select>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addPhoneNumberField}
                    className="mt-2 bg-[#41FDFE] text-black px-4 py-2 rounded-full hover:bg-teal-600 transition duration-200"
                  >
                    + Add Phone Number
                  </button>
                </div>
              </div>

              {/* Add New IMEI Number */}
              <div>
                <h6 className="text-sm font-medium text-gray-700 mb-2 text-center">
                  Add New IMEI Number
                </h6>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="imeiInput"
                    placeholder="Enter IMEI Number"
                    value={imeiInput}
                    onChange={(e) => setImeiInput(e.target.value)}
                    className="border-b focus:outline-none border-gray-300 py-2 w-full"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (imeiInput) {
                        onImeiNumbersChange([...imeiNumbers, imeiInput]); // Update parent with new IMEI
                        setImeiInput(""); // Clear input
                      }
                    }}
                    className="mt-2 bg-[#41FDFE] text-black px-4 py-2 rounded-full hover:bg-teal-600 transition duration-200"
                  >
                    Add IMEI Number
                  </button>
                </div>
              </div>
            </div>

            {/* IMEI Numbers List - Moved to a new row */}
            <div className="mt-6">
              {imeiNumbers.length > 0 && (
                <div className="mt-4">
                  <p className="font-medium text-gray-700 text-center">
                    Select from Existing IMEI Numbers
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    {imeiNumbers
                      .slice(0, showAllImeis ? imeiNumbers.length : 3)
                      .map((imei, index) => (
                        <div key={index} className="text-center">
                          <label className="flex items-center justify-center">
                            <input
                              type="checkbox"
                              value={imei}
                              className="mr-2"
                              onChange={(e) => {
                                const newSelectedImeis = new Set(selectedImeis);
                                if (e.target.checked) {
                                  newSelectedImeis.add(imei);
                                } else {
                                  newSelectedImeis.delete(imei);
                                }
                                setSelectedImeis(newSelectedImeis);
                              }}
                            />
                            {imei}
                          </label>

                          {/* Shipping Address for Each IMEI */}
                          <div className="mt-4">
                            <h6 className="text-sm font-medium text-gray-700 mb-2">
                              Shipping Address for {imei}
                            </h6>
                            <input
                              type="text"
                              placeholder="Enter Shipping Address"
                              value={shippingAddresses[imei] || ""}
                              onChange={(e) =>
                                handleShippingAddressChange(
                                  imei,
                                  e.target.value
                                )
                              }
                              className="border-b focus:outline-none border-gray-300 py-2 w-full"
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                  {imeiNumbers.length > 3 && (
                    <button
                      className="mt-2 bg-[#41FDFE] px-2 py-1 rounded-full text-sm hover:bg-teal-600"
                      onClick={() => setShowAllImeis(!showAllImeis)}
                    >
                      {showAllImeis ? "Show Less" : "Show More"}
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="text-center mt-4">
              <button
                className="bg-[#41FDFE] px-4 py-2 rounded-full hover:bg-teal-600 transition duration-200"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default IMEIForm;
