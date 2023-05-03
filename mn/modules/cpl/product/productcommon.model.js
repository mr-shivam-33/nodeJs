'use strict';
const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const getCommonPackagingTypeSchema = new Schema({
    name:{type:String,required:true,unique: true, sparse: true},
    packageTypeImg:{type:String,default:""},
    packageTypeDesc:{type:String,default:""},
    status:{type:Number,default:1},
    createdDate:{type: Date, default: Date.now},
    updateDate:{type: Date, default: Date.now}
});


const getCommonPackagingType = mongoose.model("getCommonPackagingType", getCommonPackagingTypeSchema, 'tbl_packagingType');

// Exporting our model objects
module.exports = {getCommonPackagingType}


