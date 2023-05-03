const express = require("express");
const router = express.Router();
const productinfoController = require('./productinfo.controller');


router.post("/getProductInfo",productinfoController.getProductInfo);


module.exports = router;