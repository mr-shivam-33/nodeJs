"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plantSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  plantName: { type: String, required: true },
  plantCode: { type: String, required: true },
  address: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  contactNo: { type: String, required: true },
  pincode: { type: String, required: true },
  status: { type: String, default: 1 },
  createdDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});

module.exports = { plantSchema };
