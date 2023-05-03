const express = require("express");
const router = express.Router();
const userController = require('./user.controller');


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
		metadata: function (req, file, cb) {			
			cb(null, { fieldName: file.fieldname });
		},
		key: function (req, file, cb) {	
			const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);		
			cb(null, req.headers['typedata']+'/profile/'+file.fieldname + "-" + uniqueSuffix + ".png");
		},
	}),
});

var cpUpload = uploadS3.fields([{name: "profileImg", maxCount: 1 }]);

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/addProfile", cpUpload, userController.profileUpdate);
router.post("/authLogOut", userController.authLogOut);
router.post("/userLoginAs", userController.userLoginAs);
router.post("/adminlogin", userController.superLogin);
router.post("/userLogOut", userController.userAdminLogOut);
router.post("/changepassword", userController.adminChangePassword);
router.post("/getUserToken", userController.getUserToken);

router.post("/checkUserSlug", userController.checkUserSlug);

router.post("/setPassword", userController.setPassword);
router.post("/changeUserPassword", userController.changeUserPassword);

router.post("/plantlogin", userController.plantlogin);

module.exports = router;