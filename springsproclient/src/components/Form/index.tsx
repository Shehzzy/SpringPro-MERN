import React, { useState, FormEvent } from "react";
import { useForm, ValidationError } from "@formspree/react";
import axios from "axios";

const Form: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phonenumber: string;
    agreementtype: string;
    eip: string;
    promotion: string;
    paperless: string;
    specialinstruction: string;
    businesslegalname: string;
    businessaddress: string;
    businesscity: string;
    businessstate: string;
    businesszip: string;
    taxid: string;
    locationid: string;
    contactname: string;
    contactphone: string;
    contactemail: string;
    billtomobile: string;
    creditcardpayment: string;
    singleormultiaddresshipment: string;
    attentionname: string;
    shippingaddress: string;
    shippingcity: string;
    shippingstate: string;
    shippingzip: string;
    currentwirelesscarrier: string;
    accountnumber: string;
    pinorpassword: string;
    ssnortaxid: string;
    billingname: string;
    billingaddress: string;
    billingcity: string;
    billingstate: string;
    billingzip: string;
    authorizedname: string;
  }>({
    name: "",
    email: "",
    phonenumber: "",
    agreementtype: "",
    eip: "",
    promotion: "",
    paperless: "",
    specialinstruction: "",
    businesslegalname: "",
    businessaddress: "",
    businesscity: "",
    businessstate: "",
    businesszip: "",
    taxid: "",
    locationid: "",
    contactname: "",
    contactphone: "",
    contactemail: "",
    billtomobile: "",
    attentionname: "",
    creditcardpayment: "",
    singleormultiaddresshipment: "",
    shippingaddress: "",
    shippingcity: "",
    shippingstate: "",
    shippingzip: "",
    currentwirelesscarrier: "",
    accountnumber: "",
    pinorpassword: "",
    ssnortaxid: "",
    billingname: "",
    billingaddress: "",
    billingcity: "",
    billingstate: "",
    billingzip: "",
    authorizedname: "",
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [state, handleSubmit] = useForm("xanykyav");

  // Update form data state on input change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors([]); // Clear errors on change
  };

  // Combine all fields into a single string
  const getCombinedData = () => {
    return Object.entries(formData)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n"); // Newline separator for each field
  };
  const validateCurrentStep = (): boolean => {
    const missingFields: string[] = [];
    // Add validation logic for required fields for each step
    // For example:
    if (step === 1 && !formData.name) missingFields.push("Name");
    if (step === 1 && !formData.email) missingFields.push("Email");
    if (step === 1 && !formData.phonenumber) missingFields.push("Phone Number");
    if (step === 2 && !formData.agreementtype)
      missingFields.push("Agreement Type");
    if (step === 2 && !formData.promotion) missingFields.push("Promotion");
    if (step === 2 && !formData.paperless) missingFields.push("PaperLess");
    if (step === 2 && !formData.specialinstruction)
      missingFields.push("Special Instruction");
    if (step === 3 && !formData.businesslegalname)
      missingFields.push("Business Legal Name");
    if (step === 3 && !formData.businessaddress)
      missingFields.push("Business Address");
    if (step === 3 && !formData.businesscity)
      missingFields.push("Business City");
    if (step === 3 && !formData.businessstate)
      missingFields.push("Business State");
    if (step === 3 && !formData.taxid) missingFields.push("TaxID");
    if (step === 3 && !formData.businesszip) missingFields.push("Business Zip");
    if (step === 3 && !formData.locationid) missingFields.push("LocationID");
    if (step === 3 && !formData.contactname) missingFields.push("Contact Name");
    if (step === 3 && !formData.contactemail)
      missingFields.push("Contact Email");
    if (step === 3 && !formData.contactphone)
      missingFields.push("Contact Phone");
    if (step === 4 && !formData.billtomobile)
      missingFields.push("Bill to Mobile");
    if (step === 4 && !formData.creditcardpayment)
      missingFields.push("Credit Card Payement");
    if (step === 5 && !formData.singleormultiaddresshipment)
      missingFields.push("Single or Multi Address Shipment");
    if (step === 5 && !formData.attentionname)
      missingFields.push("Attention Name");
    if (step === 5 && !formData.shippingaddress)
      missingFields.push("Shipping Address");
    if (step === 5 && !formData.shippingcity)
      missingFields.push("Shipping City");
    if (step === 5 && !formData.shippingstate)
      missingFields.push("Shipping State");
    if (step === 5 && !formData.shippingzip) missingFields.push("Shipping Zip");
    if (step === 6 && !formData.currentwirelesscarrier)
      missingFields.push("Current Wireless Carrier");
    if (step === 6 && !formData.accountnumber)
      missingFields.push("Account Number");
    if (step === 6 && !formData.pinorpassword)
      missingFields.push("Pin or Password");
    if (step === 6 && !formData.ssnortaxid) missingFields.push("SSN or TaxID");
    if (step === 6 && !formData.billingname) missingFields.push("Billing Name");
    if (step === 6 && !formData.billingaddress)
      missingFields.push("Billing Address");
    if (step === 6 && !formData.billingcity) missingFields.push("Billing City");
    if (step === 6 && !formData.billingstate)
      missingFields.push("Billing State");
    if (step === 6 && !formData.billingzip) missingFields.push("Biling Zip");
    if (step === 6 && !formData.authorizedname)
      missingFields.push("Authorized Name");

    if (missingFields.length > 0) {
      setErrors([
        `Step ${step}: Missing the following fields - ${missingFields.join(
          ", "
        )}`,
      ]);
      return false;
    }

    return true;
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
    setErrors([]); // Clear errors when going back
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateCurrentStep()) {
      const combinedData = getCombinedData();
      try {
        const token = localStorage.getItem("jwt_token");

        if (!token) {
          setErrors(["Authentication token missing"]);
          return;
        }
        const response = await axios.post(
          "http://localhost:8000/api/order/create-order",
          {
            ...formData, // Send form data in the body of the request
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
            },
          }
        );

        // if (response.status === 201) {
        //   setSuccessMessage('Order created successfully!');
        //   // Optionally redirect or perform other actions
        // }
      } catch (error) {
        console.error("There was an error creating the order:", error);
        setErrors(["An error occurred while creating the order."]);
      }
    }
  };

  return (
    <section className="py-24 mt-[120px] px-8 text-center bg-white">
      <div className="container mx-auto w-full ">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-2">
          Ready to Make the Network?
        </h2>
        <p className="text-md text-gray-500 mt-4 mb-6">
          It’s time to stop overpaying for your services. Fill out the form
          below to get started.
        </p>

        <div className="flex items-center justify-center py-12">
          {[
            "AT&T Seller Information",
            "AT&T Account Option",
            "AT&T Account Information",
            "Order Payment Options",
            "Order Shipping Information",
            "Port Information",
          ].map((label, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`h-12 w-12 rounded-full flex items-center justify-center ${
                  step === index + 1
                    ? "bg-[#41FDFE] text-white"
                    : "bg-white text-black border border-gray-800"
                } transition-all duration-300`}
              >
                {index + 1}
              </div>
              {index < 5 && (
                <span className="w-2 sm:w-10 border-t border-gray-800"></span>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={onSubmit} className="max-w-2xl mx-auto space-y-6">
          {step === 1 && (
            <div>
              <h3 className="text-xl text-gray-800 font-semibold mb-4 sm:text-center text-start">
                AT&T Seller Information
              </h3>
              <div className="grid grid-cols-1 mt-10 md:grid-cols-3 gap-4">
                <div className="w-full">
                  <h6 className="text-[#3C3C3C] sm:text-center text-start">
                    Name
                  </h6>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border-b focus:outline-none border-gray-300 py-2 w-full"
                  />
                </div>

                <div>
                  <h6 className="text-[#3C3C3C] sm:text-center text-start">
                    Email
                  </h6>

                  <input
                    type="text"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border-b focus:outline-none border-gray-300 py-2 w-full"
                  />
                </div>
                <div>
                  <h6 className="text-[#3C3C3C] sm:text-center text-start">
                    Phone
                  </h6>

                  <input
                    name="phonenumber"
                    placeholder="Enter Phone"
                    value={formData.phonenumber}
                    onChange={handleChange}
                    className="w-full  border-b border-gray-300 py-2"
                  />
                </div>
              </div>

              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
              />
            </div>
          )}

          {step === 2 && (
            <>
              <h3 className="text-xl text-gray-800 font-semibold mb-4 sm:text-center text-start">
                AT&T Account Option
              </h3>
              <div className="grid grid-cols-1 items-end mt-10 md:grid-cols-3 gap-4">
                <select
                  name="agreementtype"
                  value={formData.agreementtype}
                  onChange={handleChange}
                  className="border-b h-10 border-gray-300 "
                >
                  <option value="">Select Agreement Type</option>
                  <option value="amb">AMB</option>
                  <option value="acda">ACDA Attainment/MAC</option>
                </select>

                {formData.agreementtype === "acda" && (
                  <input
                    name="eip"
                    placeholder="Enter What EIP Limit is needed"
                    value={formData.eip}
                    onChange={handleChange}
                    className="w-full mt-4 border-b border-gray-300 py-2"
                  />
                )}
                <select
                  name="promotion"
                  value={formData.promotion}
                  onChange={handleChange}
                  className="border-b h-10 border-gray-300 py-2"
                >
                  <option value="">Promotions</option>
                  <option value="accepted">Accepted</option>
                  <option value="expected">Expected</option>
                </select>

                {/* Paperless Billing Section */}
                <div className="mt-4">
                  <h4 className="text-lg text-gray-800 font-semibold mb-2">
                    Paperless Billing
                  </h4>
                  <div className="flex items-center space-x-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paperless"
                        value="accepted"
                        checked={formData.paperless === "accepted"}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Accepted
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paperless"
                        value="declined"
                        checked={formData.paperless === "declined"}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Declined
                    </label>
                  </div>
                </div>
                <div className="">
                  <textarea
                    name="specialinstruction"
                    value={formData.specialinstruction}
                    className="w-full"
                    onChange={handleChange}
                    placeholder="Enter Special Instruction"
                    style={{ resize: "none" }}
                    id=""
                  ></textarea>
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <div>
              <h3 className="text-xl text-gray-800 font-semibold mb-4 sm:text-center text-start">
                AT&T Account Information
              </h3>
              <div className="grid grid-cols-1 mt-10 md:grid-cols-3 gap-4">
                <div className="mb-4">
                  <h6 className="text-sm md:text-center text-start font-medium text-gray-700">
                    Business Legal Name
                  </h6>
                  <input
                    type="text"
                    name="businesslegalname"
                    placeholder="Enter Enter Business Legal Name"
                    value={formData.businesslegalname}
                    onChange={handleChange}
                    className="border-b focus:outline-none border-gray-300 py-2 w-full"
                  />
                </div>

                <div className="mb-4">
                  <h6 className="text-sm md:text-center text-start font-medium text-gray-700">
                    Business Address
                  </h6>
                  <input
                    type="text"
                    name="businessaddress"
                    placeholder="Enter Enter Business Address"
                    value={formData.businessaddress}
                    onChange={handleChange}
                    className="border-b focus:outline-none border-gray-300 py-2 w-full"
                  />
                </div>

                <div className="mb-4">
                  <h6 className="text-sm md:text-center text-start font-medium text-gray-700">
                    Business City
                  </h6>
                  <input
                    type="text"
                    name="businesscity"
                    placeholder="Enter Enter Business City"
                    value={formData.businesscity}
                    onChange={handleChange}
                    className="border-b focus:outline-none border-gray-300 py-2 w-full"
                  />
                </div>

                <div className="mb-4">
                  <h6 className="text-sm md:text-center text-start font-medium text-gray-700">
                    Business State
                  </h6>
                  <input
                    type="text"
                    name="businessstate"
                    placeholder="Enter Enter Business State"
                    value={formData.businessstate}
                    onChange={handleChange}
                    className="border-b focus:outline-none border-gray-300 py-2 w-full"
                  />
                </div>

                <div className="mb-4">
                  <h6 className="text-sm md:text-center text-start font-medium text-gray-700">
                    Business Zip
                  </h6>
                  <input
                    type="text"
                    name="businesszip"
                    placeholder="Enter Enter Business Zip"
                    value={formData.businesszip}
                    onChange={handleChange}
                    className="border-b focus:outline-none border-gray-300 py-2 w-full"
                  />
                </div>

                <div className="mb-4">
                  <h6 className="text-sm md:text-center text-start font-medium text-gray-700">
                    Tax ID
                  </h6>
                  <input
                    type="text"
                    name="taxid"
                    placeholder="Enter Enter Tax ID"
                    value={formData.taxid}
                    onChange={handleChange}
                    className="border-b focus:outline-none border-gray-300 py-2 w-full"
                  />
                </div>

                <div className="mb-4">
                  <h6 className="text-sm md:text-center text-start font-medium text-gray-700">
                    Contact Name
                  </h6>
                  <input
                    type="text"
                    name="contactname"
                    placeholder="Enter Enter Contact Name"
                    value={formData.contactname}
                    onChange={handleChange}
                    className="border-b focus:outline-none border-gray-300 py-2 w-full"
                  />
                </div>

                <div className="mb-4">
                  <h6 className="text-sm md:text-center text-start font-medium text-gray-700">
                    Contact Phone
                  </h6>
                  <input
                    type="text"
                    name="contactphone"
                    placeholder="Enter Enter Contact Phone"
                    value={formData.contactphone}
                    onChange={handleChange}
                    className="border-b focus:outline-none border-gray-300 py-2 w-full"
                  />
                </div>

                <div className="mb-4">
                  <h6 className="text-sm md:text-center text-start font-medium text-gray-700">
                    Contact Email
                  </h6>
                  <input
                    type="email"
                    name="contactemail"
                    placeholder="Enter Enter Contact Email"
                    value={formData.contactemail}
                    onChange={handleChange}
                    className="border-b focus:outline-none border-gray-300 py-2 w-full"
                  />
                </div>

                <div className="mb-4">
                  <h6 className="text-sm md:text-center text-start font-medium text-gray-700">
                    Location ID
                  </h6>
                  <input
                    type="text"
                    name="locationid"
                    placeholder="Enter Enter Location ID"
                    value={formData.locationid}
                    onChange={handleChange}
                    className="border-b focus:outline-none border-gray-300 py-2 w-full"
                  />
                </div>
              </div>
            </div>
          )}
          {step === 4 && (
            <div>
              <h3 className="text-xl text-gray-800 font-semibold mb-4 sm:text-center text-start">
                Order Payment Options
              </h3>
              <div className="grid items-end grid-cols-1 mt-10 md:grid-cols-3 gap-4">
                <select
                  name="billtomobile"
                  value={formData.billtomobile}
                  onChange={handleChange}
                  className="border-b h-10 border-gray-300 py-2"
                >
                  <option value="">Bill to Mobile</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                <select
                  name="creditcardpayment"
                  value={formData.creditcardpayment}
                  onChange={handleChange}
                  className="border-b h-10 border-gray-300 py-2"
                >
                  <option value="">Credit Card Payement?</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h3 className="text-xl text-gray-800 font-semibold mb-4 sm:text-center text-start">
                Order Shipping Information
              </h3>
              <div className="grid grid-cols-1 mt-10 md:grid-cols-3 gap-4">
                <select
                  name="singleormultiaddresshipment"
                  value={formData.singleormultiaddresshipment}
                  onChange={handleChange}
                  className="border-b mb-4 border-gray-300 py-2"
                >
                  <option value="">Select Shipment Mode</option>
                  <option value="yes">Single Shipment Address</option>
                  <option value="no">Multiple Shipment Address</option>
                </select>
                <div className="mb-4">
                  <h6 className="text-sm md:text-center text-start font-medium text-gray-700">
                    Attention Name
                  </h6>
                  <input
                    type="text"
                    name="attentionname"
                    placeholder="Enter Enter Attention Name"
                    value={formData.attentionname}
                    onChange={handleChange}
                    className="border-b focus:outline-none border-gray-300 py-2 w-full"
                  />
                </div>

                <div className="mb-4">
                  <h6 className="text-sm md:text-center text-start font-medium text-gray-700">
                    Shipping Address
                  </h6>
                  <input
                    type="text"
                    name="shippingaddress"
                    placeholder="Enter Enter Shipping Address"
                    value={formData.shippingaddress}
                    onChange={handleChange}
                    className="border-b focus:outline-none border-gray-300 py-2 w-full"
                  />
                </div>

                <div className="mb-4">
                  <h6 className="text-sm md:text-center text-start font-medium text-gray-700">
                    Shipping City
                  </h6>
                  <input
                    type="text"
                    name="shippingcity"
                    placeholder="Enter Enter Shipping City"
                    value={formData.shippingcity}
                    onChange={handleChange}
                    className="border-b focus:outline-none border-gray-300 py-2 w-full"
                  />
                </div>

                <div className="mb-4">
                  <h6 className="text-sm md:text-center text-start font-medium text-gray-700">
                    Shipping State
                  </h6>
                  <input
                    type="text"
                    name="shippingstate"
                    placeholder="Enter Enter Shipping State"
                    value={formData.shippingstate}
                    onChange={handleChange}
                    className="border-b focus:outline-none border-gray-300 py-2 w-full"
                  />
                </div>

                <div className="mb-4">
                  <h6 className="text-sm md:text-center text-start font-medium text-gray-700">
                    Shipping Zip
                  </h6>
                  <input
                    type="text"
                    name="shippingzip"
                    placeholder="Enter Enter Shipping Zip"
                    value={formData.shippingzip}
                    onChange={handleChange}
                    className="border-b focus:outline-none border-gray-300 py-2 w-full"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 6 && (
            <div>
              <h3 className="text-xl text-gray-800 font-semibold mb-4 sm:text-center text-start">
                Carrier Port Information
              </h3>
              <div className="grid grid-cols-1 mt-10 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <h6 className="text-start md:text-center">
                    Current Wireless Carrier
                  </h6>
                  <input
                    type="text"
                    name="currentwirelesscarrier"
                    placeholder="Enter Enter Current Wireless Carrier"
                    value={formData.currentwirelesscarrier}
                    onChange={handleChange}
                    className="border-b focus:outline-none border-gray-300 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <h6 className="text-start md:text-center">Account Number</h6>
                  <input
                    type="text"
                    name="accountnumber"
                    placeholder="Enter Enter Account Number"
                    value={formData.accountnumber}
                    onChange={handleChange}
                    className="border-b focus:outline-none border-gray-300 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <h6 className="text-start md:text-center">Pin or Password</h6>
                  <input
                    type="text"
                    name="pinorpassword"
                    placeholder="Enter Enter Pin or Password"
                    value={formData.pinorpassword}
                    onChange={handleChange}
                    className="border-b focus:outline-none border-gray-300 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <h6 className="text-start md:text-center">SSN or TaxID</h6>
                  <input
                    type="text"
                    name="ssnortaxid"
                    placeholder="Enter Enter SSN or Tax ID"
                    value={formData.ssnortaxid}
                    onChange={handleChange}
                    className="border-b focus:outline-none border-gray-300 py-2 w-full"
                  />
                </div>

                <div className="mb-4">
                  <h6 className="text-start md:text-center">Billing Name</h6>
                  <input
                    type="text"
                    name="billingname"
                    placeholder="Enter Enter Billing Name"
                    value={formData.billingname}
                    onChange={handleChange}
                    className="border-b focus:outline-none border-gray-300 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <h6 className="text-start md:text-center">Billing Address</h6>
                  <input
                    type="text"
                    name="billingaddress"
                    placeholder="Enter Enter Billing Address"
                    value={formData.billingaddress}
                    onChange={handleChange}
                    className="border-b focus:outline-none border-gray-300 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <h6 className="text-start md:text-center">Billing City</h6>
                  <input
                    type="text"
                    name="billingcity"
                    placeholder="Enter Enter Billing City"
                    value={formData.billingcity}
                    onChange={handleChange}
                    className="border-b focus:outline-none border-gray-300 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <h6 className="text-start md:text-center">Billing State</h6>
                  <input
                    type="text"
                    name="billingstate"
                    placeholder="Enter Enter Billing State"
                    value={formData.billingstate}
                    onChange={handleChange}
                    className="border-b focus:outline-none border-gray-300 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <h6 className="text-start md:text-center">Billing Zip</h6>
                  <input
                    type="text"
                    name="billingzip"
                    placeholder="Enter Enter Billing Zip"
                    value={formData.billingzip}
                    onChange={handleChange}
                    className="border-b focus:outline-none border-gray-300 py-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <h6 className="text-start md:text-center">Authorized Name</h6>
                  <input
                    type="text"
                    name="authorizedname"
                    placeholder="Enter Enter Authorized Name"
                    value={formData.authorizedname}
                    onChange={handleChange}
                    className="border-b focus:outline-none border-gray-300 py-2 w-full"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col mt-8">
            {errors.length > 0 && (
              <p className="text-red-500 text-sm mb-4">{errors.join(", ")}</p>
            )}

            <div className="flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-[#41FDFE] text-black px-6 py-3 rounded-full"
                >
                  Previous
                </button>
              )}
              {step < 6 && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-[#41FDFE] text-black px-6 py-3 rounded-full"
                >
                  Next
                </button>
              )}
              {step === 6 && (
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="bg-[#41FDFE] text-black px-6 py-3 rounded-full"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </form>

        {state.succeeded && (
          <p className="text-center text-green-500 mt-4">
            Thanks for submitting the form!
          </p>
        )}
      </div>
    </section>
  );
};

export default Form;
