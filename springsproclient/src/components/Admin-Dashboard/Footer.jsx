// // src/components/Footer.js
// import React from "react";

// function Footer() {
//   return (
//     <footer className="py-4 bg-light mt-auto">
//       <div className="container-fluid px-4">
//         <div className="d-flex align-items-center justify-content-between small">
//           <div className="text-muted">Copyright &copy; Your Website 2023</div>
//           <div>
//             <a href="#">Privacy Policy</a>
//             &middot;
//             <a href="#">Terms & Conditions</a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;

import React from "react";

function Footer() {
  return (
    <footer className="py-4 bg-light mt-auto">
      <div className="container-fluid px-4">
        <div className="d-flex align-items-center justify-content-between small flex-column flex-sm-row">
          <div className="text-muted mb-2 mb-sm-0">Copyright &copy; Your Website 2023</div>
          <div>
            <a href="#" className="me-2">Privacy Policy</a>
            &middot;
            <a href="#" className="ms-2">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
