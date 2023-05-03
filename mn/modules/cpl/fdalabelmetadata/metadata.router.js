const express = require("express");
const router = express.Router();
const metadataController = require('./metadata.controller');

let {metaSchema, priceSchema, orderSchema, discountSchema, paymentModeSchema, ipfsSchema, ipfsUpdatedSchema}  = require('./metadata.model');
const { PaymentStatusUpdateSchema } = require("../payment/payment.model");
const { RegisterInfo }  = require('../../cpl/company/company.model');
const { User }  = require('../../common/user/user.model');
const mongoose = require('mongoose');
const newConn = require("../../../db/DBCustomConnection");
const { async } = require('q');
let  Schema = mongoose.Schema;

const auth = async (req, res, next) => {
    let typedata =  req.headers['typedata']
    let type =  req.headers['type']
    let getUserInfo  = await User.findOne({ 'userSlug': typedata },{"_id":1}).exec();
    let getVerifiedInfo  = await RegisterInfo.findOne({ userId: getUserInfo._id, 'userType': type },{"_id":0,"verified":1}).exec();
    if (getVerifiedInfo.verified != 1) {
        res.json({ responseStatus: 0, responseMsgCode: "Your Profile is not verified by admin", "responseData": {} })
        return false;
    } else {
        next();
    }
}

const headerCheck1 = async (req, res, next) => {
    var typeData = req.headers['typedata'];
    let db = newConn.getDatabaseConnection(typeData);
    const ipfsdata = db.model("ipfsdata", ipfsSchema, 'tbl_blockChainIpfsData');
    const ipfsUpdated = db.model("ipfsUpdated", ipfsUpdatedSchema, 'tbl_blockChainUpdatedIpfsData');
    const fdaMetaData = db.model("fdametadata", metaSchema, 'tbl_fdalebelmetadata');
    const priceList = db.model("priceList", priceSchema, 'tbl_priceList');
    const orderCreate = db.model("orderCreate", orderSchema, 'tbl_order');
    const paymentModeDetails = db.model("paymentModeDetails", paymentModeSchema, 'tbl_paymentModeDetails');
    const discountDetails = db.model("discountDetails", discountSchema, 'tbl_userDiscount');
    const PaymentStatusUpdate = db.model("PaymentStatusUpdate", PaymentStatusUpdateSchema, 'tbl_order');
    req.body.schema = [fdaMetaData, priceList, orderCreate, paymentModeDetails, discountDetails, ipfsdata, ipfsUpdated, PaymentStatusUpdate];
    next();
}

router.post("/addfdametadata", auth,  metadataController.addfdametadata);
router.post("/updatefdametadata", auth,  headerCheck1, metadataController.updatefdametadata);
router.post("/getfdametadata", auth,  headerCheck1, metadataController.getfdametadata);
router.post("/postIpfsData", auth,  headerCheck1, metadataController.ipfsdata);
router.post("/updateNftHashData", auth,  headerCheck1, metadataController.updateNftHashData);
router.post("/getProgressBar", auth,  metadataController.getProgressBar);


module.exports = router;