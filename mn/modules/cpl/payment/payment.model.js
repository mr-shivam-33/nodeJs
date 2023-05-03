'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    amount: { type: String, required: true},
    tds: { type: Number, required: true },
    paymentMode: { type: String, required: true},
    paymentAmount: { type: Number, required: true },
    bankName: { type: String, required: true},
    transactionId: { type: String },
    chequeNo: { type: String},
    paymentDate: {type:Date, default:Date.now},    
    invoiceInfo: [{ type: Schema.Types.ObjectId }], 
    bankAccountNo: { type: String},
    companyName: { type: String},
    ifscCode: { type: String },
    accountType: { type: String },
    paymentStatus: { type: Number, default:1 }  
});

const BillingToSchema = new Schema({
    bankInfo: { type: Object },
    billingInfo: { type: Object },
    status: { type: Number, default:1}  
   
});

const generateUniqueSchema = new Schema({
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

const insertGenerateCodeToSchema = new Schema({
    productId: {type:Schema.Types.ObjectId,required:true},
    userId: {type:Schema.Types.ObjectId,required:true},
    fdalebelId: {type:Schema.Types.ObjectId,required:true},
    container: { type: Array },
    status:{type:Number,default:1}
});

const PaymentStatusUpdateSchema = new Schema({
    paymentStatus: { type: Number, required: true },
    generatedNftStatus : { type: Number },
    fdalebelId: {type:Schema.Types.ObjectId,required:true}
});

// const PaymentCreadit = mongoose.model("PaymentCreadit", paymentSchema, 'tbl_paymentDetails');
// const MainInfo = mongoose.model("mainInfo", BillingToSchema, 'tbl_mainUserInfo');
// const GenerateUnique = mongoose.model("generateUnique", generateUniqueSchema, 'tbl_fdalebelmetadata');
// const InsertNumber = mongoose.model("insertNumber", insertGenerateCodeToSchema, 'tbl_nftgeneratenumber');
// const PaymentStatusUpdate = mongoose.model("PaymentStatusUpdate", PaymentStatusUpdateSchema, 'tbl_order');

// Exporting our model objects

//module.exports = {PaymentCreadit, MainInfo,GenerateUnique,InsertNumber,PaymentStatusUpdate}

module.exports = {paymentSchema, BillingToSchema,generateUniqueSchema,insertGenerateCodeToSchema,PaymentStatusUpdateSchema}

