const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: String,
      required: true,
    },
    agreementtype: {
      type: String,
      enum: ["amb", "acda"],
    },
    eip: {
      type: String,
    },
    promotion: {
      type: String,
      enum: ["accepted", "expected"],
    },
    paperless: {
      type: String,
      enum: ["accepted", "declined"],
    },
    specialinstruction: {
      type: String,
    },
    businesslegalname: {
      type: String,
    },
    businessaddress: {
      type: String,
    },
    businesscity: {
      type: String,
    },
    businessstate: {
      type: String,
    },
    businesszip: {
      type: String,
    },
    taxid: {
      type: String,
    },
    contactname: {
      type: String,
    },
    contactphone: {
      type: String,
    },
    contactemail: {
      type: String,
    },
    locationid: {
      type: String,
    },
    billtomobile: {
      type: String,
      enum: ["yes", "no"],
    },
    creditcardpayment: {
      type: String,
      enum: ["yes", "no"],
    },
    singleormultiaddresshipment: {
      type: String,
      enum: ["yes", "no"],
    },
    attentionname: {
      type: String,
    },
    shippingaddress: {
      type: String,
    },
    shippingcity: {
      type: String,
    },
    shippingstate: {
      type: String,
    },
    shippingzip: {
      type: String,
    },
    currentwirelesscarrier: {
      type: String,
    },
    accountnumber: {
      type: String,
    },
    pinorpassword: {
      type: String,
    },
    ssnortaxid: {
      type: String,
    },
    billingname: {
      type: String,
    },
    billingaddress: {
      type: String,
    },
    billingcity: {
      type: String,
    },
    billingstate: {
      type: String,
    },
    billingzip: {
      type: String,
    },
    authorizedname: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("Order", OrderSchema);

module.exports = orderModel;
