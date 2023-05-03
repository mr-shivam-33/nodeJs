const express = require("express");
const router = express.Router();
const metadataController = require('./metadata.controller');
const { RegisterInfo }  = require('../../cpl/company/company.model');
const { User }  = require('../../common/user/user.model');
const mongoose = require('mongoose');
let  Schema = mongoose.Schema;
const auth = async (req, res, next) => {
    let typedata =  req.headers['typedata']
    let type =  req.headers['type']
    let getUserInfo  = await User.findOne({ 'userSlug': typedata },{"_id":1}).exec();
    let getVerifiedInfo  = await RegisterInfo.findOne({ userId: getUserInfo._id, 'userType': type },{"_id":0,"verified":1}).exec();
    // if (getVerifiedInfo.verified != 1) {
    //     res.json({ responseStatus: 0, responseMsgCode: "Your Profile is not verified by admin", "responseData": {} })
    //     return false;
    // } else {
        next();
    // }
}
console.log("123456789")
router.post("/updateNftHashData", auth, metadataController.updateNftHashData);

router.post("/getDataSAP", metadataController.getDataSAP);

module.exports = router;