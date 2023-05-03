'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const printerSAPSchema = new Schema({
    userId:{type:Schema.Types.ObjectId,required:true},
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
    status: { type: Number, default: "" },
    createdDate:{type: Date, default: Date.now},
    updateDate:{type: Date, default: Date.now}
    
  });

  module.exports = { printerSAPSchema }