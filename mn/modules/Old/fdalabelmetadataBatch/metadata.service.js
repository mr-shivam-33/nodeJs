"use strict";
const {
  fdaMetaData,
  priceList,
  orderCreate,
  paymentModeDetails,
  discountDetails,
  ipfsdata,
  ipfsUpdated,
} = require("../fdalabelmetadata/metadata.model");
const { PaymentStatusUpdate } = require("../payment/payment.model");
var _ = require("lodash");
const mongoose = require("mongoose");
const Q = require("q");
const ipfsClient = require("ipfs-http-client");
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
const web3 = new Web3(new Web3.providers.HttpProvider(config.infuraAddress));
const privateKey1 = Buffer.from(config.privateKey, "hex");
// console.log(Common,"----------Common")

var self = (module.exports = {
  getProgressBar: async (data) => {
    var deferred = Q.defer();

    fdaMetaData
      .aggregate([
        {
          $match: {
            userId: mongoose.Types.ObjectId(data.userId),
          },
        },
        {
          $lookup: {
            from: "tbl_blockChainIpfsData",
            let: { id: "$_id" },
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
            ],
            as: "blockChainIpfsData",
          },
        },
        {
          $lookup: {
            from: "tbl_blockChainUpdatedIpfsData",
            let: { id: "$_id" },
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
                  newcount: { $sum: 1 },
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
            userId: "$userId",
            fdaId: "$_id",
            totalNfts: 1,
            compleTrasaction: {
              $ifNull: [{ $first: "$blockChainIpfsData.count" }, ""],
            },
            nftsUpdateStatus: {
              $ifNull: [{ $first: "$blockChainUpdatedIpfsData.newcount" }, ""],
            },
          },
        },
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
  chunkData: async () => {
    var deferred = Q.defer();

  //   ipfsdata.
  // find({
  //   userId: mongoose.Types.ObjectId("619ce9e9025163c233128f35"),
  // fdaId: mongoose.Types.ObjectId("619cd9e9865963c233128f35")
  // },{ fdaId: 1, ipfsHash: 1, nftTokenId: 1, nftTransactionHash: 1 }).
  // cursor().
  // on('data', function(doc) { console.log(doc); }).
  // on('end', function() { console.log('Done!'); });

// Or you can use `.next()` to manually get the next doc in the stream.
// `.next()` returns a promise, so you can use promises or callbacks.
// const cursor = ipfsdata.find({
//   userId: mongoose.Types.ObjectId("619ce9e9025163c233128f35"),
// fdaId: mongoose.Types.ObjectId("619cd9e9865963c233128f35")
// }).cursor();
// cursor.next(function(error, doc) {
//   console.log(doc);
// });
const cursor = ipfsdata.
find({
  userId: mongoose.Types.ObjectId("619ce9e9025163c233128f35"),
fdaId: mongoose.Types.ObjectId("619cd9e9865963c233128f35")
},{ fdaId: 1, ipfsHash: 1, nftTokenId: 1, nftTransactionHash: 1 }).cursor();
for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
  
  console.log(doc);
  // console.log(doc);
}


    // ipfsdata
    //   .find(
    //     {
    //       userId: mongoose.Types.ObjectId("619ce9e9025163c233128f35"),
    //     fdaId: mongoose.Types.ObjectId("619cd9e9865963c233128f35")
    //     },
    //     { fdaId: 1, ipfsHash: 1, nftTokenId: 1, nftTransactionHash: 1 }
    //   ).skip(2).limit(1)
    //   .exec(async (err, fdaIpfsData) => {

    //     console.log(fdaIpfsData, "fdaIpfsDatafdaIpfsData")
        

    //   });
      return deferred.promise;
  },
  dummyIpfsdata: async () => {
    var deferred = Q.defer();
    let resArr = [];
    for (let ind = 0; ind < 100000; ind++) {
      let tempObj = {
        ipfsHash: "kjvuvcyf755fcfexedtvvukji88654" + ind,
        data: {},
        userId: mongoose.Types.ObjectId("619ce9e9025163c233128f35"),
        fdaId: mongoose.Types.ObjectId("619cd9e9865963c233128f35"),
      };
      resArr.push(tempObj);
    }

    let obj = { status: 1, data: "sucess" };
    deferred.resolve(obj);
    ipfsdata.create(resArr);
    return deferred.promise;
  },
  ipfsdata: async (data) => {
    var deferred = Q.defer();
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
  createNft: async (dataArr) => {
    var deferred = Q.defer();
    // console.log(dataArr, "------dataArr");
    let contract = new web3.eth.Contract(contractABI, config.contractAddress);
    let nftHashData = [];
    const data = contract.methods.createMedSureToken(dataArr).encodeABI();
    let txCount;

    try {
      let currentTrxCount = await web3.eth.getTransactionCount(
        config.accountAddress
      );
      txCount =
        currentTrxCount > lastTrxCount ? currentTrxCount : currentTrxCount + 1;
      lastTrxCount = currentTrxCount;
    } catch (error) {
      console.log(error, "txCount");
    }

    // try {

    //   txCount = await web3.eth.getTransactionCount(config.accountAddress);
    // } catch (error) {
    //   // document.body.classList.remove("loading-indicator");
    //   console.log(error);
    // }

    // console.log(txCount);

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
    const txObject = {
      nonce: web3.utils.toHex(txCount),
      gasLimit: web3.utils.toHex(20000000),
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
      let createReceipt = await web3.eth.sendSignedTransaction(_rawData);
      console.log(createReceipt, "=====createReceipt");
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

      // console.log(nftHashData.length, "nftHashDatanftHashData111");

      let obj = { status: 1, data: nftHashData };
      deferred.resolve(obj);

      await self.updatenftsMode(nftHashData, 1);
    } catch (error) {
      let jsonError = JSON.stringify(error);
      let recpt = JSON.parse(jsonError);
      let trHash = recpt?.receipt?.transactionHash;
      console.log(trHash, "------------trHash");

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
      console.log(nftHashData, "-------------------nftHashData");
      await self.updatenftsMode(nftHashData, 1);
    }

    return deferred.promise;
  },
  updateNftHashData: async (data) => {
    var deferred = Q.defer();
    console.log(data, "start");
    ipfsdata
      .find(
        {
          fdaId: mongoose.Types.ObjectId(data.fdalebelId),
          userId: mongoose.Types.ObjectId(data.userId),
        },
        { fdaId: 1, ipfsHash: 1, nftTokenId: 1, nftTransactionHash: 1 }
      )
      .exec(async (err, fdaIpfsData) => {
        // console.log(err, "errerrerrerrerrerrerr");
        // console.log(fdaIpfsData, "fdaIpfsDatafdaIpfsDatafdaIpfsDatafdaIpfsData");
        // return

        if (err) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          let resArr = [];

          
          // const delay112 = n => new Promise(res => setTimeout(res, n));
          fdaIpfsData.forEach((val) => {
            resArr.push(val.ipfsHash);
          });
          // await delay112(2000);
          // for (let ind = 0; ind < 150; ind++) {
          // resArr.push("rdiiii" + ind);
          // }

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
          self.changeDataAsChunk(
            resArr,
            mongoose.Types.ObjectId(data.fdalebelId),
            mongoose.Types.ObjectId(data.userId)
          );
        }
      });

    return deferred.promise;
  },

  changeDataAsChunk: async function (resArr, fdalebelId, userId, i = 0) {
    let j,
      data,
      chunk = 150;
      console.time("Nft Genrate Time End this");
    for (i, j = resArr.length; i <= j; i += chunk) {
      data = resArr.slice(i, i + chunk);
      break;
    }

    if (data == undefined || (Array.isArray(data) && data.length == 0)) {
      var errIpfsData = await ipfsUpdated
        .find(
          {
            fdaId: fdalebelId,
            userId: mongoose.Types.ObjectId(userId),
            nftTokenId: { $eq: "" },
          },
          {
            fdaId: 1,
            ipfsHash: 1,
            nftTokenId: 1,
            nftTransactionHash: 1,
            nftTransactionError: 1,
          }
        )
        .exec();

      if (errIpfsData.length > 0) {
        let errorArr = [];
        errIpfsData.forEach((val) => {
          errorArr.push(val.ipfsHash);
        });
        await self.changeDataAsChunk(
          errorArr,
          mongoose.Types.ObjectId(fdalebelId),
          mongoose.Types.ObjectId(userId)
        );
      } else {
        console.log("NFTS completed");
        return false;
      }
    }

    var nftHashData = await self.createNft(data);

    if (nftHashData.data.length <= data.length) {
      console.timeEnd("Nft Genrate Time End this");
      let per = {"fdaId":mongoose.Types.ObjectId(fdalebelId),"userId":mongoose.Types.ObjectId(userId),"percent":((i + data.length) / resArr.length)*100 }
      io.emit("ipfspercent",per);
      await self.changeDataAsChunk(resArr, fdalebelId, userId, i + 150);
    }
    return false;
  },
  updatenftsMode: async (ipfsArray, count) => {
    // ipfsHash,nftTokenId,nftTransactionHash
    var deferred = Q.defer();

    let obj = { status: 1 };
    deferred.resolve(obj);

    if (count == 1) {
      var filterArray = [];
      ipfsArray.map((item) => {
        filterArray.push(item.ipfsHash);
      });

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
          var updateData = await ipfsUpdated.create(filterData);
        });
    } else {
      var filterData = await ipfsdata.bulkWrite(
        ipfsArray.map((data) => ({
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
      // console.log(filterData, "++++++++++++++Process")
    }

    return deferred.promise;
  },
  selfUpdate: async (ipfsArray) => {
    // ipfsHash,nftTokenId,nftTransactionHash
    var deferred = Q.defer();

    var ipfsHashArray = [
      {
        ipfsHash: "QmQHAjQmgHeNxT2zz5e8xwKXrdf5vpSh4pMnrPbVZNDJyP",
        nftTokenId: "1",
        nftTransactionHash: "2",
      },
      {
        ipfsHash: "Qmf48xbmh7uXFX7WpnreZAR1tHRBViPY6HrBye9de1kDKp",
        nftTokenId: "3",
        nftTransactionHash: "4",
      },
      {
        ipfsHash: "QmfYZgURbxZR2SR9bEeZygJ3aAXt33LfHrGE6odHSPNQbn",
        nftTokenId: "5",
        nftTransactionHash: "6",
      },
      {
        ipfsHash: "QmPnoQocsCNvKEcHmijqBrcSt9LfVYtPTBkTQQFfbNBbMV",
        nftTokenId: "7",
        nftTransactionHash: "8",
      },
    ];

    var filterArray = [];
    ipfsHashArray.map((item) => {
      filterArray.push(item.ipfsHash);
    });

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
            ipfsHash: 1,
            userId: 1,
            fdaId: 1,
            nftTokenId: {
              $filter: {
                input: ipfsHashArray,
                as: "rawArray",
                cond: {
                  $eq: ["$$rawArray.ipfsHash", "$ipfsHash"],
                },
              },
            },
            nftTransactionHash: {
              $filter: {
                input: ipfsHashArray,
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
            ipfsHash: 1,
            userId: 1,
            fdaId: 1,
            nftTokenId: { $first: "$nftTokenId.nftTokenId" },
            nftTransactionHash: {
              $first: "$nftTransactionHash.nftTransactionHash",
            },
          },
        },
      ])
      .exec(async (err, filterData) => {
        // console.log("MMMMMMMMMMMMM")
        // console.log(filterData)
        // console.log("MMMMMMMMMMMMM")
        // var updateData = await ipfsUpdated.create(filterData)
        // console.log(updateData, "+++++++++++++")
      });

    let obj = { status: 1 };
    deferred.resolve(obj);

    return deferred.promise;
  },
  discountPaymentMode: async (userId) => {
    var deferred = Q.defer();
    discountDetails.findOne({ userId: userId }, (err, result) => {
      if (err || result == null) {
        let obj = { status: 0, data: err };
        deferred.resolve(obj);
      } else {
        let obj = { status: 1, data: result };
        deferred.resolve(obj);
      }
    });
    return deferred.promise;
  },
  getPaymentMode: async (paymentType) => {
    var deferred = Q.defer();
    paymentModeDetails.findOne({ paymentType: paymentType }, (err, result) => {
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
  convertIntoPrice: async (packageType, totalNfts) => {
    var deferred = Q.defer();
    priceList
      .aggregate([
        {
          $match: { name: packageType },
        },
        {
          $project: {
            _id: 0,
            priceUSDType: 1,
            priceINRType: 1,
            totalPriceUSD: {
              $multiply: [totalNfts, "$priceUSD"],
            },
            totalPriceINR: {
              $multiply: [totalNfts, "$priceINR"],
            },
          },
        },
      ])
      .exec((err, result) => {
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
  addfdametadata: async (data) => {
    var deferred = Q.defer();
    self.convertIntoPrice(data.packageType, data.totalNfts).then((result) => {
      if (result.status == 1) {
        self.discountPaymentMode(data.userId).then((discountResult) => {
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
          data.paymentType = data.paymentType ? data.paymentType : "credit";

          self.getPaymentMode(data.paymentType).then((paymentResult) => {
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
              var duration = paymentResult.data.dueDate; //In Days
              data.dueDate = new Date(
                Date.now() + duration * 24 * 60 * 60 * 1000
              );
              data.paymentType = paymentResult.data.paymentType;

              invoiceObject.overDueDays = paymentResult.data.overDueDays;
              invoiceObject.dueDate = new Date(
                Date.now() + duration * 24 * 60 * 60 * 1000
              );
              invoiceObject.paymentType = paymentResult.data.paymentType;
            } else {
              data.overDueDays = 0;
              data.dueDate = new Date(Date.now());
              data.paymentType = "cash";

              invoiceObject.overDueDays = 0;
              invoiceObject.dueDate = new Date(Date.now());
              invoiceObject.paymentType = "cash";
            }

            orderCreate.count(function (err, count) {
              var purchaseOrderCount = count + 1;
              invoiceObject.invoiceNumber = "Invoice " + purchaseOrderCount;
            });

            fdaMetaData.create(data, (err, result) => {
              if (err) {
                let obj = { status: 0, data: err };
                deferred.resolve(obj);
              } else {
                invoiceObject.fdalebelId = result._id;
                orderCreate.create(invoiceObject);

                fdaMetaData.findOne(
                  { _id: mongoose.Types.ObjectId(result._id) },
                  (err, result) => {
                    let containerSrNos = result.container[0].srNo.split(",");
                    let palletsSrNos = result.pallets[0].srNo.split(",");
                    let masterCartonsSrNos =
                      result.masterCartons[0].srNo.split(",");
                    let innerCartonsSrNos =
                      result.innerCartons[0].srNo.split(",");
                    let drugsSrNos = result.drugs[0].srNo.split(",");

                    let resArr = [];
                    if (containerSrNos && containerSrNos.length > 0) {
                      containerSrNos.forEach((val) => {
                        let obj = {
                          productId: result.productId,
                          packageType: result.packageType,
                          srNo: val,
                          metaData: result.container[0].metaData,
                          type: "containers",
                          size: result.container[0].totalContainerNfts,
                          userId: result.userId,
                          fdaId: result._id,
                          createdDate: Date.now(),
                        };
                        resArr.push(JSON.stringify(obj));
                      });
                    }
                    if (palletsSrNos && palletsSrNos.length > 0) {
                      palletsSrNos.forEach((val) => {
                        let obj = {
                          productId: result.productId,
                          packageType: result.packageType,
                          srNo: val,
                          metaData: result.pallets[0].metaData,
                          type: "pallets",
                          size: result.pallets[0].totalContainerNfts,
                          userId: result.userId,
                          fdaId: result._id,
                          createdDate: Date.now(),
                        };
                        resArr.push(JSON.stringify(obj));
                      });
                    }
                    if (masterCartonsSrNos && masterCartonsSrNos.length > 0) {
                      masterCartonsSrNos.forEach((val) => {
                        let obj = {
                          productId: result.productId,
                          packageType: result.packageType,
                          srNo: val,
                          metaData: result.masterCartons[0].metaData,
                          type: "masterCartons",
                          size: result.masterCartons[0].totalContainerNfts,
                          userId: result.userId,
                          fdaId: result._id,
                          createdDate: Date.now(),
                        };
                        resArr.push(JSON.stringify(obj));
                      });
                    }
                    if (innerCartonsSrNos && innerCartonsSrNos.length > 0) {
                      innerCartonsSrNos.forEach((val) => {
                        let obj = {
                          productId: result.productId,
                          packageType: result.packageType,
                          srNo: val,
                          metaData: result.innerCartons[0].metaData,
                          type: "innerCartons",
                          size: result.innerCartons[0].totalContainerNfts,
                          userId: result.userId,
                          fdaId: result._id,
                          createdDate: Date.now(),
                        };
                        resArr.push(JSON.stringify(obj));
                      });
                    }
                    if (drugsSrNos && drugsSrNos.length > 0) {
                      drugsSrNos.forEach((val) => {
                        let obj = {
                          productId: result.productId,
                          packageType: result.packageType,
                          srNo: val,
                          metaData: result.drugs[0].metaData,
                          type: "drugs",
                          size: 0,
                          userId: result.userId,
                          fdaId: result._id,
                          createdDate: Date.now(),
                        };
                        resArr.push(JSON.stringify(obj));
                      });
                    }

                    // console.log("+++++++++")
                    // console.log(resArr.length)
                    // console.log("+++++++++11111111111")
                    self.sendDataToIpfs(resArr);
                  }
                );

                let obj = { status: 1, data: result };
                deferred.resolve(obj);
              }
            });
          });
        });
      } else {
        let obj = { status: 0, data: result.data };
        deferred.resolve(obj);
      }
    });
    return deferred.promise;
  },
  sendDataToIpfs: async function (resArr, i = 0) {
    var deferred = Q.defer();
    let j,
      data,
      chunk = 100;
    for (i, j = resArr.length; i <= j; i += chunk) {
      data = resArr.slice(i, i + chunk);
      break;
    }

    console.log("++++++data+++++++++")
    console.log(data)
    if (data == undefined) {
      let obj = { status: 1, data: {} };
      deferred.resolve(obj);
      console.log('ipfs completed')
    }

    let ind = 0;
    let ipfsData = [];
    const delayNew = n => new Promise(res => setTimeout(res, n));
    for await (const value of ipfs.addAll(data)) {
      let filterData = JSON.parse(data[ind]);
      let tempObj = {
        ipfsHash: value.path,
        data: filterData,
        userId: filterData.userId,
        fdaId: filterData.fdaId,
      };
      ind++;
      ipfsData.push(tempObj);
    }
    await delayNew(200);

    // console.log("++++++--------------+++++++++")
    // console.log(ipfsData.length)
    // console.log(data.length)

    if (ipfsData.length == data.length) {
      // console.log("++++++Shahi+++++++++")
      // console.log(ipfsData)
      var newData = {};
      newData.ipfsData = ipfsData;
      await self.ipfsdata(newData);
      await self.sendDataToIpfs(resArr, i + 100);
    }

    return deferred.promise;
  },
  updatefdametadata: async (data) => {
    var deferred = Q.defer();
    self.convertIntoPrice(data.packageType, data.totalNfts).then((result) => {
      if (result.status == 1) {
        self.discountPaymentMode(data.userId).then((discountResult) => {
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
          data.paymentType = data.paymentType ? data.paymentType : "credit";

          self.getPaymentMode(data.paymentType).then((paymentResult) => {
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
});
