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
        confirmButtonColor: "#41FDFE",
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

  const updatePartnerId = async (userId, isEnabled, currentPartnerId) => {
    const token = localStorage.getItem("jwt_token");

    // Prompt the admin to enter a new Partner ID
    const { value: newPartnerId } = await Swal.fire({
      title: "Update Partner ID",
      input: "text",
      inputLabel: "Enter New Partner ID",
      inputPlaceholder: currentPartnerId || "None", // Show current Partner ID if it exists
      showCancelButton: true,
      confirmButtonColor: "#41FDFE",
      cancelButtonColor: "#d33",
      confirmButtonText: "Update",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to enter a Partner ID!";
        }
      },
    });

    if (newPartnerId) {
      try {
        // Call the API to update the Partner ID while preserving the current status
        const response = await axios.put(
          "https://springprobackend-production.up.railway.app/api/auth/enable-disable-user",
          { userId, isEnabled, partnerId: newPartnerId }, // Pass the current isEnabled status
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        Swal.fire("Success", "Partner ID has been updated successfully!", "success");
        fetchUsers(); // Refresh the user list
      } catch (error) {
        Swal.fire("Error", "Failed to update Partner ID", "error");
        console.error("Error updating Partner ID:", error);
      }
    }
  };


  const toggleUserStatus = async (userId, currentStatus, existingPartnerId) => {
    const token = localStorage.getItem("jwt_token");

    // Confirmation dialog for enabling/disabling
    const confirmationMessage = currentStatus
      ? "Are you sure you want to disable this user?"
      : "Are you sure you want to enable this user?";

    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: confirmationMessage,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#41FDFE",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
      cancelButtonText: "Cancel",
    });

    if (!isConfirmed) {
      return; // Exit if the admin cancels the action
    }

    // If enabling a user
    if (!currentStatus) {
      // Check if the user already has a Partner ID
      if (existingPartnerId === "None" || !existingPartnerId) {
        // If partnerId is "None" or doesn't exist, prompt for Partner ID
        const { value: partnerId } = await Swal.fire({
          title: "Assign Partner ID",
          input: "text",
          inputLabel: "Enter Partner ID",
          inputPlaceholder: "Partner ID",
          showCancelButton: true,
          confirmButtonColor: "#41FDFE",
          cancelButtonColor: "#d33",
          confirmButtonText: "Enable User",
          cancelButtonText: "Cancel",
          inputValidator: (value) => {
            if (!value) {
              return "You need to enter a Partner ID!";
            }
          },
        });

        if (partnerId) {
          try {
            const response = await axios.put(
              "https://springprobackend-production.up.railway.app/api/auth/enable-disable-user",
              { userId, isEnabled: true, partnerId },
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
      } else {
        // If partnerId is already assigned, enable the user without asking for Partner ID
        try {
          const response = await axios.put(
            "https://springprobackend-production.up.railway.app/api/auth/enable-disable-user",
            { userId, isEnabled: true },
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
    } else {
      // Disable user directly (no partner ID needed)
      try {
        const response = await axios.put(
          "https://springprobackend-production.up.railway.app/api/auth/enable-disable-user",
          { userId, isEnabled: false },
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
      name: "Partner ID",
      selector: (row) => row.partnerId,
    },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`px-3 py-1 rounded-lg text-sm font-bold ${row.isEnabled
            ? "bg-green-200 text-green-800"
            : "bg-zinc-600 text-white"
            }`}
        >
          {row.isEnabled ? "Active" : "In-Active"}
        </span>
      ),
      sortable: true,
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex gap-1 py-1 md:flex-row flex-column justify-content-between">
          <button
            className={`btn rounded ${row.isEnabled ? "btn-danger" : "btn-success"} btn-sm`}
            onClick={() => toggleUserStatus(row._id, row.isEnabled, row.partnerId)}
          >
            {row.isEnabled ? "Disable" : "Enable"}
          </button>
          <button
            className=" bg-slate-500 py-2 px-2 rounded text-center no-underline text-white inter"
            onClick={() => updatePartnerId(row._id, row.isEnabled, row.partnerId)}
          >
            Edit Partner ID
          </button>
        </div>
      ),
    }


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