// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {jwtDecode} from "jwt-decode"; // For decoding JWT
// import { useNavigate } from "react-router-dom"; // Add this import
// import Sidebar from "./Sidebar";
// import Footer from "./Footer";
// import Navbar from "./Navbar";
// import './styles.css';

// function AllOrders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null); // To handle errors
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("jwt_token");

//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     const decodedToken = jwtDecode(token);
//     const userRole = decodedToken.role;

//     // Check if user has admin role
//     if (userRole !== "admin") {
//       setError("You do not have admin access");
//       navigate("/");
//       return;
//     }

//     // Fetching the orders data if the user is an admin
//     axios
//       .get("http://localhost:8000/api/order/get-orders", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           role: userRole,
//         },
//       })
//       .then((response) => {
//         setOrders(response.data.orderData);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching orders:", error);
//         setError("Error fetching orders");
//         setLoading(false);
//       });
//   }, [navigate]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <>
//       <Navbar />
//       <div id="layoutSidenav">
//         <Sidebar />
//         <div id="layoutSidenav_content">
//           <main>
//             <div className="container-fluid px-4">
//               <h1 className="mt-4">Orders List</h1>
//               <div className="card mb-4">
//                 <div className="card-body">
//                   <table className="table table-bordered">
//                     <thead>
//                       <tr>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Phone Number</th>
//                         <th>Status</th>
//                         <th>Order Date</th>
//                         <th>Shipping Address</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {orders.map((order) => (
//                         <tr key={order._id}>
//                           <td>{order.name}</td>
//                           <td>{order.email}</td>
//                           <td>{order.phonenumber}</td>
//                           <td>{order.status}</td>
//                           <td>{new Date(order.createdAt).toLocaleDateString()}</td>
//                           <td>{order.shippingaddress}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </main>
//           <Footer />
//         </div>
//       </div>
//     </>
//   );
// }

// export default AllOrders;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Navbar from "./Navbar";
import './styles.css';

function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");

    if (!token) {
      navigate("/login");
      return;
    }

    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;

    if (userRole !== "admin") {
      setError("You do not have admin access");
      navigate("/");
      return;
    }

    axios
      .get("http://localhost:8000/api/order/get-orders", {
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
        `http://localhost:8000/api/order/update-order-status/${orderId}`,
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
            <div className="container-fluid px-4">
              <h1 className="mt-4">Orders List</h1>
              <div className="card mb-4">
                <div className="card-body">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Status</th>
                        <th>Order Date</th>
                        <th>Shipping Address</th>
                        <th>Update Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td>{order.name}</td>
                          <td>{order.email}</td>
                          <td>{order.phonenumber}</td>
                          <td>{order.status}</td>
                          <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                          <td>{order.shippingaddress}</td>
                          <td>
                            <select
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                            >
                              <option value="Pending">Pending</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

