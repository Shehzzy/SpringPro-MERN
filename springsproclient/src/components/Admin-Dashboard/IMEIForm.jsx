import React, { useState } from "react";
import axios from "axios";
import luhn from 'luhn-generator';

function IMEIForm({
  onSecurityCheck,
  shippingInfos,
  carrierInfos,
  accountFields,
  setAccountFields
}) {

  console.log(accountFields)
  const token = localStorage.getItem("jwt_token");
  const [error, setError] = useState({ isValidError: "", isInvalidError: "" });
  const [phoneDetails, setPhoneDetails] = useState(null);

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
          brand: data.device.brand || "Unknown Brand"
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
    imei = imei.replace(/\D/g, '');
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

  const handleFieldChange = (index, field, value) => {
    const updatedAccounts = [...accountFields];
    if (field === "shippingAddress") {
      updatedAccounts[index].shippingAddress = value;
    } else {
      updatedAccounts[index][field] = value;
    }
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
        shippingAddress: { attentionName: "", address: "", city: "", state: "", zip: "" },
      },
    ]);
  };

  return (
    <div>
      <div className="container-fluid mx-auto">
        {accountFields.map((account, index) => (
          <div key={index} className="space-y-4 mb-8 p-6 bg-gray-50 rounded-lg shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">IMEI Number</label>
                <input
                  type="text"
                  placeholder="Enter IMEI Number"
                  value={account.imei}
                  onChange={(e) => handleFieldChange(index, "imei", e.target.value)}
                  onBlur={handleIMEIChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

             
            </div>

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
                  value={account.shippingAddress.attentionName}
                  onChange={(e) => {
                    const selectedAddress = shippingInfos.find(info => info.attentionname === e.target.value);
                    handleFieldChange(index, "shippingAddress", selectedAddress || { attentionName: "", address: "", city: "", state: "", zip: "" });
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Trade Smartphone?</label>
                <select
                  value={account.tradeSmartphone ? "trade" : "notrade"}
                  onChange={(e) => handleFieldChange(index, "tradeSmartphone", e.target.value === "trade")}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="trade">I Want to Trade Smartphone</option>
                  <option value="notrade">Bring Your Own Phone</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Purchase Smartphone?</label>
                <select
                  value={account.purchaseSmartphone ? "purchase" : "nopurchase"}
                  onChange={(e) => handleFieldChange(index, "purchaseSmartphone", e.target.value === "purchase")}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="purchase">I Want to Purchase Smartphone</option>
                  <option value="nopurchase">Bring Your Own Phone</option>
                </select>
              </div>
            </div>

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