"use strict";
var _ = require("lodash");
const mongoose = require("mongoose");
const Q = require("q");
const Schema = mongoose.Schema;
const newConn = require("../../../db/DBCustomConnection");
const ipfsClient = require("ipfs-http-client");
const Hash = require("ipfs-only-hash");
const axios = require("axios");
const projectId = "eca916e7c72b4516804a99eb35f39604";
const projectSecret = "c808f1b31f8c4b2a95fa9c726b67a38a";
const auth = "Basic " + projectId + ":" + projectSecret;
const ipfs = ipfsClient.create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});
let lastTrxCount = 0;
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
    name: "createMedSureToken",
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
const { async } = require("q");
const web3 = new Web3(new Web3.providers.HttpProvider(config.infuraAddress));
const privateKey1 = Buffer.from(config.privateKey, "hex");

const ipfsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  ipfsHash: { type: String },
  nftTokenId: { type: String, default: "" },
  nftBurnByUserId: { type: String, default: "" },
  nftSaveUserId: { type: String, default: "" },
  nftSaveUserIdDate: { type: Date, default: "" },
  nftTransactionHash: { type: String, default: "" },
  nftTransactionError: { type: String, default: "" },
  fdaId: { type: Schema.Types.ObjectId, required: true },
  userType: { type: String },
  data: { type: Object, default: {} },
  packagingDetails: { type: Array, required: true },
  status: { type: Number, default: 1 },
  createdDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});
const ipfsUpdatedSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  ipfsHash: { type: String },
  nftTokenId: { type: String, default: "" },
  nftBurnByUserId: { type: String, default: "" },
  nftSaveUserId: { type: String, default: "" },
  nftSaveUserIdDate: { type: Date, default: "" },
  nftTransactionHash: { type: String, default: "" },
  nftTransactionError: { type: String, default: "" },
  fdaId: { type: Schema.Types.ObjectId, required: true },
  nftSaveLocation: { type: { type: String }, coordinates: [Number] },
  nftTicketStatus: { type: String, default: 0 },
  userType: { type: String },
  data: { type: Object, default: {} },
  status: { type: Number, default: 1 },
  printerStatus: { type: String, default: "0" },
  scannerStatus: { type: String, default: "0" },
  // New Fields Added
  qrStatus: { type: String, default: "1" }, // 1 - Genrated 2- Printed 3- Sacaned
  qrAddUser: { type: String, default: "" },
  qrEditUser: { type: String, default: "" },
  qrReprint: { type: String, default: "N" },
  qrReprintCount: { type: String, default: "0" },
  transactionId: { type: String, default: "" },
  transactionDate: { type: Date, default: Date.now },
  deliveryIntentNo: { type: String, default: "" },
  price: { type: String, default: "" },
  // New Fields Added
  qrCodeUrl: { type: String, default: "" },
  createdDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});
ipfsUpdatedSchema.index({ nftSaveLocation: "2dsphere" });

const PaymentStatusUpdateSchema = new Schema({
  paymentStatus: { type: Number, required: true },
  generatedNftStatus: { type: Number },
  fdalebelId: { type: Schema.Types.ObjectId, required: true },
});
const metaFdaSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, required: true },
  userId: { type: Schema.Types.ObjectId, required: true },
});
const priceFdaSchema = new Schema({
  productId: { type: Schema.Types.ObjectId },
  name: { type: String, required: true },
  smartId: { type: String, required: true },
  subscriptionValue: { type: Number },
});

const smartContractNewSchema = new Schema({
  blockChainName: { type: String, required: true },
  accountAddress: { type: String, required: true, max: 50 },
  userId: { type: Schema.Types.ObjectId },
  contractAddress: { type: String, default: "", max: 50 },
  quickNodeURL: { type: String, required: true },
  // mnemonicKey: { type: String, default:'' },
  // privateKey: { type: String, default:'' },
  status: { type: Number, default: 1 },
  smartStatus: { type: Number, default: 0 },
  useStatus: { type: Number, default: 0 },
  createdDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});

