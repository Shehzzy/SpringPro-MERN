import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { jwtDecode } from "jwt-decode";

function OrderDetails() {
  const { orderId } = useParams(); // Get the order ID from the URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("jwt_token");

  // Decode the JWT token
  const decodedToken = token ? jwtDecode(token) : null;
  const userRole = decodedToken ? decodedToken.role : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (userRole !== "admin") {
      setError("You do not have admin access");
      navigate("/");
      return;
    }

    axios
      .get(
        `https://springprobackend-production.up.railway.app/api/order/get-single-order/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            role: userRole,
          },
        }
      )
      .then((response) => {
        setOrder(response.data.order);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
        setError("Error fetching order details");
        setLoading(false);
      });
  }, [orderId, token, navigate, userRole]);

  if (loading) return <div className="text-center mt-20 text-lg">Loading...</div>;
  if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;

  return (
    <>
      <Navbar />
      <div id="layoutSidenav" className="flex">
        <Sidebar />
        <div id="layoutSidenav_content" className="flex-1">
          <main className="p-6 bg-gray-100 min-h-screen">
            <div className="container mx-auto">
              <h1 className="text-2xl font-bold text-gray-700 mb-6">Order Details</h1>

              {/* Customer Information */}
              <h2 className="text-xl font-bold mb-4 text-cyan-blue">Customer Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><strong>Name:</strong> {order.name || "N/A"}</div>
                <div><strong>Email:</strong> {order.email || "N/A"}</div>
                <div><strong>Phone Number:</strong> {order.phonenumber || "N/A"}</div>
                <div><strong>Agent Code:</strong> {order.agentCode || "N/A"}</div>
                <div><strong>Dealer Code:</strong> {order.dealerCode || "N/A"}</div>
                <div><strong>Existing BAN:</strong> {order.existingBAN || "N/A"}</div>
                <div><strong>Existing FAN:</strong> {order.existingFAN || "N/A"}</div>
              </div>

              {/* Order Information */}
              <h2 className="text-xl font-bold my-6 text-cyan-blue">Order Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><strong>Agreement Type:</strong> {order.agreementtype || "N/A"}</div>
                <div><strong>EIP:</strong> {order.eip || "N/A"}</div>
                <div><strong>Promotion:</strong> {order.promotion || "N/A"}</div>
                <div><strong>Paperless:</strong> {order.paperless || "N/A"}</div>
                <div><strong>Special Instruction:</strong> {order.specialinstruction || "N/A"}</div>
                <div><strong>Rate Plan:</strong> {order.ratePlan || "N/A"}</div>
                <div><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</div>
                <div><strong>Status:</strong>
                  <span className={`px-3 py-1 rounded-lg text-sm font-bold ${order.status === "Pending" ? "bg-yellow-200 text-yellow-800" : order.status === "Completed" ? "bg-green-200 text-green-800" : "bg-gray-200 text-gray-800"}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* IMEI Numbers and Related Information */}
              <h2 className="text-xl font-bold my-6 text-cyan-blue">IMEI Numbers and Related Information</h2>
              {order.imeiNumbers && order.imeiNumbers.length > 0 ? (
                order.imeiNumbers.map((imei, index) => (
                  <div key={index} className="mb-4 p-4 border rounded-lg">
                    <h3 className="font-bold">IMEI Number: {imei.imei}</h3>
                    <div>
                      <strong>Port Out PIN:</strong> {order.accounts[index]?.portOutPin || "N/A"} <br />
                      <strong>Shipping Address Details:</strong>
                      <div>
                        <strong>Attention Name:</strong> {order.shippingAddresses[index]?.attentionname || "N/A"} <br />
                        <strong>Address:</strong> {order.shippingAddresses[index]?.shippingaddress || "N/A"} <br />
                        <strong>City:</strong> {order.shippingAddresses[index]?.shippingcity || "N/A"} <br />
                        <strong>State:</strong> {order.shippingAddresses[index]?.shippingstate || "N/A"} <br />
                        <strong>Zip:</strong> {order.shippingAddresses[index]?.shippingzip || "N/A"} <br />
                      </div>
                      <strong>Account Number:</strong> {order.accounts[index]?.accountNumber || "N/A"} <br />
                      <strong>Phone Number:</strong> {order.phoneNumbers[index]?.phoneNumber || "N/A"} <br />
                      <strong>Carrier Info:</strong> {order.carrierInfos[index]?.currentwirelesscarrier || "N/A"} <br />
                    </div>
                  </div>
                ))
              ) : (
                <p>No IMEI numbers available.</p>
              )}
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default OrderDetails;