const express = require("express");
const router = express.Router();
const companyRouter = require('./company/company.router');
const companyUserRouter = require('./user/user.router');
const productRouter = require("./product/product.router");
const invoiceRouter = require("./invoice/invoice.router");
const packageRouter = require("./package/package.router");
const metadataRouter = require("./fdalabelmetadata/metadata.router");
const fdalabelmetadataBatchRouter = require("./fdalabelmetadataBatch/metadata.router");
const paymentRouter = require("./payment/payment.router");
const paidFeaturesRouter = require("./paidFeatures/paidfeatures.router");
const nftRouter = require("./nfts/nft.router");
const reportRouter = require("./report/report.router");
const printerRouter = require("./manKindPrinter/printer.router");
const plantRouter = require("./plant/plant.router");

router.use("/plant", plantRouter);
router.use("/printer", printerRouter);
router.use('/company', companyRouter);
router.use('/user', companyUserRouter);
router.use('/product',productRouter);
router.use('/package',packageRouter);
router.use('/invoice',invoiceRouter);
router.use('/fdametadata',metadataRouter);
router.use('/fdalabelmetadataBatch',fdalabelmetadataBatchRouter);
router.use('/payment',paymentRouter);
router.use('/nfts',nftRouter);


router.use('/feature',paidFeaturesRouter);
router.use("/report", reportRouter);

module.exports = router
  