const express = require("express");
const router = express.Router();
var bodyParser = require('body-parser');

const paidfeaturesController = require('./paidfeatures.controller');
let {paidFeaturesSchema}  = require('./paidfeatures.model');
let {informationNewSchema}  = require('./paidfeaturesNew.model');
const mongoose = require('mongoose');
const newConn = require("../../../db/DBCustomConnection");
const { async } = require('q');
let  Schema = mongoose.Schema;

const headerCheck1 = async (req, res, next) => {
    var typeData = "DB_"+req.headers['typedata'];
    let db = newConn.getDatabaseConnection(typeData);
    const paidFeaturesInfo = db.model("paidFeaturesInfo", paidFeaturesSchema, 'tbl_managerAndDistributerData');
    const informationData = db.model("informationNewData",informationNewSchema,"tbl_information");
    req.body.schema = [paidFeaturesInfo,informationData];
    next();
}


router.post("/managerAndDistributerData",headerCheck1,paidfeaturesController.managerAndDistributerData);
router.post("/ListManagerAndDistributerData",headerCheck1,paidfeaturesController.ListManagerAndDistributerData);
router.post("/deleteManagerAndDistributerData",headerCheck1,paidfeaturesController.deleteManagerAndDistributerData);
router.post("/eachManagerAndDistributerData",headerCheck1,paidfeaturesController.eachManagerAndDistributerData);

router.post("/editManagerAndDistributerData",headerCheck1,paidfeaturesController.editManagerAndDistributerData);

router.post("/information", headerCheck1, paidfeaturesController.information);
router.post("/infolist", headerCheck1, paidfeaturesController.infolist);

router.post("/countInfoList", headerCheck1, paidfeaturesController.countInfoList);

router.post("/getReportByCceId",headerCheck1,paidfeaturesController.getReportByCceId);

module.exports = router;