// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// function Sidebar() {
//   const navigate = useNavigate();

//   return (
//     <div id="layoutSidenav_nav">
//       <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
//         <div className="sb-sidenav-menu">
//           <div className="nav">
//             {/* Sidebar content */}
//             <Link to="/admin-all-users" className="nav-link">View All Users</Link>
//             <Link to="/admin-all-orders" className="nav-link">View All Orders</Link>

//             {/* Logout Button */}
//             <li className="nav-item">
//               <a
//                 className="nav-link"
//                 style={{ cursor: "pointer" }}
//                 onClick={() => {
//                   localStorage.removeItem("jwt_token");
//                   navigate("/login");
//                 }}
//               >
//                 Logout
//               </a>
//             </li>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// }

// export default Sidebar;



import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to control sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div id="layoutSidenav_nav">
      <nav
        className={`sb-sidenav accordion sb-sidenav-dark ${isSidebarOpen ? 'd-block' : 'd-none'} d-lg-block`}
        id="sidenavAccordion"
      >
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

      {/* Hamburger toggle for smaller screens */}
      <button
        className="btn btn-dark d-lg-none"
        onClick={toggleSidebar}
        style={{ position: "fixed", top: "10px", left: "10px", zIndex: 1050 }}
      >
        {isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
      </button>
    </div>
  );
}

export default Sidebar;
