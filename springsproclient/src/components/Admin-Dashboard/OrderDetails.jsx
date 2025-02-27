

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { jwtDecode } from "jwt-decode";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import HashLoader from "react-spinners/HashLoader";
import Swal from "sweetalert2";

function OrderDetails() {
  const { orderId } = useParams(); // Get the order ID from the URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("jwt_token");

  // Decode the JWT token
  const decodedToken = token ? jwtDecode(token) : null;
  const userRole = decodedToken ? decodedToken.role : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      Swal.fire({
        title: "Login Required",
        text: "You need to log in first to place an order.",
        icon: "warning",
        confirmButtonText: "Go to Login",
      }).then(() => {
        navigate("/login");
      });
      return;
    }

    try {
      const decoded = jwtDecode(token); // Decode the JWT
      const currentTime = Date.now() / 1000; // Current time in seconds
      // Check if the token has expired
      if (decoded.exp && decoded.exp < currentTime) {
        Swal.fire({
          title: "Session Expired",
          text: "Your session has expired. Please log in again.",
          icon: "warning",
          confirmButtonText: "Go to Login",
        }).then(() => {
          navigate("/login");
        });
        return;
      }
    } catch (error) {
      Swal.fire({
        title: "Invalid Token",
        text: "The token is invalid. Please log in again.",
        icon: "error",
        confirmButtonText: "Go to Login",
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
        console.log(response.data.order);
        setOrder(response.data.order);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
        setError("Error fetching order details");
        setLoading(false);
      });
  }, [orderId, token, navigate, userRole]);

  const exportToExcel = async () => {
    try {
      if (!order) {
        alert("No order data available");
        return;
      }

      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Order Details");

      // Column Configuration
      sheet.columns = [
        { header: "Field", key: "field", width: 25 },
        { header: "Values", key: "values", width: 50 },
      ];

      // Styling
      const blackBorder = { argb: "FF000000" };
      const borderStyle = {
        top: { style: "medium", color: blackBorder },
        bottom: { style: "medium", color: blackBorder },
        left: { style: "medium", color: blackBorder },
        right: { style: "medium", color: blackBorder },
      };

      // Header Styling
      sheet.getRow(1).eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FF00B4D8" },
        };
        cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
        cell.border = borderStyle;
        cell.alignment = { vertical: "middle", horizontal: "center" };
      });

      // Data Population
      const data = [
        { field: "Customer Name", values: order.customerId?.businesslegalname || "N/A" },
        { field: "Email", values: order.customerId?.contactemail || "N/A" },
        { field: "Phone Number", values: order.customerId?.contactphone || "N/A" },
        { field: "SANS Partner ID", values: order.sansPartnerID || "N/A" },
        { field: "Agreement Type", values: order.agreementtype || "N/A" },
        { field: "AT&T Account", values: order.atntaccount || "N/A" },
        { field: "Existing BAN", values: order.existingBAN || "N/A" },
        // { field: "Existing FAN", values: order.existingFAN || "N/A" },
        { field: "Company Name", values: order.userId.companyname || "N/A" },
        { field: "EIP", values: order.eip || "N/A" },
        { field: "Phone Model", values: order.phonemodel || "N/A" },
        { field: "IMEI Status", values: order.imeistatus || "N/A" },
        { field: "No Cracks", values: order.noCracks || "N/A" },
        { field: "Screen Defects", values: order.screenDefects || "N/A" },
        { field: "Factory Reset", values: order.factoryReset || "N/A" },
        { field: "Paperless", values: order.paperless || "N/A" },
        { field: "Special Instruction", values: order.specialinstruction || "N/A" },
        { field: "Rate Plan", values: order.ratePlan || "N/A" },
        { field: "Order Date", values: new Date(order.createdAt).toLocaleDateString("en-US") },
        { field: "Status", values: order.status || "N/A" },
        { field: "IMEI Number", values: order.imeiNumbers.map((imei) => imei.imei).join(", ") || "N/A" },
        { field: "Port Out PIN", values: order.accounts.map((acc) => acc.portOutPin).join(", ") || "N/A" },
        { field: "Attention Name", values: order.shippingAddresses.map((addr) => addr.attentionname).join(", ") || "N/A" },
        { field: "Shipping Address", values: order.shippingAddresses.map((addr) => addr.shippingaddress).join(", ") || "N/A" },
        { field: "City", values: order.shippingAddresses.map((addr) => addr.shippingcity).join(", ") || "N/A" },
        { field: "State", values: order.shippingAddresses.map((addr) => addr.shippingstate).join(", ") || "N/A" },
        { field: "Zip", values: order.shippingAddresses.map((addr) => addr.shippingzip).join(", ") || "N/A" },
        { field: "Account Number", values: order.accounts.map((acc) => acc.accountNumber).join(", ") || "N/A" },
        { field: "Current Wireless Carrier", values: order.carrierInfos.map((carrier) => carrier.currentwirelesscarrier).join(", ") || "N/A" },
        { field: "Pin Or Password", values: order.carrierInfos.map((carrier) => carrier.pinorpassword).join(", ") || "N/A" },
        { field: "SSN or Tax ID", values: order.carrierInfos.map((carrier) => carrier.ssnortaxid).join(", ") || "N/A" },
        { field: "Billing Name", values: order.carrierInfos.map((carrier) => carrier.billingname).join(", ") || "N/A" },
        { field: "Billing Address", values: order.carrierInfos.map((carrier) => carrier.billingaddress).join(", ") || "N/A" },
        { field: "Billing City", values: order.carrierInfos.map((carrier) => carrier.billingcity).join(", ") || "N/A" },
        { field: "Billing State", values: order.carrierInfos.map((carrier) => carrier.billingstate).join(", ") || "N/A" },
        { field: "Billing Zip", values: order.carrierInfos.map((carrier) => carrier.billingzip).join(", ") || "N/A" },
        { field: "Authorized Name", values: order.carrierInfos.map((carrier) => carrier.authorizedname).join(", ") || "N/A" },
        { field: "Unique Code", values: order.carrierInfos.map((carrier) => carrier.uniqueCode).join(", ") || "N/A" },
        { field: "Trade Smartphone", values: order.tradeSmartphone ? "Yes" : "No" },
        { field: "Buy Phone Number", values: order.buyPhoneNumber ? "Yes" : "No" },
        { field: "Phone Unique Code", values: order.phoneUniqueCode || "N/A" },
        { field: "Promo Code", values: order.promoCode || "N/A" },
        { field: "Location ID", values: order.customerId?.locationid || "N/A" },
        { field: "Card Holder Name", values: order.customerId?.cardHolderName || "N/A" },
        { field: "Card Number", values: order.customerId?.cardNumber || "N/A" },
        { field: "Card Expiry", values: order.customerId?.cardExpiry || "N/A" },
        { field: "Card CVC", values: order.customerId?.cardCVC || "N/A" },
        { field: "Card Billing Address", values: order.customerId?.cardBillingAddress || "N/A" },
        { field: "Payment Method", values: order.customerId?.paymentMethod || "N/A" },
      ];


      // Add data to the sheet
      data.forEach((item) => {
        const row = sheet.addRow([item.field, item.values]);

        // Apply Cell Styling
        row.eachCell((cell) => {
          cell.border = borderStyle;
          cell.font = {
            name: "Calibri",
            size: 11,
            color: { argb: "FF333333" },
          };
          cell.alignment = { vertical: "top", horizontal: "left" };
        });
      });

      // Save the Excel file
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, `Order_${order._id}_Details.xlsx`);
    } catch (error) {
      console.error("Excel export failed:", error);
      alert("Failed to export Excel file. Check console for details.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <HashLoader color="#002441" />
      </div>
    );
  }
  if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;

  return (
    <>
      <Navbar />
      <div id="layoutSidenav" className="flex">
        <Sidebar />
        <div id="layoutSidenav_content" className="flex-1">
          <main className="p-6 bg-gray-100 min-h-screen">
            <div className="container mx-auto">
              <h1 className="text-2xl font-bold text-gray-700 mb-6">Order Details</h1>

              {/* Customer Information */}
              <h2 className="text-xl font-bold mb-4 text-cyan-blue">Customer Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><strong>Name:</strong> {order.customerId?.businesslegalname || "N/A"}</div>
                <div><strong>Email:</strong> {order.customerId?.contactemail || "N/A"}</div>
                <div><strong>Phone Number:</strong> {order.customerId?.contactphone || "N/A"}</div>
                <div><strong>Existing BAN:</strong> {order.existingBAN || "N/A"}</div>
                <div><strong>Company Name:</strong> {order.userId.companyname || "N/A"}</div>
                <div><strong>AT&T Account:</strong> {order.atntaccount || "N/A"}</div>
                <div><strong>Phone Model:</strong> {order.phonemodel || "N/A"}</div>
                <div><strong>IMEI Status:</strong> {order.imeistatus || "N/A"}</div>
                <div><strong>No Cracks:</strong> {order.noCracks || "N/A"}</div>
                <div><strong>Screen Defects:</strong> {order.screenDefects || "N/A"}</div>
                <div><strong>Factory Reset:</strong> {order.factoryReset || "N/A"}</div>
              </div>

              {/* Order Information */}
              <h2 className="text-xl font-bold my-6 text-cyan-blue">Order Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><strong>Agreement Type:</strong> {order.agreementtype || "N/A"}</div>
                <div><strong>EIP:</strong> {order.eip || "N/A"}</div>
                {/* <div><strong>Promotion:</strong> {order.promotion || "N/A"}</div> */}
                <div><strong>Paperless:</strong> {order.paperless || "N/A"}</div>
                <div><strong>Special Instruction:</strong> {order.specialinstruction || "N/A"}</div>
                <div><strong>Rate Plan:</strong> {order.ratePlan || "N/A"}</div>
                <div><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</div>
                <div>
                  <strong>Status: </strong>
                  <span className={`px-3 py-1 rounded-lg text-sm font-bold ${order.status === "Pending"
                    ? "bg-yellow-200 text-yellow-800"
                    : order.status === "Completed"
                      ? "bg-green-200 text-green-800"
                      : "bg-gray-200 text-gray-800"
                    }`}>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* IMEI Numbers and Related Information */}
              <h2 className="text-xl font-bold my-6 text-cyan-blue">Line Configuration, IMEI Numbers and Related Information</h2>
              {order.accounts && order.accounts.length > 0 ? (
                order.accounts.map((account, index) => (
                  <div key={index} className="mb-4 p-4 border rounded-lg">
                    <h6 className="font-bold">
                      IMEI Number: {account.imei ? account.imei : "NO IMEI NUMBER HERE"}
                    </h6>
                    <div>
                      <strong>Port Out PIN:</strong> {account.portOutPin || "N/A"} <br />
                      <strong>Shipping Address Details:</strong>
                      <div>
                        <strong>Attention Name:</strong> {order.shippingAddresses[index]?.attentionname || "N/A"} <br />
                        <strong>Address:</strong> {order.shippingAddresses[index]?.shippingaddress || "N/A"} <br />
                        <strong>City:</strong> {order.shippingAddresses[index]?.shippingcity || "N/A"} <br />
                        <strong>State:</strong> {order.shippingAddresses[index]?.shippingstate || "N/A"} <br />
                        <strong>Zip:</strong> {order.shippingAddresses[index]?.shippingzip || "N/A"} <br />
                      </div>
                      <strong>Account Number:</strong> {account.accountNumber || "N/A"} <br />
                      <strong>Phone Number:</strong> {order.phoneNumbers[index]?.phoneNumber || "N/A"} <br />
                      <strong>Carrier Info:</strong> {order.carrierInfos[index]?.currentwirelesscarrier || "N/A"} <br />
                    </div>
                  </div>
                ))
              ) : (
                <p>No IMEI numbers available. This may be due to the following reasons:</p>
              )}
              {order.tradeSmartphone ? (
                <p>This order includes a trade-in smartphone, which may not have an associated IMEI number.</p>
              ) : (
                <p>This order does not include a trade-in smartphone.</p>
              )}

              {/* Additional Order Information */}
              <h2 className="text-xl font-bold my-6 text-cyan-blue">Additional Order Information</h2>
              <div className="mb-4 p-4 border rounded-lg">
                <strong>Buy Phone Number:</strong> {order.buyPhoneNumber ? "Yes" : "No"} <br />
                <strong>Phone Unique Code:</strong> {order.phoneUniqueCode || "N/A"} <br />
                <strong>Promo Code:</strong> {order.promoCode || "N/A"} <br />
              </div>
            </div>
            <button
              onClick={exportToExcel}
              className="mb-4 px-3 py-2 bg-green-500 text-white rounded"
            >
              Export to Excel
            </button>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default OrderDetails;