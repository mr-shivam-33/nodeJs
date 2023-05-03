const express = require("express");
const router = express.Router();
const { ipfsUpdatedSchema, productSchema, printerAppNewSchema, sapSchema } = require('./report.model');
const reportController = require('./report.controller');
const mongoose = require('mongoose');
const newConn = require("../../../db/DBCustomConnection");
const { async } = require('q');
let  Schema = mongoose.Schema;

const headerCheck1 = async (req, res, next) => {
    var typeData = "DB_"+req.headers['typedata'];
    let db = newConn.getDatabaseConnection(typeData);
    const qrgenerateInfo = db.model("qrgenerateInfo", ipfsUpdatedSchema, 'tbl_blockChainUpdatedIpfsData');
    const productInfo = db.model("productInfo", productSchema, 'tbl_products'); 
    const printInfo = db.model("printInfo", printerAppNewSchema, 'tbl_printerNewData');         
    req.body.schema = [qrgenerateInfo,productInfo, printInfo];
    next();
}
const headerCheck2 = async (req, res, next) => {
    var typeData = "DB_"+req.headers['typedata'];
    let db = newConn.getDatabaseConnection(typeData);
    const qrgenerateInfo = db.model("qrgenerateInfo", ipfsUpdatedSchema, 'tbl_blockChainUpdatedIpfsData');
    const productInfo = db.model("productInfo", productSchema, 'tbl_products'); 
    const printInfo = db.model("printInfo", printerAppNewSchema, 'tbl_printerNewData');         
    req.query.schema = [qrgenerateInfo,productInfo, printInfo];
    next();
}

const headerCheckSAp = async (req, res, next) => {
    var typeData = "DB_"+req.headers['typedata'];
    let db = newConn.getDatabaseConnection(typeData);
    const qrgenerateInfo = db.model("qrgenerateInfo", ipfsUpdatedSchema, 'tbl_blockChainUpdatedIpfsData');    
    const sapInfo = db.model("sapInfo", sapSchema, 'printerSAP');         
    req.body.schema = [qrgenerateInfo,sapInfo];
    next();
}

router.post("/reportlist", headerCheck1, reportController.reportlist);
router.post("/productlist", headerCheck1, reportController.productlist);
router.post("/sourcelist", headerCheck1, reportController.sourcelist);
router.get("/qrscanlist", headerCheck2, reportController.qrscanlist);


router.post("/reportmklist", headerCheckSAp, reportController.reportmklist);


module.exports = router;