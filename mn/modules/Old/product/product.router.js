const express = require("express");
const router = express.Router();
var bodyParser = require('body-parser');
var formidable = require('formidable');


const productController = require('./product.controller');
router.post("/addproduct", productController.addProduct);
router.post("/productList", productController.list);
router.post("/productUpdate", productController.updateProduct);
router.post("/productById", productController.getProductByid);
router.post("/deleteProduct", productController.deleteProduct);
router.get("/getPackages", productController.getPackages);
router.post("/addPackages", productController.addPackages);
router.get("/getPackagingType", productController.getPackagingType);
router.post("/addPackagestype", productController.addPackagestype);
router.post("/editPackagestype", productController.editPackagestype);
router.post("/deletePackagestype", productController.deletePackagestype);
module.exports = router;