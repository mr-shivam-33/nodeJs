const express = require("express");
const router = express.Router();
const packageController = require('./managepackage.controller');
let {managePackageSchema}  = require('./managepackage.model');
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
    const ManagePackage = db.model("managePackage", managePackageSchema, 'tbl_priceList');
    req.body.schema = [ManagePackage];
    next();
}

router.get("/list",headerCheck1,packageController.packagelist);
router.post("/add",headerCheck1,packageController.addPackage);
router.post("/edit",headerCheck1,packageController.editPackage);
router.post("/delete",headerCheck1,packageController.deletePackage);

module.exports = router;