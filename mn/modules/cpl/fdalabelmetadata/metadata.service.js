"use strict";
// const {
//   fdaMetaData,
//   priceList,
//   orderCreate,
//   paymentModeDetails,
//   discountDetails,
//   ipfsdata,
// } = require("./metadata.model");

var _ = require("lodash");
const mongoose = require("mongoose");
const Q = require("q");
const ipfsClient = require("ipfs-http-client");
const projectId = "21m3JGtIpruaPTYPm5uEIPHQur4";
const projectSecret = "39030df3b480041f4cfdf8fb6ec80514";
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const ipfs = ipfsClient.create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

// const ipfs = ipfsClient.create({
//   host: "ipfs.medgrids.com",
//   protocol: "http",
// });

// const contractABI  = require('../../../ABI/createToken');
const contractABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_hash",
        type: "string",
      },
    ],
    name: "TokenAttached",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string[]",
        name: "_hashArray",
        type: "string[]",
      },
    ],
    name: "createNftToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "details",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "message",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "newMessage",
        type: "string",
      },
    ],
    name: "setMessage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_pause",
        type: "bool",
      },
    ],
    name: "setPause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "transferOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const Common = require("ethereumjs-common");
const config = require("../../../config.json");
var Tx = require("ethereumjs-tx").Transaction;
const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider(config.infuraAddress));
const privateKey1 = Buffer.from(config.privateKey, "hex");
// console.log(Common,"----------Common")
const newConn = require("../../../db/DBCustomConnection");
let {
  ipfsUpdatedSchema,
  ipfsSchema,
  paymentModeSchema,
  discountSchema,
  orderSchema,
  priceSchema,
  metaSchema,
} = require("./metadata.model");
const { PaymentStatusUpdateSchema } = require("../payment/payment.model");
let { productSchema } = require("../product/product.model");
const { async } = require("q");
let Schema = mongoose.Schema;
var self = (module.exports = {
  createDatabase: (databaseName) => {
    var deferred = Q.defer();
    let db = newConn.getDatabaseConnection(databaseName);
    const PaymentStatusUpdate = db.model(
      "PaymentStatusUpdate",
      PaymentStatusUpdateSchema,
      "tbl_order"
    );
    const ipfsdata = db.model("ipfsdata", ipfsSchema, "tbl_blockChainIpfsData");
    const ipfsUpdated = db.model(
      "ipfsUpdated",
      ipfsUpdatedSchema,
      "tbl_blockChainUpdatedIpfsData"
    );
    const fdaMetaData = db.model(
      "fdametadata",
      metaSchema,
      "tbl_fdalebelmetadata"
    );
    const priceList = db.model("priceList", priceSchema, "tbl_priceList");
    const orderCreate = db.model("orderCreate", orderSchema, "tbl_order");
    const paymentModeDetails = db.model(
      "paymentModeDetails",
      paymentModeSchema,
      "tbl_paymentModeDetails"
    );
    const discountDetails = db.model(
      "discountDetails",
      discountSchema,
      "tbl_userDiscount"
    );
    const productNewModel = db.model(
      "productNewModel",
      productSchema,
      "tbl_products"
    );
    deferred.resolve([
      PaymentStatusUpdate,
      ipfsdata,
      ipfsUpdated,
      fdaMetaData,
      priceList,
      orderCreate,
      paymentModeDetails,
      discountDetails,
      productNewModel,
    ]);
    return deferred.promise;
  },
  getProgressBar: async (data, typedata) => {
    var deferred = Q.defer();
    let getDataModelCon = await self.createDatabase("DB_" + typedata);
    let [
      PaymentStatusUpdate,
      ipfsdata,
      ipfsUpdated,
      fdaMetaData,
      priceList,
      orderCreate,
      paymentModeDetails,
      discountDetails,
      productNewModel,
    ] = getDataModelCon;

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
            totalNfts: { $toLong: "$totalNfts" },
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
                      { $toLong: "$count" },
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
                      { $toLong: "$count" },
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
          $project: {
            _id: 0,
            userId: mongoose.Types.ObjectId(data.userId),
            fdaId: "$_id",
            percent: {
              $ifNull: [
                { 
					$toLong: {
						$first: "$blockChainIpfsData.percentage"
					} 
				},
                0,
              ],
            },
            percentNft: {
              $ifNull: [
                {
                  $toLong: {
                    $first: "$blockChainUpdatedIpfsData.nftPercentage",
                  },
                },
                0,
              ],
            },
          },
        },
      ])
      .exec((err, result) => {
        // console.log(result, "resultresultresultresult");
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
  ipfsdata: async (data, typedata) => {
    var deferred = Q.defer();
    let getDataModelCon = await self.createDatabase("DB_" + typedata);
    let [
      PaymentStatusUpdate,
      ipfsdata,
      ipfsUpdated,
      fdaMetaData,
      priceList,
      orderCreate,
      paymentModeDetails,
      discountDetails,
      productNewModel,
    ] = getDataModelCon;
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

  updateNftHashData: (data) => {
    var deferred = Q.defer();
    let [
      fdaMetaData,
      priceList,
      orderCreate,
      paymentModeDetails,
      discountDetails,
      ipfsdata,
      ipfsUpdated,
      PaymentStatusUpdate,
    ] = data.schema;
    delete data.schema;
    ipfsdata
      .find(
        {
          fdaId: mongoose.Types.ObjectId(data.fdalebelId),
          userId: mongoose.Types.ObjectId(data.userId),
        },
        { fdaId: 1, ipfsHash: 1, nftTokenId: 1, nftTransactionHash: 1 }
      )
      .exec(async (err, fdaIpfsData) => {
        if (err) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          PaymentStatusUpdate.findOneAndUpdate(
            {
              fdalebelId: mongoose.Types.ObjectId(data.fdalebelId),
              userId: mongoose.Types.ObjectId(data.userId),
            },
            { $set: { generatedNftStatus: 1 } },
            { new: true }
          ).exec();
          console.log("++++++++++");
          console.log(fdaIpfsData);
          // return false;

          let contract = new web3.eth.Contract(
            contractABI,
            config.contractAddress
          );

          let nftHashData = [];
          for (let i = 0; i < fdaIpfsData.length; i++) {
            console.log(
              fdaIpfsData[i].ipfsHash,
              "======fdaIpfsData[i].ipfsHash"
            );
            const data = contract.methods
              .createMedSureToken(fdaIpfsData[i].ipfsHash)
              .encodeABI();
            let txCount;
            try {
              txCount = await web3.eth.getTransactionCount(
                config.accountAddress
              );
            } catch (error) {
              console.log(error);
            }

            console.log(txCount);
            const customChainParams = {
              name: "matic-mumbai",
              chainId: 80001,
              networkId: 80001,
            };
            const common = Common.default.forCustomChain(
              "goerli",
              customChainParams,
              "byzantium"
            );

            console.log(common, "++++++++++++");
            // return

            const txObject = {
              nonce: web3.utils.toHex(txCount),
              gasLimit: web3.utils.toHex(10000000),
              gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
              from: config.accountAddress,
              to: config.contractAddress,
              data: data,
            };

            const tx = new Tx(txObject, { common });

            tx.sign(privateKey1);

            const seraializedTransaction = tx.serialize();
            const _rawData = "0x" + seraializedTransaction.toString("hex");

            try {
              let createReceipt = await web3.eth.sendSignedTransaction(
                _rawData
              );
              console.log(createReceipt, "=====createReceipt");
              let logs = createReceipt.logs;
              let tokenId = web3.utils.hexToNumber(logs[0].topics[3]);
              let data1 = {
                ipfsHash: fdaIpfsData[i].ipfsHash,
                nftTokenId: tokenId + "",
                nftTransactionHash: createReceipt?.transactionHash,
              };

              let obj = { status: 1, data: "success" };
              deferred.resolve(obj);

              await self.updatenftsMode(
                data1.ipfsHash,
                data1.nftTokenId,
                data1.nftTransactionHash,
                data.schema
              );
              nftHashData.push(data1);
            } catch (error) {
              console.log(error);
            }
          }
        }
      });

    return deferred.promise;
  },

  updatenftsMode: (ipfsHash, nftTokenId, nftTransactionHash, schema) => {
    var deferred = Q.defer();
    let [
      fdaMetaData,
      priceList,
      orderCreate,
      paymentModeDetails,
      discountDetails,
      ipfsdata,
      ipfsUpdated,
    ] = schema;
    ipfsdata.findOneAndUpdate(
      { ipfsHash: ipfsHash },
      {
        $set: {
          nftTokenId: nftTokenId,
          nftTransactionHash: nftTransactionHash,
        },
      },
      function (err, result) {
        let obj = { status: 1 };
        deferred.resolve(obj);
      }
    );

    return deferred.promise;
  },

  discountPaymentMode: async (userId, schema) => {
    var deferred = Q.defer();

    let getDataModelCon = await self.createDatabase("DB_" + schema);
    let [
      PaymentStatusUpdate,
      ipfsdata,
      ipfsUpdated,
      fdaMetaData,
      priceList,
      orderCreate,
      paymentModeDetails,
      discountDetails,
      productNewModel,
    ] = getDataModelCon;
    discountDetails.findOne(
      { userId: mongoose.Types.ObjectId(userId) },
      (err, result) => {
        if (err || result == null) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          let obj = { status: 1, data: result };
          deferred.resolve(obj);
        }
      }
    );
    return deferred.promise;
  },
  getPaymentMode: async (schema) => {
    var deferred = Q.defer();
    let getDataModelCon = await self.createDatabase("DB_" + schema);
    let [
      PaymentStatusUpdate,
      ipfsdata,
      ipfsUpdated,
      fdaMetaData,
      priceList,
      orderCreate,
      paymentModeDetails,
      discountDetails,
      productNewModel,
    ] = getDataModelCon;
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
  convertIntoPrice: async (packageType, totalNfts, schema) => {
    var deferred = Q.defer();
    let getDataModelCon = await self.createDatabase("DB_" + schema);
    let [
      PaymentStatusUpdate,
      ipfsdata,
      ipfsUpdated,
      fdaMetaData,
      priceList,
      orderCreate,
      paymentModeDetails,
      discountDetails,
      productNewModel,
    ] = getDataModelCon;
    priceList
      .aggregate([
        {
          $match: { _id: mongoose.Types.ObjectId(packageType) },
        },
        {
          $project: {
            _id: 0,
            priceType: 1,
            totalPriceUSD: {
              $multiply: [totalNfts, { $toInt: "$price" }],
            },
            totalPriceINR: {
              $multiply: [totalNfts, { $toInt: "$price" }],
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
  addfdametadata: async (data, typedata, io) => {
    var deferred = Q.defer();

    // console.log('test........'); return;
    let getDataModelCon = await self.createDatabase("DB_" + typedata);
    let [
      PaymentStatusUpdate,
      ipfsdata,
      ipfsUpdated,
      fdaMetaData,
      priceList,
      orderCreate,
      paymentModeDetails,
      discountDetails,
      productNewModel,
    ] = getDataModelCon;

    self
      .convertIntoPrice(
        data.subscriptionPackage,
        parseInt(data.totalNfts),
        typedata
      )
      .then((result) => {
        if (result.status == 1) {
          data.flatDiscount = 0;
          data.totalPriceUSD = result.data.totalPriceUSD;
          data.totalPriceINR = result.data.totalPriceINR;
          data.priceUSDType = "USD";
          data.priceINRType = "INR";
          self.getPaymentMode(typedata).then(async (paymentResult) => {
            var invoiceObject = {
              productId: data.productId,
              productCode: data.productCode,
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
                    let productData = await productNewModel
                      .findOne({
                        _id: mongoose.Types.ObjectId(result.productId),
                      })
                      .exec();
                    if (containerSrNos && containerSrNos.length > 0) {
                      containerSrNos.forEach((val) => {
                        let obj = {
                          productData: productData,
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
                          productData: productData,
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
                          productData: productData,
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
                          productData: productData,
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
                      productSrNos.forEach(async (val) => {
                        let obj = {
                          productData: productData,
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

                    // console.log("+++++++++");
                    // console.log(resArr.length);
                    // console.log("+++++++++11111111111");
                    self.sendDataToIpfs(resArr, typedata);
                  }
                );

                let obj = { status: 1, data: result };
                deferred.resolve(obj);
              }
            });
          });
          // });
        } else {
          let obj = { status: 0, data: result.data };
          deferred.resolve(obj);
        }
      });
    return deferred.promise;
  },
  sendDataToIpfs: async function (resArr, typedata, i = 0) {
    var deferred = Q.defer();
    let getDataModelCon = await self.createDatabase("DB_" + typedata);
    let [
      PaymentStatusUpdate,
      ipfsdata,
      ipfsUpdated,
      fdaMetaData,
      priceList,
      orderCreate,
      paymentModeDetails,
      discountDetails,
      productNewModel,
    ] = getDataModelCon;

    let j,
      data,
      chunk = 100;
    for (i, j = resArr.length; i <= j; i += chunk) {
      data = resArr.slice(i, i + chunk);
      break;
    }

    // console.log("++++++data+++++++++");
    // console.log(data);
    console.time("Ipfs Genrate Time End this");
    if (data == undefined) {
      let obj = { status: 1, data: {} };
      deferred.resolve(obj);
      console.log("ipfs completed");
    }

    let ind = 0;
    let ipfsData = [];
    // const delayNew = n => new Promise(res => setTimeout(res, n));
    for await (const value of ipfs.addAll(data)) {
      let filterData = JSON.parse(data[ind]);
      let tempObj = {
        ipfsHash: value.path,
        data: filterData,
        userId: filterData.userId,
        fdaId: filterData.fdaId,
        packagingDetails: filterData.packagingDetails,
      };
      ind++;
      ipfsData.push(tempObj);
    }
    // await delayNew(400);

    // console.log("++++++--------------+++++++++");
    console.timeEnd("Ipfs Genrate Time End this");
    console.log(ipfsData, "ipfsData genrate data");
    // console.log(data.length);

    if (ipfsData.length == data.length) {
      // console.log("++++++Shahi+++++++++");
      // console.log(ipfsData);
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

    return deferred.promise;
  },

  updatefdametadata: async (data) => {
    var deferred = Q.defer();
    let [
      fdaMetaData,
      priceList,
      orderCreate,
      paymentModeDetails,
      discountDetails,
      ipfsdata,
      ipfsUpdated,
    ] = data.schema;
    delete data.schema;
    self
      .convertIntoPrice(data.packageType, data.totalNfts, data.schema)
      .then((result) => {
        if (result.status == 1) {
          self
            .discountPaymentMode(data.userId, data.schema)
            .then((discountResult) => {
              if (discountResult.status == 1) {
                data.flatDiscount = discountResult.data.flatDiscount;
                data.totalPriceUSD =
                  result.data.totalPriceUSD - discountResult.data.flatDiscount;
                data.totalPriceINR = result.data.totalPriceINR;
              } else {
                data.flatDiscount = 0;
                data.totalPriceUSD = result.data.totalPriceUSD;
                data.totalPriceINR = result.data.totalPriceINR;
              }

              data.priceUSDType = result.data.priceUSDType;
              data.priceINRType = result.data.priceINRType;
              // data.paymentType = data.paymentType ? data.paymentType : "credit";

              self.getPaymentMode(data.schema).then((paymentResult) => {
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
                  priceUSDType: result.data.priceUSDType,
                  priceINRType: result.data.priceINRType,
                  createdAt: { type: Date, required: true },
                  updateAt: { type: Date, required: true },
                };

                if (paymentResult.status == 1) {
                  // 0 - pendind paymentStatus, 1 - processing paymentStatus, 2 - paid paymentStatus, 3 - unpaid paymentStatus

                  data.overDueDays = paymentResult.data.overDueDays;
                  data.dueDate = paymentResult.data.dueDate;
                  data.paymentType = paymentResult.data.paymentType;

                  invoiceObject.overDueDays = paymentResult.data.overDueDays;
                  invoiceObject.dueDate = paymentResult.data.dueDate;
                  invoiceObject.paymentType = paymentResult.data.paymentType;
                } else {
                  data.overDueDays = 0;
                  data.dueDate = 0;
                  data.paymentType = "cash";

                  invoiceObject.overDueDays = 0;
                  invoiceObject.dueDate = 0;
                  invoiceObject.paymentType = "cash";
                }

                orderCreate.count(function (err, count) {
                  var purchaseOrderCount = count + 1;
                  invoiceObject.invoiceNumber = "Invoice " + purchaseOrderCount;
                });

                fdaMetaData.findOneAndUpdate(
                  {
                    _id: mongoose.Types.ObjectId(data.fdalebelId),
                    productId: mongoose.Types.ObjectId(data.productId),
                    userId: mongoose.Types.ObjectId(data.userId),
                  },
                  { $set: data },
                  { new: true },
                  (err, result) => {
                    if (err) {
                      let obj = { status: 0, data: err };
                      deferred.resolve(obj);
                    } else {
                      invoiceObject.fdalebelId = result._id;
                      orderCreate.findOneAndUpdate(
                        {
                          fdalebelId: mongoose.Types.ObjectId(data.fdalebelId),
                          productId: mongoose.Types.ObjectId(data.productId),
                          userId: mongoose.Types.ObjectId(data.userId),
                        },
                        invoiceObject
                      );
                      let obj = { status: 1, data: result };
                      deferred.resolve(obj);
                    }
                  }
                );
              });
            });
        } else {
          let obj = { status: 0, data: result.data };
          deferred.resolve(obj);
        }
      });
    return deferred.promise;
  },
  getfdametadata: (data) => {
    var deferred = Q.defer();
    let [
      fdaMetaData,
      priceList,
      orderCreate,
      paymentModeDetails,
      discountDetails,
      ipfsdata,
      ipfsUpdated,
    ] = data.schema;
    delete data.schema;
    orderCreate
      .aggregate([
        {
          $match: { _id: mongoose.Types.ObjectId(data.orderId) },
        },
        {
          $lookup: {
            from: "tbl_fdalebelmetadata",
            let: { id: "$fdalebelId", pId: "$productId", uId: "$userId" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: ["$_id", "$$id"],
                      },
                      {
                        $eq: [mongoose.Types.ObjectId(data.productId), "$$pId"],
                      },
                      {
                        $eq: [mongoose.Types.ObjectId(data.userId), "$$uId"],
                      },
                    ],
                  },
                },
              },
            ],
            as: metadata,
          },
        },
        // {
        // $lookup: {
        // from: "tbl_fdalebelmetadata",
        // localField: "fdalebelId",
        // foreignField: "_id",
        // as: "metadata"
        // }
        // },
        // {
        // "$unwind": {
        // "path": "$metadata",
        // "preserveNullAndEmptyArrays": true
        // }
        // }
      ])
      .exec((err, result) => {
        console.log("testinggggggg");
        console.log(result);
        return false;

        if (err) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          let obj = { status: 1, data: Object.assign({}, result)[0] };
          deferred.resolve(obj);
        }
      });
    return deferred.promise;

    // fdaMetaData.orderSchema({"_id":mongoose.Types.ObjectId(data.orderId)}, (err, orderResult) => {
    // if (err || orderResult == null) {
    // let obj = {"status":0,"data":err}
    // deferred.resolve(obj)
    // } else {
    // let obj = {"status":1,"data":result}
    // deferred.resolve(obj)
    // }
    // });
    // fdaMetaData.findOne({"_id":mongoose.Types.ObjectId(data.fdalebelId), "productId":mongoose.Types.ObjectId(data.productId), "userId":mongoose.Types.ObjectId(data.userId)}, (err, result) => {
    // if (err || result == null) {
    // let obj = {"status":0,"data":err}
    // deferred.resolve(obj)
    // } else {
    // let obj = {"status":1,"data":result}
    // deferred.resolve(obj)
    // }
    // });
    return deferred.promise;
  },

  getpackageNameByproId: async (packageId, typedata) => {
    var deferred = Q.defer();
    let getDataModelCon = await self.createDatabase("DB_" + typedata);
    console.log("packageId....", packageId);
    let [
      PaymentStatusUpdate,
      ipfsdata,
      ipfsUpdated,
      fdaMetaData,
      priceList,
      orderCreate,
      paymentModeDetails,
      discountDetails,
      productNewModel,
    ] = getDataModelCon;
    priceList
      .findOne({ _id: mongoose.Types.ObjectId(packageId) })
      .exec((err, result) => {
        if (err) {
          deferred.resolve(err);
        } else {
          deferred.resolve(result);
        }
      });
    return deferred.promise;
  },
  getPaymentType: async (schema) => {
    var deferred = Q.defer();
    console.log("schema.......", schema);
    let getDataModelCon = await self.createDatabase("DB_" + schema);
    let [
      PaymentStatusUpdate,
      ipfsdata,
      ipfsUpdated,
      fdaMetaData,
      priceList,
      orderCreate,
      paymentModeDetails,
      discountDetails,
      productNewModel,
    ] = getDataModelCon;
    paymentModeDetails.findOne({ status: parseInt(1) }).exec((err, result) => {
      if (err) {
        deferred.resolve(err);
      } else {
        deferred.resolve(result);
      }
    });
    return deferred.promise;
  },
});
