const express = require("express");
const router = express.Router();
var bodyParser = require('body-parser');

const paymentController = require('./payment.controller');

router.post("/creditpayment",paymentController.creditPaymentDetails);
router.get("/acceptpayment",paymentController.acceptPaymentInfo);
router.post("/generatenfts",paymentController.createUniqueNumberByNfts);


module.exports = router;