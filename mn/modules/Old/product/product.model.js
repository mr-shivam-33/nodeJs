'use strict';
const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const productSchema = new Schema({
	userId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    productRating:{
        type:Number
    },
    productImage:{
        type:String    
    },
    productStatus:{
        type:Number
    },
    brandName:{
        type:String,
        required:true
    },
    manufacturer:{
        type:String,
        required:true
    },
    packagingType:{
        type:String,
        required:true
    },
    purchaseOrderNo:{
        type:String,
        required:true
    },
    purchaseOrderNoImg:{
        type:String    
    },
    batchLotNo:{
        type:String,
        required:true
    },
    manufacturDate:{
        type: Date, default: Date.now,
        required:true
    },
    expiryDate:{
        type: Date, default: Date.now,
        required:true
    }    
});

const getPackageSchema = new Schema({
    name:{type:String,required:true,unique: true, sparse: true},
    packageImg:{type:String,default:""},
    serialNumber:{type:Number,default:1},
    priceUSD:{type:Number,default:0.1},
    priceINR:{type:Number,default:0.31},
    priceUSDType:{type:String,default:"USD"},
    priceINRType:{type:String,default:"INR"},
    packageContent:{type:String,default:""},
    comboId:[{ type: Schema.Types.ObjectId }],
    status:{type:Number,default:1},
    createdDate:{type: Date, default: Date.now},
    updateDate:{type: Date, default: Date.now}
});

const getPackagingTypeSchema = new Schema({
    name:{type:String,required:true,unique: true, sparse: true},
    packageTypeImg:{type:String,default:""},
    packageTypeDesc:{type:String,default:""},
    status:{type:Number,default:1},
    createdDate:{type: Date, default: Date.now},
    updateDate:{type: Date, default: Date.now}
});


const getPackagingType = mongoose.model("getPackagingType", getPackagingTypeSchema, 'tbl_packagingType');
const getPackageModel = mongoose.model("getPackageModel", getPackageSchema, 'tbl_priceList');
const productModel = mongoose.model("productModel", productSchema, 'tbl_products');

// Exporting our model objects
module.exports = {productModel, getPackageModel, getPackagingType}
