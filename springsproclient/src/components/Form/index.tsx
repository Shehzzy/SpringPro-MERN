import React, { useState, FormEvent, useEffect } from "react";
import { useForm } from "@formspree/react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import OrderAssignment from "./OrderAssignment";

const Form: React.FC = () => {
  // State to manage multiple carrier information entries
  const carrierOptions = [
    {
      label: "T-Mobile (TMO ENDING WITH LAST 4 OF THE ACCOUNT NUMBER XXXX)",
      value: "TMO",
    },
    {
      label: "Verizon (VZ ENDING WITH LAST 4 OF THE ACCOUNT NUMBER XXXX)",
      value: "VZ",
    },
    {
      label: "MetroPCS (MET ENDING WITH LAST 4 OF THE ACCOUNT NUMBER XXXX)",
      value: "MET",
    },
    {
      label: "Spectrum (SPEC ENDING WITH LAST 4 OF THE ACCOUNT NUMBER XXXX)",
      value: "SPEC",
    },
    {
      label:
        "Total Wireless (TTL ENDING WITH LAST 4 OF THE ACCOUNT NUMBER XXXX)",
      value: "TTL",
    },
  ];
  const [carrierInfos, setCarrierInfos] = useState([
    {
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
      uniqueCode: "",
    },
  ]);

  // Function to handle changes in carrier information fields
  const handleCarrierInfoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setCarrierInfos((prev) =>
      prev.map((info, i) => (i === index ? { ...info, [name]: value } : info))
    );
    // Generate unique code whenever a relevant field changes
    if (
      name === "currentwirelesscarrier" ||
      name === "accountnumber" ||
      name === "pinorpassword"
    ) {
      const updatedInfo = { ...carrierInfos[index], [name]: value };
      const uniqueCode = generateUniqueCode(updatedInfo);
      setCarrierInfos((prev) =>
        prev.map((info, i) =>
          i === index ? { ...updatedInfo, uniqueCode } : info
        )
      );
    }
  };

  const generateUniqueCode = ({
    currentwirelesscarrier,
    accountnumber,
    pinorpassword,
  }) => {
    // Get the last 4 digits of the account number
    const last4AccountNumber = accountnumber.slice(-4);

    // Get the last 4 characters of the pin/password
    const last4Pin = pinorpassword.slice(-4);

    return `${currentwirelesscarrier}_${last4AccountNumber}_${last4Pin}`;
  };

  // Function to add a new carrier information entry
  const addCarrierInfo = () => {
    setCarrierInfos((prev) => [
      ...prev,
      {
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
        uniqueCode: "",
      },
    ]);
  };

  const [imeiInput, setImeiInput] = useState("");
  const [imeiNumbers, setImeiNumbers] = useState<string[]>([]);
  const [showAllImeis, setShowAllImeis] = useState(false);
  const [formData, setFormData] = useState({
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
    creditcardpayment: "",
    singleormultiaddresshipment: "",
    attentionname: "",
    shippingaddress: "",
    shippingcity: "",
    shippingstate: "",
    shippingzip: "",
    // currentwirelesscarrier: "",
    // accountnumber: "",
    // pinorpassword: "",
    // ssnortaxid: "",
    // billingname: "",
    // billingaddress: "",
    // billingcity: "",
    // billingstate: "",
    // billingzip: "",
    // authorizedname: "",
    companyname: "",
    imeiNumbers: imeiNumbers,
    carrierInfos: [],
    dealerCode: "",
    agentCode: "",
    existingFAN: "",
    existingBAN: "",
  });

  const customerData = {
    businesslegalname: formData.businesslegalname,
    businessaddress: formData.businessaddress,
    businesscity: formData.businesscity,
    businessstate: formData.businessstate,
    businesszip: formData.businesszip,
    taxid: formData.taxid,
    contactname: formData.contactname,
    contactphone: formData.contactphone,
    contactemail: formData.contactemail,
    locationid: formData.locationid,
    billtomobile: formData.billtomobile,
    creditcardpayment: formData.creditcardpayment,
    singleormultiaddresshipment: formData.singleormultiaddresshipment,
    attentionname: formData.attentionname,
    shippingaddress: formData.shippingaddress,
    shippingcity: formData.shippingcity,
    shippingstate: formData.shippingstate,
    shippingzip: formData.shippingzip,
    existingBAN: formData.existingBAN,
    existingFAN: formData.existingFAN,
  };

  const [errors, setErrors] = useState<any>({});
  const [state, handleSubmit] = useForm("xanykyav");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFirstOrder, setIsFirstOrder] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt_token");
  useEffect(() => {
    if (!token) {
      Swal.fire({
        title: "Login Required",
        text: "You need to log in first to place an order.",
        icon: "warning",
        confirmButtonText: "Go to Login",
      }).then(() => {
        navigate("/login");
      });
      return;
    }

    const fetchIMEINumbers = async () => {
      try {
        const response = await axios.get(
          "https://springprobackend-production.up.railway.app/api/order/imei",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const fetchedIMEINumbers = response.data.imeiNumbers.map(
            (imei) => imei.imei
          );
          setImeiNumbers(fetchedIMEINumbers);
        }
      } catch (error) {
        console.error("Error fetching IMEI numbers:", error);
        setErrors((prev) => ({
          ...prev,
          fetch: "An error occurred while fetching IMEI numbers.",
        }));
      }
    };

    const fetchUserOrderDetails = async () => {
      try {
        const response = await axios.get(
          "https://springprobackend-production.up.railway.app/api/order/get-user-orders",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          const userData = response.data.orders;

          if (userData[0]) {
            // Destructure and pick only the desired fields
            const {
              name,
              email,
              phonenumber,
              agreementtype,
              eip,
              promotion,
              paperless,
              specialinstruction,
              accountnumber,
            } = userData[0];

            // Update only the specified fields
            setFormData((prev) => ({
              ...prev,
              name: name || "",
              email: email || "",
              phonenumber: phonenumber || "",
              agreementtype: agreementtype || "",
              eip: eip || "",
              promotion: promotion || "",
              paperless: paperless || "",
              specialinstruction: specialinstruction || "",
              accountnumber: accountnumber,
            }));
          }

          if (userData.length > 0) {
            setIsFirstOrder(false); // Set false if user details are successfully fetched
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserOrderDetails();

    fetchIMEINumbers();
  }, [navigate]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear specific error on change
  };

  const validateForm = (): boolean => {
    const newErrors: any = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.phonenumber)
      newErrors.phonenumber = "Phone Number is required.";
    if (!formData.agreementtype)
      newErrors.agreementtype = "Agreement Type is required.";
    if (formData.agreementtype === "acda" && !formData.eip)
      newErrors.eip = "EIP Limit is required.";
    if (!formData.promotion) newErrors.promotion = "Promotion is required.";
    if (!formData.paperless)
      newErrors.paperless = "Paperless Billing is required.";
    if (!formData.businesslegalname)
      newErrors.businesslegalname = "Business Legal Name is required.";
    if (!formData.businessaddress)
      newErrors.businessaddress = "Business Address is required.";
    if (!formData.businesscity)
      newErrors.businesscity = "Business City is required.";
    if (!formData.businessstate)
      newErrors.businessstate = "Business State is required.";
    if (!formData.businesszip)
      newErrors.businesszip = "Business Zip is required.";
    if (!formData.taxid) newErrors.taxid = "Tax ID is required.";
    if (!formData.locationid) newErrors.locationid = "Location ID is required.";
    if (!formData.contactname)
      newErrors.contactname = "Contact Name is required.";
    if (!formData.contactphone)
      newErrors.contactphone = "Contact Phone is required.";
    if (!formData.contactemail)
      newErrors.contactemail = "Contact Email is required.";
    if (!formData.billtomobile)
      newErrors.billtomobile = "Bill to Mobile is required.";
    if (!formData.creditcardpayment)
      newErrors.creditcardpayment = "Credit Card Payment is required.";
    if (!formData.singleormultiaddresshipment)
      newErrors.singleormultiaddresshipment =
        "Single or Multi Address Shipment is required.";
    if (!formData.attentionname)
      newErrors.attentionname = "Attention Name is required.";
    if (!formData.shippingaddress)
      newErrors.shippingaddress = "Shipping Address is required.";
    if (!formData.shippingcity)
      newErrors.shippingcity = "Shipping City is required.";
    if (!formData.shippingstate)
      newErrors.shippingstate = "Shipping State is required.";
    if (!formData.shippingzip)
      newErrors.shippingzip = "Shipping Zip is required.";
    // if (!formData.currentwirelesscarrier)
    //   newErrors.currentwirelesscarrier =
    //     "Current Wireless Carrier is required.";
    // if (!formData.accountnumber)
    //   newErrors.accountnumber = "Account Number is required.";
    // if (!formData.pinorpassword)
    //   newErrors.pinorpassword = "Pin or Password is required.";
    // if (!formData.ssnortaxid)
    //   newErrors.ssnortaxid = "SSN or Tax ID is required.";
    // if (!formData.billingname)
    //   newErrors.billingname = "Billing Name is required.";
    // if (!formData.billingaddress)
    //   newErrors.billingaddress = "Billing Address is required.";
    // if (!formData.billingcity)
    //   newErrors.billingcity = "Billing City is required.";
    // if (!formData.billingstate)
    //   newErrors.billingstate = "Billing State is required.";
    // if (!formData.billingzip) newErrors.billingzip = "Billing Zip is required.";
    // if (!formData.authorizedname)
    //   newErrors.authorizedname = "Authorized Name is required.";
    if (!formData.companyname)
      newErrors.companyname = "Company Name is required.";
    if (!formData.dealerCode) newErrors.dealerCode = "Dealer Code is required.";
    if (!formData.agentCode) newErrors.agentCode = "Agent Code is required.";
    if (!formData.existingBAN)
      newErrors.existingBAN = "Existing BAN is required.";
    if (!formData.existingFAN)
      newErrors.existingFAN = "Existing FAN is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const token = localStorage.getItem("jwt_token");

        if (!token) {
          setErrors((prev) => ({
            ...prev,
            token: "Authentication token missing",
          }));
          return;
        }

        const response = await axios.post(
          "https://springprobackend-production.up.railway.app/api/order/create-order",
          {
            ...formData,
            imeiNumbers: imeiNumbers,
            customerData,
            carrierInfos: carrierInfos,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201) {
          console.log("Order created successfully!");
          setIsSubmitted(true);
        }
      } catch (error) {
        console.error("There was an error creating the order:", error);
        setErrors((prev) => ({
          ...prev,
          submit: "An error occurred while creating the order.",
        }));
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

        <form onSubmit={onSubmit} className="max-w-2xl mx-auto space-y-6">
          {/* Agent Information Start*/}
          <h3 className="text-xl text-gray-800 font-semibold mb-4 sm:text-center text-start">
            AT&T Seller Information
          </h3>
          <div className="grid grid-cols-1 mt-10 md:grid-cols-3 gap-4">
            <div className="w-full">
              <h6 className="text-[#3C3C3C] sm:text-center text-start">Name</h6>
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
                className="border-b focus:outline-none border-gray-300 py-2 w-full"
              />
              {errors.name && (
                <p className=" text-danger text-sm">{errors.name}</p>
              )}
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
              {errors.email && (
                <p className=" text-danger text-sm">{errors.email}</p>
              )}
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
                className="w-full border-b border-gray-300 py-2"
              />
              {errors.phonenumber && (
                <p className=" text-danger text-sm">{errors.phonenumber}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 mt-10 md:grid-cols-3 gap-4">
            <div className="w-full">
              <h6 className="text-[#3C3C3C] sm:text-center text-start">
                Dealer Code
              </h6>
              <input
                type="text"
                name="dealerCode"
                placeholder="Enter Dealer Code"
                value={formData.dealerCode}
                onChange={handleChange}
                className="border-b focus:outline-none border-gray-300 py-2 w-full"
              />
              {errors.dealerCode && (
                <p className=" text-danger text-sm">{errors.dealerCode}</p>
              )}
            </div>

            <div>
              <h6 className="text-[#3C3C3C] sm:text-center text-start">
                Agent Code
              </h6>
              <input
                type="text"
                name="agentCode"
                placeholder="Enter Agent Code"
                value={formData.agentCode}
                onChange={handleChange}
                className="border-b focus:outline-none border-gray-300 py-2 w-full"
              />
              {errors.agentCode && (
                <p className=" text-danger text-sm">{errors.agentCode}</p>
              )}
            </div>
          </div>

          <h3 className="text-xl text-gray-800 font-semibold sm:text-center text-start">
            AT&T Account Option
          </h3>
          <div className="grid grid-cols-1 items-end md:grid-cols-3 gap-4">
            <div className="w-full">
              {" "}
              {/* Wrap the select in a div */}
              <select
                name="agreementtype"
                value={formData.agreementtype}
                onChange={handleChange}
                className="border-b h-10 border-gray-300 w-full" // Added w-full for full width
              >
                <option value="">Select Agreement Type</option>
                <option value="amb">AMB</option>
                <option value="acda">ACDA Attainment/MAC</option>
              </select>
              {errors.agreementtype && (
                <p className=" text-danger text-sm">{errors.agreementtype}</p>
              )}{" "}
              {/* Error message */}
            </div>

            {formData.agreementtype === "acda" && (
              <div className="w-full">
                {" "}
                {/* Wrap the input in a div */}
                <input
                  name="eip"
                  placeholder="Enter What EIP Limit is needed"
                  value={formData.eip}
                  onChange={handleChange}
                  className="w-full mt-4 border-b border-gray-300 py-2"
                />
                {errors.eip && (
                  <p className=" text-danger text-sm">{errors.eip}</p>
                )}{" "}
                {/* Error message */}
              </div>
            )}

            <div className="w-full">
              {" "}
              {/* Wrap the select in a div */}
              <select
                name="promotion"
                value={formData.promotion}
                onChange={handleChange}
                className="border-b h-10 border-gray-300 w-full" // Added w-full for full width
              >
                <option value="">Promotions</option>
                <option value="accepted">Accepted</option>
                <option value="expected">Expected</option>
              </select>
              {errors.promotion && (
                <p className=" text-danger text-sm">{errors.promotion}</p>
              )}{" "}
              {/* Error message */}
            </div>

            <div className="mt-4 w-full">
              {" "}
              {/* Wrap the radio buttons in a div */}
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
              {errors.paperless && (
                <p className=" text-danger text-sm">{errors.paperless}</p>
              )}{" "}
              {/* Error message */}
            </div>

            <div className="w-full">
              {" "}
              {/* Wrap the textarea in a div */}
              <textarea
                name="specialinstruction"
                value={formData.specialinstruction}
                className="w-full"
                onChange={handleChange}
                placeholder="Enter Special Instruction"
                style={{ resize: "none" }}
              ></textarea>
              {errors.specialinstruction && (
                <p className=" text-danger text-sm">
                  {errors.specialinstruction}
                </p>
              )}{" "}
              {/* Error message */}
            </div>
          </div>

          {!isFirstOrder && (
            <OrderAssignment
              token={token}
              formData={formData}
              setFormData={setFormData}
            />
          )}

          {/* Agent Information End*/}
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
                placeholder="Enter Business Legal Name"
                value={formData.businesslegalname}
                onChange={handleChange}
                className="border-b focus:outline-none border-gray-300 py-2 w-full"
              />
              {errors.businesslegalname && (
                <p className=" text-danger text-sm">
                  {errors.businesslegalname}
                </p>
              )}
            </div>

            <div className="mb-4">
              <h6 className="text-sm md:text-center text-start font-medium text-gray-700">
                Business Address
              </h6>
              <input
                type="text"
                name="businessaddress"
                placeholder="Enter Business Address"
                value={formData.businessaddress}
                onChange={handleChange}
                className="border-b focus:outline-none border-gray-300 py-2 w-full"
              />
              {errors.businessaddress && (
                <p className=" text-danger text-sm">{errors.businessaddress}</p>
              )}
            </div>

            <div className="mb-4">
              <h6 className="text-sm md:text-center text-start font-medium text-gray-700">
                Business City
              </h6>
              <input
                type="text"
                name="businesscity"
                placeholder="Enter Business City"
                value={formData.businesscity}
                onChange={handleChange}
                className="border-b focus:outline-none border-gray-300 py-2 w-full"
              />
              {errors.businesscity && (
                <p className=" text-danger text-sm">{errors.businesscity}</p>
              )}
            </div>

            <div className="mb-4">
              <h6 className="text-sm md:text-center text-start font-medium text-gray-700">
                Business State
              </h6>
              <input
                type="text"
                name="businessstate"
                placeholder="Enter Business State"
                value={formData.businessstate}
                onChange={handleChange}
                className="border-b focus:outline-none border-gray-300 py-2 w-full"
              />
              {errors.businessstate && (
                <p className=" text-danger text-sm">{errors.businessstate}</p>
              )}
            </div>

            <div className="mb-4">
              <h6 className="text-sm md:text-center text-start font-medium text-gray-700">
                Business Zip
              </h6>
              <input
                type="text"
                name="businesszip"
                placeholder="Enter Business Zip"
                value={formData.businesszip}
                onChange={handleChange}
                className="border-b focus:outline-none border-gray-300 py-2 w-full"
              />
              {errors.businesszip && (
                <p className=" text-danger text-sm">{errors.businesszip}</p>
              )}
            </div>

            <div className="mb-4">
              <h6 className="text-sm md:text-center text-start font-medium text-gray-700">
                Tax ID
              </h6>
              <input
                type="text"
                name="taxid"
                placeholder="Enter Tax ID"
                value={formData.taxid}
                onChange={handleChange}
                className="border-b focus:outline-none border-gray-300 py-2 w-full"
              />
              {errors.taxid && (
                <p className=" text-danger text-sm">{errors.taxid}</p>
              )}
            </div>

            <div className="mb-4">
              <h6 className="text-sm md:text-center text-start font-medium text-gray-700">
                Contact Name
              </h6>
              <input
                type="text"
                name="contactname"
                placeholder="Enter Contact Name"
                value={formData.contactname}
                onChange={handleChange}
                className="border-b focus:outline-none border-gray-300 py-2 w-full"
              />
              {errors.contactname && (
                <p className=" text-danger text-sm">{errors.contactname}</p>
              )}
            </div>

            <div className="mb-4">
              <h6 className="text-sm md:text-center text-start font-medium text-gray-700">
                Contact Phone
              </h6>
              <input
                type="text"
                name="contactphone"
                placeholder="Enter Contact Phone"
                value={formData.contactphone}
                onChange={handleChange}
                className="border-b focus:outline-none border-gray  
                border-gray-300 py-2 w-full"
              />
              {errors.contactphone && (
                <p className=" text-danger text-sm">{errors.contactphone}</p>
              )}
            </div>

            <div className="mb-4">
              <h6 className="text-sm md:text-center text-start font-medium text-gray-700">
                Contact Email
              </h6>
              <input
                type="email"
                name="contactemail"
                placeholder="Enter Contact Email"
                value={formData.contactemail}
                onChange={handleChange}
                className="border-b focus:outline-none border-gray-300 py-2 w-full"
              />
              {errors.contactemail && (
                <p className=" text-danger text-sm">{errors.contactemail}</p>
              )}
            </div>

            <div className="mb-4">
              <h6 className="text-sm md:text-center text-start font-medium text-gray-700">
                Location ID
              </h6>
              <input
                type="text"
                name="locationid"
                placeholder="Enter Location ID"
                value={formData.locationid}
                onChange={handleChange}
                className="border-b focus:outline-none border-gray-300 py-2 w-full"
              />
              {errors.locationid && (
                <p className=" text-danger text-sm">{errors.locationid}</p>
              )}
            </div>

            <div className="mb-4">
              <h6 className="text-sm md:text-center text-start font-medium text-gray-700">
                Existing BAN
              </h6>
              <input
                type="text"
                name="existingBAN"
                placeholder="Enter Existing BAN"
                value={formData.existingBAN}
                onChange={handleChange}
                className="border-b focus:outline-none border-gray-300 py-2 w-full"
              />
              {errors.existingBAN && (
                <p className=" text-danger text-sm">{errors.existingBAN}</p>
              )}
            </div>

            <div className="mb-4">
              <h6 className="text-sm md:text-center text-start font-medium text-gray-700">
                Existing FAN
              </h6>
              <input
                type="text"
                name="existingFAN"
                placeholder="Enter Existing FAN"
                value={formData.existingFAN}
                onChange={handleChange}
                className="border-b focus:outline-none border-gray-300 py-2 w-full"
              />
              {errors.existingFAN && (
                <p className=" text-danger text-sm">{errors.existingFAN}</p>
              )}
            </div>
          </div>

          <h3 className="text-xl text-gray-800 font-semibold mb-4 sm:text-center text-start">
            Order Payment Options
          </h3>
          <div className="grid items-end grid-cols-1 mt-10 md:grid-cols-3 gap-4">
            <div className="w-full">
              {" "}
              {/* Wrap the first select in a div */}
              <select
                name="billtomobile"
                value={formData.billtomobile}
                onChange={handleChange}
                className="border-b h-10 border-gray-300 py-2 w-full" // Added w-full for full width
              >
                <option value="">Bill to Mobile</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {errors.billtomobile && (
                <p className=" text-danger text-sm">{errors.billtomobile}</p> // Error message
              )}
            </div>

            <div className="w-full">
              {" "}
              {/* Wrap the second select in a div */}
              <select
                name="creditcardpayment"
                value={formData.creditcardpayment}
                onChange={handleChange}
                className="border-b h-10 border-gray-300 py-2 w-full" // Added w-full for full width
              >
                <option value="">Credit Card Payment?</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {errors.creditcardpayment && (
                <p className=" text-danger text-sm">
                  {errors.creditcardpayment}
                </p> // Error message
              )}
            </div>
          </div>

          <h3 className="text-xl text-gray-800 font-semibold mb-4 sm:text-center text-start">
            Order Shipping Information
          </h3>
          <div className="grid grid-cols-1 mt-10 md:grid-cols-3 gap-4">
            <div className="w-full">
              {" "}
              {/* Wrap the select in a div */}
              <select
                name="singleormultiaddresshipment"
                value={formData.singleormultiaddresshipment}
                onChange={handleChange}
                className="border-b mb-4 border-gray-300 py-2 w-full" // Added w-full for full width
              >
                <option value="">Select Shipment Mode</option>
                <option value="yes">Single Shipment Address</option>
                <option value="no">Multiple Shipment Address</option>
              </select>
              {errors.singleormultiaddresshipment && (
                <p className=" text-danger text-sm">
                  {errors.singleormultiaddresshipment}
                </p> // Error message
              )}
            </div>

            <div className="mb-4 w-full">
              {" "}
              {/* Wrap the Attention Name input in a div */}
              <h6 className="text-sm md:text-center text-start font-medium text-gray-700">
                Attention Name
              </h6>
              <input
                type="text"
                name="attentionname"
                placeholder="Enter Attention Name"
                value={formData.attentionname}
                onChange={handleChange}
                className="border-b focus:outline-none border-gray-300 py-2 w-full"
              />
              {errors.attentionname && (
                <p className=" text-danger text-sm">{errors.attentionname}</p> // Error message
              )}
            </div>

            <div className="mb-4 w-full">
              {" "}
              {/* Wrap the Shipping Address input in a div */}
              <h6 className="text-sm md:text-center text-start font-medium text-gray-700">
                Shipping Address
              </h6>
              <input
                type="text"
                name="shippingaddress"
                placeholder="Enter Shipping Address"
                value={formData.shippingaddress}
                onChange={handleChange}
                className="border-b focus:outline-none border-gray-300 py-2 w-full"
              />
              {errors.shippingaddress && (
                <p className=" text-danger text-sm">{errors.shippingaddress}</p> // Error message
              )}
            </div>

            <div className="mb-4 w-full">
              {" "}
              {/* Wrap the Shipping City input in a div */}
              <h6 className="text-sm md:text-center text-start font-medium text-gray-700">
                Shipping City
              </h6>
              <input
                type="text"
                name="shippingcity"
                placeholder="Enter Shipping City"
                value={formData.shippingcity}
                onChange={handleChange}
                className="border-b focus:outline-none border-gray-300 py-2 w-full"
              />
              {errors.shippingcity && (
                <p className=" text-danger text-sm">{errors.shippingcity}</p> // Error message
              )}
            </div>

            <div className="mb-4 w-full">
              {" "}
              {/* Wrap the Shipping State input in a div */}
              <h6 className="text-sm md:text-center text-start font-medium text-gray-700">
                Shipping State
              </h6>
              <input
                type="text"
                name="shippingstate"
                placeholder="Enter Shipping State"
                value={formData.shippingstate}
                onChange={handleChange}
                className="border-b focus:outline-none border-gray-300 py-2 w-full"
              />
              {errors.shippingstate && (
                <p className=" text-danger text-sm">{errors.shippingstate}</p> // Error message
              )}
            </div>

            <div className="mb-4 w-full">
              {" "}
              {/* Wrap the Shipping Zip input in a div */}
              <h6 className="text-sm md:text-center text-start font-medium text-gray-700">
                Shipping Zip
              </h6>
              <input
                type="text"
                name="shippingzip"
                placeholder="Enter Shipping Zip"
                value={formData.shippingzip}
                onChange={handleChange}
                className="border-b focus:outline-none border-gray-300 py-2 w-full"
              />
              {errors.shippingzip && (
                <p className=" text-danger text-sm">{errors.shippingzip}</p> // Error message
              )}
            </div>
          </div>

          <h3 className="text-xl text-gray-800 font-semibold mb-4 sm:text-center text-start">
            Carrier Port Information
          </h3>
          {carrierInfos.map((info, index) => (
            <div
              key={index}
              className="grid grid-cols-1 mt-10 md:grid-cols-2 gap-4"
            >
              <div className="col-span-2 flex justify-between items-center">
                {index > 0 && (
                  <h4 className="text-lg font-semibold">
                    Carrier Port Info {index + 1}
                  </h4>
                )}
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setCarrierInfos((prev) =>
                        prev.filter((_, i) => i !== index)
                      );
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    - Remove
                  </button>
                )}
              </div>
              <div className="mb-4">
                <h6 className="text-start md:text-center">Select Carrier</h6>
                <select
                  name="currentwirelesscarrier"
                  value={info.currentwirelesscarrier}
                  onChange={(e) => handleCarrierInfoChange(e, index)}
                  className="border-b focus:outline-none border-gray-300 py-2 w-full"
                >
                  <option value="">Select Current Wireless Carrier</option>
                  {carrierOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.currentwirelesscarrier && (
                  <p className=" text-danger text-sm">
                    {errors.currentwirelesscarrier}
                  </p> // Error message
                )}
              </div>
              <div className="mb-4">
                <h6 className="text-start md:text-center">Account Number</h6>
                <input
                  type="text"
                  name="accountnumber"
                  placeholder="Enter Account Number"
                  value={info.accountnumber}
                  onChange={(e) => handleCarrierInfoChange(e, index)}
                  className="border-b focus:outline-none border-gray-300 py-2 w-full"
                />
                {errors.accountnumber && (
                  <p className=" text-danger text-sm">{errors.accountnumber}</p> // Error message
                )}
              </div>
              <div className="mb-4">
                <h6 className="text-start md:text-center">Pin or Password</h6>
                <input
                  type="text"
                  name="pinorpassword"
                  placeholder="Enter Pin or Password"
                  value={info.pinorpassword}
                  onChange={(e) => handleCarrierInfoChange(e, index)}
                  className="border-b focus:outline-none border-gray-300 py-2 w-full"
                />
                {errors.pinorpassword && (
                  <p className=" text-danger text-sm">{errors.pinorpassword}</p> // Error message
                )}
              </div>
              <div className="mb-4">
                <h6 className="text-start md:text-center">SSN or TaxID</h6>
                <input
                  type="text"
                  name="ssnortaxid"
                  placeholder="Enter SSN or Tax ID"
                  value={info.ssnortaxid}
                  onChange={(e) => handleCarrierInfoChange(e, index)}
                  className="border-b focus:outline-none border-gray-300 py-2 w-full"
                />
                {errors.ssnortaxid && (
                  <p className=" text-danger text-sm">{errors.ssnortaxid}</p> // Error message
                )}
              </div>
              <div className="mb-4">
                <h6 className="text-start md:text-center">Billing Name</h6>
                <input
                  type="text"
                  name="billingname"
                  placeholder="Enter Billing Name"
                  value={info.billingname}
                  onChange={(e) => handleCarrierInfoChange(e, index)}
                  className="border-b focus:outline-none border-gray-300 py-2 ```javascript
        w-full"
                />
                {errors.billingname && (
                  <p className=" text-danger text-sm">{errors.billingname}</p> // Error message
                )}
              </div>
              <div className="mb-4">
                <h6 className="text-start md:text-center">Billing Address</h6>
                <input
                  type="text"
                  name="billingaddress"
                  placeholder="Enter Billing Address"
                  value={info.billingaddress}
                  onChange={(e) => handleCarrierInfoChange(e, index)}
                  className="border-b focus:outline-none border-gray-300 py-2 w-full"
                />
                {errors.billingaddress && (
                  <p className=" text-danger text-sm">
                    {errors.billingaddress}
                  </p> // Error message
                )}
              </div>
              <div className="mb-4">
                <h6 className="text-start md:text-center">Billing City</h6>
                <input
                  type="text"
                  name="billingcity"
                  placeholder="Enter Billing City"
                  value={info.billingcity}
                  onChange={(e) => handleCarrierInfoChange(e, index)}
                  className="border-b focus:outline-none border-gray-300 py-2 w-full"
                />
                {errors.billingcity && (
                  <p className=" text-danger text-sm">{errors.billingcity}</p> // Error message
                )}
              </div>
              <div className="mb-4">
                <h6 className="text-start md:text-center">Billing State</h6>
                <input
                  type="text"
                  name="billingstate"
                  placeholder="Enter Billing State"
                  value={info.billingstate}
                  onChange={(e) => handleCarrierInfoChange(e, index)}
                  className="border-b focus:outline-none border-gray-300 py-2 w-full"
                />
                {errors.billingstate && (
                  <p className=" text-danger text-sm">{errors.billingstate}</p> // Error message
                )}
              </div>
              <div className="mb-4">
                <h6 className="text-start md:text-center">Billing Zip</h6>
                <input
                  type="text"
                  name="billingzip"
                  placeholder="Enter Billing Zip"
                  value={info.billingzip}
                  onChange={(e) => handleCarrierInfoChange(e, index)}
                  className="border-b focus:outline-none border-gray-300 py-2 w-full"
                />
                {errors.billingzip && (
                  <p className=" text-danger text-sm">{errors.billingzip}</p> // Error message
                )}
              </div>
              <div className="mb-4">
                <h6 className="text-start md:text-center">Authorized Name</h6>
                <input
                  type="text"
                  name="authorizedname"
                  placeholder="Enter Authorized Name"
                  value={info.authorizedname}
                  onChange={(e) => handleCarrierInfoChange(e, index)}
                  className="border-b focus:outline-none border-gray-300 py-2 w-full"
                />
                {errors.authorizedname && (
                  <p className=" text-danger text-sm">
                    {errors.authorizedname}
                  </p> // Error message
                )}
              </div>

              <div className="mb-4">
                <h6 className="text-start md:text-center">Unique Code</h6>
                <input
                  type="text"
                  name="uniqueCode"
                  value={info.uniqueCode}
                  readOnly
                  className="border-b focus:outline-none border-gray-300 py-2 w-full bg-gray-100"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addCarrierInfo}
            className="mt-4 bg-[#41FDFE] text-black px-4 py-2 rounded"
          >
            + Add Another Carrier Information
          </button>
          <h3 className="text-xl text-gray-800 font-semibold mb-4 sm:text-center text-start">
            Additional Information
          </h3>
          <div className="grid grid-cols-1 mt-10 md:grid-cols-3 gap-4">
            <div className="mb-4">
              <h6 className="text-sm md:text-center text-start font-medium text-gray-700">
                Company Name
              </h6>
              <input
                type="text"
                name="companyname"
                placeholder="Enter Company Name"
                value={formData.companyname}
                onChange={handleChange}
                className="border-b focus:outline-none border-gray-300 py-2 w-full"
              />
              {errors.companyname && (
                <p className=" text-danger text-sm">{errors.companyname}</p>
              )}
            </div>
            <div className="mb-4">
              <h6 className="text-start md:text-center">Account Number</h6>
              <input
                type="text"
                name="accountnumber"
                placeholder="Enter Account Number"
                value={formData.accountnumber}
                onChange={handleChange}
                className="border-b focus:outline-none border-gray-300 py-2 w-full"
                disabled={!isFirstOrder && !!formData.accountnumber}
              />
              {errors.accountnumber && (
                <p className=" text-danger text-sm">{errors.accountnumber}</p>
              )}
              {isFirstOrder && (
                <div className="d-flex justify-start">
                  <p className="text-danger text-sm mt-1 text-center">
                    This will only be filled out once.
                  </p>
                </div>
              )}
            </div>

            <div className="mb-4">
              <h6 className="text-sm md:text-center text-start font-medium text-gray-700">
                Add New IMEI Number
              </h6>
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

              {imeiNumbers.length > 0 && (
                <div className="mt-4">
                  <p className="w-100 md:text-center text-start font-medium text-gray-700">
                    Select from Existing IMEI Numbers
                  </p>
                  <div className="flex flex-col">
                    {(showAllImeis ? imeiNumbers : imeiNumbers.slice(0, 4)).map(
                      (imei, index) => (
                        <label key={index} className="flex items-center">
                          <input
                            type="checkbox"
                            value={imei}
                            onChange={(e) => {
                              if (e.target.checked) {
                                console.log(`${imei} selected`);
                              } else {
                                console.log(`${imei} deselected`);
                              }
                            }}
                            className="mr-2"
                          />
                          {imei}
                        </label>
                      )
                    )}
                  </div>

                  {imeiNumbers.length > 4 && (
                    <button
                      type="button"
                      onClick={() => setShowAllImeis(!showAllImeis)}
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(65 ,253 ,254) 0%, rgba(0,210,255,1) 100%)",
                      }}
                      className="transition-all text-black hover:bg-black hover:text-white inter text-xs px-4 py-2 font-semibold rounded-3xl"
                    >
                      {showAllImeis ? "See Less" : "See More"}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col mt-8">
            {Object.keys(errors).length > 0 && (
              <p className=" text-danger text-sm mb-4">
                Please fix the errors above.
              </p>
            )}
            <button
              type="submit"
              disabled={state.submitting}
              className="bg-[#41FDFE] text-black px-6 py-3 rounded-full"
            >
              Submit
            </button>
          </div>

          <div className="flex justify-start items-center">
            <div>
              <Link
                to={"/your-orders"}
                className="transition-all text-black hover:bg-black hover:text-white inter text-md px-4 py-3"
              >
                I want to see my orders
              </Link>
            </div>
          </div>
        </form>

        {isSubmitted && (
          <p className="text-center text-green-500 mt-4">
            Thanks for submitting the order!
          </p>
        )}
      </div>
    </section>
  );
};

export default Form;
