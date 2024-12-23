import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div id="layoutSidenav_nav">
      <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div className="sb-sidenav-menu">
          <div className="nav">
            {/* Sidebar content */}
            <Link to="/admin-all-users" className="nav-link">View All Users</Link>
            <Link to="/admin-all-orders" className="nav-link">View All Orders</Link>

            {/* Logout Button */}
            <li className="nav-item">
              <a
                className="nav-link"
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
    </div>
  );
}

export default Sidebar;
