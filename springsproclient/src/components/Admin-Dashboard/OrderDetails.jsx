

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
import ExportToExcel from "./ExportToExcel";

function OrderDetails() {
  const { orderId } = useParams(); // Get the order ID from the URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adminData, setadminData] = useState({
    attuid: "",
    spid: ""
  });
  const token = localStorage.getItem("jwt_token");

  // Decode the JWT token
  const decodedToken = token ? jwtDecode(token) : null;
  const userRole = decodedToken ? decodedToken.role : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      Swal.fire({
        title: "Login Required",
        text: "You need to log in first to access this page.",
        icon: "warning",
        // confirmButtonText: "Go to Login",
        confirmButtonColor: "#41FDFE",
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
        `https://springairnsbackend-production.up.railway.app/api/order/get-single-order/${orderId}`,
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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://springairnsbackend-production.up.railway.app/api/auth/get-admin-data", {
          headers: {
            Authorization: `Bearer ${token}`,
            role: userRole,
          },
        });

        // Handle the response data
        console.log("API Response:", response.data);
        setadminData({
          attuid: response.data.adminFields[0]?.attuid,
          spid: response.data.adminFields[0]?.spid,
        })
      } catch (error) {
        // Handle errors
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token, userRole]);

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

        // ADMIN Info
        { field: "ATTUID", values: adminData?.attuid || "N/A" },
        { field: "SPID", values: adminData?.spid || "N/A" },
        // Customer Information
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
        { field: "Bill to Mobile", values: order.customerId?.billtomobile || "N/A" },
        { field: "Credit Card Payment", values: order.customerId?.creditcardpayment || "N/A" },
        { field: "Payment Method", values: order.customerId?.paymentMethod || "N/A" },
        { field: "Account Holder Name", values: order.customerId?.accountHolderName || "N/A" },
        { field: "Routing Number", values: order.customerId?.routingNumber || "N/A" },
        { field: "Checking Account Number", values: order.customerId?.checkingAccountNumber || "N/A" },
        { field: "Card Holder Name", values: order.customerId?.cardHolderName || "N/A" },
        { field: "Card Number", values: order.customerId?.cardNumber || "N/A" },
        { field: "Card Expiry", values: order.customerId?.cardExpiry || "N/A" },
        { field: "Card CVC", values: order.customerId?.cardCVC || "N/A" },
        { field: "Card Billing Address", values: order.customerId?.cardBillingAddress || "N/A" },
        { field: "Card Type", values: order.customerId?.cardType || "N/A" },
        { field: "Attention Name", values: order.customerId?.attentionname || "N/A" },
        { field: "Shipping Address", values: order.customerId?.shippingaddress || "N/A" },
        { field: "Shipping City", values: order.customerId?.shippingcity || "N/A" },
        { field: "Shipping State", values: order.customerId?.shippingstate || "N/A" },
        { field: "Shipping Zip", values: order.customerId?.shippingzip || "N/A" },

        // Order Information
        { field: "SANS Partner ID", values: order.sansPartnerID || "N/A" },
        { field: "Agreement Type", values: order.agreementtype || "N/A" },
        { field: "AT&T Account", values: order.atntaccount || "N/A" },
        { field: "Existing BAN", values: order.existingBAN || "N/A" },
        { field: "Company Name", values: order.userId?.companyname || "N/A" },
        { field: "EIP", values: order.eip || "N/A" },
        { field: "Buy New Phone", values: order.buyNewPhone || "N/A" },
        { field: "Phone Model", values: order.phonemodel || "N/A" },
        { field: "IMEI Status", values: order.imeistatus || "N/A" },
        { field: "No Cracks", values: order.noCracks || "N/A" },
        { field: "Screen Defects", values: order.screenDefects || "N/A" },
        { field: "Factory Reset", values: order.factoryReset || "N/A" },
        { field: "Paperless", values: order.paperless || "N/A" },
        { field: "Special Instruction", values: order.specialinstruction || "N/A" },
        { field: "Rate Plan", values: order.ratePlan || "N/A" },
        { field: "Current Wireless Carrier", values: order.currentwirelesscarrier || "N/A" },
        { field: "Account Number", values: order.accountnumber || "N/A" },
        { field: "Pin or Password", values: order.pinorpassword || "N/A" },
        { field: "SSN or Tax ID", values: order.ssnortaxid || "N/A" },
        { field: "Trade Smartphone", values: order.tradeSmartphone ? "Yes" : "No" },
        { field: "Buy Phone Number", values: order.buyPhoneNumber ? "Yes" : "No" },
        { field: "Phone Unique Code", values: order.phoneUniqueCode || "N/A" },
        { field: "Promo Code", values: order.promoCode || "N/A" },
        { field: "Status", values: order.status || "N/A" },
        { field: "Order Date", values: new Date(order.createdAt).toLocaleDateString("en-US") },

        // IMEI Numbers
        { field: "IMEI Numbers", values: order.imeiNumbers.map((imei) => imei.imei).join(", ") || "N/A" },

        // Carrier Information
        ...(order.carrierInfos?.map((carrier, index) => [
          { field: `Carrier ${index + 1} - Current Wireless Carrier`, values: carrier.currentwirelesscarrier || "N/A" },
          { field: `Carrier ${index + 1} - Account Number`, values: carrier.accountnumber || "N/A" },
          { field: `Carrier ${index + 1} - Pin or Password`, values: carrier.pinorpassword || "N/A" },
          { field: `Carrier ${index + 1} - SSN or Tax ID`, values: carrier.ssnortaxid || "N/A" },
          { field: `Carrier ${index + 1} - Billing Name`, values: carrier.billingname || "N/A" },
          { field: `Carrier ${index + 1} - Billing Address`, values: carrier.billingaddress || "N/A" },
          { field: `Carrier ${index + 1} - Billing City`, values: carrier.billingcity || "N/A" },
          { field: `Carrier ${index + 1} - Billing State`, values: carrier.billingstate || "N/A" },
          { field: `Carrier ${index + 1} - Billing Zip`, values: carrier.billingzip || "N/A" },
          { field: `Carrier ${index + 1} - Authorized Name`, values: carrier.authorizedname || "N/A" },
          { field: `Carrier ${index + 1} - Unique Code`, values: carrier.uniqueCode || "N/A" },
          ...(carrier.phonenumbers?.map((phoneNumber, phoneIndex) => ({
            field: `Carrier ${index + 1} - Phone Number ${phoneIndex + 1}`,
            values: phoneNumber || "N/A",
          })) || []),
        ]).flat() || []),

        // Shipping Addresses
        ...(order.shippingAddresses?.map((address, index) => [
          { field: `Shipping Address ${index + 1} - Attention Name`, values: address.attentionname || "N/A" },
          { field: `Shipping Address ${index + 1} - Shipping Address`, values: address.shippingaddress || "N/A" },
          { field: `Shipping Address ${index + 1} - City`, values: address.shippingcity || "N/A" },
          { field: `Shipping Address ${index + 1} - State`, values: address.shippingstate || "N/A" },
          { field: `Shipping Address ${index + 1} - Zip`, values: address.shippingzip || "N/A" },
          { field: `Shipping Address ${index + 1} - Unique Code`, values: address.uniqueCode || "N/A" },
        ]).flat() || []),

        // Accounts
        ...(order.accounts?.map((account, index) => [
          { field: `Account ${index + 1} - Port Out PIN`, values: account.portOutPin || "N/A" },
          { field: `Account ${index + 1} - Phone Number`, values: account.phoneNumber || "N/A" },
          { field: `Account ${index + 1} - Carrier`, values: account.carrier || "N/A" },
          { field: `Account ${index + 1} - IMEI`, values: account.imei || "N/A" },
          { field: `Account ${index + 1} - Buy Phone Number`, values: account.buyPhoneNumber ? "Yes" : "No" },
          { field: `Account ${index + 1} - Trade Smartphone`, values: account.tradeSmartphone ? "Yes" : "No" },
          { field: `Account ${index + 1} - Purchase Smartphone`, values: account.purchaseSmartphone ? "Yes" : "No" },
          { field: `Account ${index + 1} - Shipping Address - Attention Name`, values: account.shippingAddress?.attentionname || "N/A" },
          { field: `Account ${index + 1} - Shipping Address - Address`, values: account.shippingAddress?.shippingaddress || "N/A" },
          { field: `Account ${index + 1} - Shipping Address - City`, values: account.shippingAddress?.shippingcity || "N/A" },
          { field: `Account ${index + 1} - Shipping Address - State`, values: account.shippingAddress?.shippingstate || "N/A" },
          { field: `Account ${index + 1} - Shipping Address - Zip`, values: account.shippingAddress?.shippingzip || "N/A" },
          { field: `Account ${index + 1} - Shipping Address - Unique Code`, values: account.shippingAddress?.uniqueCode || "N/A" },
        ]).flat() || []),
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

              {/* Agent Information */}

              <h2 className="text-xl font-bold mb-4 text-cyan-blue">Agent Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div><strong>Agent Name:</strong> {(`${order.userId?.fname} ${order.userId?.lname}`) || "N/A"}</div>
                <div><strong>Email:</strong> {order.userId?.email || "N/A"}</div>
                <div><strong>Company Name</strong> {order.userId?.companyname || "N/A"}</div>
              </div>

              {/* Customer Information */}
              <h2 className="text-xl font-bold mb-4 text-cyan-blue">Customer Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><strong>Business Legal Name:</strong> {order.customerId?.businesslegalname || "N/A"}</div>
                <div><strong>Business Address:</strong> {order.customerId?.businessaddress || "N/A"}</div>
                <div><strong>Business City:</strong> {order.customerId?.businesscity || "N/A"}</div>
                <div><strong>Business Zip:</strong> {order.customerId?.businesszip || "N/A"}</div>
                <div><strong>Tax ID:</strong> {order.customerId?.taxid || "N/A"}</div>
                <div><strong>Contact Name:</strong> {order.customerId?.contactname || "N/A"}</div>
                <div><strong>Contact Email:</strong> {order.customerId?.contactemail || "N/A"}</div>
                <div><strong>Contact Phone Number:</strong> {order.customerId?.contactphone || "N/A"}</div>
              </div>

              {/* Order Information */}
              <h2 className="text-xl font-bold my-6 text-cyan-blue">Order Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div><strong>SANS Partner ID:</strong> {order.sansPartnerID || "N/A"}</div>
                <div><strong>Agreement Type:</strong> {order.agreementtype || "N/A"}</div>
                <div><strong>AT&T Account:</strong> {order.atntaccount || "N/A"}</div>
                <div><strong>EIP:</strong> {order.eip || "N/A"}</div>
                <div><strong>Paperless:</strong> {order.paperless || "N/A"}</div>
                <div><strong>Special Instruction:</strong> {order.specialinstruction || "N/A"}</div>
                <div><strong>Is Tax Exempt? </strong> {order.isTaxExempt || "N/A"}</div>
                <div><strong>Tax Exempt Number: </strong> {order.taxExemptNumber || "N/A"}</div>
                <div><strong>Best Time To Call? </strong> {order.bestTimeToCall || "N/A"}</div>
                <div><strong>TimeZone: </strong> {order.timezone || "N/A"}</div>

                <div><strong>Existing BAN:</strong> {order.existingBAN || "N/A"}</div>
                <div><strong>Buy New Phone:</strong> {order.buyNewPhone === "yes" ? "Wanted to buy new phone" : order.buyNewPhone === "accepted" ? "Trade in promotion" : order.buyNewPhone === "no" ? "No, they didn't want a new phone or promotion" : "N/A"}</div>

                <div><strong>Phone Model:</strong> {order.phonemodel || "N/A"}</div>
                <div><strong>IMEI Status:</strong> {order.imeistatus || "N/A"}</div>
                <div><strong>No Cracks:</strong> {order.noCracks || "N/A"}</div>
                <div><strong>Screen Defects:</strong> {order.screenDefects || "N/A"}</div>
                <div><strong>Factory Reset:</strong> {order.factoryReset || "N/A"}</div>
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

              {/* Carrier Information */}
              <h2 className="text-xl font-bold my-6 text-cyan-blue">Carrier Information</h2>
              {order.carrierInfos && order.carrierInfos.length > 0 ? (
                order.carrierInfos.map((carrier, index) => (
                  <div key={index} className="mb-4 p-4 border rounded-lg">
                    <div>
                      <strong>Current Wireless Carrier:</strong> {carrier.currentwirelesscarrier || "N/A"} <br />
                      <strong>Account Number:</strong> {carrier.accountnumber || "N/A"} <br />
                      <strong>Pin or Password:</strong> {carrier.pinorpassword || "N/A"} <br />
                      <strong>SSN or Tax ID:</strong> {carrier.ssnortaxid || "N/A"} <br />
                      <strong>Billing Name:</strong> {carrier.billingname || "N/A"} <br />
                      <strong>Billing Address:</strong> {carrier.billingaddress || "N/A"} <br />
                      <strong>Billing City:</strong> {carrier.billingcity || "N/A"} <br />
                      <strong>Billing State:</strong> {carrier.billingstate || "N/A"} <br />
                      <strong>Billing Zip:</strong> {carrier.billingzip || "N/A"} <br />
                      <strong>Authorized Name:</strong> {carrier.authorizedname || "N/A"} <br />
                      <strong>Phone Numbers:</strong>
                      {carrier.phonenumbers?.length > 0 ? (
                        carrier.phonenumbers.map((phoneNumber, phoneIndex) => (
                          <div key={phoneIndex}>
                            Phone Number {phoneIndex + 1}: {phoneNumber || "N/A"}
                          </div>
                        ))
                      ) : (
                        <div>N/A</div>
                      )}
                      <strong>Unique Code:</strong> {carrier.uniqueCode || "N/A"} <br />
                    </div>
                  </div>
                ))
              ) : (
                <p>No carrier information available.</p>
              )}


              {/* Shipping Information */}
              <h2 className="text-xl font-bold my-6 text-cyan-blue">Shipping Information</h2>
              {order.shippingAddresses && order.shippingAddresses.length > 0 ? (
                order.shippingAddresses.map((address, index) => (
                  <div key={index} className="mb-4 p-4 border rounded-lg">
                    <div>
                      <strong>Attention Name:</strong> {address.attentionname || "N/A"} <br />
                      <strong>Shipping Address:</strong> {address.shippingaddress || "N/A"} <br />
                      <strong>City:</strong> {address.shippingcity || "N/A"} <br />
                      <strong>State:</strong> {address.shippingstate || "N/A"} <br />
                      <strong>Zip:</strong> {address.shippingzip || "N/A"} <br />
                      <strong>Unique Code:</strong> {address.uniqueCode || "N/A"} <br />
                    </div>
                  </div>
                ))
              ) : (
                <p>No shipping information available.</p>
              )}

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
                        <strong>Attention Name:</strong> {account.shippingAddress?.attentionname || "N/A"} <br />
                        <strong>Address:</strong> {account.shippingAddress?.shippingaddress || "N/A"} <br />
                        <strong>City:</strong> {account.shippingAddress?.shippingcity || "N/A"} <br />
                        <strong>State:</strong> {account.shippingAddress?.shippingstate || "N/A"} <br />
                        <strong>Zip:</strong> {account.shippingAddress?.shippingzip || "N/A"} <br />
                      </div>
                      <strong>Phone Number:</strong> {account.phoneNumber || "N/A"} <br />
                      <strong>Carrier Info:</strong> {account.carrier || "N/A"} <br />
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

              {/* Admin Notes Section */}
              <h2 className="text-xl font-bold my-6 text-cyan-blue">Admin Notes</h2>
              <div className="mb-6 p-4 border rounded-lg bg-white">
                {order.notes ? (
                  <p>{order.notes}</p>
                ) : (
                  <p>No admin notes available.</p>
                )}
              </div>

            </div>
            {/* <button
              onClick={exportToExcel}
              className="mb-4 px-3 py-2 bg-green-500 text-white rounded"
            >
              Export to Excel
            </button> */}

            <ExportToExcel order={order} adminData={adminData} />


            <button className="ml-3 mb-4 px-3 py-2 bg-slate-800 text-white rounded" onClick={() => { navigate(`/update-order/${order._id}`) }}>Update Order</button>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
