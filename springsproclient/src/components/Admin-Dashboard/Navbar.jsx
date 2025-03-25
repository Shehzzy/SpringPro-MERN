import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Springairns
        </Link>
        <div
          className={`navbar-collapse ${isOpen ? "show" : ""}`} // Toggle the "show" class based on isOpen state
          id="navbarNav"
        >
          {/* No navbar items */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
