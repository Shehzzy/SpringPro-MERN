// import React, {useState} from "react";
// import ExcelJS from "exceljs";
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';

// const ExportToExcel = ({order}) => {
//     const [data, setData] = useState([]);
//     const [headers, setHeaders] = useState([]);

//     const handleExportToExcel = async () => {
//         try {
//             if (!order || Object.keys(order).length === 0) {
//                 alert('No data to export!');
//                 return;
//             }

//             const workbook = new ExcelJS.Workbook();
//             let allSheetsData = [
//                 {
//                     sheetName: "SP General Info (VID)",
//                     tabColor: "FFFF0000",
//                     data: handleSpGeneralInfoCellData(order),
//                     mergedCells: require('../../utils/excelSheetGenerator/spGeneralInfo/spGeneralInfoMergedCells.json')
//                 },
//                 {
//                     sheetName: "New Activation",
//                     tabColor: null,
//                     data: handleNewActivationData(order) ,
//                     mergedCells: require('../../utils/excelSheetGenerator/newActivation/newActivationMergedCells.json')
//                 }
//             ]

//             allSheetsData.forEach(sheet => {
//                 const newWorksheet = workbook.addWorksheet(sheet.sheetName);

//                 if (sheet.tabColor) {
//                     newWorksheet.properties.tabColor = { argb: sheet.tabColor };
//                 }

//                 sheet.data.forEach(cellInfo => {
//                     const { address, value, fontName, fontSize, bold, italic, fontColor, backgroundColor, alignment, columnWidth, rowHeight, border } = cellInfo;

//                     let cell = newWorksheet.getCell(address);
//                     cell.value = value;

//                     if (fontName || fontSize || bold !== undefined || italic !== undefined || fontColor) {
//                         cell.font = {
//                             name: fontName || 'Arial',
//                             size: fontSize || 12,
//                             bold: bold || false,
//                             italic: italic || false,
//                             color: fontColor ? { argb: fontColor } : undefined
//                         };
//                     }

//                     if (backgroundColor) {
//                         cell.fill = {
//                             type: 'pattern',
//                             pattern: 'solid',
//                             fgColor: { argb: backgroundColor }
//                         };
//                     }

//                     if (alignment) {
//                         cell.alignment = { horizontal: alignment };
//                     }

//                     if (columnWidth) {
//                         newWorksheet.getColumn(address.replace(/[0-9]/g, '')).width = columnWidth;
//                     }

//                     if (rowHeight) {
//                         newWorksheet.getRow(parseInt(address.replace(/[A-Z]/g, ''), 10)).height = rowHeight;
//                     }

//                     if (border) {
//                         cell.border = {
//                             top: border.top ? { style: border.top.style, color: border.top.color ? { argb: border.top.color } : undefined } : undefined,
//                             bottom: border.bottom ? { style: border.bottom.style, color: border.bottom.color ? { argb: border.bottom.color } : undefined } : undefined,
//                             left: border.left ? { style: border.left.style, color: border.left.color ? { argb: border.left.color } : undefined } : undefined,
//                             right: border.right ? { style: border.right.style, color: border.right.color ? { argb: border.right.color } : undefined } : undefined
//                         };
//                     }
//                 });

//                 const mergedRanges = new Set();
//                 sheet.mergedCells.forEach(mergeInfo => {
//                     if (!mergedRanges.has(mergeInfo.range)) {
//                         newWorksheet.mergeCells(mergeInfo.range);
//                         newWorksheet.getCell(mergeInfo.startAddress).value = mergeInfo.value;
//                         mergedRanges.add(mergeInfo.range);
//                     }
//                 });

//                 if (sheet.sheetName === "New Activation") {
//                     const imageId = workbook.addImage({
//                         filename: '../../assets/images/attLogo.png',
//                         extension: 'png',
//                     });

//                     newWorksheet.addImage(imageId, {
//                         tl: { col: 1, row: 0 },
//                         br: { col: 4, row: 4 },
//                     });
//                 }
//             });

//             // Convert workbook to binary
//             const buffer = await workbook.xlsx.writeBuffer();
//             const blob = new Blob([buffer], {
//                 type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//             });

//             saveAs(blob, `Order_${order._id}_Details.xlsx`);
//         } catch (error) {
//             console.error('Error exporting to Excel:', error);
//             alert(`Error exporting to Excel: ${error.message}`);
//         }
//     };


