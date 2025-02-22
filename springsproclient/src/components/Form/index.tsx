import React, { useState, FormEvent, useEffect } from "react";
import { useForm } from "@formspree/react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import OrderAssignment from "./OrderAssignment";
import IMEIForm from "./IMEIForm";

const Form: React.FC = () => {
  const [showExistingBAN, setShowExistingBAN] = useState(false);
  const [showExistingFAN, setShowExistingFAN] = useState(false);

  const [phoneUniqueCode, setPhoneUniqueCode] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [tradeSmartphone, setTradeSmartphone] = useState(false); // State for trade smartphone
  const [buyPhoneNumber, setBuyPhoneNumber] = useState(false); // State for buy phone number

  const handleTradeSmartphoneChange = (value) => {
    console.log("Updating tradeSmartphone:", value);
    setTradeSmartphone(value); // This updates the parent state
  };

  const handlePhoneUniqueCodeChange = (value) => {
    console.log("Updating phone unique code:", value);
    setPhoneUniqueCode(value); // This updates the parent state
  };

  const handleBuyPhoneNumberChange = (value) => {
    console.log("Updating phone number change:", value);
    setBuyPhoneNumber(value); // This updates the parent state
  };

  const handlePromoCodeChange = (value) => {
    console.log("Updating promo code change:", value);
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
  const [accountFields, setAccountFields] = useState([
    {
      accountNumber: "", // Correct name
      portOutPin: "", // Correct name
    },
  ]);
  const [shippingAddresses, setShippingAddresses] = useState({}); // State to hold shipping addresses

  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [showAllImeis, setShowAllImeis] = useState(false);

  const handleShippingAddressesChange = (newShippingAddresses) => {
    setShippingAddresses(newShippingAddresses);
  };
  const handleImeiNumbersChange = (newImeiNumbers) => {
    setImeiNumbers(newImeiNumbers);
  };

  const handleAccountFieldsChange = (newAccountFields) => {
    setAccountFields(newAccountFields);
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
    phonenumber: "",
    agreementtype: "",
    eip: "",
    promotion: "",
    atntaccount: "",
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
    // sameAsCardAddress: false,
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
    // currentwirelesscarrier: "",
    accountnumber: "",
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
    tradeSmartphone: tradeSmartphone,
    buyPhoneNumber: buyPhoneNumber,
    phoneUniqueCode: phoneUniqueCode || "",
    promoCode: promoCode
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
    // sameAsCardAddress: formData.sameAsCardAddress,
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


  // const handleCheckboxChange = (e) => {
  //   const { checked } = e.target;
  //   if (checked) {
  //     setFormData({
  //       ...formData,
  //       cardBillingAddress: formData.sameAddress ? formData.cardBillingAddress : "",
  //     });
  //   } else {
  //     setFormData({ ...formData, sameAsCardAddress: checked });
  //   }
  // };

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
          // console.log(userData, "User Data");
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
              cardNumber, // Add this
              cardExpiry, // Add this
              cardCVC, // Add this
              dealerCode, // Add this
              agentCode, // Add this
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
              cardNumber: cardNumber || "", // Add this
              cardExpiry: cardExpiry || "", // Add this
              cardCVC: cardCVC || "", // Add this
              dealerCode: dealerCode || "", // Add this
              agentCode: agentCode || "", // Add this
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

  const newErrors: any = {};
  const validateForm = (): boolean => {
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.phonenumber)
      newErrors.phonenumber = "Phone Number is required.";
    if (!formData.agreementtype)
      newErrors.agreementtype = "Agreement Type is required.";
    if (formData.agreementtype === "acda" && !formData.eip)
      newErrors.eip = "EIP Limit is required.";
    if (!formData.promotion) newErrors.promotion = "Promotion is required.";
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
    // if (!formData.locationid) newErrors.locationid = "Location ID is required.";
    if (!formData.contactname)
      newErrors.contactname = "Contact Name is required.";
    if (!formData.contactphone)
      newErrors.contactphone = "Contact Phone is required.";
    if (!formData.contactemail)
      newErrors.contactemail = "Contact Email is required.";
    if (!formData.billtomobile)
      newErrors.billtomobile = "Bill to Mobile is required.";
    if (!formData.creditcardpayment)
      newErrors.creditcardpayment = "Please select an autopay option";


    if (formData.creditcardpayment === "yes") {
      if (!formData.paymentMethod || formData.paymentMethod === "select") {
        newErrors.paymentMethod = "Please select a payment method.";
      }

      if (formData.paymentMethod === "checkingAccount") {
        if (!formData.accountHolderName) newErrors.accountHolderName = "Account Holder Name is required.";
        if (!formData.routingNumber) newErrors.routingNumber = "Routing Number is required.";
        if (!formData.checkingAccountNumber) newErrors.checkingAccountNumber = "Checking Account Number is required.";
      }


      if (formData.paymentMethod === "debitCreditCard") {
        if (!formData.cardHolderName) newErrors.cardHolderName = "Card Holder Name is required.";
        if (!formData.cardNumber) newErrors.cardNumber = "Card Number is required.";
        if (!formData.cardExpiry) newErrors.cardExpiry = "Expiry Date is required.";
        if (!formData.cardCVC) newErrors.cardCVC = "CVC is required.";
        if (!formData.cardBillingAddress) newErrors.cardBillingAddress = "Billing Address is required.";
      }
    }


    // if (!formData.singleormultiaddresshipment)
    //   newErrors.singleormultiaddresshipment =
    //     "Single or Multi Address Shipment is required.";
    // if (!formData.attentionname)
    //   newErrors.attentionname = "Attention Name is required.";
    // if (!formData.shippingaddress)
    //   newErrors.shippingaddress = "Shipping Address is required.";
    // if (!formData.shippingcity)
    //   newErrors.shippingcity = "Shipping City is required.";
    // if (!formData.shippingstate)
    //   newErrors.shippingstate = "Shipping State is required.";
    // if (!formData.shippingzip)
    //   newErrors.shippingzip = "Shipping Zip is required.";
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
    // if (!formData.existingBAN)
    //   newErrors.existingBAN = "Existing BAN is required.";
    // if (!formData.existingFAN)
    //   newErrors.existingFAN = "Existing FAN is required.";
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
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data before submission:", formData);
    console.log(newErrors);
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
      "paymentInfo",
      "shippingInfo",
      "carrierInfo",
      "additionalInfo",
    ];
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1]);
    }
  };

  // console.log(formData);

  const validateTab = (tab: string): boolean => {
    const newErrors: any = {};

    // Validate fields based on the active tab
    switch (tab) {

      case "accountInfo":
        if (!formData.name) newErrors.name = "Name is required.";
        if (!formData.email) newErrors.email = "Email is required.";
        if (!formData.phonenumber)
          newErrors.phonenumber = "Phone Number is required.";
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
        if (!formData.companyname)
          newErrors.companyname = "Company Name is required.";
        if (!formData.dealerCode)
          newErrors.dealerCode = "Dealer Code is required.";
        if (!formData.agentCode)
          newErrors.agentCode = "Agent Code is required.";
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
        if (!formData.companyname)
          newErrors.companyname = "Company Name is required.";
        if (!formData.dealerCode)
          newErrors.dealerCode = "Dealer Code is required.";
        if (!formData.agentCode)
          newErrors.agentCode = "Agent Code is required.";
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleNext = () => {
    setActiveTab((prevTab) => {
      const tabOrder = [
        // "sellerInfo",
        "accountInfo",
        "paymentInfo",
        "shippingInfo",
        "carrierInfo",
        "additionalInfo",
      ];
      const currentIndex = tabOrder.indexOf(prevTab);
      if (currentIndex < tabOrder.length - 1) {
        return tabOrder[currentIndex + 1];
      }
      return prevTab;
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      // case "sellerInfo":
      //   return (
      //     <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg border">
      //       {/* Heading */}
      //       <h2 className="text-2xl text-gray-800 font-semibold mb-8 text-left">
      //         SANS Agent Information
      //       </h2>

      //       {/* Form */}
      //       <form onSubmit={onSubmit} className="space-y-6">
      //         {/* Row 1 */}
      //         <div className="grid grid-cols-1 mt-10 md:grid-cols-3 gap-6">
      //           <div className="w-full">
      //             <h6 className="text-[#3C3C3C] text-start">Name</h6>
      //             <input
      //               type="text"
      //               name="name"
      //               placeholder="Enter Name"
      //               value={formData.name}
      //               onChange={handleChange}
      //               className="border-b focus:outline-none border-gray-300 py-2 w-full"
      //             />
      //             {errors.name && (
      //               <p className="text-red-500 text-sm">{errors.name}</p>
      //             )}
      //           </div>

      //           <div>
      //             <h6 className="text-[#3C3C3C] text-start">Email</h6>
      //             <input
      //               type="text"
      //               name="email"
      //               placeholder="Enter Email"
      //               value={formData.email}
      //               onChange={handleChange}
      //               className="border-b focus:outline-none border-gray-300 py-2 w-full"
      //             />
      //             {errors.email && (
      //               <p className="text-red-500 text-sm">{errors.email}</p>
      //             )}
      //           </div>

      //           <div>
      //             <h6 className="text-[#3C3C3C] text-start">Phone</h6>
      //             <input
      //               name="phonenumber"
      //               placeholder="Enter Phone"
      //               value={formData.phonenumber}
      //               onChange={handleChange}
      //               className="w-full border-b border-gray-300 py-2"
      //             />
      //             {errors.phonenumber && (
      //               <p className="text-red-500 text-sm">{errors.phonenumber}</p>
      //             )}
      //           </div>
      //         </div>

      //         {/* Row 2 */}
      //         <div className="grid grid-cols-1 mt-10 md:grid-cols-3 gap-6">
      //           <div className="w-full">
      //             <h6 className="text-[#3C3C3C] text-start">Dealer Code</h6>
      //             <input
      //               type="text"
      //               name="dealerCode"
      //               placeholder="Enter Dealer Code"
      //               value={formData.dealerCode}
      //               onChange={handleChange}
      //               className="border-b focus:outline-none border-gray-300 py-2 w-full"
      //             />
      //             {errors.dealerCode && (
      //               <p className="text-red-500 text-sm">{errors.dealerCode}</p>
      //             )}
      //           </div>

      //           <div>
      //             {/* <h6 className="text-[#3C3C3C] text-start">Agent Code</h6> */}
      //             <h6 className="text-[#3C3C3C] text-start">
      //               SANS Partner ID:
      //             </h6>
      //             <input
      //               type="text"
      //               name="agentCode"
      //               placeholder="Enter Agent Code"
      //               value={formData.agentCode}
      //               onChange={handleChange}
      //               className="border-b focus:outline-none border-gray-300 py-2 w-full"
      //             />
      //             {errors.agentCode && (
      //               <p className="text-red-500 text-sm">{errors.agentCode}</p>
      //             )}
      //           </div>
      //         </div>
      //       </form>
      //     </div>
      //   );

      case "accountInfo":
        return (
          <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg border text-left">
            {/* Heading */}
            <h2 className="text-2xl text-gray-800 font-semibold mb-8 text-left">
              AT&T Account Option
            </h2>

            {/* Form Section */}
            <form onSubmit={onSubmit} className="space-y-6">
              {/* Row 1 */}
              <div className="grid grid-cols-1 mt-10 md:grid-cols-3 gap-6">
                <div className="w-full">
                  <h6 className="text-[#3C3C3C] text-start">Name</h6>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border-b focus:outline-none border-gray-300 py-2 w-full"
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div>
                  <h6 className="text-[#3C3C3C] text-start">Email</h6>
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border-b focus:outline-none border-gray-300 py-2 w-full"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div>
                  <h6 className="text-[#3C3C3C] text-start">Phone</h6>
                  <input
                    name="phonenumber"
                    placeholder="Enter Phone"
                    value={formData.phonenumber}
                    onChange={handleChange}
                    className="w-full border-b border-gray-300 py-2"
                  />
                  {errors.phonenumber && <p className="text-red-500 text-sm">{errors.phonenumber}</p>}
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 mt-10 md:grid-cols-3 gap-6">
                <div className="w-full">
                  <h6 className="text-[#3C3C3C] text-start">Dealer Code</h6>
                  <input
                    type="text"
                    name="dealerCode"
                    placeholder="Enter Dealer Code"
                    value={formData.dealerCode}
                    onChange={handleChange}
                    className="border-b focus:outline-none border-gray-300 py-2 w-full"
                  />
                  {errors.dealerCode && <p className="text-red-500 text-sm">{errors.dealerCode}</p>}
                </div>

                <div>
                  <h6 className="text-[#3C3C3C] text-start">SANS Partner ID:</h6>
                  <input
                    type="text"
                    name="agentCode"
                    placeholder="Enter Agent Code"
                    value={formData.agentCode}
                    onChange={handleChange}
                    className="border-b focus:outline-none border-gray-300 py-2 w-full"
                  />
                  {errors.agentCode && <p className="text-red-500 text-sm">{errors.agentCode}</p>}
                </div>
              </div>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
              {/* Agreement Type */}
              <div className="w-full">
                <select
                  name="agreementtype"
                  value={formData.agreementtype}
                  onChange={handleChange}
                  className="border-b h-10 border-gray-300 w-full"
                >
                  <option value="">Select Agreement Type</option>
                  <option value="amb">AMB</option>
                  <option value="acda">ACDA Attainment/MAC</option>
                </select>
                {errors.agreementtype && <p className="text-red-500 text-sm">{errors.agreementtype}</p>}
              </div>

              {/* EIP Limit (Conditional Field) */}
              {formData.agreementtype === "acda" && (
                <div className="w-full">
                  <input
                    name="eip"
                    placeholder="Enter What EIP Limit is needed"
                    value={formData.eip}
                    onChange={handleChange}
                    className="w-full border-b border-gray-300 py-2"
                  />
                  {errors.eip && <p className="text-red-500 text-sm">{errors.eip}</p>}
                </div>
              )}

              {/* Add AT&T Account */}
              <div className="w-full">
                <select
                  name="atntaccount"
                  value={formData.atntaccount}
                  onChange={handleChange}
                  className="border-b h-10 border-gray-300 w-full"
                >
                  <option value="">Add AT&T Account</option>
                  <option value="accepted">Yes</option>
                  <option value="declined">No</option>
                </select>
                {errors.atntaccount && <p className="text-red-500 text-sm">{errors.atntaccount}</p>}
              </div>

              {/* Special Instructions */}
              <div className="w-full">
                <h4 className="text-lg text-gray-800 font-semibold mb-2">Special Instruction</h4>
                <textarea
                  name="specialinstruction"
                  value={formData.specialinstruction}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  onChange={handleChange}
                  placeholder="Type here..."
                  style={{ resize: "none" }}
                ></textarea>
                {errors.specialinstruction && <p className="text-red-500 text-sm">{errors.specialinstruction}</p>}
              </div>
            </div>

            {/* Order Assignment */}
            {!isFirstOrder && (
              <OrderAssignment token={token} formData={formData} setFormData={setFormData} />
            )}

            {/* Secondary Heading */}
            {formData.atntaccount === "accepted" && (
              <div>
                <h2 className="text-2xl text-gray-800 font-semibold my-8 text-left">AT&T Account Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { name: "businesslegalname", label: "Business Legal Name", placeholder: "Enter Business Legal Name" },
                    { name: "businessaddress", label: "Business Address", placeholder: "Enter Business Address" },
                    { name: "businesscity", label: "Business City", placeholder: "Enter Business City" },
                    { name: "businessstate", label: "Business State", placeholder: "Enter Business State" },
                    { name: "businesszip", label: "Business Zip", placeholder: "Enter Business Zip" },
                    { name: "taxid", label: "Tax ID", placeholder: "Enter Tax ID" },
                    { name: "contactname", label: "Contact Name", placeholder: "Enter Contact Name" },
                    { name: "contactphone", label: "Contact Phone", placeholder: "Enter Contact Phone" },
                    { name: "contactemail", label: "Contact Email", placeholder: "Enter Contact Email" },
                    { name: "existingBAN", label: "Existing BAN", placeholder: "Enter Existing BAN" },
                    { name: "existingFAN", label: "Existing FAN", placeholder: "Enter Existing FAN" },
                  ].map((field, index) => (
                    <div key={index} className="mb-4">
                      <h6 className="text-sm font-medium text-gray-700">{field.label}</h6>

                      {/* Exclude Existing BAN and FAN from regular input rendering */}
                      {field.name !== "existingBAN" && field.name !== "existingFAN" && (
                        <input
                          type="text"
                          name={field.name}
                          placeholder={field.placeholder}
                          value={formData[field.name]}
                          onChange={handleChange}
                          className="border-b focus:outline-none border-gray-300 py-2 w-full"
                        />
                      )}

                      {/* Dropdown for Existing BAN */}
                      {field.name === "existingBAN" && (
                        <select
                          name={field.name}
                          value={formData[field.name]}
                          onChange={(e) => handleBanFanDropdownChange(e, "existingBAN")}
                          className="border-b focus:outline-none border-gray-300 py-2 w-full"
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      )}

                      {/* Dropdown for Existing FAN */}
                      {field.name === "existingFAN" && (
                        <select
                          name={field.name}
                          value={formData[field.name]}
                          onChange={(e) => handleBanFanDropdownChange(e, "existingFAN")}
                          className="border-b focus:outline-none border-gray-300 py-2 w-full"
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      )}

                      {/* Input fields for Existing BAN and FAN */}
                      {showExistingBAN && field.name === "existingBAN" && (
                        <input
                          type="text"
                          name={field.name}
                          placeholder={field.placeholder}
                          value={formData[field.name]}
                          onChange={handleChange}
                          className="border-b focus:outline-none border-gray-300 py-2 w-full mt-2"
                        />
                      )}
                      {showExistingFAN && field.name === "existingFAN" && (
                        <input
                          type="text"
                          name={field.name}
                          placeholder={field.placeholder}
                          value={formData[field.name]}
                          onChange={handleChange}
                          className="border-b focus:outline-none border-gray-300 py-2 w-full mt-2"
                        />
                      )}

                      {errors[field.name] && <p className="text-red-500 text-sm">{errors[field.name]}</p>}
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
                <h6 className="text-sm font-medium text-gray-700">Paperless Billing?</h6>
                <select
                  name="paperless"
                  value={formData.paperless}
                  onChange={handleChange}
                  className="border-b h-10 border-gray-300 py-2 w-full"
                >
                  <option value="accepted">Yes</option>
                  <option value="declined">No</option>
                </select>
                {errors.paperless && (
                  <p className="text-danger text-sm">{errors.paperless}</p>
                )}
              </div>

              {/* Bill to Mobile */}
              <div className="w-full">
                <h6 className="text-sm font-medium text-gray-700">Bill to Mobile?</h6>
                <select
                  name="billtomobile"
                  value={formData.billtomobile}
                  onChange={handleChange}
                  className="border-b h-10 border-gray-300 py-2 w-full"
                >
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
                  <option value="select" selected>Select An Option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {errors.creditcardpayment && (
                  <p className="text-danger text-sm">
                    {errors.creditcardpayment}
                  </p>
                )}
              </div>

              {/* Credit Card Information */}
              {/* {formData.creditcardpayment === "yes" && (
                  <div className="w-full md:col-span-3 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="w-full">
                        <label
                          className="block text-sm font-medium mb-2"
                          htmlFor="cardNumber"
                        >
                          Card Number
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          className="border-b focus:outline-none border-gray-300 py-2 w-full"
                          placeholder="Enter your card number"
                        />
                        {errors.cardNumber && (
                          <p className="text-danger text-sm">
                            {errors.cardNumber}
                          </p>
                        )}
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
                    </div>
                  </div>
                )} */}

              {formData.creditcardpayment === "yes" && (
                <div className="w-full md:col-span-3 mt-4">
                  <div className="w-full">
                    <label className="block text-sm font-medium mb-2" htmlFor="paymentMethod">
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
                      <option value="debitCreditCard">Debit Card/Credit Card</option>
                    </select>
                  </div>
                </div>
              )}
              {formData.paymentMethod === "checkingAccount" && (
                <div className="w-full md:col-span-3 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="w-full">
                      <label className="block text-sm font-medium mb-2" htmlFor="accountHolderName">
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
                        <p className="text-danger text-sm">{errors.accountHolderName}</p>
                      )}
                    </div>

                    <div className="w-full">
                      <label className="block text-sm font-medium mb-2" htmlFor="routingNumber">
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
                        <p className="text-danger text-sm">{errors.routingNumber}</p>
                      )}
                    </div>

                    <div className="w-full">
                      <label className="block text-sm font-medium mb-2" htmlFor="checkingAccountNumber">
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
                        <p className="text-danger text-sm">{errors.checkingAccountNumber}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {formData.paymentMethod === "debitCreditCard" && (
                <div className="w-full md:col-span-3 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="w-full">
                      <label className="block text-sm font-medium mb-2" htmlFor="cardHolderName">
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
                        <p className="text-danger text-sm">{errors.cardHolderName}</p>
                      )}
                    </div>

                    <div className="w-full">
                      <label className="block text-sm font-medium mb-2" htmlFor="cardNumber">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className="border-b focus:outline-none border-gray-300 py-2 w-full"
                        placeholder="Enter your card number"
                      />
                      {errors.cardNumber && (
                        <p className="text-danger text-sm">{errors.cardNumber}</p>
                      )}
                    </div>

                    <div className="w-full">
                      <label className="block text-sm font-medium mb-2" htmlFor="cardExpiry">
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
                        <p className="text-danger text-sm">{errors.cardExpiry}</p>
                      )}
                    </div>

                    <div className="w-full">
                      <label className="block text-sm font-medium mb-2" htmlFor="cardCVC">
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
                      <label className="block text-sm font-medium mb-2" htmlFor="cardBillingAddress">
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
                        <p className="text-danger text-sm">{errors.cardBillingAddress}</p>
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
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2 border-b pb-6"
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
                  { name: "shippingstate", label: "Shipping State" },
                  { name: "shippingzip", label: "Shipping Zip" },
                  { name: "shippingcity", label: "Shipping City" },
                ].map(({ name, label }) => (
                  <div className="mb-4" key={name}>
                    <h6 className="text-sm font-medium text-gray-700 mb-2">
                      {label}
                    </h6>
                    <input
                      type="text"
                      name={name}
                      placeholder={`Enter ${label}`}
                      value={info[name]}
                      onChange={(e) => handleShippingInfoChange(e, index)}
                      className="border-b focus:outline-none border-gray-300 py-2 w-full"
                    />
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
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 border-b pb-6"
              >
                {/* Header with Remove Button */}
                <div className="col-span-1 md:col-span-2 flex justify-between items-center">
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
                      className="text-red-500 hover:text-red-700 text-sm md:text-base"
                    >
                      - Remove
                    </button>
                  )}
                </div>

                {/* Carrier Information Fields */}
                <div className="mb-4">
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

                {/* Repeated Fields */}
                {[
                  { name: "accountnumber", label: "Account Number" },
                  { name: "pinorpassword", label: "Pin or Password" },
                  { name: "ssnortaxid", label: "SSN or TaxID" },
                  { name: "billingname", label: "Billing Name" },
                  { name: "billingaddress", label: "Billing Address" },
                  { name: "billingcity", label: "Billing City" },
                  { name: "billingstate", label: "Billing State" },
                  { name: "billingzip", label: "Billing Zip" },
                  { name: "authorizedname", label: "Authorized Name" },
                ].map(({ name, label }) => (
                  <div className="mb-4" key={name}>
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
      case "additionalInfo":
        return (
          <div className="flex justify-center items-start">
            <div className="bg-white max-w-4xl mx-auto p-8 w-full shadow-lg rounded-lg border text-left">
              {/* Additional Information */}
              <h3 className="text-xl text-gray-800 font-semibold mb-4 sm:text-center text-start">
                Additional Information
              </h3>
              <div className="grid grid-cols-1 mt-4 md:grid-cols-3 gap-4">
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
                    <p className="text-danger text-sm">{errors.companyname}</p>
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
                    <p className="text-danger text-sm">
                      {errors.accountnumber}
                    </p>
                  )}
                  {isFirstOrder && (
                    <div className="flex justify-start">
                      <p className="text-danger text-sm mt-1 text-center">
                        This will only be filled out once.
                      </p>
                    </div>
                  )}
                </div>
                <IMEIForm
                  imeiNumbers={imeiNumbers}
                  onImeiNumbersChange={handleImeiNumbersChange}
                  onAccountFieldsChange={handleAccountFieldsChange}
                  onPhoneNumbersChange={handlePhoneNumbersChange}
                  onShippingAddressesChange={handleShippingAddressesChange}
                  shippingInfos={shippingInfos}
                  carrierInfos={carrierInfos}
                  tradeSmartphone={tradeSmartphone}
                  setTradeSmartphone={setTradeSmartphone}
                  buyPhoneNumber={buyPhoneNumber}
                  setBuyPhoneNumber={setBuyPhoneNumber}
                  phoneUniqueCode={phoneUniqueCode} // Passed from parent
                  setPhoneUniqueCode={setPhoneUniqueCode} // Passed from parent
                  promoCode={promoCode} // Passed from parent
                  setPromoCode={setPromoCode} // Passed from parent
                  handleTradeSmartphoneChange={handleTradeSmartphoneChange} // Pass function as prop
                  handlePhoneUniqueCodeChange={handlePhoneUniqueCodeChange} // Pass function as prop
                  handleBuyPhoneNumberChange={handleBuyPhoneNumberChange} // Pass function as prop
                  handlePromoCodeChange={handlePromoCodeChange}
                />
              </div>

              <div className="grid grid-cols-1 mt-10 md:grid-cols-2 gap-6">
                {/* Rate Plan Selection */}
                <div>
                  <h3 className="text-xl text-gray-800 font-semibold mb-4 sm:text-center text-start">
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
                  <h3 className="text-xl text-gray-800 font-semibold mb-4 sm:text-center text-start">
                    Smartphone Purchase/Trade Options
                  </h3>

                  {/* Promotions */}
                  <div className="w-full">
                    <select
                      name="buyNewPhone"
                      value={buyNewPhone}
                      onChange={handleBuyNewPhoneChange}
                      className="border-b h-10 border-gray-300 w-full"
                    >
                      <option value="">Select</option>
                      <option value="yes">I want to buy new smartphone</option>
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
                      </select>
                    </div>
                  )}

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
              { key: "additionalInfo", label: "Line Configuration" },
              { key: "shippingInfo", label: "Shipping Information" },
              { key: "paymentInfo", label: "Payment Information" },
              { key: "carrierInfo", label: "Carrier Information" },
              // { key: "additionalInfo", label: "Additional Information" },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 w-full md:w-auto ${activeTab === tab.key ? "text-white" : "bg-gray-300"
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
            {activeTab === "additionalInfo" ? (
              <button
                type="submit" // Submit button triggers the form's onSubmit handler
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
        </div>
      </section>
    </form>
  );
};

export default Form;
