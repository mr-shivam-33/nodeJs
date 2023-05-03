const express = require("express");
const router = express.Router();

const offerController = require('./offers.controller');

let { offerSchema } = require('./offers.model');
const mongoose = require('mongoose');
const newConn = require("../../../db/DBCustomConnection");
const { async } = require('q');
let Schema = mongoose.Schema;

const headerCheck1 = async (req, res, next) => {
    var typeData = req.headers['typedata'];
    if (typeData == '' || typeData == undefined) {
        res.json({ responseStatus: 0, responseMsgCode: "databaseName field is required", "responseData": {} })
        return false;
    }
    let db = newConn.getDatabaseConnection(typeData);
    const OffersData = db.model('offersData', offerSchema, 'tbl_offerData');
    req.body.schema = [OffersData];
    next();
}

router.post("/addOffer", headerCheck1, offerController.addOffer);
router.get("/listOffer", headerCheck1, offerController.listOffer);
router.post("/updateOffer", headerCheck1, offerController.updateOffer);
router.post("/deleteOffer", headerCheck1, offerController.deleteOffer);

module.exports = router;