"use strict";
var _ = require("lodash");
const mongoose = require("mongoose");
const Q = require("q");
var CryptoJS = require("crypto-js");
const Schema = mongoose.Schema;
const AWS = require("aws-sdk");
const newConn = require("../../../db/DBCustomConnection");
const ipfsClient = require("ipfs-http-client");
const projectId = "eca916e7c72b4516804a99eb35f39604";
const projectSecret = "c808f1b31f8c4b2a95fa9c726b67a38a";
const auth = "Basic " + projectId + ":" + projectSecret;
const axios = require("axios");
const ipfs = ipfsClient.create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

let lastTrxCount = 0;
var secretsmanager = new AWS.SecretsManager({
  region: "ap-south-1",
  accessKeyId: "AKIA4CMJKB6YJS7LD5OD",
  secretAccessKey: "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",
});

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
      // "tbl_blockChainUpdatedIpfsDataTesting"
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
  updateNftHashData: async (data, typedata) => {
    var deferred = Q.defer();
    var bulkSize = 100;
    let databaseName = "DB_" + typedata;
    let getData = await self.createDatabase("DB_" + typedata);
    let [
      SmartContract,
      ipfsdata,
      PaymentStatusUpdate,
      ipfsUpdated,
      fdaProMetaData,
      packageList,
    ] = getData;

    try {
      const cursor = ipfsdata
        .find(
          {
            fdaId: mongoose.Types.ObjectId(data.fdalebelId),
            userId: mongoose.Types.ObjectId(data.userId),
          },
          { fdaId: 1, ipfsHash: 1, nftTokenId: 1, nftTransactionHash: 1 }
        )
        .lean()
        .cursor({ batchSize: 100 });

      let obj = { status: 1, data: "sucess" };
      deferred.resolve(obj);
      PaymentStatusUpdate.findOneAndUpdate(
        {
          fdalebelId: mongoose.Types.ObjectId(data.fdalebelId),
          userId: mongoose.Types.ObjectId(data.userId),
        },
        { $set: { generatedNftStatus: 1 } },
        { new: true }
      ).exec();

      var BulkRequest_Array = [];
      cursor
        .on("data", async (doc) => {
          BulkRequest_Array.push(doc);
          if (BulkRequest_Array.length >= 100) {
            cursor.pause();
			const delay = (n) => new Promise((res) => setTimeout(res, n));
            let resArr = [];
            BulkRequest_Array.forEach((val) => {
              resArr.push(val.ipfsHash);
            });			

            await self.createNft(
              resArr,
              databaseName,
              mongoose.Types.ObjectId(data.userId),
              data.subscriptionPackage
            );
			
			// console.log(resArr, "11111111111111111111")			
            
            // let totalData = ipfsdata
              // .find({
                // userId: mongoose.Types.ObjectId(data.userId),
                // fdaId: mongoose.Types.ObjectId(data.fdalebelId),
              // })
              // .count();
            // let insertData = ipfsUpdated
              // .find({
                // userId: mongoose.Types.ObjectId(data.userId),
                // fdaId: mongoose.Types.ObjectId(data.fdalebelId),
              // })
              // .count();

            // let per = {
              // fdaId: mongoose.Types.ObjectId(data.fdalebelId),
              // userId: mongoose.Types.ObjectId(data.userId),
              // percent: (insertData.length / totalData.length) * 100,
            // };
            // io.emit("ipfspercent", per);
			await delay(10000);
			
            BulkRequest_Array.length = 0;
			cursor.resume();
          }
        })
        .on("end", async function () {
			
          let resArr = [];
          if (BulkRequest_Array.length > 0) {
			  
            BulkRequest_Array.forEach((val) => {
              resArr.push(val.ipfsHash);
            });
			
            await self.createNft(
              resArr,
              databaseName,
              mongoose.Types.ObjectId(data.userId),
              data.subscriptionPackage
            );
			
          }
          // let totalData = ipfsdata
            // .find({
              // fdaId: mongoose.Types.ObjectId(data.fdalebelId),
              // userId: mongoose.Types.ObjectId(data.userId),
            // })
            // .count();
          // let insertData = ipfsUpdated
            // .find({
              // fdaId: mongoose.Types.ObjectId(data.fdalebelId),
              // userId: mongoose.Types.ObjectId(data.userId),
            // })
            // .count();
          // let per = {
            // fdaId: mongoose.Types.ObjectId(data.fdalebelId),
            // userId: mongoose.Types.ObjectId(data.userId),
            // percent: (insertData.length / totalData.length) * 100,
          // };
          // io.emit("ipfspercent", per);
          console.log("Done!");
          return false;
        });
    } catch (e) {
      console.error(e);
    }

    return deferred.promise;
  },
  
  createNft: async (dataArr, databaseName, userId, subscriptionPackage) => {
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

    let getPackageList = await packageList
      .findOne({ _id: mongoose.Types.ObjectId(subscriptionPackage) })
      .exec();
	  
	let getMDetails = await self.getNftsDetailsFromServer(
      userId,
      getPackageList.smartId,
      databaseName
    );
	
	// console.log(getPackageList, "Send Data to Ploygen Scan", getMDetails);
	
	// return false;

    console.log(dataArr, "Send Data to Ploygen Scan", dataArr.length);
	console.time("Nft Genrate Time End this");

    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        getMDetails.data.getSmartDetails.quickNodeURL
      )
    );

    const fetchPrivateKey = Buffer.from(getMDetails.data.privateKey, "hex");

    let contract = new web3.eth.Contract(
      contractABI,
      getMDetails.data.getSmartDetails.contractAddress
    );
    let nftHashData = [];
    const data = contract.methods.createNftToken(dataArr).encodeABI();
    let txCount;

    try {
      txCount = await web3.eth.getTransactionCount(
        getMDetails.data.getSmartDetails.accountAddress
      );
	  console.log(txCount, "=====txCounttxCount");
    } catch (error) {
		console.time("Nft Genrate Errors");
		console.log(error, "txCount");
    }

    const chainId = await web3.eth.net.getId();
    const customChainParams = {
      name: "matic",
      chainId: chainId,
    };

    const common = Common.default.forCustomChain(
      "goerli",
      customChainParams,
      "byzantium"
    );

    let gasPrice = await web3.eth.getGasPrice();
    gasPrice = parseInt(gasPrice * 1.1);
    const txObject = {
      nonce: web3.utils.toHex(txCount),
      gasLimit: web3.utils.toHex(20000000),
      gasPrice: web3.utils.toHex(web3.utils.toWei(String(gasPrice), "wei")),
      from: getMDetails.data.getSmartDetails.accountAddress,
      to: getMDetails.data.getSmartDetails.contractAddress,
      data: data,
    };

    const tx = new Tx(txObject, { common });
    tx.sign(fetchPrivateKey);
    const seraializedTransaction = tx.serialize();
    const _rawData = "0x" + seraializedTransaction.toString("hex");

    try {
		console.log("=====22222222222==============");
      let createReceipt = await web3.eth.sendSignedTransaction(_rawData);
      // console.log(createReceipt, "=====createReceipt");
      let events = createReceipt.logs;

      const knownEventTokens = contract.options.jsonInterface.filter(
        (token) => {
          return token.type === "event";
        }
      );

      for (const event of events) {
        const eventToken = knownEventTokens.find((knownEventToken) => {
          return knownEventToken.signature === event.topics[0];
        });
        if (eventToken) {
          let tokenData = web3.eth.abi.decodeLog(
            eventToken.inputs,
            event.data,
            event.topics.slice(1)
          );

          if (tokenData?._hash) {
            let data1 = {
              ipfsHash: tokenData?._hash || "",
              nftTokenId: tokenData?.tokenId || "",
              nftTransactionHash: createReceipt?.transactionHash,
              nftTransactionError: "",
            };
            nftHashData.push(data1);
          }
        }
      }

      console.log(nftHashData, "nftHashData11111111111111111111");
	  console.timeEnd("Nft Genrate Time End this");

      let obj = { status: 1, data: nftHashData };
      deferred.resolve(obj);

      await self.updatenftsMode(nftHashData, 1);
    } catch (error) {
		console.timeEnd("Nft Genrate Errors");
      let jsonError = JSON.stringify(error);
      let recpt = JSON.parse(jsonError);
      let trHash = recpt?.receipt?.transactionHash;
      // console.log(trHash, "------------trHash");

      dataArr.forEach((val) => {
        let data1 = {
          ipfsHash: val,
          nftTokenId: "",
          nftTransactionHash: "",
          nftTransactionError: trHash,
        };
        nftHashData.push(data1);
      });
      let obj = { status: 1, data: nftHashData };
      deferred.resolve(obj);
      console.log(nftHashData, "-------------------nftHashData2222222222222222222");
      await self.updatenftsMode(nftHashData, 1, databaseName);
    }

    return deferred.promise;
  },

  updatenftsMode: async (ipfsArray, count, databaseName) => {
    // ipfsHash,nftTokenId,nftTransactionHash
    var deferred = Q.defer();

    let filterTypeData = databaseName.split("_")[1];

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

    if (count == 1) {
      const filterArray = await Promise.all(
        ipfsArray.map(async (item) => {
          return await item.ipfsHash;
        })
      );
      const filterNewwArray = await Promise.all(
        ipfsArray.map(async (item) => {
          return await {
            originalURL:
              "https://jkcl.controlprint.com/nft-verify/" +
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
          // console.log(ipfsArray.length, "++++++++++++++++++++++++++filterDatafilterDatafilterDatafilterDatafilterData")

          // filterNewwArray
          var updateData = await ipfsUpdated.create(filterData);
          // await self.fetchFilterData(filterNewwArray, databaseName);
        });
    } else {
      var filterData = await ipfsdata.bulkWrite(
        ipfsArrayPosts.map((data) => ({
          updateOne: {
            filter: { ipfsHash: data.ipfsHash },
            update: {
              $set: {
                nftTokenId: data.nftTokenId,
                nftTransactionHash: data.nftTransactionHash,
                nftTransactionError: data.nftTransactionError,
              },
            },
            upsert: true,
          },
        }))
      );
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

    console.log(res.data, "res.datares.datares.datares.data");

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

    var updateData = await ipfsUpdated.create(firebaseData);
    return deferred.resolve(res.data);
    // return deferred.resolve({});
  },
  
  getNftsDetailsFromServer: async (userId, smartId, databaseName) => {
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
    let getSmartDetails = await SmartContract.findOne({
      userId: mongoose.Types.ObjectId(userId),
      _id: mongoose.Types.ObjectId(smartId),
    }).exec();

    var checker = { SecretId: getSmartDetails._id.toString() };
    // console.log(getSmartDetails, "1234567890")
    secretsmanager.getSecretValue(checker, async function (err, resultData) {
      if (err) {
        let obj = { status: 0, data: err };
        deferred.resolve(obj);
      } else {
        let resultParseData = JSON.parse(resultData.SecretString);
        var mnemonicKeybytes = CryptoJS.AES.decrypt(
          resultParseData.mnemonicKey,
          resultData.Name
        );
        var mnemonic = mnemonicKeybytes.toString(CryptoJS.enc.Utf8);
        const QuickNodeURL = getSmartDetails.quickNodeURL;
        var privateKeybytes = CryptoJS.AES.decrypt(
          resultParseData.password,
          resultData.Name
        );
        var privateKey = privateKeybytes.toString(CryptoJS.enc.Utf8);

        let obj = {
          status: 1,
          data: { getSmartDetails: getSmartDetails, privateKey: privateKey },
        };
        deferred.resolve(obj);
      }
    });
    return deferred.promise;
  },

  getSubscriptionName: async (packagename, typedata) => {
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
    packageList.findOne({ name: packagename }).exec((err, result) => {
      if (err || result == null) {
        let obj = { status: 0, data: "" };
        deferred.resolve(obj);
      } else {
        let obj = { status: 1, data: result.subscriptionValue };
        deferred.resolve(obj);
      }
    });
    return deferred.promise;
  },
});