//     const handleSpGeneralInfoCellData = (order) => {
//         const sheetName = 'SP General Info (VID)';
//         let data = [
//             /** TODO
//             Solution Provider Submitter's Name *
//             Solution Provider Submitter's ATTUID (as listed in Webphone) *
//             Solution Provider Number (SPID)*
//             Solution Provider Company Name*
//             Solution Provider Dealer Code*
//             Solution Provider Contact Email*
//             Solution Provider Contact Number
//             AT&T Channel Manager's Name
//             */
//             cellInfo(sheetName, "B11", order.customerId?.businesslegalname),  // Customer Business Name
//             cellInfo(sheetName, "B12", order.customerId?.contactname),  // Customer Contact Name (authorized - on behalf of)
//             cellInfo(sheetName, "B13", order.customerId?.contactemail), // Customer Contact Email
//             cellInfo(sheetName, "B14", order.customerId?.contactemail), // Customer Contact Email

//             /** TODO
//             FAN Name
//             FAN (Foundation Account Number)
//             BAN (Billing Account Number)
//             Type of request
//             # of Mobile Numbers impacted
//             Special Instructions
//             */
//         ];

//         const excelSheetTemplate = require('../../utils/excelSheetGenerator/spGeneralInfo/spGeneralInfo.json');

//         return [...data, ...excelSheetTemplate];
//     }

//     const handleNewActivationData = (order) => {
//         const sheetName = 'New Activation';
//         let data = [
//             /** TODO
//              Company Name:
//              Foundation Account Number:
//              Active CTN on Existing BAN:
//              Create Individual Billing Accounts? (Y/N)
//              Sales Contact Name:
//              Sales Contact Phone #:
//              Number of Lines:
//              One Time Payment Options (BTM or SEI):
//              Tax Exempt? (Y/N)
//              Customer ID (if SEI Or Tax Exempt)
//              Purchase Order # (if SEI, if applicable)
//              Contract Length
//              Bulk Shipping? (Y/N)
//              Mobile Share? (Y/N)
//              Mobile Share Category
//              Waive Activation Fee? (Y/N)
//              Dealer Code

//              Installment Length (J7)
//              Credit card Information (M6:M17)
//                  Customer Name*
//                  Contact Name*
//                  Address
//                  Address
//                  City
//                  State, Zip
//                  Phone Number*
//                  Best Time To Call (include Time Zone)*
//                  eMail Address
//                  Customer Name

//              Line # (M24)
//                 TBA
//              */
//         ];

//         const excelSheetTemplate = require('../../utils/excelSheetGenerator/newActivation/newActivation.json');

//         return [...data, ...excelSheetTemplate];
//     }

//     const cellInfo = (sheetName, cell, content) => {
//         return {
//             "sheetName": "SP General Info (VID)",
//             "address": cell,
//             "value": content,
//             "fontName": "Calibri",
//             "fontSize": 11,
//             "backgroundColor": null,
//             "alignment": null,
//             "columnWidth": 35.33203125,
//             "rowHeight": 27,
//             "border": {
//                 "top": null,
//                 "bottom": null,
//                 "left": null,
//                 "right": null
//             }
//         }
//     }


//     return (
//         <>
//             <button
//                 onClick={handleExportToExcel}
//                 className="mb-4 px-3 py-2 bg-green-500 text-white rounded"
//             >
//                 Export to Excel
//             </button>
//         </>
//     )
// }

// export default ExportToExcel;

