const express = require("express");
const router = express.Router();
const userinfoController = require('./userinfo.controller');
let {superPaymentSchema,superInvoiceSchema}  = require('./userinfocustom.model');
const mongoose = require('mongoose');
const newConn = require("../../../db/DBCustomConnection");
const { async } = require('q');
let  Schema = mongoose.Schema;

const headerCheck1 = async (req, res, next) => {
    var typeData = req.headers['typedata'];
    if (typeData == ''|| typeData == undefined) {
        res.json({ responseStatus: 0, responseMsgCode: "databaseName field is required", "responseData": {} })
        return false;
    }
    let db = newConn.getDatabaseConnection(typeData);
    const SuperPaymentInfo = db.model("superPaymentInfo", superPaymentSchema, 'tbl_paymentDetails');
    const SuperOrderInfo = db.model("SuperOrderInfo", superInvoiceSchema, 'tbl_order');
    req.body.schema = [SuperPaymentInfo,SuperOrderInfo];
    next();
}

router.get("/userlist",userinfoController.mainUserInfoList);
router.get("/paymentlist",headerCheck1,userinfoController.paymentInfoList);
router.post("/paymentstatus",headerCheck1,userinfoController.paymentStatusChange);
router.post("/userview",userinfoController.UserProfileView);


module.exports = router;