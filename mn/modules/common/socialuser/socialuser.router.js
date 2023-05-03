const express = require("express");
const router = express.Router();
const socialuserController = require('./socialuser.controller');

router.post("/register", socialuserController.register);
router.post("/login", socialuserController.login);
router.post("/socialloginregister", socialuserController.socialLoginRegister);

// New Login Featutre
router.post("/slogin", socialuserController.slogin);

module.exports = router;