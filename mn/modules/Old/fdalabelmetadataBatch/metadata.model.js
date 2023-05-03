'use strict';
const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const metaSchema = new Schema({
    productId:{type:Schema.Types.ObjectId,required:true},
    userId:{type:Schema.Types.ObjectId,required:true},
    container:{type:Array,default:[]},
    pallets:{type:Array,default:[]},
    masterCartons:{type:Array,default:[]},
    innerCartons:{type:Array,default:[]},
    drugs:{type:Array,default:[]},
    status:{type:String,default:1},
    totalNfts:{type:String,required:true},
    packageType:{type:String,required:true},
    totalPriceUSD:{type:Number,required:true},
    totalPriceINR:{type:Number,required:true},
    flatDiscount:{type:Number,default:0},
    createdDate:{type: Date, default: Date.now},
    updateDate:{type: Date, default: Date.now}
});


const priceSchema = new Schema({
    name:{type:String,required:true},
    serialNumber:{type:Number,required:true},
    priceUSD:{type:Number,required:true},
    priceINR:{type:Number,required:true},
    status:{type:String,default:1},
    createdDate:{type: Date, default: Date.now},
    updateDate:{type: Date, default: Date.now}
});

const orderSchema = new Schema({
	productId:{type:Schema.Types.ObjectId,required:true},
	userId:{type:Schema.Types.ObjectId,required:true},
	fdalebelId:{type:Schema.Types.ObjectId,required:true},
    invoiceNumber:{type:String,required:true},
    purchaseOrderNo:{type:Number,required:true},
    overDueDays:{type:String,required:true},
    dueDate:{type:Date,required:true},
    paymentType:{type:String,required:true},
    paymentStatus:{type:Number},
    totalNfts:{type:String,required:true},
    totalPriceUSD:{type:Number,required:true},
    totalPriceINR:{type:Number,required:true},
    generatedNftStatus:{type:Number,default:0},
    flatDiscount:{type:Number,default:0},
    priceUSDType:{type:String,required:true},
    priceINRType:{type:String,required:true},
    createdDate:{type: Date, default: Date.now},
    updateDate:{type: Date, default: Date.now}  
});

const discountSchema = new Schema({
	userId:{type:Schema.Types.ObjectId,required:true},
	flatDiscount:{type:Number,default:0},
	persentageDiscount:{type:Number,required:true},
    createdDate:{type: Date, default: Date.now},
    updateDate:{type: Date, default: Date.now}  
});

const paymentModeSchema = new Schema({
    overDueDays:{type:String,default:0},
    dueDate:{type:String,default:0},
    paymentType:{type:String,default:'cash'}
});

const ipfsSchema = new Schema({
	userId:{type:Schema.Types.ObjectId,required:true},
	ipfsHash:{type:String},
    nftTokenId:{type:String, default:""},
    nftBurnByUserId:{type:String, default:""},
    nftSaveUserId:{type:String, default:""},
    nftSaveUserIdDate:{type: Date, default: Date.now},
    nftTransactionHash:{type:String, default:""},
	fdaId:{type:Schema.Types.ObjectId,required:true},
	userType:{type:String},
	data:{type:Object,default:{}},
	status:{type:Number,default:1},
    createdDate:{type: Date, default: Date.now},
    updateDate:{type: Date, default: Date.now}  
});

const ipfsdata = mongoose.model("ipfsdata", ipfsSchema, 'tbl_blockChainIpfsData');
const fdaMetaData = mongoose.model("fdametadata", metaSchema, 'tbl_fdalebelmetadata');
const priceList = mongoose.model("priceList", priceSchema, 'tbl_priceList');
const orderCreate = mongoose.model("orderCreate", orderSchema, 'tbl_order');
const paymentModeDetails = mongoose.model("paymentModeDetails", paymentModeSchema, 'tbl_paymentModeDetails');
const discountDetails = mongoose.model("discountDetails", discountSchema, 'tbl_userDiscount');

// Exporting our model objects
module.exports = {fdaMetaData, priceList, orderCreate, paymentModeDetails, discountDetails, ipfsdata}