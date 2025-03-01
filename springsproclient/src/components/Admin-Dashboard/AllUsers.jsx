import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Correct import
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is included
import "./styles.css"; // Include your custom styles
import HashLoader from "react-spinners/HashLoader";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component"; // Import DataTable

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");

    if (!token) {
      Swal.fire({
        title: "Login Required",
        text: "You need to log in first to place an order.",
        icon: "warning",
        confirmButtonText: "Go to Login",
      }).then(() => {
        navigate("/login");
      });
      return;
    }

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
      .get("https://springprobackend-production.up.railway.app/api/auth/get-users", {
        headers: {
          Authorization: `Bearer ${token}`,
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

  const columns = [
    {
      name: "Name",
      selector: (row) => row.fullname !== undefined ? row.fullname : `${row.fname || 'User'} ${row.lname || ''}`,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Company Name",
      selector: (row) => row.companyname != null ? row.companyname : "N/A",
    },
    {
      name: "Phone Number",
      selector: (row) => row.phone != null ? row.phone : "N/A",
    },
    {
      name: "Date of Birth",
      selector: (row) => row.dob != null ? row.dob : "N/A",
    },
    {
      name: "SSN",
      selector: (row) => row.ssn != null ? row.ssn : "N/A",
    },
    {
      name: "TAX ID",
      selector: (row) => row.tax_id != null ? row.tax_id : "N/A",
    },
    {
      name: "Gov ID",
      selector: (row) => row.government_identification != null ? row.government_identification : "N/A",
    },
    {
      name: "Role",
      selector: (row) => row.role,
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <HashLoader color="#002441" />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Navbar />
      <div id="layoutSidenav" className="d-flex">
        <Sidebar />
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-sm-2 px-md-4" style={{ marginTop: "50px" }}>
              <h1 className="mt-4 h3">All Users</h1>
              <div className="card mb-4">
                <div className="card-body">
                  <div className="table-responsive">
                    <DataTable
                      columns={columns}
                      data={users}
                      pagination
                      highlightOnHover
                      striped
                      responsive
                    />
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

export default AllUsers;
