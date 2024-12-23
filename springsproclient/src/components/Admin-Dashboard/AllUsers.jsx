import React, { useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // For decoding JWT
import { useNavigate } from "react-router-dom"; // Add this import
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Navbar from "./Navbar";
import './styles.css';

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // To handle errors
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");

    if (!token) {
      navigate("/login");
      return;
    }

    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;

    // Check if user has admin role
    if (userRole !== "admin") {
      setError("You do not have admin access");
      navigate("/");
      return;
    }

    // Fetching the users data if the user is an admin
    axios
      .get("http://localhost:8000/api/auth/get-users", {
        headers: {
          Authorization: `Bearer ${token}`,
          role: userRole,
        },
      })
      .then((response) => {
        setUsers(response.data.userData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError("Error fetching users");
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

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
              <h1 className="mt-4">Users List</h1>
              <div className="card mb-4">
                <div className="card-body">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        {/* <th>Actions</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user._id}>
                          <td>{user.fullName}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          {/* <td>
                            Add any actions here, like "Edit" or "Delete"
                          </td> */}
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

export default AllUsers;
