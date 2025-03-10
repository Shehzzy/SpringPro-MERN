import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
function Orders() {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt_token");
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // For modal data
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const apiUrl =
    "https://springprobackend-production.up.railway.app/api/order/get-user-orders";

  useEffect(() => {
    if (!token) {
      Swal.fire({
        title: "Login Required",
        text: "You need to log in first to access this page.",
        icon: "warning",
        confirmButtonText: "Go to Login",
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

    const fetchOrders = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data.orders);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, [navigate, token]);

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-6 mt-[100px]">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {/* Table */}
      <div className="overflow-x-auto">
        {orders.length === 0 ? (
          <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-6 border border-gray-200">
              <p className="text-center text-gray-500 text-xl">
                No orders to show
              </p>
              <div className="flex justify-center items-center">
                {" "}
                <Link
                  to="/order-form"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(65 ,253 ,254) 0%, rgba(0,210,255,1) 100%)",
                  }}
                  className="transition-all text-black hover:bg-black hover:text-white inter text-xs px-4 py-2 font-semibold rounded-3xl"
                >
                  ORDER NOW
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <table className="table-auto w-full border-collapse border border-gray-200 ">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Phone</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Created At</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {order.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.phonenumber}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${order.status === "Pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : order.status === "Completed"
                          ? "bg-green-200 text-green-800"
                          : order.status === "In Progress"
                            ? "bg-blue-200 text-blue-800" // New style for In Progress
                            : "bg-red-200 text-red-800" // Default for other statuses
                        }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(65 ,253 ,254) 0%, rgba(0,210,255,1) 100%)",
                      }}
                      className="transition-all  text-black hover:bg-black hover:text-white inter text-xs px-4 py-2 font-semibold rounded-3xl"
                      onClick={() => openModal(order)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedOrder && (
        <div className="mt-[100px] fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 p-4 relative z-60 h-[400px]">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black z-10"
              onClick={closeModal}
            >
              ✕
            </button>

            {/* Modal Title */}
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
              Order Details
            </h2>

            {/* Scrollable Content */}
            <div className="max-h-[250px] overflow-y-auto border-t border-gray-300 pt-4 space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-semibold">Name:</span> {selectedOrder.name}
                </div>
                <div>
                  <span className="font-semibold">Email:</span> {selectedOrder.email}
                </div>
                <div>
                  <span className="font-semibold">Phone:</span> {selectedOrder.phonenumber}
                </div>
                <div>
                  <span className="font-semibold">Agreement Type:</span> {selectedOrder.agreementtype}
                </div>
                <div>
                  <span className="font-semibold">EIP:</span> {selectedOrder.eip || "N/A"}
                </div>
                <div>
                  <span className="font-semibold">Promotion:</span> {selectedOrder.promotion}
                </div>
                <div>
                  <span className="font-semibold">Paperless:</span> {selectedOrder.paperless}
                </div>
                <div>
                  <span className="font-semibold">Special Instruction:</span> {selectedOrder.specialinstruction}
                </div>

                {/* Customer Data */}
                <div>
                  <span className="font-semibold">Business Legal Name:</span> {selectedOrder.customerId.businesslegalname}
                </div>
                <div>
                  <span className="font-semibold">Business Address:</span> {selectedOrder.customerId.businessaddress}
                </div>
                <div>
                  <span className="font-semibold">Business City:</span> {selectedOrder.customerId.businesscity}
                </div>
                <div>
                  <span className="font-semibold">Business State:</span> {selectedOrder.customerId.businessstate}
                </div>
                <div>
                  <span className="font-semibold">Business ZIP:</span> {selectedOrder.customerId.businesszip}
                </div>
                <div>
                  <span className="font-semibold">Tax ID:</span> {selectedOrder.customerId.taxid}
                </div>
                <div>
                  <span className="font-semibold">Contact Name:</span> {selectedOrder.customerId.contactname}
                </div>
                <div>
                  <span className="font-semibold">Contact Phone:</span> {selectedOrder.customerId.contactphone}
                </div>
                <div>
                  <span className="font-semibold">Contact Email:</span> {selectedOrder.customerId.contactemail}
                </div>
                <div>
                  <span className="font-semibold">Location ID:</span> {selectedOrder.customerId.locationid}
                </div>
                <div>
                  <span className="font-semibold">Bill to Mobile:</span> {selectedOrder.customerId.billtomobile}
                </div>
                <div>
                  <span className="font-semibold">Credit Card Payment:</span> {selectedOrder.customerId.creditcardpayment}
                </div>

                {/* Shipping Addresses */}
                {selectedOrder.shippingAddresses && selectedOrder.shippingAddresses.length > 0 ? (
                  selectedOrder.shippingAddresses.map((shippingAddress, index) => (
                    <div key={index}>
                      <h6>Shipping Addresses: </h6>
                      <div>
                        <span className="font-semibold">Attention Name:</span> {shippingAddress.attentionname}
                      </div>
                      <div>
                        <span className="font-semibold">Shipping Address:</span> {shippingAddress.shippingaddress}
                      </div>
                      <div>
                        <span className="font-semibold">Shipping City:</span> {shippingAddress.shippingcity}
                      </div>
                      <div>
                        <span className="font-semibold">Shipping State:</span> {shippingAddress.shippingstate}
                      </div>
                      <div>
                        <span className="font-semibold">Shipping ZIP:</span> {shippingAddress.shippingzip}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No shipping addresses available</p>
                )}

                {/* Carrier Infos */}
                {selectedOrder.carrierInfos && selectedOrder.carrierInfos.length > 0 ? (
                  selectedOrder.carrierInfos.map((carrierInfo, index) => (
                    <div key={index}>
                      <div>
                        <span className="font-semibold">Current Wireless Carrier:</span> {carrierInfo.currentwirelesscarrier}
                      </div>
                      <div>
                        <span className="font-semibold">Account Number:</span> {carrierInfo.accountnumber}
                      </div>
                      <div>
                        <span className="font-semibold">PIN or Password:</span> {carrierInfo.pinorpassword}
                      </div>
                      <div>
                        <span className="font-semibold">SSN or Tax ID:</span> {carrierInfo.ssnortaxid}
                      </div>
                      <div>
                        <span className="font-semibold">Billing Name:</span> {carrierInfo.billingname}
                      </div>
                      <div>
                        <span className="font-semibold">Billing Address:</span> {carrierInfo.billingaddress}
                      </div>
                      <div>
                        <span className="font-semibold">Billing City:</span> {carrierInfo.billingcity}
                      </div>
                      <div>
                        <span className="font-semibold">Billing State:</span> {carrierInfo.billingstate || "N/A"}
                      </div>
                      <div>
                        <span className="font-semibold">Billing ZIP:</span> {carrierInfo.billingzip}
                      </div>
                      <div>
                        <span className="font-semibold">Authorized Name:</span> {carrierInfo.authorizedname}
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No carrier information available.</div>
                )}

                {/* IMEI Numbers */}
                <div>
                  <span className="font-semibold">IMEI Numbers:</span>
                  {selectedOrder.imeiNumbers?.map((imei, index) => (
                    <span key={index}>{imei.imei}{index < selectedOrder.imeiNumbers.length - 1 && ", "}</span>
                  ))}
                </div>

                {/* Order Status */}
                <div>
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${selectedOrder.status === "Pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : selectedOrder.status === "Completed"
                        ? "bg-green-200 text-green-800"
                        : selectedOrder.status === "In Progress"
                          ? "bg-blue-200 text-blue-800"
                          : "text-black"
                      }`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Close Button at Bottom */}
            <div className="text-center mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Orders;
