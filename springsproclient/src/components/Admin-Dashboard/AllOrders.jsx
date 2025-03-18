
import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Navbar from "./Navbar";
import DataTable from "react-data-table-component";
import "./styles.css";
import HashLoader from "react-spinners/HashLoader";
import Swal from "sweetalert2";

function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const navigate = useNavigate();
  const token = localStorage.getItem("jwt_token");
  let userRole;
  if (token) {
    const decodedToken = jwtDecode(token);
    userRole = decodedToken.role;
  }

  useEffect(() => {
   if (!token) {
        Swal.fire({
          title: "Login Required",
          text: "You need to log in first to access this page.",
          icon: "warning",
          confirmButtonColor: "#41FDFE",
          // confirmButtonText: "Go to Login",
        }).then(() => {
          navigate("/login");
        });
        return;
      }

    
    if (userRole !== "admin") {
      setError("You do not have admin access");
      navigate("/");
      return;
    }

    axios
      .get("https://springairnsbackend-production.up.railway.app/api/order/get-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
          role: userRole,
        },
        params: {
          page: currentPage,
          limit: pageSize,
        },
      })
      .then((response) => {
        console.log(response.data.orderData); // Log the order data
        setOrders(response.data.orderData);
        setTotalRows(response.data.totalRows);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setError("Error fetching orders");
        setLoading(false);
      });
  }, [navigate, token, userRole, currentPage]);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.fname === undefined && row.userId?.fname && row.userId?.lname 
      ? row.userId.fname + " " + row.userId.lname 
      : 'User',

      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.userId.email,
      sortable: true,
    },
    // {
    //   name: "IMEI Numbers",
    //   selector: (row) =>
    //     row.accounts && row.accounts.length > 0
    //       ? row.accounts.map((account) => account.imei != null || '' || undefined ? account.imei : 'N/A')// Access imei from each account
    //       : "No IMEI numbers",
    // },
    {
      name: "Date",
      selector: (row) => new Date(row.createdAt).toLocaleString(),
      sortable: true,
    },
    {
      name: "Order Status",
      selector: (row) => row.status,
      cell: (row) => <span style={getStatusStyle(row.status)}>{row.status}</span>,
      sortable: true,
    },
    {
      name: "Update Status",
      cell: (row) => (
        <select
          value={row.status}
          onChange={(e) => updateOrderStatus(row._id, e.target.value)}
          className="form-control select-admin-status inter"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex gap-1 py-1 md:flex-row flex-column justify-content-between">
          <button
            onClick={() => handleAddComment(row._id)}
            className=" bg-slate-500 py-2 px-2 rounded text-center no-underline text-white inter"
          >
            Add Comment
          </button>
          <Link
            to={`/single-order-details/${row._id}`}
            className=" bg-sky-600 py-2 px-2 rounded text-center no-underline text-white inter"
          >
            View Details
          </Link>
        </div>
      ),
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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

  const updateOrderNotes = (orderId, notes) => {
    const token = localStorage.getItem("jwt_token");

    axios
      .put(
        `https://springairnsbackend-production.up.railway.app/api/order/update-order-notes/${orderId}`,
        { notes },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            role: userRole,
          },
        }
      )
      .then(() => {
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

  const updateOrderStatus = (orderId, newStatus) => {
    const token = localStorage.getItem("jwt_token");

    axios
      .put(
        `https://springairnsbackend-production.up.railway.app/api/order/update-order-status/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            role: userRole,
          },
        }
      )
      .then(() => {
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
        return { backgroundColor: "#f1c40f", color: "white", width: '150px', textAlign: 'center', fontSize: '16px', padding: '9px', borderRadius: '6px'};
      case "In Progress":
        return { backgroundColor: "#e67e22", color: "white", width: '150px', textAlign: 'center', fontSize: '16px', padding: '9px', borderRadius: '6px'};
      case "Completed":
        return { backgroundColor: "#2ecc71", color: "white", width: '150px', textAlign: 'center', fontSize: '16px', padding: '9px', borderRadius: '6px'};
      default:
        return {};
    }
  };

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
      <div id="layoutSidenav">
        <Sidebar />
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4 md-4" style={{ marginTop: "50px" }}>
              <h1 className="mt-4 h3 text-center text-gray-800 mb-4">Orders List</h1>
              <div className="card mb-4">
                <div className="card-body">
                  <DataTable
                    columns={columns}
                    data={orders}
                    pagination
                    paginationPerPage={pageSize}
                    paginationTotalRows={totalRows}
                    onChangePage={handlePageChange}
                    highlightOnHover
                    striped
                    responsive
                    progressPending={loading}
                    fixedHeader
                    customStyles={{
                      table: {
                        style: {
                          tableLayout: 'fixed',
                          width: '100%',
                        }
                      },
                      cells: {
                        style: {
                          maxWidth: '200px',
                          wordWrap: 'break-word',
                        }
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </main>
          {/* <Footer /> */}
        </div>
      </div>

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
