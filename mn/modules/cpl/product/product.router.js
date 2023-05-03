const express = require("express");
const router = express.Router();
var bodyParser = require('body-parser');
var formidable = require('formidable');

let {getPackageSchema, productSchema,getPackagingTypeSchema}  = require('./product.model');
const { RegisterInfo }  = require('../../cpl/company/company.model');
const { User }  = require('../../common/user/user.model');
const mongoose = require('mongoose');
const newConn = require("../../../db/DBCustomConnection");
const { async } = require('q');
let  Schema = mongoose.Schema;

const auth = async (req, res, next) => {
    let typedata =  req.headers['typedata']
    let type =  req.headers['type'];    
   let getUserInfo  = await User.findOne({ 'userSlug': typedata },{"_id":1,"firstName":1,"lastName":1,"email":1}).exec(); 
    // req.body.userInfo = getUserInfo;
    let getVerifiedInfo  = await RegisterInfo.findOne({ userId: getUserInfo._id, 'userType': type },{"_id":0,"verified":1}).exec();
    if (getVerifiedInfo.verified != 1) {
        res.json({ responseStatus: 0, responseMsgCode: "Your Profile is not verified by admin", "responseData": {} })
        return false;
    } else {
        next();
    }
}
const headerCheck1 = async (req, res, next) => {
    var typeData = "DB_"+req.headers['typedata'];
    // console.log(typeData); return;
    let db = newConn.getDatabaseConnection(typeData);
    const getPackagingType = db.model("getPackagingType", getPackagingTypeSchema, 'tbl_packagingType');
    const getPackageModel = db.model("getPackageModel", getPackageSchema, 'tbl_priceList');
    const productModel = db.model("productModel", productSchema, 'tbl_products');
    req.body.schema = [getPackagingType,getPackageModel,productModel];
    next();
}

const multer = require("multer");
const multerS3 = require("multer-s3");
var AWS = require('aws-sdk');
var ACCESSKEYID = "AKIA4CMJKB6YJS7LD5OD";
var SECRETACCESSKEY = "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";
var mainBucket = 'cplgreen'
const s3 = new AWS.S3({
	accessKeyId: ACCESSKEYID,
	secretAccessKey: SECRETACCESSKEY,
});

var uploadS3 = multer({
	storage: multerS3({
		s3: s3,
		bucket: mainBucket,
		acl: "public-read",
region: 'ap-south-1',
		metadata: function (req, file, cb) {			
			cb(null, { fieldName: file.fieldname });
		},
		key: function (req, file, cb) {			
			const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);		
			cb(null, req.headers['typedata']+'/product/'+file.fieldname + "-" + uniqueSuffix + ".png");
		},
	}),
});

var cpUpload = uploadS3.fields([{name: "productImage", maxCount: 1 }]);

const productController = require('./product.controller');
router.post("/addproduct", auth, cpUpload, headerCheck1, productController.addProduct);
router.post("/productList", auth, headerCheck1,productController.list);
router.post("/updateProduct", auth, cpUpload, headerCheck1,productController.updateProduct);
router.post("/productById", auth, headerCheck1,productController.getProductByid);
router.post("/deleteProduct", auth, headerCheck1,productController.deleteProduct);
router.post("/getPackages", auth, headerCheck1,productController.getPackages);
router.post("/addPackages", auth, headerCheck1,productController.addPackages);

// packageing type management :--

router.get("/getPackagingType", auth, headerCheck1,productController.getPackagingType);
router.post("/addPackagestype", auth, headerCheck1,productController.addPackagestype);
router.post("/editPackagestype", auth, headerCheck1,productController.editPackagestype);
router.post("/deletePackagestype", auth, headerCheck1,productController.deletePackagestype);

module.exports = router;