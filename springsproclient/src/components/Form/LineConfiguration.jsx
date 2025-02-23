import React, { useState } from "react";

function LineConfiguration({ carrierInfos, shippingInfos, onLinesChange }) {
    const [showModal, setShowModal] = useState(false);
    const [numLines, setNumLines] = useState(1);
    const [lineFields, setlineFields] = useState([]);

    // Handle input change for number of lines
    const handleNumLinesChange = (e) => {
        const value = parseInt(e.target.value, 10) || 1;
        setNumLines(value);
    };

    // Generate form fields based on the number of lines
    const handleGenerateLines = () => {
        if (lineFields.length === 0) { // Prevent reset if already generated
            const newFields = Array.from({ length: numLines }, () => ({
                accountNumber: "",
                portOutPin: "",
                phoneNumber: "",
                carrier: "",
                imei: "",
                shippingAddress: "",
            }));
            setlineFields(newFields);
        }
        setShowModal(true);
    };
    

    // Handle field updates
    const handleFieldChange = (index, field, value) => {
        const updatedLines = [...lineFields];
        updatedLines[index][field] = value;
        setlineFields(updatedLines);
        onLinesChange(updatedLines); // Send updated data to parent
    };

    return (
        <div className="text-center">

            <div className="flex items-center justify-center gap-4">
                <input
                    type="number"
                    min="1"
                    value={numLines}
                    onChange={handleNumLinesChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 w-40"
                    placeholder="Enter number of lines"
                />
                <button type="button"
                    onClick={handleGenerateLines}
                    className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-600 transition duration-200"
                >
                    Generate Line Configuration
                </button>
            </div>


            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-20">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 p-6 relative z-60 max-h-[80vh] overflow-y-auto">
                        <button type="button"
                            className="absolute top-3 right-3 text-gray-500 hover:text-black"
                            onClick={() => setShowModal(false)}
                        >
                            ✕
                        </button>
                        <h2 className="text-3xl font-bold text-center mb-6">Configure Lines</h2>
                        <div className="mt-6">
                            {lineFields.map((account, index) => (
                                <div key={index} className="space-y-4 border-b pb-4">
                                    <h3 className="text-2xl font-bold">Line {index + 1}</h3>
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
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LineConfiguration;