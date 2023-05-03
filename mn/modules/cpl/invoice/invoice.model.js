'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const invoiceSchema = new Schema({
    productId: { type: mongoose.Schema.Types.ObjectId },
    userId: { type: mongoose.Schema.Types.ObjectId },  
    invoiceNumber: { type: String },
    purchaseOrderNo: { type: Number, required: true },
    overDueDays: { type: String, required: true },
    dueDate: { type: String, required: true },
    paymentType: { type: String, required: true },
    paymentStatus: { type: Number, required: true },
    fdaIpfsData: {type:Array,required:true},
	totalNfts: { type: String, required: true },
	totalPriceUSD: { type: Number, required: true },
    totalPriceINR: { type: Number, default:1 },
    generatedNftStatus:{ type: Number }    
});

const taxSchema = new Schema({
    type: { type: String, required: true},
    value: { type: Number, required: true }          
});

const paymentSchema = new Schema({
    amount: { type: String, required: true},
    tds: { type: Number, required: true },
    paymentMode: { type: String, required: true},
    paymentAmount: { type: Number, required: true },
    bankName: { type: String, required: true},
    transactionId: { type: Number, required: true },
    chequeNo: { type: String, required: true},
    paymentDate: { type: Number, required: true },    
    invoiceInfo: { type: Number, required: true },
    bankAccountNo: { type: String, required: true},
    companyName: { type: String, required: true},
    ifscCode: { type: String, required: true},
    accountType: { type: String, required: true}   
});

const BillingToSchema = new Schema({
    bankInfo: { type: Object },
    billingInfo: { type: Object },
    status: { type: Number, default:1}  
   
});



// const OrderInfo = mongoose.model("OrderInfo", invoiceSchema, 'tbl_order');
// const TaxInfo = mongoose.model("TaxInfo", taxSchema, 'tbl_taxList');
// const PaymentInfo = mongoose.model("PaymentInfo", paymentSchema, 'tbl_paymentDetails');
// const BillingInfo = mongoose.model("BillingInfo", BillingToSchema, 'tbl_mainUserInfo');

// Exporting our model objects
// module.exports = { OrderInfo, TaxInfo,PaymentInfo,BillingInfo}
module.exports = { invoiceSchema, taxSchema,paymentSchema,BillingToSchema}