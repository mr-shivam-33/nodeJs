const express = require("express");
const router = express.Router();
var bodyParser = require('body-parser');
const paymentController = require('./payment.controller');
let {paymentSchema, BillingToSchema,generateUniqueSchema,insertGenerateCodeToSchema,PaymentStatusUpdateSchema} = require('./payment.model');
const mongoose = require('mongoose');
const newConn = require("../../../db/DBCustomConnection");
const { async } = require('q');

const headerCheck1 = async (req, res, next) => {
    var typeData = req.headers['typedata'];
    if (typeData == '' || typeData == undefined) {
        res.json({ responseStatus: 0, responseMsgCode: "databaseName field is required", "responseData": {} })
        return false;
    }
    let db = newConn.getDatabaseConnection(typeData);
    const PaymentCreadit = db.model("PaymentCreadit", paymentSchema, 'tbl_paymentDetails');
    const MainInfo = db.model("mainInfo", BillingToSchema, 'tbl_mainUserInfo');
    const GenerateUnique = db.model("generateUnique", generateUniqueSchema, 'tbl_fdalebelmetadata');
    const InsertNumber = db.model("insertNumber", insertGenerateCodeToSchema, 'tbl_nftgeneratenumber');
    const PaymentStatusUpdate = db.model("PaymentStatusUpdate", PaymentStatusUpdateSchema, 'tbl_order');
    req.body.schema = [PaymentCreadit, MainInfo, GenerateUnique, InsertNumber, PaymentStatusUpdate];
    next();
}

router.post("/creditpayment", headerCheck1, paymentController.creditPaymentDetails);
router.get("/acceptpayment", headerCheck1, paymentController.acceptPaymentInfo);
router.post("/generatenfts", headerCheck1, paymentController.createUniqueNumberByNfts);


module.exports = router;