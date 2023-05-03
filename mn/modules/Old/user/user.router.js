const express = require("express");
const router = express.Router();
const userController = require('./user.controller');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log("file")
        console.log(file)
        if (file == undefined) {
            //   do nothing
        } else
            cb(null, '../../../assets/companyusers')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
  
  
  });
  var upload = multer({ storage: storage });



router.post("/adduser", userController.addUserByCompany);
router.post("/userlist", userController.userListByCompanyId);
router.post("/editpermission", userController.userModifyPermission);
router.get("/listpermission", userController.listpermissionModule);
router.post("/userlistpermission", userController.userListPermission);
router.post("/edituser", userController.edituserByCompany);
router.post("/deleteuser", userController.deleteuserByCompany);

 
router.post("/userprofileupdate", userController.userProfileUpdate);


router.post("/userprofileview", userController.userProfileView);
router.post("/useraddaddress", userController.userAddAdress);
router.post("/usereditaddress", userController.userEditAddress);
router.post("/userdeleteaddress", userController.userDeleteAddress);
router.post("/addusermember", userController.addUserMember);
router.post("/memberedit", userController.memberEditByUser);
router.post("/memberlist", userController.memberListByUser);
router.post("/memberdelete", userController.memberDeleteUser);

router.post("/contractmanufacturer", userController.contractManufacturer);

router.post("/contracterlist", userController.contracterListByUser);

router.post("/assignCustomerByUser", userController.assignCustomerByUser);
router.post("/customerListByUser", userController.customerListByUser);

router.post("/profilepointupdate", userController.profilePointUpdate);


router.get("/allcontracterlist", userController.allcontracterlist);




module.exports = router;