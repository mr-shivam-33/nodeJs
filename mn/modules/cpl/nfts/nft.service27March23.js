//const userModel = require('./user.model');

const fs = require('fs')
var QRCode = require('qrcode');
var AWS = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');
PDFDocument = require('pdfkit'),
  SVGtoPDF = require('svg-to-pdfkit');
  const axios = require("axios").default;
const {createCanvas} = require("canvas");

var accessKeyId = "AKIA3QMT3KIUXJRCBXMX";//Suraj
var secretAccessKey = "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";
var mainBucket = 'blokchi'
var shortUrl = require("node-url-shortener");
AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey
});

var s3 = new AWS.S3();

var params = {
  Bucket: mainBucket,
  ACL: 'public-read',
  Region: 'us-east-1'
};

const {
  getFactoryInfo
} = require("./nftCustom.model");

_ = require("lodash");
const Q = require("q");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var chunkArray = [];

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

io.on('connection', async function(socket){
    if(typeof(socket.handshake.query) === 'object' && socket.handshake.query.id != undefined){
          var id = socket.handshake.query.id;
          // const [getCompanyIdIpfsData] = await Promise.all([self.getCompanyIdIpfs({"userId": id})]);
          // io.emit("event", getCompanyIdIpfsData.data);        
    }
});

var qrImg = require('qr-image');

const {userAssignDataBase1, User, Profile,SuperAdmin,CompanyVerified}  = require('../../common/user/user.model');


const newConn = require("../../../db/DBCustomConnection");
let {factotrySchema, orderSchema, metaSchema, invoiceNewSchema, assignContainerByFactoryIdsSchema, getNftsSchema, getRegisterSchema, assignContainerToOthersSchema, ipfsVerifySchema, saveNftsDataSchema, saveNftsPalletsDataSchema, saveNftsMastersDataSchema, saveNftsInnersDataSchema, saveNftsDrugsDataSchema, saveNftsReportDataSchema, ipfsUpdatedVerifySchema}  = require('./nft.model');

let {userAssignDataBase}  = require('./nftuser.model');
const { ipfsSchema, ipfsUpdatedSchema } = require("../fdalabelmetadata/metadata.model");
const { productSchema } = require("../product/product.model");

