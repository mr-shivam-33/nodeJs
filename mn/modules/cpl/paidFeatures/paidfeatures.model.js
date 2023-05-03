'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const paidFeaturesSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId,required:true },
    name: { type: String, default:"" },
    mobile: { type: String, default:"" },
    zone: { type: String, default:"" },
    state: { type: String, default:"" },
    ao: { type: String, default:"" },
    disrtricts: { type: String, default:"" },
    placeOfPosting: { type: String, default:"" },
    role: { type: String, default:"" },
    // dob: { type: String, default:"" },
    // gender: { type: String, default:"" },
    // city: { type: String, default:"" },
    type: { type: String, default:1 },
    areaManagerId: { type: String, default:"" },
    status: { type: String, default:0 },
    createdDate:{type: Date, default: Date.now},
    updateDate:{type: Date, default: Date.now}
});

module.exports = { paidFeaturesSchema }