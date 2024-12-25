import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Orders() {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt_token");
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // For modal data
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const apiUrl = "http://localhost:8000/api/order/get-user-orders";

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

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
                    className={`px-3 py-1 rounded-full text-sm ${
                      order.status === "Pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : order.status === "Completed"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
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
                    background: "linear-gradient(90deg, rgba(65 ,253 ,254) 0%, rgba(0,210,255,1) 100%)"
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
            <span className="font-semibold">Name:</span>{" "}
            {selectedOrder.name}
          </div>
          <div>
            <span className="font-semibold">Email:</span>{" "}
            {selectedOrder.email}
          </div>
          <div>
            <span className="font-semibold">Phone:</span>{" "}
            {selectedOrder.phonenumber}
          </div>
          <div>
            <span className="font-semibold">Agreement Type:</span>{" "}
            {selectedOrder.agreementtype}
          </div>
          <div>
            <span className="font-semibold">EIP:</span>{" "}
            {selectedOrder.eip}
          </div>
          <div>
            <span className="font-semibold">Promotion:</span>{" "}
            {selectedOrder.promotion}
          </div>
          <div>
            <span className="font-semibold">Paperless:</span>{" "}
            {selectedOrder.paperless}
          </div>
          <div>
            <span className="font-semibold">Special Instruction:</span>{" "}
            {selectedOrder.specialinstruction}
          </div>
          <div>
            <span className="font-semibold">Business Legal Name:</span>{" "}
            {selectedOrder.businesslegalname}
          </div>
          <div>
            <span className="font-semibold">Business Address:</span>{" "}
            {selectedOrder.businessaddress}
          </div>
          <div>
            <span className="font-semibold">Business City:</span>{" "}
            {selectedOrder.businesscity}
          </div>
          <div>
            <span className="font-semibold">Business State:</span>{" "}
            {selectedOrder.businessstate}
          </div>
          <div>
            <span className="font-semibold">Business ZIP:</span>{" "}
            {selectedOrder.businesszip}
          </div>
          <div>
            <span className="font-semibold">Tax ID:</span>{" "}
            {selectedOrder.taxid}
          </div>
          <div>
            <span className="font-semibold">Contact Name:</span>{" "}
            {selectedOrder.contactname}
          </div>
          <div>
            <span className="font-semibold">Contact Phone:</span>{" "}
            {selectedOrder.contactphone}
          </div>
          <div>
            <span className="font-semibold">Contact Email:</span>{" "}
            {selectedOrder.contactemail}
          </div>
          <div>
            <span className="font-semibold">Location ID:</span>{" "}
            {selectedOrder.locationid}
          </div>
          <div>
            <span className="font-semibold">Bill to Mobile:</span>{" "}
            {selectedOrder.billtomobile}
          </div>
          <div>
            <span className="font-semibold">Credit Card Payment:</span>{" "}
            {selectedOrder.creditcardpayment}
          </div>
          <div>
            <span className="font-semibold">
              Single or Multi Address Shipment:
            </span>{" "}
            {selectedOrder.singleormultiaddresshipment}
          </div>
          <div>
            <span className="font-semibold">Attention Name:</span>{" "}
            {selectedOrder.attentionname}
          </div>
          <div>
            <span className="font-semibold">Shipping Address:</span>{" "}
            {selectedOrder.shippingaddress}
          </div>
          <div>
            <span className="font-semibold">Shipping City:</span>{" "}
            {selectedOrder.shippingcity}
          </div>
          <div>
            <span className="font-semibold">Shipping State:</span>{" "}
            {selectedOrder.shippingstate}
          </div>
          <div>
            <span className="font-semibold">Shipping ZIP:</span>{" "}
            {selectedOrder.shippingzip}
          </div>
          <div>
            <span className="font-semibold">Current Wireless Carrier:</span>{" "}
            {selectedOrder.currentwirelesscarrier}
          </div>
          <div>
            <span className="font-semibold">Account Number:</span>{" "}
            {selectedOrder.accountnumber}
          </div>
          <div>
            <span className="font-semibold">PIN or Password:</span>{" "}
            {selectedOrder.pinorpassword}
          </div>
          <div>
            <span className="font-semibold">SSN or Tax ID:</span>{" "}
            {selectedOrder.ssnortaxid}
          </div>
          <div>
            <span className="font-semibold">Billing Name:</span>{" "}
            {selectedOrder.billingname}
          </div>
          <div>
            <span className="font-semibold">Billing Address:</span>{" "}
            {selectedOrder.billingaddress}
          </div>
          <div>
            <span className="font-semibold">Billing City:</span>{" "}
            {selectedOrder.billingcity}
          </div>
          <div>
            <span className="font-semibold">Billing State:</span>{" "}
            {selectedOrder.billingstate || "N/A"}
          </div>
          <div>
            <span className="font-semibold">Billing ZIP:</span>{" "}
            {selectedOrder.billingzip}
          </div>
          <div>
            <span className="font-semibold">Authorized Name:</span>{" "}
            {selectedOrder.authorizedname}
          </div>
          <div>
            <span className="font-semibold">IMEI Numbers:</span>{" "}
            {selectedOrder.imeiNumbers
              ?.map((imei) => imei.imei)
              .join(", ")}
          </div>
          <div>
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                selectedOrder.status === "Pending"
                  ? "bg-yellow-200 text-yellow-800"
                  : selectedOrder.status === "Completed"
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
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
