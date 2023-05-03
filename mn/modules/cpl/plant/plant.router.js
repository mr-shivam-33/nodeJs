const express = require("express");
const router = express.Router();
const { plantSchema } = require('./plant.model');
const printerController = require('./plant.controller');
let { ipfsUpdatedVerifySchema } = require("../nfts/nft.model");
const mongoose = require('mongoose');
const newConn = require("../../../db/DBCustomConnection");
const { async } = require('q');
let  Schema = mongoose.Schema;


const headerCheck1 = async (req, res, next) => {
    var typeData = "DB_"+req.headers['typedata'];
    let db = newConn.getDatabaseConnection(typeData);
    const plant = db.model("plant", plantSchema, "tbl_plant");       
    const ipfsUpdated = db.model("ipfsUpdated", ipfsUpdatedVerifySchema, "tbl_blockChainUpdatedIpfsData");
    req.body.schema = [plant,ipfsUpdated];
    next();
}

const headerCheck2 = async (req, res, next) => {
    var typeData = "DB_"+req.headers['typedata'];
    let db = newConn.getDatabaseConnection(typeData);
    const plant = db.model("plant", plantSchema, "tbl_plant");       
    const ipfsUpdated = db.model("ipfsUpdated", ipfsUpdatedVerifySchema, "tbl_blockChainUpdatedIpfsData");
    req.query.schema = [plant, ipfsUpdated];
    next();
}


router.post("/addPlant", headerCheck1, printerController.addPlant);
router.post("/getPlantDetails", headerCheck1, printerController.getPlantDetails);
router.post("/updatePlantDetails", headerCheck1, printerController.updatePlantDetails);
router.post("/deletePlant", headerCheck1, printerController.deletePlant);

module.exports = router;