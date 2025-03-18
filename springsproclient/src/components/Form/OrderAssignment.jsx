import React, { useState, useEffect } from "react";
import axios from "axios";

function OrderAssignment({ token, formData, setFormData }) {
  const [customers, setCustomers] = useState([]); // List of all customers
  const [selectedCustomer, setSelectedCustomer] = useState(""); // Selected customer ID
  const [loading, setLoading] = useState(false); // Loading state for customers
  const [error, setError] = useState(null); // Error state

  // Fetch all customers when the component loads
  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          "https://springairnsbackend-production.up.railway.app/api/order/get-customers",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCustomers(response.data.customers || []);
      } catch (error) {
        setError("Failed to fetch customers. Please try again.");
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchCustomers();
    } else {
      setError("Token is missing or invalid.");
    }
  }, [token]);

  // Fetch details of the selected customer and update form data
  useEffect(() => {
    const fetchCustomerDetails = () => {
      if (!selectedCustomer) return;

      // Find the selected customer in the existing customers array
      const customer = customers.find(
        (customer) => customer._id === selectedCustomer
      );

      if (customer) {
        // Update form data with the selected customer's details
        setFormData((prevData) => ({
          ...prevData,
          businesslegalname: customer?.businesslegalname || "",
          businessaddress: customer?.businessaddress || "",
          businesscity: customer?.businesscity || "",
          businessstate: customer?.businessstate || "",
          businesszip: customer?.businesszip || "",
          taxid: customer?.taxid || "",
          contactname: customer?.contactname || "",
          contactphone: customer?.contactphone || "",
          contactemail: customer?.contactemail || "",
          locationid: customer?.locationid || "",
          billtomobile: customer?.billtomobile || "",
          creditcardpayment: customer?.creditcardpayment || "",
          cardNumber: customer?.cardNumber || null,
          cardExpiry: customer?.cardExpiry || null,
          cardCVC: customer?.cardCVC || null,
          singleormultiaddresshipment: customer?.singleormultiaddresshipment || "",
          attentionname: customer?.attentionname || "",
          shippingaddress: customer?.shippingaddress || "",
          shippingcity: customer?.shippingcity || "",
          shippingstate: customer?.shippingstate || "",
          shippingzip: customer?.shippingzip || "",
          agentId: customer?.agentId || null,
          existingBAN: customer?.existingBAN || null,
          existingFAN: customer?.existingFAN || null,
        }));
      }
    };

    fetchCustomerDetails();
  }, [selectedCustomer, customers, setFormData]);

  return (
    <div>
      <h2 className="text-2xl text-gray-800 font-semibold text-left">
        Select Which Customer To Assign This Order
      </h2>

      {/* Loading Indicator */}
      {loading && (
        <div className="text-center text-gray-500">Loading customers...</div>
      )}

      {/* Error Display */}
      {error && (
        <div className="text-red-500 text-sm text-center mb-4">{error}</div>
      )}

      {/* Customer Selection */}
      {!loading && !error && (
        <div className="grid grid-cols-1 items-end mt-10 md:grid-cols-3 gap-4">
          <div className="col-span-1">
            <label
              htmlFor="customerSelect"
              className="block text-sm font-medium text-gray-800 text-start"
            >
              Select A Customer
            </label>
            <select
              id="customerSelect"
              name="customerSelect"
              className="border-b h-10 border-gray-300 w-full"
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
            >
              <option value="">Select a Customer</option>
              {customers.map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.businesslegalname}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderAssignment;
