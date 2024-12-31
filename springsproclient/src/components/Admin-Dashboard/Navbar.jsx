// import React from "react";

// function Navbar() {
//   return (
//     <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
//       <a className="navbar-brand ps-3" href="#">SpringPro</a>
//     </nav>
//   );
// }

// export default Navbar;


import React from "react";

function Navbar() {
  return (
    <nav className="sb-topnav navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand ps-3" href="#">SpringPro</a>
      <button 
        className="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Features</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Pricing</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">About</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
