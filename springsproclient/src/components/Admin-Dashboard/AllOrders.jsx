import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "./styles.css";

function AllOrders() {
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [comment, setComment] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt_token");
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;

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
        "https://springprobackend-production.up.railway.app/api/order/get-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            role: userRole,
          },
        }
      )
      .then((response) => {
        setOrders(response.data.orderData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setError("Error fetching orders");
        setLoading(false);
      });
  }, [navigate]);

  const handleAddComment = (orderId) => {
    setSelectedOrderId(orderId);
    setShowModal(true);
  };

  const handleSaveComment = () => {
    if (comment) {
      updateOrderNotes(selectedOrderId, comment);
      setComment("");
      setShowModal(false);
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const token = localStorage.getItem("jwt_token");

    axios
      .put(
        `https://springprobackend-production.up.railway.app/api/order/update-order-status/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            role: userRole,
          },
        }
      )
      .then((response) => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      })
      .catch((error) => {
        console.error("Error updating order status:", error);
        setError("Error updating order status");
      });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return { backgroundColor: "#f1c40f", color: "white" }; // Yellow
      case "In Progress":
        return { backgroundColor: "#e67e22", color: "white" }; // Orange
      case "Completed":
        return { backgroundColor: "#2ecc71", color: "white" }; // Green
      default:
        return {};
    }
  };

  const handleFileUpload = (orderId, file) => {
    const token = localStorage.getItem("jwt_token");
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(
        `https://springprobackend-production.up.railway.app/api/order/upload-file/${orderId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            role: userRole,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        alert("File uploaded successfully");
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        setError("Error uploading file");
      });
  };

  const updateOrderNotes = (orderId, notes) => {
    const token = localStorage.getItem("jwt_token");

    axios
      .put(
        `https://springprobackend-production.up.railway.app/api/order/update-order-notes/${orderId}`,
        { notes },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            role: userRole,
          },
        }
      )
      .then((response) => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, notes } : order
          )
        );
      })
      .catch((error) => {
        console.error("Error updating notes:", error);
        setError("Error updating notes");
      });
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Navbar />
      <div id="layoutSidenav">
        <Sidebar />
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4 md-4" style={{ marginTop: "50px" }}>
              <h1 className="mt-4 h3 text-center text-gray-800 mb-4">Orders List</h1>
              <div className="card mb-4">
                <div className="card-body">
                  {/* Scrollable container */}
                  <div className="table-responsive overflow-x-auto">
                    <table className="table table-striped table-bordered">
                      <thead className="thead-dark">
                        <tr>
                          <th className="px-3 py-2">Name</th>
                          <th className="px-3 py-2">Email</th>
                          <th className="px-3 py-2">IMEI Numbers</th>
                          <th className="px-3 py-2">Order Date</th>
                          <th className="px-3 py-2">Status</th>
                          <th className="px-3 py-2">Update Status</th>
                          <th className="px-3 py-2" style={{ width: "250px" }}>
                            Notes
                          </th>
                          <th className="px-3 py-2" style={{ width: "250px" }}>
                            File Attachment
                          </th>
                          <th className="px-3 py-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders && orders.length > 0 ? (
                          orders.map((order) => (
                            <tr key={order._id} className="align-middle">
                              <td className="px-3 py-2" style={{ width: "150px" }}>{order.name}</td> {/* Adjust width */}
                              <td className="px-3 py-2" style={{ width: "180px" }}>{order.email}</td> {/* Adjust width */}
                              <td className="px-3 py-2" style={{ width: "200px" }}>
                                {order.imeiNumbers && order.imeiNumbers.length > 0 ? (
                                  order.imeiNumbers.map((imei) => imei.imei).join(", ")
                                ) : (
                                  <span>No IMEI numbers</span>
                                )}
                              </td>
                              <td className="px-3 py-2" style={{ width: "180px" }}>
                                {new Date(order.createdAt).toLocaleString()}
                              </td>
                              <td className="px-3 py-2" style={{ width: "120px" }}>
                                <span style={getStatusStyle(order.status)} className="badge">
                                  {order.status}
                                </span>
                              </td>
                              <td className="px-3 py-2" style={{ width: "150px" }}> {/* Reduced width */}
                                <select
                                  value={order.status}
                                  onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                  className="form-control select-admin-status"
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="In Progress">In Progress</option>
                                  <option value="Completed">Completed</option>
                                </select>
                              </td>
                              <td className="px-3 py-2" style={{ width: "250px" }}>
                                <button
                                  onClick={() => handleAddComment(order._id)}
                                  className="btn btn-secondary btn-sm"
                                >
                                  Add Comment
                                </button>
                              </td>
                              <td className="px-3 py-2" style={{ width: "250px" }}>
                                <div className="d-flex flex-column">
                                  <input
                                    type="file"
                                    className="form-control mb-2"
                                    onChange={(e) => handleFileUpload(order._id, e.target.files[0])}
                                  />
                                  <small className="text-muted">Max size: 5MB</small>
                                </div>
                              </td>
                              <td className="px-3 py-2" style={{ width: "150px" }}>
                                <Link
                                  to={`/single-order-details/${order._id}`}
                                  className="btn btn-primary text-white btn-sm w-100"
                                >
                                  View Details
                                </Link>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="9" className="text-center">
                              No orders found.
                            </td>
                          </tr>
                        )}
                      </tbody>

                    </table>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>

      {/* Modal for adding comment */}
      {showModal && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Comment</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowModal(false)}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <textarea
                  placeholder="Add your comment here..."
                  rows="4"
                  className="form-control"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveComment}
                >
                  Save Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>

  );
}

export default AllOrders;

