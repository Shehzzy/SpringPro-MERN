import React, { useState, FormEvent, useEffect } from "react";
import { useForm } from "@formspree/react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Correct import
import Swal from "sweetalert2";
import OrderAssignment from "./OrderAssignment";
import IMEIForm from "./IMEIForm";
import creditCardType from "credit-card-type";
import LineConfiguration from "./LineConfiguration";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Devices from "../../assets/National_Retail_Pricing.json";
import TimezoneSelect from "react-timezone-select";

import {
  faCcVisa,
  faCcMastercard,
  faCcAmex,
  faCcDiscover,
  faCcJcb,
  faCcDinersClub,
  faCcStripe,
} from "@fortawesome/free-brands-svg-icons";

const Form: React.FC = () => {
  const [isFormBlocked, setIsFormBlocked] = useState(false);

  const handleSecurityCheck = (status) => {
    console.log("Security Check Status:", status);
    setIsFormBlocked(!status); // If status is false, block the form
  };
  const [showExistingBAN, setShowExistingBAN] = useState(false);
  const [showExistingFAN, setShowExistingFAN] = useState(false);
  const [accountFields, setAccountFields] = useState([]);
  const [phoneUniqueCode, setPhoneUniqueCode] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [tradeSmartphone, setTradeSmartphone] = useState(false);
  const [purchaseSmartphone, setPurchaseSmartphone] = useState(false);
  const [buyPhoneNumber, setBuyPhoneNumber] = useState(false); // State for buy phone number
  const [cardType, setCardType] = useState("");

  const [linesData, setLinesData] = useState([]);



  // Callback function to receive updated accountFields data
  const handleAccountFieldsChange = (updatedAccountFields) => {
    setAccountFields(updatedAccountFields); // Update state in the parent
    console.log("Updated accountFields:", updatedAccountFields);
  };

  const handleLinesChange = (updatedData) => {
    setLinesData(updatedData);
  };

  const handleTradeSmartphoneChange = (value) => {
    setTradeSmartphone(value); // This updates the parent state
  };

  const handlePurchaseSmartphoneChange = (value) => {
    // console.log("Updating tradeSmartphone:", value);
    setPurchaseSmartphone(value); // This updates the parent state
  };

  const handlePhoneUniqueCodeChange = (value) => {
    setPhoneUniqueCode(value); // This updates the parent state
  };

  const handleBuyPhoneNumberChange = (value) => {
    setBuyPhoneNumber(value); // This updates the parent state
  };

  const handlePromoCodeChange = (value) => {
    setPromoCode(value); // This updates the parent state
  };

  const handleBanFanDropdownChange = (e, fieldName) => {
    if (fieldName === "existingBAN") {
      setShowExistingBAN(e.target.value === "yes");
    }
    if (fieldName === "existingFAN") {
      setShowExistingFAN(e.target.value === "yes");
    }
  };
  const [activeTab, setActiveTab] = useState("accountInfo");
  const [ratePlan, setRatePlan] = useState("");
  const [buyNewPhone, setBuyNewPhone] = useState("");
  const [smartphoneDetails, setSmartphoneDetails] = useState({
    brand: "",
    model: "",
    color: "",
    size: "",
  });

  const handleRatePlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setRatePlan(value);
    setFormData((prev) => ({
      ...prev,
      ratePlan: value,
    }));
  };

  const handleBuyNewPhoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setBuyNewPhone(value);
    setFormData((prev) => ({
      ...prev,
      buyNewPhone: value,
    }));
  };

  const handleSmartphoneDetailsChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSmartphoneDetails((prev) => {
      const updatedDetails = { ...prev, [name]: value };
      setFormData((prevFormData) => ({
        ...prevFormData,
        smartphoneDetails: updatedDetails,
      }));
      return updatedDetails;
    });
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
  // State to manage multiple carrier information entries
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

  const formatPhoneNumber = (value: string): string => {
    // Remove all non-numeric characters
    const numericValue = value.replace(/\D/g, "");

    // Limit to 10 digits
    const limitedValue = numericValue.slice(0, 10);

    // Format as XXX-XXX-XXXX
    if (limitedValue.length > 6) {
      return `${limitedValue.slice(0, 3)}-${limitedValue.slice(
        3,
        6
      )}-${limitedValue.slice(6, 10)}`;
    } else if (limitedValue.length > 3) {
      return `${limitedValue.slice(0, 3)}-${limitedValue.slice(3, 6)}`;
    } else {
      return limitedValue;
    }
  };

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
              : [""];
            // Format the phone number
            updatedPhonenumbers[phoneIndex] = formatPhoneNumber(value);
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

  // const handleCarrierInfoChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   index: number,
  //   phoneIndex?: number
  // ) => {
  //   const { name, value } = e.target;

  //   setCarrierInfos((prev) =>
  //     prev.map((info, i) => {
  //       if (i === index) {
  //         let updatedInfo = { ...info };

  //         if (name === "phonenumbers" && phoneIndex !== undefined) {
  //           // Ensure phonenumbers is an array
  //           const updatedPhonenumbers = Array.isArray(info.phonenumbers)
  //             ? [...info.phonenumbers]
  //             : [""];
  //           updatedPhonenumbers[phoneIndex] = value;
  //           updatedInfo = { ...info, phonenumbers: updatedPhonenumbers };
  //         } else {
  //           // Update other fields
  //           updatedInfo = { ...info, [name]: value };
  //         }

  //         // Generate unique code after updating the info
  //         const uniqueCode = generateUniqueCode(updatedInfo);
  //         return { ...updatedInfo, uniqueCode };
  //       }
  //       return info;
  //     })
  //   );
  // };

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
        phonenumbers: [""], // Array of phone numbers for this carrier
      },
    ]);
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

  const [imeiInput, setImeiInput] = useState("");
  const [imeiNumbers, setImeiNumbers] = useState<string[]>([]);
  const [shippingAddresses, setShippingAddresses] = useState({}); // State to hold shipping addresses

  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [showAllImeis, setShowAllImeis] = useState(false);

  const handleShippingAddressesChange = (newShippingAddresses) => {
    setShippingAddresses(newShippingAddresses);
  };
  const handleImeiNumbersChange = (newImeiNumbers) => {
    setImeiNumbers(newImeiNumbers);
  };

  const handlePhoneNumbersChange = (newPhoneNumbers) => {
    setPhoneNumbers(newPhoneNumbers);
  };

  const [formData, setFormData] = useState({
    ratePlan: "",
    buyNewPhone: "",
    smartphoneDetails: {
      brand: "",
      model: "",
      color: "",
      size: "",
    },

    name: "",
    email: "",
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
    cardType,
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
    imeiNumbers: imeiNumbers,
    carrierInfos: [],
    // dealerCode: "",
    existingFAN: "",
    existingBAN: "",
    tradeSmartphone: tradeSmartphone,
    purchaseSmartphone: purchaseSmartphone,
    buyPhoneNumber: buyPhoneNumber,
    phoneUniqueCode: phoneUniqueCode || "",
    promoCode: promoCode,
    isTaxExempt: "", // New field for tax exemption
    taxExemptNumber: "", // New field for tax exemption number
    bestTimeToCall: "", // New field for best time to call
    timezone: "", // New field for timezone
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

  const [debouncedCardNumber, setDebouncedCardNumber] = useState(
    formData.cardNumber
  );
  const [debouncedCardType, setDebouncedCardType] = useState("");

  // Define the device type
  type Device = {
    Manufacturer: string;
    "Model Name": string;
    "Standard Retail": number;
    "Device Payment Monthly": string;
  };

  const [search, setSearch] = useState("");
  const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    if (search === "") {
      setSelectedDevice(null);
    }

    if (search) {
      const matches = Devices.filter((device) =>
        device["Model Name"].toLowerCase().includes(search.toLowerCase())
      );
      setFilteredDevices(matches);
    } else {
      setFilteredDevices([]);
    }
  }, [search]);

  const handleDeviceSelect = (device) => {
    setSearch(device["Model Name"]);
    setSelectedDevice(device);
    setFilteredDevices([]);
  };

  // Debounce input change
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCardNumber(formData.cardNumber);
    }, 500); // Delay for 500ms after typing stops

    return () => {
      clearTimeout(handler);
    };
  }, [formData.cardNumber]);

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
        // confirmButtonText: "Go to Login",
        confirmButtonColor: "#41FDFE",
      }).then(() => {
        navigate("/login");
      });
      return;
    }

    // Decode the token to check its expiry
    // try {
    //   const decoded = jwtDecode(token); // Decode the JWT
    //   const currentTime = Date.now() / 1000; // Current time in seconds
    //   // Check if the token has expired
    //   if (decoded.exp && decoded.exp < currentTime) {
    //     Swal.fire({
    //       title: "Session Expired",
    //       text: "Your session has expired. Please log in again.",
    //       icon: "warning",
    //       confirmButtonText: "Go to Login",
    //     }).then(() => {
    //       // Redirect to login if the token is expired
    //       navigate("/login");
    //     });
    //     return;
    //   }
    // } catch (error) {
    //   // If decoding the token fails, handle the error (e.g., invalid token)
    //   Swal.fire({
    //     title: "Invalid Token",
    //     text: "The token is invalid. Please log in again.",
    //     icon: "error",
    //     confirmButtonText: "Go to Login",
    //   }).then(() => {
    //     navigate("/login");
    //   });
    //   return;
    // }

    const fetchIMEINumbers = async () => {
      try {
        const response = await axios.get(
          "https://springairnsbackend-production.up.railway.app/api/order/imei",
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

    fetchIMEINumbers();
  }, [navigate]);

  useEffect(() => {
    const fetchUserOrderDetails = async () => {
      try {
        const response = await axios.get(
          "https://springairnsbackend-production.up.railway.app/api/order/get-user-orders",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          const userData = response.data.orders;
          const partnerID = response.data.partnerID; // Ensure this is correct
          console.log("Partner ID from API:", partnerID); // Debugging log

          if (userData[0]) {
            setFormData((prev) => ({
              ...prev,
              name: userData[0].name || "",
              email: userData[0].email || "",
              agreementtype: userData[0].agreementtype || "",
              eip: userData[0].eip || "",
              promotion: userData[0].promotion || "",
              paperless: userData[0].paperless || "",
              specialinstruction: userData[0].specialinstruction || "",
              accountnumber: userData[0].accountnumber || "",
              cardNumber: userData[0].cardNumber || "",
              cardExpiry: userData[0].cardExpiry || "",
              cardCVC: userData[0].cardCVC || "",
              sansPartnerID: partnerID || "", // Ensure this is set correctly
            }));

            console.log("Updated Form Data:", {
              ...formData,
              sansPartnerID: partnerID || "",
            });
          }

          setFormData((prev) => ({
            ...prev,
            sansPartnerID: partnerID || "",
          }));

          if (userData.length > 0) {
            setIsFirstOrder(false); // Set false if user details are successfully fetched
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserOrderDetails();
  }, [token, formData]);
  const accountinfohandleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    let formattedValue = value;

    // Format Tax ID (123-6125351)
    if (name === "taxid") {
      // Remove all non-numeric characters
      const numericValue = value.replace(/\D/g, "");
      // Add a dash after the first 3 digits
      if (numericValue.length > 3) {
        formattedValue = `${numericValue.slice(0, 3)}-${numericValue.slice(
          3,
          10
        )}`;
      } else {
        formattedValue = numericValue;
      }
    }

    // Format Contact Phone (123-456-7890)
    if (name === "contactphone") {
      // Remove all non-numeric characters
      const numericValue = value.replace(/\D/g, "");
      // Add dashes after the first 3 and 6 digits
      if (numericValue.length > 6) {
        formattedValue = `${numericValue.slice(0, 3)}-${numericValue.slice(
          3,
          6
        )}-${numericValue.slice(6, 10)}`;
      } else if (numericValue.length > 3) {
        formattedValue = `${numericValue.slice(0, 3)}-${numericValue.slice(
          3,
          6
        )}`;
      } else {
        formattedValue = numericValue;
      }
    }

    // Update form data
    setFormData((prevData) => ({
      ...prevData,
      [name]: formattedValue,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear specific error on change

    if (name === "cardNumber") {
      const types = creditCardType(value); // Get the card types based on the input
      if (types.length > 0) {
        setCardType(types[0].niceType); // Set the card type name
      } else {
        setCardType(""); // Clear the card type if invalid card number
        console.log(cardType.toLowerCase());
      }
    }
  };

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

  const newErrors: any = {};
  const validateForm = (): boolean => {
    if (!formData.agreementtype)
      newErrors.agreementtype = "Agreement Type is required.";
    if (formData.agreementtype === "acda" && !formData.eip)
      newErrors.eip = "EIP Limit is required.";
    if (!formData.atntaccount)
      newErrors.atntaccount = "Select from add AT&T Account.";
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
    if (!formData.contactname)
      newErrors.contactname = "Contact Name is required.";
    if (!formData.contactphone)
      newErrors.contactphone = "Contact Phone is required.";
    if (!formData.contactemail)
      newErrors.contactemail = "Contact Email is required.";
    if (!formData.creditcardpayment)
      newErrors.creditcardpayment = "Please select an autopay option";

    if (formData.creditcardpayment === "yes") {
      if (!formData.paymentMethod || formData.paymentMethod === "select") {
        newErrors.paymentMethod = "Please select a payment method.";
      }

      if (formData.paymentMethod === "checkingAccount") {
        if (!formData.accountHolderName)
          newErrors.accountHolderName = "Account Holder Name is required.";
        if (!formData.routingNumber)
          newErrors.routingNumber = "Routing Number is required.";
        if (!formData.checkingAccountNumber)
          newErrors.checkingAccountNumber =
            "Checking Account Number is required.";
      }

      if (formData.paymentMethod === "debitCreditCard") {
        if (!formData.cardHolderName)
          newErrors.cardHolderName = "Card Holder Name is required.";
        if (!formData.cardNumber)
          newErrors.cardNumber = "Card Number is required.";
        if (!formData.cardExpiry)
          newErrors.cardExpiry = "Expiry Date is required.";
        if (!formData.cardCVC) newErrors.cardCVC = "CVC is required.";
        if (!formData.cardBillingAddress)
          newErrors.cardBillingAddress = "Billing Address is required.";
      }
    }
    if (!formData.sansPartnerID)
      newErrors.agentCode = "Agent Code is required.";
    carrierInfos.forEach((info, index) => {
      if (!info.currentwirelesscarrier) {
        newErrors[`currentwirelesscarrier_${index}`] =
          "Current Wireless Carrier is required.";
      }
      if (!info.accountnumber) {
        newErrors[`accountnumber_${index}`] = "Account Number is required.";
      }
      if (!info.pinorpassword) {
        newErrors[`pinorpassword_${index}`] = "Pin or Password is required.";
      }
      if (!info.ssnortaxid) {
        newErrors[`ssnortaxid_${index}`] = "SSN or Tax ID is required.";
      }
      if (!info.billingname) {
        newErrors[`billingname_${index}`] = "Billing Name is required.";
      }
      if (!info.billingaddress) {
        newErrors[`billingaddress_${index}`] = "Billing Address is required.";
      }
      if (!info.billingcity) {
        newErrors[`billingcity_${index}`] = "Billing City is required.";
      }
      if (!info.billingstate) {
        newErrors[`billingstate_${index}`] = "Billing State is required.";
      }
      if (!info.billingzip) {
        newErrors[`billingzip_${index}`] = "Billing Zip is required.";
      }
      if (!info.authorizedname) {
        newErrors[`authorizedname_${index}`] = "Authorized Name is required.";
      }

      // Validate Tax Exempt fields
      if (formData.isTaxExempt === "yes" && !formData.taxExemptNumber) {
        newErrors.taxExemptNumber = "Tax Exempt Number is required.";
      } else if (
        formData.isTaxExempt === "yes" &&
        (formData.taxExemptNumber.length < 6 ||
          formData.taxExemptNumber.length > 9)
      ) {
        newErrors.taxExemptNumber =
          "Tax Exempt Number must be 6-9 digits long.";
      }

      // Validate Best Time to Call and Timezone
      if (!formData.bestTimeToCall) {
        newErrors.bestTimeToCall = "Best Time to Call is required.";
      }
      if (!formData.timezone) {
        newErrors.timezone = "Timezone is required.";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data before submission:", formData);
    console.log(newErrors);

    if (isFormBlocked) {
      Swal.fire({
        icon: "error",
        title: "Security Check Failed",
        text: "Form submission is blocked due to security check failure.",
        confirmButtonColor: "#d33",
      });
      return;
    }

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
          "https://springairnsbackend-production.up.railway.app/api/order/create-order",
          {
            ...formData,
            lines: linesData,
            imeiNumbers: imeiNumbers,
            customerData,
            carrierInfos: carrierInfos,
            accountFields: accountFields, // Account fields from the IMEI modal
            phoneNumbers: phoneNumbers, // Phone numbers from the IMEI modal
            shippingAddresses: shippingInfos,
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
        console.error("There was an error creating the order:", error.message);
        setErrors((prev) => ({
          ...prev,
          submit: "An error occurred while creating the order.",
        }));
      }
    }
  };

  const goToNextTab = () => {
    const tabOrder = [
      // "sellerInfo",
      "accountInfo",
      "shippingInfo",
      "carrierInfo",
      "lineConfig",
      "paymentInfo",
    ];
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1]);
    }
  };

  // console.log("IMEI Data to be sent:", {
  //   imeiNumbers,
  //   accountFields,
  //   phoneNumbers,
  //   shippingInfos,
  // });

  // console.log(formData);

  const validateTab = (tab: string): boolean => {
    const newErrors: any = {};

    // Validate fields based on the active tab
    switch (tab) {
      case "accountInfo":
        if (!formData.name) newErrors.name = "Name is required.";
        if (!formData.email) newErrors.email = "Email is required.";
        // if (!formData.phonenumber)
        //   newErrors.phonenumber = "Phone Number is required.";
        if (!formData.agreementtype)
          newErrors.agreementtype = "Agreement Type is required.";
        if (formData.agreementtype === "acda" && !formData.eip)
          newErrors.eip = "EIP Limit is required.";
        if (!formData.promotion) newErrors.promotion = "Promotion is required.";
        if (formData.promotion === "accepted" && !formData.phonemodel)
          newErrors.phonemodel = "Phone Model is required.";
        if (formData.promotion === "accepted" && !formData.imeistatus)
          newErrors.imeistatus = "Device Status is required.";

        // Phone Has No Cracks?
        if (formData.promotion === "accepted" && !formData.noCracks)
          newErrors.noCracks = "Phone Cracks status is required.";

        // Screen Blur or Display Defects?
        if (formData.promotion === "accepted" && !formData.screenDefects)
          newErrors.screenDefects =
            "Screen Blur or Display Defects status is required.";

        // Factory Reset & Log out of All Accounts?
        if (formData.promotion === "accepted" && !formData.factoryReset)
          newErrors.factoryReset =
            "Factory Reset & Log out of all Accounts status is required.";
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
        // if (!formData.locationid)
        //   newErrors.locationid = "Location ID is required.";
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
        if (formData.creditcardpayment === "yes") {
          if (!formData.cardNumber)
            newErrors.cardNumber = "Card number is required.";
          if (!formData.cardExpiry)
            newErrors.cardExpiry = "Expiry date is required.";
          if (!formData.cardCVC) newErrors.cardCVC = "CVC is required.";
        }
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
        // if (!formData.companyname)
        //   newErrors.companyname = "Company Name is required.";
        if (!formData.sansPartnerID)
          newErrors.sansPartnerID = "SANS Partner ID is required.";
        if (!formData.existingBAN)
          newErrors.existingBAN = "Existing BAN is required.";
        if (!formData.existingFAN)
          newErrors.existingFAN = "Existing FAN is required.";
        break;

      case "shippingInfo":
        if (!formData.singleormultiaddresshipment)
          newErrors.singleormultiaddresshipment =
            "Single or Multi Address Shipment is required.";
        if (!formData.shippingaddress)
          newErrors.shippingaddress = "Shipping Address is required.";
        if (!formData.shippingcity)
          newErrors.shippingcity = "Shipping City is required.";
        if (!formData.shippingstate)
          newErrors.shippingstate = "Shipping State is required.";
        if (!formData.shippingzip)
          newErrors.shippingzip = "Shipping Zip is required.";
        break;

      case "carrierInfo":
        carrierInfos.forEach((info, index) => {
          if (!info.currentwirelesscarrier) {
            newErrors[`currentwirelesscarrier_${index}`] =
              "Current Wireless Carrier is required.";
          }
          if (!info.accountnumber) {
            newErrors[`accountnumber_${index}`] = "Account Number is required.";
          }
          if (!info.pinorpassword) {
            newErrors[`pinorpassword_${index}`] =
              "Pin or Password is required.";
          }
          if (!info.ssnortaxid) {
            newErrors[`ssnortaxid_${index}`] = "SSN or Tax ID is required.";
          }
          if (!info.billingname) {
            newErrors[`billingname_${index}`] = "Billing Name is required.";
          }
          if (!info.billingaddress) {
            newErrors[`billingaddress_${index}`] =
              "Billing Address is required.";
          }
          if (!info.billingcity) {
            newErrors[`billingcity_${index}`] = "Billing City is required.";
          }
          if (!info.billingstate) {
            newErrors[`billingstate_${index}`] = "Billing State is required.";
          }
          if (!info.billingzip) {
            newErrors[`billingzip_${index}`] = "Billing Zip is required.";
          }
          if (!info.authorizedname) {
            newErrors[`authorizedname_${index}`] =
              "Authorized Name is required.";
          }
        });
        break;

      case "additionalInfo":
      case "lineConfig":
        // if (!formData.companyname)
        //   newErrors.companyname = "Company Name is required.";
        if (!formData.sansPartnerID)
          newErrors.sansPartnerID = "SANS Partner ID is required.";
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent default behavior
    const tabOrder = [
      "accountInfo",
      "shippingInfo",
      "carrierInfo",
      "lineConfig",
      "paymentInfo",
    ];
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1]);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "accountInfo":
        return (
          <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg border text-left">
            {/* Heading */}
            <h2 className="text-2xl text-gray-800 font-semibold mb-8 text-left">
              Mobility Account Configuration
            </h2>

            {/* Form Section */}
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid grid-cols-1 mt-10 md:grid-cols-3 gap-6">
                <input
                  type="hidden"
                  name="name"
                  placeholder="Enter Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border-b focus:outline-none border-gray-300 py-2 w-full"
                />

                <input
                  type="hidden"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border-b focus:outline-none border-gray-300 py-2 w-full"
                />
              </div>
              {/* Row 2 */}

              <div className="grid grid-cols-1 mt-10 md:grid-cols-3 gap-6">
                <div>
                  <h6 className="text-sm font-medium text-gray-700">
                    SANS Partner ID
                  </h6>
                  <input
                    type="text"
                    name="sansPartnerID"
                    value={formData.sansPartnerID}
                    onChange={handleChange}
                    className="border-b focus:outline-none border-gray-300 py-2 w-full"
                    readOnly // Disable if not the first order
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
                    Create Mobility Account (BAN)?
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

              {/* Tax Exempt Field */}
              <div className="grid grid-cols-1 mt-10 md:grid-cols-3 gap-6">
                <div className="w-full">
                  <h6 className="text-sm font-medium text-gray-700">
                    Is Tax Exempt?
                  </h6>
                  <select
                    name="isTaxExempt"
                    value={formData.isTaxExempt}
                    onChange={handleChange}
                    className="border-b h-10 border-gray-300 py-2 w-full"
                  >
                    <option value="">Select An Option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                  {errors.isTaxExempt && (
                    <p className="text-red-500 text-sm">{errors.isTaxExempt}</p>
                  )}
                </div>

                {/* Conditionally render Tax Exempt Number field */}
                {formData.isTaxExempt === "yes" && (
                  <div className="w-full">
                    <h6 className="text-sm font-medium text-gray-700">
                      Tax Exempt Number
                    </h6>
                    <input
                      type="text"
                      name="taxExemptNumber"
                      placeholder="Enter 6-9 digit number"
                      value={formData.taxExemptNumber}
                      onChange={handleChange}
                      className="border-b focus:outline-none border-gray-300 py-2 w-full"
                      maxLength={9} // Limit input to 9 digits
                    />
                    {errors.taxExemptNumber && (
                      <p className="text-red-500 text-sm">
                        {errors.taxExemptNumber}
                      </p>
                    )}
                  </div>
                )}

                <div className="w-full mb-5">
                  <h6 className="text-sm font-medium text-gray-700">
                    Special Instruction
                  </h6>
                  <textarea
                    name="specialinstruction"
                    value={formData.specialinstruction}
                    className="w-full border border-gray-300 rounded-lg p-2"
                    onChange={handleChange}
                    placeholder="Type here..."
                    style={{ resize: "none" }}
                  ></textarea>
                  {errors.specialinstruction && (
                    <p className="text-red-500 text-sm">
                      {errors.specialinstruction}
                    </p>
                  )}
                </div>
              </div>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {/* EIP Limit (Conditional Field) */}
              {formData.agreementtype === "acda" && (
                <div className="w-full">
                  <h6 className="text-sm font-medium text-gray-700">
                    Please, specify EIP Limit
                  </h6>
                  <input
                    name="eip"
                    placeholder="Enter EIP Limit"
                    value={formData.eip}
                    onChange={handleChange}
                    className="w-full border-b border-gray-300 py-2"
                  />
                  {errors.eip && (
                    <p className="text-red-500 text-sm">{errors.eip}</p>
                  )}
                </div>
              )}
              {formData.atntaccount === "declined" && (
                <div>
                  {[
                    {
                      name: "existingBAN",
                      label: "Existing BAN",
                      placeholder: "Enter Existing BAN",
                    },
                  ].map((field, index) => (
                    <div key={index} className="mb-4">
                      <h6 className="text-sm font-medium text-gray-700">
                        {field.label}
                      </h6>
                      <input
                        type="text"
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="w-full border-b border-gray-300 py-2"
                      />
                    </div>
                  ))}
                </div>
              )}
              {/* Special Instructions */}
            </div>

            {/* Order Assignment */}
            {!isFirstOrder && (
              <OrderAssignment
                token={token}
                formData={formData}
                setFormData={setFormData}
              />
            )}

            {/* Secondary Heading */}
            {formData.atntaccount === "accepted" && (
              <div>
                <h2 className="text-2xl text-gray-800 font-semibold mb-8 text-left">
                  New Account Information
                </h2>

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
                      isDropdown: true,
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

                      {/* Render dropdown if isDropdown is true, otherwise render input */}
                      {field.isDropdown ? (
                        <select
                          name={field.name}
                          value={formData[field.name]}
                          onChange={(e) => accountinfohandleChange(e)}
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
                          name={field.name}
                          placeholder={field.placeholder}
                          value={formData[field.name]}
                          onChange={accountinfohandleChange}
                          className="border-b focus:outline-none border-gray-300 py-2 w-full"
                          // Add maxLength for phone and tax ID fields
                          maxLength={
                            field.name === "contactphone"
                              ? 12 // 123-456-7890 (12 characters)
                              : field.name === "taxid"
                              ? 10 // 123-6125351 (10 characters)
                              : undefined
                          }
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
        );

      case "paymentInfo":
        return (
          <div className="bg-white max-w-4xl mx-auto p-8 shadow-lg rounded-lg border text-left">
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
                  <p className="text-danger text-sm">{errors.paperless}</p>
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
                  <p className="text-danger text-sm">{errors.billtomobile}</p>
                )}
              </div>

              {/* Credit Card Payment */}
              <div className="w-full">
                <h6 className="text-sm font-medium text-gray-700">Autopay?</h6>
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
                      <option value="checkingAccount">Checking Account</option>
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
                        <p className="text-danger text-sm">{errors.cardCVC}</p>
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

                    {/* <div className="w-full flex items-center">
                      <input
                        type="checkbox"
                        name="sameAsCardAddress"
                        checked={formData.sameAsCardAddress}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                      />
                      <label htmlFor="sameAsCardAddress" className="text-sm">
                        Use the same address as the card billing address
                      </label>
                    </div> */}
                  </div>
                </div>
              )}
            </div>

            {/* Best Time to Call and Timezone Fields */}
            <div className="grid grid-cols-1 mt-10 md:grid-cols-2 gap-6">
              <div className="w-full">
                <h6 className="text-sm font-medium text-gray-700">
                  Best Time to Call?
                </h6>
                <input
                  type="time"
                  name="bestTimeToCall"
                  value={formData.bestTimeToCall}
                  onChange={handleChange}
                  className="border-b focus:outline-none border-gray-300 py-2 w-full"
                />
                {errors.bestTimeToCall && (
                  <p className="text-red-500 text-sm">
                    {errors.bestTimeToCall}
                  </p>
                )}
              </div>

              <div className="w-full">
                <h6 className="text-sm font-medium text-gray-700">Timezone</h6>
                <TimezoneSelect
                  value={formData.timezone}
                  onChange={(selectedTimezone) =>
                    setFormData((prev) => ({
                      ...prev,
                      timezone: selectedTimezone.value,
                    }))
                  }
                  className="custom-timezone-select" 
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "8px",
                    backgroundColor: "#f9fafb",
                  }}
                  menuClassName="custom-timezone-menu" 
                  menuStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                />
                {errors.timezone && (
                  <p className="text-red-500 text-sm">{errors.timezone}</p>
                )}
              </div>
            </div>
          </div>
        );

      case "shippingInfo":
        return (
          <div className="bg-white max-w-4xl mx-auto p-8 shadow-lg rounded-lg border text-left">
            {/* Order Shipping Information */}
            {/* <h2 className="text-2xl text-gray-800 font-semibold my-8 text-left">
              Order Shipping Information
            </h2>
            <div className="grid grid-cols-1 mt-10 md:grid-cols-3 gap-4">
              <div className="w-full">
                <h6 className="text-smfont-medium text-gray-700">
                  Select Shipment Mode
                </h6>
                <select
                  name="singleormultiaddresshipment"
                  value={formData.singleormultiaddresshipment}
                  onChange={handleChange}
                  className="border-b mb-4 border-gray-300 py-2 w-full"
                >
                  <option value="yes">Single Shipment Address</option>
                  <option value="no">Multiple Shipment Address</option>
                </select>
                {errors.singleormultiaddresshipment && (
                  <p className="text-danger text-sm">
                    {errors.singleormultiaddresshipment}
                  </p>
                )}
              </div>
              <div className="mb-4 w-full">
                <h6 className="text-sm text-left font-medium text-gray-700">
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
                  <p className="text-danger text-sm">{errors.attentionname}</p>
                )}
              </div>
              <div className="mb-4 w-full">
                <h6 className="text-sm text-left font-medium text-gray-700">
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
                  <p className="text-danger text-sm">{errors.shippingaddress}</p>
                )}
              </div>
              <div className="mb-4 w-full">
                <h6 className="text-sm text-left font-medium text-gray-700">
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
                  <p className="text-danger text-sm">{errors.shippingcity}</p>
                )}
              </div>
              <div className="mb-4 w-full">
                <h6 className="text-sm text-left font-medium text-gray-700">
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
                  <p className="text-danger text-sm">{errors.shippingstate}</p>
                )}
              </div>
              <div className="mb-4 w-full">
                <h6 className="text-sm text-left font-medium text-gray-700">
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
                  <p className="text-danger text-sm">{errors.shippingzip}</p>
                )}
              </div>
              <button
                type="button"
                onClick={addShippingInfo}
                style={{
                  background:
                    "linear-gradient(90deg, rgba(65 ,253 ,254) 0%, rgba(0,210,255,1) 100%)",
                }}
                className="mt-4 w-full md:w-auto text-white px-6 py-2 rounded"
              >
                + Add Another Shipping Information
              </button>
            </div> */}

            <h3 className="text-xl md:text-2xl text-gray-800 font-semibold mt-6">
              Order Shipping Information
            </h3>
            {shippingInfos.map((info, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2 pb-6"
              >
                {/* Header with Remove Button */}
                <div className="col-span-1 md:col-span-2 flex justify-between items-center">
                  {index > 0 && (
                    <h4 className="text-lg font-semibold">
                      Order Shipping Information {index + 1}
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
                        onChange={(e) => handleShippingInfoChange(e, index)}
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
                        onChange={(e) => handleShippingInfoChange(e, index)}
                        className="border-b focus:outline-none border-gray-300 py-2 w-full"
                      />
                    )}
                    {errors[`${name}_${index}`] && (
                      <p className="text-red-500 text-sm">
                        {errors[`${name}_${index}`]}
                      </p>
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
                    className="border-b focus:outline-none border-gray-300 py-2 w-full bg-gray-100"
                  />
                </div>
              </div>
            ))}

            {/* Add Another Shipping Button */}
            <button
              type="button"
              onClick={addShippingInfo}
              style={{
                background:
                  "linear-gradient(90deg, rgba(65 ,253 ,254) 0%, rgba(0,210,255,1) 100%)",
              }}
              className="mt-4 w-full md:w-auto text-white px-6 py-2 rounded"
            >
              + Add Another Shipping Information
            </button>
          </div>
        );

      case "carrierInfo":
        return (
          <div className="bg-white max-w-4xl mx-auto p-6 md:p-8 shadow-lg rounded-lg border text-left">
            <h3 className="text-xl md:text-2xl text-gray-800 font-semibold mb-4">
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
                    <option value="">Select Current Wireless Carrier</option>
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
                            name="phonenumbers" // Ensure the name is "phonenumbers"
                            placeholder={`Enter Phone Number ${phoneIndex + 1}`}
                            value={phoneNumber}
                            onChange={(e) =>
                              handleCarrierInfoChange(e, index, phoneIndex)
                            }
                            className="border-b focus:outline-none border-gray-300 py-2 w-full"
                            maxLength={12} // Enforce max length for formatted phone number
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setCarrierInfos((prev) =>
                                prev.map((info, i) =>
                                  i === index
                                    ? {
                                        ...info,
                                        phonenumbers: info.phonenumbers.filter(
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
                          {errors[`phonenumber_${index}_${phoneIndex}`] && (
                            <p className="text-red-500 text-sm">
                              {errors[`phonenumber_${index}_${phoneIndex}`]}
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
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(65 ,253 ,254) 0%, rgba(0,210,255,1) 100%)",
                    }}
                    className="mt-4 w-full md:w-auto text-white px-6 py-2 rounded"
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
                    className="border-b focus:outline-none border-gray-300 py-2 w-full bg-gray-100"
                  />
                </div>
              </div>
            ))}

            {/* Add Another Carrier Button */}
            <button
              type="button"
              onClick={addCarrierInfo}
              style={{
                background:
                  "linear-gradient(90deg, rgba(65 ,253 ,254) 0%, rgba(0,210,255,1) 100%)",
              }}
              className="mt-4 w-full md:w-auto text-white px-6 py-2 rounded"
            >
              + Add Another Carrier Information
            </button>
          </div>
        );

      case "lineConfig":
        return (
          <div className="flex justify-center items-start">
            <div className="bg-white max-w-4xl mx-auto p-8 w-full shadow-lg rounded-lg border text-left">
              {/* Additional Information */}
              <h3 className="text-xl md:text-2xl text-gray-800 font-semibold mb-4">
                Line Configuration
              </h3>
              <div className="flex flex-col md:flex-row items-start gap-6 mt-4">
                <IMEIForm
                  onAccountFieldsChange={handleAccountFieldsChange}
                  onSecurityCheck={handleSecurityCheck}
                  shippingInfos={shippingInfos}
                  carrierInfos={carrierInfos}
                />

                {/* <LineConfiguration 
                  shippingInfos={shippingInfos}
                  carrierInfos={carrierInfos}
                  onLinesChange={handleLinesChange}
                /> */}
              </div>

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
                      <option value="UYW 2.0 Advanced">UYW 2.0 Advanced</option>
                      <option value="UYW 2.0 Premium">UYW 2.0 Premium</option>
                      <option value="Turnkey BYOD">Turnkey BYOD</option>
                      <option value="Turnkey Standard">Turnkey Standard</option>
                      <option value="Turnkey Premium">Turnkey Premium</option>
                      <option value="Unlimited Tablet">Unlimited Tablet</option>
                      <option value="Unlimited Watch">Unlimited Watch</option>
                      <option value="AWB / Hotspot Core">
                        AWB / Hotspot Core
                      </option>
                      <option value="AWB / Hotspot Pro">
                        AWB / Hotspot Pro
                      </option>
                      <option value="AWB / Hotspot Ultra">
                        AWB / Hotspot Ultra
                      </option>
                      <option value="AT&T Internet Air">
                        AT&T Internet Air
                      </option>
                    </select>
                  </div>
                </div>

                {/* Smartphone Purchase Options */}

                <div>
                  <h3 className="lg:text-xl text-base text-gray-800 font-semibold mb-4 sm:text-center text-start">
                    Smartphone Purchase/Trade Options
                  </h3>

                  <div className="w-full">
                    <select
                      name="buyNewPhone"
                      value={buyNewPhone}
                      onChange={(e) => setBuyNewPhone(e.target.value)}
                      className="border-b h-10 border-gray-300 w-full"
                    >
                      <option value="">Select</option>
                      <option value="yes">
                        I want to buy a new smartphone
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

                {buyNewPhone === "yes" && (
                  <div className="">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Search for a device
                    </label>
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="border p-2 w-full"
                      placeholder="Type to search..."
                    />
                    {filteredDevices.length > 0 && (
                      <ul className="border mt-1 max-h-40 overflow-y-auto">
                        {filteredDevices.map((device, index) => (
                          <li
                            key={index}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleDeviceSelect(device)}
                          >
                            {device["Model Name"]}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {selectedDevice && (
                  <div className="mt-4 p-4 border rounded">
                    <h4 className="font-semibold">Selected Device:</h4>
                    <p>
                      <strong>Manufacturer:</strong>{" "}
                      {selectedDevice["Manufacturer"]}
                    </p>
                    <p>
                      <strong>Model:</strong> {selectedDevice["Model Name"]}
                    </p>
                    <p>
                      <strong>Retail Price:</strong> $
                      {selectedDevice["Standard Retail"]}
                    </p>
                    <p>
                      <strong>Monthly Installment:</strong> $
                      {selectedDevice["Device Payment Monthly"]}
                    </p>
                  </div>
                )}

                {/* <div className="mb-4">
                <select
                  name="buyNewPhone"
                  value={buyNewPhone}
                  onChange={handleBuyNewPhoneChange}
                  className="border-b h-10 border-gray-300 w-full"
                >
                  <option value="">Do you want to buy a new smartphone?</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div> */}
              </div>

              {/* Phone Model Section */}
              {buyNewPhone === "accepted" && (
                <div className="col-span-full">
                  {/* Phone Model Dropdown */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Model
                    </label>
                    <select
                      name="phonemodel"
                      value={formData.phonemodel}
                      onChange={handleChange}
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
                          onChange={handleChange}
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
                          onChange={handleChange}
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
                          onChange={handleChange}
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
                          onChange={handleChange}
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>
                    {errors.noCracks && (
                      <p className="text-red-500 text-sm">{errors.noCracks}</p>
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
                          onChange={handleChange}
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
                          onChange={handleChange}
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
                  <div className="mt-4">
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
                          onChange={handleChange}
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
                          onChange={handleChange}
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

              {buyNewPhone === "yes" && (
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
          </div>
        );

        return (
          <div>
            {/* Smartphone Purchase Options */}
            <h3 className="text-xl text-gray-800 font-semibold mb-4 sm:text-center text-start">
              Smartphone Purchase Options
            </h3>
            <div className="mb-4">
              <select
                name="buyNewPhone"
                value={buyNewPhone}
                onChange={handleBuyNewPhoneChange}
                className="border-b h-10 border-gray-300 w-full"
              >
                <option value="">Do you want to buy a new smartphone?</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {buyNewPhone === "yes" && (
              <div>
                {/* Brand Selection */}
                <div className="mb-4">
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

                {/* Model Selection */}
                {smartphoneDetails.brand === "apple" && (
                  <div className="mb-4">
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
                      <option value="a13">A13</option>
                      <option value="a23">A23</option>
                      <option value="a14">A14</option>
                      <option value="a52">A52</option>
                      <option value="x_cover_6_pro">X Cover 6 Pro</option>
                    </select>
                  </div>
                )}

                {/* Color Selection */}
                <div className="mb-4">
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

                {/* Size Selection */}
                <div className="mb-4">
                  <select
                    name="size"
                    value={smartphoneDetails.size}
                    onChange={handleSmartphoneDetailsChange}
                    className="border-b h-10 border-gray-300 w-full"
                  >
                    <option value="">Select Size</option>
                    <option value="64gb">64GB</option>
                    <option value="128gb">128GB</option>
                    <option value="256gb">256GB</option>
                    <option value="512gb">512GB</option>
                    <option value="1tb">1TB</option>
                    <option value="2tb">2TB</option>
                  </select>
                </div>
              </div>
            )}

            {/* Error and Submit Button */}
            <div className="flex flex-col mt-8">
              {Object.keys(errors).length > 0 && (
                <p className="text-danger text-sm mb-4">
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

            {/* View Orders Link */}
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

            {/* Submission Confirmation */}
            {isSubmitted && (
              <p className="text-center text-green-500 mt-4">
                Thanks for submitting the order!
              </p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <section className="py-24 mt-[120px] px-8 text-center bg-white">
        <div className="container mx-auto w-full ">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-2">
            Ready to Make the Network?
          </h2>
          <p className="text-md text-gray-500 mt-4 mb-6">
            It’s time to stop overpaying for your services. Fill out the form
            below to get started.
          </p>
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center space-x-0 md:space-x-4 mb-6 gap-2 md:gap-0">
            {[
              // { key: "sellerInfo", label: "Seller Information" },
              { key: "accountInfo", label: "Account Information" },
              { key: "shippingInfo", label: "Shipping Information" },
              { key: "carrierInfo", label: "Carrier Information" },
              { key: "lineConfig", label: "Line Configuration" },
              { key: "paymentInfo", label: "Payment Information" },
              // { key: "additionalInfo", label: "Additional Information" },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 w-full md:w-auto ${
                  activeTab === tab.key ? "text-white" : "bg-gray-300"
                } rounded`}
                style={
                  activeTab === tab.key
                    ? {
                        background:
                          "linear-gradient(90deg, rgba(65, 253, 254, 1) 0%, rgba(0, 210, 255, 1) 100%)",
                      }
                    : {}
                }
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {renderTabContent()}

          {/* Conditional Button */}
          <div className="flex justify-center mt-6">
            {activeTab === "paymentInfo" ? (
              <button
                type="submit"
                disabled={isFormBlocked} // Submit button triggers the form's onSubmit handler
                className="bg-green-500 text-white px-6 py-2 rounded"
              >
                Submit
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext} // Call `handleNext` to validate the tab and navigate
                style={{
                  background:
                    "linear-gradient(90deg, rgba(65 ,253 ,254) 0%, rgba(0,210,255,1) 100%)",
                }}
                className="text-white px-6 py-2 rounded"
              >
                Next
              </button>
            )}
          </div>

          {/* Success Message */}
          {isSubmitted && (
            <p className="text-center text-green-500 mt-4">
              Form Submitted Successfully!
            </p>
          )}

          {isFormBlocked && (
            <p className="text-center text-red mt-4">
              Form cannot be submitted. Please check if the IMEI you've input is
              correct.
            </p>
          )}
        </div>
      </section>
    </form>
  );
};

export default Form;
