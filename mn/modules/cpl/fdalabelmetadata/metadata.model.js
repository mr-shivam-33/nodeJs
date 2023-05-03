"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const metaSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, required: true },
  productCode: { type: String,default:"" },
  userId: { type: Schema.Types.ObjectId, required: true },
  containers: { type: Array, default: [] },
  pallets: { type: Array, default: [] },
  masterCartons: { type: Array, default: [] },
  innerCartons: { type: Array, default: [] },
  product: { type: Array, default: [] },
  status: { type: String, default: 1 },
  totalNfts: { type: String, required: true },

  batchLotNo: { type: String, required: true },
  manufacturDate: { type: String, required: true },
  expiryDate: { type: String, required: true },
  purchaseOrderNo: { type: String, required: true },
  subscriptionPackage: { type: String, required: true },
  packagingStandard: { type: String, required: true },
  packagingStandardValue: { type: Object },

  packageType: { type: String, required: true },
  totalPriceUSD: { type: Number, required: true },
  totalPriceINR: { type: Number, required: true },
  packagingDetails: { type: Array, required: true },
  flatDiscount: { type: Number, default: 0 },
  createdDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});

const priceSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  name: { type: String, required: true },
  productId: { type: Schema.Types.ObjectId, required: true },
  serialNumber: { type: Number, required: true },
  priceUSD: { type: Number, required: true },
  priceINR: { type: Number, required: true },
  priceType: { type: String, default: "" },
  status: { type: Number, default: 1 },
  createdDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});

const orderSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, required: true },
  userId: { type: Schema.Types.ObjectId, required: true },
  fdalebelId: { type: Schema.Types.ObjectId, required: true },
  invoiceNumber: { type: String, required: true },
  purchaseOrderNo: { type: Number, required: true },
  overDueDays: { type: String, required: true },
  dueDate: { type: Date, required: true },
  paymentType: { type: String, required: true },
  paymentStatus: { type: Number },
  totalNfts: { type: String, required: true },
  totalPriceUSD: { type: Number, required: true },
  totalPriceINR: { type: Number, required: true },
  generatedNftStatus: { type: Number, default: 0 },
  flatDiscount: { type: Number, default: 0 },
  priceUSDType: { type: String },
  priceINRType: { type: String },
  createdDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});

const discountSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  flatDiscount: { type: Number, default: 0 },
  persentageDiscount: { type: Number, required: true },
  createdDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});

const paymentModeSchema = new Schema({
  overDueDays: { type: String, default: 0 },
  dueDate: { type: String, default: 0 },
  paymentType: { type: String, default: "cash" },
  status: { type: Number, default: 1 },
});

const ipfsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  ipfsHash: { type: String },
  nftTokenId: { type: String, default: "" },
  nftBurnByUserId: { type: String, default: "" },
  nftSaveUserId: { type: String, default: "" },
  nftSaveUserIdDate: { type: Date, default: "" },
  nftTransactionHash: { type: String, default: "" },
  nftTransactionError: { type: String, default: "" },
  fdaId: { type: Schema.Types.ObjectId, required: true },
  userType: { type: String },
  data: { type: Object, default: {} },
  packagingDetails: { type: Array, required: true },
  status: { type: Number, default: 1 },
  createdDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});

const ipfsUpdatedSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  ipfsHash: { type: String },
  nftTokenId: { type: String, default: "" },
  nftBurnByUserId: { type: String, default: "" },
  nftSaveUserId: { type: String, default: "" },
  nftSaveUserIdDate: { type: Date, default: "" },
  nftTransactionHash: { type: String, default: "" },
  nftTransactionError: { type: String, default: "" },
  fdaId: { type: Schema.Types.ObjectId, required: true },
  nftSaveLocation: { type: { type: String }, coordinates: [Number] },
  userType: { type: String },
  data: { type: Object, default: {} },
  status: { type: Number, default: 1 },
  createdDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});

ipfsUpdatedSchema.index({ nftSaveLocation: "2dsphere" });

const printerAppNewSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  deliveryIntentNo: { type: String },
  deliveryIntentDate: { type: Date, default: Date.now },
  destination: { type: String },
  weekNo: { type: String },
  batchNo: { type: String },
  manufacturingDate: { type: Date, default: Date.now },
  productDetails: { type: Array, default: [] },
  source: { type: String, default: "" },
  status: { type: Number, default: 1 },
  createdDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});

// Exporting our model objects
// module.exports = {fdaMetaData, priceList, orderCreate, paymentModeDetails, discountDetails, ipfsdata, ipfsUpdated}
module.exports = {
  metaSchema,
  priceSchema,
  orderSchema,
  discountSchema,
  paymentModeSchema,
  ipfsSchema,
  ipfsUpdatedSchema,
  printerAppNewSchema,
};
