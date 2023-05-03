const express = require("express");
const router = express.Router();
const companyController = require('./company.controller');

router.post("/addregisterinfo", companyController.addRegisterInfo);
router.post("/editcompany", companyController.editRegisterInfo);
router.post("/listcompany", companyController.listRegisterInfo);
router.post("/deletecompany", companyController.deleteRegisterInfo);
router.post("/addfactoryinfo", companyController.addfactoryinfo);
router.post("/editfactory", companyController.editFactoryInfo);
router.post("/deletefactory", companyController.deleteFactoryInfo);


router.post("/addbankdetails", companyController.addbankdetails);
router.post("/editbank", companyController.editBankInfo);
router.post("/deletebank", companyController.deleteBankInfo);
router.post("/addlegalinfo", companyController.legalinfo);
router.post("/editlegal", companyController.editLegalinfo);

router.post("/listallusers", companyController.listAllUsersInfo);

module.exports = router;