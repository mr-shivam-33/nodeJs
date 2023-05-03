const express = require("express");
const router = express.Router();
var bodyParser = require('body-parser');

const invoiceController = require('./invoice.controller');

router.post("/invoiceList",invoiceController.invoiceList);

router.post("/invoiceView",invoiceController.invoiceView);

module.exports = router;