import React from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const ExportToExcel = ({ order, adminData }) => {

    let base64Image = `data:image/png;base64,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`;


  const handleExportToExcel = async () => {
    try {
      if (!order || Object.keys(order).length === 0) {
        alert("No data to export!");
        return;
      }

      const workbook = new ExcelJS.Workbook();
      let allSheetsData = [
        {
          sheetName: "SP General Info (VID)",
          tabColor: "FFFF0000",
          data: handleSpGeneralInfoCellData(order, adminData),
          mergedCells: require("../../utils/excelSheetGenerator/spGeneralInfo/spGeneralInfoMergedCells.json"),
        },
        {
          sheetName: "New Activation",
          tabColor: null,
          data: handleNewActivationData(order),
          mergedCells: require("../../utils/excelSheetGenerator/newActivation/newActivationMergedCells.json"),
        },
      ];

      allSheetsData.forEach((sheet) => {
        const newWorksheet = workbook.addWorksheet(sheet.sheetName);

        if (sheet.tabColor) {
          newWorksheet.properties.tabColor = { argb: sheet.tabColor };
        }

        sheet.data.forEach((cellInfo) => {
          const {
            address,
            value,
            fontName,
            fontSize,
            bold,
            italic,
            fontColor,
            backgroundColor,
            alignment,
            columnWidth,
            rowHeight,
            border,
          } = cellInfo;

          let cell = newWorksheet.getCell(address);
          cell.value = value;

          if (fontName || fontSize || bold !== undefined || italic !== undefined || fontColor) {
            cell.font = {
              name: fontName || "Arial",
              size: fontSize || 12,
              bold: bold || false,
              italic: italic || false,
              color: fontColor ? { argb: fontColor } : undefined,
            };
          }

          if (backgroundColor) {
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: backgroundColor },
            };
          }

          if (alignment) {
            cell.alignment = { horizontal: alignment };
          }

          if (columnWidth) {
            newWorksheet.getColumn(address.replace(/[0-9]/g, "")).width = columnWidth;
          }

          if (rowHeight) {
            newWorksheet.getRow(parseInt(address.replace(/[A-Z]/g, ""), 10)).height = rowHeight;
          }

          if (border) {
            cell.border = {
              top: border.top
                ? { style: border.top.style, color: border.top.color ? { argb: border.top.color } : undefined }
                : undefined,
              bottom: border.bottom
                ? { style: border.bottom.style, color: border.bottom.color ? { argb: border.bottom.color } : undefined }
                : undefined,
              left: border.left
                ? { style: border.left.style, color: border.left.color ? { argb: border.left.color } : undefined }
                : undefined,
              right: border.right
                ? { style: border.right.style, color: border.right.color ? { argb: border.right.color } : undefined }
                : undefined,
            };
          }
        });

        const mergedRanges = new Set();
        sheet.mergedCells.forEach((mergeInfo) => {
          if (!mergedRanges.has(mergeInfo.range)) {
            newWorksheet.mergeCells(mergeInfo.range);
            newWorksheet.getCell(mergeInfo.startAddress).value = mergeInfo.value;
            mergedRanges.add(mergeInfo.range);
          }
        });

        

        if (sheet.sheetName === "New Activation") {
          // Add image to the worksheet
          const imageId = workbook.addImage({
            base64: base64Image, // Use base64 image
            extension: "png",
          });

          newWorksheet.addImage(imageId, {
            tl: { col: 1, row: 0 },
            br: { col: 4, row: 4 },
          });
        }
      });

      // Convert workbook to binary
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(blob, `Order_${order._id}_Details.xlsx`);
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      alert(`Error exporting to Excel: ${error.message}`);
    }
  };

  const handleSpGeneralInfoCellData = (order, adminData) => {
    const sheetName = "SP General Info (VID)";
    let data = [
      // Solution Provider Information
      cellInfo(sheetName, "B2", adminData.attuid || "N/A"), // Solution Provider Submitter's ATTUID
      cellInfo(sheetName, "B3", adminData.spid || "N/A"), // Solution Provider Number (SPID)
      cellInfo(sheetName, "B4", order.userId?.companyname || "N/A"), // Solution Provider Company Name
      cellInfo(sheetName, "B5", order.customerId?.contactemail || "N/A"), // Solution Provider Contact Email
      cellInfo(sheetName, "B6", order.customerId?.contactphone || "N/A"), // Solution Provider Contact Number
      cellInfo(sheetName, "B7", "AT&T Channel Manager's Name"), // AT&T Channel Manager's Name (TODO: Add value)

      // Customer Information
      cellInfo(sheetName, "B11", order.customerId?.businesslegalname || "N/A"), // Customer Business Name
      cellInfo(sheetName, "B12", order.customerId?.contactname || "N/A"), // Customer Contact Name
      cellInfo(sheetName, "B13", order.customerId?.contactemail || "N/A"), // Customer Contact Email
      cellInfo(sheetName, "B14", order.customerId?.contactphone || "N/A"), // Customer Contact Phone

      // FAN and BAN Information
      cellInfo(sheetName, "B16", order.atntaccount || "N/A"), // FAN Name
      cellInfo(sheetName, "B17", order.existingBAN || "N/A"), // BAN (Billing Account Number)
      cellInfo(sheetName, "B18", order.agreementtype || "N/A"), // Type of Request
      cellInfo(sheetName, "B19", order.imeiNumbers?.length || 0), // # of Mobile Numbers Impacted
      cellInfo(sheetName, "B20", order.specialinstruction || "N/A"), // Special Instructions
    ];

    const excelSheetTemplate = require("../../utils/excelSheetGenerator/spGeneralInfo/spGeneralInfo.json");
    return [...data, ...excelSheetTemplate];
  };

  const handleNewActivationData = (order) => {
    const sheetName = "New Activation";
    let data = [
      // Company and Account Information
      cellInfo(sheetName, "B2", order.customerId?.businesslegalname || "N/A"), // Company Name
      cellInfo(sheetName, "B3", order.atntaccount || "N/A"), // Foundation Account Number
      cellInfo(sheetName, "B4", order.existingBAN || "N/A"), // Active CTN on Existing BAN
      cellInfo(sheetName, "B5", order.agreementtype === "individual" ? "Yes" : "No"), // Create Individual Billing Accounts? (Y/N)
      cellInfo(sheetName, "B6", order.customerId?.contactname || "N/A"), // Sales Contact Name
      cellInfo(sheetName, "B7", order.customerId?.contactphone || "N/A"), // Sales Contact Phone #
      cellInfo(sheetName, "B8", order.imeiNumbers?.length || 0), // Number of Lines

      // Payment and Tax Information
      cellInfo(sheetName, "B10", order.paymentMethod || "N/A"), // One Time Payment Options (BTM or SEI)
      cellInfo(sheetName, "B11", order.isTaxExempt ? "Yes" : "No"), // Tax Exempt? (Y/N)
      cellInfo(sheetName, "B12", order.taxExemptNumber || "N/A"), // Customer ID (if SEI Or Tax Exempt)
      cellInfo(sheetName, "B13", order.promoCode || "N/A"), // Purchase Order # (if SEI, if applicable)
      cellInfo(sheetName, "B14", order.contractLength || "N/A"), // Contract Length

      // Shipping and Activation Information
      cellInfo(sheetName, "B16", order.bulkShipping ? "Yes" : "No"), // Bulk Shipping? (Y/N)
      cellInfo(sheetName, "B17", order.mobileShare ? "Yes" : "No"), // Mobile Share? (Y/N)
      cellInfo(sheetName, "B18", order.mobileShareCategory || "N/A"), // Mobile Share Category
      cellInfo(sheetName, "B19", order.waiveActivationFee ? "Yes" : "No"), // Waive Activation Fee? (Y/N)
      cellInfo(sheetName, "B20", order.dealerCode || "N/A"), // Dealer Code

      // Credit Card Information
      cellInfo(sheetName, "M6", order.customerId?.cardHolderName || "N/A"), // Customer Name
      cellInfo(sheetName, "M7", order.customerId?.contactname || "N/A"), // Contact Name
      cellInfo(sheetName, "M8", order.customerId?.cardBillingAddress || "N/A"), // Address
      cellInfo(sheetName, "M9", order.customerId?.shippingcity || "N/A"), // City
      cellInfo(sheetName, "M10", order.customerId?.shippingstate || "N/A"), // State, Zip
      cellInfo(sheetName, "M11", order.customerId?.contactphone || "N/A"), // Phone Number
      cellInfo(sheetName, "M12", order.bestTimeToCall || "N/A"), // Best Time To Call (include Time Zone)
      cellInfo(sheetName, "M13", order.customerId?.contactemail || "N/A"), // Email Address

      // Line Information
      cellInfo(sheetName, "M24", "TBA"), // Line # (TBA)
    ];

    const excelSheetTemplate = require("../../utils/excelSheetGenerator/newActivation/newActivation.json");
    return [...data, ...excelSheetTemplate];
  };

  const cellInfo = (sheetName, cell, content) => {
    return {
      sheetName: sheetName,
      address: cell,
      value: content,
      fontName: "Calibri",
      fontSize: 11,
      backgroundColor: null,
      alignment: null,
      columnWidth: 35.33203125,
      rowHeight: 27,
      border: {
        top: null,
        bottom: null,
        left: null,
        right: null,
      },
    };
  };

  return (
    <button onClick={handleExportToExcel} className="mb-4 px-3 py-2 bg-green-500 text-white rounded">
      Export to Excel
    </button>
  );
};

export default ExportToExcel;