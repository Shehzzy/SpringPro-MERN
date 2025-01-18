import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function OrderDetails() {
  const { orderId } = useParams(); // Get the order ID from the URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("jwt_token");
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
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
  }, [orderId, token, navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Navbar />
      <div id="layoutSidenav">
        <Sidebar />
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4" style={{ marginTop: "50px" }}>
              <h1 className="mt-4 h3">Order Details</h1>
              <div className="card mb-4">
                <div className="card-body">
                  <h5>
                    <strong>Name:</strong> {order.name}
                  </h5>
                  <h5>
                    <strong>Email:</strong> {order.email}
                  </h5>
                  <h5>
                    <strong>Phone Number:</strong> {order.phonenumber}
                  </h5>
                  <h5>
                    <strong>Agent Code:</strong> {order.agentCode}
                  </h5>
                  <h5>
                    <strong>Dealer Code:</strong> {order.dealerCode}
                  </h5>
                  <h5>
                    <strong>Existing BAN:</strong> {order.existingBAN}
                  </h5>
                  <h5>
                    <strong>Existing FAN:</strong> {order.existingFAN}
                  </h5>
                  <h5>
                    <strong>Agreement Type:</strong>{" "}
                    {order.agreementtype || "N/A"}
                  </h5>
                  <h5>
                    <strong>EIP:</strong> {order.eip || "N/A"}
                  </h5>
                  <h5>
                    <strong>Promotion:</strong> {order.promotion || "N/A"}
                  </h5>
                  <h5>
                    <strong>Paperless:</strong> {order.paperless || "N/A"}
                  </h5>
                  <h5>
                    <strong>Special Instruction:</strong>{" "}
                    {order.specialinstruction || "N/A"}
                  </h5>
                  <h5>
                    <strong>Rate Plan:</strong> {order.ratePlan || "N/A"}
                  </h5>
                  <h5>
                    <strong>Smartphone Details:</strong>
                  </h5>
                  {order.smartphoneDetails ? (
                    <ul>
                      <li>
                        <strong>Brand:</strong>{" "}
                        {order.smartphoneDetails.brand || "N/A"}
                      </li>
                      <li>
                        <strong>Model:</strong>{" "}
                        {order.smartphoneDetails.model || "N/A"}
                      </li>
                      <li>
                        <strong>Color:</strong>{" "}
                        {order.smartphoneDetails.color || "N/A"}
                      </li>
                      <li>
                        <strong>Size:</strong>{" "}
                        {order.smartphoneDetails.size || "N/A"}
                      </li>
                    </ul>
                  ) : (
                    <p>No smartphone details available.</p>
                  )}
                  <h5>
                    <strong>IMEI Numbers:</strong>
                  </h5>
                  <ul>
                    {order.imeiNumbers && order.imeiNumbers.length > 0 ? (
                      order.imeiNumbers.map((imei, index) => (
                        <li key={index}>{imei.imei}</li>
                      ))
                    ) : (
                      <li>No IMEI numbers</li>
                    )}
                  </ul>
                  <h5>
                    <strong>Order Date:</strong>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </h5>
                  <h5>
                    <strong>Shipping Address:</strong>{" "}
                    {order.customerId?.shippingaddress || "Not Available"}
                  </h5>
                  <h5>
                    <strong>Billing Information:</strong>
                  </h5>
                  <ul>
                    <li>
                      <strong>Name:</strong> {order.billingname || "N/A"}
                    </li>
                    <li>
                      <strong>Address:</strong> {order.billingaddress || "N/A"}
                    </li>
                    <li>
                      <strong>City:</strong> {order.billingcity || "N/A"}
                    </li>
                    <li>
                      <strong>State:</strong> {order.billingstate || "N/A"}
                    </li>
                    <li>
                      <strong>Zip:</strong> {order.billingzip || "N/A"}
                    </li>
                  </ul>
                  <h5>
                    <strong>Carrier Information:</strong>
                  </h5>
                  {order.carrierInfos && order.carrierInfos.length > 0 ? (
                    order.carrierInfos.map((carrier, index) => (
                      <div key={index} style={{ marginBottom: "1rem" }}>
                        <h6>
                          <strong>Carrier #{index + 1}</strong>
                        </h6>
                        <ul>
                          <li>
                            <strong>Carrier:</strong>{" "}
                            {carrier.currentwirelesscarrier}
                          </li>
                          <li>
                            <strong>Account Number:</strong>{" "}
                            {carrier.accountnumber}
                          </li>
                          <li>
                            <strong>PIN/Password:</strong>{" "}
                            {carrier.pinorpassword}
                          </li>
                          <li>
                            <strong>SSN/Tax ID:</strong> {carrier.ssnortaxid}
                          </li>
                          <li>
                            <strong>Billing Name:</strong> {carrier.billingname}
                          </li>
                          <li>
                            <strong>Billing Address:</strong>{" "}
                            {carrier.billingaddress}
                          </li>
                          <li>
                            <strong>City:</strong> {carrier.billingcity}
                          </li>
                          <li>
                            <strong>State:</strong> {carrier.billingstate}
                          </li>
                          <li>
                            <strong>Zip:</strong> {carrier.billingzip}
                          </li>
                          <li>
                            <strong>Authorized Name:</strong>{" "}
                            {carrier.authorizedname}
                          </li>
                          <li>
                            <strong>Unique Code:</strong> {carrier.uniqueCode}
                          </li>
                        </ul>
                      </div>
                    ))
                  ) : (
                    <p>No carrier information available.</p>
                  )}
                  <h5>
                    <strong>Status:</strong> {order.status}
                  </h5>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
