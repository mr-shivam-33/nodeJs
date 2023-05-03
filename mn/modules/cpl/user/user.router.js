const express = require("express");
const router = express.Router();
const userController = require('./user.controller');
var multer = require('multer');

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

var cpUpload = uploadS3.fields([{name: "image", maxCount: 1 }]);

// router.post("/addProfile", cpUpload, userController.profileUpdate);


// var storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         console.log("file")
//         console.log(file)
//         if (file == undefined) {
//             //   do nothing
//         } else
//             cb(null, '../../../assets/companyusers')
//     },
//     filename: function(req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname)
//     }
  
  
//   });
//   var upload = multer({ storage: storage });


const mongoose = require('mongoose');
const newConn = require("../../../db/DBCustomConnection");
const { async } = require('q');

let { customUserInfoSchemaNew } = require('../../common/authentication/authenticationcustom.model');
let {userPermissionSchema,ipfsVerifyByCustomerSchema}  = require('./usercustom.model');

const headerCheck1 = async (req, res, next) => {
    var typeData = req.headers['typedata'];
    if (typeData == '' || typeData == undefined) {
        res.json({ responseStatus: 0, responseMsgCode: "databaseName field is required", "responseData": {} })
        return false;
    }
    let db = newConn.getDatabaseConnection("DB_"+typeData);
    const customUserInfoNew1 = db.model("customUserInfoNew1", customUserInfoSchemaNew, 'tbl_user');
    const PermissionInfo = db.model("permissionInfo", userPermissionSchema, 'tbl_category_module');
    const CustomerVerifyInfo = db.model("customerVerifyInfo", ipfsVerifyByCustomerSchema, 'tbl_blockChainIpfsData');
    req.body.schema = [PermissionInfo, CustomerVerifyInfo];
    req.body.customUserInfoNew1 = [customUserInfoNew1]
    next();
}


router.post("/userprofileupdate",cpUpload, userController.userProfileUpdate);


router.post("/assignCustomerByUser", headerCheck1, userController.assignCustomerByUser);
router.get("/listpermission", headerCheck1, userController.listpermissionModule);

router.post("/adduser", userController.addUserByCompany);
router.post("/userlist", userController.userListByCompanyId);
router.post("/editpermission", userController.userModifyPermission);
// router.get("/listpermission", userController.listpermissionModule);
router.post("/userlistpermission", userController.userListPermission);
router.post("/edituser", userController.edituserByCompany);
router.post("/deleteuser", userController.deleteuserByCompany);

 



router.post("/userprofileview", userController.userProfileView);
router.post("/useraddaddress", userController.userAddAdress);
router.post("/usereditaddress", userController.userEditAddress);
router.post("/userdeleteaddress", userController.userDeleteAddress);
router.post("/addusermember", userController.addUserMember);
router.post("/memberedit", userController.memberEditByUser);
router.post("/memberlist", userController.memberListByUser);
router.post("/memberdelete", userController.memberDeleteUser);

router.post("/contractmanufacturer", headerCheck1, userController.contractManufacturer);

router.post("/contracterlist", userController.contracterListByUser);

// router.post("/assignCustomerByUser", userController.assignCustomerByUser);
router.post("/customerListByUser", userController.customerListByUser);

router.post("/profilepointupdate", userController.profilePointUpdate);


router.get("/allcontracterlist", userController.allcontracterlist);




module.exports = router;