import React, { useState } from "react";
import axios from "axios";
import luhn from 'luhn-generator';

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
  const [error, setError] = useState({
    isValidError: "",
    isInvalidError: "",
  });
  const [phoneDetails, setPhoneDetails] = useState(null);

  const fetchPhoneDetails = async (tac) => {
    setError({
      isValidError: "",
      isInvalidError: "",
    });
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

      if (response.status !== 200) {
        setError({
          isValidError: "",
          isInvalidError: "Invalid IMEI number",
        });
        return;
      }

      const data = response.data;
      setPhoneDetails({
        model: data.device.model || "Unknown Model",
        name: data.device.name || "Unknown Name",
        brand: data.device.brand || "Unknown Brand"
      });
    } catch (error) {
      setError({
        isValidError: "",
        isInvalidError: "Invalid IMEI number",
      });
    }
  };

  const validateIMEI = (imei) => {
    imei = imei.replace(/\D/g, '');
    if (imei.length !== 15) {
      setError({
        isValidError: "",
        isInvalidError: "IMEI must be 15 digits",
      });
      return false;
    }
    const isValid = luhn.validate(imei);
    if (!isValid) {
      setError({
        isValidError: "",
        isInvalidError: "Invalid IMEI",
      });
    }
    setError({
      isValidError: "IMEI is Valid!",
      isInvalidError: "",
    });
    return isValid;
  };

  const handleIMEIChange = async (e) => {
    const imei = e.target.value.trim();
    if (!validateIMEI(imei)) {
      setPhoneDetails(null);
      return;
    }

    const tac = imei.substring(0, 8);
    await fetchPhoneDetails(tac);
  };

  return (
    <div>
      <h3 className="text-xl text-gray-800 font-semibold mb-4">IMEI Information</h3>
      <input
        type="text"
        placeholder="Enter IMEI Number"
        onChange={handleIMEIChange}
        className="border-b border-gray-300 py-2 w-full"
      />
      <p className={error.isValidError ? "text-green-500" : "text-red-500"}>
        {error.isValidError || error.isInvalidError}
      </p>
      {phoneDetails && (
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
    </div>
  );
}

export default IMEIForm;