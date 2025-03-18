import React, {useState} from "react";
import ExcelJS from "exceljs";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ExportToExcel = ({order}) => {
    const [data, setData] = useState([]);
    const [headers, setHeaders] = useState([]);

    const handleExportToExcel = async () => {
        try {
            if (!order || Object.keys(order).length === 0) {
                alert('No data to export!');
                return;
            }

            const workbook = new ExcelJS.Workbook();
            let allSheetsData = [
                {
                    sheetName: "SP General Info (VID)",
                    tabColor: "FFFF0000",
                    data: handleSpGeneralInfoCellData(order),
                    mergedCells: require('../../utils/excelSheetGenerator/spGeneralInfo/spGeneralInfoMergedCells.json')
                },
                {
                    sheetName: "New Activation",
                    tabColor: null,
                    data: handleNewActivationData(order) ,
                    mergedCells: require('../../utils/excelSheetGenerator/newActivation/newActivationMergedCells.json')
                }
            ]

            allSheetsData.forEach(sheet => {
                const newWorksheet = workbook.addWorksheet(sheet.sheetName);

                if (sheet.tabColor) {
                    newWorksheet.properties.tabColor = { argb: sheet.tabColor };
                }

                sheet.data.forEach(cellInfo => {
                    const { address, value, fontName, fontSize, bold, italic, fontColor, backgroundColor, alignment, columnWidth, rowHeight, border } = cellInfo;

                    let cell = newWorksheet.getCell(address);
                    cell.value = value;

                    if (fontName || fontSize || bold !== undefined || italic !== undefined || fontColor) {
                        cell.font = {
                            name: fontName || 'Arial',
                            size: fontSize || 12,
                            bold: bold || false,
                            italic: italic || false,
                            color: fontColor ? { argb: fontColor } : undefined
                        };
                    }

                    if (backgroundColor) {
                        cell.fill = {
                            type: 'pattern',
                            pattern: 'solid',
                            fgColor: { argb: backgroundColor }
                        };
                    }

                    if (alignment) {
                        cell.alignment = { horizontal: alignment };
                    }

                    if (columnWidth) {
                        newWorksheet.getColumn(address.replace(/[0-9]/g, '')).width = columnWidth;
                    }

                    if (rowHeight) {
                        newWorksheet.getRow(parseInt(address.replace(/[A-Z]/g, ''), 10)).height = rowHeight;
                    }

                    if (border) {
                        cell.border = {
                            top: border.top ? { style: border.top.style, color: border.top.color ? { argb: border.top.color } : undefined } : undefined,
                            bottom: border.bottom ? { style: border.bottom.style, color: border.bottom.color ? { argb: border.bottom.color } : undefined } : undefined,
                            left: border.left ? { style: border.left.style, color: border.left.color ? { argb: border.left.color } : undefined } : undefined,
                            right: border.right ? { style: border.right.style, color: border.right.color ? { argb: border.right.color } : undefined } : undefined
                        };
                    }
                });

                const mergedRanges = new Set();
                sheet.mergedCells.forEach(mergeInfo => {
                    if (!mergedRanges.has(mergeInfo.range)) {
                        newWorksheet.mergeCells(mergeInfo.range);
                        newWorksheet.getCell(mergeInfo.startAddress).value = mergeInfo.value;
                        mergedRanges.add(mergeInfo.range);
                    }
                });

                if (sheet.sheetName === "New Activation") {
                    const imageId = workbook.addImage({
                        filename: '../../assets/images/attLogo.png',
                        extension: 'png',
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
            console.error('Error exporting to Excel:', error);
            alert(`Error exporting to Excel: ${error.message}`);
        }
    };


    const handleSpGeneralInfoCellData = (order) => {
        const sheetName = 'SP General Info (VID)';
        let data = [
            /** TODO
            Solution Provider Submitter's Name *
            Solution Provider Submitter's ATTUID (as listed in Webphone) *
            Solution Provider Number (SPID)*
            Solution Provider Company Name*
            Solution Provider Dealer Code*
            Solution Provider Contact Email*
            Solution Provider Contact Number
            AT&T Channel Manager's Name
            */
            cellInfo(sheetName, "B11", order.customerId?.businesslegalname),  // Customer Business Name
            cellInfo(sheetName, "B12", order.customerId?.contactname),  // Customer Contact Name (authorized - on behalf of)
            cellInfo(sheetName, "B13", order.customerId?.contactemail), // Customer Contact Email
            cellInfo(sheetName, "B14", order.customerId?.contactemail), // Customer Contact Email

            /** TODO
            FAN Name
            FAN (Foundation Account Number)
            BAN (Billing Account Number)
            Type of request
            # of Mobile Numbers impacted
            Special Instructions
            */
        ];

        const excelSheetTemplate = require('../../utils/excelSheetGenerator/spGeneralInfo/spGeneralInfo.json');

        return [...data, ...excelSheetTemplate];
    }

    const handleNewActivationData = (order) => {
        const sheetName = 'New Activation';
        let data = [
            /** TODO
             Company Name:
             Foundation Account Number:
             Active CTN on Existing BAN:
             Create Individual Billing Accounts? (Y/N)
             Sales Contact Name:
             Sales Contact Phone #:
             Number of Lines:
             One Time Payment Options (BTM or SEI):
             Tax Exempt? (Y/N)
             Customer ID (if SEI Or Tax Exempt)
             Purchase Order # (if SEI, if applicable)
             Contract Length
             Bulk Shipping? (Y/N)
             Mobile Share? (Y/N)
             Mobile Share Category
             Waive Activation Fee? (Y/N)
             Dealer Code

             Installment Length (J7)
             Credit card Information (M6:M17)
                 Customer Name*
                 Contact Name*
                 Address
                 Address
                 City
                 State, Zip
                 Phone Number*
                 Best Time To Call (include Time Zone)*
                 eMail Address
                 Customer Name

             Line # (M24)
                TBA
             */
        ];

        const excelSheetTemplate = require('../../utils/excelSheetGenerator/newActivation/newActivation.json');

        return [...data, ...excelSheetTemplate];
    }

    const cellInfo = (sheetName, cell, content) => {
        return {
            "sheetName": "SP General Info (VID)",
            "address": cell,
            "value": content,
            "fontName": "Calibri",
            "fontSize": 11,
            "backgroundColor": null,
            "alignment": null,
            "columnWidth": 35.33203125,
            "rowHeight": 27,
            "border": {
                "top": null,
                "bottom": null,
                "left": null,
                "right": null
            }
        }
    }


    return (
        <>
            <button
                onClick={handleExportToExcel}
                className="mb-4 px-3 py-2 bg-green-500 text-white rounded"
            >
                Export to Excel
            </button>
        </>
    )
}

export default ExportToExcel;