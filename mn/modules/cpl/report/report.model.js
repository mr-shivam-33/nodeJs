'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    packagingDetails: { type: Array, required: true },
    statusBar: { type: Number, default: 1 },
    packagingStandard: { type: String, required: true },
    packagingStandardValue: { type: Object, default: {}}
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

  const sapSchema = new Schema({
    fdaId: { type: String},
    ManufacturerAddress: { type: String},
    BatchNumber: { type: String},
    BrandName: { type: String},
    Error1: { type: String},
    DateOfExpiry: { type: String},
    GTIN: { type: String},
    IText: { type: String},
    ManufacturerLicenceNo: { type: String },
    ManufacturerName: { type: String},
    DateOfManufacture: {type: String},
    MaterialNumber: {type: String},
    MeasurementUnit: {type: String},
    ProducedBatchQty: {type: String},
    Plant: {type: String},
    ProductName: {type: String},
    StorageCondition: {type: String},
    status: { type: Number, default: 1 },
    
  });
module.exports = {ipfsUpdatedSchema, productSchema, printerAppNewSchema, sapSchema }