let self = (module.exports = {
  createDatabase: (databaseName)=>{
      var deferred = Q.defer();

      let db = newConn.getDatabaseConnection(databaseName);
     
      const saveNftsReportData = db.model("saveNftsReportData", saveNftsReportDataSchema, 'tbl_save_nfts_reports');
      const saveNftsDataInChain = db.model("saveNftsDataInChain", saveNftsDataSchema, 'tbl_save_nfts_container');
      const saveNftsPalletsInChain = db.model("saveNftsPalletsInChain", saveNftsPalletsDataSchema, 'tbl_save_nfts_pallets');
      const saveNftsMastersInChain = db.model("saveNftsMastersInChain", saveNftsMastersDataSchema, 'tbl_save_nfts_masterCartons');
      const saveNftsInnersDataInChain = db.model("saveNftsInnersDataInChain", saveNftsInnersDataSchema, 'tbl_save_nfts_InnerCartons');
      const saveNftsDrugsDataInChain = db.model("saveNftsDrugsDataInChain", saveNftsDrugsDataSchema, 'tbl_save_nfts_Drugs');
      const ipfsUpdatedVerify = db.model("ipfsUpdatedVerify", ipfsUpdatedVerifySchema, 'tbl_blockChainUpdatedIpfsData');
      const ipfsverifydata = db.model("ipfsverifydata", ipfsVerifySchema, 'tbl_blockChainIpfsData');
      const assignContainerToOthersData = db.model('assignContainerToOthersData', assignContainerToOthersSchema, 'tbl_assignContainerToOthersById');
      const factoryByContainerSchema = db.model("factoryByContainerSchema", assignContainerByFactoryIdsSchema, 'tbl_order');
      const generatedUpdateStatus = db.model("generatedUpdateStatus", invoiceNewSchema, 'tbl_order');
      const assignMetaData = db.model("assignMetaData", metaSchema, 'tbl_fdalebelmetadata');
      const assignFactotry = db.model('assignFactotry', factotrySchema, 'tbl_assignContainerFactoryById');
      const getOrder = db.model("getOrder", orderSchema, 'tbl_order');
      const getNftsArray = db.model("getNftsArray", getNftsSchema, 'tbl_nftgeneratenumber');
      const ipfsUpdated = db.model("ipfsUpdated", ipfsUpdatedVerifySchema, 'tbl_blockChainUpdatedIpfsData');
      const ipfsdata = db.model("ipfsdata", ipfsSchema, 'tbl_blockChainIpfsData');
      const productModel = db.model("productModel", productSchema, 'tbl_products');

      deferred.resolve([assignFactotry,getOrder,assignMetaData, generatedUpdateStatus, factoryByContainerSchema, getNftsArray, assignContainerToOthersData, ipfsverifydata, saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain, saveNftsReportData, ipfsUpdatedVerify,ipfsUpdated,ipfsSchema,productModel]);
      return deferred.promise;
  },
  getContainersData: async(data) => {
    var deferred = Q.defer();   
    try{

        var paramsContainers = {
            Bucket: mainBucket,
            Delimiter: '/',
            Prefix: 'shashikant_company_pvt_ltd1/628f1a6a5871b5d78c6c6196/containers/'
        };
    
        var listArray = []
        s3.listObjects(paramsContainers, function (err, data) {
            if(err)throw err;
            if(data.Contents.length > 0){
                data.Contents.forEach((val)=>{
                  listArray.push("https://blokchi.s3.amazonaws.com/"+val.Key)
                })
                let obj = { "status": 1, "data": listArray }
                deferred.resolve(obj)
            } else {
              let obj = { "status": 1, "data": [] }
              deferred.resolve(obj)
            }
        });

    } catch(error) {
        let obj = { "status": 0, "data": {} }
        deferred.resolve(obj)
    }
    return deferred.promise;  
  },
  getPalletsData: async(data) => {
    var deferred = Q.defer();   
    try{

        var paramsPallets = {
          Bucket: mainBucket,
          Delimiter: '/',
          Prefix: 'shashikant_company_pvt_ltd1/628f1a6a5871b5d78c6c6196/pallets/'
        };
    
        var listArray = []
        s3.listObjects(paramsPallets, function (err, data) {
            if(err)throw err;
            if(data.Contents.length > 0){
                data.Contents.forEach((val)=>{
                  listArray.push("https://blokchi.s3.amazonaws.com/"+val.Key)
                })
                let obj = { "status": 1, "data": listArray }
                deferred.resolve(obj)
            } else {
              let obj = { "status": 1, "data": [] }
              deferred.resolve(obj)
            }
        });

    } catch(error) {
        let obj = { "status": 0, "data": {} }
        deferred.resolve(obj)
    }
    return deferred.promise;  
  },
  getMasterCartonsData: async(data) => {
    var deferred = Q.defer();   
    try{

        var paramsMasterCartons = {
            Bucket: mainBucket,
            Delimiter: '/',
            Prefix: 'shashikant_company_pvt_ltd1/628f1a6a5871b5d78c6c6196/masterCartons/'
        };
    
        var listArray = []
        s3.listObjects(paramsMasterCartons, function (err, data) {
            if(err)throw err;
            if(data.Contents.length > 0){
                data.Contents.forEach((val)=>{
                  listArray.push("https://blokchi.s3.amazonaws.com/"+val.Key)
                })
                let obj = { "status": 1, "data": listArray }
                deferred.resolve(obj)
            } else {
              let obj = { "status": 1, "data": [] }
              deferred.resolve(obj)
            }
        });

    } catch(error) {
        let obj = { "status": 0, "data": {} }
        deferred.resolve(obj)
    }
    return deferred.promise;  
  },
  getInnerCartonsData: async(data) => {
    var deferred = Q.defer();   
    try{

        var paramsInnerCartons = {
            Bucket: mainBucket,
            Delimiter: '/',
            Prefix: 'shashikant_company_pvt_ltd1/628f1a6a5871b5d78c6c6196/innerCartons/'
        };
    
        var listArray = []
        s3.listObjects(paramsInnerCartons, function (err, data) {
            if(err)throw err;
            if(data.Contents.length > 0){
                data.Contents.forEach((val)=>{
                  listArray.push("https://blokchi.s3.amazonaws.com/"+val.Key)
                })
                let obj = { "status": 1, "data": listArray }
                deferred.resolve(obj)
            } else {
              let obj = { "status": 1, "data": [] }
              deferred.resolve(obj)
            }
        });

    } catch(error) {
        let obj = { "status": 0, "data": {} }
        deferred.resolve(obj)
    }
    return deferred.promise;  
  },
  getDrugsData: async(data) => {
      var deferred = Q.defer();   
      try{

          var paramsDrugs = {
              Bucket: mainBucket,
              Delimiter: '/',
              Prefix: 'shashikant_company_pvt_ltd1/628f1a6a5871b5d78c6c6196/drugs/'
          };
      
          var listArray = []
          s3.listObjects(paramsDrugs, function (err, data) {
              if(err)throw err;
              if(data.Contents.length > 0){
                  data.Contents.forEach((val)=>{
                      listArray.push("https://blokchi.s3.amazonaws.com/"+val.Key)
                  })
                  console.log(listArray, "vgtvcudsvcusvdcs")
                  let obj = { "status": 1, "data": listArray }
                  deferred.resolve(obj)
              } else {
                let obj = { "status": 1, "data": [] }
                deferred.resolve(obj)
              }
          });

      } catch(error) {
          let obj = { "status": 0, "data": {} }
          deferred.resolve(obj)
      }
      return deferred.promise;  
  },
  genrateAllDocsPdf: async(data) => {
      var deferred = Q.defer();   
      try{

        const [getContainersData, getPalletsData, getMasterCartonsData, getInnerCartonsData, getDrugsData] = await Promise.all([self.getContainersData(data.schema),self.getPalletsData(data.schema),self.getMasterCartonsData(data.schema),self.getInnerCartonsData(data.schema),self.getDrugsData(data.schema)]);

        let mergeArray = [...getContainersData.data, ...getPalletsData.data, ...getMasterCartonsData.data, ...getInnerCartonsData.data, ...getDrugsData.data]

        // return false;

        let getLocationArray = []
        mergeArray.forEach(async (val,ind)=>{
            // const dstKey = val.replace('.pdf', '.png');
            getLocationArray.push(fs.readFileSync(val))
        })
        var pdfsToMerge = getLocationArray
        const mergedPdf = await PDFDocument.create();

        for (const pdfBytes of pdfsToMerge) { 
            const pdf = await PDFDocument.load(pdfBytes); 
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach((page) => {
                mergedPdf.addPage(page); 
            }); 
        } 

        const buf = await mergedPdf.save(); // Uint8Array

        let path = '/var/www/html/public/pdfsData/merged.pdf'; 
        fs.open(path, 'w', function (err, fd) {
            fs.write(fd, buf, 0, buf.length, null, function (err) {
                fs.close(fd, function () {
                    console.log('wrote the file successfully');
                }); 
            }); 
        });        
        let obj = { "status": 1, "data": {} }
        deferred.resolve(obj)

      }catch(error){
        let obj = { "status": 0, "data": {} }
        deferred.resolve(obj)
      }
      return deferred.promise;  
  },
  genratePdfs: async (fdalebelId,databaseName,slug) => {
    var deferred = Q.defer();

    let getData = await self.createDatabase(databaseName);
    let [assignFactotry,getOrder,assignMetaData, generatedUpdateStatus, factoryByContainerSchema, getNftsArray, assignContainerToOthersData, ipfsverifydata, saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain, saveNftsReportData, ipfsUpdatedVerify,ipfsUpdated,ipfsSchema,productModel] = getData;

    // console.log(fdalebelId,databaseName,slug, "11111111111111111111111111")

    getNftsArray
      .aggregate([
        {
          $match: {
            fdalebelId: mongoose.Types.ObjectId(fdalebelId)
          },
        },
        {
          $lookup: {
            from: "tbl_company_info",
            localField: "userId",
            foreignField: "userId",
            as: "company_info",
          },
        },
        { "$unwind": "$company_info" },
        {
          $project: {
            _id: 1,
            fdalebelId: 1,
            productId: 1,
            userId: 1,
            companyName: { $arrayElemAt: ["$company_info.registerInfo.companyName", 0] },
            nftData: { $arrayElemAt: ["$assignContainerByFactoryIds.nftData", 0] }
          },
        },
      ]).exec(async (err, result) => {

          // console.log(result, "fdalebelId,databaseNamefdalebelId,databaseNamefdalebelId,databaseNamefdalebelId,databaseName");
          // return false;


          if (err || result == null || result.length == 0) {
            let obj = { status: 0, data: [] };
            deferred.resolve(obj);
          } else {

            

            let companyName = result[0].companyName.replace(/ /g, "_");
            let fdalebelId = result[0].fdalebelId;
            let nftData = result[0].nftData;

            // console.log(companyName, "companyNamecompanyName")
            // console.log(fdalebelId, "fdalebelIdfdalebelIdfdalebelId")
            // console.log(nftData, "nftDatanftDatanftData")

            // return false;

            const s3url = `https://${mainBucket}.s3.amazonaws.com/${companyName}/${fdalebelId}/`;

            getNftsArray.findOne(
              { fdalebelId: mongoose.Types.ObjectId(fdalebelId), status: 1 },
              (err, result) => {
                if (err) {
                  let obj = { status: 0, data: err };
                  deferred.resolve(obj);
                } else {
                  let res1 = JSON.stringify(result);
                  let res2 = JSON.parse(res1);
                  res2['s3url'] = s3url;
                  let obj = { status: 1, data: res2 };
                  deferred.resolve(obj);
                }
              }
            );

            if (nftData.hasOwnProperty("containers")) {
              var writeStream = fs.createWriteStream("./public/pdfsData/"+companyName+"_containers.csv");
              let filterArr = []
              nftData.containers.forEach((val)=>{
                filterArr.push({originalURL: "https://blokchi.com/nft-verify/"+slug+"/"+val.ipfsHash})
              })
              let shortUrl = await self.shortUrls(filterArr);
              for (let i = 0; i < shortUrl.length; i++) {
                  writeStream.write("https://4en6.short.gy/"+shortUrl[i].path+"\n");
              }
              let params = {
                Bucket: mainBucket + '/' + companyName + '/' + fdalebelId + '/containers',
                ACL: 'public-read',
                Region: 'us-east-1',
                Key: fdalebelId + ".csv",
                Body: fs.createReadStream(writeStream.path),
              };
              var s3 = new AWS.S3({ params: { Bucket: companyName, ACL: "public-read", Region: 'us-east-1' } });
              s3.createBucket(params);
              s3.upload(params, function (err, data) {
                if (err) {
                  throw err;
                }
              });
              writeStream.close();
            }            
            if (nftData.hasOwnProperty("pallets")) {
              var writeStream = fs.createWriteStream("./public/pdfsData/"+companyName+"_pallets.csv");
              let filterArr = []
              nftData.pallets.forEach((val)=>{
                filterArr.push({originalURL: "https://blokchi.com/nft-verify/"+slug+"/"+val.ipfsHash})
              })
              let shortUrl = await self.shortUrls(filterArr);
              for (let i = 0; i < shortUrl.length; i++) {
                  writeStream.write("https://4en6.short.gy/"+shortUrl[i].path+"\n");
              }
              let params = {
                Bucket: mainBucket + '/' + companyName + '/' + fdalebelId + '/pallets',
                ACL: 'public-read',
                Region: 'us-east-1',
                Key: fdalebelId + ".csv",
                Body: fs.createReadStream(writeStream.path),
              };
              var s3 = new AWS.S3({ params: { Bucket: companyName, ACL: "public-read", Region: 'us-east-1' } });
              s3.createBucket(params);
              s3.upload(params, function (err, data) {
                if (err) {
                  throw err;
                }
              });
              writeStream.close();
            }
            if (nftData.hasOwnProperty("masterCartons")) {
              var writeStream = fs.createWriteStream("./public/pdfsData/"+companyName+"_masterCartons.csv");
              let filterArr = []
              nftData.masterCartons.forEach((val)=>{
                filterArr.push({originalURL: "https://blokchi.com/nft-verify/"+slug+"/"+val.ipfsHash})
              })
              let shortUrl = await self.shortUrls(filterArr);
              for (let i = 0; i < shortUrl.length; i++) {
                  writeStream.write("https://4en6.short.gy/"+shortUrl[i].path+"\n");
              }
              let params = {
                Bucket: mainBucket + '/' + companyName + '/' + fdalebelId + '/masterCartons',
                ACL: 'public-read',
                Region: 'us-east-1',
                Key: fdalebelId + ".csv",
                Body: fs.createReadStream(writeStream.path),
              };
              var s3 = new AWS.S3({ params: { Bucket: companyName, ACL: "public-read", Region: 'us-east-1' } });
              s3.createBucket(params);
              s3.upload(params, function (err, data) {
                if (err) {
                  throw err;
                }
              });
              writeStream.close();
            }
            if (nftData.hasOwnProperty("innerCartons")) {
              var writeStream = fs.createWriteStream("./public/pdfsData/"+companyName+"_innerCartons.csv");
              let filterArr = []
              nftData.innerCartons.forEach((val)=>{
                filterArr.push({originalURL: "https://blokchi.com/nft-verify/"+slug+"/"+val.ipfsHash})
              })
              let shortUrl = await self.shortUrls(filterArr);
              for (let i = 0; i < shortUrl.length; i++) {
                  writeStream.write("https://4en6.short.gy/"+shortUrl[i].path+"\n");
              }
              let params = {
                Bucket: mainBucket + '/' + companyName + '/' + fdalebelId + '/innerCartons',
                ACL: 'public-read',
                Region: 'us-east-1',
                Key: fdalebelId + ".csv",
                Body: fs.createReadStream(writeStream.path),
              };
              var s3 = new AWS.S3({ params: { Bucket: companyName, ACL: "public-read", Region: 'us-east-1' } });
              s3.createBucket(params);
              s3.upload(params, function (err, data) {
                if (err) {
                  throw err;
                }
              });
              writeStream.close();
            }
            if (nftData.hasOwnProperty("drugs")) {
              
              let filterArr = []
              nftData.drugs.forEach((val)=>{
                filterArr.push({originalURL: "https://blokchi.com/nft-verify/"+slug+"/"+val.ipfsHash})
              })
              // for (let i = 0; i < nftData.drugs.length; i++) {
              //     filterArr.push({originalURL: "https://blokchi.com/nft-verify/"+slug+"/"+nftData.drugs[i].ipfsHash})
              // }
              // console.log(filterArr, "1111111")

              let getChunkArray = await self.changeDataAsChunk(filterArr, mainBucket, companyName, fdalebelId)
              
              
              
            }
          }
    });
    return deferred.promise;
  },
  changeDataAsChunk: async function (resArr, mainBucket, companyName, fdalebelId, i = 0) {
    
    let j,
      data,
      chunk = 900;
    for (i, j = resArr.length; i <= j; i += chunk) {
      data = resArr.slice(i, i + chunk);
      break;
    }

    if (data == undefined || (Array.isArray(data) && data.length == 0)) {
     
      var writeStream = fs.createWriteStream("./public/pdfsData/"+companyName+"_drugs.csv");
      for (let i = 0; i < chunkArray.length; i++) {
          writeStream.write("https://4en6.short.gy/"+chunkArray[i].path+"\n");
      }
      // console.log(writeStream.path, "123456789")
      let params = {
        Bucket: mainBucket + '/' + companyName + '/' + fdalebelId + '/drugs',
        ACL: 'public-read',
        Region: 'us-east-1',
        Key: fdalebelId + ".csv",
        Body: fs.createReadStream(writeStream.path),
      };
      var s3 = new AWS.S3({ params: { Bucket: companyName, ACL: "public-read", Region: 'us-east-1' } });
      s3.createBucket(params);
      s3.upload(params, function (err, data) {
        if (err) {
          throw err;
        }
      });
      writeStream.close();
      return false;
    }

   
   // console.log(data.length,"data", resArr.length)
   let shortUrl = await self.shortUrls(data);

   chunkArray.push(...shortUrl);

    if (shortUrl.length <= data.length) {
      await self.changeDataAsChunk(resArr, mainBucket, companyName, fdalebelId, i + 900);      
    }


  },
  shortUrls: async (dataString) => {
   
    var data = {
        domain: "4en6.short.gy",
        // originalURL:dataString,
        links: dataString
    };
    let getData = await axios.post("https://api.short.io/links/bulk", data, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        authorization: "sk_RyoFnCj3GeRSJolZ",
      },
    });

    return getData.data;
  },
  decodeBase64Image: async (dataString) => {
      var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

      if (matches.length !== 3) {
        return new Error('Invalid input string');
      }
      response.type = matches[1];
      response.data = new Buffer(matches[2], 'base64');
      return response;
  },
  sendDataToPrinter: async (data,databaseName,slug) => {

      var deferred = Q.defer();
      let getData = await self.createDatabase(databaseName);
      let [assignFactotry,getOrder,assignMetaData, generatedUpdateStatus, factoryByContainerSchema, getNftsArray, assignContainerToOthersData, ipfsverifydata, saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain, saveNftsReportData, ipfsUpdatedVerify,ipfsUpdated,ipfsSchema,productModel] = getData;

      getNftsArray.findOne(
        { fdalebelId: mongoose.Types.ObjectId(data.fdalebelId), status: 1 },
        (err, result) => {
          if (err) {
            let obj = { status: 0, data: err };
            deferred.resolve(obj);
          } else {

            let nftDataObj = {}
            nftDataObj.data = {}
            nftDataObj.command = "data"
            nftDataObj.data.container = result.assignContainerByFactoryIds[0].nftData.container ? result.assignContainerByFactoryIds[0].nftData.container.map(val => "https://blokchi.com/nft-verify/"+slug+"/"+val.ipfsHash) : []
            nftDataObj.data.pallets = result.assignContainerByFactoryIds[0].nftData.pallets ? result.assignContainerByFactoryIds[0].nftData.pallets.map(val => "https://blokchi.com/nft-verify/"+slug+"/"+val.ipfsHash) : []
            nftDataObj.data.masterCartons = result.assignContainerByFactoryIds[0].nftData.masterCartons ? result.assignContainerByFactoryIds[0].nftData.masterCartons.map(val => "https://blokchi.com/nft-verify/"+slug+"/"+val.ipfsHash) : []
            nftDataObj.data.innerCartons = result.assignContainerByFactoryIds[0].nftData.innerCartons ? result.assignContainerByFactoryIds[0].nftData.innerCartons.map(val => "https://blokchi.com/nft-verify/"+slug+"/"+val.ipfsHash) : []
            nftDataObj.data.drugs = result.assignContainerByFactoryIds[0].nftData.drugs ? result.assignContainerByFactoryIds[0].nftData.drugs.map(val => "https://blokchi.com/nft-verify/"+slug+"/"+val.ipfsHash) : []

            let obj = { status: 1, data: nftDataObj };
            deferred.resolve(obj);
          }
        }
      );
      return deferred.promise;
  },
  create: async (dataForQRcode, center_image, width, imgWidth) => {
      var deferred = Q.defer();
      const canvas = createCanvas(width, width);
      QRCode.toCanvas(canvas, dataForQRcode, {
        errorCorrectionLevel: "H",
        margin: 1,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      });
      const ctx = canvas.getContext("2d");
      const img = await loadImage(center_image);
      const center = (canvas.width - imgWidth) / 2;
      ctx.drawImage(img, center, center, imgWidth, imgWidth);
      let obj = { status: 1, data: canvas.toDataURL("image/png") };
      deferred.resolve(obj);
      return deferred.promise;
  },
  export: async (data,databaseName) => {
      var deferred = Q.defer();
      let getData = await self.createDatabase(databaseName);
let [assignFactotry,getOrder,assignMetaData, generatedUpdateStatus, factoryByContainerSchema, getNftsArray, assignContainerToOthersData, ipfsverifydata, saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain, saveNftsReportData, ipfsUpdatedVerify,ipfsUpdated,ipfsSchema,productModel] = getData;       

      
      let dataData = await self.viewContainerByfdalebelId(data.fdalebelId,databaseName);
      dataData.data.assignContainerByFactoryIds.forEach((val, ind)=>{
      })
      let obj = { status: 1, data: dataData.data.assignContainerByFactoryIds };
      deferred.resolve(obj);
      return deferred.promise;
  },
  changeReportStatus: async (data) => {
    var deferred = Q.defer();
    
    if (data.status == 1 || data.status == "1") {
      if (data.verifyByUserId == "") {
        ipfsUpdatedVerify
          .findOneAndUpdate(
            { ipfsHash: data.ipfsHash },
            {
              $set: {
                "nftVerifyByUserId.$.assignToEmailId": data.assignToEmailId,
                "nftVerifyByUserId.$.assignToUserType": data.assignToUserType,
              },
            },
            { new: true }
          )
          .exec(async (err, result) => {
            const delay = (n) => new Promise((res) => setTimeout(res, n));
            saveNftsReportData
              .find({
                ipfsHash: data.ipfsHash,
                userId: mongoose.Types.ObjectId(data.userId),
              })
              .exec(async (err, result) => {
                if (result.length > 0) {
                  saveNftsReportData
                    .deleteMany({
                      ipfsHash: data.ipfsHash,
                      userId: mongoose.Types.ObjectId(data.userId),
                    })
                    .exec();
                }
              });
            await delay(200);

            saveNftsReportData
              .find({ ipfsHash: data.ipfsHash })
              .exec(async (err, newresult) => {
               
                if (newresult.length == 0) {
                  ipfsUpdatedVerify
                    .findOneAndUpdate(
                      { ipfsHash: data.ipfsHash },
                      { $set: { nftVerifyUserFlag: 1 } },
                      { new: true }
                    )
                    .exec();
                }
              });

            let obj = { status: 1, data: {} };
            deferred.resolve(obj);
          });
      } else {
        ipfsUpdatedVerify
          .findOneAndUpdate(
            {
              ipfsHash: data.ipfsHash,
              nftVerifyByUserId: {
                $elemMatch: { verifyByUserId: data.verifyByUserId },
              },
            },
            {
              $set: {
                "nftVerifyByUserId.$.assignToEmailId": data.assignToEmailId,
                "nftVerifyByUserId.$.assignToUserType": data.assignToUserType,
              },
            },
            { new: true }
          )
          .exec(async (err, result) => {
            const delay1 = (n) => new Promise((res) => setTimeout(res, n));
            saveNftsReportData
              .find({
                ipfsHash: data.ipfsHash,
                userId: mongoose.Types.ObjectId(data.userId),
              })
              .exec(async (err, result) => {
                if (result.length > 0) {
                  saveNftsReportData
                    .deleteMany({
                      ipfsHash: data.ipfsHash,
                      userId: mongoose.Types.ObjectId(data.userId),
                    })
                    .exec();
                }
              });
            await delay1(200);

            saveNftsReportData
              .find({ ipfsHash: data.ipfsHash })
              .exec(async (err, newresult) => {
                if (newresult.length == 0) {
                  ipfsUpdatedVerify
                    .findOneAndUpdate(
                      { ipfsHash: data.ipfsHash },
                      { $set: { nftVerifyUserFlag: 1 } },
                      { new: true }
                    )
                    .exec();
                }
              });

            let obj = { status: 1, data: {} };
            deferred.resolve(obj);
          });
      }
    } else {
      const delay2 = (n) => new Promise((res) => setTimeout(res, n));
      saveNftsReportData
        .deleteMany({
          ipfsHash: data.ipfsHash,
          userId: mongoose.Types.ObjectId(data.userId),
        })
        .exec();
      await delay2(200);

      saveNftsReportData
        .find({ ipfsHash: data.ipfsHash })
        .exec(async (err, newresult) => {
          if (newresult.length == 0) {
            ipfsUpdatedVerify
              .findOneAndUpdate(
                { ipfsHash: data.ipfsHash },
                { $set: { nftVerifyUserFlag: 1 } },
                { new: true }
              )
              .exec();
          }
        });

      let obj = { status: 1, data: {} };
      deferred.resolve(obj);
    }
    return deferred.promise;
  },
  getNftsVerifyUserReport: async (data,databaseName) => {
    var deferred = Q.defer();
    let getData = await self.createDatabase(databaseName);
    let [assignFactotry,getOrder,assignMetaData, generatedUpdateStatus, factoryByContainerSchema, getNftsArray, assignContainerToOthersData, ipfsverifydata, saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain, saveNftsReportData, ipfsUpdatedVerify,ipfsUpdated,ipfsSchema,productModel] = getData;       

    if (data.status == 1 || data.status == "1") {
      var match = {
        $match: {
          $or: [
            {
              $and: [
                // { "userId": mongoose.Types.ObjectId(data.userId) },
                { "data.type": data.boxType.toString() },
                { fdaId: mongoose.Types.ObjectId(data.fdaId) },
                // { "userType":  data.userType.toString() }
              ],
            },
            {
              $and: [
                // { "userId": mongoose.Types.ObjectId(data.userId) },
                { "data.type": data.boxType },
                { fdaId: mongoose.Types.ObjectId(data.fdaId) },
                // { "userType":  data.userType }
              ],
            },
          ],
        },
      };
    } else {
      var match = {
        $match: {
          ipfsHash: data.ipfsHash,
        },
      };
    }
    saveNftsReportData
      .aggregate([
        match,
        {
          $lookup: {
            from: "tbl_user",
            let: { userId: "$userId" },
            pipeline: [
              {
                $match: {
                  $and: [{ $expr: { $eq: ["$$userId", "$_id"] } }],
                },
              },
              {
                $project: {
                  _id: 1,
                  userId: "$_id",
                  firstName: 1,
                  lastName: 1,
                  email: 1,
                },
              },
            ],
            as: "userDetails",
          },
        },
        {
          $addFields: {
            "userDetails.nftFlagMsg": "$nftFlagMsg",
            "userDetails.ruserType": "$userType",
            "userDetails.rcreatedDate": "$createdDate",
            "userDetails.rupdateDate": "$updateDate",
            "userDetails.ipfsHash": "$ipfsHash",
          },
        },
        {
          $project: {
            _id: 0,
            userDetails: "$userDetails",
          },
        },
        {
          $unwind: "$userDetails",
        },
        { $replaceRoot: { newRoot: { $mergeObjects: ["$userDetails"] } } },
        {
          $sort: {
            _id: -1,
          },
        },
      ])
      .exec(async (err, result) => {
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

  getLastOrderByUserId: async (data) => {
    var deferred = Q.defer();
    
    getOrder
      .aggregate([
        {
          $match: {
            userId: mongoose.Types.ObjectId(data.userId),
          },
        },
        {
          $project: {
            userId: 1,
            fdalebelId: 1,
            createdDate: 1,
          },
        },
        {
          $sort: {
            _id: -1,
          },
        },
        {
          $limit: 1,
        },
      ])
      .exec(async (err, result) => {
        if (err) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          if (result.length > 0) {
            let objData = {
              userId: result[0].userId,
              fdaId: result[0].fdalebelId,
              type: "all"
            };
            let resultReport = await self.getNftsReportAsPerUserId(objData);
            deferred.resolve(resultReport);
          } else {
            let obj = { status: 0, data: [] };
            deferred.resolve(obj);
          }
        }
      });

    return deferred.promise;
  },
  getContainerDataAsPerUserType: async (data,databaseName) => {
    var deferred = Q.defer();
    let getData = await self.createDatabase(databaseName);
    let [assignFactotry,getOrder,assignMetaData, generatedUpdateStatus, factoryByContainerSchema, getNftsArray, assignContainerToOthersData, ipfsverifydata, saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain, saveNftsReportData, ipfsUpdatedVerify,ipfsUpdated,ipfsSchema,productModel] = getData;  

    
    // assignContainerToOthersData

    if (
      data.userType == 3 ||
      data.userType == "3" ||
      data.userType == 4 ||
      data.userType == "4"
    ) {
      var newCollection = assignContainerToOthersData;
      
      var matchCollectionKey = {
        $match: {
          status: 1,
          fdalebelId: mongoose.Types.ObjectId(data.fdaId),
          assignContainerToOthersIds: {
            $elemMatch: {
              factoryUserId: data.userId,
            },
          },
        },
      };
      var firstProjectCollection = {
        $project: {
          _id: 0,
          assignContainerToOthersIds: {
            $filter: {
              input: "$assignContainerToOthersIds",
              as: "assignContainerToOthersIds",
              cond: {
                $eq: [
                  "$$assignContainerToOthersIds.factoryUserId",
                  data.userId,
                ],
              },
            },
          },
        },
      };

      var secondProjectCollection = {
        $project: {
          containers: {
            $first: "$assignContainerToOthersIds.nftData.containers",
          },
          pallets: { $first: "$assignContainerToOthersIds.nftData.pallets" },
          masterCartons: {
            $first: "$assignContainerToOthersIds.nftData.masterCartons",
          },
          innerCartons: {
            $first: "$assignContainerToOthersIds.nftData.innerCartons",
          },
          drugs: { $first: "$assignContainerToOthersIds.nftData.drugs" },
        },
      };

      var palletsCollection = {
        $lookup: {
          from: "tbl_blockChainUpdatedIpfsData",
          let: { pallets: "$pallets" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $ne: ["$nftSaveUserId", ""],
                    },
                    {
                      $in: ["$ipfsHash", "$$pallets"],
                    },
                  ],
                },
              },
            },
          ],
          as: "palletsData",
        },
      };

      var masterCartonsCollection = {
        $lookup: {
          from: "tbl_blockChainUpdatedIpfsData",
          let: { masterCartons: "$masterCartons" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $ne: ["$nftSaveUserId", ""],
                    },
                    {
                      $in: ["$ipfsHash", "$$masterCartons"],
                    },
                  ],
                },
              },
            },
          ],
          as: "masterCartonsData",
        },
      };

      var innerCartonsCollection = {
        $lookup: {
          from: "tbl_blockChainUpdatedIpfsData",
          let: { innerCartons: "$innerCartons" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $ne: ["$nftSaveUserId", ""],
                    },
                    {
                      $in: ["$ipfsHash", "$$innerCartons"],
                    },
                  ],
                },
              },
            },
          ],
          as: "innerCartonsData",
        },
      };

      var drugsCollection = {
        $lookup: {
          from: "tbl_blockChainUpdatedIpfsData",
          let: { drugs: "$drugs" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $ne: ["$nftSaveUserId", ""],
                    },
                    {
                      $in: ["$ipfsHash", "$$drugs"],
                    },
                  ],
                },
              },
            },
          ],
          as: "drugsData",
        },
      };
    } else {
      var newCollection = getNftsArray;
      var matchCollectionKey = {
        $match: {
          status: 1,
          fdalebelId: mongoose.Types.ObjectId(data.fdaId),
          assignContainerByFactoryIds: {
            $elemMatch: {
              factoryId: data.userId,
            },
          },
        },
      };
      var firstProjectCollection = {
        $project: {
          _id: 0,
          assignContainerByFactoryIds: {
            $filter: {
              input: "$assignContainerByFactoryIds",
              as: "assignContainerByFactoryIds",
              cond: {
                $eq: ["$$assignContainerByFactoryIds.factoryId", data.userId],
              },
            },
          },
        },
      };

      var secondProjectCollection = {
        $project: {
          containers: {
            $first: "$assignContainerByFactoryIds.nftData.containers",
          },
          pallets: { $first: "$assignContainerByFactoryIds.nftData.pallets" },
          masterCartons: {
            $first: "$assignContainerByFactoryIds.nftData.masterCartons",
          },
          innerCartons: {
            $first: "$assignContainerByFactoryIds.nftData.innerCartons",
          },
          drugs: { $first: "$assignContainerByFactoryIds.nftData.drugs" },
        },
      };

      var palletsCollection = {
        $lookup: {
          from: "tbl_blockChainUpdatedIpfsData",
          let: { pallets: "$pallets" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$ipfsHash", "$$pallets"],
                },
              },
            },
          ],
          as: "palletsData",
        },
      };

      var masterCartonsCollection = {
        $lookup: {
          from: "tbl_blockChainUpdatedIpfsData",
          let: { masterCartons: "$masterCartons" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$ipfsHash", "$$masterCartons"],
                },
              },
            },
          ],
          as: "masterCartonsData",
        },
      };

      var innerCartonsCollection = {
        $lookup: {
          from: "tbl_blockChainUpdatedIpfsData",
          let: { innerCartons: "$innerCartons" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$ipfsHash", "$$innerCartons"],
                },
              },
            },
          ],
          as: "innerCartonsData",
        },
      };

      var drugsCollection = {
        $lookup: {
          from: "tbl_blockChainUpdatedIpfsData",
          let: { drugs: "$drugs" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$ipfsHash", "$$drugs"],
                },
              },
            },
          ],
          as: "drugsData",
        },
      };
    }
    newCollection
      .aggregate([
        matchCollectionKey,
        firstProjectCollection,
        secondProjectCollection,
        {
          $project: {
            containers: {$ifNull: ["$containers.ipfsHash",[]]},
            pallets: {$ifNull: ["$pallets.ipfsHash",[]]},
            masterCartons: {$ifNull: ["$masterCartons.ipfsHash",[]]},
            innerCartons: {$ifNull: ["$innerCartons.ipfsHash",[]]},
            drugs: {$ifNull: ["$drugs.ipfsHash",[]]}
          },
        },
        {
          $lookup: {
            from: "tbl_blockChainUpdatedIpfsData",
            let: { containers: "$containers" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ["$ipfsHash", "$$containers"],
                  },
                },
              },
            ],
            as: "containersData",
          },
        },
        palletsCollection,
        masterCartonsCollection,
        innerCartonsCollection,
        drugsCollection,
        {
          $project: {
            containersData: 1,
            palletsData: 1,
            masterCartonsData: 1,
            innerCartonsData: 1,
            drugsData: 1,
          },
        },
        {
          $project: {
            all: {
              $concatArrays: [
                "$containersData",
                "$palletsData",
                "$masterCartonsData",
                "$innerCartonsData",
                "$drugsData",
              ],
            },
          },
        },
        {
          $unwind: "$all",
        },
        { $replaceRoot: { newRoot: { $mergeObjects: ["$all"] } } },
        {
          $set: {
            nftBurnByUserId: {
              $convert: {
                input: "$nftBurnByUserId",
                to: "objectId",
                onError: "",
                onNull: "",
              },
            },
            nftSaveUserId: {
              $convert: {
                input: "$nftSaveUserId",
                to: "objectId",
                onError: "",
                onNull: "",
              },
            },
          },
        },
        {
          $lookup: {
            from: "tbl_user",
            localField: "nftBurnByUserId",
            foreignField: "_id",
            as: "nftBurnByUserIdDetails",
          },
        },
        {
          $lookup: {
            from: "tbl_user",
            localField: "nftSaveUserId",
            foreignField: "_id",
            as: "nftSaveUserIdDetails",
          },
        },
        {
          $addFields: {
            customProductId: {
              $toObjectId: "$data.productId",
            },
          },
        },
        {
          $lookup: {
            from: "tbl_products",
            localField: "customProductId",
            foreignField: "_id",
            as: "productDetails",
          },
        },
        {
          $addFields: {
            convertVerifyByUserId: {
              $toObjectId: {
                $first: "$nftVerifyByUserId.verifyByUserId",
              },
            },
          },
        },
        {
          $lookup: {
            from: "tbl_user",
            localField: "convertVerifyByUserId",
            foreignField: "_id",
            as: "nftVerifyByUserIdDetails",
          },
        },
        {
          $lookup: {
            from: "tbl_save_nfts_reports",
            localField: "ipfsHash",
            foreignField: "ipfsHash",
            as: "nftVerifyUserFlagDetails",
          },
        },
        {
          $project: {
            _id: 1,
            userId: 1,
            ipfsHash: 1,
            nftTokenId: 1,
            nftBurnByUserId: 1,
            nftSaveUserId: 1,
            nftTransactionHash: 1,
            fdaId: 1,
            data: 1,
            status: 1,
            nftSaveUserIdDate: 1,
            nftBurnByUserIdDate: 1,
            createdDate: 1,
            updateDate: 1,
            nftVerifyByUserIdDate: 1,
            nftVerifyUserFlag: 1,
            userType: 1,
            nftBurnByUserIdDetails: 1,
            nftSaveUserIdDetails: 1,
            customProductId: 1,
            productDetails: 1,
            convertVerifyByUserId: 1,
            nftVerifyByUserIdDetails: 1,
            nftVerifyUserFlagDetails: 1,

            nftVerifyLocation: { $ifNull: ["$nftVerifyLocation", ""] },
            nftBurnLocation: { $ifNull: ["$nftBurnLocation", ""] },
            nftSaveLocation: { $ifNull: ["$nftSaveLocation", ""] },
          },
        },
        {
          $lookup: {
            from: "tbl_user",
            localField: "nftVerifyUserFlagDetails.userId",
            foreignField: "_id",
            as: "userDetails",
          },
        },
      ])
      .exec(async (err, result) => {
        if (err) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          var containersPushData = [];
          var palletsPushData = [];
          var mastersCartonsPushData = [];
          var innerCartonsPushData = [];
          var drugsPushData = [];
          result.filter((item) => {
            if (item.data.type == "containers") {
              containersPushData.push(item);
            } else if (item.data.type == "pallets") {
              palletsPushData.push(item);
            } else if (item.data.type == "masterCartons") {
              mastersCartonsPushData.push(item);
            } else if (item.data.type == "innerCartons") {
              innerCartonsPushData.push(item);
            } else {
              drugsPushData.push(item);
            }
          });

          if (data.type == "all") {           
            var obj = {
              status: 1,
              data: {
                newprductDetails:
                  containersPushData.length > 0
                    ? containersPushData[0].productDetails
                    : [],

                containers: {
                  quantity: containersPushData.length,
                  burned: _.filter(containersPushData, { status: 3 }).length,
                  verified: _.filter(containersPushData, { status: 2 }).length,
                  balance: _.filter(containersPushData, { status: 1 }).length,
                  nftsFlag: containersPushData,
                },

                pallets: {
                  quantity: palletsPushData.length,
                  burned: _.filter(palletsPushData, { status: 3 }).length,
                  verified: _.filter(palletsPushData, { status: 2 }).length,
                  balance: _.filter(palletsPushData, { status: 1 }).length,
                  nftsFlag: palletsPushData,
                },

                masterCartons: {
                  quantity: mastersCartonsPushData.length,
                  burned: _.filter(mastersCartonsPushData, { status: 3 })
                    .length,
                  verified: _.filter(mastersCartonsPushData, { status: 2 })
                    .length,
                  balance: _.filter(mastersCartonsPushData, { status: 1 })
                    .length,
                  nftsFlag: mastersCartonsPushData,
                },

                innerCartons: {
                  quantity: innerCartonsPushData.length,
                  burned: _.filter(innerCartonsPushData, { status: 3 }).length,
                  verified: _.filter(innerCartonsPushData, { status: 2 })
                    .length,
                  balance: _.filter(innerCartonsPushData, { status: 1 }).length,
                  nftsFlag: innerCartonsPushData,
                },

                drugs: {
                  quantity: drugsPushData.length,
                  burned: _.filter(drugsPushData, { status: 3 }).length,
                  verified: _.filter(drugsPushData, { status: 2 }).length,
                  balance: _.filter(drugsPushData, { status: 1 }).length,
                  nftsFlag: drugsPushData,
                },
              },
            };
          } else if (data.type == "containers") {
            var obj = {
              status: 1,
              data: {
                newprductDetails:
                  containersPushData.length > 0
                    ? containersPushData[0].productDetails
                    : [],
                containers: containersPushData,
              },
            };
          } else if (data.type == "pallets") {
            var obj = {
              status: 1,
              data: {
                newprductDetails:
                  palletsPushData.length > 0
                    ? palletsPushData[0].productDetails
                    : [],
                pallets: palletsPushData,
              },
            };
          } else if (data.type == "masterCartons") {
            var obj = {
              status: 1,
              data: {
                newprductDetails:
                  mastersCartonsPushData.length > 0
                    ? mastersCartonsPushData[0].productDetails
                    : [],
                masterCartons: mastersCartonsPushData,
              },
            };
          } else if (data.type == "innerCartons") {
            var obj = {
              status: 1,
              data: {
                newprductDetails:
                  innerCartonsPushData.length > 0
                    ? innerCartonsPushData[0].productDetails
                    : [],
                innerCartons: innerCartonsPushData,
              },
            };
          } else {
            var obj = {
              status: 1,
              data: {
                newprductDetails:
                  drugsPushData.length > 0
                    ? drugsPushData[0].productDetails
                    : [],
                drugs: drugsPushData,
              },
            };
          }         
          
          deferred.resolve(obj);
        }
      });

    return deferred.promise;
  },
  getIpfsDataAsPerType: async (data,databaseName) => {
    var deferred = Q.defer();
    let getData = await self.createDatabase(databaseName);
    let [assignFactotry,getOrder,assignMetaData, generatedUpdateStatus, factoryByContainerSchema, getNftsArray, assignContainerToOthersData, ipfsverifydata, saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain, saveNftsReportData, ipfsUpdatedVerify,ipfsUpdated,ipfsSchema,productModel] = getData;
    
    
    // saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain

    if (data.type == "pallets") {
      saveNftsPalletsInChain
        .aggregate([
          {
            $match: {
              parentIpfs: data.ipfsHash,
            },
          },
          {
            $set: {
              nftBurnByUserId: {
                $convert: {
                  input: "$nftBurnByUserId",
                  to: "objectId",
                  onError: "",
                  onNull: "",
                },
              },
              nftSaveUserId: {
                $convert: {
                  input: "$nftSaveUserId",
                  to: "objectId",
                  onError: "",
                  onNull: "",
                },
              },
            },
          },
          {
            $lookup: {
              from: "tbl_user",
              localField: "nftBurnByUserId",
              foreignField: "_id",
              as: "nftBurnByUserIdDetails",
            },
          },
          {
            $lookup: {
              from: "tbl_blockChainUpdatedIpfsData",
              localField: "ipfsHash",
              foreignField: "ipfsHash",
              as: "blockChainIpfsData",
            },
          },
          {
            $addFields: {
              customProductId: {
                $toObjectId: "$data.productId",
              },
            },
          },
          {
            $lookup: {
              from: "tbl_products",
              localField: "customProductId",
              foreignField: "_id",
              as: "productDetails",
            },
          },
          {
            $project: {
              _id: 1,
              userId: 1,
              ipfsHash: 1,
              nftTokenId: 1,
              nftBurnByUserId: 1,
              nftBurnByUserIdDate: {
                $first: "$blockChainIpfsData.nftBurnByUserIdDate",
              },
              nftSaveUserId: {
                $toObjectId: { $first: "$blockChainIpfsData.nftSaveUserId" },
              },
              nftSaveUserIdDate: {
                $first: "$blockChainIpfsData.nftSaveUserIdDate",
              },
              status: { $first: "$blockChainIpfsData.status" },
              nftVerifyByUserId: {
                $first: "$blockChainIpfsData.nftVerifyByUserId",
              },
              nftVerifyByUserIdDate: {
                $first: "$blockChainIpfsData.nftVerifyByUserIdDate",
              },
              nftBurnTransactionHash: {
                $first: "$blockChainIpfsData.nftBurnTransactionHash",
              },
              nftTransactionHash: 1,
              fdaId: 1,
              data: 1,
              createdDate: 1,
              updateDate: 1,
              userType: 1,
              nftBurnByUserIdDetails: 1,
              newprductDetails: "$productDetails",

              nftVerifyLocation: {
                $ifNull: [
                  { $first: "$blockChainIpfsData.nftVerifyLocation" },
                  "",
                ],
              },
              nftBurnLocation: {
                $ifNull: [
                  { $first: "$blockChainIpfsData.nftBurnLocation" },
                  "",
                ],
              },
              nftSaveLocation: {
                $ifNull: [
                  { $first: "$blockChainIpfsData.nftSaveLocation" },
                  "",
                ],
              },
            },
          },
          {
            $lookup: {
              from: "tbl_user",
              localField: "nftSaveUserId",
              foreignField: "_id",
              as: "nftSaveUserIdDetails",
            },
          },
          {
            $addFields: {
              convertVerifyByUserId: {
                $toObjectId: {
                  $first: "$nftVerifyByUserId.verifyByUserId",
                },
              },
            },
          },
          {
            $lookup: {
              from: "tbl_user",
              localField: "convertVerifyByUserId",
              foreignField: "_id",
              as: "nftVerifyByUserIdDetails",
            },
          },
          {
            $project: {
              _id: 1,
              userId: 1,
              ipfsHash: 1,
              nftTokenId: 1,
              nftBurnByUserId: 1,
              nftSaveUserId: 1,
              nftSaveUserIdDetails: 1,
              status: 1,
              nftSaveUserIdDate: 1,
              nftVerifyByUserId: 1,
              nftVerifyByUserIdDate: 1,
              nftBurnByUserIdDate: 1,
              nftBurnTransactionHash: 1,
              nftTransactionHash: 1,
              fdaId: 1,
              data: 1,
              createdDate: 1,
              updateDate: 1,
              userType: 1,
              nftBurnByUserIdDetails: 1,
              newprductDetails: "$productDetails",
              nftVerifyByUserIdDetails: "$nftVerifyByUserIdDetails",

              nftVerifyLocation: 1,
              nftBurnLocation: 1,
              nftSaveLocation: 1,
            },
          },
        ])
        .exec(async (err, result) => {
          if (err) {
            let obj = { status: 0, data: err };
            deferred.resolve(obj);
          } else {
            let obj = { status: 1, data: result };
            deferred.resolve(obj);
          }
        });
    } else if (data.type == "masterCartons") {
      saveNftsMastersInChain
        .aggregate([
          {
            $match: {
              parentIpfs: data.ipfsHash,
            },
          },
          {
            $set: {
              nftBurnByUserId: {
                $convert: {
                  input: "$nftBurnByUserId",
                  to: "objectId",
                  onError: "",
                  onNull: "",
                },
              },
              nftSaveUserId: {
                $convert: {
                  input: "$nftSaveUserId",
                  to: "objectId",
                  onError: "",
                  onNull: "",
                },
              },
            },
          },
          {
            $lookup: {
              from: "tbl_user",
              localField: "nftBurnByUserId",
              foreignField: "_id",
              as: "nftBurnByUserIdDetails",
            },
          },
          {
            $lookup: {
              from: "tbl_user",
              localField: "nftSaveUserId",
              foreignField: "_id",
              as: "nftSaveUserIdDetails",
            },
          },
          {
            $lookup: {
              from: "tbl_blockChainUpdatedIpfsData",
              localField: "ipfsHash",
              foreignField: "ipfsHash",
              as: "blockChainIpfsData",
            },
          },
          {
            $addFields: {
              customProductId: {
                $toObjectId: "$data.productId",
              },
            },
          },
          {
            $lookup: {
              from: "tbl_products",
              localField: "customProductId",
              foreignField: "_id",
              as: "productDetails",
            },
          },
          {
            $project: {
              _id: 1,
              userId: 1,
              ipfsHash: 1,
              nftTokenId: 1,
              nftBurnByUserId: 1,
              nftSaveUserId: { $first: "$blockChainIpfsData.nftSaveUserId" },
              status: { $first: "$blockChainIpfsData.status" },
              nftSaveUserIdDate: {
                $first: "$blockChainIpfsData.nftSaveUserIdDate",
              },
              nftVerifyByUserId: {
                $first: "$blockChainIpfsData.nftVerifyByUserId",
              },
              nftVerifyByUserIdDate: {
                $first: "$blockChainIpfsData.nftVerifyByUserIdDate",
              },
              nftBurnByUserIdDate: {
                $first: "$blockChainIpfsData.nftBurnByUserIdDate",
              },
              nftBurnTransactionHash: {
                $first: "$blockChainIpfsData.nftBurnTransactionHash",
              },
              nftVerifyByUserId: {
                $first: "$blockChainIpfsData.nftVerifyByUserId",
              },
              nftTransactionHash: 1,
              fdaId: 1,
              data: 1,
              createdDate: 1,
              updateDate: 1,
              userType: 1,
              nftBurnByUserIdDetails: 1,
              newprductDetails: "$productDetails",
              nftSaveUserIdDetails: 1,

              nftVerifyLocation: {
                $ifNull: [
                  { $first: "$blockChainIpfsData.nftVerifyLocation" },
                  "",
                ],
              },
              nftBurnLocation: {
                $ifNull: [
                  { $first: "$blockChainIpfsData.nftBurnLocation" },
                  "",
                ],
              },
              nftSaveLocation: {
                $ifNull: [
                  { $first: "$blockChainIpfsData.nftSaveLocation" },
                  "",
                ],
              },
            },
          },
          {
            $addFields: {
              convertVerifyByUserId: {
                $toObjectId: {
                  $first: "$nftVerifyByUserId.verifyByUserId",
                },
              },
            },
          },
          {
            $lookup: {
              from: "tbl_user",
              localField: "convertVerifyByUserId",
              foreignField: "_id",
              as: "nftVerifyByUserIdDetails",
            },
          },
          {
            $project: {
              _id: 1,
              userId: 1,
              ipfsHash: 1,
              nftTokenId: 1,
              nftBurnByUserId: 1,
              nftSaveUserId: 1,
              nftSaveUserIdDetails: 1,
              status: 1,
              nftSaveUserIdDate: 1,
              nftVerifyByUserId: 1,
              nftVerifyByUserIdDate: 1,
              nftBurnByUserIdDate: 1,
              nftBurnTransactionHash: 1,
              nftTransactionHash: 1,
              fdaId: 1,
              data: 1,
              createdDate: 1,
              updateDate: 1,
              userType: 1,
              nftBurnByUserIdDetails: 1,
              newprductDetails: "$productDetails",
              nftVerifyByUserIdDetails: "$nftVerifyByUserIdDetails",

              nftVerifyLocation: 1,
              nftBurnLocation: 1,
              nftSaveLocation: 1,
            },
          },
        ])
        .exec(async (err, result) => {
          if (err) {
            let obj = { status: 0, data: err };
            deferred.resolve(obj);
          } else {
            let obj = { status: 1, data: result };
            deferred.resolve(obj);
          }
        });
    } else if (data.type == "innerCartons") {
      saveNftsInnersDataInChain
        .aggregate([
          {
            $match: {
              parentIpfs: data.ipfsHash,
            },
          },
          {
            $set: {
              nftBurnByUserId: {
                $convert: {
                  input: "$nftBurnByUserId",
                  to: "objectId",
                  onError: "",
                  onNull: "",
                },
              },
              nftSaveUserId: {
                $convert: {
                  input: "$nftSaveUserId",
                  to: "objectId",
                  onError: "",
                  onNull: "",
                },
              },
            },
          },
          {
            $lookup: {
              from: "tbl_user",
              localField: "nftBurnByUserId",
              foreignField: "_id",
              as: "nftBurnByUserIdDetails",
            },
          },
          {
            $lookup: {
              from: "tbl_user",
              localField: "nftSaveUserId",
              foreignField: "_id",
              as: "nftSaveUserIdDetails",
            },
          },
          {
            $lookup: {
              from: "tbl_blockChainUpdatedIpfsData",
              localField: "ipfsHash",
              foreignField: "ipfsHash",
              as: "blockChainIpfsData",
            },
          },
          {
            $addFields: {
              customProductId: {
                $toObjectId: "$data.productId",
              },
            },
          },
          {
            $lookup: {
              from: "tbl_products",
              localField: "customProductId",
              foreignField: "_id",
              as: "productDetails",
            },
          },
          {
            $project: {
              _id: 1,
              userId: 1,
              ipfsHash: 1,
              nftTokenId: 1,
              nftBurnByUserId: 1,
              nftSaveUserId: { $first: "$blockChainIpfsData.nftSaveUserId" },
              status: { $first: "$blockChainIpfsData.status" },
              nftSaveUserIdDate: {
                $first: "$blockChainIpfsData.nftSaveUserIdDate",
              },
              nftVerifyByUserId: {
                $first: "$blockChainIpfsData.nftVerifyByUserId",
              },
              nftVerifyByUserIdDate: {
                $first: "$blockChainIpfsData.nftVerifyByUserIdDate",
              },
              nftBurnByUserIdDate: {
                $first: "$blockChainIpfsData.nftBurnByUserIdDate",
              },
              nftBurnTransactionHash: {
                $first: "$blockChainIpfsData.nftBurnTransactionHash",
              },
              nftVerifyByUserId: {
                $first: "$blockChainIpfsData.nftVerifyByUserId",
              },
              nftTransactionHash: 1,
              fdaId: 1,
              data: 1,
              createdDate: 1,
              updateDate: 1,
              userType: 1,
              nftBurnByUserIdDetails: 1,
              newprductDetails: "$productDetails",
              nftSaveUserIdDetails: 1,

              nftVerifyLocation: {
                $ifNull: [
                  { $first: "$blockChainIpfsData.nftVerifyLocation" },
                  "",
                ],
              },
              nftBurnLocation: {
                $ifNull: [
                  { $first: "$blockChainIpfsData.nftBurnLocation" },
                  "",
                ],
              },
              nftSaveLocation: {
                $ifNull: [
                  { $first: "$blockChainIpfsData.nftSaveLocation" },
                  "",
                ],
              },
            },
          },
          {
            $addFields: {
              convertVerifyByUserId: {
                $toObjectId: {
                  $first: "$nftVerifyByUserId.verifyByUserId",
                },
              },
            },
          },
          {
            $lookup: {
              from: "tbl_user",
              localField: "convertVerifyByUserId",
              foreignField: "_id",
              as: "nftVerifyByUserIdDetails",
            },
          },
          {
            $project: {
              _id: 1,
              userId: 1,
              ipfsHash: 1,
              nftTokenId: 1,
              nftBurnByUserId: 1,
              nftSaveUserId: 1,
              nftSaveUserIdDetails: 1,
              status: 1,
              nftSaveUserIdDate: 1,
              nftVerifyByUserId: 1,
              nftVerifyByUserIdDate: 1,
              nftBurnByUserIdDate: 1,
              nftBurnTransactionHash: 1,
              nftTransactionHash: 1,
              fdaId: 1,
              data: 1,
              createdDate: 1,
              updateDate: 1,
              userType: 1,
              nftBurnByUserIdDetails: 1,
              newprductDetails: "$productDetails",
              nftVerifyByUserIdDetails: "$nftVerifyByUserIdDetails",

              nftVerifyLocation: 1,
              nftBurnLocation: 1,
              nftSaveLocation: 1,
            },
          },
        ])
        .exec(async (err, result) => {
          if (err) {
            let obj = { status: 0, data: err };
            deferred.resolve(obj);
          } else {
            let obj = { status: 1, data: result };
            deferred.resolve(obj);
          }
        });
    } else {
      saveNftsDrugsDataInChain
        .aggregate([
          {
            $match: {
              parentIpfs: data.ipfsHash,
            },
          },
          {
            $set: {
              nftBurnByUserId: {
                $convert: {
                  input: "$nftBurnByUserId",
                  to: "objectId",
                  onError: "",
                  onNull: "",
                },
              },
              nftSaveUserId: {
                $convert: {
                  input: "$nftSaveUserId",
                  to: "objectId",
                  onError: "",
                  onNull: "",
                },
              },
            },
          },
          {
            $lookup: {
              from: "tbl_user",
              localField: "nftBurnByUserId",
              foreignField: "_id",
              as: "nftBurnByUserIdDetails",
            },
          },
          {
            $lookup: {
              from: "tbl_user",
              localField: "nftSaveUserId",
              foreignField: "_id",
              as: "nftSaveUserIdDetails",
            },
          },
          {
            $lookup: {
              from: "tbl_blockChainUpdatedIpfsData",
              localField: "ipfsHash",
              foreignField: "ipfsHash",
              as: "blockChainIpfsData",
            },
          },
          {
            $addFields: {
              customProductId: {
                $toObjectId: "$data.productId",
              },
            },
          },
          {
            $lookup: {
              from: "tbl_products",
              localField: "customProductId",
              foreignField: "_id",
              as: "productDetails",
            },
          },
          {
            $project: {
              _id: 1,
              userId: 1,
              ipfsHash: 1,
              nftTokenId: 1,
              nftBurnByUserId: 1,
              nftSaveUserId: { $first: "$blockChainIpfsData.nftSaveUserId" },
              status: { $first: "$blockChainIpfsData.status" },
              nftSaveUserIdDate: {
                $first: "$blockChainIpfsData.nftSaveUserIdDate",
              },
              nftVerifyByUserId: {
                $first: "$blockChainIpfsData.nftVerifyByUserId",
              },
              nftVerifyByUserIdDate: {
                $first: "$blockChainIpfsData.nftVerifyByUserIdDate",
              },
              nftBurnByUserIdDate: {
                $first: "$blockChainIpfsData.nftBurnByUserIdDate",
              },
              nftBurnTransactionHash: {
                $first: "$blockChainIpfsData.nftBurnTransactionHash",
              },
              nftVerifyByUserId: {
                $first: "$blockChainIpfsData.nftVerifyByUserId",
              },
              nftTransactionHash: 1,
              fdaId: 1,
              data: 1,
              createdDate: 1,
              updateDate: 1,
              userType: 1,
              nftBurnByUserIdDetails: 1,
              newprductDetails: "$productDetails",
              nftSaveUserIdDetails: 1,

              nftVerifyLocation: {
                $ifNull: [
                  { $first: "$blockChainIpfsData.nftVerifyLocation" },
                  "",
                ],
              },
              nftBurnLocation: {
                $ifNull: [
                  { $first: "$blockChainIpfsData.nftBurnLocation" },
                  "",
                ],
              },
              nftSaveLocation: {
                $ifNull: [
                  { $first: "$blockChainIpfsData.nftSaveLocation" },
                  "",
                ],
              },
            },
          },
          {
            $addFields: {
              convertVerifyByUserId: {
                $toObjectId: {
                  $first: "$nftVerifyByUserId.verifyByUserId",
                },
              },
            },
          },
          {
            $lookup: {
              from: "tbl_user",
              localField: "convertVerifyByUserId",
              foreignField: "_id",
              as: "nftVerifyByUserIdDetails",
            },
          },
          {
            $project: {
              _id: 1,
              userId: 1,
              ipfsHash: 1,
              nftTokenId: 1,
              nftBurnByUserId: 1,
              nftSaveUserId: 1,
              nftSaveUserIdDetails: 1,
              status: 1,
              nftSaveUserIdDate: 1,
              nftVerifyByUserId: 1,
              nftVerifyByUserIdDate: 1,
              nftBurnByUserIdDate: 1,
              nftBurnTransactionHash: 1,
              nftTransactionHash: 1,
              fdaId: 1,
              data: 1,
              createdDate: 1,
              updateDate: 1,
              userType: 1,
              nftBurnByUserIdDetails: 1,
              newprductDetails: "$productDetails",
              nftVerifyByUserIdDetails: "$nftVerifyByUserIdDetails",

              nftVerifyLocation: 1,
              nftBurnLocation: 1,
              nftSaveLocation: 1,
            },
          },
        ])
        .exec(async (err, result) => {
          if (err) {
            let obj = { status: 0, data: err };
            deferred.resolve(obj);
          } else {
            let obj = { status: 1, data: result };
            deferred.resolve(obj);
          }
        });
    }
    return deferred.promise;
  },
  getIpfsDataAsPerType_30_11: async (data) => {
    var deferred = Q.defer();

    // saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain

    if (data.type == "pallets") {
      saveNftsPalletsInChain
        .aggregate([
          {
            $match: {
              containerIpfs: data.ipfsHash,
            },
          },
          {
            $set: {
              nftBurnByUserId: {
                $convert: {
                  input: "$nftBurnByUserId",
                  to: "objectId",
                  onError: "",
                  onNull: "",
                },
              },
              nftSaveUserId: {
                $convert: {
                  input: "$nftSaveUserId",
                  to: "objectId",
                  onError: "",
                  onNull: "",
                },
              },
            },
          },
          {
            $lookup: {
              from: "tbl_user",
              localField: "nftBurnByUserId",
              foreignField: "_id",
              as: "nftBurnByUserIdDetails",
            },
          },
          {
            $lookup: {
              from: "tbl_user",
              localField: "nftSaveUserId",
              foreignField: "_id",
              as: "nftSaveUserIdDetails",
            },
          },
          {
            $lookup: {
              from: "tbl_blockChainIpfsData",
              localField: "ipfsHash",
              foreignField: "ipfsHash",
              as: "blockChainIpfsData",
            },
          },
          {
            $addFields: {
              customProductId: {
                $toObjectId: "$data.productId",
              },
            },
          },
          {
            $lookup: {
              from: "tbl_products",
              localField: "customProductId",
              foreignField: "_id",
              as: "productDetails",
            },
          },
          {
            $project: {
              _id: 1,
              userId: 1,
              ipfsHash: 1,
              nftTokenId: 1,
              nftBurnByUserId: 1,
              nftSaveUserId: { $first: "$blockChainIpfsData.nftSaveUserId" },
              status: { $first: "$blockChainIpfsData.status" },
              nftSaveUserIdDate: {
                $first: "$blockChainIpfsData.nftSaveUserIdDate",
              },
              nftVerifyByUserId: {
                $first: "$blockChainIpfsData.nftVerifyByUserId",
              },
              nftVerifyByUserIdDate: {
                $first: "$blockChainIpfsData.nftVerifyByUserIdDate",
              },
              nftBurnByUserIdDate: {
                $first: "$blockChainIpfsData.nftBurnByUserIdDate",
              },
              nftBurnTransactionHash: {
                $first: "$blockChainIpfsData.nftBurnTransactionHash",
              },
              nftTransactionHash: 1,
              fdaId: 1,
              data: 1,
              createdDate: 1,
              updateDate: 1,
              userType: 1,
              nftBurnByUserIdDetails: 1,
              newprductDetails: "$productDetails",
            },
          },
          {
            $addFields: {
              convertVerifyByUserId: {
                $toObjectId: {
                  $first: "$nftVerifyByUserId.verifyByUserId",
                },
              },
            },
          },
          {
            $lookup: {
              from: "tbl_user",
              localField: "convertVerifyByUserId",
              foreignField: "_id",
              as: "nftVerifyByUserIdDetails",
            },
          },
          {
            $project: {
              _id: 1,
              userId: 1,
              ipfsHash: 1,
              nftTokenId: 1,
              nftBurnByUserId: 1,
              nftSaveUserId: 1,
              status: 1,
              nftSaveUserIdDate: 1,
              nftVerifyByUserId: 1,
              nftVerifyByUserIdDate: 1,
              nftBurnByUserIdDate: 1,
              nftBurnTransactionHash: 1,
              nftTransactionHash: 1,
              fdaId: 1,
              data: 1,
              createdDate: 1,
              updateDate: 1,
              userType: 1,
              nftBurnByUserIdDetails: 1,
              newprductDetails: "$productDetails",
              nftVerifyByUserIdDetails: "$nftVerifyByUserIdDetails",
            },
          },
        ])
        .exec(async (err, result) => {
          if (err) {
            let obj = { status: 0, data: err };
            deferred.resolve(obj);
          } else {
            let obj = { status: 1, data: result };
            deferred.resolve(obj);
          }
        });
    } else if (data.type == "masterCartons") {
      saveNftsMastersInChain
        .aggregate([
          {
            $match: {
              palletIpfs: data.ipfsHash,
            },
          },
          {
            $set: {
              nftBurnByUserId: {
                $convert: {
                  input: "$nftBurnByUserId",
                  to: "objectId",
                  onError: "",
                  onNull: "",
                },
              },
              nftSaveUserId: {
                $convert: {
                  input: "$nftSaveUserId",
                  to: "objectId",
                  onError: "",
                  onNull: "",
                },
              },
            },
          },
          {
            $lookup: {
              from: "tbl_user",
              localField: "nftBurnByUserId",
              foreignField: "_id",
              as: "nftBurnByUserIdDetails",
            },
          },
          {
            $lookup: {
              from: "tbl_user",
              localField: "nftSaveUserId",
              foreignField: "_id",
              as: "nftSaveUserIdDetails",
            },
          },
          {
            $lookup: {
              from: "tbl_blockChainIpfsData",
              localField: "ipfsHash",
              foreignField: "ipfsHash",
              as: "blockChainIpfsData",
            },
          },
          {
            $addFields: {
              customProductId: {
                $toObjectId: "$data.productId",
              },
            },
          },
          {
            $lookup: {
              from: "tbl_products",
              localField: "customProductId",
              foreignField: "_id",
              as: "productDetails",
            },
          },
          {
            $project: {
              _id: 1,
              userId: 1,
              ipfsHash: 1,
              nftTokenId: 1,
              nftBurnByUserId: 1,
              nftSaveUserId: { $first: "$blockChainIpfsData.nftSaveUserId" },
              status: { $first: "$blockChainIpfsData.status" },
              nftSaveUserIdDate: {
                $first: "$blockChainIpfsData.nftSaveUserIdDate",
              },
              nftVerifyByUserId: {
                $first: "$blockChainIpfsData.nftVerifyByUserId",
              },
              nftVerifyByUserIdDate: {
                $first: "$blockChainIpfsData.nftVerifyByUserIdDate",
              },
              nftBurnByUserIdDate: {
                $first: "$blockChainIpfsData.nftBurnByUserIdDate",
              },
              nftBurnTransactionHash: {
                $first: "$blockChainIpfsData.nftBurnTransactionHash",
              },
              nftVerifyByUserId: {
                $first: "$blockChainIpfsData.nftVerifyByUserId",
              },
              nftTransactionHash: 1,
              fdaId: 1,
              data: 1,
              createdDate: 1,
              updateDate: 1,
              userType: 1,
              nftBurnByUserIdDetails: 1,
              newprductDetails: "$productDetails",
            },
          },
          {
            $addFields: {
              convertVerifyByUserId: {
                $toObjectId: {
                  $first: "$nftVerifyByUserId.verifyByUserId",
                },
              },
            },
          },
          {
            $lookup: {
              from: "tbl_user",
              localField: "convertVerifyByUserId",
              foreignField: "_id",
              as: "nftVerifyByUserIdDetails",
            },
          },
          {
            $project: {
              _id: 1,
              userId: 1,
              ipfsHash: 1,
              nftTokenId: 1,
              nftBurnByUserId: 1,
              nftSaveUserId: 1,
              status: 1,
              nftSaveUserIdDate: 1,
              nftVerifyByUserId: 1,
              nftVerifyByUserIdDate: 1,
              nftBurnByUserIdDate: 1,
              nftBurnTransactionHash: 1,
              nftTransactionHash: 1,
              fdaId: 1,
              data: 1,
              createdDate: 1,
              updateDate: 1,
              userType: 1,
              nftBurnByUserIdDetails: 1,
              newprductDetails: "$productDetails",
              nftVerifyByUserIdDetails: "$nftVerifyByUserIdDetails",
            },
          },
        ])
        .exec(async (err, result) => {
          if (err) {
            let obj = { status: 0, data: err };
            deferred.resolve(obj);
          } else {
            let obj = { status: 1, data: result };
            deferred.resolve(obj);
          }
        });
    } else if (data.type == "innerCartons") {
      saveNftsInnersDataInChain
        .aggregate([
          {
            $match: {
              masterCartoonsIpfs: data.ipfsHash,
            },
          },
          {
            $set: {
              nftBurnByUserId: {
                $convert: {
                  input: "$nftBurnByUserId",
                  to: "objectId",
                  onError: "",
                  onNull: "",
                },
              },
              nftSaveUserId: {
                $convert: {
                  input: "$nftSaveUserId",
                  to: "objectId",
                  onError: "",
                  onNull: "",
                },
              },
            },
          },
          {
            $lookup: {
              from: "tbl_user",
              localField: "nftBurnByUserId",
              foreignField: "_id",
              as: "nftBurnByUserIdDetails",
            },
          },
          {
            $lookup: {
              from: "tbl_user",
              localField: "nftSaveUserId",
              foreignField: "_id",
              as: "nftSaveUserIdDetails",
            },
          },
          {
            $lookup: {
              from: "tbl_blockChainIpfsData",
              localField: "ipfsHash",
              foreignField: "ipfsHash",
              as: "blockChainIpfsData",
            },
          },
          {
            $addFields: {
              customProductId: {
                $toObjectId: "$data.productId",
              },
            },
          },
          {
            $lookup: {
              from: "tbl_products",
              localField: "customProductId",
              foreignField: "_id",
              as: "productDetails",
            },
          },
          {
            $project: {
              _id: 1,
              userId: 1,
              ipfsHash: 1,
              nftTokenId: 1,
              nftBurnByUserId: 1,
              nftSaveUserId: { $first: "$blockChainIpfsData.nftSaveUserId" },
              status: { $first: "$blockChainIpfsData.status" },
              nftSaveUserIdDate: {
                $first: "$blockChainIpfsData.nftSaveUserIdDate",
              },
              nftVerifyByUserId: {
                $first: "$blockChainIpfsData.nftVerifyByUserId",
              },
              nftVerifyByUserIdDate: {
                $first: "$blockChainIpfsData.nftVerifyByUserIdDate",
              },
              nftBurnByUserIdDate: {
                $first: "$blockChainIpfsData.nftBurnByUserIdDate",
              },
              nftBurnTransactionHash: {
                $first: "$blockChainIpfsData.nftBurnTransactionHash",
              },
              nftVerifyByUserId: {
                $first: "$blockChainIpfsData.nftVerifyByUserId",
              },
              nftTransactionHash: 1,
              fdaId: 1,
              data: 1,
              createdDate: 1,
              updateDate: 1,
              userType: 1,
              nftBurnByUserIdDetails: 1,
              newprductDetails: "$productDetails",
            },
          },
          {
            $addFields: {
              convertVerifyByUserId: {
                $toObjectId: {
                  $first: "$nftVerifyByUserId.verifyByUserId",
                },
              },
            },
          },
          {
            $lookup: {
              from: "tbl_user",
              localField: "convertVerifyByUserId",
              foreignField: "_id",
              as: "nftVerifyByUserIdDetails",
            },
          },
          {
            $project: {
              _id: 1,
              userId: 1,
              ipfsHash: 1,
              nftTokenId: 1,
              nftBurnByUserId: 1,
              nftSaveUserId: 1,
              status: 1,
              nftSaveUserIdDate: 1,
              nftVerifyByUserId: 1,
              nftVerifyByUserIdDate: 1,
              nftBurnByUserIdDate: 1,
              nftBurnTransactionHash: 1,
              nftTransactionHash: 1,
              fdaId: 1,
              data: 1,
              createdDate: 1,
              updateDate: 1,
              userType: 1,
              nftBurnByUserIdDetails: 1,
              newprductDetails: "$productDetails",
              nftVerifyByUserIdDetails: "$nftVerifyByUserIdDetails",
            },
          },
        ])
        .exec(async (err, result) => {
          if (err) {
            let obj = { status: 0, data: err };
            deferred.resolve(obj);
          } else {
            let obj = { status: 1, data: result };
            deferred.resolve(obj);
          }
        });
    } else {
      saveNftsDrugsDataInChain
        .aggregate([
          {
            $match: {
              innerCartonsIpfs: data.ipfsHash,
            },
          },
          {
            $set: {
              nftBurnByUserId: {
                $convert: {
                  input: "$nftBurnByUserId",
                  to: "objectId",
                  onError: "",
                  onNull: "",
                },
              },
              nftSaveUserId: {
                $convert: {
                  input: "$nftSaveUserId",
                  to: "objectId",
                  onError: "",
                  onNull: "",
                },
              },
            },
          },
          {
            $lookup: {
              from: "tbl_user",
              localField: "nftBurnByUserId",
              foreignField: "_id",
              as: "nftBurnByUserIdDetails",
            },
          },
          {
            $lookup: {
              from: "tbl_user",
              localField: "nftSaveUserId",
              foreignField: "_id",
              as: "nftSaveUserIdDetails",
            },
          },
          {
            $lookup: {
              from: "tbl_blockChainIpfsData",
              localField: "ipfsHash",
              foreignField: "ipfsHash",
              as: "blockChainIpfsData",
            },
          },
          {
            $addFields: {
              customProductId: {
                $toObjectId: "$data.productId",
              },
            },
          },
          {
            $lookup: {
              from: "tbl_products",
              localField: "customProductId",
              foreignField: "_id",
              as: "productDetails",
            },
          },
          {
            $project: {
              _id: 1,
              userId: 1,
              ipfsHash: 1,
              nftTokenId: 1,
              nftBurnByUserId: 1,
              nftSaveUserId: { $first: "$blockChainIpfsData.nftSaveUserId" },
              status: { $first: "$blockChainIpfsData.status" },
              nftSaveUserIdDate: {
                $first: "$blockChainIpfsData.nftSaveUserIdDate",
              },
              nftVerifyByUserId: {
                $first: "$blockChainIpfsData.nftVerifyByUserId",
              },
              nftVerifyByUserIdDate: {
                $first: "$blockChainIpfsData.nftVerifyByUserIdDate",
              },
              nftBurnByUserIdDate: {
                $first: "$blockChainIpfsData.nftBurnByUserIdDate",
              },
              nftBurnTransactionHash: {
                $first: "$blockChainIpfsData.nftBurnTransactionHash",
              },
              nftVerifyByUserId: {
                $first: "$blockChainIpfsData.nftVerifyByUserId",
              },
              nftTransactionHash: 1,
              fdaId: 1,
              data: 1,
              createdDate: 1,
              updateDate: 1,
              userType: 1,
              nftBurnByUserIdDetails: 1,
              newprductDetails: "$productDetails",
            },
          },
          {
            $addFields: {
              convertVerifyByUserId: {
                $toObjectId: {
                  $first: "$nftVerifyByUserId.verifyByUserId",
                },
              },
            },
          },
          {
            $lookup: {
              from: "tbl_user",
              localField: "convertVerifyByUserId",
              foreignField: "_id",
              as: "nftVerifyByUserIdDetails",
            },
          },
          {
            $project: {
              _id: 1,
              userId: 1,
              ipfsHash: 1,
              nftTokenId: 1,
              nftBurnByUserId: 1,
              nftSaveUserId: 1,
              status: 1,
              nftSaveUserIdDate: 1,
              nftVerifyByUserId: 1,
              nftVerifyByUserIdDate: 1,
              nftBurnByUserIdDate: 1,
              nftBurnTransactionHash: 1,
              nftTransactionHash: 1,
              fdaId: 1,
              data: 1,
              createdDate: 1,
              updateDate: 1,
              userType: 1,
              nftBurnByUserIdDetails: 1,
              newprductDetails: "$productDetails",
              nftVerifyByUserIdDetails: "$nftVerifyByUserIdDetails",
            },
          },
        ])
        .exec(async (err, result) => {
          if (err) {
            let obj = { status: 0, data: err };
            deferred.resolve(obj);
          } else {
            let obj = { status: 1, data: result };
            deferred.resolve(obj);
          }
        });
    }

    return deferred.promise;
  },
  getCompanyIdIpfs: async (data,databaseName) => {
    var deferred = Q.defer();
    let getData = await self.createDatabase(databaseName);
    let [assignFactotry,getOrder,assignMetaData, generatedUpdateStatus, factoryByContainerSchema, getNftsArray, assignContainerToOthersData, ipfsverifydata, saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain, saveNftsReportData, ipfsUpdatedVerify,ipfsUpdated,ipfsSchema,productModel] = getData;
    
    if (data.filterStatus == 1 || data.filterStatus == "1") {
      var sort = {
        $sort: {
          updateDate: -1,
        },
      };
    } else if (data.filterStatus == 2 || data.filterStatus == "2") {
      var sort = {
        $sort: {
          updateDate: -1,
        },
      };
    } else if (data.filterStatus == 3 || data.filterStatus == "3") {
      var sort = {
        $sort: {
          updateDate: -1,
        },
      };
    } else {
      var sort = {
        $sort: {
          updateDate: -1,
          // "nftBurnByUserIdDate": -1,
          // "nftSaveUserIdDate": -1,
          // "nftVerifyByUserIdDate": -1
        },
      };
    }

    ipfsUpdated
      .aggregate([
        {
          $match: {
            $or: [
              {
                $and: [
                  { status: 1 },
                  { userId: mongoose.Types.ObjectId(data.userId) },
                  // { nftSaveUserId: { $exists: true, $ne: "" } },
                ],
              },
              {
                $and: [
                  { status: 2 },
                  { userId: mongoose.Types.ObjectId(data.userId) },
                ],
              },
              {
                $and: [
                  { status: 3 },
                  { userId: mongoose.Types.ObjectId(data.userId) },
                ],
              },
            ],
          },
        },
        {
          $set: {
            nftBurnByUserId: {
              $convert: {
                input: "$nftBurnByUserId",
                to: "objectId",
                onError: "",
                onNull: "",
              },
            },
            nftSaveUserId: {
              $convert: {
                input: "$nftSaveUserId",
                to: "objectId",
                onError: "",
                onNull: "",
              },
            },
          },
        },
        {
          $addFields: {
            convertVerifyByUserId: {
              $toObjectId: {
                $first: "$nftVerifyByUserId.verifyByUserId",
              },
            },
            matchProductId: {
              $toObjectId: "$data.productId",
            },
          },
        },
        {
          $lookup: {
            from: "tbl_products",
            localField: "matchProductId",
            foreignField: "_id",
            as: "productDetails",
          },
        },
        {
          $lookup: {
            from: "tbl_user",
            localField: "nftBurnByUserId",
            foreignField: "_id",
            as: "nftBurnByUserIdDetails",
          },
        },
        {
          $lookup: {
            from: "tbl_user",
            localField: "nftSaveUserId",
            foreignField: "_id",
            as: "nftSaveUserIdDetails",
          },
        },
        // {
        //   $lookup: {
        //     from: "tbl_user",
        //     localField: "convertVerifyByUserId",
        //     foreignField: "_id",
        //     as: "nftVerifyByUserIdDetails",
        //   },
        // },
        sort,
      ])
      .exec(async (err, result) => {

       
        if (err) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {

        let obj = { status: 1, data: result };    
        // io.emit("event", result);
        
        let filterData = result.reverse()
        let filterKey = filterData.filter((val,ind)=>{
          if(val['nftVerifyByUserId'] != undefined)
          return val
        });          

        let rectiFyData = filterKey[filterKey.length - 1];
        console.log('dev......',rectiFyData);

        let nftVerifyByUserIdDetails = await User.find({"_id":mongoose.Types.ObjectId(rectiFyData.nftVerifyByUserId[0].verifyByUserId)}).exec();
        rectiFyData.nftVerifyByUserIdDetails = nftVerifyByUserIdDetails;

        console.log('nftVerifyByUserIdDetails......',nftVerifyByUserIdDetails);

        console.log('rectiFyData......',rectiFyData);


          // console.log(filterData[filterData.length - 1], "filterData[filterData.length - 1]filterData[filterData.length - 1]")
          io.emit("event", rectiFyData);
          // console.log(User, "UserUserUserUser");
        // return ;
          deferred.resolve(obj);
        }
      });

    return deferred.promise;
  },
  getOrderByProductId: async (data,databaseName) => {
    var deferred = Q.defer();
    let getData = await self.createDatabase(databaseName);
    let [assignFactotry,getOrder,assignMetaData, generatedUpdateStatus, factoryByContainerSchema, getNftsArray, assignContainerToOthersData, ipfsverifydata, saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain, saveNftsReportData, ipfsUpdatedVerify,ipfsUpdated,ipfsSchema,productModel] = getData;
    
    
    getOrder
      .aggregate([
        {
          $match: {
            productId: mongoose.Types.ObjectId(data.productId),
            userId: mongoose.Types.ObjectId(data.userId),
          },
        },
        {
          $lookup: {
            from: "tbl_products",
            let: { productId: "$productId" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$$productId", "$_id"],
                  },
                },
              },
            ],
            as: "productDetails",
          },
        },
        {
          $unwind: {
            path: "$productDetails",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "tbl_fdalebelmetadata",
            let: {
              productId: "$productId",
              userId: "$userId",
              fdalebelId: "$fdalebelId",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$$productId", "$productId"],
                    $eq: ["$$userId", "$userId"],
                    $eq: ["$$fdalebelId", "$_id"],
                  },
                },
              },
            ],
            as: "metaData",
          },
        },
        {
          $project: {
            productId: 1,
            userId: 1,
            invoiceNumber: 1,
            fdalebelId: 1,
            overDueDays: 1,
            dueDate: 1,
            paymentType: 1,
            paymentStatus: 1,
            totalNfts: 1,
            totalPriceUSD: 1,
            totalPriceINR: 1,
            createdDate: 1,
            generatedNftStatus: 1,
            packagingType: "$productDetails.packagingType",
            batchLotNo: "$productDetails.batchLotNo",
            purchaseOrderNo: "$productDetails.purchaseOrderNo",
            productName: "$productDetails.productName",
            brandName: "$productDetails.brandName",
            containerNo: {
              $arrayElemAt: [{ $first: "$metaData.container.nfts" }, 0],
            },
          },
        },
        {
          $sort: {
            _id: -1,
          },
        },
      ])
      .exec(async (err, result) => {
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
  getNftsReportAsPerUserId: async (data,databaseName) => {
    var deferred = Q.defer();
    let getData = await self.createDatabase(databaseName);
    let [assignFactotry,getOrder,assignMetaData, generatedUpdateStatus, factoryByContainerSchema, getNftsArray, assignContainerToOthersData, ipfsverifydata, saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain, saveNftsReportData, ipfsUpdatedVerify,ipfsUpdated,ipfsSchema,productModel] = getData;
    
    
    // saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain

    ipfsUpdatedVerify
      .aggregate([
        {
          $match: {
            userId: mongoose.Types.ObjectId(data.userId),
            fdaId: mongoose.Types.ObjectId(data.fdaId),
          },
        },
        {
          $set: {
            nftBurnByUserId: {
              $convert: {
                input: "$nftBurnByUserId",
                to: "objectId",
                onError: "",
                onNull: "",
              },
            },
            nftSaveUserId: {
              $convert: {
                input: "$nftSaveUserId",
                to: "objectId",
                onError: "",
                onNull: "",
              },
            },
          },
        },
        {
          $lookup: {
            from: "tbl_user",
            localField: "nftBurnByUserId",
            foreignField: "_id",
            as: "nftBurnByUserIdDetails",
          },
        },
        {
          $lookup: {
            from: "tbl_user",
            localField: "nftSaveUserId",
            foreignField: "_id",
            as: "nftSaveUserIdDetails",
          },
        },
        {
          $addFields: {
            customProductId: {
              $toObjectId: "$data.productId",
            },
          },
        },
        {
          $lookup: {
            from: "tbl_products",
            localField: "customProductId",
            foreignField: "_id",
            as: "productDetails",
          },
        },
        {
          $addFields: {
            convertVerifyByUserId: {
              $toObjectId: {
                $first: "$nftVerifyByUserId.verifyByUserId",
              },
            },
          },
        },
        {
          $lookup: {
            from: "tbl_user",
            localField: "convertVerifyByUserId",
            foreignField: "_id",
            as: "nftVerifyByUserIdDetails",
          },
        },
        {
          $lookup: {
            from: "tbl_save_nfts_reports",
            localField: "ipfsHash",
            foreignField: "ipfsHash",
            as: "nftVerifyUserFlagDetails",
          },
        },
        {
          $project: {
            _id: 1,
            userId: 1,
            ipfsHash: 1,
            nftTokenId: 1,
            nftBurnByUserId: 1,
            nftBurnTransactionHash: 1,
            nftSaveUserId: 1,
            nftTransactionHash: 1,
            fdaId: 1,
            data: 1,
            status: 1,
            nftSaveUserIdDate: 1,
            nftBurnByUserIdDate: 1,
            createdDate: 1,
            updateDate: 1,
            nftVerifyByUserIdDate: 1,
            nftVerifyUserFlag: 1,
            userType: 1,
            nftBurnByUserIdDetails: 1,
            nftSaveUserIdDetails: 1,
            customProductId: 1,
            productDetails: 1,
            convertVerifyByUserId: 1,
            nftVerifyByUserIdDetails: 1,
            nftVerifyUserFlagDetails: 1,
            nftVerifyLocation: { $ifNull: ["$nftVerifyLocation", ""] },
            nftBurnLocation: { $ifNull: ["$nftBurnLocation", ""] },
            nftSaveLocation: { $ifNull: ["$nftSaveLocation", ""] },
          },
        },
        {
          $lookup: {
            from: "tbl_user",
            localField: "nftVerifyUserFlagDetails.userId",
            foreignField: "_id",
            as: "userDetails",
          },
        },
      ])
      .exec(async (err, result) => {
        if (err) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        }
        else{
          if(result.length >0){
            var containersPushData = [];
            var palletsPushData = [];
            var mastersCartonsPushData = [];
            var innerCartonsPushData = [];
            var drugsPushData = [];
            result.filter((item) => {
              if (item.data.type == "containers") {
                containersPushData.push(item);
              } else if (item.data.type == "pallets") {
                palletsPushData.push(item);
              } else if (item.data.type == "masterCartons") {
                mastersCartonsPushData.push(item);
              } else if (item.data.type == "innerCartons") {
                innerCartonsPushData.push(item);
              } else {
                drugsPushData.push(item);
              }
            });
        
            if (data.type == "all") {
              var obj = {
                status: 1,
                data: {
                  fdaId: data.fdaId,
                  packagingDetails: result[0].productDetails[0].packagingDetails,
                  newprductDetails:
                    containersPushData.length > 0
                      ? containersPushData[0].productDetails
                      : [],
        
                  containers: {
                    quantity: containersPushData.length,
                    burned: _.filter(containersPushData, { status: 3 }).length,
                    verified: _.filter(containersPushData, { status: 2 }).length,
                    balance: _.filter(containersPushData, { status: 1 }).length,
                    nftsFlag: containersPushData,
                  },
        
                  pallets: {
                    quantity: palletsPushData.length,
                    burned: _.filter(palletsPushData, { status: 3 }).length,
                    verified: _.filter(palletsPushData, { status: 2 }).length,
                    balance: _.filter(palletsPushData, { status: 1 }).length,
                    nftsFlag: palletsPushData,
                  },
        
                  masterCartons: {
                    quantity: mastersCartonsPushData.length,
                    burned: _.filter(mastersCartonsPushData, { status: 3 })
                      .length,
                    verified: _.filter(mastersCartonsPushData, { status: 2 })
                      .length,
                    balance: _.filter(mastersCartonsPushData, { status: 1 })
                      .length,
                    nftsFlag: mastersCartonsPushData,
                  },
        
                  innerCartons: {
                    quantity: innerCartonsPushData.length,
                    burned: _.filter(innerCartonsPushData, { status: 3 }).length,
                    verified: _.filter(innerCartonsPushData, { status: 2 })
                      .length,
                    balance: _.filter(innerCartonsPushData, { status: 1 }).length,
                    nftsFlag: innerCartonsPushData,
                  },
        
                  drugs: {
                    quantity: drugsPushData.length,
                    burned: _.filter(drugsPushData, { status: 3 }).length,
                    verified: _.filter(drugsPushData, { status: 2 }).length,
                    balance: _.filter(drugsPushData, { status: 1 }).length,
                    nftsFlag: drugsPushData,
                  },
                },
              };
            } else if (data.type == "containers") {
              var obj = {
                status: 1,
                data: {
                  newprductDetails:
                    containersPushData.length > 0
                      ? containersPushData[0].productDetails
                      : [],
                  containers: containersPushData,
                },
              };
            } else if (data.type == "pallets") {
              var obj = {
                status: 1,
                data: {
                  newprductDetails:
                    palletsPushData.length > 0
                      ? palletsPushData[0].productDetails
                      : [],
                  pallets: palletsPushData,
                },
              };
            } else if (data.type == "masterCartons") {
              var obj = {
                status: 1,
                data: {
                  newprductDetails:
                    mastersCartonsPushData.length > 0
                      ? mastersCartonsPushData[0].productDetails
                      : [],
                  masterCartons: mastersCartonsPushData,
                },
              };
            } else if (data.type == "innerCartons") {
              var obj = {
                status: 1,
                data: {
                  newprductDetails:
                    innerCartonsPushData.length > 0
                      ? innerCartonsPushData[0].productDetails
                      : [],
                  innerCartons: innerCartonsPushData,
                },
              };
            } else {
              var obj = {
                status: 1,
                data: {
                  newprductDetails:
                    drugsPushData.length > 0
                      ? drugsPushData[0].productDetails
                      : [],
                  drugs: drugsPushData,
                },
              };
            }
            deferred.resolve(obj);
          }else{
            let obj = { status: 1, data: [] };
            deferred.resolve(obj);
          }
        }
      });

    return deferred.promise;
  },
  getCheckAssignContainers: async (data) => {
    var deferred = Q.defer();

    if (data.type == "pallets") {
      var typeMatch = {
        $or: [
          {
            $and: [
              { status: 3 },
              { nftBurnByUserId: data.userId },
              { "data.type": "containers" },
              { fdaId: mongoose.Types.ObjectId(data.fdaId) },
              { userType: data.userType.toString() },
            ],
          },
          {
            $and: [
              { status: 3 },
              { nftBurnByUserId: mongoose.Types.ObjectId(data.userId) },
              { "data.type": "containers" },
              { fdaId: mongoose.Types.ObjectId(data.fdaId) },
              { userType: data.userType.toString() },
            ],
          },
        ],
      };

      var perPalletsCount = "container";
    } else if (data.type == "masterCartons") {
      var typeMatch = {
        $or: [
          {
            $and: [
              { status: 3 },
              { nftBurnByUserId: data.userId },
              { "data.type": "pallets" },
              { fdaId: mongoose.Types.ObjectId(data.fdaId) },
              { userType: data.userType.toString() },
            ],
          },
          {
            $and: [
              { status: 3 },
              { nftBurnByUserId: mongoose.Types.ObjectId(data.userId) },
              { "data.type": "pallets" },
              { fdaId: mongoose.Types.ObjectId(data.fdaId) },
              { userType: data.userType.toString() },
            ],
          },
        ],
      };

      var perPalletsCount = "pallets";
    } else if (data.type == "innerCartons") {
      var typeMatch = {
        $or: [
          {
            $and: [
              { status: 3 },
              { nftBurnByUserId: data.userId },
              { "data.type": "masterCartons" },
              { fdaId: mongoose.Types.ObjectId(data.fdaId) },
              { userType: data.userType.toString() },
            ],
          },
          {
            $and: [
              { status: 3 },
              { nftBurnByUserId: mongoose.Types.ObjectId(data.userId) },
              { "data.type": "masterCartons" },
              { fdaId: mongoose.Types.ObjectId(data.fdaId) },
              { userType: data.userType.toString() },
            ],
          },
        ],
      };

      var perPalletsCount = "masterCartons";
    } else if (data.type == "drugs") {
      var typeMatch = {
        $or: [
          {
            $and: [
              { status: 3 },
              { nftBurnByUserId: data.userId },
              { "data.type": "innerCartons" },
              { fdaId: mongoose.Types.ObjectId(data.fdaId) },
              { userType: data.userType.toString() },
            ],
          },
          {
            $and: [
              { status: 3 },
              { nftBurnByUserId: mongoose.Types.ObjectId(data.userId) },
              { "data.type": "innerCartons" },
              { fdaId: mongoose.Types.ObjectId(data.fdaId) },
              { userType: data.userType.toString() },
            ],
          },
        ],
      };

      var perPalletsCount = "innerCartons";
    }

    ipfsverifydata
      .aggregate([
        {
          $match: typeMatch,
        },
        {
          $addFields: {
            fdalebelId: mongoose.Types.ObjectId(data.fdaId),
          },
        },
        {
          $lookup: {
            from: "tbl_fdalebelmetadata",
            localField: "fdalebelId",
            foreignField: "_id",
            as: "metadata",
          },
        },
        {
          $unwind: {
            path: "$metadata",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 0,
            userId: "$nftBurnByUserId",
            fdaId: 1,
            ipfsHash: 1,
            perPalletsCount: {
              $first:
                "$metadata" +
                "." +
                `${perPalletsCount}` +
                "." +
                "totalContainerNfts",
            },
          },
        },
      ])
      .exec(async (err, result) => {
        if (err) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          if (data.type == "pallets") {
            let ipfsArray = [];
            let filterArray = result.filter((item) => {
              ipfsArray.push(item.ipfsHash);
              return item;
            });

            saveNftsDataInChain
              .find({ ipfsHash: { $in: ipfsArray } })
              .exec(async (err, result) => {
                if (result.length == 0) {
                  await saveNftsDataInChain.create(
                    filterArray,
                    async (err, resultChain) => {
                      let obj = { status: 1, data: resultChain };
                      deferred.resolve(obj);
                    }
                  );
                } else {
                  let obj = { status: 0, data: result };
                  deferred.resolve(obj);
                }
              });
          }

          // else if(data.type == "masterCartons"){

          // let ipfsArray = []
          // let filterArray = result.filter((item) => { ipfsArray.push(item.ipfsHash); return item });

          // saveNftsPalletsInChain.find({"ipfsHash": {"$in":  ipfsArray}}).exec(async (err, result) => {
          // if(result.length == 0){
          // await saveNftsPalletsInChain.create(filterArray, async (err, resultChain) => {
          // let obj = {"status":1,"data":resultChain}
          // deferred.resolve(obj)
          // })
          // } else {

          // let obj = {"status":0,"data":result}
          // deferred.resolve(obj)
          // }
          // })
          // } else if(data.type == "innerCartons"){

          // let ipfsArray = []
          // let filterArray = result.filter((item) => { ipfsArray.push(item.ipfsHash); return item });

          // saveNftsMastersInChain.find({"ipfsHash": {"$in":  ipfsArray}}).exec(async (err, result) => {
          // if(result.length == 0){
          // await saveNftsMastersInChain.create(filterArray, async (err, resultChain) => {
          // let obj = {"status":1,"data":resultChain}
          // deferred.resolve(obj)
          // })
          // } else {

          // let obj = {"status":0,"data":result}
          // deferred.resolve(obj)
          // }
          // })
          // } else if(data.type == "drugs"){

          // let ipfsArray = []
          // let filterArray = result.filter((item) => { ipfsArray.push(item.ipfsHash); return item });

          // saveNftsInnersDataInChain.find({"ipfsHash": {"$in":  ipfsArray}}).exec(async (err, result) => {
          // if(result.length == 0){
          // await saveNftsInnersDataInChain.create(filterArray, async (err, resultChain) => {
          // let obj = {"status":1,"data":resultChain}
          // deferred.resolve(obj)
          // })
          // } else {

          // let obj = {"status":0,"data":result}
          // deferred.resolve(obj)
          // }
          // })
          // }
        }
      });

    return deferred.promise;
  },

  getCount: async (data) => {
    var deferred = Q.defer();

    // saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain

    if (data.type == "pallets") {
      saveNftsPalletsInChain.find(
        {
          $or: [
            { userId: mongoose.Types.ObjectId(data.userId) },
            { containerId: mongoose.Types.ObjectId(data.containerId) },
          ],
        },
        async (err, resultData) => {
          if (err) {
            let obj = { status: 0, data: err };
            deferred.resolve(obj);
          } else {
            let obj = { status: 1, data: resultData.length };
            deferred.resolve(obj);
          }
        }
      );
    } else if (data.type == "masterCartons") {
      saveNftsMastersInChain.find(
        { userId: mongoose.Types.ObjectId(data.userId) },
        async (err, resultData) => {
          if (err) {
            let obj = { status: 0, data: err };
            deferred.resolve(obj);
          } else {
            let obj = { status: 1, data: resultData.length };
            deferred.resolve(obj);
          }
        }
      );
    } else if (data.type == "innerCartons") {
      saveNftsInnersDataInChain.find(
        { userId: mongoose.Types.ObjectId(data.userId) },
        async (err, resultData) => {
          if (err) {
            let obj = { status: 0, data: err };
            deferred.resolve(obj);
          } else {
            let obj = { status: 1, data: resultData.length };
            deferred.resolve(obj);
          }
        }
      );
    } else if (data.type == "drugs") {
      saveNftsDrugsDataInChain.find(
        { userId: mongoose.Types.ObjectId(data.userId) },
        async (err, resultData) => {
          if (err) {
            let obj = { status: 0, data: err };
            deferred.resolve(obj);
          } else {
            let obj = { status: 1, data: resultData.length };
            deferred.resolve(obj);
          }
        }
      );
    }

    return deferred.promise;
  },
  saveNftsDataNew: async (data,databaseName) => {
    var deferred = Q.defer();
    let getData = await self.createDatabase(databaseName);
    let [assignFactotry,getOrder,assignMetaData, generatedUpdateStatus, factoryByContainerSchema, getNftsArray, assignContainerToOthersData, ipfsverifydata, saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain, saveNftsReportData, ipfsUpdatedVerify,ipfsUpdated,ipfsSchema,productModel] = getData;
        
    // packagingDetails =  ["container", "pallets", "masterCartons", "innerCartons", "drugs"]
    // saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain

    //++++++++++++++++++++++++++
    let packagingDetails = data.packagingDetails;
    let currentBox = data.type;
    let previousBox = packagingDetails.indexOf(data.type) - 1;
    let currentSaveVerifyBox;
    let saveVerifyBox;
    let labelCount;

    
    if (packagingDetails.length > 0) {
      if (currentBox == "pallets") {
        currentSaveVerifyBox = saveNftsPalletsInChain;
      } else if (currentBox == "masterCartons") {
        currentSaveVerifyBox = saveNftsMastersInChain;
      } else if (currentBox == "innerCartons") {
        currentSaveVerifyBox = saveNftsInnersDataInChain;
      } else if (currentBox == "product") {
        currentSaveVerifyBox = saveNftsDrugsDataInChain;
      }

      if (packagingDetails[previousBox] == "containers") {
        saveVerifyBox = saveNftsDataInChain;
      } else if (packagingDetails[previousBox] == "pallets") {
        saveVerifyBox = saveNftsPalletsInChain;
      } else if (packagingDetails[previousBox] == "masterCartons") {
        saveVerifyBox = saveNftsMastersInChain;
      } else if (packagingDetails[previousBox] == "innerCartons") {
        saveVerifyBox = saveNftsInnersDataInChain;
      } else if (packagingDetails[previousBox] == "product") {
        saveVerifyBox = saveNftsDrugsDataInChain;
      }
      
      saveVerifyBox.aggregate([
          {
            $match: {
              $or: [
                { nftBurnByUserId: mongoose.Types.ObjectId(data.userId) },
                { nftBurnByUserId: data.userId },
              ],
              fdaId: mongoose.Types.ObjectId(data.fdaId),
              userType: data.userType.toString(),
            },
          },
        ])
        .exec(async (err, result) => {
          if (err) {
            let obj = { status: 0, data: err };
            deferred.resolve(obj);
          }
           else {

            console.log(result, data, saveVerifyBox, currentSaveVerifyBox, packagingDetails, previousBox, currentBox, "currentBoxcurrentBoxcurrentBox")
            if (result.length == 0) {
              let obj = { status: 4, data: {} };
              deferred.resolve(obj);
            } else {

              // console.log(packagingDetails,currentBox,previousBox,currentSaveVerifyBox,saveVerifyBox,labelCount)
             
              for (let i = 0; i < result.length; i++) {

                if (result[i].ipfsCount < result[i].data.size) {
                  ipfsUpdated
                    .findOneAndUpdate(
                      { ipfsHash: data.ipfsHash },
                      {
                        $set: {
                          nftSaveUserId: mongoose.Types.ObjectId(data.userId),
                          userType: data.userType,
                          nftSaveUserIdDate: new Date(),
                          updateDate: new Date(),
                          nftSaveLocation: data.nftSaveLocation,
                        },
                      },
                      { new: true, upsert: true }
                    )
                    .exec();

                   

                  saveVerifyBox
                    .findOneAndUpdate(
                      { ipfsHash: result[i].ipfsHash },
                      { $inc: { ipfsCount: 1 } }
                    )
                    .exec();
                   currentSaveVerifyBox.findOne(
                    { ipfsHash: data.ipfsHash },
                    async (err, verifyData) => {
                      // if(verifyData == null){

                      ipfsUpdatedVerify.findOne(
                        { ipfsHash: data.ipfsHash },
                        async (err, newData) => {
                          if (err) {
                            let obj = { status: 0, data: err };
                            deferred.resolve(obj);
                          } else {

                            await currentSaveVerifyBox.create(
                              {
                                parentIpfs: result[i].ipfsHash,
                                userId: newData.userId,
                                ipfsHash: newData.ipfsHash,
                                nftTokenId: newData.nftTokenId,
                                nftTransactionHash: newData.nftTransactionHash,
                                fdaId: newData.fdaId,
                                data: newData.data,
                                nftBurnByUserId: newData.nftBurnByUserId,
                                nftVerifyByUserId: newData.nftVerifyByUserId,
                                nftSaveUserId: newData.nftSaveUserId,
                                ipfsCount: 0,
                                userType: data.userType,
                                status: 1,
                              },
                              async (err, resultChain) => {
                                let obj = { status: 1, data: resultChain };
                                self.getCompanyIdIpfs({
                                  userId: mongoose.Types.ObjectId(
                                    newData.userId
                                  ),
                                  filterStatus: 2
                                },databaseName);
                                deferred.resolve(obj);
                              }
                            );
                          }
                        }
                      );

                      // } else {
                      // 	let obj = {"status":2,"data":{}}
                      // 	deferred.resolve(obj)
                      // }
                    }
                  );

                  break;
                }

                if (i == result.length - 1) {
                  let obj = { status: 3, data: {} };
                  deferred.resolve(obj);
                }
              }
            }
          }
        });
    } else {     
      if (currentBox == "containers") {
        currentSaveVerifyBox = saveNftsDataInChain;
      } else if (currentBox == "pallets") {
        currentSaveVerifyBox = saveNftsPalletsInChain;
      } else if (currentBox == "masterCartons") {
        currentSaveVerifyBox = saveNftsMastersInChain;
      } else if (currentBox == "innerCartons") {
        currentSaveVerifyBox = saveNftsInnersDataInChain;
      } else if (currentBox == "product") {
        currentSaveVerifyBox = saveNftsDrugsDataInChain;
      }

      currentSaveVerifyBox.findOne(
        { ipfsHash: data.ipfsHash },
        async (err, verifyData) => {
          // if(verifyData == null){

          ipfsUpdatedVerify.findOne(
            { ipfsHash: data.ipfsHash },
            async (err, newData) => {
              if (err) {
                let obj = { status: 0, data: err };
                deferred.resolve(obj);
              } else {
                await currentSaveVerifyBox.create(
                  {
                    parentIpfs: result[i].ipfsHash,
                    userId: newData.userId,
                    ipfsHash: newData.ipfsHash,
                    nftTokenId: newData.nftTokenId,
                    nftTransactionHash: newData.nftTransactionHash,
                    fdaId: newData.fdaId,
                    data: newData.data,
                    nftBurnByUserId: newData.nftBurnByUserId,
                    nftVerifyByUserId: newData.nftVerifyByUserId,
                    nftSaveUserId: newData.nftSaveUserId,
                    masterCartonsCount: 0,
                    userType: data.userType,
                    status: 1,
                  },
                  async (err, resultChain) => {
                    let obj = { status: 1, data: resultChain };
                    self.getCompanyIdIpfs({
                      userId: mongoose.Types.ObjectId(
                        newData.userId
                      ),
                      filterStatus: 2
                    },databaseName);
                    deferred.resolve(obj);
                  }
                );
              }
            }
          );

          // } else {
          // 	let obj = {"status":2,"data":{}}
          // 	deferred.resolve(obj)
          // }
        }
      );
    }

    //++++++++++++++++++++++++++

    return deferred.promise;
  },
  saveNftsData: async (data) => {
    var deferred = Q.defer();
    
    // packagingDetails =  ["container", "pallets", "masterCartons", "innerCartons", "drugs"]

    // let packagingDetails = ["container", "pallets", "innerCartons", "drugs"];

    if (data.type == "pallets") {
      // saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain

      //++++++++++++++++++++++++++

      saveNftsDataInChain
        .aggregate([
          {
            $match: {
              $or: [
                { nftBurnByUserId: mongoose.Types.ObjectId(data.userId) },
                { nftBurnByUserId: data.userId },
              ],
              fdaId: mongoose.Types.ObjectId(data.fdaId),
              userType: data.userType.toString(),
            },
          },
        ])
        .exec(async (err, result) => {
          if (err) {
            let obj = { status: 0, data: err };
            deferred.resolve(obj);
          } else {
            if (result.length == 0) {
              let obj = { status: 4, data: {} };
              deferred.resolve(obj);
            } else {
              for (let i = 0; i < result.length; i++) {
                if (result[i].palletsCount < result[i].data.size) {
                  ipfsUpdated
                    .findOneAndUpdate(
                      { ipfsHash: data.ipfsHash },
                      {
                        $set: {
                          nftSaveUserId: mongoose.Types.ObjectId(data.userId),
                          userType: data.userType,
                          nftSaveUserIdDate: new Date(),
                          updateDate: new Date(),
                          nftSaveLocation: data.nftSaveLocation,
                        },
                      },
                      { new: true, upsert: true }
                    )
                    .exec();

                  saveNftsDataInChain
                    .findOneAndUpdate(
                      { ipfsHash: result[i].ipfsHash },
                      { $inc: { palletsCount: 1 } }
                    )
                    .exec();
                  saveNftsPalletsInChain.findOne(
                    { ipfsHash: data.ipfsHash },
                    async (err, verifyData) => {
                      // if(verifyData == null){

                      ipfsUpdatedVerify.findOne(
                        { ipfsHash: data.ipfsHash },
                        async (err, newData) => {
                          if (err) {
                            let obj = { status: 0, data: err };
                            deferred.resolve(obj);
                          } else {
                            await saveNftsPalletsInChain.create(
                              {
                                containerIpfs: result[i].ipfsHash,
                                userId: newData.userId,
                                ipfsHash: newData.ipfsHash,
                                nftTokenId: newData.nftTokenId,
                                nftTransactionHash: newData.nftTransactionHash,
                                fdaId: newData.fdaId,
                                data: newData.data,
                                nftBurnByUserId: newData.nftBurnByUserId,
                                nftVerifyByUserId: newData.nftVerifyByUserId,
                                nftSaveUserId: newData.nftSaveUserId,
                                masterCartonsCount: 0,
                                userType: data.userType,
                                status: 1,
                              },
                              async (err, resultChain) => {
                                let obj = { status: 1, data: resultChain };
                                self.getCompanyIdIpfs({
                                  userId: mongoose.Types.ObjectId(
                                    newData.userId
                                  ),
                                  filterStatus: 2
                                });
                                deferred.resolve(obj);
                              }
                            );
                          }
                        }
                      );

                      // } else {
                      // 	let obj = {"status":2,"data":{}}
                      // 	deferred.resolve(obj)
                      // }
                    }
                  );

                  break;
                }

                if (i == result.length - 1) {
                  let obj = { status: 3, data: {} };
                  deferred.resolve(obj);
                }
              }
            }
          }
        });

      //++++++++++++++++++++++++++
    } else if (data.type == "masterCartons") {
      // saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain

      //++++++++++++++++++++++++++

      saveNftsPalletsInChain
        .aggregate([
          {
            $match: {
              $or: [
                { nftBurnByUserId: mongoose.Types.ObjectId(data.userId) },
                { nftBurnByUserId: data.userId },
              ],
              fdaId: mongoose.Types.ObjectId(data.fdaId),
              userType: data.userType.toString(),
            },
          },
        ])
        .exec(async (err, result) => {
          if (err) {
            let obj = { status: 0, data: err };
            deferred.resolve(obj);
          } else {
            if (result.length == 0) {
              let obj = { status: 4, data: {} };
              deferred.resolve(obj);
            } else {
              for (let i = 0; i < result.length; i++) {
                if (result[i].masterCartonsCount < result[i].data.size) {
                  ipfsUpdated
                    .findOneAndUpdate(
                      { ipfsHash: data.ipfsHash },
                      {
                        $set: {
                          nftSaveUserId: mongoose.Types.ObjectId(data.userId),
                          userType: data.userType,
                          nftSaveUserIdDate: new Date(),
                          updateDate: new Date(),
                          nftSaveLocation: data.nftSaveLocation,
                        },
                      },
                      { new: true, upsert: true }
                    )
                    .exec();

                  saveNftsPalletsInChain
                    .findOneAndUpdate(
                      { ipfsHash: result[i].ipfsHash },
                      { $inc: { masterCartonsCount: 1 } }
                    )
                    .exec();
                  saveNftsMastersInChain.findOne(
                    { ipfsHash: data.ipfsHash },
                    async (err, verifyData) => {
                      // if(verifyData == null){

                      ipfsUpdatedVerify.findOne(
                        { ipfsHash: data.ipfsHash },
                        async (err, newData) => {
                          if (err) {
                            let obj = { status: 0, data: err };
                            deferred.resolve(obj);
                          } else {
                            await saveNftsMastersInChain.create(
                              {
                                palletIpfs: result[i].ipfsHash,
                                userId: newData.userId,
                                ipfsHash: newData.ipfsHash,
                                nftTokenId: newData.nftTokenId,
                                nftTransactionHash: newData.nftTransactionHash,
                                fdaId: newData.fdaId,
                                data: newData.data,
                                nftBurnByUserId: newData.nftBurnByUserId,
                                nftVerifyByUserId: newData.nftVerifyByUserId,
                                nftSaveUserId: newData.nftSaveUserId,
                                innerCartonsCount: 0,
                                userType: data.userType,
                                status: 1,
                              },
                              async (err, resultChain) => {
                                let obj = { status: 1, data: resultChain };
                                self.getCompanyIdIpfs({
                                  userId: mongoose.Types.ObjectId(
                                    newData.userId
                                  ),
                                  filterStatus: 2
                                });
                                deferred.resolve(obj);
                              }
                            );
                          }
                        }
                      );

                      // } else {
                      // let obj = {"status":2,"data":{}}
                      // deferred.resolve(obj)
                      // }
                    }
                  );

                  break;
                }

                if (i == result.length - 1) {
                  let obj = { status: 3, data: {} };
                  deferred.resolve(obj);
                }
              }
            }
          }
        });

      //++++++++++++++++++++++++++
    } else if (data.type == "innerCartons") {
      // saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain

      //++++++++++++++++++++++++++

      saveNftsMastersInChain
        .aggregate([
          {
            $match: {
              $or: [
                { nftBurnByUserId: mongoose.Types.ObjectId(data.userId) },
                { nftBurnByUserId: data.userId },
              ],
              fdaId: mongoose.Types.ObjectId(data.fdaId),
              userType: data.userType.toString(),
            },
          },
        ])
        .exec(async (err, result) => {
          if (err) {
            let obj = { status: 0, data: err };
            deferred.resolve(obj);
          } else {
            if (result.length == 0) {
              let obj = { status: 4, data: {} };
              deferred.resolve(obj);
            } else {
              for (let i = 0; i < result.length; i++) {
                if (result[i].innerCartonsCount < result[i].data.size) {
                  ipfsUpdated
                    .findOneAndUpdate(
                      { ipfsHash: data.ipfsHash },
                      {
                        $set: {
                          nftSaveUserId: mongoose.Types.ObjectId(data.userId),
                          userType: data.userType,
                          nftSaveUserIdDate: new Date(),
                          updateDate: new Date(),
                          nftSaveLocation: data.nftSaveLocation,
                        },
                      },
                      { new: true, upsert: true }
                    )
                    .exec();

                  saveNftsMastersInChain
                    .findOneAndUpdate(
                      { ipfsHash: result[i].ipfsHash },
                      { $inc: { innerCartonsCount: 1 } }
                    )
                    .exec();
                  saveNftsInnersDataInChain.findOne(
                    { ipfsHash: data.ipfsHash },
                    async (err, verifyData) => {
                      // if(verifyData == null){

                      ipfsUpdatedVerify.findOne(
                        { ipfsHash: data.ipfsHash },
                        async (err, newData) => {
                          if (err) {
                            let obj = { status: 0, data: err };
                            deferred.resolve(obj);
                          } else {
                            await saveNftsInnersDataInChain.create(
                              {
                                masterCartoonsIpfs: result[i].ipfsHash,
                                userId: newData.userId,
                                ipfsHash: newData.ipfsHash,
                                nftTokenId: newData.nftTokenId,
                                nftTransactionHash: newData.nftTransactionHash,
                                fdaId: newData.fdaId,
                                data: newData.data,
                                nftBurnByUserId: newData.nftBurnByUserId,
                                nftVerifyByUserId: newData.nftVerifyByUserId,
                                nftSaveUserId: newData.nftSaveUserId,
                                drugsCount: 0,
                                userType: data.userType,
                                status: 1,
                              },
                              async (err, resultChain) => {
                                let obj = { status: 1, data: resultChain };
                                self.getCompanyIdIpfs({
                                  userId: mongoose.Types.ObjectId(
                                    newData.userId
                                  ),
                                  filterStatus: 2
                                });
                                deferred.resolve(obj);
                              }
                            );
                          }
                        }
                      );

                      // } else {
                      // let obj = {"status":2,"data":{}}
                      // deferred.resolve(obj)
                      // }
                    }
                  );

                  break;
                }

                if (i == result.length - 1) {
                  let obj = { status: 3, data: {} };
                  deferred.resolve(obj);
                }
              }
            }
          }
        });

      //++++++++++++++++++++++++++
    } else if (data.type == "product") {
      // saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain

      //++++++++++++++++++++++++++

      saveNftsInnersDataInChain
        .aggregate([
          {
            $match: {
              $or: [
                { nftBurnByUserId: mongoose.Types.ObjectId(data.userId) },
                { nftBurnByUserId: data.userId },
              ],
              fdaId: mongoose.Types.ObjectId(data.fdaId),
              userType: data.userType.toString(),
            },
          },
        ])
        .exec(async (err, result) => {      
          if (err) {
            let obj = { status: 0, data: err };
            deferred.resolve(obj);
          } else {
            if (result.length == 0) {
              let obj = { status: 4, data: {} };
              deferred.resolve(obj);
            } else {
              for (let i = 0; i < result.length; i++) {
                if (result[i].drugsCount < result[i].data.size) {
                  ipfsUpdated
                    .findOneAndUpdate(
                      { ipfsHash: data.ipfsHash },
                      {
                        $set: {
                          nftSaveUserId: mongoose.Types.ObjectId(data.userId),
                          userType: data.userType,
                          nftSaveUserIdDate: new Date(),
                          updateDate: new Date(),
                          nftSaveLocation: data.nftSaveLocation,
                        },
                      },
                      { new: true, upsert: true }
                    )
                    .exec();

                  saveNftsInnersDataInChain
                    .findOneAndUpdate(
                      { ipfsHash: result[i].ipfsHash },
                      { $inc: { drugsCount: 1 } }
                    )
                    .exec();
                  saveNftsDrugsDataInChain.findOne(
                    { ipfsHash: data.ipfsHash },
                    async (err, verifyData) => {
                      // if(verifyData == null){

                      ipfsUpdatedVerify.findOne(
                        { ipfsHash: data.ipfsHash },
                        async (err, newData) => {
                          if (err) {
                            let obj = { status: 0, data: err };
                            deferred.resolve(obj);
                          } else {
                            await saveNftsDrugsDataInChain.create(
                              {
                                innerCartonsIpfs: result[i].ipfsHash,
                                userId: newData.userId,
                                ipfsHash: newData.ipfsHash,
                                nftTokenId: newData.nftTokenId,
                                nftTransactionHash: newData.nftTransactionHash,
                                fdaId: newData.fdaId,
                                data: newData.data,
                                nftBurnByUserId: newData.nftBurnByUserId,
                                nftVerifyByUserId: newData.nftVerifyByUserId,
                                nftSaveUserId: newData.nftSaveUserId,
                                userType: newData.userType,
                                status: 1,
                              },
                              async (err, resultChain) => {
                                let obj = { status: 1, data: resultChain };
                                // self.getCompanyIdIpfs({
                                //   userId: mongoose.Types.ObjectId(
                                //     newData.userId
                                //   ),
                                //   filterStatus: 2,
                                // });
                                self.getCompanyIdIpfs({
                                  userId: mongoose.Types.ObjectId(newData.userId),
                                  filterStatus: 2
                                });
                                deferred.resolve(obj);
                              }
                            );
                          }
                        }
                      );

                      // } else {
                      // let obj = {"status":2,"data":{}}
                      // deferred.resolve(obj)
                      // }
                    }
                  );

                  break;
                }

                if (i == result.length - 1) {
                  let obj = { status: 3, data: {} };
                  deferred.resolve(obj);
                }
              }
            }
          }
        });

      //++++++++++++++++++++++++++
    }

    return deferred.promise;
  },
  verifyHashUserNftsData: async (data) => {
    var deferred = Q.defer();
    
    ipfsverifydata
      .aggregate([
        {
          $match: {
            $or: [
              {
                $and: [
                  { status: parseInt(data.status) },
                  { userId: data.userId },
                  { userType: data.userType.toString() },
                ],
              },
              {
                $and: [
                  { status: parseInt(data.status) },
                  { userId: mongoose.Types.ObjectId(data.userId) },
                  { userType: data.userType.toString() },
                ],
              },
            ],
          },
        },
      ])
      .exec(async (err, result) => {
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
  viewAssignDataByWarehouseAndDistributerId: async (data,databaseName) => {
    var deferred = Q.defer();
    let getData = await self.createDatabase(databaseName);
    let [assignFactotry,getOrder,assignMetaData, generatedUpdateStatus, factoryByContainerSchema, getNftsArray, assignContainerToOthersData, ipfsverifydata, saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain, saveNftsReportData, ipfsUpdatedVerify,ipfsUpdated,ipfsSchema,productModel] = getData; 

    assignContainerToOthersData
      .aggregate([
        {
          $match: {
            status: 1,
            assignContainerToOthersIds: {
              $elemMatch: {
                $or: [
                  {
                    $and: [
                      { factoryUserId: data.factoryUserId },
                      { userType: data.userType },
                    ],
                  },
                  {
                    $and: [
                      {
                        factoryUserId: mongoose.Types.ObjectId(
                          data.factoryUserId
                        ),
                      },
                      { userType: data.userType },
                    ],
                  },
                ],
              },
            },
          },
        },
        {
          $lookup: {
            from: "tbl_products",
            localField: "productId",
            foreignField: "_id",
            as: "productDetails",
          },
        },
        { $unwind: "$productDetails" },
        {
          $project: {
            _id: 1,
            manufacturerId:1,
            assignContainerStatus: 1,
            productDetails: 1,
            fdalebelId: 1,
            userId: 1,
            productId: 1,
            createdDate: 1,
            assignContainerToOthersIds: {
              $filter: {
                input: "$assignContainerToOthersIds",
                as: "assignContainerToOthersIdss",
                cond: {
                  $and: [
                    {
                      $eq: [
                        "$$assignContainerToOthersIdss.factoryUserId",
                        data.factoryUserId,
                      ],
                    },
                    {
                      $eq: [
                        "$$assignContainerToOthersIdss.userType",
                        data.userType,
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          $sort: {
            _id: -1,
          },
        },
      ])
      .exec(async (err, result) => {
        if (err) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          var filterArray = []
          await Promise.all(
               result.map(async (val,ind) => {
                    let mapData = await User.findOne({"_id":mongoose.Types.ObjectId(val.manufacturerId)},{"_id":0,"firstName":1,"lastName":1}).exec();
                    val.firstName = mapData.firstName
                    val.lastName = mapData.lastName
                    filterArray.push(val)
               })
          );
          let obj = { status: 1, data: filterArray };
          deferred.resolve(obj);
        }
      });

    return deferred.promise;
  },
  viewAssignDataByManufacturerId: async (data,databaseName) => {
    var deferred = Q.defer();
    let getData = await self.createDatabase(databaseName);
    let [assignFactotry,getOrder,assignMetaData, generatedUpdateStatus, factoryByContainerSchema, getNftsArray, assignContainerToOthersData, ipfsverifydata, saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain, saveNftsReportData, ipfsUpdatedVerify,ipfsUpdated,ipfsSchema,productModel] = getData;
    

    assignContainerToOthersData
      .aggregate([
        {
          $match: {
            status: 1,
            manufacturerId: mongoose.Types.ObjectId(data.manufacturerId),
            userType: data.userType,
          },
        },
        {
          $lookup: {
            from: "tbl_products",
            localField: "productId",
            foreignField: "_id",
            as: "productDetails",
          },
        },
        { $unwind: "$productDetails" },
        {
          $lookup: {
            from: "tbl_user",
            localField: "userId",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        { $unwind: "$userDetails" },
        {
          $project: {
            _id: 1,
            firstName: "$userDetails.firstName",
            lastName: "$userDetails.lastName",
            assignContainerStatus: 1,
            productDetails: 1,
            fdalebelId: 1,
            userId: 1,
            productId: 1,
            createdDate: 1,
            assignContainerToOthersIds: 1,
          },
        },
      ])
      .exec(async (err, result) => {
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
  saveNftsContainersAfterBurnData: async (data,databaseName) => {
    var deferred = Q.defer();
    let getData = await self.createDatabase(databaseName);
    let [assignFactotry,getOrder,assignMetaData, generatedUpdateStatus, factoryByContainerSchema, getNftsArray, assignContainerToOthersData, ipfsverifydata, saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain, saveNftsReportData, ipfsUpdatedVerify,ipfsUpdated,ipfsSchema,productModel] = getData;
    
    
    let packagingDetails = data.packagingDetails;
    ipfsUpdatedVerify
      .aggregate([
        {
          $match: {
            ipfsHash: data.ipfsHash,
          },
        },
        {
          $project: {
            _id: 0,
            userId: 1,
            ipfsHash: 1,
            nftTokenId: 1,
            nftTransactionHash: 1,
            fdaId: 1,
            data: 1,
            nftBurnByUserId: 1,
            nftVerifyByUserId: 1,
            userType: 1,
            nftSaveUserId: 1,
            ipfsCount: "$data.size"
          },
        },
      ])
      .exec(async (err, result) => {
        if (err) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {


          let updatedResult = result.filter((item) => {
              if(item.data.type == packagingDetails[0]){
                item.ipfsCount = 0
              }
              return item;
          });

          // result[0].ipfsCount = result[0].data.size
          let ipfsArray = [];
          let checkIpfsIds = [];
          let sizeIpfsIds = [];
          let filterArray = result.filter((item) => {
            ipfsArray.push(item.ipfsHash);
            checkIpfsIds.push(item.data.type);
            sizeIpfsIds.push(item.data.type);
            return item;
          });
          let currentBox = checkIpfsIds[0];
          let currentSaveVerifyBox;
          let saveVerifyBox;
          let labelCount;

          if (currentBox == "containers") {
            currentSaveVerifyBox = saveNftsDataInChain;
          } else if (currentBox == "pallets") {
            currentSaveVerifyBox = saveNftsPalletsInChain;
          } else if (currentBox == "masterCartons") {
            currentSaveVerifyBox = saveNftsMastersInChain;
          } else if (currentBox == "innerCartons") {
            currentSaveVerifyBox = saveNftsInnersDataInChain;
          } else if (currentBox == "product") {
            currentSaveVerifyBox = saveNftsDrugsDataInChain;
          }

          currentSaveVerifyBox.find({ ipfsHash: { $in: ipfsArray } }).exec(async (err, resultNew) => {
            
              if (resultNew.length == 0) {


                    await currentSaveVerifyBox.create(updatedResult);
                    await currentSaveVerifyBox.findOneAndUpdate({ipfsHash: data.ipfsHash },
                        {
                          $set: {
                            nftBurnByUserId: result[0].nftBurnByUserId,
                            userType: data.userType,
                            nftSaveUserId: result[0].nftSaveUserId,
                            nftVerifyByUserId: result[0].nftVerifyByUserId,
                            fdaId: result[0].fdaId,
                            data: result[0].data,
                            nftTokenId: result[0].nftTokenId,
                            nftTransactionHash: result[0].nftTransactionHash
                          },
                        },
                        { new: true, upsert: true }
                      )
                      .exec();
                    let obj = { status: 1, data: resultNew };
                    deferred.resolve(obj);

              } else {

                await currentSaveVerifyBox.findOneAndUpdate({ipfsHash: data.ipfsHash },
                  {
                    $set: {
                      nftBurnByUserId: result[0].nftBurnByUserId,
                      userType: data.userType,
                      nftSaveUserId: result[0].nftSaveUserId,
                      nftVerifyByUserId: result[0].nftVerifyByUserId,
                      fdaId: result[0].fdaId,
                      data: result[0].data,
                      nftTokenId: result[0].nftTokenId,
                      nftTransactionHash: result[0].nftTransactionHash
                    },
                  },
                  { new: true, upsert: true }
                )
                .exec();

                let obj = { status: 0, data: result };
                deferred.resolve(obj);

              }
            });

          // if(checkIpfsIds[0] == 'containers'){

          // saveNftsDataInChain.find({"ipfsHash": {"$in":  ipfsArray}}).exec(async (err, result) => {
          // 	if(result.length == 0){
          // 			await saveNftsDataInChain.create(filterArray, async (err, resultChain) => {
          // 				let obj = {"status":1,"data":resultChain}
          // 				deferred.resolve(obj)
          // 			})
          // 	} else {
          // 		let obj = {"status":0,"data":result}
          // 		deferred.resolve(obj)
          // 	}
          // })

          // } else if(checkIpfsIds[0] == 'pallets'){

          // 	saveNftsPalletsInChain.findOneAndUpdate({"ipfsHash":data.ipfsHash},{ "$set": { "nftBurnByUserId": data.nftBurnByUserId, "userType": data.userType}},{new:true, upsert:true}).exec(async (err, result) => {
          // 		let obj = {"status":0,"data":result}
          // 		deferred.resolve(obj)
          // 	})

          // } else if(checkIpfsIds[0] == 'masterCartons'){

          // 	saveNftsMastersInChain.findOneAndUpdate({"ipfsHash":data.ipfsHash},{ "$set": { "nftBurnByUserId": data.nftBurnByUserId, "userType": data.userType}},{new:true, upsert:true}).exec(async (err, result) => {
          // 		let obj = {"status":0,"data":result}
          // 		deferred.resolve(obj)
          // 	})

          // } else if(checkIpfsIds[0] == 'innerCartons'){

          // 	saveNftsInnersDataInChain.findOneAndUpdate({"ipfsHash":data.ipfsHash},{ "$set": { "nftBurnByUserId": data.nftBurnByUserId, "userType": data.userType}},{new:true, upsert:true}).exec(async (err, result) => {
          // 		let obj = {"status":0,"data":result}
          // 		deferred.resolve(obj)
          // 	})

          // } else {

          // 	saveNftsDrugsDataInChain.findOneAndUpdate({"ipfsHash":data.ipfsHash},{ "$set": { "nftBurnByUserId": data.nftBurnByUserId, "userType": data.userType}},{new:true, upsert:true}).exec(async (err, result) => {
          // 		let obj = {"status":0,"data":result}
          // 		deferred.resolve(obj)
          // 	})
          // }
        }
      });
    return deferred.promise;
  },
  hashBurnByUserId: async (data,databaseName) => {
    var deferred = Q.defer();

    let getData = await self.createDatabase(databaseName);
    let [assignFactotry,getOrder,assignMetaData, generatedUpdateStatus, factoryByContainerSchema, getNftsArray, assignContainerToOthersData, ipfsverifydata, saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain, saveNftsReportData, ipfsUpdatedVerify,ipfsUpdated,ipfsSchema,productModel] = getData;

    //	IPFS Type :2- Verify, 3- Burned
    //	IPFS Update Status : 1 - genrated, 2- Verify, 3- Burned

    // let contract = new web3.eth.Contract(
    //   contractABI,
    //   config.contractAddress
    // );
    // const dataNew = contract.methods.burn(data.nftTokenId).encodeABI();
    // let txCount;
    // try {
    //   txCount = await web3.eth.getTransactionCount(config.accountAddress);
    // } catch (error) {
    //   console.log(error);
    // }
    
    // const chainId = await web3.eth.net.getId();
    // const customChainParams = {
    //   name: "matic-mumbai",
    //   chainId: chainId,
    // };
    
    // const common = Common.default.forCustomChain(
    //   "goerli",
    //   customChainParams,
    //   "byzantium"
    // );
    
    // let gasPrice = await web3.eth.getGasPrice();
    
    // const txObject = {
    //   nonce: web3.utils.toHex(txCount),
    //   gasLimit: web3.utils.toHex(800000),
    //   gasPrice: web3.utils.toHex(
    //   web3.utils.toWei(String(parseInt(gasPrice * 1.1)), "wei")
    //   ),
    //   from: config.accountAddress,
    //   to: config.contractAddress,
    //   data: dataNew,
    // };
    // const tx = new Tx(txObject, { common });
    // tx.sign(privateKey1);
    // const seraializedTransaction = tx.serialize();
    
    // const _rawData = "0x" + seraializedTransaction.toString("hex");
    try {
    //   let createReceipt = await web3.eth.sendSignedTransaction(_rawData);
    //   if (createReceipt?.transactionHash) {

          let userDetails  =  await User.findOne({email: data.nftBurnByUserEmailId}).exec();

          // console.log(userDetails,"userDetailsuserDetailsuserDetails")
          // return false;

         
          ipfsUpdatedVerify
          .findOneAndUpdate(
            { ipfsHash: data.ipfsHash },
            {
              $set: {
                status: 3,
                nftBurnTransactionHash: "craevffdbvby97ihu43jgvhuckjdsvhsdgviygsa",
                nftBurnByUserId: userDetails._id,
                userType: data.userType,
                nftBurnByUserIdDate: new Date(),
                updateDate: new Date(),
                nftBurnLocation: data.nftBurnLocation,
              },
            },
            { new: true, upsert: true }
          )
          .exec(async (err, result) => {
            if (err) {
              let obj = { status: 0, data: err };
              deferred.resolve(obj);
            } else {

              // self.getCompanyIdIpfs({
              //   userId: mongoose.Types.ObjectId(result.userId),
              //   filterStatus: 3,
              // });
              await self.getCompanyIdIpfs({
                userId: mongoose.Types.ObjectId(result.userId),
                filterStatus: 3
              },databaseName);
              const validation = await Promise.all([
                self.saveNftsContainersAfterBurnData(data,databaseName),
              ]);

              let obj = { status: 1, data: result };
              deferred.resolve(obj);
            }
          });
       
      // }
    } catch (error) {
      let obj = { status: 0, data: "Error" };
      deferred.resolve(obj);
    }    
    return deferred.promise;
  },

  assignNftsByUserId: async (data,databaseName) => {
    var deferred = Q.defer();
    let getData = await self.createDatabase(databaseName);
    let [assignFactotry,getOrder,assignMetaData, generatedUpdateStatus, factoryByContainerSchema, getNftsArray, assignContainerToOthersData, ipfsverifydata, saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain, saveNftsReportData, ipfsUpdatedVerify,ipfsUpdated,ipfsSchema,productModel] = getData;    
    
    //	IPFS Type :2- Verify, 3- Burned
    //	IPFS Update Status : 1 - genrated, 2- Verify, 3- Burned

    ipfsverifydata
      .findOneAndUpdate(
        {
          ipfsHash: data.ipfsHash,
          nftVerifyByUserId: {
            $elemMatch: { verifyByUserId: data.verifyByUserId },
          },
        },
        {
          $set: {
            "nftVerifyByUserId.$.assignEmailId": data.assignEmailId,
            status: 1,
            "nftVerifyByUserId.$.assignUserType": data.assignUserType,
          },
        },
        { new: true, upsert: true }
      )
      .exec(async (err, result) => {
        if (err) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          if (result == null) {
            let obj = { status: 2, data: result };
            deferred.resolve(obj);
          } else {
            let obj = { status: 1, data: result };
            deferred.resolve(obj);
          }
        }
      });
    return deferred.promise;
  },
  verifyHashStatus: async (data,databaseName) => {
    // saveNftsReportData - collection
    var deferred = Q.defer();
    let getData = await self.createDatabase(databaseName);
    let [assignFactotry,getOrder,assignMetaData, generatedUpdateStatus, factoryByContainerSchema, getNftsArray, assignContainerToOthersData, ipfsverifydata, saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain, saveNftsReportData, ipfsUpdatedVerify,ipfsUpdated,ipfsSchema,productModel] = getData;
    
    //	IPFS Type :2- Verify, 3- Burned
    //	IPFS Update Status : 1 - genrated, 2- Verify, 3- Burned
    let ipfsHash = data.ipfsHash;
    data.status = 2;
    delete data.ipfsHash;
    let packagingDetails = data.packagingDetails;
    let currentBox = data.boxType;
    let previousBox = packagingDetails.indexOf(data.type) - 1;
    let currentEleMatch = "nftData." + packagingDetails[previousBox];
    let currentSaveVerifyBox;
    let saveVerifyBox;
    let labelCount;

    if (data.boxType == "containers") {
      assignContainerToOthersData.find(
        {
          assignContainerToOthersIds: {
            $elemMatch: {
              "nftData.containers": {
                $elemMatch: {
                  ipfsHash: ipfsHash,
                },
              },
              // factoryUserId: data.nftVerifyByUserId[0].verifyByUserId,
              // userType: data.userType,
            },
          },
        },
        async (err, result) => {
          if (err) {
            let obj = { status: 0, data: err };
            deferred.resolve(obj);
          } else {
            if (result.length > 0) {
              // Start old One
              let updateData = {
                $set: {
                  status: 2,
                  nftVerifyByUserId: data.nftVerifyByUserId,
                  nftBurnByUserId: "",
                  userType: data.userType,
                  nftVerifyByUserIdDate: new Date(),
                  updateDate: new Date(),
                  nftVerifyLocation: data.nftVerifyLocation,
                },
              };

              ipfsUpdatedVerify
                .findOneAndUpdate({ ipfsHash: ipfsHash }, updateData, {
                  new: true,
                  upsert: true,
                })
                .exec(async (err, newResult) => {
                  if (err) {
                    let obj = { status: 0, data: err };
                    deferred.resolve(obj);
                  } else {
                    // var reportData = {
                    // 	"userId":data.nftVerifyByUserId[0].verifyByUserId,
                    // 	"ipfsHash":ipfsHash,
                    // 	"nftTokenId":result.nftTokenId,
                    // 	"nftTransactionHash":result.nftTransactionHash,
                    // 	"fdaId":result.fdaId,
                    // 	"data":result.data,
                    // 	"nftBurnByUserId":result.nftBurnByUserId,
                    // 	"nftVerifyByUserId":result.nftVerifyByUserId,
                    // 	"nftSaveUserId":result.nftSaveUserId,
                    // 	"userType":result.userType,
                    // 	"status":1
                    // }

                    // saveNftsReportData.create(reportData)
                    self.getCompanyIdIpfs({
                      userId: mongoose.Types.ObjectId(newResult.userId),
                      filterStatus: 1
                    },databaseName);
                    let obj = { status: 1, data: result };
                    deferred.resolve(obj);
                  }
                });
              // End old One
            } else {
              // Start old One
              let updateData = {
                $set: {
                  status: 2,
                  nftVerifyUserFlag: 2,
                  nftBurnByUserId: "",
                  userType: data.userType,
                  nftVerifyByUserIdDate: new Date(),
                  updateDate: new Date(),
                  nftVerifyLocation: data.nftVerifyLocation,
                },
              };

              ipfsUpdatedVerify
                .findOneAndUpdate({ ipfsHash: ipfsHash }, updateData, {
                  new: true,
                  upsert: true,
                })
                .exec(async (err, newResult) => {
                  if (err) {
                    let obj = { status: 0, data: err };
                    deferred.resolve(obj);
                  } else {
                    var reportData = {
                      userId: data.nftVerifyByUserId[0].verifyByUserId,
                      ipfsHash: ipfsHash,
                      nftTokenId: newResult.nftTokenId,
                      nftTransactionHash: newResult.nftTransactionHash,
                      fdaId: newResult.fdaId,
                      data: newResult.data,
                      nftBurnByUserId: newResult.nftBurnByUserId,
                      nftVerifyByUserId: newResult.nftVerifyByUserId,
                      nftSaveUserId: newResult.nftSaveUserId,
                      userType: newResult.userType,
                      nftFlagMsg: "Verify",
                      status: 1,
                    };

                    saveNftsReportData.create(reportData);
                    self.getCompanyIdIpfs({
                      userId: mongoose.Types.ObjectId(newResult.userId),
                      filterStatus: 1,
                    },databaseName);
                    let obj = { status: 2, data: result };
                    deferred.resolve(obj);
                  }
                });
              // End old One
            }
          }
        }
      );
    } else {
      ipfsUpdatedVerify.find(
        { nftSaveUserId: data.nftVerifyByUserId[0].verifyByUserId },
        async (err, result) => {
          if (err) {
            let obj = { status: 0, data: err };
            deferred.resolve(obj);
          } else {
            // if(result.length > 0){

            // 	let obj = {"status":1,"data":result}
            // 	deferred.resolve(obj)

            // } else {

            let updateData = {
              $set: {
                status: 2,
                nftVerifyUserFlag: 2,
                nftVerifyByUserId: data.nftVerifyByUserId,
                nftBurnByUserId: "",
                userType: data.userType,
                nftVerifyByUserIdDate: new Date(),
                updateDate: new Date(),
                nftVerifyLocation: data.nftVerifyLocation,
              },
            };

            ipfsUpdatedVerify
              .findOneAndUpdate({ ipfsHash: ipfsHash }, updateData, {
                new: true,
                upsert: true,
              })
              .exec(async (err, newResult) => {
                if (err) {
                  let obj = { status: 0, data: err };
                  deferred.resolve(obj);
                } else {
                  var reportData = {
                    userId: data.nftVerifyByUserId[0].verifyByUserId,
                    ipfsHash: ipfsHash,
                    nftTokenId: newResult.nftTokenId,
                    nftTransactionHash: newResult.nftTransactionHash,
                    fdaId: newResult.fdaId,
                    data: newResult.data,
                    nftBurnByUserId: newResult.nftBurnByUserId,
                    nftVerifyByUserId: newResult.nftVerifyByUserId,
                    nftSaveUserId: newResult.nftSaveUserId,
                    userType: data.userType,
                    nftFlagMsg: "Verify",
                    status: 1,
                  };

                  saveNftsReportData.create(reportData);
                  self.getCompanyIdIpfs({
                    userId: mongoose.Types.ObjectId(newResult.userId),
                    filterStatus: 1,
                  },databaseName);
                  let obj = { status: 1, data: newResult };
                  deferred.resolve(obj);
                }
              });

            // }
          }
        }
      );

      // let obj = {"status":1,"data":{}}
      // deferred.resolve(obj)
    }

    // let updateData = { $set: {"status": 2, "nftVerifyByUserId": data.nftVerifyByUserId, "nftBurnByUserId": "", "userType": data.userType, "nftVerifyByUserIdDate": new Date() } }

    // ipfsverifydata.findOneAndUpdate({"ipfsHash":ipfsHash},updateData,{new:true, upsert:true}).exec(async (err, result) => {
    // 	if(err){
    // 		let obj = {"status":0,"data":err}
    // 		deferred.resolve(obj)
    // 	} else {

    // 		let obj = {"status":1,"data":result}
    // 		deferred.resolve(obj)
    // 	}
    // });

    return deferred.promise;
  },
  assignContainerToOthers: async (data,databaseName) => {
    var deferred = Q.defer();
    let getData = await self.createDatabase(databaseName);
    let [assignFactotry,getOrder,assignMetaData, generatedUpdateStatus, factoryByContainerSchema, getNftsArray, assignContainerToOthersData, ipfsverifydata, saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain, saveNftsReportData, ipfsUpdatedVerify,ipfsUpdated,ipfsSchema,productModel] = getData;
       
    data.assignContainerStatus = 2; 

    ipfsUpdatedVerify
      .find(
        {
          fdaId: mongoose.Types.ObjectId(data.fdalebelId),
          userId: mongoose.Types.ObjectId(data.userId),
        },
        {
          fdaId: 1,
          ipfsHash: 1,
          nftTokenId: 1,
          nftTransactionHash: 1,
          data: "$data",
        }
      )
      .exec(async (err, getIpfsData) => {
        if (err) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else if (getIpfsData.length == 0) {
          let obj = { status: 1, data: [] };
          deferred.resolve(obj);
        } else {
         
          let d1 = JSON.stringify(getIpfsData);
          let nftData = getIpfsData.length > 0 ? d1 : [];
          nftData = JSON.parse(nftData);

          let totData1 = {};
          nftData.forEach((val, i) => {
            let tempObj = {
              fdaId: val.fdaId,
              ipfsHash: val.ipfsHash,
              nftTokenId: val.nftTokenId,
              nftTransactionHash: val?.nftTransactionHash,
              size: val?.data.size,
            };

            if (totData1[val.data["type"]]) {
              totData1[val.data["type"]].push(tempObj);
            } else {
              totData1[val.data["type"]] = [];
              totData1[val.data["type"]].push(tempObj);
            }
          });

          var packDetails = data.packagingDetails;

          let finalArr = [];
          data.assignContainerToOthersIds.forEach((val, ind) => {
            let assign = parseInt(val.assignContainer);
            let factoryUserId_ = val.factoryUserId;
            let getDatabase_ = databaseName.split("DB_")[1];              


            if(val.factoryId.toString() == data.companyFactoryId.toString()){
                  val.assignContainerStatus = 2
            }

            userAssignDataBase.findOneAndUpdate({
              _id: mongoose.Types.ObjectId(factoryUserId_),          
              // "userRelation": {
              //     '$elemMatch': { '$nin':getDatabase_ }
              //   }
              "userRelation":{ '$nin':getDatabase_ }
             },
             {
              $push: {
                  userRelation: getDatabase_
              }
            },
            { safe:true }).exec();
            
            

            let ar1 = {};
            var j = 0;
			      var fixedData;
            for (let ind = 0; ind < packDetails.length; ind++) {
              var size1;
              var ab;
              if (ind == 0) {
                size1 = totData1[packDetails[0]][0].size || 0;
                ab = totData1[packDetails[0]].splice(0, assign);
              } else if (packDetails.length - 1 == ind) {
                if (!size1) {
                  size1 = totData1[packDetails[ind]][0].size || 0;
                } else if(totData1[packDetails[ind-1]].length == 0) {
                  var getData = packDetails[ind];
                  ab = totData1[getData]
                } else {
                  size1 = totData1[packDetails[ind-1]][0]?.size * ln1
                  fixedData = totData1[packDetails[ind-1]][0]?.size
                  ab = totData1[packDetails[ind]].splice(0, size1);
                }
              } else {
                if (!size1) {
                  size1 = totData1[packDetails[ind]][0].size || 0;
                }
                ab = totData1[packDetails[ind]].splice(0, size1 * ln1);
                size1 = size1 * ln1
              }

              var ln1 = ab.length ? ab.length : 0;

              ar1 = {
                ...ar1,
                [packDetails[ind]]: ab,
              };
              j = j + 1;
            }

            let data1 = {
              ...val,
              nftData: ar1,
            };

            data1.assignContainerStatus = data.assignContainerStatus;
            finalArr.push(data1);            
          });

          let currentCont = {
            fdalebelId: data.fdalebelId,
            productId: data.productId,
          };

          let finalData = {
            assignContainerToOthersIds: finalArr,
            ...currentCont,
            userId: data.userId,
            manufacturerId: data.manufacturerId,
            assignContainerStatus: data.assignContainerStatus,
            userType: data.userType,
          };
          assignContainerToOthersData.create(finalData, async (err, result) => {
            if (err) {
              let obj = { status: 0, data: err };
              deferred.resolve(obj);
            } else {
              await getNftsArray
                .findOneAndUpdate(
                  {
                    fdalebelId: mongoose.Types.ObjectId(data.fdalebelId),
                    productId: mongoose.Types.ObjectId(data.productId),
                    userId: mongoose.Types.ObjectId(data.userId),
                  },
                  { $set: { assignContainerStatus: 2 } },
                  { new: true }
                )
                .exec();

                
                
              await getNftsArray
                .findOneAndUpdate(
                  {
                    fdalebelId: mongoose.Types.ObjectId(data.fdalebelId),
                    productId: mongoose.Types.ObjectId(data.productId),
                    userId: mongoose.Types.ObjectId(data.userId),
                    "assignContainerByFactoryIds.factoryId":
                      data.manufacturerId,
                  },
                  { $set: { "assignContainerByFactoryIds.$.status": 1 } },
                  { new: true, upsert: true }
                )
                .exec(async (err, result1) => {});

                await getNftsArray
                .findOneAndUpdate(
                  {
                    fdalebelId: mongoose.Types.ObjectId(data.fdalebelId),
                    productId: mongoose.Types.ObjectId(data.productId),
                    userId: mongoose.Types.ObjectId(data.userId),
                    "assignContainerByFactoryIds.factoryId":
                      data.companyFactoryId,
                  },
                  { $set: { "assignContainerByFactoryIds.$.assignContainerStatus": 2 } },
                  { new: true }
                )
                .exec();
                
              let obj = { status: 1, data: result };
              deferred.resolve(obj);
              
            }
          });
        }
      });
    // assignContainerToOthersData.create(data, async (err, result) => {
    // 	if(err){
    // 		let obj = {"status":0,"data":err}
    //         deferred.resolve(obj)
    // 	} else {
    // 		await getNftsArray.findOneAndUpdate({"fdalebelId":mongoose.Types.ObjectId(data.fdalebelId),"productId":mongoose.Types.ObjectId(data.productId),"userId":mongoose.Types.ObjectId(data.userId)},{ $set: {"assignContainerStatus": 2 } },{new:true, upsert:true}).exec();
    // 		await getNftsArray.findOneAndUpdate({"fdalebelId":mongoose.Types.ObjectId(data.fdalebelId),"productId":mongoose.Types.ObjectId(data.productId),"userId":mongoose.Types.ObjectId(data.userId),"assignContainerByFactoryIds.factoryId":data.manufacturerId
    // 		},{ $set: {"assignContainerByFactoryIds.$.status": 1 } },{new:true, upsert:true}).exec(async (err, result1) => {
    // 		});
    // 		let obj = {"status":1,"data":result}
    // 		deferred.resolve(obj)
    // 	}
    // });
    return deferred.promise;
  },

  getNftsByFda: async (data) => {
    var deferred = Q.defer();
    getNftsArray.find(
      {
        fdalebelId: mongoose.Types.ObjectId(data[0].fdalebelId),
        productId: mongoose.Types.ObjectId(data[0].productId),
        userId: mongoose.Types.ObjectId(data[0].userId),
      },
      async (err, result) => {
        if (err) {
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
  checkAssignItem: async (data) => {
    var deferred = Q.defer();

    assignMetaData
      .aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(data.fdalebelId),
            productId: mongoose.Types.ObjectId(data.productId),
            userId: mongoose.Types.ObjectId(data.userId),
          },
        },
        {
          $project: {
            _id: 1,
            container: {
              $map: {
                input: "$container",
                as: "container",
                in: {
                  value: {
                    $switch: {
                      branches: [
                        {
                          case: { $eq: ["$$container.nfts", data.dataAssign] },
                          then: "success",
                        },
                      ],
                      default: "fail",
                    },
                  },
                },
              },
            },
            pallets: {
              $map: {
                input: "$pallets",
                as: "pallets",
                in: {
                  value: {
                    $switch: {
                      branches: [
                        {
                          case: { $eq: ["$$pallets.nfts", data.dataAssign] },
                          then: "success",
                        },
                      ],
                      default: "fail",
                    },
                  },
                },
              },
            },
            masterCartons: {
              $map: {
                input: "$masterCartons",
                as: "masterCartons",
                in: {
                  value: {
                    $switch: {
                      branches: [
                        {
                          case: {
                            $eq: ["$$masterCartons.nfts", data.dataAssign],
                          },
                          then: "success",
                        },
                      ],
                      default: "fail",
                    },
                  },
                },
              },
            },
            innerCartons: {
              $map: {
                input: "$innerCartons",
                as: "innerCartons",
                in: {
                  value: {
                    $switch: {
                      branches: [
                        {
                          case: {
                            $eq: ["$$innerCartons.nfts", data.dataAssign],
                          },
                          then: "success",
                        },
                      ],
                      default: "fail",
                    },
                  },
                },
              },
            },
            drugs: {
              $map: {
                input: "$drugs",
                as: "drugs",
                in: {
                  value: {
                    $switch: {
                      branches: [
                        {
                          case: { $eq: ["$$drugs.nfts", data.dataAssign] },
                          then: "success",
                        },
                      ],
                      default: "fail",
                    },
                  },
                },
              },
            },
          },
        },
        {
          $group: {
            _id: "$_id",
            container: { $first: { $arrayElemAt: ["$container.value", 0] } },
            pallets: { $first: { $arrayElemAt: ["$pallets.value", 0] } },
            masterCartons: {
              $first: { $arrayElemAt: ["$masterCartons.value", 0] },
            },
            innerCartons: {
              $first: { $arrayElemAt: ["$innerCartons.value", 0] },
            },
            drugs: { $first: { $arrayElemAt: ["$drugs.value", 0] } },
          },
        },
      ])
      .exec((err, result) => {
        if (err) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          var filterData = Object.assign({}, result)[0];

          let obj = {};
          for (let key in filterData) {
            if (filterData[key] == "success") {
              obj[key] = filterData[key];
            }
          }

          if (Object.keys(obj).length > 0) {
            let obj = { status: 1 };
            deferred.resolve(obj);
          } else {
            let obj = { status: 0 };
            deferred.resolve(obj);
          }
        }
      });
    return deferred.promise;
  },
  assignContainer_old: async (data) => {
    var deferred = Q.defer();

    getNftsArray.find(
      {
        fdalebelId: mongoose.Types.ObjectId(data.fdalebelId),
        productId: mongoose.Types.ObjectId(data.productId),
        userId: mongoose.Types.ObjectId(data.userId),
      },
      async (err, result) => {
        if (err) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          data.assignContainerByFactoryIds.filter(async (item) => {
            var genrateNfts = result.splice(0, item.assignContainer);
            let updatedArray = [];
            genrateNfts.filter(async (filterId) => {
              updatedArray.push(filterId._id);
            });
            await getNftsArray
              .findOneAndUpdate(
                { _id: { $in: updatedArray } },
                { $set: { factoryId: item.factoryId } },
                { new: true }
              )
              .exec();
          });
        }
      }
    );
    assignFactotry.findOneAndUpdate(
      {
        fdalebelId: mongoose.Types.ObjectId(data.fdalebelId),
        productId: mongoose.Types.ObjectId(data.productId),
        userId: mongoose.Types.ObjectId(data.userId),
      },
      { $set: data },
      { new: true, upsert: true },
      async (err, result) => {
        if (err) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          await generatedUpdateStatus
            .findOneAndUpdate(
              {
                fdalebelId: mongoose.Types.ObjectId(data.fdalebelId),
                productId: mongoose.Types.ObjectId(data.productId),
                userId: mongoose.Types.ObjectId(data.userId),
              },
              { $set: { generatedNftStatus: 2 } },
              { new: true, upsert: true }
            )
            .exec(async (err, result1) => {});
          let obj = { status: 1, data: result };
          deferred.resolve(obj);
        }
      }
    );
    return deferred.promise;
  },
  assignContainer: async (data, databaseName, slug) => {
    var deferred = Q.defer();
    let getData = await self.createDatabase(databaseName);
    let [assignFactotry,getOrder,assignMetaData, generatedUpdateStatus, factoryByContainerSchema, getNftsArray, assignContainerToOthersData, ipfsverifydata, saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain, saveNftsReportData, ipfsUpdatedVerify,ipfsUpdated] = getData;

    data.assignContainerStatus = 1;

    ipfsUpdatedVerify
      .find(
        {
          fdaId: mongoose.Types.ObjectId(data.fdalebelId),
          userId: mongoose.Types.ObjectId(data.userId),
        },
        {
          fdaId: 1,
          ipfsHash: 1,
          nftTokenId: 1,
          nftTransactionHash: 1,
          data: "$data",
        }
      )
      .exec(async (err, getIpfsData) => {
        if (err) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else if (getIpfsData.length == 0) {
          let obj = { status: 1, data: [] };
          deferred.resolve(obj);
        } else {
          let d1 = JSON.stringify(getIpfsData);
          let nftData = getIpfsData.length > 0 ? d1 : [];
          nftData = JSON.parse(nftData);

          let totData1 = {};
          nftData.forEach((val, i) => {
            let tempObj = {
              fdaId: val.fdaId,
              ipfsHash: val.ipfsHash,
              nftTokenId: val.nftTokenId,
              nftTransactionHash: val?.nftTransactionHash,
              size: val?.data.size,
            };

            if (totData1[val.data["type"]]) {
              totData1[val.data["type"]].push(tempObj);
            } else {
              totData1[val.data["type"]] = [];
              totData1[val.data["type"]].push(tempObj);
            }
          });
        
          var packDetails = data.packagingDetails;
          let finalArr = [];
          // let assign = parseInt(val.assignContainer);
          data.assignContainerByFactoryIds.forEach((val, ind) => {
            let assign = parseInt(val.assignContainer);
            let factoryUserId_ = val.factoryId;

            let getDatabase_ = databaseName.split("DB_")[1];          

            userAssignDataBase.findOneAndUpdate({
                _id: mongoose.Types.ObjectId(factoryUserId_),          
                // "userRelation": {
                //     '$elemMatch': { '$nin':getDatabase_ }
                //   }
                "userRelation":{ '$nin':getDatabase_ }
               },
               {
                $push: {
                    userRelation: getDatabase_
                }
              },
              { safe:true }).exec();




            let ar1 = {};
            var j = 0;
            var fixedData;
            let totalNfts = 0;
            for (let ind = 0; ind < packDetails.length; ind++) {
              var size1;
              var ab;
              if (ind == 0) {
                size1 = totData1[packDetails[0]][0].size || 0;
                ab = totData1[packDetails[0]].splice(0, assign);
              } else if (packDetails.length - 1 == ind) {
                if (!size1) {
                  size1 = totData1[packDetails[ind]][0].size || 0;
                } else if(totData1[packDetails[ind-1]].length == 0) {
                  var getData = packDetails[ind];
                  ab = totData1[getData]
                } else {
                  size1 = totData1[packDetails[ind-1]][0]?.size * ln1
                  fixedData = totData1[packDetails[ind-1]][0]?.size
                  ab = totData1[packDetails[ind]].splice(0, size1);
                }
              } else {
                if (!size1) {
                  size1 = totData1[packDetails[ind]][0].size || 0;
                }
                ab = totData1[packDetails[ind]].splice(0, size1 * ln1);
                size1 = size1 * ln1
              }

              var ln1 = ab.length ? ab.length : 0;

              totalNfts += ln1

              ar1 = {
                ...ar1,
                [packDetails[ind]]: ab,
              };
              j = j + 1;
            }

            let data1 = {
              ...val,
              nftData: ar1,
              totalNfts: totalNfts
            };
            data1.assignContainerStatus = data.assignContainerStatus;
            finalArr.push(data1);           
          });

          let currentCont = {
            fdalebelId: data.fdalebelId,
            productId: data.productId,
            _id: data._id,
          };

          let finalData = {
            assignContainerByFactoryIds: finalArr,
            ...currentCont,
            userId: data.userId,
            assignContainerStatus: data.assignContainerStatus,
          };
          getNftsArray.create(finalData, async (err, result) => {
            if (err) {
              let obj = { status: 0, data: err };
              deferred.resolve(obj);
            } else {
              await generatedUpdateStatus
                .findOneAndUpdate(
                  {
                    fdalebelId: mongoose.Types.ObjectId(data.fdalebelId),
                    productId: mongoose.Types.ObjectId(data.productId),
                    userId: mongoose.Types.ObjectId(data.userId),
                  },
                  { $set: { generatedNftStatus: 2 } },
                  { new: true, upsert: true }
                )
                .exec(async (err, result1) => {});
                let getResponse = await self.genratePdfs(data.fdalebelId, databaseName, slug)
              let obj = { status: 1, data: result };
              deferred.resolve(obj);
            }
          });
        }
      });
    return deferred.promise;
  },
  viewContainerByFactory: async (data,databaseName) => {
    var deferred = Q.defer();
    let getData = await self.createDatabase(databaseName);
    let [assignFactotry,getOrder,assignMetaData, generatedUpdateStatus, factoryByContainerSchema, getNftsArray, assignContainerToOthersData, ipfsverifydata, saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain, saveNftsReportData, ipfsUpdatedVerify,ipfsUpdated,ipfsSchema,productModel] = getData;
    
    
    assignFactotry
      .aggregate([
        {
          $match: {
            fdalebelId: mongoose.Types.ObjectId(data.fdalebelId),
            productId: mongoose.Types.ObjectId(data.productId),
            userId: mongoose.Types.ObjectId(data.userId),
          },
        },
        {
          $unwind: {
            path: "$assignContainerByFactoryIds",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $unwind: {
            path: "$assignContainerByFactoryIds.factoryId",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "tbl_fdalebelmetadata",
            localField: "fdalebelId",
            foreignField: "_id",
            as: "metadata",
          },
        },
        {
          $unwind: {
            path: "$metadata",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            factoryName: "$assignContainerByFactoryIds.factoryName",
            factoryId: "$assignContainerByFactoryIds.factoryId",
            assignContainer: "$assignContainerByFactoryIds.assignContainer",
            fdalebelId: "$fdalebelId",
            productId: "$productId",
            userId: "$userId",
            createdDate: "$createdDate",
            deliveryStatus: "$deliveryStatus",
            status: "$status",
            updateDate: "$updateDate",
            container: "$assignContainerByFactoryIds.assignContainer",
            pallets: {
              $cond: {
                if: {
                  $gt: [{ $size: "$metadata.pallets" }, 0],
                },
                then: {
                  $multiply: [
                    { $first: "$metadata.container.totalContainerNfts" },
                    "$assignContainerByFactoryIds.assignContainer",
                  ],
                },
                else: 0,
              },
            },
            masterCartons: {
              $cond: {
                if: {
                  $gt: [{ $size: "$metadata.pallets" }, 0],
                },
                then: {
                  $multiply: [
                    { $first: "$metadata.pallets.totalContainerNfts" },
                    {
                      $multiply: [
                        { $first: "$metadata.container.totalContainerNfts" },
                        "$assignContainerByFactoryIds.assignContainer",
                      ],
                    },
                  ],
                },
                else: 0,
              },
            },
            innerCartons: {
              $cond: {
                if: {
                  $gt: [{ $size: "$metadata.innerCartons" }, 0],
                },
                then: {
                  $multiply: [
                    { $first: "$metadata.masterCartons.totalContainerNfts" },
                    {
                      $multiply: [
                        { $first: "$metadata.pallets.totalContainerNfts" },
                        {
                          $multiply: [
                            {
                              $first: "$metadata.container.totalContainerNfts",
                            },
                            "$assignContainerByFactoryIds.assignContainer",
                          ],
                        },
                      ],
                    },
                  ],
                },
                else: 0,
              },
            },
            drugs: {
              $cond: {
                if: {
                  $gt: [{ $size: "$metadata.drugs" }, 0],
                },
                then: {
                  $multiply: [
                    { $first: "$metadata.innerCartons.totalContainerNfts" },
                    {
                      $multiply: [
                        {
                          $first: "$metadata.masterCartons.totalContainerNfts",
                        },
                        {
                          $multiply: [
                            { $first: "$metadata.pallets.totalContainerNfts" },
                            {
                              $multiply: [
                                {
                                  $first:
                                    "$metadata.container.totalContainerNfts",
                                },
                                "$assignContainerByFactoryIds.assignContainer",
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                else: 0,
              },
            },
          },
        },
      ])
      .exec(async (err, result) => {
        if (err) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          let filterNfts = await self.getNftsByFda(result);
          var filterArray = result.filter((item) => {
            item.genrateNfts = filterNfts.data.splice(0, item.assignContainer);
            return result;
          });
          let obj = { status: 1, data: filterArray };
          deferred.resolve(obj);
        }
      });

    return deferred.promise;
  },
  getUserInfo: async (userId) => {
    var deferred = Q.defer();
    getRegisterData.findOne(
      { _id: mongoose.Types.ObjectId(userId) },
      async (err, result) => {
        if (err) {
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
  viewContainerByfdalebelId: async (fdalebelId,databaseName) => {
    var deferred = Q.defer();
    //let [assignFactotry,getOrder,assignMetaData, generatedUpdateStatus, factoryByContainerSchema, getNftsArray, getRegisterData, assignContainerToOthersData, ipfsverifydata, saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain, saveNftsReportData, ipfsUpdatedVerify, ipfsdata, ipfsUpdated, productModel] = schema;

let getData = await self.createDatabase(databaseName);
let [assignFactotry,getOrder,assignMetaData, generatedUpdateStatus, factoryByContainerSchema, getNftsArray, assignContainerToOthersData, ipfsverifydata, saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain, saveNftsReportData, ipfsUpdatedVerify,ipfsUpdated,ipfsSchema,productModel] = getData;       


    getNftsArray.findOne(
      { fdalebelId: mongoose.Types.ObjectId(fdalebelId), status: 1 },
      (err, result) => {
        if (err) {
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
  viewContainerFactoryById_old: async (data) => {
    var deferred = Q.defer();
    
    getNftsArray
      .aggregate([
        {
          $match: {
            factoryId: mongoose.Types.ObjectId(data.userId) || data.userId,
          },
        },
        {
          $project: {
            _id: 1,
            fdalebelId: 1,
            productId: 1,
            userId: 1,
            container: 1,
            factoryId: 1,
          },
        },
        // {
        // "$lookup": {
        // "from": "tbl_order",
        // "let": { "productId": "$productId", "userId": "$userId", "fdalebelId": "$fdalebelId" },
        // "pipeline": [
        // {
        // "$match": {
        // "$expr": {
        // "$eq": [ "$$productId", "$productId" ],
        // "$eq": [ "$$userId", "$userId" ],
        // "$eq": [ "$$fdalebelId", "$fdalebelId" ]
        // }
        // }
        // }
        // ],
        // "as": "orderData"
        // }
        // },
        // { "$unwind": "$orderData" },
        {
          $lookup: {
            from: "tbl_assignContainerFactoryById",
            let: {
              productId: "$productId",
              userId: "$userId",
              fdalebelId: "$fdalebelId",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$$productId", "$productId"],
                    $eq: ["$$userId", "$userId"],
                    $eq: ["$$fdalebelId", "$fdalebelId"],
                  },
                },
              },
            ],
            as: "assignContainerDetails",
          },
        },
        { $unwind: "$assignContainerDetails" },
        {
          $lookup: {
            from: "tbl_user",
            localField: "userId",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        { $unwind: "$userDetails" },
        {
          $lookup: {
            from: "tbl_products",
            localField: "productId",
            foreignField: "_id",
            as: "productDetails",
          },
        },
        { $unwind: "$productDetails" },
        {
          $project: {
            _id: 1,
            fdalebelId: 1,
            productId: 1,
            userId: 1,
            container: 1,
            factoryId: 1,
            orderData: 1,
            createdDate: "$assignContainerDetails.createdDate",
            assignContainerDetails: {
              $filter: {
                input: "$assignContainerDetails.assignContainerByFactoryIds",
                as: "factoryInfos",
                cond: {
                  $eq: [
                    { "$$factoryInfos.factoryId": data.userId },
                    {
                      "$$factoryInfos.factoryId": mongoose.Types.ObjectId(
                        data.userId
                      ),
                    },
                  ],
                },
              },
            },
            productDetails: 1,
            userName: "$userDetails.firstName",
          },
        },
        {
          $lookup: {
            from: "tbl_fdalebelmetadata",
            localField: "fdalebelId",
            foreignField: "_id",
            as: "metadata",
          },
        },
        {
          $unwind: {
            path: "$metadata",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 1,
            fdalebelId: 1,
            productId: 1,
            userId: 1,
            container: 1,
            factoryId: 1,
            assignContainerDetails: 1,
            createdDate: 1,
            pallets: {
              $cond: {
                if: {
                  $gt: [{ $size: "$metadata.pallets" }, 0],
                },
                then: {
                  $multiply: [
                    { $first: "$metadata.container.totalContainerNfts" },
                    { $first: "$assignContainerDetails.assignContainer" },
                  ],
                },
                else: 0,
              },
            },
            masterCartons: {
              $cond: {
                if: {
                  $gt: [{ $size: "$metadata.pallets" }, 0],
                },
                then: {
                  $multiply: [
                    { $first: "$metadata.pallets.totalContainerNfts" },
                    {
                      $multiply: [
                        { $first: "$metadata.container.totalContainerNfts" },
                        { $first: "$assignContainerDetails.assignContainer" },
                      ],
                    },
                  ],
                },
                else: 0,
              },
            },
            innerCartons: {
              $cond: {
                if: {
                  $gt: [{ $size: "$metadata.innerCartons" }, 0],
                },
                then: {
                  $multiply: [
                    { $first: "$metadata.masterCartons.totalContainerNfts" },
                    {
                      $multiply: [
                        { $first: "$metadata.pallets.totalContainerNfts" },
                        {
                          $multiply: [
                            {
                              $first: "$metadata.container.totalContainerNfts",
                            },
                            {
                              $first: "$assignContainerDetails.assignContainer",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                else: 0,
              },
            },
            drugs: {
              $cond: {
                if: {
                  $gt: [{ $size: "$metadata.drugs" }, 0],
                },
                then: {
                  $multiply: [
                    { $first: "$metadata.innerCartons.totalContainerNfts" },
                    {
                      $multiply: [
                        {
                          $first: "$metadata.masterCartons.totalContainerNfts",
                        },
                        {
                          $multiply: [
                            { $first: "$metadata.pallets.totalContainerNfts" },
                            {
                              $multiply: [
                                {
                                  $first:
                                    "$metadata.container.totalContainerNfts",
                                },
                                {
                                  $first:
                                    "$assignContainerDetails.assignContainer",
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                else: 0,
              },
            },
            productDetails: 1,
            userName: 1,
          },
        },
        {
          $project: {
            _id: 1,
            fdalebelId: 1,
            productId: 1,
            userId: 1,
            container: 1,
            factoryId: 1,
            orderData: 1,
            assignContainerDetails: 1,
            createdDate: 1,
            noOfNfts: {
              $sum: [
                { $first: "$assignContainerDetails.assignContainer" },
                "$pallets",
                "$masterCartons",
                "$innerCartons",
                "$drugs",
              ],
            },
            productDetails: 1,
            userName: 1,
          },
        },
        {
          $sort: {
            _id: -1,
          },
        },
      ])
      .exec(async (err, result) => {
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
  getFactoryIds: async (data,databaseName) => {
    var deferred = Q.defer();
    let getData = await self.createDatabase(databaseName);
    let [assignFactotry,getOrder,assignMetaData, generatedUpdateStatus, factoryByContainerSchema, getNftsArray, assignContainerToOthersData, ipfsverifydata, saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain, saveNftsReportData, ipfsUpdatedVerify,ipfsUpdated] = getData;
    getFactoryInfo
      .findOne(
        {
          userId: mongoose.Types.ObjectId(data.userId),
          status: 1,
          userType: 1,
        },
        { _id: 1, factoryInfo: 1 }
      )
      .exec(async (err, result) => {
        if (err) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          result = _.filter(result.factoryInfo, {
            manufacturerBYId: undefined,
          });
          let filterArray = [];
          result.filter((item) => filterArray.push(item._id.toString()));
          let obj = { status: 1, data: filterArray };
          deferred.resolve(obj);
        }
      });
    return deferred.promise;
  },
  viewContainerCompanyFactoryById: async (data,databaseName) => {
    var deferred = Q.defer();

    let getData = await self.createDatabase(databaseName);
    let [assignFactotry,getOrder,assignMetaData, generatedUpdateStatus, factoryByContainerSchema, getNftsArray, assignContainerToOthersData, ipfsverifydata, saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain, saveNftsReportData, ipfsUpdatedVerify,ipfsUpdated,ipfsSchema,productModel] = getData;    
    const getFactories = await Promise.all([self.getFactoryIds(data,databaseName)]);
    

    // let newDb = DB.getSiblingDB("blokchiMainDB")

    // console.log(mongoose.connection.db, User.collection.name, "UserUserUserUser");
    
    getNftsArray
      .aggregate([
        {
          $match: {
            status: 1,
            assignContainerByFactoryIds: {
              $elemMatch: {
                $or: [{ factoryId: { $in: getFactories[0].data } }],
              },
            },
          },
        },
        {
            "$addFields": {
                "convertfdaId": {
                    $toObjectId: "$fdalebelId",
                }
            }
        },
        {
          $lookup: {
            from: "tbl_fdalebelmetadata",
            localField: "convertfdaId",
            foreignField: "_id",
            as: "fdaDetails",
          },
        },
        {
          $lookup: {
            from: "tbl_products",
            localField: "productId",
            foreignField: "_id",
            as: "productDetails",
          },
        },
        { $unwind: "$productDetails" },
        // {
        //   $lookup: {
        //     // from: {db: "blokchiMainDB", coll: User.collection.name},
        //     from: User.collection.name,
        //     localField: "userId",
        //     foreignField: "_id",
        //     as: "userDetails",
        //   },
        // },
        // { $unwind: "$userDetails" },
        {
          $project: {
              "_id": 1,
              "userId": 1,
              "productId": 1,
              "fdalebelId": 1,
              "totalNfts": {"$first":"$fdaDetails.totalNfts"},
              "createdDate": {"$first":"$fdaDetails.createdDate"},
              "packagingType": {"$first":"$fdaDetails.packagingType"},
              "purchaseOrderNo": {"$first":"$fdaDetails.purchaseOrderNo"},
              "productName": "$productDetails.productName",
              "brandName": "$productDetails.brandName",
              "batchLotNo": {"$first":"$fdaDetails.batchLotNo"},
              "manufacturDate": {"$first":"$fdaDetails.manufacturDate"},
              "expiryDate": {"$first":"$fdaDetails.expiryDate"},
              "packagingDetails": {"$first":"$fdaDetails.packagingDetails"},
              "packagingStandard": {"$first":"$fdaDetails.packagingStandard"},
              "packagingStandardValue": {"$first":"$fdaDetails.packagingStandardValue"},          
              "assignContainerByFactoryIds.factoryName": 1,
              "assignContainerByFactoryIds.factoryId": 1,
              "assignContainerByFactoryIds.assignContainer": 1,
              "assignContainerByFactoryIds.assignContainerStatus": 1,
              "assignContainerByFactoryIds.totalNfts": 1,
              "assignContainerByFactoryIds.nftData": 1,
          },
        },
        {
          $sort: {
            createdDate: -1,
          },
        },
      ])
      .exec(async (err, result) => {
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
  viewContainerFactoryById: async (data, databaseName) => {
    var deferred = Q.defer();

    let getData = await self.createDatabase(databaseName);
    let [assignFactotry,getOrder,assignMetaData, generatedUpdateStatus, factoryByContainerSchema, getNftsArray, assignContainerToOthersData, ipfsverifydata, saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain, saveNftsReportData, ipfsUpdatedVerify,ipfsUpdated,ipfsSchema,productModel] = getData;
    getNftsArray
      .aggregate([
        {
          $match: {
            status: 1,
            assignContainerByFactoryIds: {
              $elemMatch: {
                $or: [
                  { factoryId: data.userId },
                  { factoryId: mongoose.Types.ObjectId(data.userId) },
                ],
              },
            },
          },
        },
        {
          $lookup: {
            from: "tbl_products",
            localField: "productId",
            foreignField: "_id",
            as: "productDetails",
          },
        },
        { $unwind: "$productDetails" },
        {
          $lookup: {
            from: "tbl_user",
            localField: "userId",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        { $unwind: "$userDetails" },
        {
          $project: {
            _id: 1,
            firstName: "$userDetails.firstName",
            lastName: "$userDetails.lastName",
            productDetails: 1,
            fdalebelId: 1,
            assignContainerStatus: 1,
            userId: 1,
            productId: 1,
            createdDate: 1,
            assignContainerByFactoryIds: {
              $filter: {
                input: "$assignContainerByFactoryIds",
                as: "assignContainerByFactoryIds",
                cond: {
                  // $eq: ['$$assignContainerByFactoryIds.factoryId', data.userId]
                  $or: [
                    {
                      $eq: [
                        "$$assignContainerByFactoryIds.factoryId",
                        data.userId,
                      ],
                    },
                    {
                      $eq: [
                        "$$assignContainerByFactoryIds.factoryId",
                        mongoose.Types.ObjectId(data.userId),
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          $lookup: {
            from: "tbl_assignContainerToOthersById",
            let: {
              assignContainerByFactoryIds: "$assignContainerByFactoryIds",
              userId: "$userId",
              fdaId: "$fdaId",
              productId: "$productId",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: [
                          "$manufacturerId",
                          {
                            $toObjectId: data.userId,
                          },
                        ],
                      },
                      {
                        $eq: ["$userId", "$$userId"],
                      },
                      {
                        $eq: ["$fdaId", "$$fdaId"],
                      },
                      {
                        $eq: ["$productId", "$$productId"],
                      },
                    ],
                  },
                },
              },
              {
                $project: {
                  _id: 0,
                  assignContainerStatus: {
                    $first: "$assignContainerToOthersIds.assignContainerStatus",
                  },
                },
              },
            ],
            as: "assignToContainerStatus",
          },
        },
        {
          $sort: {
            createdDate: -1,
          },
        },
      ])
      .exec(async (err, result) => {
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
  getdatafromipfshash: async (ipfshash,databaseName) => {
    var deferred = Q.defer();
    let getData = await self.createDatabase(databaseName);
    let [assignFactotry,getOrder,assignMetaData, generatedUpdateStatus, factoryByContainerSchema, getNftsArray, assignContainerToOthersData, ipfsverifydata, saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain, saveNftsReportData, ipfsUpdatedVerify,ipfsUpdated,ipfsSchema,productModel] = getData;

    ipfsUpdated
      .aggregate([
        {
          $match: {
            ipfsHash: ipfshash,
          },
        },
        {
          $unwind: {
            path: "$ipfsdata",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            ipfsHash: 1,
            productId: {
              $toObjectId: "$data.productId",
            },
            data: 1,
            srNo: "$data.srNo",
            nftSaveUserId: { $ifNull: ["$nftSaveUserId", ""] },
            nftTokenId: { $ifNull: ["$nftTokenId", ""] },
            nftTransactionHash: { $ifNull: ["$nftTransactionHash", ""] },
            nftBurnByUserId: { $ifNull: ["$nftBurnByUserId", ""] },
            nftVerifyByUserId: {
              $ifNull: [{ $last: "$nftVerifyByUserId" }, ""],
            },
            userType: { $ifNull: ["$userType", ""] },
            fdaId: "$fdaId" ? "$fdaId" : "",
            status: 1,
            createdDate: 1,
            updateDate: 1,
          },
        },
        {
          $lookup: {
            from: "tbl_products",
            localField: "productId",
            foreignField: "_id",
            as: "productDetails",
          },
        },
        {
          $unwind: {
            path: "$productDetails",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "tbl_fdalebelmetadata",
            localField: "fdaId",
            foreignField: "_id",
            as: "fdaDetails",
          },
        },
        {
          $unwind: {
            path: "$fdaDetails",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            ipfsHash: 1,
            productId: 1,
            data: 1,
            srNo: 1,
            nftSaveUserId: 1,
            nftTokenId: 1,
            nftTransactionHash: 1,
            nftBurnByUserId: 1,
            nftVerifyByUserId: 1,
            userType: 1,
            fdaId: 1,
            status: 1,
            createdDate: 1,
            updateDate: 1,
            productDetails: 1,
            batchLotNo: "$fdaDetails.batchLotNo",
            purchaseOrderNo: "$fdaDetails.purchaseOrderNo",
            manufacturDate: "$fdaDetails.manufacturDate",
            expiryDate: "$fdaDetails.expiryDate",
          },
        },
        {
          $sort: {
            _id: -1,
          },
        },
      ])
      .exec((err, result) => {
        // console.log(result, "getdatafromipfshashgetdatafromipfshashgetdatafromipfshash")
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
