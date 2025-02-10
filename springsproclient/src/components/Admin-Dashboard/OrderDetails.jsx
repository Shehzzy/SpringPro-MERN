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
        setOrder(response.data.order);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
        setError("Error fetching order details");
        setLoading(false);
      });
  }, [orderId, token, navigate, userRole]);




  // This is column wise
  const exportToExcel = async () => {
    try {
      if (!order) {
        alert("No order data available");
        return;
      }
  
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Order Details");
  
      // ======================
      // COLUMN CONFIGURATION
      // ======================
      sheet.columns = [
        { header: "Field", key: "field", width: 25 },
        { header: "Values", key: "values", width: 50 },
      ];
  
      // ======================
      // STYLING
      // ======================
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
        cell.border = {
          top: { style: "medium", color: blackBorder },
          bottom: { style: "medium", color: blackBorder },
          left: { style: "medium", color: blackBorder },
          right: { style: "medium", color: blackBorder },
        };
        cell.alignment = { vertical: "middle", horizontal: "center" };
      });
  
      // ======================
      // DATA POPULATION - FILLING COLUMNS INSTEAD OF ROWS
      // ======================
      const data = [
        { field: "Customer Name", values: order.name || "N/A" },
        { field: "Email", values: order.email || "N/A" },
        { field: "Phone Number", values: order.phonenumber || "N/A" },
        { field: "Agent Code", values: order.agentCode || "N/A" },
        { field: "Dealer Code", values: order.dealerCode || "N/A" },
        { field: "Existing BAN", values: order.existingBAN || "N/A" },
        { field: "Existing FAN", values: order.existingFAN || "N/A" },
        { field: "Agreement Type", values: order.agreementtype || "N/A" },
        { field: "EIP", values: order.eip || "N/A" },
        { field: "Business Legal Name", values: order.customerId?.businesslegalname || "N/A" },
        { field: "Business Address", values: order.customerId?.businessaddress || "N/A" },
        { field: "Business City", values: order.customerId?.businesscity || "N/A" },
        { field: "Business State", values: order.customerId?.businessstate || "N/A" },
        { field: "Business Zip", values: order.customerId?.businesszip || "N/A" },
        { field: "Tax ID", values: order.customerId?.taxid || "N/A" },
        { field: "Contact Name", values: order.customerId?.contactname || "N/A" },
        { field: "Contact Phone", values: order.customerId?.contactphone || "N/A" },
        { field: "Contact Email", values: order.customerId?.contactemail || "N/A" },
        { field: "Location ID", values: order.customerId?.locationid || "N/A" },
        { field: "Paperless", values: order.paperless || "N/A" },
        { field: "Bill to Mobile", values: order.customerId?.billtomobile || "N/A" },
        { field: "Credit Card Payment", values: order.customerId?.creditcardpayment || "N/A" },
        { field: "Card Number", values: order.customerId?.cardNumber || "N/A" },
        { field: "Card Expiry", values: order.customerId?.cardExpiry || "N/A" },
        { field: "Card CVC", values: order.customerId?.cardCVC || "N/A" },
        { field: "Promotion", values: order.promotion || "N/A" },
        { field: "Special Instruction", values: order.specialinstruction || "N/A" },
        { field: "Rate Plan", values: order.ratePlan || "N/A" },
        { field: "Smart Phone Brand", values: order.smartphoneDetails?.brand || "N/A" },
        { field: "Smart Phone Model", values: order.smartphoneDetails?.model || "N/A" },
        { field: "Smart Phone Color", values: order.smartphoneDetails?.color || "N/A" },
        { field: "Smart Phone Size", values: order.smartphoneDetails?.size || "N/A" },
        { field: "Trade Smart Phone", values: order.tradeSmartphone || "N/A" },
        { field: "Buy Phone Number", values: order.buyPhoneNumber || "N/A" },
        { field: "Phone Unique Code", values: order.phoneUniqueCode || "N/A" },
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
      ];
  
      // Add data to the sheet (each entry is added as a row)
      data.forEach((item, index) => {
        const row = sheet.addRow([item.field, item.values]);
  
        // Apply Cell Styling
        row.eachCell((cell, colNumber) => {
          cell.border = {
            top: { style: "medium", color: blackBorder },
            bottom: { style: "medium", color: blackBorder },
            left: { style: "medium", color: blackBorder },
            right: { style: "medium", color: blackBorder },
          };
  
          cell.font = {
            name: "Calibri",
            size: 11,
            color: { argb: "FF333333" },
          };
          cell.alignment = { vertical: "top", horizontal: "left" };
        });
      });

      
  
      // ======================
      // BROWSER-FRIENDLY SAVE
      // ======================
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

  


  // This is row wise
  // const exportToExcel = async () => {
  //   try {
  //     if (!order) {
  //       alert("No order data available");
  //       return;
  //     }
  
  //     const workbook = new ExcelJS.Workbook();
  //     const sheet = workbook.addWorksheet("Order Details");
  
  //     // ======================
  //     // COLUMN CONFIGURATION
  //     // ======================
  //     sheet.columns = [
  //       { header: "Customer Name", key: "customerName", width: 25 },
  //       { header: "Email", key: "email", width: 30 },
  //       { header: "Customer Phone", key: "customerPhone", width: 18 },
  //       { header: "Agent Code", key: "agentCode", width: 15 },
  //       { header: "Dealer Code", key: "dealerCode", width: 15 },
  //       { header: "Agreement Type", key: "agreementType", width: 20 },
  //       { header: "Order Date", key: "orderDate", width: 15 },
  //       { header: "Status", key: "status", width: 15 },
  //       { header: "IMEI Number", key: "imei", width: 20 },
  //       { header: "Port Out PIN", key: "portOutPin", width: 15 },
  //       { header: "Attention Name", key: "attentionName", width: 20 },
  //       { header: "Shipping Address", key: "shippingAddress", width: 35 },
  //       { header: "City", key: "city", width: 15 },
  //       { header: "State", key: "state", width: 10 },
  //       { header: "Zip Code", key: "zipCode", width: 10 },
  //       { header: "Account Number", key: "accountNumber", width: 20 },
  //       { header: "Carrier Info", key: "carrierInfo", width: 20 },
  //     ];
  
  //     // ======================
  //     // STYLING
  //     // ======================
  //     const blackBorder = { argb: "FF000000" };
  //     const borderStyle = {
  //       top: { style: "thin", color: blackBorder },
  //       bottom: { style: "thin", color: blackBorder },
  //       left: { style: "thin", color: blackBorder },
  //       right: { style: "thin", color: blackBorder },
  //     };
  
  //     // Header Styling
  //     sheet.getRow(1).eachCell((cell) => {
  //       cell.fill = {
  //         type: "pattern",
  //         pattern: "solid",
  //         fgColor: { argb: "FF00B4D8" },
  //       };
  //       cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
  //       cell.border = {
  //         top: { style: "medium", color: blackBorder },
  //         bottom: { style: "medium", color: blackBorder },
  //         left: { style: "medium", color: blackBorder },
  //         right: { style: "medium", color: blackBorder },
  //       };
  //       cell.alignment = { vertical: "middle", horizontal: "center" };
  //     });
  
  //     // ======================
  //     // DATA POPULATION USING MAP
  //     // ======================
  //     const rows = order.imeiNumbers.map((imeiData, index) => {
  //       const rowData = {
  //         customerName: order.name || "N/A",
  //         email: order.email || "N/A",
  //         customerPhone: order.phonenumber || "N/A",
  //         agentCode: order.agentCode || "N/A",
  //         dealerCode: order.dealerCode || "N/A",
  //         agreementType: order.agreementtype || "N/A",
  //         orderDate: new Date(order.createdAt).toLocaleDateString("en-US"),
  //         status: order.status || "N/A",
  //         imei: imeiData.imei || "N/A",
  //         portOutPin: order.accounts[index]?.portOutPin || "N/A",
  //         attentionName: order.shippingAddresses[index]?.attentionname || "N/A",
  //         shippingAddress: order.shippingAddresses[index]?.shippingaddress || "N/A",
  //         city: order.shippingAddresses[index]?.shippingcity || "N/A",
  //         state: order.shippingAddresses[index]?.shippingstate || "N/A",
  //         zipCode: order.shippingAddresses[index]?.shippingzip || "N/A",
  //         accountNumber: order.accounts[index]?.accountNumber || "N/A",
  //         carrierInfo: order.carrierInfos[index]?.currentwirelesscarrier || "N/A",
  //       };
  
  //       const row = sheet.addRow(rowData);
  
  //       // Apply Cell Styling
  //       row.eachCell((cell, colNumber) => {
  //         cell.border = {
  //           top: { style: "medium", color: blackBorder },
  //           bottom: { style: "medium", color: blackBorder },
  //           left: { style: "medium", color: blackBorder },
  //           right: { style: "medium", color: blackBorder },
  //         };
  
  //         cell.font = {
  //           name: "Calibri",
  //           size: 11,
  //           color: { argb: "FF333333" },
  //         };
  //         cell.alignment = { vertical: "top", horizontal: "left" };
  
  //         // Explicitly set left and right borders
  //         if (colNumber === 1) {
  //           cell.border = { ...cell.border, left: { style: "medium", color: blackBorder } };
  //         }
  //         if (colNumber === sheet.columns.length) {
  //           cell.border = { ...cell.border, right: { style: "medium", color: blackBorder } };
  //         }
  //       });
  
  //       return rowData; // Return row data after each iteration
  //     });
  
  //     // ======================
  //     // FINAL BORDER TOUCH-UP
  //     // ======================
  //     const lastRowNumber = sheet.lastRow.number;
  //     const lastColNumber = sheet.columns.length;
  
  //     sheet.eachRow((row, rowNumber) => {
  //       row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
  //         if (colNumber === 1) {
  //           cell.border = { ...cell.border, left: { style: "medium", color: blackBorder } };
  //         }
  //         if (colNumber === lastColNumber) {
  //           cell.border = { ...cell.border, right: { style: "medium", color: blackBorder } };
  //         }
  //         if (rowNumber === lastRowNumber) {
  //           cell.border = { ...cell.border, bottom: { style: "medium", color: blackBorder } };
  //         }
  //       });
  //     });
  
  //     // ======================
  //     // BROWSER-FRIENDLY SAVE
  //     // ======================
  //     const buffer = await workbook.xlsx.writeBuffer();
  //     const blob = new Blob([buffer], {
  //       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  //     });
  //     saveAs(blob, `Order_${order._id}_Details.xlsx`);
  
  //   } catch (error) {
  //     console.error("Excel export failed:", error);
  //     alert("Failed to export Excel file. Check console for details.");
  //   }
  // };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
       <HashLoader color="#002441" />
      </div>
    );
  }
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

              {/* Add Export Button */}

              {/* Customer Information */}
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

              {/* Order Information */}
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
                  <strong>Status:</strong>
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

              {/* IMEI Numbers and Related Information */}
              <h2 className="text-xl font-bold my-6 text-cyan-blue">
                IMEI Numbers and Related Information
              </h2>
              {order.imeiNumbers && order.imeiNumbers.length > 0 ? (
                order.imeiNumbers.map((imei, index) => (
                  <div key={index} className="mb-4 p-4 border rounded-lg">
                    <h3 className="font-bold">IMEI Number: {imei.imei}</h3>
                    <div>
                      <strong>Port Out PIN:</strong>{" "}
                      {order.accounts[index]?.portOutPin || "N/A"} <br />
                      <strong>Shipping Address Details:</strong>
                      <div>
                        <strong>Attention Name:</strong>{" "}
                        {order.shippingAddresses[index]?.attentionname || "N/A"}{" "}
                        <br />
                        <strong>Address:</strong>{" "}
                        {order.shippingAddresses[index]?.shippingaddress ||
                          "N/A"}{" "}
                        <br />
                        <strong>City:</strong>{" "}
                        {order.shippingAddresses[index]?.shippingcity || "N/A"}{" "}
                        <br />
                        <strong>State:</strong>{" "}
                        {order.shippingAddresses[index]?.shippingstate || "N/A"}{" "}
                        <br />
                        <strong>Zip:</strong>{" "}
                        {order.shippingAddresses[index]?.shippingzip || "N/A"}{" "}
                        <br />
                      </div>
                      <strong>Account Number:</strong>{" "}
                      {order.accounts[index]?.accountNumber || "N/A"} <br />
                      <strong>Phone Number:</strong>{" "}
                      {order.phoneNumbers[index]?.phoneNumber || "N/A"} <br />
                      <strong>Carrier Info:</strong>{" "}
                      {order.carrierInfos[index]?.currentwirelesscarrier ||
                        "N/A"}{" "}
                      <br />
                    </div>
                  </div>
                ))
              ) : (
                <p>No IMEI numbers available.</p>
              )}
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
