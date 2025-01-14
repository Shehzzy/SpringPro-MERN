import React, { useState } from "react";

function IMEIForm() {
  const [imeiInput, setImeiInput] = useState("");
  const [imeiNumbers, setImeiNumbers] = useState([]);
  const [accountFields, setAccountFields] = useState([{ account: "", pin: "" }]);
  const [phoneNumbers, setPhoneNumbers] = useState([{ phoneNumber: "", carrier: "" }]);
  const [showModal, setShowModal] = useState(false);

  const handleAccountChange = (index, field, value) => {
    const updatedAccounts = [...accountFields];
    updatedAccounts[index][field] = value;
    setAccountFields(updatedAccounts);
  };

  const handlePhoneNumberChange = (index, field, value) => {
    const updatedPhoneNumbers = [...phoneNumbers];
    updatedPhoneNumbers[index][field] = value;
    setPhoneNumbers(updatedPhoneNumbers);
  };

  const addAccountField = () => {
    setAccountFields([...accountFields, { account: "", pin: "" }]);
  };

  const addPhoneNumberField = () => {
    setPhoneNumbers([...phoneNumbers, { phoneNumber: "", carrier: "" }]);
  };

  return (
    <div className="">
      <button
        onClick={() => setShowModal(true)}
        className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-4 py-2 rounded-3xl"
      >
        Open IMEI Form
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-3/5 xl:w-2/3 2xl:w-1/2 p-6 relative z-60">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black z-10"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-center mb-6">Add IMEI and Account Information</h2>

            {/* Modal Content with Fixed Height and Scrollable Area */}
            <div className="overflow-y-auto max-h-[400px]">
              {/* Row Layout for Accounts, Phone Numbers, and IMEI Numbers */}
              <div className="flex gap-6 mb-6 flex-wrap justify-between">
                {/* Accounts Ported In */}
                <div className="w-full md:w-1/3 lg:w-1/3 xl:w-1/4">
                  <h6 className="text-sm font-medium text-gray-700 mb-2">Accounts Ported In</h6>
                  <div className="flex flex-col gap-4">
                    {accountFields.map((account, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          placeholder="Account Number"
                          value={account.account}
                          onChange={(e) =>
                            handleAccountChange(index, "account", e.target.value)
                          }
                          className="border-b focus:outline-none border-gray-300 py-2 w-full"
                        />
                        <input
                          type="text"
                          placeholder="Port Out PIN"
                          value={account.pin}
                          onChange={(e) =>
                            handleAccountChange(index, "pin", e.target.value)
                          }
                          className="border-b focus:outline-none border-gray-300 py-2 w-full"
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addAccountField}
                      className="mt-2 bg-[#41FDFE] text-black px-4 py-2 rounded"
                    >
                      + Add Account
                    </button>
                  </div>
                </div>

                {/* Phone Numbers Porting In */}
                <div className="w-full md:w-1/3 lg:w-1/3 xl:w-1/4">
                  <h6 className="text-sm font-medium text-gray-700 mb-2">Phone Numbers Porting In</h6>
                  <div className="flex flex-col gap-4">
                    {phoneNumbers.map((phone, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          placeholder="Phone Number"
                          value={phone.phoneNumber}
                          onChange={(e) =>
                            handlePhoneNumberChange(index, "phoneNumber", e.target.value)
                          }
                          className="border-b focus:outline-none border-gray-300 py-2 w-full"
                        />
                        <select
                          value={phone.carrier}
                          onChange={(e) =>
                            handlePhoneNumberChange(index, "carrier", e.target.value)
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
                          <option value="Others">Others</option>
                        </select>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addPhoneNumberField}
                      className="mt-2 bg-[#41FDFE] text-black px-4 py-2 rounded"
                    >
                      + Add Phone Number
                    </button>
                  </div>
                </div>

                {/* Add New IMEI Number */}
                <div className="w-full md:w-1/3 lg:w-1/3 xl:w-1/4">
                  <h6 className="text-sm font-medium text-gray-700 mb-2">Add New IMEI Number</h6>
                  <div className="flex flex-col gap-4">
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
                          setImeiNumbers((prev) => [...prev, imeiInput]);
                          setImeiInput(""); // Clear the input field
                        }
                      }}
                      className="mt-2 bg-[#41FDFE] text-black px-4 py-2 rounded"
                    >
                      Add IMEI Number
                    </button>
                  </div>
                  {imeiNumbers.length > 0 && (
                    <div className="mt-4">
                      <p className="w-100 text-start font-medium text-gray-700">
                        Select from Existing IMEI Numbers
                      </p>
                      <div className="flex flex-wrap gap-4">
                        {imeiNumbers.map((imei, index) => (
                          <label key={index} className="flex items-center">
                            <input
                              type="checkbox"
                              value={imei}
                              className="mr-2"
                            />
                            {imei}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="text-center mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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