var self = (module.exports = {
  createDatabase: (databaseName) => {
    var deferred = Q.defer();
    let db = newConn.getDatabaseConnection(databaseName);
    const ipfsdata = db.model("ipfsdata", ipfsSchema, "tbl_blockChainIpfsData");
    const SmartContract = db.model(
      "smartContractNewData",
      smartContractNewSchema,
      "tbl_smartcontract_details"
    );
    const ipfsUpdated = db.model(
      "ipfsUpdated",
      ipfsUpdatedSchema,
      "tbl_blockChainUpdatedIpfsData"
    );
    const PaymentStatusUpdate = db.model(
      "PaymentStatusUpdate",
      PaymentStatusUpdateSchema,
      "tbl_order"
    );
    const fdaProMetaData = db.model(
      "fdametadata",
      metaFdaSchema,
      "tbl_fdalebelmetadata"
    );
    const packageList = db.model("priceList", priceFdaSchema, "tbl_priceList");

    deferred.resolve([
      SmartContract,
      ipfsdata,
      PaymentStatusUpdate,
      ipfsUpdated,
      fdaProMetaData,
      packageList,
    ]);
    return deferred.promise;
  },
  updateNftHashCentralizedData: async (data, typedata) => {
    var deferred = Q.defer();
    let getData = await self.createDatabase("DB_" + typedata);
    let [
      SmartContract,
      ipfsdata,
      PaymentStatusUpdate,
      ipfsUpdated,
      fdaProMetaData,
      packageList,
    ] = getData;

    var bulkSize = 100;

    let obj = { status: 1, data: "sucess" };
    deferred.resolve(obj);

    let BulkRequest_Array = [];
    const cursor = ipfsdata
      .find(
        {
          userId: mongoose.Types.ObjectId(data.userId),
          fdaId: mongoose.Types.ObjectId(data.fdalebelId),
        },
        { fdaId: 1, ipfsHash: 1, nftTokenId: 1, nftTransactionHash: 1 }
      )
      .lean()
      .cursor({ batchSize: bulkSize });
    cursor
      .on("data", async (doc) => {
        BulkRequest_Array.push(doc);
        let resArr = [];
        if (BulkRequest_Array.length >= bulkSize) {
          cursor.pause();
          let count = 1;
          const delay = (n) => new Promise((res) => setTimeout(res, n));
          BulkRequest_Array.forEach(async (val, ind) => {
            let getCount = parseInt(count + ind);
            let hashStr = getCount + "nftcentralize" + val.ipfsHash;
            let nfthashData = await Hash.of(hashStr);
            let nftTokenId_ = getCount;
            let data1 = {
              ipfsHash: val.ipfsHash,
              nftTokenId: nftTokenId_,
              nftTransactionHash: nfthashData,
              nftTransactionError: "",
              qrAddUser: mongoose.Types.ObjectId(data.userId),
              qrEditUser: mongoose.Types.ObjectId(data.userId),
            };
            resArr.push(data1);
            count = count + 1;
          });
          let ress = await self.updatenftsMode(resArr, 1, "DB_" + typedata);
          await delay(1200);
          BulkRequest_Array.length = 0;
          cursor.resume();
        }
      })
      .on("end", async function () {
        let resArr = [];
        let count = await ipfsUpdated.count();
        count = count + 1;
        if (BulkRequest_Array.length > 0) {
          const delay = (n) => new Promise((res) => setTimeout(res, n));
          BulkRequest_Array.forEach(async (val, ind) => {
            let getCount = parseInt(count + ind);
            let hashStr = getCount + "nftcentralize" + val.ipfsHash;
            let nfthashData = await Hash.of(hashStr);
            let nftTokenId_ = getCount;
            let data1 = {
              ipfsHash: val.ipfsHash,
              nftTokenId: nftTokenId_,
              nftTransactionHash: nfthashData,
              nftTransactionError: "",
              qrAddUser: mongoose.Types.ObjectId(data.userId),
              qrEditUser: mongoose.Types.ObjectId(data.userId),
            };
            resArr.push(data1);
          });
          await delay(200);
          await self.updatenftsMode(resArr, 1, "DB_" + typedata);
        }
        console.log("Done!");
        return false;
      });

    PaymentStatusUpdate.findOneAndUpdate(
      {
        fdalebelId: mongoose.Types.ObjectId(data.fdalebelId),
        userId: mongoose.Types.ObjectId(data.userId),
      },
      { $set: { generatedNftStatus: 1 } },
      { new: true }
    ).exec();

    return deferred.promise;
  },

  // changeDataAsChunk: async function (
  // databaseName,
  // resArr,
  // fdalebelId,
  // userId,
  // i = 0
  // ) {
  // let j,
  // data,
  // chunk = 100;
  // console.time("Nft Genrate Time End this");
  // for (i, j = resArr.length; i <= j; i += chunk) {
  // data = resArr.slice(i, i + chunk);
  // break;
  // }

  // var nftHashData = await self.createNftCentralized(data, databaseName);

  // if (nftHashData.data.length <= data.length) {
  // console.timeEnd("Nft Genrate Time End this");
  // let per = {
  // fdaId: mongoose.Types.ObjectId(fdalebelId),
  // userId: mongoose.Types.ObjectId(userId),
  // percent: ((i + data.length) / resArr.length) * 100,
  // };
  // io.emit("ipfspercent", per);
  // await self.changeDataAsChunk(
  // databaseName,
  // resArr,
  // fdalebelId,
  // userId,
  // i + 100
  // );
  // }
  // return false;
  // },

  createNftCentralized: async (dataArr, databaseName) => {
    var deferred = Q.defer();
    let getData = await self.createDatabase(databaseName);
    let [
      SmartContract,
      ipfsdata,
      PaymentStatusUpdate,
      ipfsUpdated,
      fdaProMetaData,
      packageList,
    ] = getData;
    let nftHashData = [];
    let count = await ipfsUpdated.count();
    let static_ = 59999;
    for (const index in dataArr) {
      let getCount = count + index;
      let hashStr = getCount + "nftcentralize" + dataArr[index];
      let nfthashData = await Hash.of(hashStr);
      let nftTokenId_ = static_ + getCount;
      let data1 = {
        ipfsHash: dataArr[index],
        nftTokenId: nftTokenId_,
        nftTransactionHash: nfthashData,
        nftTransactionError: "",
      };
      nftHashData.push(data1);
    }
    await self.updatenftsMode(nftHashData, 1, databaseName);
    return deferred.promise;
  },

  updatenftsMode: async (ipfsArray, count, databaseName) => {
    var deferred = Q.defer();
    let getData = await self.createDatabase(databaseName);
    let [
      SmartContract,
      ipfsdata,
      PaymentStatusUpdate,
      ipfsUpdated,
      fdaProMetaData,
      packageList,
    ] = getData;

    let obj = { status: 1 };
    deferred.resolve(obj);
    let filterTypeData = databaseName.split("_")[1];
    // console.log('ipfsArray...............',ipfsArray);

    if (count == 1) {
      var filterArray = [];
      ipfsArray.map((item) => {
        filterArray.push(item.ipfsHash);
      });

      const filterNewwArray = await Promise.all(
        ipfsArray.map(async (item) => {
          return await {
            originalURL:
              "http://20.192.1.109:3000/nft-burn/" +
              filterTypeData +
              "/" +
              item.ipfsHash,
          };
        })
      );

      ipfsdata
        .aggregate([
          {
            $match: {
              ipfsHash: {
                $in: filterArray,
              },
            },
          },
          {
            $project: {
              _id: 0,
              nftBurnByUserId: 1,
              nftSaveUserId: 1,
              nftTransactionHash: 1,
              nftTransactionError: 1,
              data: 1,
              status: 1,
              nftSaveUserIdDate: 1,
              ipfsHash: 1,
              userId: 1,
              fdaId: 1,
              nftTokenId: {
                $filter: {
                  input: ipfsArray,
                  as: "rawArray",
                  cond: {
                    $eq: ["$$rawArray.ipfsHash", "$ipfsHash"],
                  },
                },
              },
              nftTransactionHash: {
                $filter: {
                  input: ipfsArray,
                  as: "rawArray",
                  cond: {
                    $eq: ["$$rawArray.ipfsHash", "$ipfsHash"],
                  },
                },
              },
              nftTransactionError: {
                $filter: {
                  input: ipfsArray,
                  as: "rawArray",
                  cond: {
                    $eq: ["$$rawArray.ipfsHash", "$ipfsHash"],
                  },
                },
              },
            },
          },
          {
            $project: {
              _id: 0,
              nftBurnByUserId: 1,
              nftSaveUserId: 1,
              nftTransactionHash: 1,
              nftTransactionError: 1,
              data: 1,
              status: 1,
              nftSaveUserIdDate: 1,
              ipfsHash: 1,
              userId: 1,
              fdaId: 1,
              nftTransactionError: {
                $first: "$nftTransactionError.nftTransactionError",
              },
              nftTokenId: { $first: "$nftTokenId.nftTokenId" },
              nftTransactionHash: {
                $first: "$nftTransactionHash.nftTransactionHash",
              },
            },
          },
        ])
        .exec(async (err, filterData) => {
          // console.log('filterData...............',filterData);
          var updateData = await ipfsUpdated.create(filterData);
          await self.fetchFilterData(filterNewwArray, databaseName);
        });
    } else {
      console.log("else part.......");
    }
    return deferred.promise;
  },

  fetchFilterData: async (ipfsArray, databaseName) => {
    var deferred = Q.defer();
    let getData = await self.createDatabase(databaseName);
    let [
      SmartContract,
      ipfsdata,
      PaymentStatusUpdate,
      ipfsUpdated,
      fdaProMetaData,
      packageList,
    ] = getData;

    const url = "https://api.short.io/links/bulk";
    let res = await axios.post(
      url,
      {
        domain: "7g8m.short.gy",
        links: ipfsArray,
      },
      {
        headers: {
          authorization: "sk_LnAt9iMoj3n2UI3E",
        },
      }
    );

    var filterData = res.data;

    // console.log(res.data, "res.datares.datares.datares.data");

    var filterWillUpdateData = [];
    let firebaseData = await Promise.all(
      filterData.map(async (item) => {
        var filterSep = item.originalURL.split("/");
        filterWillUpdateData.push({
          ipfsHash: filterSep[filterSep.length - 1],
          qrCodeUrl: item.shortURL,
        });
        return item;
      })
    );

    var filterData = await ipfsUpdated.bulkWrite(
      filterWillUpdateData.map((data) => ({
        updateOne: {
          filter: { ipfsHash: data.ipfsHash },
          update: {
            $set: {
              qrCodeUrl: data.qrCodeUrl,
            },
          },
          upsert: true,
        },
      }))
    );

    // var updateData = await ipfsUpdated.create(firebaseData);
    deferred.resolve(res.data);
  },
});
