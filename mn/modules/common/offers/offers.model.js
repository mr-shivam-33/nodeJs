'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = new Schema({
    offerTitle: { type: String, required: true },
    validFrom: { type: Date, required: true },
    validTo: { type: Date, required: true  },
    offerType: { type: String },
    offerValue: { type: String },
    status: { type: Number, default: 1},
    createdDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now }
});

// const OffersData = mongoose.model('offersData', offerSchema, 'tbl_offerData');
// module.exports = OffersData;

module.exports = offerSchema;