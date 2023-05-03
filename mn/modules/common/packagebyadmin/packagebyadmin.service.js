const {
  AdminHistory,
  companyInfoStatus,
  subscriptionInfoSchema,
} = require("./packagebyadmin.model");
const Q = require("q");
mongoose = require("mongoose");
var config = require("./../../../config.json");
var fs = require("fs");
const AWS = require("aws-sdk");
const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./Compile");
var CryptoJS = require("crypto-js");
const { async } = require("q");

var secretsmanager = new AWS.SecretsManager({
  region: "ap-south-1",
  accessKeyId: "AKIA4CMJKB6YJS7LD5OD",
  secretAccessKey: "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",
});

let self = (module.exports = {
  editsubscription: (data) => {
    var deferred = Q.defer();
    subscriptionInfoSchema.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(data.subscriptionId),
      },
      { $set: { subName: data.subName } },
      { new: true },
      (err, results) => {
        if (err || results == null) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          let obj = { status: 1, data: "Subscription updated successfully." };
          deferred.resolve(obj);
        }
      }
    );
    return deferred.promise;
  },
  listsubscription: () => {
    var deferred = Q.defer();
    subscriptionInfoSchema
      .find({ status: 1 })
      .sort({ _id: -1 })
      .exec((err, result) => {
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
  addPaymentType: (data, history) => {
    var deferred = Q.defer();
    let [
      offerModeDetails,
      paymentModeDetails,
      UserPackage,
      SmartContract,
      smartAssign,
      newproductModel,
      manageUserPackage,
      scmanager,
    ] = data.schema;
    delete data.schema;
    paymentModeDetails.find({ status: 1 }).exec(async (err, result) => {
      if (err) {
        let obj = { status: 0, data: err };
        deferred.resolve(obj);
      } else {
        if (result.length == 0) {
          paymentModeDetails.create(data, async (err, result) => {
            if (err || result == null) {
              let obj = { status: 0, data: err };
              deferred.resolve(obj);
            } else {
              history.previousData = "";
              history.currentData = result;
              var getData = await self.addHistoryDataByUser(history);
              if (getData) {
                let obj = { status: 1, data: result };
                deferred.resolve(obj);
              } else {
                let obj = { status: 1, data: result };
                deferred.resolve(obj);
              }
            }
          });
        } else {
          let obj = { status: 0, data: "payment type already exists" };
          deferred.resolve(obj);
        }
      }
    });

    return deferred.promise;
  },
  paymentTypeList: (data) => {
    var deferred = Q.defer();
    let [
      offerModeDetails,
      paymentModeDetails,
      UserPackage,
      SmartContract,
      smartAssign,
      newproductModel,
      manageUserPackage,
      scmanager,
    ] = data.schema;
    delete data.schema;
    paymentModeDetails
      .find({ status: 1 })
      .sort({ _id: -1 })
      .exec((err, result) => {
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
  deletePaymentType: (data, history) => {
    var deferred = Q.defer();
    let [
      offerModeDetails,
      paymentModeDetails,
      UserPackage,
      SmartContract,
      smartAssign,
      newproductModel,
      manageUserPackage,
      scmanager,
    ] = data.schema;
    delete data.schema;
    paymentModeDetails.updateOne(
      { _id: mongoose.Types.ObjectId(data.paymenttypeId) },
      { $set: { status: 0 } },
      { new: true },
      async (err, result) => {
        if (err || result == null) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          history.previousData = result;
          history.currentData = "Deleted";
          var getData = await self.addHistoryDataByUser(history);
          if (getData) {
            let obj = { status: 1, data: result };
            deferred.resolve(obj);
          }
        }
      }
    );
    return deferred.promise;
  },
  addHistoryDataByUser: (data) => {
    var deferred = Q.defer();
    AdminHistory.create(data, (err, result) => {
      let obj = { status: 1 };
      deferred.resolve(obj);
    });
    return deferred.promise;
  },
  // getPreviousData:(getId)=>{
  //     var deferred = Q.defer();
  //     ManagePackage.findOne({_id: mongoose.Types.ObjectId(getId)}, (err, result) => {
  //         deferred.resolve(result);
  //     });
  //     return deferred.promise;
  // },
  // smartContractDeploy: async (data) => {
  //     var deferred = Q.defer();
  //     let [offerModeDetails,paymentModeDetails,UserPackage,SmartContract,smartAssign,newproductModel,manageUserPackage, scmanager] = data.schema;
  //     delete data.schema;

  //     let getSmartDetails = await SmartContract.findOne({"accountAddress":data.accountAddress}).exec();

  //     secretsmanager.getSecretValue({SecretId: getSmartDetails._id.toString()}, async function(err, resultData) {
  //         if (err){

  //             let obj = { "status": 0, "data": err }
  //             deferred.resolve(obj);
  //         }
  //         else {

  //             console.log('getSecretValue......',resultData);

  //             let resultParseData = JSON.parse(resultData.SecretString)
  //             var mnemonicKeybytes = CryptoJS.AES.decrypt(resultParseData.mnemonicKey, resultData.Name);

  //             // console.log('mnemonicKeybytes......',mnemonicKeybytes);

  //             var mnemonic = mnemonicKeybytes.toString(CryptoJS.enc.Utf8);
  //             const QuickNodeURL = getSmartDetails.quickNodeURL;

  //             // console.log('mnemonic......',mnemonic);
  //             // console.log('QuickNodeURL......',QuickNodeURL);

  //             const provider = new HDWalletProvider(mnemonic, QuickNodeURL, 0, 10);
  //             const web3 = new Web3(provider);

  //             const deploy = async () => {

  //                 let txCount;

  //                 const accounts = await web3.eth.getAccounts();
  //                 // console.log("Attempting to deploy from account", data.accountAddress);

  //                 try {
  //                     txCount = await web3.eth.getTransactionCount(data.accountAddress);
  //                 } catch (error) {
  //                     console.log(error);
  //                 }
  //                 const chainId = await web3.eth.net.getId();

  //                 const result = await new web3.eth.Contract(interface).deploy({ data: bytecode }).send({gasLimit: web3.utils.toHex(3000000),gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),from: data.accountAddress,chainId: chainId,nonce: web3.utils.toHex(txCount)});
  //             }
  //             let obj;
  //             try {
  //                 await deploy();
  //                 await SmartContract.findOneAndUpdate({"accountAddress":data.accountAddress},{$set:{"smartStatus":2,"contractAddress":result.options.address}},{"new":true}).exec();
  //                 obj = { "status": 1, "data": "Contract deployed"}
  //             } catch (err){
  //                 obj = { "status": 0, "data": "Contract Not deployed."}
  //             }

  //             deferred.resolve(obj);

  //         }
  //     });
  //     return deferred.promise;
  // },
  smartContractDeploy: async (data) => {
    var deferred = Q.defer();
	
    let [
      offerModeDetails,
      paymentModeDetails,
      UserPackage,
      SmartContract,
      smartAssign,
      newproductModel,
      manageUserPackage,
      scmanager,
    ] = data.schema;
    delete data.schema;

    let getSmartDetails = await SmartContract.findOne({
      accountAddress: data.accountAddress,
    }).exec();
	
	// console.log(getSmartDetails, "getSmartDetailsgetSmartDetailsgetSmartDetails")
	
	
    secretsmanager.getSecretValue(
      { SecretId: getSmartDetails._id.toString() },
      async function (err, resultData) {
        if (err) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
			// console.log(resultData, "resultDataresultData")
          let resultParseData = JSON.parse(resultData.SecretString);
          var mnemonicKeybytes = CryptoJS.AES.decrypt(
            resultParseData.mnemonicKey,
            resultData.Name
          );
          var mnemonic = mnemonicKeybytes.toString(CryptoJS.enc.Utf8);
          const QuickNodeURL = getSmartDetails.quickNodeURL;
		  
		  // console.log(mnemonic, "QuickNodeURLQuickNodeURLQuickNodeURL", QuickNodeURL)

          const provider = new HDWalletProvider(mnemonic, QuickNodeURL, 0, 10);
          const web3 = new Web3(provider);

          const deploy = async () => {
            let txCount;

            const accounts = await web3.eth.getAccounts();
            try {
              txCount = await web3.eth.getTransactionCount(
                data.accountAddress,
                "pending"
              );
			  // console.log(txCount, "txCounttxCounttxCount")
            } catch (error) {
              console.log(error);
            }
            const chainId = await web3.eth.net.getId();
            let gasPrice = await web3.eth.getGasPrice();
            let txObject = {
              gasLimit: web3.utils.toHex(15000000),
              gasPrice: web3.utils.toHex(web3.utils.toWei(gasPrice, "wei")),
              from: data.accountAddress,
              chainId: chainId,
              nonce: web3.utils.toHex(txCount),
            };

            const result = await new web3.eth.Contract(interface)
              .deploy({ data: bytecode })
              .send(txObject);
            // console.log(result, "resultresult");
            // console.log(result.options.address, data.accountAddress, "testing");
            await SmartContract.findOneAndUpdate(
              { accountAddress: data.accountAddress },
              {
                $set: {
                  smartStatus: 2,
                  contractAddress: result.options.address,
                },
              },
              { new: true }
            ).exec(async function (err, newdta) {
              console.log(err, newdta, "err, newdtaerr, newdtaerr, newdta");
            });
          };
          try {
            await deploy();
            var obj = { status: 1, data: "Contract deployed" };
            console.log("111111111111");
          } catch (err) {
            var obj = { status: 0, data: "Contract Not deployed." };
            console.log("222222222222");
          }

          deferred.resolve(obj);
        }
      }
    );
    return deferred.promise;
  },
  smartDeploye: (data) => {
    var deferred = Q.defer();
    let [
      offerModeDetails,
      paymentModeDetails,
      UserPackage,
      SmartContract,
      smartAssign,
      newproductModel,
      manageUserPackage,
      scmanager,
    ] = data.schema;
    delete data.schema;
    SmartContract.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(data.smartId),
      },
      { $set: { smartStatus: 2 } },
      { new: true },
      (err, results) => {
        if (err || results == null) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          let obj = { status: 1, data: "Deploy has been changed." };
          deferred.resolve(obj);
        }
      }
    );
    return deferred.promise;
  },
  smartStatus: (data) => {
    var deferred = Q.defer();
    let [
      offerModeDetails,
      paymentModeDetails,
      UserPackage,
      SmartContract,
      smartAssign,
      newproductModel,
      manageUserPackage,
      scmanager,
    ] = data.schema;
    delete data.schema;
    SmartContract.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(data.smartid),
      },
      {
        $set: {
          mnemonicKey: data.mnemonicKey,
          privateKey: data.privateKey,
          smartStatus: 1,
        },
      },
      { new: true },
      async (err, results) => {
        if (err || results == null) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          let obj = { status: 1, data: "Smart status has been changed." };
          deferred.resolve(obj);
        }
      }
    );
    return deferred.promise;
  },

  //create secret manager
  smanager: async (data) => {
    var deferred = Q.defer();
    let [
      offerModeDetails,
      paymentModeDetails,
      UserPackage,
      SmartContract,
      smartAssign,
      newproductModel,
      manageUserPackage,
      scmanager,
    ] = data.schema;
    delete data.schema;
    data.SecretString = JSON.stringify(data.SecretString);
    secretsmanager.createSecret(data, async function (err, result) {
      if (err) {
        let obj = { status: 0, data: err };
        deferred.resolve(obj);
      } else {
        await SmartContract.findOneAndUpdate(
          { _id: mongoose.Types.ObjectId(data.Name) },
          { $set: { smartStatus: 1 } },
          { new: true }
        ).exec();

        let obj = { status: 1, result };
        deferred.resolve(obj);
      }
    });
    return deferred.promise;
  },

  gsvalue: async (data) => {
    var deferred = Q.defer();
    let [
      offerModeDetails,
      paymentModeDetails,
      UserPackage,
      SmartContract,
      smartAssign,
      newproductModel,
      manageUserPackage,
      scmanager,
    ] = data.schema;
    delete data.schema;
    try {
      let secretValue = await secretsManager
        .getSecretValue({ SecretId: secretName })
        .promise();
      if ("SecretString" in secretValue) {
        return (secret = secretValue.SecretString);
        // let obj = { "status": 1, secret}
        // deferred.resolve(obj);
      } else {
        let buff = new Buffer(secretValue.SecretBinary, "base64");
        return (decodedBinarySecret = buff.toString("ascii"));
      }
    } catch (err) {
      if (err.code === "DecryptionFailureException") {
        throw err;
      } else if (err.code === "InternalServiceErrorException") {
        throw err;
      } else if (err.code === "InvalidParameterException") {
        throw err;
      } else if (err.code === "InvalidRequestException") {
        throw err;
      } else if (err.code === "ResourceNotFoundException") {
        throw err;
      }
    }
  },

  deletePackegesListByUserId: (data, history) => {
    var deferred = Q.defer();
    let [
      offerModeDetails,
      paymentModeDetails,
      UserPackage,
      SmartContract,
      smartAssign,
      newproductModel,
      manageUserPackage,
      scmanager,
    ] = data.schema;
    delete data.schema;
    manageUserPackage.updateOne(
      { _id: mongoose.Types.ObjectId(data.packageId) },
      { $set: { status: 0 } },
      { new: true },
      async (err, result) => {
        if (err || result == null) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          history.previousData = data;
          history.currentData = "Deleted";
          var getData = await self.addHistoryDataByUser(history);
          if (getData) {
            let obj = { status: 1, data: result };
            deferred.resolve(obj);
          }
        }
      }
    );
    return deferred.promise;
  },
  packegesListByUserId: (data) => {
    var deferred = Q.defer();
    let [
      offerModeDetails,
      paymentModeDetails,
      UserPackage,
      SmartContract,
      smartAssign,
      newproductModel,
      manageUserPackage,
      scmanager,
    ] = data.schema;
    delete data.schema;
    console.log(data, "1`manshhhhhhhhhh");
    // return
    manageUserPackage
      .find({ userId: mongoose.Types.ObjectId(data.userId), status: "1" })
      .exec(async (err, result) => {
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
  addPackegesByUserId: (data) => {
    var deferred = Q.defer();
    let [
      offerModeDetails,
      paymentModeDetails,
      UserPackage,
      SmartContract,
      smartAssign,
      newproductModel,
      manageUserPackage,
      scmanager,
    ] = data.schema;
    delete data.schema;
    manageUserPackage.create(data, async (err, result) => {
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
  addPackegesByUserId_old: (data, history) => {
    var deferred = Q.defer();

    let [
      offerModeDetails,
      paymentModeDetails,
      UserPackage,
      SmartContract,
      smartAssign,
      newproductModel,
      manageUserPackage,
      scmanager,
    ] = data.schema;
    delete data.schema;
    manageUserPackage
      .find({ productId: mongoose.Types.ObjectId(data.productId), status: 1 })
      .exec(async (err, result) => {
        if (err) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          if (result.length == 0) {
            data.price = parseInt(data.price);
            manageUserPackage.create(data, async (err, result) => {
              if (err || result == null) {
                let obj = { status: 0, data: err };
                deferred.resolve(obj);
              } else {
                history.previousData = "";
                history.currentData = result;
                var getData = await self.addHistoryDataByUser(history);
                if (getData) {
                  let obj = { status: 1, data: result };
                  deferred.resolve(obj);
                } else {
                  let obj = { status: 1, data: result };
                  deferred.resolve(obj);
                }
              }
            });
          } else {
            let obj = { status: 0, data: "Package already exists" };
            deferred.resolve(obj);
          }
        }
      });

    return deferred.promise;
  },
  unUsedSmartContractList: (data) => {
    var deferred = Q.defer();
    let [
      offerModeDetails,
      paymentModeDetails,
      UserPackage,
      SmartContract,
      smartAssign,
      newproductModel,
      manageUserPackage,
      scmanager,
    ] = data.schema;
    delete data.schema;
    // smartAssign.aggregate([
    SmartContract.aggregate([
      {
        $match: {
          status: 1,
          smartStatus: 2,
        },
      },
      // {
      //     "$project": {
      //         "_id":{ $toString: "$_id" },
      //         "blockChainName" : 1,
      //         "accountAddress" : 1,
      //         "quickNodeURL" : 1,
      //         "status" : 1,
      //         "createdDate" : 1,
      //         "updateDate" : 1,
      //     }
      // },
      // {
      //     $lookup: {
      //         from: "tbl_smartassign",
      //         let: { id: "$_id" },
      //         pipeline: [
      //             {
      //                 $match: {
      //                     $expr: {
      //                         "$not": { "$in": ["$$id", "$smartAssignIds"] },
      //                     },
      //                 },
      //             },
      //         ],
      //         as: "smartdata",
      //     },
      // },
      // {
      //     "$project": {
      //         "_id": 1,
      //         "blockChainName": 1,
      //         "accountAddress": 1,
      //         "quickNodeURL": 1,
      //         "status": 1,
      //         "createdDate": 1,
      //         "updateDate": 1,
      //         "smartdata": { $size: {
      //             $reduce: {
      //                 input: "$smartdata.smartAssignIds" ,
      //                 initialValue: [],
      //                 in: { $concatArrays: ["$$value", "$$this"] }
      //             }
      //         } }
      //     }
      // },
      // {
      //     $match: {
      //         "smartdata": 1
      //     }
      // }
    ]).exec(async (err, result) => {
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
  companyProfileStatus: (data) => {
    var deferred = Q.defer();
    companyInfoStatus.findOne(
      {
        userId: mongoose.Types.ObjectId(data.userId),
        userType: parseInt(data.userType),
        verified: 1,
      },
      (err, getResult) => {
        if (err) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          if (getResult == null) {
            let obj = { status: 2, data: {} };
            deferred.resolve(obj);
          } else {
            let obj = { status: 1, data: getResult };
            deferred.resolve(obj);
          }
        }
      }
    );
    return deferred.promise;
  },
  smartUserListByProduct: (data, history) => {
    var deferred = Q.defer();
    let [
      offerModeDetails,
      paymentModeDetails,
      UserPackage,
      SmartContract,
      smartAssign,
      newproductModel,
      manageUserPackage,
      scmanager,
    ] = data.schema;
    delete data.schema;
    newproductModel
      .aggregate([
        {
          $match: {
            userId: mongoose.Types.ObjectId(data.userId),
          },
        },
        // {
        //     "$lookup": {
        //         "from": "tbl_priceList",
        //         "localField": "_id",
        //         "foreignField": "productId",
        //         "as": "packageData"
        //     }
        // },
        {
          $lookup: {
            from: "tbl_priceList",
            let: { id: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$status", 1] },
                      { $eq: ["$productId", "$$id"] },
                    ],
                  },
                },
              },
            ],
            as: "packageData",
          },
        },
        {
          $project: {
            _id: 1,
            userId: 1,
            productName: 1,
            productImage: 1,
            productStatus: 1,
            brandName: 1,
            manufacturer: 1,
            packagingType: 1,
            packagingTypeImg: 1,
            //"assignId": {"$first":"$smartassignData._id"},
            //"smartdata": "$smartassignData",
            packageData: "$packageData",
            // "smartAssignIds": { $ifNull: [ {"$first":"$smartassignData.smartAssignIds"}, [] ] }
          },
        },
        {
          $sort: { _id: -1 },
        },
      ])
      .exec(async (err, result) => {
        if (err || result == null) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          history.previousData = "";
          history.currentData = "";
          var getData = await self.addHistoryDataByUser(history);
          if (getData) {
            let obj = { status: 1, data: result };
            deferred.resolve(obj);
          }
        }
      });
    return deferred.promise;
  },

  smartAssignByadmin: (data, history) => {
    var deferred = Q.defer();
    let [
      offerModeDetails,
      paymentModeDetails,
      UserPackage,
      SmartContract,
      smartAssign,
      newproductModel,
      manageUserPackage,
      scmanager,
    ] = data.schema;
    delete data.schema;
    // smartAssign.findOne({productId: mongoose.Types.ObjectId(data.productId) }, (err, getResult) => {
    //     if (err) {
    //         let obj = { "status": 0, "data": err }
    //         deferred.resolve(obj)
    //     } else {

    SmartContract.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(data.assignId) },
      {
        $set: {
          userId: mongoose.Types.ObjectId(data.userId),
          productId: mongoose.Types.ObjectId(data.productId),
          status: 2,
          smartStatus: 3,
        },
      },
      { new: true, upsert: true },
      async (err, result) => {
        if (err || result == null) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          history.previousData = data;
          history.currentData = result;
          var getData = await self.addHistoryDataByUser(history);
          if (getData) {
            let obj = { status: 1, data: result };
            deferred.resolve(obj);
          }
        }
      }
    );

    //     }
    // });

    return deferred.promise;
  },
  smartAssignList: (data) => {
    var deferred = Q.defer();
    let [
      offerModeDetails,
      paymentModeDetails,
      UserPackage,
      SmartContract,
      smartAssign,
      newproductModel,
      manageUserPackage,
      scmanager,
    ] = data.schema;
    delete data.schema;
    smartAssign
      .aggregate([
        {
          $match: {
            status: 0,
            userId: mongoose.Types.ObjectId(data.userId),
          },
        },
        {
          $unwind: {
            path: "$smartAssignIds",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: "$_id",
            userId: "$userId",
            productId: "$productId",
            smartAssignIds: {
              $toObjectId: "$smartAssignIds",
            },
          },
        },
        {
          $lookup: {
            from: "tbl_user",
            localField: "userId",
            foreignField: "_id",
            as: "userdata",
          },
        },
        {
          $unwind: {
            path: "$userdata",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "tbl_smartcontract_details",
            localField: "smartAssignIds",
            foreignField: "_id",
            as: "smartdata",
          },
        },
        {
          $unwind: {
            path: "$smartdata",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 0,
            assignId: "$_id",
            firstName: "$userdata.firstName",
            lastName: "$userdata.lastName",
            smartId: "$smartdata._id",
            blockChainName: "$smartdata.blockChainName",
            accountAddress: "$smartdata.accountAddress",
            contractAddress: "$smartdata.contractAddress",
            privateKey: "$smartdata.privateKey",
            quickNodeURL: "$smartdata.quickNodeURL",
          },
        },
      ])
      .exec(async (err, result) => {
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
  smartAssignDelete: (data, history) => {
    var deferred = Q.defer();
    let [
      offerModeDetails,
      paymentModeDetails,
      UserPackage,
      SmartContract,
      smartAssign,
      newproductModel,
      manageUserPackage,
      scmanager,
    ] = data.schema;
    delete data.schema;
    SmartContract.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(data.assignId) },
      { $set: { status: 1, userId: "", productId: "", smartStatus: 2 } },
      { new: true },
      async (err, results) => {
        if (err || results == null) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          history.previousData = data;
          history.currentData = "Deleted";
          var getData = await self.addHistoryDataByUser(history);
          if (getData) {
            let obj = {
              status: 1,
              data: "Assign smart contract delete Successfully.",
            };
            deferred.resolve(obj);
          }
        }
      }
    );
    return deferred.promise;
  },
  smartAssignEdit: (data) => {
    var deferred = Q.defer();
    let [
      offerModeDetails,
      paymentModeDetails,
      UserPackage,
      SmartContract,
      smartAssign,
      newproductModel,
      manageUserPackage,
      scmanager,
    ] = data.schema;
    delete data.schema;
    smartAssign.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(data.assignId),
      },
      { $set: { userId: data.userId, smartAssignIds: data.smartAssignIds } },
      { new: true },
      (err, results) => {
        if (err || results == null) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          let obj = { status: 1, data: "Smart Contract Updated Successfully." };
          deferred.resolve(obj);
        }
      }
    );
    return deferred.promise;
  },
  addPackage: (data, fileData, history) => {
    var deferred = Q.defer();
    let [
      offerModeDetails,
      paymentModeDetails,
      UserPackage,
      SmartContract,
      smartAssign,
      newproductModel,
      manageUserPackage,
      scmanager,
    ] = data.schema;
    delete data.schema;
    UserPackage.find(
      {
        status: 1,
        name: data.name,
        userId: mongoose.Types.ObjectId(data.userId),
      },
      (err, result) => {
        if (err || result == null) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          var packageImage = "";
          if (fileData != undefined) {
            packageImage = fileData.filename;
          }

          if (result.length > 0) {
            console.log(packageImage);
            var fullPath = config.media_path + "packageImage/" + packageImage;
            fs.unlink(fullPath, function (exists) {
              let obj = { status: 0, data: "Package already exists" };
              deferred.resolve(obj);
            });
          } else {
            UserPackage.create(
              {
                userId: data.userId,
                packageContent: data.packageContent,
                packageImage: packageImage,
                name: data.name,
                priceUSD: data.priceUSD,
                priceUSDType: data.priceUSDType,
                priceINR: data.priceINR,
              },
              async (err, resultData) => {
                if (err || resultData == null) {
                  let obj = { status: 0, data: err };
                  deferred.resolve(obj);
                } else {
                  history.previousData = "";
                  history.currentData = resultData;
                  var getData = await self.addHistoryDataByUser(history);
                  if (getData) {
                    let obj = { status: 1, data: resultData };
                    deferred.resolve(obj);
                  }
                }
              }
            );
          }
        }
      }
    );

    return deferred.promise;
  },
  addPackage_onerecord: (data, fileData) => {
    var deferred = Q.defer();
    let [
      offerModeDetails,
      paymentModeDetails,
      UserPackage,
      SmartContract,
      smartAssign,
      newproductModel,
      manageUserPackage,
      scmanager,
    ] = data.schema;
    delete data.schema;
    UserPackage.find(
      { status: 1, userId: mongoose.Types.ObjectId(data.userId) },
      (err, result) => {
        if (err || result == null) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          var packageImage = "";
          if (fileData != undefined) {
            packageImage = fileData.filename;
          }
          if (result.length == 0) {
            console.log("packageImage--------", packageImage);

            UserPackage.create(
              {
                userId: data.userId,
                packageContent: data.packageContent,
                packageImage: packageImage,
                name: data.name,
                priceUSD: data.priceUSD,
                priceUSDType: data.priceUSDType,
                priceINR: data.priceINR,
              },
              (err, resultData) => {
                if (err || resultData == null) {
                  let obj = { status: 0, data: err };
                  deferred.resolve(obj);
                } else {
                  let obj = { status: 1, data: resultData };
                  deferred.resolve(obj);
                }
              }
            );
          } else if (result[0].userId == data.userId) {
            console.log(packageImage);
            var fullPath = config.media_path + "packageImage/" + packageImage;
            fs.unlink(fullPath, function (exists) {
              let obj = { status: 0, data: "Package already exists" };
              deferred.resolve(obj);
            });
          }
        }
      }
    );

    return deferred.promise;
  },
  editPackage: async (data, file) => {
    var deferred = Q.defer();
    let [
      offerModeDetails,
      paymentModeDetails,
      UserPackage,
      SmartContract,
      smartAssign,
      newproductModel,
      manageUserPackage,
      scmanager,
    ] = data.schema;
    delete data.schema;

    UserPackage.findOne(
      { status: 1, userId: mongoose.Types.ObjectId(data.userId) },
      {},
      (err, result) => {
        if (result) {
          var previousImage = "";
          var packageImage = "";

          if (typeof file != "undefined" || file != null) {
            if (typeof file != "undefined") {
              if (file.filename) {
                packageImage = file.filename;
                previousImage = result.packageImage;
              }
            }
          } else {
            packageImage = result.packageImage;
          }

          UserPackage.findOneAndUpdate(
            {
              _id: mongoose.Types.ObjectId(data.packageId),
            },
            {
              $set: {
                name: data.name,
                packageContent: data.packageContent,
                packageImage: packageImage,
                serialNumber: data.serialNumber,
                priceUSD: data.priceUSD,
                priceUSDType: data.priceUSDType,
                priceINR: data.priceINR,
              },
            },
            { new: true },
            async (err, results) => {
              if (err || results == null) {
                let obj = { status: 0, data: err };
                deferred.resolve(obj);
              } else {
                if (previousImage) {
                  var fullPath =
                    config.media_path + "packageImage/" + previousImage;
                  fs.unlink(fullPath, function (exists) {
                    let obj = {
                      status: 1,
                      data: "Package updated successfully.",
                    };
                    deferred.resolve(obj);
                  });
                } else {
                  let obj = {
                    status: 1,
                    data: "Package updated successfully.",
                  };
                  deferred.resolve(obj);
                }
              }
            }
          );
        } else {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        }
      }
    );
    return deferred.promise;
  },
  userPackagelist: (userId) => {
    var deferred = Q.defer();
    let [
      offerModeDetails,
      paymentModeDetails,
      UserPackage,
      SmartContract,
      smartAssign,
      newproductModel,
      manageUserPackage,
      scmanager,
    ] = data.schema;
    delete data.schema;
    UserPackage.find(
      { status: 1, userId: mongoose.Types.ObjectId(userId) },
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
  smartlist: (data) => {
    var deferred = Q.defer();
    let [
      offerModeDetails,
      paymentModeDetails,
      UserPackage,
      SmartContract,
      smartAssign,
      newproductModel,
      manageUserPackage,
      scmanager,
    ] = data.schema;
    delete data.schema;

    SmartContract.find({
      userId: mongoose.Types.ObjectId(data.userId),
      status: 1,
    })
      .sort({ _id: -1 })
      .exec(async (err, result) => {
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
  smartadd: (data, history) => {
    var deferred = Q.defer();
    let [
      offerModeDetails,
      paymentModeDetails,
      UserPackage,
      SmartContract,
      smartAssign,
      newproductModel,
      manageUserPackage,
      scmanager,
    ] = data.schema;
    delete data.schema;
    SmartContract.create(data, async (err, result) => {
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
  smartedit: (data) => {
    var deferred = Q.defer();
    let [
      offerModeDetails,
      paymentModeDetails,
      UserPackage,
      SmartContract,
      smartAssign,
      newproductModel,
      manageUserPackage,
      scmanager,
    ] = data.schema;
    delete data.schema;

    SmartContract.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(data.smartId),
      },
      {
        $set: {
          blockChainName: data.blockChainName,
          accountAddress: data.accountAddress,
          contractAddress: data.contractAddress,
          privateKey: data.privateKey,
          quickNodeURL: data.quickNodeURL,
        },
      },
      { new: true },
      async (err, results) => {
        if (err || results == null) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          let obj = { status: 1, data: "Smart Contract Updated Successfully." };
          deferred.resolve(obj);
        }
      }
    );
    return deferred.promise;
  },
  smartdelete: (data, history) => {
    var deferred = Q.defer();
    let [
      offerModeDetails,
      paymentModeDetails,
      UserPackage,
      SmartContract,
      smartAssign,
      newproductModel,
      manageUserPackage,
      scmanager,
    ] = data.schema;
    delete data.schema;
    SmartContract.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(data.smartId) },
      { $set: { status: 0, userId: "", productId: "" } },
      { new: true },
      async (err, results) => {
        if (err || results == null) {
          console.log("sk");
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          let obj = { status: 1, data: "Smart Contract delete Successfully." };
          deferred.resolve(obj);
        }
      }
    );
    return deferred.promise;
  },
  smartUseStatusChange: (data, history) => {
    var deferred = Q.defer();
    let [
      offerModeDetails,
      paymentModeDetails,
      UserPackage,
      SmartContract,
      smartAssign,
      newproductModel,
      manageUserPackage,
      scmanager,
    ] = data.schema;
    delete data.schema;
    SmartContract.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(data.smartId) },
      { $set: { useStatus: data.smartStatusValue } },
      { new: true },
      async (err, results) => {
        if (err || results == null) {
          console.log("sk");
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          let obj = { status: 1, data: "Smart Contract updated." };
          deferred.resolve(obj);
        }
      }
    );
    return deferred.promise;
  },
  offerByProductId: (data, history) => {
    var deferred = Q.defer();
    let [
      offerModeDetails,
      paymentModeDetails,
      UserPackage,
      SmartContract,
      smartAssign,
      newproductModel,
      manageUserPackage,
      scmanager,
    ] = data.schema;
    delete data.schema;
    offerModeDetails
      .find({ status: 1, offerName: data.offerName })
      .exec(async (err, result) => {
        if (err || result == null) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          if (result.length == 0) {
            offerModeDetails.create(data, async (err, result) => {
              if (err || result == null) {
                let obj = { status: 0, data: err };
                deferred.resolve(obj);
              } else {
                history.previousData = "";
                history.currentData = result;
                var getData = await self.addHistoryDataByUser(history);
                if (getData) {
                  let obj = { status: 1, data: result };
                  deferred.resolve(obj);
                } else {
                  let obj = { status: 1, data: result };
                  deferred.resolve(obj);
                }
              }
            });
          } else {
            let obj = { status: 0, data: "offer already exists" };
            deferred.resolve(obj);
          }
        }
      });

    return deferred.promise;
  },
  deleteOfferByProductId: (data, history) => {
    var deferred = Q.defer();
    let [
      offerModeDetails,
      paymentModeDetails,
      UserPackage,
      SmartContract,
      smartAssign,
      newproductModel,
      manageUserPackage,
      scmanager,
    ] = data.schema;
    delete data.schema;
    offerModeDetails.updateOne(
      { _id: mongoose.Types.ObjectId(data.offerId) },
      { $set: { status: 0 } },
      { new: true },
      async (err, result) => {
        if (err || result == null) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          history.previousData = "";
          history.currentData = "Deleted";
          var getData = await self.addHistoryDataByUser(history);
          if (getData) {
            let obj = { status: 1, data: "Offer delete Successfully." };
            deferred.resolve(obj);
          }
        }
      }
    );
    return deferred.promise;
  },
  offerListByProductId: (data) => {
    var deferred = Q.defer();
    let [
      offerModeDetails,
      paymentModeDetails,
      UserPackage,
      SmartContract,
      smartAssign,
      newproductModel,
      manageUserPackage,
      scmanager,
    ] = data.schema;
    delete data.schema;
    newproductModel
      .aggregate([
        {
          $match: {
            userId: mongoose.Types.ObjectId(data.userId),
          },
        },
        {
          $lookup: {
            from: "tbl_offer",
            let: { id: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$status", 1] },
                      { $eq: ["$productId", "$$id"] },
                    ],
                  },
                },
              },
            ],
            as: "offerDetailsData",
          },
        },
        {
          $project: {
            _id: 1,
            userId: 1,
            productName: 1,
            productImage: 1,
            productStatus: 1,
            brandName: 1,
            manufacturer: 1,
            packagingType: 1,
            offerData: "$offerDetailsData",
          },
        },
        {
          $sort: { _id: -1 },
        },
      ])
      .exec(async (err, result) => {
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
  smartDeployList: (data) => {
    var deferred = Q.defer();
    let [
      offerModeDetails,
      paymentModeDetails,
      UserPackage,
      SmartContract,
      smartAssign,
      newproductModel,
      manageUserPackage,
      scmanager,
    ] = data.schema;
    delete data.schema;

    SmartContract.find(
      { userId: mongoose.Types.ObjectId(data.userId), smartStatus: 2 },
      { _id: 1, blockChainName: 1, smartStatus: 1 }
    ).exec(async (err, result) => {
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
});
