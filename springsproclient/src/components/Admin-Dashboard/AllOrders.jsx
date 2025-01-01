import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "./styles.css";

function AllOrders() {
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
      .get("https://springprobackend-production.up.railway.app/api/order/get-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
          role: userRole,
        },
      })
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
            <div className="container-fluid px-4 md-4"  style={{ marginTop: "50px" }}>
              <h1 className="mt-4 h3">Orders List</h1>
              <div className="card mb-4">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                      <thead className="thead-dark">
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone Number</th>
                          <th>IMEI Numbers</th>
                          <th>Order Date</th>
                          <th>Shipping Address</th>
                          <th>Status</th>
                          <th>Update Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders && orders.length > 0 ? (
                          orders.map((order) => (
                            <tr key={order._id}>
                              <td>{order.name}</td>
                              <td>{order.email}</td>
                              <td>{order.phonenumber}</td>
                              <td>
                                {order.imeiNumbers && order.imeiNumbers.length > 0 ? (
                                  order.imeiNumbers
                                    .map((imei) => imei.imei)
                                    .join(", ")
                                ) : (
                                  <span>No IMEI numbers</span>
                                )}
                              </td>
                              <td>
                                {new Date(order.createdAt).toLocaleDateString()}
                              </td>
                              <td>{order.shippingaddress}</td>
                              <td>
                                <span
                                  style={getStatusStyle(order.status)}
                                  className="badge"
                                >
                                  {order.status}
                                </span>
                              </td>
                              <td>
                                <select
                                  value={order.status}
                                  onChange={(e) =>
                                    updateOrderStatus(order._id, e.target.value)
                                  }
                                  className="form-control"
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="In Progress">In Progress</option>
                                  <option value="Completed">Completed</option>
                                </select>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="8" style={{ textAlign: "center" }}>
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
    </>
  );
}

export default AllOrders;
