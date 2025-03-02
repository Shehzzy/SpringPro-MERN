import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import HashLoader from "react-spinners/HashLoader";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";

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
        text: "You need to log in first to access this page.",
        icon: "warning",
        confirmButtonText: "Go to Login",
      }).then(() => {
        navigate("/login");
      });
      return;
    }

    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;

    if (userRole !== "admin") {
      setError("You do not have admin access");
      navigate("/");
      return;
    }

    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("jwt_token");
      const response = await axios.get(
        "https://springprobackend-production.up.railway.app/api/auth/get-users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data.userData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Error fetching users");
      setLoading(false);
    }
  };

  // Function to enable/disable user
  const toggleUserStatus = async (userId, currentStatus) => {
    const token = localStorage.getItem("jwt_token");

    Swal.fire({
      title: `Are you sure?`,
      text: `Do you want to ${currentStatus ? "disable" : "enable"} this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#41FDFE",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${currentStatus ? "disable" : "enable"}!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.put(
            "https://springprobackend-production.up.railway.app/api/auth/enable-disable-user",
            { userId, isEnabled: !currentStatus },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          Swal.fire("Success", response.data.message, "success");
          fetchUsers(); // Refresh user list
        } catch (error) {
          Swal.fire("Error", "Failed to update user status", "error");
          console.error("Error updating user status:", error);
        }
      }
    });
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.fullname || `${row.fname || "User"} ${row.lname || ""}`,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Company Name",
      selector: (row) => row.companyname || "N/A",
    },
    {
      name: "Role",
      selector: (row) => row.role,
    },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`px-3 py-1 rounded-lg text-sm font-bold ${
            row.isEnabled
              ? "bg-green-200 text-green-800"  // Light green for enabled
              : "bg-zinc-600 text-white"      // Light red for disabled
          }`}
        >
          {row.isEnabled ? "Active" : "In-Active"}
        </span>
      ),
      sortable: true,
    }
,    
    
    {
      name: "Actions",
      cell: (row) => (
        <button
          className={`btn ${row.isEnabled ? "btn-danger" : "btn-success"} btn-sm`}
          onClick={() => toggleUserStatus(row._id, row.isEnabled)}
        >
          {row.isEnabled ? "Disable" : "Enable"}
        </button>
      ),
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
