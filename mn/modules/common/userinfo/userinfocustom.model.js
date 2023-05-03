const mongoose = require('mongoose');
const  Schema = mongoose.Schema;
const superPaymentSchema = new Schema({
    amount: { type: String, required: true},
    tds: { type: Number, required: true },
    paymentMode: { type: String, required: true},
    paymentAmount: { type: Number, required: true },
    bankName: { type: String, required: true},
    transactionId: { type: Number, required: true },
    chequeNo: { type: String, required: true},
    paymentDate: { type: Number, required: true },    
    invoiceInfo: { type:Array },
    bankAccountNo: { type: String, required: true},
    companyName: { type: String, required: true},
    ifscCode: { type: String, required: true},
    paymentStatus:{ type: Number, required: true },
    accountType: { type: String, required: true}   
});
const superInvoiceSchema = new Schema({
    productId: { type: mongoose.Schema.Types.ObjectId },
    userId: { type: mongoose.Schema.Types.ObjectId },  
    invoiceNumber: { type: String },
    purchaseOrderNo: { type: Number, required: true },
    overDueDays: { type: String, required: true },
    dueDate: { type: String, required: true },
    paymentType: { type: String, required: true },
    paymentStatus: { type: Number, required: true },
    totalNfts: { type: String, required: true },
    totalPriceUSD: { type: Number, required: true },
    totalPriceINR: { type: Number, default:1 },
    generatedNftStatus:{ type: Number }    
});

// const SuperPaymentInfo = mongoose.model("superPaymentInfo", superPaymentSchema, 'tbl_paymentDetails');
// const SuperOrderInfo = mongoose.model("SuperOrderInfo", superInvoiceSchema, 'tbl_order');

module.exports = {superPaymentSchema,superInvoiceSchema}
