import React, { useState, useEffect } from "react";
import axios from "axios";

function OrderAssignment({ token, formData, setFormData }) {
  const [customers, setCustomers] = useState([]); // List of all customers
  const [selectedCustomer, setSelectedCustomer] = useState(""); // Selected customer ID

  // Fetch all customers when the component loads
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "https://springprobackend-production.up.railway.app/api/order/get-customers",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCustomers(response.data.customers);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
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
            businesslegalname: customer.businesslegalname || "",
            businessaddress: customer.businessaddress || "",
            businesscity: customer.businesscity || "",
            businessstate: customer.businessstate || "",
            businesszip: customer.businesszip || "",
            taxid: customer.taxid || "",
            contactname: customer.contactname || "",
            contactphone: customer.contactphone || "",
            contactemail: customer.contactemail || "",
            locationid: customer.locationid || "",
            billtomobile: customer.billtomobile || "",
            creditcardpayment: customer.creditcardpayment || "",
            singleormultiaddresshipment: customer.singleormultiaddresshipment || "",
            attentionname: customer.attentionname || "",
            shippingaddress: customer.shippingaddress || "",
            shippingcity: customer.shippingcity || "",
            shippingstate: customer.shippingstate || "",
            shippingzip: customer.shippingzip || "",
            agentId: customer.agentId || null,
            existingBAN:"",
            existingFAN:""
          }));
          
      }
    };

    fetchCustomerDetails();
  }, [selectedCustomer, customers, setFormData]);

  return (
    <div>
      <h3 className="text-xl text-gray-800 font-semibold mb-4 sm:text-center text-start">
        Select Which Customer To Assign This Order To
      </h3>
      <div className="grid grid-cols-1 items-end mt-10 md:grid-cols-3 gap-4">
        <div className="col-span-1">
          <label
            htmlFor="customerSelect"
            className="block text-sm font-medium text-gray-700 text-start"
          >
            Select A Customer
          </label>
          <select
            id="customerSelect"
            name="customerSelect"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
          >
            <option value="">-- Select a Customer --</option>
            {customers.map((customer) => (
              <option key={customer._id} value={customer._id}>
                {customer.businesslegalname}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default OrderAssignment;
