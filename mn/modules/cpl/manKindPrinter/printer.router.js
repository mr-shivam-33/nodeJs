const express = require("express");
const router = express.Router();
const { printerSAPSchema } = require('./printer.model');
const printerController = require('./printer.controller');
let { ipfsUpdatedVerifySchema } = require("../nfts/nft.model");
const mongoose = require('mongoose');
const newConn = require("../../../db/DBCustomConnection");
const { async } = require('q');
let  Schema = mongoose.Schema;

const headerCheck1 = async (req, res, next) => {
    var typeData = "DB_"+req.headers['typedata'];
    let db = newConn.getDatabaseConnection(typeData);
    const printerApp = db.model("printerApp", printerSAPSchema, "printerSAP");       
    const ipfsUpdated = db.model("ipfsUpdated", ipfsUpdatedVerifySchema, "tbl_blockChainUpdatedIpfsData");
    req.body.schema = [printerApp,ipfsUpdated];
    next();
}

const headerCheck2 = async (req, res, next) => {
  var typeData = "DB_"+req.headers['typedata'];
  let db = newConn.getDatabaseConnection(typeData);
  const printerApp = db.model("printerApp", printerSAPSchema, "printerSAP");       
  const ipfsUpdated = db.model("ipfsUpdated", ipfsUpdatedVerifySchema, "tbl_blockChainUpdatedIpfsData");
  req.query.schema = [printerApp, ipfsUpdated];
  next();
}



router.post("/printerSAPData", headerCheck1, printerController.printerSAPData);
router.post("/printerQR", headerCheck1, printerController.printerQR);
router.get("/getSAPData", headerCheck2, printerController.getSAPData);
router.post("/updateQrScannerStatus", headerCheck1, printerController.updateQrScannerStatus);
router.post("/getQRCode", headerCheck1, printerController.getQRCode);

module.exports = router;