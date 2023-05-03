const express = require("express");
const router = express.Router();
const rfIdController = require('./rfstation.controller');
const { RegisterInfo }  = require('../../cpl/company/company.model');
const { User }  = require('../../common/user/user.model');
let {rfIdSchema} = require('./rfstation.model');

const mongoose = require('mongoose');
const newConn = require("../../../db/DBCustomConnection");
const { async } = require('q');
let Schema = mongoose.Schema;

const auth = async (req, res, next) => {
    let typedata =  'jkcement';
    let type =  1;	
    // let getUserInfo  = await User.findOne({ 'userSlug': typedata }).exec();
	// if(getUserInfo != null){
	// 	let getVerifiedInfo  = await RegisterInfo.findOne({ userId: getUserInfo._id, 'userType': type },{"_id":0,"verified":1}).exec();
	// 	if (getVerifiedInfo.verified != 1) {
	// 		res.json({ responseStatus: 0, responseMsgCode: "Your Profile is not verified by admin", "responseData": {} })
	// 		return false;
	// 	} else {
	// 		next();
	// 	}
	// } else {
	// 	res.json({ responseStatus: 0, responseMsgCode: "Your Account Not Exists", "responseData": {} })
	// }    
    next();
}

const headerCheck1 = async (req, res, next) => {
    let typeData = "DB_jkcement"; 
    let db = newConn.getDatabaseConnection(typeData);
    const rfIdData = db.model("rfIdData", rfIdSchema, 'tbl_rfIds');
    req.body.schema = [rfIdData];
    next();
}

router.post("/addRfIdData", auth, headerCheck1, rfIdController.addRfIdData);
router.post("/getRfIdData", auth, headerCheck1, rfIdController.getRfIdData);

module.exports = router;