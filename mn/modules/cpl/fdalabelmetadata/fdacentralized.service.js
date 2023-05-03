"use strict";
var _ = require("lodash");
const mongoose = require("mongoose");
const Hash = require('ipfs-only-hash');
const Q = require("q");
const config = require("../../../config.json");
const newConn = require("../../../db/DBCustomConnection");
let {ipfsUpdatedSchema, ipfsSchema, paymentModeSchema,discountSchema, orderSchema, priceSchema, metaSchema} = require("./metadata.model");
const { PaymentStatusUpdateSchema } = require("../payment/payment.model");
const { async } = require("q");
let  Schema = mongoose.Schema;
var self = (module.exports = {
  createDatabase: (databaseName)=>{
      var deferred = Q.defer();  
      let db = newConn.getDatabaseConnection(databaseName);  
      const PaymentStatusUpdate = db.model("PaymentStatusUpdate", PaymentStatusUpdateSchema, 'tbl_order');
      const ipfsdata = db.model("ipfsdata", ipfsSchema, 'tbl_blockChainIpfsData');
      const ipfsUpdated = db.model("ipfsUpdated", ipfsUpdatedSchema, 'tbl_blockChainUpdatedIpfsData');
      const fdaMetaData = db.model("fdametadata", metaSchema, 'tbl_fdalebelmetadata');
      const priceList = db.model("priceList", priceSchema, 'tbl_priceList');
      const orderCreate = db.model("orderCreate", orderSchema, 'tbl_order');
      const paymentModeDetails = db.model("paymentModeDetails", paymentModeSchema, 'tbl_paymentModeDetails');
      const discountDetails = db.model("discountDetails", discountSchema, 'tbl_userDiscount'); 
      deferred.resolve([PaymentStatusUpdate,ipfsdata,ipfsUpdated,fdaMetaData,priceList,orderCreate,paymentModeDetails,discountDetails]);
      return deferred.promise;
  },
  getProgressBar: async (data, typedata) => {
    var deferred = Q.defer();
    let getDataModelCon = await self.createDatabase("DB_"+typedata);
    let [PaymentStatusUpdate,ipfsdata,ipfsUpdated,fdaMetaData,priceList,orderCreate,paymentModeDetails,discountDetails] = getDataModelCon;

    await ipfsdata.count();

    fdaMetaData
      .aggregate([
        {
          $match: {
            userId: mongoose.Types.ObjectId(data.userId),
          },
        },
        {
          $project: {
            _id: 1,
            totalNfts: { $toInt: "$totalNfts" },
          },
        },
        {
          $lookup: {
            from: "tbl_blockChainIpfsData",
            let: { id: "$_id", totalNfts: "$totalNfts" },
            pipeline: [
              {
                $match: {
                  $and: [{ $expr: { $eq: ["$$id", "$fdaId"] } }],
                },
              },
              {
                $group: {
                  _id: null,
                  count: { $sum: 1 },
                },
              },
              {
                $project: {
                  percentage: {
                    $multiply: [
                      { $toInt: "$count" },
                      { $divide: [100, "$$totalNfts"] },
                    ],
                  },
                },
              },
            ],
            as: "blockChainIpfsData",
          },
        },
        {
          $lookup: {
            from: "tbl_blockChainUpdatedIpfsData",
            let: { id: "$_id", totalNfts: "$totalNfts" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $ne: ["$nftTokenId", ""],
                      },
                      {
                        $eq: ["$$id", "$fdaId"],
                      },
                    ],
                  },
                },
              },
              {
                $group: {
                  _id: null,
                  count: { $sum: 1 },
                },
              },
              {
                $project: {
                  nftPercentage: {
                    $multiply: [
                      { $toInt: "$count" },
                      { $divide: [100, "$$totalNfts"] },
                    ],
                  },
                },
              },
            ],
            as: "blockChainUpdatedIpfsData",
          },
        },
        {
          $addFields: {
            nftsUpdateIntial: "0",
          },
        },
        {
          $project: {
            _id: 0,
            userId: mongoose.Types.ObjectId(data.userId),
            fdaId: "$_id",
            percent: {
              $ifNull: [{ $first: "$blockChainIpfsData.percentage" }, 0],
            },
            percentNft: {
              $ifNull: [
                { $first: "$blockChainUpdatedIpfsData.nftPercentage" },
                0,
              ],
            },
          },
        },
        // {
        //   $project: {
        //     _id: 0,
        //     userId: mongoose.Types.ObjectId(data.userId),
        //     fdaId: "$_id",
        //     percentage: { $multiply: [{ $toInt: {
        //       $ifNull: [{ $first: "$blockChainIpfsData.count" }, ""],
        //     } }, {$divide: [100, "$totalNfts"]}] },
        //     nftPercentage: { $multiply: [{ $toInt: {
        //       $ifNull: [{ $first: "$blockChainUpdatedIpfsData.count" }, ""],
        //     } }, {$divide: [100, "$totalNfts"]}] },
        //   },
        // }
      ])
      .exec((err, result) => {
        if (err) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          let obj = { status: 1, data: result };
          deferred.resolve(obj);
        }
      });
    return deferred.promise;
  },
  repeatString: async (n) => {
      var deferred = Q.defer();
      var result = '', i;
      for (i = 1; i <= n; i++) {
          result +=  (n!=i) ? i + "," : i;
      }
      let obj = { status: 1, data: result };
      deferred.resolve(obj);
      return deferred.promise;
  },
  addfdaCentralized: async (data, typedata, io) => {
    var deferred = Q.defer();
    let getDataModelCon = await self.createDatabase("DB_"+typedata);
    let [PaymentStatusUpdate,ipfsdata,ipfsUpdated,fdaMetaData,priceList,orderCreate,paymentModeDetails,discountDetails] = getDataModelCon;
    self.convertIntoPrice(data.subscriptionPackage, parseInt(data.totalNfts), typedata).then((result) => {
      if (result.status == 1) { 
          data.flatDiscount = 0;
          data.totalPriceUSD = result.data.totalPriceUSD;
          data.totalPriceINR = result.data.totalPriceINR;
          data.priceUSDType = 'USD';
          data.priceINRType = 'INR';
          self.getPaymentMode(typedata).then(async(paymentResult) => {            
            var invoiceObject = {
              productId: data.productId,
              userId: data.userId,
              purchaseOrderNo: (Math.floor(Math.random() * 100000) + 100000)
                .toString()
                .substring(1),
              paymentStatus: 0,
              totalNfts: data.totalNfts,
              totalPriceUSD: data.totalPriceUSD,
              totalPriceINR: data.totalPriceINR,
              flatDiscount: data.flatDiscount,
              priceUSDType: data.priceUSDType,
              priceINRType: data.priceINRType,
              createdAt: { type: Date, required: true },
              updateAt: { type: Date, required: true },
            };

            // console.log('invoiceObject...........',invoiceObject); return;

            if (paymentResult.status == 1) {
             // 0 - pendind paymentStatus, 1 - processing paymentStatus, 2 - paid paymentStatus, 3 - unpaid paymentStatus             
              data.overDueDays = paymentResult.data.overDueDays;
              // var duration = paymentResult.data.dueDate; //In Days
              var dueDate_ = paymentResult.data.dueDate;
              // data.dueDate = new Date(
              //   Date.now() + duration * 24 * 60 * 60 * 1000
              // );
              data.dueDate = dueDate_;
              data.paymentType = paymentResult.data.paymentType;
              invoiceObject.overDueDays = paymentResult.data.overDueDays;
              // invoiceObject.dueDate = new Date(
              //   Date.now() + duration * 24 * 60 * 60 * 1000
              // );
              invoiceObject.dueDate = dueDate_;
              invoiceObject.paymentType = paymentResult.data.paymentType;
            } else {
              data.overDueDays = 0;
              data.dueDate = new Date(Date.now());
              data.paymentType = "cash";

              invoiceObject.overDueDays = 0;
              invoiceObject.dueDate = new Date(Date.now());
              invoiceObject.paymentType = "cash";
            }
            let count = await orderCreate.count();
            var purchaseOrderCount = count + 1;
            invoiceObject.invoiceNumber = "Invoice " + purchaseOrderCount;

            fdaMetaData.create(data, (err, result) => {
              if (err) {
                let obj = { status: 0, data: err };
                deferred.resolve(obj);
              } else {
                invoiceObject.fdalebelId = result._id;
                orderCreate.create(invoiceObject);
                fdaMetaData.findOne(
                  { _id: mongoose.Types.ObjectId(result._id) },
                  async (err, result) => {
                    let containerSrNos =
                      data.packagingDetails &&
                      data.packagingDetails.length > 0 &&
                      data.packagingDetails.includes("containers")
                        ? result.containers[0].srNo.split(",")
                        : [];
                    let palletsSrNos =
                      data.packagingDetails &&
                      data.packagingDetails.length > 0 &&
                      data.packagingDetails.includes("pallets")
                        ? result.pallets[0].srNo.split(",")
                        : [];
                    let masterCartonsSrNos =
                      data.packagingDetails &&
                      data.packagingDetails.length > 0 &&
                      data.packagingDetails.includes("masterCartons")
                        ? result.masterCartons[0].srNo.split(",")
                        : [];
                    let innerCartonsSrNos =
                      data.packagingDetails &&
                      data.packagingDetails.length > 0 &&
                      data.packagingDetails.includes("innerCartons")
                        ? result.innerCartons[0].srNo.split(",")
                        : [];
                    let productSrNos =
                      data.packagingDetails &&
                      data.packagingDetails.length > 0 &&
                      data.packagingDetails.includes("product")
                        ? result.product[0].srNo.split(",")
                        : [];

                    let resArr = [];
                    if (containerSrNos && containerSrNos.length > 0) {
                      containerSrNos.forEach((val) => {
                        let obj = {
                          productId: result.productId,
productCode: result.productCode,
                          packageType: result.packageType,
                          srNo: val,
                          metaData: result.containers[0].metaData,
                          type: "containers",
                          size: result.containers[0].totalContainerNfts,
                          userId: result.userId,
                          fdaId: result._id,
                          packagingDetails: data.packagingDetails,
                          createdDate: Date.now(),
                        };                       
                        resArr.push(JSON.stringify(obj));
                      });
                    }
                    if (palletsSrNos && palletsSrNos.length > 0) {
                      palletsSrNos.forEach((val) => {
                        let obj = {
                          productId: result.productId,
productCode: result.productCode,
                          packageType: result.packageType,
                          srNo: val,
                          metaData: result.pallets[0].metaData,
                          type: "pallets",
                          size: result.pallets[0].totalContainerNfts,
                          userId: result.userId,
                          fdaId: result._id,
                          packagingDetails: data.packagingDetails,
                          createdDate: Date.now(),
                        };
                        resArr.push(JSON.stringify(obj));
                      });
                    }
                    if (masterCartonsSrNos && masterCartonsSrNos.length > 0) {
                      masterCartonsSrNos.forEach((val) => {
                        let obj = {
                          productId: result.productId,
productCode: result.productCode,
                          packageType: result.packageType,
                          srNo: val,
                          metaData: result.masterCartons[0].metaData,
                          type: "masterCartons",
                          size: result.masterCartons[0].totalContainerNfts,
                          userId: result.userId,
                          fdaId: result._id,
                          packagingDetails: data.packagingDetails,
                          createdDate: Date.now(),
                        };
                        resArr.push(JSON.stringify(obj));
                      });
                    }
                    if (innerCartonsSrNos && innerCartonsSrNos.length > 0) {
                      innerCartonsSrNos.forEach((val) => {
                        let obj = {
                          productId: result.productId,
productCode: result.productCode,
                          packageType: result.packageType,
                          srNo: val,
                          metaData: result.innerCartons[0].metaData,
                          type: "innerCartons",
                          size: result.innerCartons[0].totalContainerNfts,
                          userId: result.userId,
                          fdaId: result._id,
                          packagingDetails: data.packagingDetails,
                          createdDate: Date.now(),
                        };
                        resArr.push(JSON.stringify(obj));
                      });
                    }
                    if (productSrNos && productSrNos.length > 0) {
                      productSrNos.forEach((val) => {
                        let obj = {
                          productId: result.productId,
productCode: result.productCode,
                          packageType: result.packageType,
                          srNo: val,
                          metaData: result.product[0].metaData,
                          type: "product",
                          size: 0,
                          userId: result.userId,
                          fdaId: result._id,
                          packagingDetails: data.packagingDetails,
                          createdDate: Date.now(),
                        };
                        resArr.push(JSON.stringify(obj));
                      });
                    }

                    await self.sendDataToIpfs(resArr, typedata);
                  }
                );
          
                let obj = { status: 1, data: result };
                deferred.resolve(obj);
              }
            });

       
          });
        
      } else {
        let obj = { status: 0, data: result.data };
        deferred.resolve(obj);
      }
    });
    return deferred.promise;
  },
  convertIntoPrice: async (packageType, totalNfts, schema) => {
    var deferred = Q.defer();
    let getDataModelCon = await self.createDatabase("DB_"+schema);
    let [PaymentStatusUpdate,ipfsdata,ipfsUpdated,fdaMetaData,priceList,orderCreate,paymentModeDetails,discountDetails] = getDataModelCon;
    priceList
      .aggregate([
        {
          $match: { _id: mongoose.Types.ObjectId(packageType) },
        },
        {
          $project: {
            _id: 0,
            priceType:1,
            totalPriceUSD: {
              $multiply: [totalNfts, { $toInt: "$price"}],
            },
            totalPriceINR: {
              $multiply: [totalNfts, { $toInt: "$price"}],
            },
          },
        },
      ])
      .exec((err, result) => {
        // console.log(result, "resultresultresult")
        if (err) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          let obj = { status: 1, data: Object.assign({}, result)[0] };
          deferred.resolve(obj);
        }
      });
    return deferred.promise;
  },
  getPaymentMode: async (schema) => {
    var deferred = Q.defer();
    let getDataModelCon = await self.createDatabase("DB_"+schema);
    let [PaymentStatusUpdate,ipfsdata,ipfsUpdated,fdaMetaData,priceList,orderCreate,paymentModeDetails,discountDetails] = getDataModelCon;
    paymentModeDetails.findOne({ status: 1 }, (err, result) => {
      if (err) {
        let obj = { status: 0, data: err };
        deferred.resolve(obj);
      } else {
        let obj = { status: 1, data: result };
        deferred.resolve(obj);
      }
    });
    return deferred.promise;
  },
  sendDataToIpfs: async function (resArr, typedata, i = 0) {
    var deferred = Q.defer();

    let getDataModelCon = await self.createDatabase("DB_"+typedata);
    let [PaymentStatusUpdate,ipfsdata,ipfsUpdated,fdaMetaData,priceList,orderCreate,paymentModeDetails,discountDetails] = getDataModelCon;
	
	let j,data,chunk = 100;
    for (i, j = resArr.length; i <= j; i += chunk) {
      data = resArr.slice(i, i + chunk);
      break;
    }
    
    if (data == undefined) {
        let obj = { status: 1, data: {} };
        deferred.resolve(obj);
        console.log("containers completed");
    }
    
    let ind = 0;
    let ipfsData = []; 
    let count = await ipfsdata.count();
    for await (const value of data) {
      let filterData = JSON.parse(data[ind]);      
      let  getCount = count + ind;
      let hashStr = getCount+'centralized'+filterData.fdaId;      
      const hashData = await Hash.of(hashStr)
      let tempObj = {
        ipfsHash: hashData,        
        data: filterData,
        userId: filterData.userId,
        fdaId: filterData.fdaId,
        packagingDetails: filterData.packagingDetails,
      };
      ind++;
      ipfsData.push(tempObj);
    }

    if (ipfsData.length == data.length) {    
      var newData = {};
      newData.ipfsData = ipfsData;
      await self.ipfsdata(newData, typedata);
      let per = {
        fdaId: ipfsData[0].fdaId,
        userId: ipfsData[0].userId,
        percent: ((i + data.length) / resArr.length) * 100,
      };
      io.emit("ipfspercent", per);
      await self.sendDataToIpfs(resArr, typedata, i + 100);
    }
    // let obj = { status: 1, data: {} };
    // deferred.resolve(obj);
    return deferred.promise;
  },
  ipfsdata: async (data,typedata) => {
    var deferred = Q.defer();
    let getDataModelCon = await self.createDatabase("DB_"+typedata);
    let [PaymentStatusUpdate,ipfsdata,ipfsUpdated,fdaMetaData,priceList,orderCreate,paymentModeDetails,discountDetails] = getDataModelCon;
    data.ipfsData.map((item) => {
      item.fdaId = mongoose.Types.ObjectId(item.fdaId);
      item.userId = mongoose.Types.ObjectId(item.userId);
      return item;
    });
    ipfsdata.create(data.ipfsData, async (err, result) => {
      if (err) {
        let obj = { status: 0, data: err };
        deferred.resolve(obj);
      } else {
        let obj = { status: 1, data: result };
        deferred.resolve(obj);
      }
    });
    return deferred.promise;
  },
});