'use strict';
const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const rfIdSchema = new Schema({
	timestamp: {type: Date, default:""},
    epc:{type:String,default:''},
    tid:{type:String,default:''},
    customcode : {type: String,default:''}, 
    serialno : {type: String,default:''},
    userdata : {type: String,default:''},
    reserved : {type: String,default:''},
	ant : {type: String,default:''},
	rssi : {type: String,default:''},
	count : {type: String,default:''},
	freq : {type: String,default:''},
	phase : {type: String,default:''},
	createdAt: {type: Date, default:Date.now},
    updatedAt:{type: Date, default:Date.now}
});

// const rfIdData = mongoose.model("rfIdData", rfIdSchema, 'tbl_rfIds');

// Exporting our model objects
module.exports = {rfIdSchema}


