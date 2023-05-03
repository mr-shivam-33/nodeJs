"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  companyUserId: { type: String, default: "" },
  productName: { type: String, required: true },
  garbagePercentage: { type: String, required: true },
  productRating: { type: Number, default: "" },
  productImage: { type: String, default: "" },
  productStatus: { type: Number, default: 1 },
  brandName: { type: String, required: true },
  manufacturer: { type: String, required: true },
  packagingType: { type: String, required: true },
  packagingTypeImg: { type: String, default: "" },
  productCode: { type: String, default: "" },
  packagingDetails: { type: Array, required: true },
  statusBar: { type: Number, default: 1 },
  packagingStandard: { type: String, required: true },
  packagingStandardValue: { type: Object, default: {} },
});

const getPackageSchema = new Schema({
  name: { type: String, required: true, unique: true, sparse: true },
  packageImg: { type: String, default: "" },
  serialNumber: { type: Number, default: 1 },
  priceUSD: { type: Number, default: 0.1 },
  priceINR: { type: Number, default: 0.31 },
  priceUSDType: { type: String, default: "USD" },
  priceINRType: { type: String, default: "INR" },
  packageContent: { type: String, default: "" },
  comboId: [{ type: Schema.Types.ObjectId }],
  status: { type: Number, default: 1 },
  createdDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});

const getPackagingTypeSchema = new Schema({
  name: { type: String, required: true, unique: true, sparse: true },
  packageTypeImg: { type: String, default: "" },
  packageTypeDesc: { type: String, default: "" },
  status: { type: Number, default: 1 },
  createdDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});

module.exports = { getPackageSchema, productSchema, getPackagingTypeSchema };
