const express = require("express");
const router = express.Router();
var bodyParser = require('body-parser');

const invoiceController = require('./invoice.controller');
let { invoiceSchema, taxSchema,paymentSchema,BillingToSchema}  = require('./invoice.model');
const mongoose = require('mongoose');
const newConn = require("../../../db/DBCustomConnection");
const { async } = require('q');
let  Schema = mongoose.Schema;

const headerCheck1 = async (req, res, next) => {
    var typeData = "DB_"+req.headers['typedata'];
    let db = newConn.getDatabaseConnection(typeData);
    const OrderInfo = db.model("OrderInfo", invoiceSchema, 'tbl_order');
    const TaxInfo = db.model("TaxInfo", taxSchema, 'tbl_taxList');
    const PaymentInfo = db.model("PaymentInfo", paymentSchema, 'tbl_paymentDetails');
    const BillingInfo = db.model("BillingInfo", BillingToSchema, 'tbl_mainUserInfo');
    req.body.schema = [OrderInfo,TaxInfo,PaymentInfo,BillingInfo];
    next();
}


router.post("/invoiceList",headerCheck1,invoiceController.invoiceList);

router.post("/invoiceView",headerCheck1,invoiceController.invoiceView);

module.exports = router;