const express = require("express");
const router = express.Router();
const authenticationController = require('./authentication.controller');


let { customUserInfoSchema,customCompanyInfoSchema } = require('./authenticationcustom.model');
let {metaSchema, priceSchema, orderSchema, discountSchema, paymentModeSchema, ipfsSchema, ipfsUpdatedSchema}  = require('../../cpl/fdalabelmetadata/metadata.model');

const mongoose = require('mongoose');
const newConn = require("../../../db/DBCustomConnection");
const { async } = require('q');
let  Schema = mongoose.Schema;

const headerCheck1 = async (req, res, next) => {
    var typeData = "DB_"+req.headers['typedata'];
    if (req.headers['typedata'] == '' || req.headers['typedata'] == undefined) {
        res.json({ responseStatus: 0, responseMsgCode: "databaseName field is required", "responseData": {} })
        return false;
    }
	console.log('typeData................',req.headers['typedata']);
   
   
    let db1 = newConn.getDatabaseConnection(typeData);
    const customCompanyInfo = db1.model("customCompanyInfo", customCompanyInfoSchema, 'tbl_company_info');
    const customUserInfo = db1.model("customUserInfo", customUserInfoSchema, 'tbl_user');
    const priceList = db1.model("priceList", priceSchema, 'tbl_priceList');
    const paymentModeDetails = db1.model("paymentModeDetails", paymentModeSchema, 'tbl_paymentModeDetails');
    req.body.schema = [customCompanyInfo,customUserInfo];
    req.body.insertSchema = [priceList,paymentModeDetails];
    // const getPackagingType = db.model("getPackagingType", getPackagingTypeSchema, 'tbl_packagingType');
    // const getPackageModel = db.model("getPackageModel", getPackageSchema, 'tbl_priceList');
    // const productModel = db.model("productModel", productSchema, 'tbl_products');
    // req.body.schema = [getPackagingType,getPackageModel,productModel];
    next();
}

router.post("/userVerify", headerCheck1, authenticationController.userVerify);
router.post("/userprofilelist",authenticationController.userprofilelist);
router.post("/checkUserVerify",authenticationController.checkUserVerify);


module.exports = router;