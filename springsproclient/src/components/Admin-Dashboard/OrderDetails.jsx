// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Navbar from "./Navbar";
// import Sidebar from "./Sidebar";
// import Footer from "./Footer";
// import { jwtDecode } from "jwt-decode";

// function OrderDetails() {
//   const { orderId } = useParams(); // Get the order ID from the URL
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const token = localStorage.getItem("jwt_token");
//   const decodedToken = jwtDecode(token);
//   const userRole = decodedToken.role;
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     if (userRole !== "admin") {
//       setError("You do not have admin access");
//       navigate("/");
//       return;
//     }

//     axios
//       .get(
//         `https://springprobackend-production.up.railway.app/api/order/get-single-order/${orderId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             role: userRole,
//           },
//         }
//       )
//       .then((response) => {
//         const orderData = response.data.order;
//         // Convert shippingAddresses to a Map if needed
//         orderData.shippingAddresses = new Map(Object.entries(orderData.shippingAddresses));
//         setOrder(orderData);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching order details:", error);
//         setError("Error fetching order details");
//         setLoading(false);
//       });
//   }, [orderId, token, navigate]);

//   if (loading)
//     return <div className="text-center mt-20 text-lg">Loading...</div>;
//   if (error)
//     return <div className="text-center mt-20 text-red-500">{error}</div>;

//   return (
//     <>
//       <Navbar />
//       <div id="layoutSidenav" className="flex">
//         <Sidebar />
//         <div id="layoutSidenav_content" className="flex-1">
//           <main className="p-6 bg-gray-100 min-h-screen">
//             < div className="container mx-auto">
//               <h1 className="text-2xl font-bold text-gray-700 mb-6">
//                 Order Details
//               </h1>
//               <div className="bg-white rounded-lg shadow-md p-6">
//                 <h2 className="text-xl font-bold mb-4 text-cyan-blue">
//                   Customer Information
//                 </h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                   <div>
//                     <strong>Name:</strong> {order.name || "N/A"}
//                   </div>
//                   <div>
//                     <strong>Email:</strong> {order.email || "N/A"}
//                   </div>
//                   <div>
//                     <strong>Phone Number:</strong> {order.phonenumber || "N/A"}
//                   </div>
//                   <div>
//                     <strong>Agent Code:</strong> {order.agentCode || "N/A"}
//                   </div>
//                   <div>
//                     <strong>Dealer Code:</strong> {order.dealerCode || "N/A"}
//                   </div>
//                   <div>
//                     <strong>Existing BAN:</strong> {order.existingBAN || "N/A"}
//                   </div>
//                   <div>
//                     <strong>Existing FAN:</strong> {order.existingFAN || "N/A"}
//                   </div>
//                 </div>

//                 <h2 className="text-xl font-bold my-6 text-cyan-blue">
//                   Order Information
//                 </h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                   <div>
//                     <strong>Agreement Type:</strong>{" "}
//                     {order.agreementtype || "N/A"}
//                   </div>
//                   <div>
//                     <strong>EIP:</strong> {order.eip || "N/A"}
//                   </div>
//                   <div>
//                     <strong>Promotion:</strong> {order.promotion || "N/A"}
//                   </div>
//                   <div>
//                     <strong>Paperless:</strong> {order.paperless || "N/A"}
//                   </div>
//                   <div>
//                     <strong>Special Instruction:</strong>{" "}
//                     {order.specialinstruction || "N/A"}
//                   </div>
//                   <div>
//                     <strong>Rate Plan:</strong> {order.ratePlan || "N/A"}
//                   </div>
//                   <div>
//                     <strong>Order Date:</strong>{" "}
//                     {new Date(order.createdAt).toLocaleDateString()}
//                   </div>
//                   <div>
//                     <strong>Status:</strong>{" "}
//                     <span
//                       className={`px-3 py-1 rounded-lg text-sm font-bold ${order.status === "Pending"
//                           ? "bg-yellow-200 text-yellow-800"
//                           : order.status === "Completed"
//                             ? "bg-green-200 text-green-800"
//                             : "bg-gray-200 text-gray-800"
//                         }`}
//                     >
//                       {order.status}
//                     </span>
//                   </div>
//                 </div>

//                 <h2 className="text-xl font-bold my-6 text-cyan-blue">
//                   Smartphone Details
//                 </h2>
//                 {order.smartphoneDetails ? (
//                   <ul className="list-disc pl-6">
//                     <li>
//                       <strong>Brand:</strong>{" "}
//                       {order.smartphoneDetails.brand || "N/A"}
//                     </li>
//                     <li>
//                       <strong>Model:</strong>{" "}
//                       {order.smartphoneDetails.model || "N/A"}
//                     </li>
//                     <li>
//                       <strong>Color:</strong>{" "}
//                       {order.smartphoneDetails.color || "N/A"}
//                     </li>
//                     <li>
//                       <strong>Size:</strong>{" "}
//                       {order.smartphoneDetails.size || "N/A"}
//                     </li>
//                   </ul>
//                 ) : (
//                   <p>No smartphone details available.</p>
//                 )}


//                 <h2 className="text-xl font-bold my-6 text-cyan-blue">
//                   Shipping Information
//                 </h2>
//                 <ul className="list-disc pl-6">
//                   <li>                     <strong>Name:</strong> {order.attentionname || "N/A"}
//                   </li>
//                   <li>
//                     <strong>Address:</strong> {order.shippingaddress || "N/A"}
//                   </li>
//                   <li>
//                     <strong>City:</strong> {order.shippingcity || "N/A"}
//                   </li>
//                   <li>
//                     <strong>State:</strong> {order.shippingstate || "N/A"}
//                   </li>
//                   <li>
//                     <strong>Zip:</strong> {order.shippingzip || "N/A"}
//                   </li>
//                 </ul>

//                 <h2 className="text-xl font-bold my-6 text-cyan-blue">
//                   IMEI Numbers and Shipping Addresses
//                 </h2>
//                 <ul className="list-disc pl-6">
//                   {order.imeiNumbers && order.imeiNumbers.length > 0 ? (
//                     order.imeiNumbers.map((imei, index) => {
//                       const shippingAddress = order.shippingAddresses.get(imei._id.toString()) || "N/A";
//                       return (
//                         <li key={index}>
//                           <strong>IMEI:</strong> {imei.imei} - <strong>Shipping Address:</strong> {shippingAddress}
//                         </li>
//                       );
//                     })
//                   ) : (
//                     <li>No IMEI numbers</li>
//                   )}
//                 </ul>

//                 <h2 className="text-xl my-6 text-cyan-blue font-bold">
//                   Phone Numbers and Shipping Addresses
//                 </h2>
//                 <ul className="list-disc pl-6">
//                   {order.phoneNumbers && order.phoneNumbers.length > 0 ? (
//                     order.phoneNumbers.map((phone, index) => {
//                       const shippingAddress = order.shippingAddresses.get(phone.phoneNumber) || "N/A";
//                       return (
//                         <li key={index}>
//                           <strong>Phone Number:</strong> {phone.phoneNumber} - <strong>Shipping Address:</strong> {shippingAddress}
//                         </li>
//                       );
//                     })
//                   ) : (
//                     <li>No phone numbers</li>
//                   )}
//                 </ul>

//                 <h2 className="text-xl font-bold my-6 text-cyan-blue">
//                   Account Information
//                 </h2>
//                 {order.accounts && order.accounts.length > 0 ? (
//                   <ul className="list-disc pl-6">
//                     {order.accounts.map((account, index) => (
//                       <li key={index}>
//                         <strong>Account Number:</strong> {account.accountNumber || "N/A"} - <strong>Port Out PIN:</strong> {account.portOutPin || "N/A"}
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p>No account information available.</p>
//                 )}

//                 <h2 className="text-xl font-bold my-6 text-cyan-blue">
//                   Carrier Information
//                 </h2>
//                 {order.carrierInfos && order.carrierInfos.length > 0 ? (
//                   order.carrierInfos.map((carrier, index) => (
//                     <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg">
//                       <h3 className="text-lg font-bold">Carrier #{index + 1}</h3>
//                       <ul className="list-disc pl-6">
//                         <li><strong>Carrier:</strong> {carrier.currentwirelesscarrier || "N/A"}</li>
//                         <li><strong>Account Number:</strong> {carrier.accountnumber || "N/A"}</li>
//                         <li><strong>PIN/Password:</strong> {carrier.pinorpassword || "N/A"}</li>
//                         <li><strong>SSN/Tax ID:</strong> {carrier.ssnortaxid || "N/A"}</li>
//                         <li><strong>Billing Name:</strong> {carrier.billingname || "N/A"}</li>
//                         <li><strong>Billing Address:</strong> {carrier.billingaddress || "N/A"}</li>
//                         <li><strong>City:</strong> {carrier.billingcity || "N/A"}</li>
//                         <li><strong>State:</strong> {carrier.billingstate || "N/A"}</li>
//                         <li><strong>Zip:</strong> {carrier.billingzip || "N/A"}</li>
//                         <li><strong>Authorized Name:</strong> {carrier.authorizedname || "N/A"}</li>
//                         <li><strong>Unique Code:</strong> {carrier.uniqueCode || "N/A"}</li>
//                       </ul>
//                     </div>
//                   ))
//                 ) : (
//                   <p>No carrier information available.</p>
//                 )}

//                 <h2 className="text-xl font-bold my-6 text-cyan-blue">
//                   Additional Information
//                 </h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                   <div><strong>Phone Model:</strong> {order.phonemodel || "N/A"}</div>
//                   <div><strong>IMEI Status:</strong> {order.imeistatus || "N/A"}</div>
//                   <div><strong>No Cracks:</strong> {order.noCracks || "N/A"}</div>
//                   <div><strong>Screen Defects:</strong> {order.screenDefects || "N/A"}</div>
//                   <div><strong>Factory Reset:</strong> {order.factoryReset || "N/A"}</div>
//                 </div>
//               </div>
//             </div>
//           </main>
//           <Footer />
//         </div>
//       </div>
//     </>
//   );
// }

// export default OrderDetails;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { jwtDecode } from "jwt-decode";

function OrderDetails() {
  const { orderId } = useParams(); // Get the order ID from the URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("jwt_token");
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (userRole !== "admin") {
      setError("You do not have admin access");
      navigate("/");
      return;
    }

    axios
      .get(
        `https://springprobackend-production.up.railway.app/api/order/get-single-order/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            role: userRole,
          },
        }
      )
      .then((response) => {
        const orderData = response.data.order;
        // No need to map shippingAddresses, they're embedded in the order object already
        setOrder(orderData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
        setError("Error fetching order details");
        setLoading(false);
      });
  }, [orderId, token, navigate]);

  if (loading)
    return <div className="text-center mt-20 text-lg">Loading...</div>;
  if (error)
    return <div className="text-center mt-20 text-red-500">{error}</div>;

  return (
    <>
      <Navbar />
      <div id="layoutSidenav" className="flex">
        <Sidebar />
        <div id="layoutSidenav_content" className="flex-1">
          <main className="p-6 bg-gray-100 min-h-screen">
            <div className="container mx-auto">
              <h1 className="text-2xl font-bold text-gray-700 mb-6">
                Order Details
              </h1>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4 text-cyan-blue">
                  Customer Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <strong>Name:</strong> {order.name || "N/A"}
                  </div>
                  <div>
                    <strong>Email:</strong> {order.email || "N/A"}
                  </div>
                  <div>
                    <strong>Phone Number:</strong> {order.phonenumber || "N/A"}
                  </div>
                  <div>
                    <strong>Agent Code:</strong> {order.agentCode || "N/A"}
                  </div>
                  <div>
                    <strong>Dealer Code:</strong> {order.dealerCode || "N/A"}
                  </div>
                  <div>
                    <strong>Existing BAN:</strong> {order.existingBAN || "N/A"}
                  </div>
                  <div>
                    <strong>Existing FAN:</strong> {order.existingFAN || "N/A"}
                  </div>
                </div>

                <h2 className="text-xl font-bold my-6 text-cyan-blue">
                  Order Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <strong>Agreement Type:</strong>{" "}
                    {order.agreementtype || "N/A"}
                  </div>
                  <div>
                    <strong>EIP:</strong> {order.eip || "N/A"}
                  </div>
                  <div>
                    <strong>Promotion:</strong> {order.promotion || "N/A"}
                  </div>
                  <div>
                    <strong>Paperless:</strong> {order.paperless || "N/A"}
                  </div>
                  <div>
                    <strong>Special Instruction:</strong>{" "}
                    {order.specialinstruction || "N/A"}
                  </div>
                  <div>
                    <strong>Rate Plan:</strong> {order.ratePlan || "N/A"}
                  </div>
                  <div>
                    <strong>Order Date:</strong>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                  <div>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`px-3 py-1 rounded-lg text-sm font-bold ${
                        order.status === "Pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : order.status === "Completed"
                          ? "bg-green-200 text-green-800"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Smartphone Details */}
                <h2 className="text-xl font-bold my-6 text-cyan-blue">
                  Smartphone Details
                </h2>
                {order.smartphoneDetails ? (
                  <ul className="list-disc pl-6">
                    <li>
                      <strong>Brand:</strong>{" "}
                      {order.smartphoneDetails.brand || "N/A"}
                    </li>
                    <li>
                      <strong>Model:</strong>{" "}
                      {order.smartphoneDetails.model || "N/A"}
                    </li>
                    <li>
                      <strong>Color:</strong>{" "}
                      {order.smartphoneDetails.color || "N/A"}
                    </li>
                    <li>
                      <strong>Size:</strong>{" "}
                      {order.smartphoneDetails.size || "N/A"}
                    </li>
                  </ul>
                ) : (
                  <p>No smartphone details available.</p>
                )}

                {/* IMEI and Phone Numbers with Shipping Addresses */}
                <h2 className="text-xl font-bold my-6 text-cyan-blue">
                  IMEI Numbers and Shipping Addresses
                </h2>
                <ul className="list-disc pl-6">
                  {order.imeiNumbers && order.imeiNumbers.length > 0 ? (
                    order.imeiNumbers.map((imei, index) => (
                      <li key={index}>
                        <strong>IMEI:</strong> {imei.imei} -{" "}
                        <strong>Shipping Address:</strong>{" "}
                        {imei.shippingAddress || "N/A"}
                      </li>
                    ))
                  ) : (
                    <li>No IMEI numbers</li>
                  )}
                </ul>

                <h2 className="text-xl my-6 text-cyan-blue font-bold">
                  Phone Numbers and Shipping Addresses
                </h2>
                <ul className="list-disc pl-6">
                  {order.phoneNumbers && order.phoneNumbers.length > 0 ? (
                    order.phoneNumbers.map((phone, index) => (
                      <li key={index}>
                        <strong>Phone Number:</strong> {phone.phoneNumber} -{" "}
                        <strong>Shipping Address:</strong>{" "}
                        {phone.shippingAddress || "N/A"}
                      </li>
                    ))
                  ) : (
                    <li>No phone numbers</li>
                  )}
                </ul>

                {/* Other Information */}
                <h2 className="text-xl font-bold my-6 text-cyan-blue">
                  Account Information
                </h2>
                {order.accounts && order.accounts.length > 0 ? (
                  <ul className="list-disc pl-6">
                    {order.accounts.map((account, index) => (
                      <li key={index}>
                        <strong>Account Number:</strong> {account.accountNumber} -{" "}
                        <strong>Port Out PIN:</strong> {account.portOutPin}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No account information available.</p>
                )}

                {/* Carrier Information */}
                <h2 className="text-xl font-bold my-6 text-cyan-blue">
                  Carrier Information
                </h2>
                {order.carrierInfos && order.carrierInfos.length > 0 ? (
                  order.carrierInfos.map((carrier, index) => (
                    <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg">
                      <h3 className="text-lg font-bold">Carrier #{index + 1}</h3>
                      <ul className="list-disc pl-6">
                        <li>
                          <strong>Carrier:</strong> {carrier.currentwirelesscarrier}
                        </li>
                        {/* More carrier details */}
                      </ul>
                    </div>
                  ))
                ) : (
                  <p>No carrier information available.</p>
                )}
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
