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
const nftRouter = require("./nfts/nft.router");
router.use('/company', companyRouter);
router.use('/user', companyUserRouter);
router.use('/product',productRouter);
router.use('/package',packageRouter);
router.use('/invoice',invoiceRouter);
router.use('/fdametadata',metadataRouter);
router.use('/fdalabelmetadataBatch',fdalabelmetadataBatchRouter);
router.use('/payment',paymentRouter);
router.use('/nfts',nftRouter);

module.exports = router
  