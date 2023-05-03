const express = require("express");
const router = express.Router();
const metadataController = require('./metadata.controller');


let {metaSchema, priceSchema, orderSchema, discountSchema, paymentModeSchema, ipfsSchema, ipfsUpdatedSchema}  = require('../fdalabelmetadata/metadata.model');
const { PaymentStatusUpdateSchema } = require("../payment/payment.model");
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
    const ipfsdata = db.model("ipfsdata", ipfsSchema, 'tbl_blockChainIpfsData');
    const fdaMetaData = db.model("fdametadata", metaSchema, 'tbl_fdalebelmetadata');
    const priceList = db.model("priceList", priceSchema, 'tbl_priceList');
    const orderCreate = db.model("orderCreate", orderSchema, 'tbl_order');
    const paymentModeDetails = db.model("paymentModeDetails", paymentModeSchema, 'tbl_paymentModeDetails');
    const discountDetails = db.model("discountDetails", discountSchema, 'tbl_userDiscount');
    const ipfsUpdated = db.model("ipfsUpdated", ipfsUpdatedSchema, 'tbl_blockChainUpdatedIpfsData');
    const PaymentStatusUpdate = db.model("PaymentStatusUpdate", PaymentStatusUpdateSchema, 'tbl_order');
    req.body.schema = [fdaMetaData, priceList, orderCreate, paymentModeDetails, discountDetails, ipfsdata, ipfsUpdated, PaymentStatusUpdate];
    next();
}

router.post("/addfdametadata", headerCheck1, metadataController.addfdametadata);
router.post("/updatefdametadata", headerCheck1, metadataController.updatefdametadata);
router.post("/getfdametadata", headerCheck1, metadataController.getfdametadata);
router.post("/postIpfsData", headerCheck1, metadataController.ipfsdata);
router.post("/updateNftHashData", headerCheck1, metadataController.updateNftHashData);
router.post("/getProgressBar", headerCheck1, metadataController.getProgressBar);
router.post("/selfUpdate", headerCheck1, metadataController.selfUpdate);
router.post("/dummyIpfsdata", headerCheck1, metadataController.dummyIpfsdata);
router.post("/createNftsdataNew", headerCheck1, metadataController.createNftsdataNew);


module.exports = router;