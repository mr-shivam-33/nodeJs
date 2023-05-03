const express = require("express");
const router = express.Router();
var bodyParser = require('body-parser');
const packageController = require('./package.controller');
router.post("/packageList",packageController.packageList);
module.exports = router;