'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const informationNewSchema = new Schema({
    name: { type: String, default:"" },
    userAddress: { type: String, default:"" },
    ip_address: { type: String, default: "" },
    mobile: { type: Number, default: "" },
    memeberId: { type: String, default: "" },
    userId: { type: mongoose.Schema.Types.ObjectId, required:true },
    coOrdinates: { type: Object, default: "" },
    status: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = { informationNewSchema }