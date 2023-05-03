const jwt = require("jsonwebtoken");
var multer = require("multer");
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
//var upload = multer();
const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
var productService = require("./product.service");
var formidable = require("formidable");
var fs = require("fs");
const productParams = ["productName", "userId"];
const addPackagestypeParams = [
  "packagingType",
  "packageTypeImg",
  "packageTypeDesc",
];
const editPackagestypeParams = [
  "packagingType",
  "packageTypeImg",
  "packageTypeDesc",
  "packagingTypeId",
];
const deletePackagestypeParams = ["packagingTypeId"];
const getPackagesParams = ["userId"];
//app.use(upload.array());
//app.use(express.static('public'));
let self = (module.exports = {
  deletePackagestype: async (req, res) => {
    try {
      let flag = false;
      deletePackagestypeParams.forEach(function (element, key) {
        if (req.body[element] == "" || req.body[element] == undefined) {
          flag = true;
        }
      });

      if (flag) {
        res
          .status(200)
          .send({ responseStatus: 0, responseMsgCode: "mandatoryField" });
      }

      productService.deletePackagestype(req.body).then((result) => {
        if (result.status == 1) {
          res.json({
            responseStatus: 1,
            responseMsgCode: "success",
            responseData: { editData: result.data },
          });
        } else {
          res.json({
            responseStatus: 0,
            responseMsgCode: "failure.",
            responseData: result.data,
          });
        }
      });
    } catch (error) {
      res.status(200).send({
        responseStatus: 0,
        responseMsgCode: "processFailed",
        responseData: { err: error },
        responseInvalid: 0,
      });
    }
  },
  editPackagestype: async (req, res) => {
    try {
      let flag = false;
      editPackagestypeParams.forEach(function (element, key) {
        if (req.body[element] == "" || req.body[element] == undefined) {
          flag = true;
        }
      });

      if (flag) {
        res
          .status(200)
          .send({ responseStatus: 0, responseMsgCode: "mandatoryField" });
      }

      productService.editPackagestype(req.body).then((result) => {
        if (result.status == 1) {
          res.json({
            responseStatus: 1,
            responseMsgCode: "success",
            responseData: { editData: result.data },
          });
        } else {
          res.json({
            responseStatus: 0,
            responseMsgCode: "failure.",
            responseData: result.data,
          });
        }
      });
    } catch (error) {
      res.status(200).send({
        responseStatus: 0,
        responseMsgCode: "processFailed",
        responseData: { err: error },
        responseInvalid: 0,
      });
    }
  },
  getPackagingType: async (req, res) => {
    try {
      productService.getPackagingType(req.body).then((result) => {
        if (result.status == 1) {
          res.json({
            responseStatus: 1,
            responseMsgCode: "success",
            responseData: { name: result.data },
          });
        } else {
          res.json({
            responseStatus: 0,
            responseMsgCode: "failure.",
            responseData: result.data,
          });
        }
      });
    } catch (error) {
      res.status(200).send({
        responseStatus: 0,
        responseMsgCode: "processFailed",
        responseData: { err: error },
        responseInvalid: 0,
      });
    }
  },
  addPackagestype: async (req, res) => {
    try {
      if (req.body.packagingTypeStatus != undefined) {
        let flag = false;
        addPackagestypeParams.forEach(function (element, key) {
          if (req.body[element] == "" || req.body[element] == undefined) {
            flag = true;
          }
        });

        if (flag) {
          res
            .status(200)
            .send({ responseStatus: 0, responseMsgCode: "mandatoryField" });
        }

        productService.addPackagestype(req.body).then((result) => {
          if (result.status == 1) {
            res.json({
              responseStatus: 1,
              responseMsgCode: "success",
              responseData: { name: result.data },
            });
          } else {
            res.json({
              responseStatus: 0,
              responseMsgCode: "failure.",
              responseData: result.data,
            });
          }
        });
      } else {
        productService.addPackagestype(req.body);
      }
    } catch (error) {
      res.status(200).send({
        responseStatus: 0,
        responseMsgCode: "processFailed",
        responseData: { err: error },
        responseInvalid: 0,
      });
    }
  },
  addPackages: async (req, res) => {
    try {
      const validation = await Promise.all([
        productService.findUserName(req.body),
      ]);
      if (validation[0].status == 0) {
        res.json({
          responseStatus: 0,
          responseMsgCode: "User Name already exists",
          responseData: {},
        });
      }

      productService.addPackages(req.body).then((result) => {
        if (result.status == 1) {
          res.json({
            responseStatus: 1,
            responseMsgCode: "success",
            responseData: { name: result.data },
          });
        } else {
          res.json({
            responseStatus: 0,
            responseMsgCode: "failure.",
            responseData: result.data,
          });
        }
      });
    } catch (error) {
      res.status(200).send({
        responseStatus: 0,
        responseMsgCode: "processFailed",
        responseData: { err: error },
        responseInvalid: 0,
      });
    }
  },
  getPackages: (req, res) => {
    try {
      let flag = false;
      getPackagesParams.forEach(function (element, key) {
        if (req.body[element] == "" || req.body[element] == undefined) {
          flag = true;
        }
      });

      if (flag) {
        res
          .status(200)
          .send({ responseStatus: 0, responseMsgCode: "mandatoryField" });
      }

      productService.getPackages(req.body).then((result) => {
        var data = {};
        if (result.status == 1) {
          data.packageList = result.data;
          res.json({
            responseStatus: 1,
            responseMsgCode: "success",
            responseData: data,
          });
        } else {
          data.packageList = result.data;
          res.json({
            responseStatus: 0,
            responseMsgCode: "failure.",
            responseData: data,
          });
        }
      });
    } catch (error) {
      res.status(200).send({
        responseStatus: 0,
        responseMsgCode: "processFailed",
        responseData: { err: error },
        responseInvalid: 0,
      });
    }
  },
  addProduct: async (req, res) => {

    try {
      
      if(req.files.productImage != undefined){
          req.body.productImage = req.files.productImage[0].location
      }

      let flag = false;
      productParams.forEach(function (element, key) {
        if (req.body[element] == "" || req.body[element] == undefined) {
          flag = true;
        }
      });

      if (flag) {
        res.status(200).send({ responseStatus: 0, responseMsgCode: "mandatoryField" });
      }

      productService.addProduct(req.body).then((result) => {
        if (result.status == 1) {
          var subject = "Package Add In New Product.";
          let userName = "ef45bad14f72aa2220459e479592ecfc";
          let password1 = "ce2340550790bd00a275bc21fabcfa67";
          var transporter = nodemailer.createTransport(
            smtpTransport({
              service: "mailjet",
              host: "in-v3.mailjet.com",
              auth: {
                user: userName, // generated ethereal user
                pass: password1, // generated ethereal password
              },
            })
          );
          fs.readFile(
            "./blokchi-email-product.html",
            { encoding: "utf-8" },
            async (err, data) => {
              if (err) {
                console.warn("Error getting password reset template: " + err);
              } else {
                let htmlFile = data;
                let productName = result.data.productName;
                htmlFile = htmlFile.replace("#productName#", productName);
                var thanksMailOptions = {
                  from: "<info@medgrids.com>",
                  //to: "yogendra@agiosupport.in",
                  to: "<info@medgrids.com>",
                  subject: subject,
                  html: htmlFile,
                };
                await transporter.sendMail(thanksMailOptions);
              }
              res.json({
                responseStatus: 1,
                responseMsgCode: "success",
                responseData: {},
              });
            }
          );
          res.json({
            responseStatus: 1,
            responseMsgCode: "success",
            responseData: result.data,
          });
        } else {
          res.json({
            responseStatus: 0,
            responseMsgCode: "failure.",
            responseData: result.data,
          });
        }
      });

      //   });
    } catch (error) {
      res.status(200).send({
        responseStatus: 0,
        responseMsgCode: "processFailed",
        responseData: { err: error },
        responseInvalid: 0,
      });
    }
  },
  list: (req, res) => {
    try {
      productService.list(req.body).then((result) => {
        var data = {};
        if (result.status == 1) {
          data.productList = result.data;
          res.json({
            responseStatus: 1,
            responseMsgCode: "success",
            responseData: data,
          });
        } else {
          data.productList = result.data;
          res.json({
            responseStatus: 0,
            responseMsgCode: "failure.",
            responseData: data,
          });
        }
      });
    } catch (error) {
      res.status(200).send({
        responseStatus: 0,
        responseMsgCode: "processFailed",
        responseData: { err: error },
        responseInvalid: 0,
      });
    }
  },
  getProductByid: (req, res) => {
    const body = req.body.id;
    productService.getProductByid(body).then((result) => {
      try {
        if (result) {
          res.json({
            success: 1,
            message: "success",
            data: result,
          });
        } else {
          res.json({
            success: 0,
            message: "failure",
          });
        }
      } catch (err) {
        res.json({ error: err.message || err.toString() });
      }
    });
  },
  updateProduct: (req, res) => {
    try {
      if(req.files.productImage != undefined){
          req.body.productImage = req.files.productImage[0].location
      }
      productService.updateProduct(req.body).then((result) => {
        var data = {};
        if (result.status == 1) {
          data.updateProduct = result.data;
          res.json({
            responseStatus: 1,
            responseMsgCode: "success",
            responseData: data,
          });
        } else {
          data.updateProduct = result.data;
          res.json({
            responseStatus: 0,
            responseMsgCode: "failure.",
            responseData: data,
          });
        }
      });
      //              });
    } catch (error) {
      res.status(200).send({
        responseStatus: 0,
        responseMsgCode: "processFailed",
        responseData: { err: error },
        responseInvalid: 0,
      });
    }
  },
  deleteProduct: (req, res) => {
    try {
      let id = req.body.id;
      productService.deleteProduct(id, req.body).then((result) => {
        if (result.status == 1) {
          res.json({
            responseStatus: 1,
            responseMsgCode: "success",
            responseData: result.data,
          });
        } else {
          res.json({
            responseStatus: 0,
            responseMsgCode: "failure.",
            responseData: result.data,
          });
        }
      });
    } catch (error) {
      res.status(200).send({
        responseStatus: 0,
        responseMsgCode: "processFailed",
        responseData: { err: error },
        responseInvalid: 0,
      });
    }
  },
});
