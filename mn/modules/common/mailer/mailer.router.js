const express = require("express");
const router = express.Router();
const mailerController = require('./mailer.controller');

router.post("/sendEmail", mailerController.sendEmail);
router.post("/contactUsEmail", mailerController.contactUsEmail);


// Send OTP For Login
router.post("/loginEmail/:status", mailerController.loginEmail);


router.post("/tloginEmail/:status", mailerController.tloginEmail);

module.exports = router;