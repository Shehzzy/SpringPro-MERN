import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Keep the Bootstrap CSS

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
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        {/* <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarNav"
          aria-expanded={isOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button> */}
        {/* Empty navbar (no items inside) */}
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
