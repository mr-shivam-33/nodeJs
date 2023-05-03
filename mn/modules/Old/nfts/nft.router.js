const express = require("express");
const router = express.Router();
const nftController = require('./nft.controller');

router.post("/assignContainer", nftController.assignContainer);
router.post("/viewContainerByFactory", nftController.viewContainerByFactory);
router.post("/viewContainerFactoryById", nftController.viewContainerFactoryById);
router.post("/viewContainerCompanyFactoryById", nftController.viewContainerCompanyFactoryById);
router.post("/viewContainerByfdalebelId", nftController.viewContainerByfdalebelId);
router.post("/getdatafromipfshash", nftController.getdatafromipfshash);
router.post("/assignContainerToOthers", nftController.assignContainerToOthers);
router.post("/verifyHash", nftController.verifyHash);
router.post("/assignNftsByUserId", nftController.assignNftsByUserId);
router.post("/hashBurnByUserId", nftController.hashBurnByUserId);
router.post("/viewAssignDataByManufacturerId", nftController.viewAssignDataByManufacturerId);
router.post("/viewAssignDataByWarehouseAndDistributerId", nftController.viewAssignDataByWarehouseAndDistributerId);
router.post("/verifyHashUserNftsData", nftController.verifyHashUserNftsData);
router.post("/saveNftsData", nftController.saveNftsData);
router.post("/getNftsReportAsPerUserIdData", nftController.getNftsReportAsPerUserId);
router.post("/getOrderByProductIdData", nftController.getOrderByProductId);
router.post("/getCompanyIdIpfsData", nftController.getCompanyIdIpfs);
router.post("/getIpfsDataAsPerType", nftController.getIpfsDataAsPerType);
router.post("/getContainerDataAsPerUserType", nftController.getContainerDataAsPerUserType);
router.post("/getLastOrderByUserId", nftController.getLastOrderByUserId);
router.post("/getNftsVerifyUserReport", nftController.getNftsVerifyUserReport);
router.post("/changeReportStatus", nftController.changeReportStatus);


module.exports = router;