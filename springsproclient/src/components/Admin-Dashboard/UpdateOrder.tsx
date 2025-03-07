import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Swal from "sweetalert2";

const UpdateOrder: React.FC = () => {
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
        { code: 'AL', name: 'Alabama' },
        { code: 'AK', name: 'Alaska' },
        { code: 'AZ', name: 'Arizona' },
        { code: 'AR', name: 'Arkansas' },
        { code: 'CA', name: 'California' },
        { code: 'CO', name: 'Colorado' },
        { code: 'CT', name: 'Connecticut' },
        { code: 'DE', name: 'Delaware' },
        { code: 'FL', name: 'Florida' },
        { code: 'GA', name: 'Georgia' },
        { code: 'HI', name: 'Hawaii' }, // Fixed typo here (was 'nametab')
        { code: 'ID', name: 'Idaho' },
        { code: 'IL', name: 'Illinois' },
        { code: 'IN', name: 'Indiana' },
        { code: 'IA', name: 'Iowa' },
        { code: 'KS', name: 'Kansas' },
        { code: 'KY', name: 'Kentucky' },
        { code: 'LA', name: 'Louisiana' },
        { code: 'ME', name: 'Maine' },
        { code: 'MD', name: 'Maryland' },
        { code: 'MA', name: 'Massachusetts' },
        { code: 'MI', name: 'Michigan' },
        { code: 'MN', name: 'Minnesota' },
        { code: 'MS', name: 'Mississippi' },
        { code: 'MO', name: 'Missouri' },
        { code: 'MT', name: 'Montana' },
        { code: 'NE', name: 'Nebraska' },
        { code: 'NV', name: 'Nevada' },
        { code: 'NH', name: 'New Hampshire' },
        { code: 'NJ', name: 'New Jersey' },
        { code: 'NM', name: 'New Mexico' },
        { code: 'NY', name: 'New York' },
        { code: 'NC', name: 'North Carolina' },
        { code: 'ND', name: 'North Dakota' },
        { code: 'OH', name: 'Ohio' },
        { code: 'OK', name: 'Oklahoma' },
        { code: 'OR', name: 'Oregon' },
        { code: 'PA', name: 'Pennsylvania' },
        { code: 'RI', name: 'Rhode Island' },
        { code: 'SC', name: 'South Carolina' },
        { code: 'SD', name: 'South Dakota' },
        { code: 'TN', name: 'Tennessee' },
        { code: 'TX', name: 'Texas' },
        { code: 'UT', name: 'Utah' },
        { code: 'VT', name: 'Vermont' },
        { code: 'VA', name: 'Virginia' },
        { code: 'WA', name: 'Washington' },
        { code: 'WV', name: 'West Virginia' },
        { code: 'WI', name: 'Wisconsin' },
        { code: 'WY', name: 'Wyoming' }
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
  }) => {
    // Get the last 4 digits of the account number
    const last4AccountNumber = accountnumber.slice(-4);

    // Get the last 4 characters of the pin/password
    const last4Pin = pinorpassword.slice(-4);

    return `${currentwirelesscarrier}_${last4AccountNumber}_${last4Pin}`;
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
          setFormData((prev) => ({
            ...prev,
            name: orderData.name || "",
            email: orderData.email || "",
            agreementtype: orderData.agreementtype || "",
            eip: orderData.eip || "",
            promotion: orderData.promotion || "",
            atntaccount: orderData.atntaccount || "",
            sansPartnerID: orderData.sansPartnerID || "",
            // Populate other fields as necessary
          }));


           // Set existing shipping information
        if (orderData.shippingAddresses) {
          setShippingInfos(orderData.shippingAddresses);
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

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.sansPartnerID)
      newErrors.sansPartnerID = "SANS Partner ID is required.";
    if (!formData.agreementtype)
      newErrors.agreementtype = "Agreement Type is required.";
    // Add other validations as necessary
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.put(
          `https://springprobackend-production.up.railway.app/api/order/update-order/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("Order updated successfully!");
          setIsSubmitted(true);
        }
      } catch (error) {
        console.error("There was an error updating the order:", error.message);
        setErrors((prev) => ({
          ...prev,
          submit: "An error occurred while updating the order.",
        }));
      }
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
                  {formData.atntaccount === "accepted" && (
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
  <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2 pb-2">
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
      { name: "shippingstate", label: "Shipping State", isDropdown: true },
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
      </div>
    ))}
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
                <button
                  type="submit"
                  className="mt-4 bg-blue-500 text-white p-2 rounded"
                >
                  Update Order
                </button>
                {errors.submit && (
                  <p className="text-red-500">{errors.submit}</p>
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
