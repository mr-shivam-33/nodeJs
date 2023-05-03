const express = require("express");
const router = express.Router();
const frontpageController = require('./clienttheme.controller');
var config = require('./../../../config.json');
const multer = require("multer");
const multerS3 = require("multer-s3");
var AWS = require('aws-sdk');
var ACCESSKEYID = "AKIA3QMT3KIUXJRCBXMX";//Suraj
var SECRETACCESSKEY = "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";
var mainBucket = 'blokchi'

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
			cb(null, req.body.clientName+'/'+req.body.categoryName+'/'+file.fieldname + "-" + uniqueSuffix + ".png");
		},
	}),
});

var cpUploadTheme = uploadS3.fields([
	{ name: "dashImag", maxCount: 1 },
	{ name: "faviconImage", maxCount: 1 },
	{ name: "logoImage", maxCount: 1 }
  ]);

// const storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		cb(null, config.theme_path)
// 	},
// 	filename: function (req, file, cb) {

// 		console.log(file.mimetype);
// 		if ((file.mimetype == 'image/png') || (file.mimetype == 'image/jpeg') || (file.mimetype == 'image/jpg') || (file.mimetype == 'image/vnd.microsoft.icon') || (file.mimetype == 'image/svg+xml') ) {
// 			const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
// 			cb(null, uniqueSuffix+'_'+file.originalname)
// 		}else{
// 			console.log("Check image format..");
// 		}
// 	}
// });
// var upload = multer({ storage: storage });
// var cpUpload = upload.fields([{name:'dashImag'},{name:'faviconImage'},{name:'logoImage'}]);



router.post("/uploadImage", cpUploadTheme, frontpageController.uploadImage);
router.post("/addtheme",frontpageController.addtheme);
router.post("/getthemebyuserid", frontpageController.getThemeByUserid);

module.exports = router;