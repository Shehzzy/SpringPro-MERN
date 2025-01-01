import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is included
import './Sidebar.css'; // Include the CSS for the sidebar

function Sidebar() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to control sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarLinkClick = (e) => {
    e.stopPropagation(); // Prevent the click event from closing the sidebar
  };

  return (
    <div>
      {/* Sidebar for large screens */}
      <nav
        className={`sb-sidenav ${isSidebarOpen ? 'open' : ''}`}
        id="sidenavAccordion"
        style={{
          position: "fixed", // Fix sidebar to the left side
          top: "0", // Align with top of the page
          left: "0",
          zIndex: 1040, // Ensure the sidebar is under the navbar
        }}
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the sidebar from closing it
      >
        <div className="sb-sidenav-menu">
          <div className="nav">
            {/* Sidebar content */}
            <Link
              to="/admin-all-users"
              className="nav-link text-white"
              onClick={handleSidebarLinkClick}
            >
              View All Users
            </Link>
            <Link
              to="/admin-all-orders"
              className="nav-link text-white"
              onClick={handleSidebarLinkClick}
            >
              View All Orders
            </Link>

            {/* Logout Button */}
            <li className="nav-item">
              <a
                className="nav-link text-white"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  localStorage.removeItem("jwt_token");
                  navigate("/login");
                }}
              >
                Logout
              </a>
            </li>
          </div>
        </div>
      </nav>

      {/* Hamburger toggle for smaller screens */}
      <button
        className="btn btn-dark d-lg-none"
        onClick={toggleSidebar}
        style={{
          position: "fixed",
          top: "10px",
          right: "0",
          zIndex: 1060, // Ensure the button appears above other elements
          backgroundColor: "transparent",
        }}
      >
        {/* Use Font Awesome icons for hamburger and close */}
        <i className={`fas ${isSidebarOpen ? 'fa-times' : 'fa-bars'}`} style={{ fontSize: '24px', color: 'white' }}></i>
      </button>

      {/* Optional overlay for mobile view when sidebar is open */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar} // Close the sidebar when clicking on the overlay
          className="overlay"
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: -1, // Ensure the overlay is above the sidebar but below the navbar
          }}
        ></div>
      )}
    </div>
  );
}

export default Sidebar;
