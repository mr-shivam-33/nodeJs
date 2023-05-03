const express = require("express");
const router = express.Router();
const packagebyadminController = require('./packagebyadmin.controller');
const { RegisterInfo }  = require('../../cpl/company/company.model');
const { User }  = require('../../common/user/user.model');

const multer  = require('multer');
var config = require('./../../../config.json');

let {offerModeSchema,paymentModeSchema,secretManagerSchema,managePackageSchema,userPackageSchema,smartContractSchema,smartAssignSchema, productSchema } = require('./packagebyCustomadmin.model');


const mongoose = require('mongoose');
const newConn = require("../../../db/DBCustomConnection");
const { async } = require('q');
let Schema = mongoose.Schema;


const auth = async (req, res, next) => {
    let typedata =  req.headers['typedata'];
    let type =  req.headers['type'];	
    let getUserInfo  = await User.findOne({ 'userSlug': typedata }).exec();
	if(getUserInfo != null){
		let getVerifiedInfo  = await RegisterInfo.findOne({ userId: getUserInfo._id, 'userType': type },{"_id":0,"verified":1}).exec();
		if (getVerifiedInfo.verified != 1) {
			res.json({ responseStatus: 0, responseMsgCode: "Your Profile is not verified by admin", "responseData": {} })
			return false;
		} else {
			next();
		}
	} else {
		res.json({ responseStatus: 0, responseMsgCode: "Your Account Not Exists", "responseData": {} })
	}    
}

const headerCheck1 = async (req, res, next) => {
		let typeData = "DB_"+req.headers['typedata']; 
		let db = newConn.getDatabaseConnection(typeData);
		const offerModeDetails = db.model("offerModeDetails", offerModeSchema, 'tbl_offer');
		const scmanager = db.model("scmanager", secretManagerSchema, 'secret_manager');
		const manageUserPackage = db.model("manageUserPackage", managePackageSchema, 'tbl_priceList');
		// manageUserPackage.collection.dropIndex({'name': 1});
		const UserPackage = db.model("userPackage", userPackageSchema, 'tbl_packaggeprice');
		const SmartContract = db.model("smartContract", smartContractSchema, 'tbl_smartcontract_details');
		const smartAssign = db.model("smartAssign", smartAssignSchema, 'tbl_smartassign');
		const newproductModel = db.model("newproductModel", productSchema, 'tbl_products');	
		const paymentModeDetails = db.model("paymentModeDetails", paymentModeSchema, 'tbl_paymentModeDetails');
		

    req.body.schema = [offerModeDetails,paymentModeDetails,UserPackage,SmartContract,smartAssign,newproductModel,manageUserPackage, scmanager];
    next();
}


const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, config.media_path + 'packageImage')
	},
	filename: function (req, file, cb) {
		if ((file.mimetype == 'image/png') || (file.mimetype == 'image/jpeg') || (file.mimetype == 'image/jpg') ) {
			const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
			cb(null, file.fieldname + '-' + uniqueSuffix + '.png')
		}
	}
});
var upload = multer({ storage: storage });


router.post("/smartUserListByProduct",auth,headerCheck1,packagebyadminController.smartUserListByProduct);
router.post("/list",auth,headerCheck1,packagebyadminController.userPackagelist);
router.post("/add",auth,headerCheck1,upload.single('packageImage'),packagebyadminController.addPackage);
router.post("/edit",auth,headerCheck1,upload.single('packageImage'),packagebyadminController.editPackage);

router.post("/smartlist",auth,headerCheck1,packagebyadminController.smartlist);
router.post("/smartadd",auth,headerCheck1,packagebyadminController.smartadd);
router.post("/smartedit",auth,headerCheck1,packagebyadminController.smartedit);
router.post("/smartdelete",auth,headerCheck1,packagebyadminController.smartdelete);
router.post("/smartUseStatusChange",auth,headerCheck1,packagebyadminController.smartUseStatusChange);


router.post("/smartassign",auth,headerCheck1,packagebyadminController.smartAssignByadmin);
router.post("/smartassignlist",auth,headerCheck1,packagebyadminController.smartAssignList);
router.post("/smartassigndelete",auth,headerCheck1,packagebyadminController.smartAssignDelete);
router.post("/smartassignedit",auth,headerCheck1,packagebyadminController.smartAssignEdit);
router.post("/unUsedSmartContractList",auth,headerCheck1,packagebyadminController.unUsedSmartContractList);
router.post("/companyProfileStatus",packagebyadminController.companyProfileStatus);

router.post("/addPackegesByProductId",auth,headerCheck1,packagebyadminController.addPackegesByUserId);
router.post("/packegesListByProductId",auth,headerCheck1,packagebyadminController.packegesListByUserId);
router.post("/deletePackegesListByProductId",auth,headerCheck1,packagebyadminController.deletePackegesListByUserId);
router.post("/smanager",auth,headerCheck1, packagebyadminController.smanager);
router.post("/gsvalue",auth, headerCheck1,packagebyadminController.gsvalue);
router.post("/smartStatus",auth,headerCheck1,packagebyadminController.smartStatus);
router.post("/smartContractDeploy",auth,headerCheck1,packagebyadminController.smartContractDeploy);

router.post("/addPaymentType",auth,headerCheck1,packagebyadminController.addPaymentType);
router.post("/paymentTypeList",auth,headerCheck1,packagebyadminController.paymentTypeList);
router.post("/deletePaymentType",auth,headerCheck1,packagebyadminController.deletePaymentType);


router.post("/offerByProductId",auth,headerCheck1,packagebyadminController.offerByProductId);
router.post("/offerListByProductId",auth,headerCheck1,packagebyadminController.offerListByProductId);
router.post("/deleteOfferByProductId",auth,headerCheck1,packagebyadminController.deleteOfferByProductId);

router.post("/editsubscription",auth,headerCheck1,packagebyadminController.editsubscription);
router.get("/listsubscription",auth,headerCheck1, packagebyadminController.listsubscription);

router.post("/smartDeployList",auth,headerCheck1,packagebyadminController.smartDeployList);


module.exports = router;