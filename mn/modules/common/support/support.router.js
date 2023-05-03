const express = require("express");
const router = express.Router();
const supportController = require('./support.controller');
const multer  = require('multer');
var config = require('./../../../config.json');

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
			cb(null, req.headers['typedata']+'/support/'+file.fieldname + "-" + uniqueSuffix + ".png");
		},
	}),
});

var cpUpload = uploadS3.fields([{name: "fileImage", maxCount: 10 }]);

router.post("/supportList",supportController.supportList);
router.post("/supportAdd",cpUpload, supportController.supportAdd);
router.post("/permissionAdd",supportController.permissionAdd);
router.post("/permissionShow",supportController.permissionShow);

module.exports = router;