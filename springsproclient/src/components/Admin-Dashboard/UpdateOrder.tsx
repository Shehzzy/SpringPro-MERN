// ALot of changes left here.

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Swal from "sweetalert2";
import IMEIForm from "./IMEIForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCcVisa,
  faCcMastercard,
  faCcAmex,
  faCcDiscover,
  faCcJcb,
  faCcDinersClub,
  faCcStripe,
} from "@fortawesome/free-brands-svg-icons";

const UpdateOrder: React.FC = () => {
  // Function to map card type to FontAwesome icons
  const getCardIcon = (cardType: string) => {
    switch (cardType.toLowerCase()) {
      case "visa":
        return faCcVisa;
      case "mastercard":
        return faCcMastercard;
      case "amex":
      case "american express":
        return faCcAmex;
      case "discover":
        return faCcDiscover;
      case "jcb":
        return faCcJcb;
      case "dinersclub":
        return faCcDinersClub;
      case "unionpay":
        return faCcStripe; // UnionPay doesn't have a specific FontAwesome icon, so we'll use the Stripe icon as a placeholder
      case "maestro":
        return faCcMastercard; // Maestro can be closely represented by MasterCard's icon
      default:
        return null; // Return null for invalid or unrecognized card types
    }
  };

  const [accountFields, setAccountFields] = useState([]);
  const [cardType, setCardType] = useState("");
  const [ratePlan, setRatePlan] = useState("");
  const [isFormBlocked, setIsFormBlocked] = useState(false);
  const [smartphoneDetails, setSmartphoneDetails] = useState({
    brand: "",
    model: "",
    color: "",
    size: "",
  });

  // Callback function to receive updated accountFields data
  const handleAccountFieldsChange = (updatedAccountFields) => {
    setAccountFields(updatedAccountFields); // Update state in the parent
  };

  const { id } = useParams(); // Get the order ID from the URL
  const [formData, setFormData] = useState({
    ratePlan: "",
    buyNewPhone: "",
    smartphoneDetails: {
      brand: "",
      model: "",
      color: "",
      size: "",
    },

    // name: "",
    // email: "",
    agreementtype: "",
    eip: "",
    promotion: "",
    atntaccount: "",
    sansPartnerID: "",
    phonemodel: "",
    imeistatus: "",
    noCracks: "",
    screenDefects: "",
    factoryReset: "",
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
    paymentMethod: "",
    creditcardpayment: "",
    cardHolderName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
    cardBillingAddress: "",
    cardType: "",
    accountHolderName: "",
    sameAddress: "",
    routingNumber: "",
    checkingAccountNumber: "",
    singleormultiaddresshipment: "",
    attentionname: "",
    shippingaddress: "",
    shippingcity: "",
    shippingstate: "",
    shippingzip: "",
    accountnumber: "",
    imeiNumbers: "",
    carrierInfos: [],
    // dealerCode: "",
    existingFAN: "",
    existingBAN: "",
    tradeSmartphone: "",
    purchaseSmartphone: "",
    buyPhoneNumber: "",
    phoneUniqueCode: "",
    promoCode: "",
  });

  const handleRatePlanChange = (e) => {
    setFormData({ ...formData, ratePlan: e.target.value });
  };

  const handleBuyNewPhoneChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, buyNewPhone: value }));
    if (value !== "accepted") {
      setFormData((prev) => ({
        ...prev,
        phonemodel: "", // Reset phone model
        imeistatus: "", // Reset IMEI status
        noCracks: "", // Reset no cracks
        screenDefects: "", // Reset screen defects
        factoryReset: "", // Reset factory reset
      }));
    }
  };

  const handleSmartphoneDetailsChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "radio" || name === "phonemodel") {
      // Handle radio button changes
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      // Handle dropdown changes
      setSmartphoneDetails((prev) => {
        const updatedDetails = { ...prev, [name]: value };
        setFormData((prevFormData) => ({
          ...prevFormData,
          smartphoneDetails: updatedDetails,
        }));
        return updatedDetails;
      });
    }
  };

  // const handleSmartphoneDetailsChange = (
  //   e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  // ) => {
  //   const { name, value } = e.target;

  //   if (name === "phonemodel") {
  //     // Update the phonemodel field in formData
  //     setFormData((prev) => ({ ...prev, [name]: value }));
  //   } else {
  //     // Handle other smartphone details (brand, model, color, size)
  //     setSmartphoneDetails((prev) => {
  //       const updatedDetails = { ...prev, [name]: value };
  //       setFormData((prevFormData) => ({
  //         ...prevFormData,
  //         smartphoneDetails: updatedDetails,
  //       }));
  //       return updatedDetails;
  //     });
  //   }
  // };

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
    paymentMethod: formData.paymentMethod,
    cardHolderName: formData.cardHolderName,
    cardBillingAddress: formData.cardBillingAddress,
    cardType: formData.cardType,
    accountHolderName: formData.accountHolderName,
    routingNumber: formData.routingNumber,
    checkingAccountNumber: formData.checkingAccountNumber,
    creditcardpayment: formData.creditcardpayment,
    cardNumber: formData.cardNumber,
    cardExpiry: formData.cardExpiry,
    cardCVC: formData.cardCVC,
    singleormultiaddresshipment: formData.singleormultiaddresshipment,
    attentionname: formData.attentionname,
    shippingaddress: formData.shippingaddress,
    shippingcity: formData.shippingcity,
    shippingstate: formData.shippingstate,
    shippingzip: formData.shippingzip,
    existingBAN: formData.existingBAN,
    existingFAN: formData.existingFAN,
  };

  const [shippingInfos, setShippingInfos] = useState([
    {
      attentionname: "",
      shippingaddress: "",
      shippingstate: "",
      shippingzip: "",
      shippingcity: "",
      uniqueCode: "",
    },
  ]);

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
      phonenumbers: [""], // Array of phone numbers for this carrier
    },
  ]);

  const handleCarrierInfoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    phoneIndex?: number
  ) => {
    const { name, value } = e.target;

    setCarrierInfos((prev) =>
      prev.map((info, i) => {
        if (i === index) {
          let updatedInfo = { ...info };

          if (name === "phonenumbers" && phoneIndex !== undefined) {
            // Ensure phonenumbers is an array
            const updatedPhonenumbers = Array.isArray(info.phonenumbers)
              ? [...info.phonenumbers]
              : [];
            updatedPhonenumbers[phoneIndex] = value;
            updatedInfo = { ...info, phonenumbers: updatedPhonenumbers };
          } else {
            // Update other fields
            updatedInfo = { ...info, [name]: value };
          }

          // Generate unique code after updating the info
          const uniqueCode = generateUniqueCode(updatedInfo);
          return { ...updatedInfo, uniqueCode };
        }
        return info;
      })
    );
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
        phonenumbers: [""],
      },
    ]);
  };

  const carrierOptions = [
    {
      // label: "T-Mobile (TMO ENDING WITH LAST 4 OF THE ACCOUNT NUMBER XXXX)",
      label: "T-Mobile",
      value: "TMO",
    },
    {
      // label: "Verizon (VZ ENDING WITH LAST 4 OF THE ACCOUNT NUMBER XXXX)",
      label: "Verizon",
      value: "VZ",
    },
    {
      // label: "MetroPCS (MET ENDING WITH LAST 4 OF THE ACCOUNT NUMBER XXXX)",
      label: "MetroPCS",
      value: "MET",
    },
    {
      // label: "Spectrum (SPEC ENDING WITH LAST 4 OF THE ACCOUNT NUMBER XXXX)",
      label: "Spectrum",
      value: "SPEC",
    },
    {
      // label: "Total Wireless (TTL ENDING WITH LAST 4 OF THE ACCOUNT NUMBER XXXX)",
      label: "Total Wireless",
      value: "TTL",
    },
    {
      label: "Other",
      value: "Other",
    },
  ];

  // Function to handle changes in Shipping information fields
  const handleShippingInfoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setShippingInfos((prev) =>
      prev.map((info, i) => (i === index ? { ...info, [name]: value } : info))
    );
    // Generate unique code whenever a relevant field changes
    if (
      name === "attentionname" ||
      name === "shippingstate" ||
      name === "shippingzip" ||
      name === "shippingcity"
    ) {
      const updatedInfo = { ...shippingInfos[index], [name]: value };
      const uniqueCode = generateShippingUniqueCode(updatedInfo);
      setShippingInfos((prev) =>
        prev.map((info, i) =>
          i === index ? { ...updatedInfo, uniqueCode } : info
        )
      );
    }
  };

  const states = [
    { code: "AL", name: "Alabama" },
    { code: "AK", name: "Alaska" },
    { code: "AZ", name: "Arizona" },
    { code: "AR", name: "Arkansas" },
    { code: "CA", name: "California" },
    { code: "CO", name: "Colorado" },
    { code: "CT", name: "Connecticut" },
    { code: "DE", name: "Delaware" },
    { code: "FL", name: "Florida" },
    { code: "GA", name: "Georgia" },
    { code: "HI", name: "Hawaii" }, // Fixed typo here (was 'nametab')
    { code: "ID", name: "Idaho" },
    { code: "IL", name: "Illinois" },
    { code: "IN", name: "Indiana" },
    { code: "IA", name: "Iowa" },
    { code: "KS", name: "Kansas" },
    { code: "KY", name: "Kentucky" },
    { code: "LA", name: "Louisiana" },
    { code: "ME", name: "Maine" },
    { code: "MD", name: "Maryland" },
    { code: "MA", name: "Massachusetts" },
    { code: "MI", name: "Michigan" },
    { code: "MN", name: "Minnesota" },
    { code: "MS", name: "Mississippi" },
    { code: "MO", name: "Missouri" },
    { code: "MT", name: "Montana" },
    { code: "NE", name: "Nebraska" },
    { code: "NV", name: "Nevada" },
    { code: "NH", name: "New Hampshire" },
    { code: "NJ", name: "New Jersey" },
    { code: "NM", name: "New Mexico" },
    { code: "NY", name: "New York" },
    { code: "NC", name: "North Carolina" },
    { code: "ND", name: "North Dakota" },
    { code: "OH", name: "Ohio" },
    { code: "OK", name: "Oklahoma" },
    { code: "OR", name: "Oregon" },
    { code: "PA", name: "Pennsylvania" },
    { code: "RI", name: "Rhode Island" },
    { code: "SC", name: "South Carolina" },
    { code: "SD", name: "South Dakota" },
    { code: "TN", name: "Tennessee" },
    { code: "TX", name: "Texas" },
    { code: "UT", name: "Utah" },
    { code: "VT", name: "Vermont" },
    { code: "VA", name: "Virginia" },
    { code: "WA", name: "Washington" },
    { code: "WV", name: "West Virginia" },
    { code: "WI", name: "Wisconsin" },
    { code: "WY", name: "Wyoming" },
  ];

  const generateShippingUniqueCode = ({
    attentionname,
    shippingstate,
    shippingcity,
  }) => {
    // Get the last 4 digits of the account number
    const last4ShippingState = shippingstate.slice(-4);

    // Get the last 4 characters of the pin/password
    const last4ShippingCity = shippingcity.slice(-4);

    return `${attentionname}_${last4ShippingState}_${last4ShippingCity}`;
  };

  const generateUniqueCode = ({
    currentwirelesscarrier,
    accountnumber,
    pinorpassword,
    phonenumbers,
  }) => {
    // Get the last 4 digits of the account number
    const last4AccountNumber = accountnumber.slice(-4);

    // Get the last 4 characters of the pin/password
    const last4Pin = pinorpassword.slice(-4);

    // Get the last 4 digits of the first phone number
    const last4PhoneNumber = phonenumbers[0] ? phonenumbers[0].slice(-4) : "";

    return `${currentwirelesscarrier}_${last4AccountNumber}_${last4Pin}_${last4PhoneNumber}`;
  };

  // Function to add a new carrier information entry
  const addShippingInfo = () => {
    setShippingInfos((prev) => [
      ...prev,
      {
        attentionname: "",
        shippingaddress: "",
        shippingstate: "",
        shippingzip: "",
        shippingcity: "",
        uniqueCode: "",
      },
    ]);
  };

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt_token");

  const handleSecurityCheck = (status) => {
    setIsFormBlocked(!status); // If status is false, block the form
  };

  const [initialOrderData, setInitialOrderData] = useState({});
  useEffect(() => {
    if (!token) {
      Swal.fire({
        title: "Login Required",
        text: "You need to log in first to update an order.",
        icon: "warning",
        confirmButtonColor: "#41FDFE",
      }).then(() => {
        navigate("/login");
      });
      return;
    }

    // Fetch existing order details to populate the form
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `https://springprobackend-production.up.railway.app/api/order/get-single-order/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          const orderData = response.data.order; // Assuming we want the order data
          setFormData(orderData);
          setInitialOrderData(orderData); // Store initial data for comparison
          setFormData((prev) => ({
            ...prev,
            name: orderData.name || "",
            email: orderData.email || "",
            agreementtype: orderData.agreementtype || "",
            eip: orderData.eip || "",
            promotion: orderData.promotion || "",
            atntaccount: orderData.atntaccount || "",
            sansPartnerID: orderData.sansPartnerID || "",
            ratePlan: orderData.ratePlan || "",
            buyNewPhone: orderData.buyNewPhone || "",
            phonemodel: orderData.phonemodel || "",
            imeistatus: orderData.imeistatus || "",
            noCracks: orderData.noCracks || "",
            screenDefects: orderData.screenDefects || "",
            factoryReset: orderData.factoryReset || "",
            smartphoneDetails: {
              brand: orderData.smartphoneDetails.brand || "",
              model: orderData.smartphoneDetails.model || "",
              color: orderData.smartphoneDetails.color || "",
              size: orderData.smartphoneDetails.size || "",
            },
            paperless: orderData.paperless || "",
            billtomobile: orderData.customerId.billtomobile || "",
            paymentMethod: orderData.customerId.paymentMethod || "",
            creditcardpayment: orderData.customerId.creditcardpayment || "",
            cardHolderName: orderData.customerId.cardHolderName || "",
            cardNumber: orderData.customerId.cardNumber || "",
            cardExpiry: orderData.customerId.cardExpiry || "",
            cardCVC: orderData.customerId.cardCVC || "",
            cardBillingAddress: orderData.customerId.cardBillingAddress || "",
            cardType: orderData.customerId.cardType || "",
            accountHolderName: orderData.customerId.accountHolderName || "",
            sameAddress: orderData.customerId.sameAddress || "",
            routingNumber: orderData.customerId.routingNumber || "",
            checkingAccountNumber:
              orderData.customerId.checkingAccountNumber || "",
            singleormultiaddresshipment:
              orderData.customerId.singleormultiaddresshipment || "",
            businesslegalname: orderData.customerId.businesslegalname,
            businessaddress: orderData.customerId.businessaddress,
            businesscity: orderData.customerId.businesscity,
            businessstate: orderData.customerId.businessstate,
            businesszip: orderData.customerId.businesszip,
            taxid: orderData.customerId.taxid,
            locationid: orderData.customerId.locationid,
            contactname: orderData.customerId.contactname,
            contactphone: orderData.customerId.contactphone,
            contactemail: orderData.customerId.contactemail,
          }));

          // Set existing shipping information
          if (orderData.shippingAddresses) {
            setShippingInfos(orderData.shippingAddresses);
          }

          // Set existing carrier information
          if (orderData.carrierInfos) {
            // Ensure phonenumbers is an array for each carrier
            const formattedCarrierInfos = orderData.carrierInfos.map(
              (carrier) => ({
                ...carrier,
                phonenumbers: Array.isArray(carrier.phonenumbers)
                  ? carrier.phonenumbers
                  : [],
              })
            );

            setCarrierInfos(formattedCarrierInfos);
          }

          if (orderData.accounts) {
            const formattedAccounts = orderData.accounts.map((account) => ({
              portOutPin: account.portOutPin || "",
              phoneNumber: account.phoneNumber || "",
              carrier: account.carrier || "",
              imei: account.imei || "",
              buyPhoneNumber: account.buyPhoneNumber || false,
              tradeSmartphone: account.tradeSmartphone || false,
              purchaseSmartphone: account.purchaseSmartphone || false,
              shippingAddress: account.shippingAddress
                ? {
                    attentionname: account.shippingAddress.attentionname || "",
                    shippingaddress:
                      account.shippingAddress.shippingaddress || "",
                    shippingcity: account.shippingAddress.shippingcity || "",
                    shippingstate: account.shippingAddress.shippingstate || "",
                    shippingzip: account.shippingAddress.shippingzip || "",
                  }
                : {
                    attentionname: "",
                    shippingaddress: "",
                    shippingcity: "",
                    shippingstate: "",
                    shippingzip: "",
                  },
            }));
            setAccountFields(formattedAccounts); // Set formatted accounts
          }
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [id, navigate, token]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear specific error on change
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Function to compare and return only changed fields
    const getChangedFields = (initial, current) => {
      const changes = {};
      for (const key in current) {
        if (JSON.stringify(initial[key]) !== JSON.stringify(current[key])) {
          changes[key] = current[key];
        }
      }
      return changes;
    };

    // Get the initial order data (you need to store this when fetching the order)
    const initialOrderData = {
      // Populate this with the initial data fetched from the backend
    };

    // Get only the changed fields
    const changedFields = getChangedFields(initialOrderData, formData);

    const payload = {
      ...changedFields,
      customerData: {
        businesslegalname: formData.businesslegalname,
        businessaddress: formData.businessaddress,
        businesscity: formData.businesscity,
        businessstate: formData.businessstate,
        businesszip: formData.businesszip,
        taxid: formData.taxid,
        contactname: formData.contactname,
        contactphone: formData.contactphone,
        contactemail: formData.contactemail,
      },
      carrierInfos,
      accountFields,
      shippingAddresses: shippingInfos,
    };

    console.log("Payload being sent to the backend:", payload);

    try {
      console.log("Submitting accountFields:", accountFields);
      const response = await axios.put(
        `https://springprobackend-production.up.railway.app/api/order/update-order/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Order updated successfully!");
        setIsSubmitted(true);
        navigate(`/single-order-details/${id}`);
      }
    } catch (error) {
      console.error("There was an error updating the order:", error.message);
      setErrors((prev) => ({
        ...prev,
        submit: "An error occurred while updating the order.",
      }));
    }
  };

  return (
    <>
      <Navbar />
      <div id="layoutSidenav" className="flex">
        <Sidebar />
        <div id="layoutSidenav_content" className="flex-1">
          <main className="p-6 bg-gray-100 min-h-screen">
            <div className="container mx-auto">
              <h1 className="text-2xl font-bold text-gray-700 mb-6">
                Edit Order Details
              </h1>
              <form onSubmit={onSubmit}>
                {/* Account Information Row - First Row */}
                <div className="grid grid-cols-1 mt-10 md:grid-cols-3 gap-6">
                  <div>
                    <h6 className="text-sm font-medium text-gray-700">
                      SANS Partner ID
                    </h6>
                    <input
                      type="text"
                      name="sansPartnerID"
                      placeholder="Enter SANS Partner ID"
                      value={formData.sansPartnerID}
                      onChange={handleChange}
                      className="border-b focus:outline-none border-gray-300 py-2 w-full"
                    />
                    {errors.sansPartnerID && (
                      <p className="text-red-500 text-sm">
                        {errors.sansPartnerID}
                      </p>
                    )}
                  </div>

                  {/* Agreement Type */}
                  <div className="w-full">
                    <h6 className="text-sm font-medium text-gray-700">
                      Select Agreement Type
                    </h6>
                    <select
                      name="agreementtype"
                      value={formData.agreementtype}
                      onChange={handleChange}
                      className="border-b h-10 border-gray-300 w-full"
                    >
                      <option value="">Select An Option</option>
                      <option value="amb">AMB</option>
                      <option value="acda">ACDA Attainment/MAC</option>
                    </select>
                    {errors.agreementtype && (
                      <p className="text-red-500 text-sm">
                        {errors.agreementtype}
                      </p>
                    )}
                  </div>
                  {/* Add AT&T Account */}
                  <div className="w-full">
                    <h6 className="text-sm font-medium text-gray-700">
                      Create AT&T Account?
                    </h6>
                    <select
                      name="atntaccount"
                      value={formData.atntaccount}
                      onChange={handleChange}
                      className="border-b h-10 border-gray-300 w-full"
                    >
                      <option value="">Select An Option</option>
                      <option value="accepted">Yes</option>
                      <option value="declined">No</option>
                    </select>
                    {/* {errors.atntaccount && (
    <p className="text-red-500 text-sm">{errors.atntaccount}</p>
  )} */}
                  </div>
                </div>

                {/* Second Row */}
                <div id="accountInfoSection">
                  {/* Secondary Heading */}
                  {formData.businesslegalname !== null && (
                    <div>
                      <h4 className="font-bold text-gray-700 mb-6 mt-3">
                        Account Information
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                          {
                            name: "businesslegalname",
                            label: "Business Legal Name",
                            placeholder: "Enter Business Legal Name",
                          },
                          {
                            name: "businessaddress",
                            label: "Business Address",
                            placeholder: "Enter Business Address",
                          },
                          {
                            name: "businesscity",
                            label: "Business City",
                            placeholder: "Enter Business City",
                          },
                          {
                            name: "businessstate",
                            label: "Business State",
                            placeholder: "Enter Business State",
                          },
                          {
                            name: "businesszip",
                            label: "Business Zip",
                            placeholder: "Enter Business Zip",
                          },
                          {
                            name: "taxid",
                            label: "Tax ID",
                            placeholder: "Enter Tax ID",
                          },
                          {
                            name: "contactname",
                            label: "Contact Name",
                            placeholder: "Enter Contact Name",
                          },
                          {
                            name: "contactphone",
                            label: "Contact Phone",
                            placeholder: "Enter Contact Phone",
                          },
                          {
                            name: "contactemail",
                            label: "Contact Email",
                            placeholder: "Enter Contact Email",
                          },
                        ].map((field, index) => (
                          <div key={index} className="mb-4">
                            <h6 className="text-sm font-medium text-gray-700">
                              {field.label}
                            </h6>

                            {/* Exclude Existing BAN and FAN from regular input rendering */}
                            {field.name !== "existingBAN" &&
                              field.name !== "existingFAN" && (
                                <input
                                  type="text"
                                  name={field.name}
                                  placeholder={field.placeholder}
                                  value={formData[field.name]}
                                  onChange={handleChange}
                                  className="border-b focus:outline-none border-gray-300 py-2 w-full"
                                />
                              )}

                            {errors[field.name] && (
                              <p className="text-red-500 text-sm">
                                {errors[field.name]}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Third Row */}
                <div>
                  <h3 className="text-xl md:text-2xl text-gray-800 font-semibold mt-6">
                    Order Shipping Information
                  </h3>
                  {shippingInfos.map((info, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2 pb-2"
                    >
                      {/* Header with Remove Button */}
                      <div className="col-span-1 md:col-span-2 flex justify-between items-center">
                        {index > 0 && (
                          <h4 className="text-lg font-semibold">
                            Shipping Port Information {index + 1}
                          </h4>
                        )}
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => {
                              setShippingInfos((prev) =>
                                prev.filter((_, i) => i !== index)
                              );
                            }}
                            className="text-red-500 hover:text-red-700 text-sm md:text-base"
                          >
                            - Remove
                          </button>
                        )}
                      </div>

                      {/* Repeated Fields */}
                      {[
                        { name: "attentionname", label: "Attention Name" },
                        { name: "shippingaddress", label: "Shipping Address" },
                        { name: "shippingcity", label: "Shipping City" },
                        {
                          name: "shippingstate",
                          label: "Shipping State",
                          isDropdown: true,
                        },
                        { name: "shippingzip", label: "Shipping Zip" },
                      ].map(({ name, label, isDropdown }) => (
                        <div className="mb-4" key={name}>
                          <h6 className="text-sm font-medium text-gray-700 mb-2">
                            {label}
                          </h6>
                          {isDropdown ? (
                            <select
                              name={name}
                              value={info[name]}
                              onChange={(e) =>
                                handleShippingInfoChange(e, index)
                              }
                              className="border-b focus:outline-none border-gray-300 py-2 w-full bg-white"
                            >
                              <option value="" className="py-2">
                                Select a state
                              </option>
                              {states.map((state) => (
                                <option key={state.code} value={state.code}>
                                  {state.name}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type="text"
                              name={name}
                              placeholder={`Enter ${label}`}
                              value={info[name]}
                              onChange={(e) =>
                                handleShippingInfoChange(e, index)
                              }
                              className="border-b focus:outline-none border-gray-300 py-2 w-full"
                            />
                          )}
                        </div>
                      ))}
                      {/* Unique Code (Read-Only Field) */}
                      <div className="mb-4">
                        <h6 className="text-sm font-medium text-gray-700 mb-2">
                          Unique Code
                        </h6>
                        <input
                          type="text"
                          name="uniqueCode"
                          value={info.uniqueCode}
                          readOnly
                          className="border-b focus:outline-none border-gray-300 py-2 w-full bg-white"
                        />
                      </div>
                    </div>
                  ))}

                  {/* Add Another Shipping Button */}
                  <button
                    type="button"
                    onClick={addShippingInfo}
                    className="md:w-auto text-white px-6 py-2 bg-slate-800 rounded"
                  >
                    + Add Another Shipping Information
                  </button>
                </div>

                {/* Fourth Row */}

                <div>
                  <h3 className="text-xl md:text-2xl text-gray-800 font-semibold mt-5">
                    Carrier Port Information
                  </h3>

                  {carrierInfos.map((info, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      {/* Carrier Information Fields */}
                      <div className="mb-2">
                        <h6 className="text-sm font-medium text-gray-700 mb-2">
                          Select Carrier
                        </h6>
                        <select
                          name="currentwirelesscarrier"
                          value={info.currentwirelesscarrier}
                          onChange={(e) => handleCarrierInfoChange(e, index)}
                          className="border-b focus:outline-none border-gray-300 py-2 w-full"
                        >
                          <option value="">
                            Select Current Wireless Carrier
                          </option>
                          {carrierOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {errors[`currentwirelesscarrier_${index}`] && (
                          <p className="text-red-500 text-sm">
                            {errors[`currentwirelesscarrier_${index}`]}
                          </p>
                        )}
                      </div>

                      {/* Shared Fields (Account Number, Pin, etc.) */}
                      {[
                        { name: "accountnumber", label: "Account Number" },
                        {
                          name: "pinorpassword",
                          label: "Account Passcode/Port Out Pin",
                        },
                        { name: "ssnortaxid", label: "SSN or TaxID" },
                        { name: "billingname", label: "Billing Name" },
                        { name: "billingaddress", label: "Billing Address" },
                        { name: "billingcity", label: "Billing City" },
                        { name: "billingstate", label: "Billing State" },
                        { name: "billingzip", label: "Billing Zip" },
                        { name: "authorizedname", label: "Authorized Name" },
                      ].map(({ name, label }) => (
                        <div className="mb-2" key={name}>
                          <h6 className="text-sm font-medium text-gray-700 mb-2">
                            {label}
                          </h6>
                          <input
                            type="text"
                            name={name}
                            placeholder={`Enter ${label}`}
                            value={info[name]}
                            onChange={(e) => handleCarrierInfoChange(e, index)}
                            className="border-b focus:outline-none border-gray-300 py-2 w-full"
                          />
                          {errors[`${name}_${index}`] && (
                            <p className="text-red-500 text-sm">
                              {errors[`${name}_${index}`]}
                            </p>
                          )}
                        </div>
                      ))}

                      {/* Phone Numbers Section */}
                      <div className="col-span-full">
                        <h6 className="text-sm font-medium text-gray-700 mb-2">
                          Phone Numbers
                        </h6>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Array.isArray(info.phonenumbers) &&
                            info.phonenumbers.map((phoneNumber, phoneIndex) => (
                              <div
                                key={phoneIndex}
                                className="flex items-center gap-2"
                              >
                                <input
                                  type="text"
                                  name="phonenumbers"
                                  placeholder={`Enter Phone Number ${
                                    phoneIndex + 1
                                  }`}
                                  value={phoneNumber}
                                  onChange={(e) =>
                                    handleCarrierInfoChange(
                                      e,
                                      index,
                                      phoneIndex
                                    )
                                  }
                                  className="border-b focus:outline-none border-gray-300 py-2 w-full"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    setCarrierInfos((prev) =>
                                      prev.map((info, i) =>
                                        i === index
                                          ? {
                                              ...info,
                                              phonenumbers:
                                                info.phonenumbers.filter(
                                                  (_, idx) => idx !== phoneIndex
                                                ),
                                            }
                                          : info
                                      )
                                    );
                                  }}
                                  className="text-xs hover:text-danger"
                                >
                                  - Remove
                                </button>
                                {errors[
                                  `phonenumber_${index}_${phoneIndex}`
                                ] && (
                                  <p className="text-red-500 text-sm">
                                    {
                                      errors[
                                        `phonenumber_${index}_${phoneIndex}`
                                      ]
                                    }
                                  </p>
                                )}
                              </div>
                            ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setCarrierInfos((prev) =>
                              prev.map((info, i) =>
                                i === index
                                  ? {
                                      ...info,
                                      phonenumbers: [...info.phonenumbers, ""],
                                    }
                                  : info
                              )
                            );
                          }}
                          className="md:w-auto text-white px-6 py-2 bg-slate-800 rounded"
                        >
                          + Add Another Phone Number
                        </button>
                      </div>

                      {/* Unique Code (Read-Only Field) */}
                      <div className="mb-2">
                        <h6 className="text-sm font-medium text-gray-700 mb-2">
                          Unique Code
                        </h6>
                        <input
                          type="text"
                          name="uniqueCode"
                          value={info.uniqueCode}
                          readOnly
                          className="border-b focus:outline-none border-gray-300 py-2 w-full"
                        />
                      </div>
                    </div>
                  ))}

                  {/* Add Another Carrier Button */}
                  <button
                    type="button"
                    onClick={addCarrierInfo}
                    className="md:w-auto text-white px-6 py-2 bg-slate-800 rounded mt-3"
                  >
                    + Add Another Carrier Information
                  </button>
                </div>

                {/* Fifth Row */}

                <div>
                  {/* Additional Information */}
                  <h3 className="text-xl md:text-2xl text-gray-800 font-semibold mb-4 mt-5">
                    Line Configuration
                  </h3>
                  <div className="flex flex-col md:flex-row items-start gap-6 mt-4">
                    <IMEIForm
                      onSecurityCheck={handleSecurityCheck}
                      shippingInfos={shippingInfos}
                      carrierInfos={carrierInfos}
                      onAccountFieldsChange={handleAccountFieldsChange}
                      initialAccountFields={accountFields}
                    />
                  </div>

                  {/* Sixth row */}

                  <div className="grid grid-cols-1 mt-10 md:grid-cols-2 gap-6">
                    {/* Rate Plan Selection */}
                    <div>
                      <h3 className="lg:text-xl text-base text-gray-800 font-semibold mb-4 sm:text-center text-start">
                        Rate Plan Selection
                      </h3>
                      <div className="mb-4">
                        <select
                          name="ratePlan"
                          value={formData.ratePlan}
                          onChange={handleRatePlanChange}
                          className="border-b h-10 border-gray-300 w-full"
                        >
                          <option value="UYW 2.0 Advanced">
                            UYW 2.0 Advanced
                          </option>
                          <option value="UYW 2.0 Premium">
                            UYW 2.0 Premium
                          </option>
                          <option value="Turnkey BYOD">Turnkey BYOD</option>
                          <option value="Turnkey Standard">
                            Turnkey Standard
                          </option>
                          <option value="Turnkey Premium">
                            Turnkey Premium
                          </option>
                          <option value="Unlimited Tablet">
                            Unlimited Tablet
                          </option>
                          <option value="Unlimited Watch">
                            Unlimited Watch
                          </option>
                          <option value="AWB / Hotspot Core">
                            AWB / Hotspot Core
                          </option>
                          <option value="AWB / Hotspot Pro">
                            AWB / Hotspot Pro
                          </option>
                          <option value="AWB / Hotspot Ultra">
                            AWB / Hotspot Ultra
                          </option>
                          <option value="AT&T Internet Air">
                            AT&T Internet Air
                          </option>
                        </select>
                      </div>
                    </div>

                    {/* Smartphone Purchase Options */}

                    <div>
                      <h3 className="lg:text-xl text-base text-gray-800 font-semibold mb-4 sm:text-center text-start">
                        Smartphone Purchase/Trade Options
                      </h3>

                      {/* Promotions */}
                      <div className="w-full">
                        <select
                          name="buyNewPhone"
                          value={formData.buyNewPhone}
                          onChange={handleBuyNewPhoneChange}
                          className="border-b h-10 border-gray-300 w-full"
                        >
                          <option value="">Select</option>
                          <option value="yes">
                            I want to buy new smartphone
                          </option>
                          <option value="accepted">Trade in promotion</option>
                          <option value="no">
                            No, I don't want a new phone or promotion
                          </option>
                        </select>
                        {errors.buyNewPhone && (
                          <p className="text-red-500 text-sm">
                            {errors.buyNewPhone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Phone Model Section */}
                    {formData.buyNewPhone === "accepted" && (
                      <div className="col-span-full">
                        {/* Phone Model Dropdown */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Model
                          </label>
                          <select
                            name="phonemodel"
                            value={formData.phonemodel}
                            onChange={handleSmartphoneDetailsChange}
                            className="border-b h-12 border-gray-300 w-full rounded-md"
                          >
                            <option value="">Select Phone Model</option>
                            <option value="iphone">iPhone</option>
                            <option value="samsung">Samsung</option>
                            <option value="google">Google</option>
                          </select>
                          {errors.phonemodel && (
                            <p className="text-red-500 text-sm">
                              {errors.phonemodel}
                            </p>
                          )}
                        </div>

                        {/* Device Status (Phone Turned On or Off) */}
                        <div className="mt-4">
                          <h6 className="text-sm font-medium text-gray-700 mb-2">
                            Device Status (Phone Turned On or Off)
                          </h6>
                          <div className="grid grid-cols-2 gap-4">
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name="imeistatus"
                                value="on"
                                checked={formData.imeistatus === "on"}
                                onChange={handleSmartphoneDetailsChange}
                                className="mr-2"
                              />
                              Yes
                            </label>
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name="imeistatus"
                                value="off"
                                checked={formData.imeistatus === "off"}
                                onChange={handleSmartphoneDetailsChange}
                                className="mr-2"
                              />
                              No
                            </label>
                          </div>
                          {errors.imeistatus && (
                            <p className="text-red-500 text-sm">
                              {errors.imeistatus}
                            </p>
                          )}
                        </div>

                        {/* Phone Has No Cracks */}
                        <div className="mt-4">
                          <h6 className="text-sm font-medium text-gray-700 mb-2">
                            Phone Has No Cracks?
                          </h6>
                          <div className="grid grid-cols-2 gap-4">
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name="noCracks"
                                value="yes"
                                checked={formData.noCracks === "yes"}
                                onChange={handleSmartphoneDetailsChange}
                                className="mr-2"
                              />
                              Yes
                            </label>
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name="noCracks"
                                value="no"
                                checked={formData.noCracks === "no"}
                                onChange={handleSmartphoneDetailsChange}
                                className="mr-2"
                              />
                              No
                            </label>
                          </div>
                          {errors.noCracks && (
                            <p className="text-red-500 text-sm">
                              {errors.noCracks}
                            </p>
                          )}
                        </div>

                        {/* Screen Blur or Display Defects */}
                        <div className="mt-4">
                          <h6 className="text-sm font-medium text-gray-700 mb-2">
                            Screen Blur or Display Defects?
                          </h6>
                          <div className="grid grid-cols-2 gap-4">
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name="screenDefects"
                                value="yes"
                                checked={formData.screenDefects === "yes"}
                                onChange={handleSmartphoneDetailsChange}
                                className="mr-2"
                              />
                              Yes
                            </label>
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name="screenDefects"
                                value="no"
                                checked={formData.screenDefects === "no"}
                                onChange={handleSmartphoneDetailsChange}
                                className="mr-2"
                              />
                              No
                            </label>
                          </div>
                          {errors.screenDefects && (
                            <p className="text-red-500 text-sm">
                              {errors.screenDefects}
                            </p>
                          )}
                        </div>

                        {/* Factory Reset & Log out of All Accounts */}
                        <div className="mt-4 mb-4">
                          <h6 className="text-sm font-medium text-gray-700 mb-2">
                            Factory Reset & Log out of all Accounts?
                          </h6>
                          <div className="grid grid-cols-2 gap-4">
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name="factoryReset"
                                value="yes"
                                checked={formData.factoryReset === "yes"}
                                onChange={handleSmartphoneDetailsChange}
                                className="mr-2"
                              />
                              Yes
                            </label>
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name="factoryReset"
                                value="no"
                                checked={formData.factoryReset === "no"}
                                onChange={handleSmartphoneDetailsChange}
                                className="mr-2"
                              />
                              No
                            </label>
                          </div>
                          {errors.factoryReset && (
                            <p className="text-red-500 text-sm">
                              {errors.factoryReset}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {formData.buyNewPhone === "yes" && (
                      <div>
                        <div className="grid grid-cols-1 mt-4 md:grid-cols-2 gap-6">
                          <div className="mb-4">
                            <h6 className="text-sm font-medium text-gray-700">
                              Select Brand
                            </h6>
                            <select
                              name="brand"
                              value={smartphoneDetails.brand}
                              onChange={handleSmartphoneDetailsChange}
                              className="border-b h-10 border-gray-300 w-full"
                            >
                              <option value="">Select Brand</option>
                              <option value="apple">Apple</option>
                              <option value="samsung">Samsung</option>
                              <option value="google">Google</option>
                              <option value="motorola">Motorola</option>
                              <option value="sonim">Sonim</option>
                              <option value="other">Other</option>
                            </select>
                          </div>

                          {smartphoneDetails.brand === "apple" && (
                            <div className="mb-4">
                              <h6 className="text-sm font-medium text-gray-700">
                                Select Apple Model
                              </h6>
                              <select
                                name="model"
                                value={smartphoneDetails.model}
                                onChange={handleSmartphoneDetailsChange}
                                className="border-b h-10 border-gray-300 w-full"
                              >
                                <option value="">Select Model</option>
                                <option value="iphone13">iPhone 13</option>
                                <option value="iphone14">iPhone 14</option>
                                <option value="iphone15">iPhone 15</option>
                              </select>
                            </div>
                          )}

                          {smartphoneDetails.brand === "samsung" && (
                            <div className="mb-4">
                              <h6 className="text-sm font-medium text-gray-700">
                                Select Samsung Model
                              </h6>
                              <select
                                name="model"
                                value={smartphoneDetails.model}
                                onChange={handleSmartphoneDetailsChange}
                                className="border-b h-10 border-gray-300 w-full"
                              >
                                <option value="">Select Model</option>
                                <option value="s24">S24</option>
                                <option value="s24_fe">S24 FE</option>
                                <option value="s24_plus">S24 Plus</option>
                                <option value="s24_ultra">S24 Ultra</option>
                              </select>
                            </div>
                          )}
                        </div>
                        <div className="grid grid-cols-1 mt-4 md:grid-cols-2 gap-6">
                          <div className="mb-4">
                            <h6 className="text-sm font-medium text-gray-700">
                              Select Color
                            </h6>
                            <select
                              name="color"
                              value={smartphoneDetails.color}
                              onChange={handleSmartphoneDetailsChange}
                              className="border-b h-10 border-gray-300 w-full"
                            >
                              <option value="">Select Color</option>
                              <option value="black">Black</option>
                              <option value="white">White</option>
                              <option value="blue">Blue</option>
                              <option value="red">Red</option>
                              <option value="green">Green</option>
                            </select>
                          </div>

                          <div className="mb-4">
                            <h6 className="text-sm font-medium text-gray-700">
                              Select Data Storage Capacity
                            </h6>
                            <select
                              name="size"
                              value={smartphoneDetails.size}
                              onChange={handleSmartphoneDetailsChange}
                              className="border-b h-10 border-gray-300 w-full"
                            >
                              <option value="">Select Storage</option>
                              <option value="64gb">64GB</option>
                              <option value="128gb">128GB</option>
                              <option value="256gb">256GB</option>
                              <option value="512gb">512GB</option>
                              <option value="1tb">1TB</option>
                              <option value="2tb">2TB</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/*  Seventh row */}

                  <div className="mt-2 mb-5">
                    {/* Order Payment Options */}
                    <h2 className="text-2xl text-gray-800 font-semibold mb-8 text-left">
                      Order Payment Options
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
                      {/* Paperless Billing */}
                      <div className="w-full">
                        <h6 className="text-sm font-medium text-gray-700">
                          Paperless Billing?
                        </h6>
                        <select
                          name="paperless"
                          value={formData.paperless}
                          onChange={handleChange}
                          className="border-b h-10 border-gray-300 py-2 w-full"
                        >
                          <option value="">Select An Option</option>

                          <option value="accepted">Yes</option>
                          <option value="declined">No</option>
                        </select>
                        {errors.paperless && (
                          <p className="text-danger text-sm">
                            {errors.paperless}
                          </p>
                        )}
                      </div>

                      {/* Bill to Mobile */}
                      <div className="w-full">
                        <h6 className="text-sm font-medium text-gray-700">
                          Bill to Mobile?
                        </h6>
                        <select
                          name="billtomobile"
                          value={formData.billtomobile}
                          onChange={handleChange}
                          className="border-b h-10 border-gray-300 py-2 w-full"
                        >
                          <option value="">Select An Option</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                        {errors.billtomobile && (
                          <p className="text-danger text-sm">
                            {errors.billtomobile}
                          </p>
                        )}
                      </div>

                      {/* Credit Card Payment */}
                      <div className="w-full">
                        <h6 className="text-sm font-medium text-gray-700">
                          Autopay?
                        </h6>
                        <select
                          name="creditcardpayment"
                          value={formData.creditcardpayment}
                          onChange={handleChange}
                          className="border-b h-10 border-gray-300 py-2 w-full"
                        >
                          <option value="select">Select An Option</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                        {errors.creditcardpayment && (
                          <p className="text-danger text-sm">
                            {errors.creditcardpayment}
                          </p>
                        )}
                      </div>

                      {formData.creditcardpayment === "yes" && (
                        <div className="w-full md:col-span-3 mt-4">
                          <div className="w-full">
                            <label
                              className="block text-sm font-medium mb-2"
                              htmlFor="paymentMethod"
                            >
                              Payment Method
                            </label>
                            <select
                              name="paymentMethod"
                              value={formData.paymentMethod}
                              onChange={handleChange}
                              className="border-b focus:outline-none border-gray-300 py-2 w-full"
                            >
                              <option value="select">Select An Option</option>
                              <option value="checkingAccount">
                                Checking Account
                              </option>
                              <option value="debitCreditCard">
                                Debit Card/Credit Card
                              </option>
                            </select>
                          </div>
                        </div>
                      )}
                      {formData.paymentMethod === "checkingAccount" && (
                        <div className="w-full md:col-span-3 mt-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="w-full">
                              <label
                                className="block text-sm font-medium mb-2"
                                htmlFor="accountHolderName"
                              >
                                Account Holder Name
                              </label>
                              <input
                                type="text"
                                name="accountHolderName"
                                value={formData.accountHolderName}
                                onChange={handleChange}
                                className="border-b focus:outline-none border-gray-300 py-2 w-full"
                                placeholder="Account Holder Name"
                              />
                              {errors.accountHolderName && (
                                <p className="text-danger text-sm">
                                  {errors.accountHolderName}
                                </p>
                              )}
                            </div>

                            <div className="w-full">
                              <label
                                className="block text-sm font-medium mb-2"
                                htmlFor="routingNumber"
                              >
                                Routing Number
                              </label>
                              <input
                                type="text"
                                name="routingNumber"
                                value={formData.routingNumber}
                                onChange={handleChange}
                                className="border-b focus:outline-none border-gray-300 py-2 w-full"
                                placeholder="Routing Number"
                              />
                              {errors.routingNumber && (
                                <p className="text-danger text-sm">
                                  {errors.routingNumber}
                                </p>
                              )}
                            </div>

                            <div className="w-full">
                              <label
                                className="block text-sm font-medium mb-2"
                                htmlFor="checkingAccountNumber"
                              >
                                Checking Account Number
                              </label>
                              <input
                                type="text"
                                name="checkingAccountNumber"
                                value={formData.checkingAccountNumber}
                                onChange={handleChange}
                                className="border-b focus:outline-none border-gray-300 py-2 w-full"
                                placeholder="Checking Account Number"
                              />
                              {errors.checkingAccountNumber && (
                                <p className="text-danger text-sm">
                                  {errors.checkingAccountNumber}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      {formData.paymentMethod === "debitCreditCard" && (
                        <div className="w-full md:col-span-3 mt-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="w-full">
                              <label
                                className="block text-sm font-medium mb-2"
                                htmlFor="cardHolderName"
                              >
                                Card Holder Name
                              </label>
                              <input
                                type="text"
                                name="cardHolderName"
                                value={formData.cardHolderName}
                                onChange={handleChange}
                                className="border-b focus:outline-none border-gray-300 py-2 w-full"
                                placeholder="Card Holder Name"
                              />
                              {errors.cardHolderName && (
                                <p className="text-danger text-sm">
                                  {errors.cardHolderName}
                                </p>
                              )}
                            </div>
                            <div className="w-full">
                              <label
                                className="block text-sm font-medium mb-2"
                                htmlFor="cardNumber"
                              >
                                Card Number
                              </label>
                              <div className="flex items-center space-x-3">
                                {" "}
                                {/* Flex container for input and icon */}
                                <input
                                  type="text"
                                  name="cardNumber"
                                  value={formData.cardNumber}
                                  onChange={handleChange}
                                  className="border-b focus:outline-none border-gray-300 py-2 w-full"
                                  placeholder="Enter your card number"
                                />
                                {/* Display card type icon side by side */}
                                {cardType && (
                                  <FontAwesomeIcon
                                    icon={getCardIcon(cardType)} // Display the correct icon based on card type
                                    size="2x" // Adjust size as needed
                                    className={`text-${cardType.toLowerCase()}-500`} // Apply color based on card type
                                  />
                                )}
                              </div>

                              {/* Display card type name */}
                              {cardType && (
                                <p className="text-sm mt-2">
                                  <strong>Card Type:</strong> {cardType}
                                </p>
                              )}

                              {/* Display error message */}
                              {errors.cardNumber && (
                                <p className="text-danger text-sm">
                                  {errors.cardNumber}
                                </p>
                              )}

                              {/* Hidden input to store card type */}
                              <input
                                type="hidden"
                                name="cardType"
                                value={formData.cardType}
                              />
                            </div>

                            <div className="w-full">
                              <label
                                className="block text-sm font-medium mb-2"
                                htmlFor="cardExpiry"
                              >
                                Expiry Date (MM/YY)
                              </label>
                              <input
                                type="text"
                                name="cardExpiry"
                                value={formData.cardExpiry}
                                onChange={handleChange}
                                className="border-b focus:outline-none border-gray-300 py-2 w-full"
                                placeholder="MM/YY"
                              />
                              {errors.cardExpiry && (
                                <p className="text-danger text-sm">
                                  {errors.cardExpiry}
                                </p>
                              )}
                            </div>

                            <div className="w-full">
                              <label
                                className="block text-sm font-medium mb-2"
                                htmlFor="cardCVC"
                              >
                                CVC
                              </label>
                              <input
                                type="text"
                                name="cardCVC"
                                value={formData.cardCVC}
                                onChange={handleChange}
                                className="border-b focus:outline-none border-gray-300 py-2 w-full"
                                placeholder="CVC"
                              />
                              {errors.cardCVC && (
                                <p className="text-danger text-sm">
                                  {errors.cardCVC}
                                </p>
                              )}
                            </div>

                            <div className="w-full">
                              <label
                                className="block text-sm font-medium mb-2"
                                htmlFor="cardBillingAddress"
                              >
                                Card Billing Address
                              </label>
                              <input
                                type="text"
                                name="cardBillingAddress"
                                value={formData.cardBillingAddress}
                                onChange={handleChange}
                                className="border-b focus:outline-none border-gray-300 py-2 w-full"
                                placeholder="Billing Address"
                              />
                              {errors.cardBillingAddress && (
                                <p className="text-danger text-sm">
                                  {errors.cardBillingAddress}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-2 bg-slate-800 text-white px-6 py-2 rounded font-bold"
                >
                  Update Order
                </button>

                {isSubmitted && (
                  <p className="text-center text-green-500 mt-4">
                    Order Updated Successfully!
                  </p>
                )}
                {errors.submit && (
                  <p className="text-red-500 ">{errors.submit}</p>
                )}
              </form>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default UpdateOrder;
