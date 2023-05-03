const express = require("express");
const router = express.Router();
const nftController = require('./nft.controller');

const mongoose = require('mongoose');
const { async } = require('q');
let  Schema = mongoose.Schema;

const { RegisterInfo }  = require('../../cpl/company/company.model');
const { User }  = require('../../common/user/user.model');
const auth = async (req, res, next) => {
	let typedata =  req.headers['typedata']
	let type =  req.headers['type'];
	let userId =  req.headers['userid'];
	let getVerifiedInfo  = await RegisterInfo.findOne({userId: mongoose.Types.ObjectId(userId), 'userType': type },{"_id":0,"verified":1}).exec();
	next();
}

const authHash = async (req, res, next) => {
    let typedata =  req.headers['typedata']
    next();
}

router.post("/assignContainer", auth, nftController.assignContainer);
router.post("/viewContainerByFactory", auth, nftController.viewContainerByFactory);
router.post("/viewContainerFactoryById", auth, nftController.viewContainerFactoryById);
router.post("/viewContainerCompanyFactoryById", auth, nftController.viewContainerCompanyFactoryById);
router.post("/viewContainerByfdalebelId", auth, nftController.viewContainerByfdalebelId);
router.post("/getdatafromipfshash", auth, nftController.getdatafromipfshash);
router.post("/assignContainerToOthers", auth, nftController.assignContainerToOthers);
router.post("/verifyHash", auth, nftController.verifyHash);
router.post("/assignNftsByUserId", auth, nftController.assignNftsByUserId);


router.post("/hashBurnByUserId", authHash, nftController.hashBurnByUserId);
router.post("/viewAssignDataByManufacturerId", auth, nftController.viewAssignDataByManufacturerId);
router.post("/viewAssignDataByWarehouseAndDistributerId", auth, nftController.viewAssignDataByWarehouseAndDistributerId);
router.post("/verifyHashUserNftsData", auth, nftController.verifyHashUserNftsData);
router.post("/saveNftsData", auth, nftController.saveNftsData);
router.post("/getNftsReportAsPerUserIdData", auth, nftController.getNftsReportAsPerUserId);
router.post("/getOrderByProductIdData", auth, nftController.getOrderByProductId);
router.post("/getCompanyIdIpfsData", auth, nftController.getCompanyIdIpfs);
router.post("/getIpfsDataAsPerType", auth, nftController.getIpfsDataAsPerType);
router.post("/getContainerDataAsPerUserType", auth, nftController.getContainerDataAsPerUserType);
router.post("/getLastOrderByUserId", auth, nftController.getLastOrderByUserId);
router.post("/getNftsVerifyUserReport", auth, nftController.getNftsVerifyUserReport);
router.post("/changeReportStatus", auth, nftController.changeReportStatus);


// Send Data To Printer
router.post("/sendDataToPrinter", auth, nftController.sendDataToPrinter);

// genrate SVG & Pdf QR Code
router.post("/genratePdfs", auth, nftController.genratePdfs);


router.post("/genrateAllDocsPdf", auth, nftController.genrateAllDocsPdf);

router.post("/updateStatusGenratedNfts", auth, nftController.updateStatusGenratedNfts);
router.post("/getPrintedNfts", auth, nftController.getPrintedNfts);
router.post("/getInvoicePrintData", auth, nftController.getInvoicePrintData);
router.post("/savePrintedAppTransactionData", auth, nftController.savePrintedAppTransactionData);
router.post("/listPrintedAppTransactionData", auth, nftController.listPrintedAppTransactionData);
router.post("/updateDeliveryIntentNoData", auth, nftController.updateDeliveryIntentNoData);


module.exports = router;