const express = require("express");
const router = express.Router();
var bodyParser = require('body-parser');
const packageController = require('./package.controller');

let {packageSchema}  = require('./package.model');
const mongoose = require('mongoose');
let  Schema = mongoose.Schema;
const newConn = require("../../../db/DBCustomConnection");
const headerCheck1 = async (req, res, next) => {
    var typeData = req.headers['typedata'];
    if (typeData == ''|| typeData == undefined) {
        res.json({ responseStatus: 0, responseMsgCode: "databaseName field is required", "responseData": {} })
        return false;
    }
    let db = newConn.getDatabaseConnection(typeData);   
    const packageModel = db.model("packageModel", packageSchema, 'tbl_packages');
    req.body.schema = [packageModel];
    next();
}
router.post("/packageList",headerCheck1,packageController.packageList);

module.exports = router;