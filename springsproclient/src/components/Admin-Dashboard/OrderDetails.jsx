import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { jwtDecode } from "jwt-decode";
import * as XLSX from "xlsx"; // Import the xlsx library

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

  // Simple style
  // const exportToExcel = () => {
  //   if (!order) return;

  //   // Create a worksheet
  //   const worksheet = XLSX.utils.json_to_sheet(
  //     order.imeiNumbers.map((imei, index) => ({
  //       "Customer Name": order.name || "N/A",
  //       Email: order.email || "N/A",
  //       "Phone Number": order.phonenumber || "N/A",
  //       "Agent Code": order.agentCode || "N/A",
  //       "Dealer Code": order.dealerCode || "N/A",
  //       "Existing BAN": order.existingBAN || "N/A",
  //       "Existing FAN": order.existingFAN || "N/A",
  //       "Agreement Type": order.agreementtype || "N/A",
  //       EIP: order.eip || "N/A",
  //       "Business Legal Name": order.customerId.businesslegalname || "N/A",
  //       "Business Address": order.customerId.businessaddress || "N/A",
  //       "Business City": order.customerId.businesscity || "N/A",
  //       "Business State": order.customerId.businessstate || "N/A",
  //       "Business Zip": order.customerId.businesszip || "N/A",
  //       "Tax ID": order.customerId.taxid || "N/A",
  //       "Contact Name": order.customerId.contactname || "N/A",
  //       "Contact Phone": order.customerId.contactphone || "N/A",
  //       "Contact Email": order.customerId.contactemail || "N/A",
  //       "Location ID": order.customerId.locationid || "N/A",
  //       Paperless: order.paperless || "N/A",
  //       "Bill to Mobile": order.customerId.billtomobile || "N/A",
  //       "Credit Card Payment": order.customerId.creditcardpayment || "N/A",
  //       "Card Number": order.customerId.cardNumber || "N/A",
  //       "Card Expiry": order.customerId.cardExpiry || "N/A",
  //       "Card CVC": order.customerId.cardCVC || "N/A",
  //       Promotion: order.promotion || "N/A",
  //       "Special Instruction": order.specialinstruction || "N/A",
  //       "Rate Plan": order.ratePlan || "N/A",
  //       "Smart Phone Brand": order.smartphoneDetails.brand || "N/A",
  //       "Smart Phone Model": order.smartphoneDetails.model || "N/A",
  //       "Smart Phone Color": order.smartphoneDetails.color || "N/A",
  //       "Smart Phone Size": order.smartphoneDetails.size || "N/A",
  //       "Trade Smart Phone": order.tradeSmartphone || "N/A",
  //       "Buy Phone Number": order.buyPhoneNumber || "N/A",
  //       "Phone Unique Code": order.phoneUniqueCode || "N/A",
  //       "Order Date": new Date(order.createdAt).toLocaleDateString(),
  //       Status: order.status,
  //       "IMEI Number": imei.imei || "N/A",
  //       "Port Out PIN": order.accounts[index]?.portOutPin || "N/A",
  //       "Attention Name":
  //         order.shippingAddresses[index]?.attentionname || "N/A",
  //       "Shipping Address":
  //         order.shippingAddresses[index]?.shippingaddress || "N/A",
  //       City: order.shippingAddresses[index]?.shippingcity || "N/A",
  //       State: order.shippingAddresses[index]?.shippingstate || "N/A",
  //       Zip: order.shippingAddresses[index]?.shippingzip || "N/A",
  //       "Account Number": order.accounts[index]?.accountNumber || "N/A",
  //       "Phone Number": order.phoneNumbers[index]?.phoneNumber || "N/A",
  //       "Current Wireless Carrier":
  //         order.carrierInfos[index]?.currentwirelesscarrier || "N/A",
  //       "Pin Or Password": order.carrierInfos[index]?.pinorpassword || "N/A",
  //       "SSN or Tax ID": order.carrierInfos[index]?.ssnortaxid || "N/A",
  //       "Billing Name": order.carrierInfos[index]?.billingname || "N/A",
  //       "Billing Address": order.carrierInfos[index]?.billingaddress || "N/A",
  //       "Billing City": order.carrierInfos[index]?.billingcity || "N/A",
  //       "Billing State": order.carrierInfos[index]?.billingstate || "N/A",
  //       "Billing Zip": order.carrierInfos[index]?.billingzip || "N/A",
  //       "Authorized Name": order.carrierInfos[index]?.authorizedname || "N/A",
  //       "Unique Code": order.carrierInfos[index]?.uniqueCode || "N/A",
  //     }))
  //   );

  //   // Create a new workbook
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Order Details");

  //   // Export the workbook
  //   XLSX.writeFile(workbook, `Order_Details_${orderId}.xlsx`);
  // };

  // Heavy Style

  const exportToExcel = () => {
    if (!order) return;

    // Create a worksheet
    const worksheet = XLSX.utils.json_to_sheet(
      order.imeiNumbers.map((imei, index) => ({
        "Customer Name": order.name || "N/A",
        "Email": order.email || "N/A",
        "Phone Number": order.phonenumber || "N/A",
        "Agent Code": order.agentCode || "N/A",
        "Dealer Code": order.dealerCode || "N/A",
        "Existing BAN": order.existingBAN || "N/A",
        "Existing FAN": order.existingFAN || "N/A",
        "Agreement Type": order.agreementtype || "N/A",
        "EIP": order.eip || "N/A",
        "Business Legal Name": order.customerId.businesslegalname || "N/A",
        "Business Address": order.customerId.businessaddress || "N/A",
        "Business City": order.customerId.businesscity || "N/A",
        "Business State": order.customerId.businessstate || "N/A",
        "Business Zip": order.customerId.businesszip || "N/A",
        "Tax ID": order.customerId.taxid || "N/A",
        "Contact Name": order.customerId.contactname || "N/A",
        "Contact Phone": order.customerId.contactphone || "N/A",
        "Contact Email": order.customerId.contactemail || "N/A",
        "Location ID": order.customerId.locationid || "N/A",
        "Paperless": order.paperless || "N/A",
        "Bill to Mobile": order.customerId.billtomobile || "N/A",
        "Credit Card Payment": order.customerId.creditcardpayment || "N/A",
        "Card Number": order.customerId.cardNumber || "N/A",
        "Card Expiry": order.customerId.cardExpiry || "N/A",
        "Card CVC": order.customerId.cardCVC || "N/A",
        "Promotion": order.promotion || "N/A",
        "Special Instruction": order.specialinstruction || "N/A",
        "Rate Plan": order.ratePlan || "N/A",
        "Smart Phone Brand": order.smartphoneDetails.brand || "N/A",
        "Smart Phone Model": order.smartphoneDetails.model || "N/A",
        "Smart Phone Color": order.smartphoneDetails.color || "N/A",
        "Smart Phone Size": order.smartphoneDetails.size || "N/A",
        "Trade Smart Phone": order.tradeSmartphone || "N/A",
        "Buy Phone Number": order.buyPhoneNumber || "N/A",
        "Phone Unique Code": order.phoneUniqueCode || "N/A",
        "Promo Code": order.promoCode || "N/A",
        "Order Date": new Date(order.createdAt).toLocaleDateString(),
        "Status": order.status,
        "IMEI Number": imei.imei || "N/A",
        "Port Out PIN": order.accounts[index]?.portOutPin || "N/A",
        "Attention Name":
          order.shippingAddresses[index]?.attentionname || "N/A",
        "Shipping Address":
          order.shippingAddresses[index]?.shippingaddress || "N/A",
        "City": order.shippingAddresses[index]?.shippingcity || "N/A",
        "State": order.shippingAddresses[index]?.shippingstate || "N/A",
        "Zip": order.shippingAddresses[index]?.shippingzip || "N/A",
        "Account Number": order.accounts[index]?.accountNumber || "N/A",
        "Phone Number": order.phoneNumbers[index]?.phoneNumber || "N/A",
        "Current Wireless Carrier":
          order.carrierInfos[index]?.currentwirelesscarrier || "N/A",
        "Pin Or Password": order.carrierInfos[index]?.pinorpassword || "N/A",
        "SSN or Tax ID": order.carrierInfos[index]?.ssnortaxid || "N/A",
        "Billing Name": order.carrierInfos[index]?.billingname || "N/A",
        "Billing Address": order.carrierInfos[index]?.billingaddress || "N/A",
        "Billing City": order.carrierInfos[index]?.billingcity || "N/A",
        "Billing State": order.carrierInfos[index]?.billingstate || "N/A",
        "Billing Zip": order.carrierInfos[index]?.billingzip || "N/A",
        "Authorized Name": order.carrierInfos[index]?.authorizedname || "N/A",
        "Unique Code": order.carrierInfos[index]?.uniqueCode || "N/A",
      }))
    );

    // Set column widths
    const columnWidths = [
      { wch: 20 }, // Customer Name
      { wch: 30 }, // Email
      { wch: 15 }, // Phone Number
      { wch: 15 }, // Agent Code
      { wch: 15 }, // Dealer Code
      { wch: 15 }, // Existing BAN
      { wch: 15 }, // Existing FAN
      { wch: 20 }, // Agreement Type
      { wch: 10 }, // EIP
      { wch: 25 }, // Business Legal Name
      { wch: 25 }, // Business Address
      { wch: 15 }, // Business City
      { wch: 15 }, // Business State
      { wch: 10 }, // Business Zip
      { wch: 15 }, // Tax ID
      { wch: 20 }, // Contact Name
      { wch: 15 }, // Contact Phone
      { wch: 25 }, // Contact Email
      { wch: 15 }, // Location ID
      { wch: 10 }, // Paperless
      { wch: 15 }, // Bill to Mobile
      { wch: 20 }, // Credit Card Payment
      { wch: 15 }, // Card Number
      { wch: 15 }, // Card Expiry
      { wch: 10 }, // Card CVC
      { wch: 15 }, // Promotion
      { wch: 20 }, // Special Instruction
      { wch: 15 }, // Rate Plan
      { wch: 20 }, // Smart Phone Brand
      { wch: 20 }, // Smart Phone Model
      { wch: 15 }, // Smart Phone Color
      { wch: 15 }, // Smart Phone Size
      { wch: 15 }, // Trade Smart Phone
      { wch: 15 }, // Buy Phone Number
      { wch: 15 }, // Phone Unique Code
      { wch: 15 }, // Order Date
      { wch: 10 }, // Status
      { wch: 20 }, // IMEI Number
      { wch: 15 }, // Port Out PIN
      { wch: 20 }, // Attention Name
      { wch: 25 }, // Shipping Address
      { wch: 15 }, // City
      { wch: 15 }, // State
      { wch: 10 }, // Zip
      { wch: 15 }, // Account Number
      { wch: 15 }, // Phone Number
      { wch: 25 }, // Current Wireless Carrier
      { wch: 15 }, // Pin Or Password
      { wch: 15 }, // SSN or Tax ID
      { wch: 20 }, // Billing Name
      { wch: 25 }, // Billing Address
      { wch: 15 }, // Billing City
      { wch: 15 }, // Billing State
      { wch: 10 }, // Billing Zip
      { wch: 20 }, // Authorized Name
      { wch: 15 }, // Unique Code
    ];

    // Apply column widths to the worksheet
    worksheet["!cols"] = columnWidths;

    // Style the header row
    const headerRow = 0; // Row 0 (first row) for header
    const headerColumns = Object.keys(worksheet); // Extract column names

    headerColumns.forEach((_, col) => {
      const cellAddress = XLSX.utils.encode_cell({ c: col, r: headerRow });
      if (worksheet[cellAddress]) {
        worksheet[cellAddress].s = {
          fill: {
            fgColor: { rgb: "FFCCCCCC" }, // Light gray background
          },
          font: {
            bold: true,
            color: { rgb: "FF000000" }, // Black text
          },
          border: {
            top: { style: "thin", color: { rgb: "FF000000" } },
            bottom: { style: "thin", color: { rgb: "FF000000" } },
            left: { style: "thin", color: { rgb: "FF000000" } },
            right: { style: "thin", color: { rgb: "FF000000" } },
          },
        };
      }
    });

    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Order Details");

    // Export the workbook
    XLSX.writeFile(workbook, `Order_Details_${orderId}.xlsx`);
  };
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
