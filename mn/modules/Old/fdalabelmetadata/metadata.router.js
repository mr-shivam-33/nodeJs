const express = require("express");
const router = express.Router();
const metadataController = require('./metadata.controller');

router.post("/addfdametadata", metadataController.addfdametadata);
router.post("/updatefdametadata", metadataController.updatefdametadata);
router.post("/getfdametadata", metadataController.getfdametadata);
router.post("/postIpfsData", metadataController.ipfsdata);
router.post("/updateNftHashData", metadataController.updateNftHashData);
router.post("/getProgressBar", metadataController.getProgressBar);


module.exports = router;