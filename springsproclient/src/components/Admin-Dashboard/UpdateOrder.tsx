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
    name: "",
    email: "",
    agreementtype: "",
    eip: "",
    promotion: "",
    atntaccount: "",
    sansPartnerID: "",
    // Add other fields as necessary
  });

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
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
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
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } p-2`}
                  />
                  {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } p-2`}
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="agreementtype">Agreement Type</label>
                  <input
                    type="text"
                    id="agreementtype"
                    name="agreementtype"
                    value={formData.agreementtype}
                    onChange={handleChange}
                    className="border border-gray-300 p-2"
                  />
                </div>
                <div>
                  <label htmlFor="eip">EIP</label>
                  <input
                    type="text"
                    id="eip"
                    name="eip"
                    value={formData.eip}
                    onChange={handleChange}
                    className="border border-gray-300 p-2"
                  />
                </div>
                <div>
                  <label htmlFor="promotion">Promotion</label>
                  <input
                    type="text"
                    id="promotion"
                    name="promotion"
                    value={formData.promotion}
                    onChange={handleChange}
                    className="border border-gray-300 p-2"
                  />
                </div>
                <div>
                  <label htmlFor="atntaccount">AT&T Account</label>
                  <input
                    type="text"
                    id="atntaccount"
                    name="atntaccount"
                    value={formData.atntaccount}
                    onChange={handleChange}
                    className="border border-gray-300 p-2"
                  />
                </div>
                <div>
                  <label htmlFor="sansPartnerID">Sans Partner ID</label>
                  <input
                    type="text"
                    id="sansPartnerID"
                    name="sansPartnerID"
                    value={formData.sansPartnerID}
                    onChange={handleChange}
                    className="border border-gray-300 p-2"
                  />
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
