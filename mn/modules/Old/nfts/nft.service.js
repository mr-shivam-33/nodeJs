//const userModel = require('./user.model');
const { assignFactotry,getOrder,assignMetaData, generatedUpdateStatus, getNftsArray, getRegisterData, assignContainerToOthersData, ipfsverifydata, getFactoryInfo, saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain, saveNftsReportData, ipfsUpdatedVerify }  = require('./nft.model');
const {ipfsdata, ipfsUpdated}  = require('../fdalabelmetadata/metadata.model');
const {productModel}  = require('../product/product.model');
_ = require('lodash');
const Q = require('q');
const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

let self = module.exports = {

	changeReportStatus: async (data) => {
		var deferred = Q.defer();

		if(data.status == 1 || data.status == "1")
		{

			if(data.verifyByUserId == ""){

				ipfsUpdatedVerify.findOneAndUpdate({"ipfsHash":data.ipfsHash},{ "$set": { "nftVerifyByUserId.$.assignToEmailId": data.assignToEmailId, "nftVerifyByUserId.$.assignToUserType": data.assignToUserType}},{new:true})
				.exec(async (err, result) => {
	
					const delay = n => new Promise(res => setTimeout(res, n));
					saveNftsReportData.find({"ipfsHash":data.ipfsHash, "userId": mongoose.Types.ObjectId(data.userId)}).exec(async (err, result) => {
						if(result.length > 0){
							saveNftsReportData.deleteMany({"ipfsHash":data.ipfsHash, "userId": mongoose.Types.ObjectId(data.userId)}).exec();
						}
					})
					await delay(200); 
					
					saveNftsReportData.find({"ipfsHash":data.ipfsHash}).exec(async (err, newresult) => {
						console.log(newresult.length, "newresult.lengthnewresult.lengthnewresult.lengthnewresult.lengthnewresult.length")
						if(newresult.length == 0){
							ipfsUpdatedVerify.findOneAndUpdate({"ipfsHash":data.ipfsHash},{ "$set": { "nftVerifyUserFlag": 1}},{new:true}).exec();
						}
					})
	
					
					let obj = { "status": 1, "data": {} }
					deferred.resolve(obj);
	
				});
	
			} else {
	
				ipfsUpdatedVerify.findOneAndUpdate({"ipfsHash":data.ipfsHash, "nftVerifyByUserId": {"$elemMatch": {"verifyByUserId": data.verifyByUserId}}},{ "$set": { "nftVerifyByUserId.$.assignToEmailId": data.assignToEmailId, "nftVerifyByUserId.$.assignToUserType": data.assignToUserType}},{new:true})
				.exec(async (err, result) => {
	
					const delay1 = n => new Promise(res => setTimeout(res, n));
					saveNftsReportData.find({"ipfsHash":data.ipfsHash, "userId": mongoose.Types.ObjectId(data.userId)}).exec(async (err, result) => {
						if(result.length > 0){
							saveNftsReportData.deleteMany({"ipfsHash":data.ipfsHash, "userId": mongoose.Types.ObjectId(data.userId)}).exec();
						}
					})
					await delay1(200); 
	
					saveNftsReportData.find({"ipfsHash":data.ipfsHash}).exec(async (err, newresult) => {
						if(newresult.length == 0){
							ipfsUpdatedVerify.findOneAndUpdate({"ipfsHash":data.ipfsHash},{ "$set": { "nftVerifyUserFlag": 1}},{new:true}).exec();
						}
					})
	
					let obj = { "status": 1, "data": {} }
					deferred.resolve(obj);
	
				});
			}

		} else {

			const delay2 = n => new Promise(res => setTimeout(res, n));
			saveNftsReportData.deleteMany({"ipfsHash":data.ipfsHash, "userId": mongoose.Types.ObjectId(data.userId)}).exec();
			await delay2(200);
			
			saveNftsReportData.find({"ipfsHash":data.ipfsHash}).exec(async (err, newresult) => {
				if(newresult.length == 0){
					ipfsUpdatedVerify.findOneAndUpdate({"ipfsHash":data.ipfsHash},{ "$set": { "nftVerifyUserFlag": 1}},{new:true}).exec();
				}
			})

			let obj = { "status": 1, "data": {} }
			deferred.resolve(obj);

		}		
		return deferred.promise;
	},
	getNftsVerifyUserReport: async (data) => {
		var deferred = Q.defer();

		if(data.status == 1 || data.status == "1"){
			var match = {
				$match: {
					"$or": [
						{ 
							"$and": [
								// { "userId": mongoose.Types.ObjectId(data.userId) },
								{ "data.type": data.boxType.toString() },
								{ "fdaId" : mongoose.Types.ObjectId(data.fdaId) },
								// { "userType":  data.userType.toString() }									
							]
						},
						{ 
							"$and": [
								// { "userId": mongoose.Types.ObjectId(data.userId) },
								{ "data.type": data.boxType },
								{ "fdaId" : mongoose.Types.ObjectId(data.fdaId) },
								// { "userType":  data.userType }										
							]
						}
					]				
				}
			}
		} else {
			var match = {
				$match: {
					"ipfsHash": data.ipfsHash
				}
			}
		}

		// console.log(data, "resultresultresult")
		saveNftsReportData.aggregate([
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
								"_id": 1,
								"userId" : "$_id",
								"firstName" : 1,
								"lastName" : 1,
								"email" : 1,
							},
						}
					],
					as: "userDetails",
				},
			},
			{
				"$addFields": {
					"userDetails.nftFlagMsg": "$nftFlagMsg",
					"userDetails.ruserType": "$userType",
					"userDetails.rcreatedDate": "$createdDate",
					"userDetails.rupdateDate": "$updateDate",
					"userDetails.ipfsHash": "$ipfsHash"
				}
			},
			{
				"$project":
				{
					"_id":0,
					"userDetails": "$userDetails"
				}
			},
			{
				$unwind: "$userDetails"
			},
			{ $replaceRoot: { newRoot: { $mergeObjects: [ "$userDetails" ] } } },
			{
				$sort: {
					"_id": -1
				}
			}
		]).exec(async (err, result) => {
			
			if (err) {
				let obj = { "status": 0, "data": err }
				deferred.resolve(obj)
			} 
			else {
				let obj = { "status": 1, "data": result }
				deferred.resolve(obj);
			}
		});

		return deferred.promise;
	},

	getLastOrderByUserId: async (data) => {
		var deferred = Q.defer();
		getOrder.aggregate([
			{
				$match: {
					"userId": mongoose.Types.ObjectId(data.userId)
				}
			},
			{
				$project: {
					"userId": 1,
					"fdalebelId": 1,
					"createdDate": 1
				}
			},
			{
				$sort: {
					"_id": -1
				}
			},
			{
				$limit: 1,
			}
		]).exec(async (err, result) => {
			if (err) {
				let obj = { "status": 0, "data": err }
				deferred.resolve(obj)
			} 
			else {
				if (result.length > 0) {
					let objData = {
						userId: result[0].userId,
						fdaId: result[0].fdalebelId,
						type: "all"
					}
					 let resultReport = await self.getNftsReportAsPerUserId(objData);
					 deferred.resolve(resultReport);
				} else {
					let obj = { "status": 0, "data": [] }
					deferred.resolve(obj)
				}
			}
		});

		return deferred.promise;
	},	
	getContainerDataAsPerUserType: async(data)=> { 
		var deferred = Q.defer();
		// assignContainerToOthersData

		if(data.userType == 3 || data.userType == "3" || data.userType == 4 || data.userType == "4"){
			var newCollection = assignContainerToOthersData
			var matchCollectionKey = {
				$match: {					
					status: 1,
					"fdalebelId": mongoose.Types.ObjectId(data.fdaId),
					"assignContainerToOthersIds": {
						"$elemMatch": {
							"factoryUserId": data.userId
						}
					}				
				}
			}
			var firstProjectCollection = {
				"$project":
				{
					"_id": 0,
					"assignContainerToOthersIds": {
						'$filter': {
                            input: '$assignContainerToOthersIds',
                            as: 'assignContainerToOthersIds',
                            cond: {
								"$eq": [ "$$assignContainerToOthersIds.factoryUserId", data.userId ] 
							}
                        }
					}				
				}
			}

			var secondProjectCollection = {
				"$project":
				{
					"containers": {"$first": "$assignContainerToOthersIds.nftData.containers"},			
					"pallets": {"$first": "$assignContainerToOthersIds.nftData.pallets"},
					"masterCartons": {"$first": "$assignContainerToOthersIds.nftData.masterCartons"},
					"innerCartons": {"$first": "$assignContainerToOthersIds.nftData.innerCartons"},
					"drugs": {"$first": "$assignContainerToOthersIds.nftData.drugs"}
				}
			}

			var palletsCollection = { 
				"$lookup": {
					"from": "tbl_blockChainUpdatedIpfsData",
					"let": { "pallets": "$pallets" },
					"pipeline": [
						{ 
							"$match": {
								"$expr": {
									"$and": [
										{
											"$ne": [ "$nftSaveUserId", ""]
										},
										{
											"$in": [ "$ipfsHash" , "$$pallets" ]
										}
									]
								}
							}
						}    
					],
					"as": "palletsData"
				}
			}

			var masterCartonsCollection = { 
				"$lookup": {
					"from": "tbl_blockChainUpdatedIpfsData",
					"let": { "masterCartons": "$masterCartons" },
					"pipeline": [
						{ 
							"$match": {
								"$expr": {
									"$and": [
										{
											"$ne": [ "$nftSaveUserId", ""]
										},
										{
											"$in": [ "$ipfsHash" , "$$masterCartons" ]
										}
									]
								}
							}
						}  
					],
					"as": "masterCartonsData"
				}
			}
			
			
			var innerCartonsCollection = { 
				"$lookup": {
					"from": "tbl_blockChainUpdatedIpfsData",
					"let": { "innerCartons": "$innerCartons" },
					"pipeline": [
						{ 
							"$match": {
								"$expr": {
									"$and": [
										{
											"$ne": [ "$nftSaveUserId", ""]
										},
										{
											"$in": [ "$ipfsHash" , "$$innerCartons" ]
										}
									]
								}
							}
						}    
					],
					"as": "innerCartonsData"
				}
			}

			var drugsCollection = { 
				"$lookup": {
					"from": "tbl_blockChainUpdatedIpfsData",
					"let": { "drugs": "$drugs" },
					"pipeline": [
						{ 
							"$match": {
								"$expr": {
									"$and": [
										{
											"$ne": [ "$nftSaveUserId", ""]
										},
										{
											"$in": [ "$ipfsHash" , "$$drugs" ]
										}
									]
								}
							}
						}    
					],
					"as": "drugsData"
				}
			}
			
		} else {
			var newCollection = getNftsArray
			var matchCollectionKey = {
				$match: {					
					status: 1,
					"fdalebelId": mongoose.Types.ObjectId(data.fdaId),
					"assignContainerByFactoryIds": {
						"$elemMatch": {
							"factoryId": data.userId
						}
					}				
				}
			}
			var firstProjectCollection = {
				"$project":
				{
					"_id": 0,
					"assignContainerByFactoryIds": {
						'$filter': {
                            input: '$assignContainerByFactoryIds',
                            as: 'assignContainerByFactoryIds',
                            cond: {
								"$eq": [ "$$assignContainerByFactoryIds.factoryId", data.userId ] 
							}
                        }
					}				
				}
			}

			var secondProjectCollection = {
				"$project":
				{
					"containers": {"$first": "$assignContainerByFactoryIds.nftData.containers"},			
					"pallets": {"$first": "$assignContainerByFactoryIds.nftData.pallets"},
					"masterCartons": {"$first": "$assignContainerByFactoryIds.nftData.masterCartons"},
					"innerCartons": {"$first": "$assignContainerByFactoryIds.nftData.innerCartons"},
					"drugs": {"$first": "$assignContainerByFactoryIds.nftData.drugs"}
				}
			}

			var palletsCollection = { 
				"$lookup": {
					"from": "tbl_blockChainUpdatedIpfsData",
					"let": { "pallets": "$pallets" },
					"pipeline": [
						{ 
							"$match": {
								"$expr": {
									"$in": [ "$ipfsHash" , "$$pallets" ]
								}
							}
						}    
					],
					"as": "palletsData"
				}
			}

			var masterCartonsCollection = { 
				"$lookup": {
					"from": "tbl_blockChainUpdatedIpfsData",
					"let": { "masterCartons": "$masterCartons" },
					"pipeline": [
						{ 
							"$match": {
								"$expr": {
									"$in": [ "$ipfsHash" , "$$masterCartons" ]
								}
							}
						}    
					],
					"as": "masterCartonsData"
				}
			}

			var innerCartonsCollection = { 
				"$lookup": {
					"from": "tbl_blockChainUpdatedIpfsData",
					"let": { "innerCartons": "$innerCartons" },
					"pipeline": [
						{ 
							"$match": {
								"$expr": {
									"$in": [ "$ipfsHash" , "$$innerCartons" ]
								}
							}
						}    
					],
					"as": "innerCartonsData"
				}
			}

			var drugsCollection = { 
				"$lookup": {
					"from": "tbl_blockChainUpdatedIpfsData",
					"let": { "drugs": "$drugs" },
					"pipeline": [
						{ 
							"$match": {
								"$expr": {
									"$in": [ "$ipfsHash" , "$$drugs" ]
								}
							}
						}    
					],
					"as": "drugsData"
				}
			}
		}


		
		
		newCollection.aggregate([          
			matchCollectionKey,
			firstProjectCollection,
			secondProjectCollection,
			{
				"$project":
				{
					"containers": "$containers.ipfsHash",			
					"pallets": "$pallets.ipfsHash",
					"masterCartons": "$masterCartons.ipfsHash",
					"innerCartons": "$innerCartons.ipfsHash",
					"drugs": "$drugs.ipfsHash",
				}
			},
			{ 
				"$lookup": {
					"from": "tbl_blockChainUpdatedIpfsData",
					"let": { "containers": "$containers" },
					"pipeline": [
						{ 
							"$match": {
								"$expr": {
									"$in": [ "$ipfsHash" , "$$containers" ]
								}
							}
						}    
					],
					"as": "containersData"
				}
			},
			palletsCollection,
			masterCartonsCollection,
			innerCartonsCollection,
			drugsCollection,
			{
				"$project":
				{
					"containersData": 1,			
					"palletsData": 1,
					"masterCartonsData": 1,
					"innerCartonsData": 1,
					"drugsData": 1,
				}
			},
			{
				$project: {
					all: { $concatArrays: ["$containersData","$palletsData","$masterCartonsData","$innerCartonsData","$drugsData"] }
				}
			},
			{
				$unwind: "$all"
			},
			{ $replaceRoot: { newRoot: { $mergeObjects: [ "$all" ] } } },
			{$set: {nftBurnByUserId: {$convert: {input: '$nftBurnByUserId', to : 'objectId', onError: '',onNull: ''}}, nftSaveUserId: {$convert: {input: '$nftSaveUserId', to : 'objectId', onError: '',onNull: ''}} }},
			{
				$lookup: {
					from: "tbl_user",
					localField: "nftBurnByUserId",
					foreignField: "_id",
					as: "nftBurnByUserIdDetails"
				}
			},
			{
				$lookup: {
					from: "tbl_user",
					localField: "nftSaveUserId",
					foreignField: "_id",
					as: "nftSaveUserIdDetails"
				}
			},
			{
				"$addFields": {
					"customProductId": {
						"$toObjectId": "$data.productId"
					}
				}
			},
			{
				$lookup: {
					from: "tbl_products",
					localField: "customProductId",
					foreignField: "_id",
					as: "productDetails"
				}
			},
			{
				"$addFields": {
					"convertVerifyByUserId": {
						"$toObjectId": {
							"$first": "$nftVerifyByUserId.verifyByUserId"
						}
					}
				}
			},
			{
				$lookup: {
					from: "tbl_user",
					localField: "convertVerifyByUserId",
					foreignField: "_id",
					as: "nftVerifyByUserIdDetails"
				}
			},
			{
				$lookup: {
					from: "tbl_save_nfts_reports",
					localField: "ipfsHash",
					foreignField: "ipfsHash",
					as: "nftVerifyUserFlagDetails"
				}
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

					nftVerifyLocation: { "$ifNull": [ "$nftVerifyLocation", "" ] },
					nftBurnLocation: { "$ifNull": [ "$nftBurnLocation", "" ] },
					nftSaveLocation: { "$ifNull": [ "$nftSaveLocation", "" ] },
                }
            },
			{
				$lookup: {
					from: "tbl_user",
					localField: "nftVerifyUserFlagDetails.userId",
					foreignField: "_id",
					as: "userDetails"
				}
			},
		]).exec(async (err, result) => {

			if (err) {
				let obj = {"status":0,"data":err}
				deferred.resolve(obj)
			} else {

				
				var containersPushData = []
				var palletsPushData = []
				var mastersCartonsPushData = []
				var innerCartonsPushData = []
				var drugsPushData = []
				result.filter((item)=>{					
					if(item.data.type == "containers"){
						containersPushData.push(item)						
					} else if(item.data.type == "pallets"){
						palletsPushData.push(item)
					} else if(item.data.type == "masterCartons"){
						mastersCartonsPushData.push(item)
					} else if(item.data.type == "innerCartons"){
						innerCartonsPushData.push(item)
					} else {
						drugsPushData.push(item)
					}
				});
				
				if(data.type == "all"){				
					var obj = {
					"status":1,
						"data":{

							"newprductDetails": (containersPushData.length > 0) ? containersPushData[0].productDetails : [],

							"containers": { "quantity": containersPushData.length, "burned": _.filter(containersPushData, {"status": 3}).length, verified: _.filter(containersPushData, {"status": 2}).length, balance: _.filter(containersPushData, {"status": 1}).length, nftsFlag: containersPushData},

							"pallets": { "quantity": palletsPushData.length, "burned": _.filter(palletsPushData, {"status": 3}).length, verified: _.filter(palletsPushData, {"status": 2}).length, balance: _.filter(palletsPushData, {"status": 1}).length, nftsFlag: palletsPushData},

							"masterCartons": { "quantity": mastersCartonsPushData.length, "burned": _.filter(mastersCartonsPushData, {"status": 3}).length, verified: _.filter(mastersCartonsPushData, {"status": 2}).length, balance: _.filter(mastersCartonsPushData, {"status": 1}).length, nftsFlag: mastersCartonsPushData},

							"innerCartons": { "quantity": innerCartonsPushData.length, "burned": _.filter(innerCartonsPushData, {"status": 3}).length, verified: _.filter(innerCartonsPushData, {"status": 2}).length, balance: _.filter(innerCartonsPushData, {"status": 1}).length, nftsFlag: innerCartonsPushData},

							"drugs": { "quantity": drugsPushData.length, "burned": _.filter(drugsPushData, {"status": 3}).length, verified: _.filter(drugsPushData, {"status": 2}).length, balance: _.filter(drugsPushData, {"status": 1}).length, nftsFlag: drugsPushData}

						}
					}
				} else if(data.type == "containers"){
					var obj = {
						"status":1,
						"data":{
							"newprductDetails": (containersPushData.length > 0) ? containersPushData[0].productDetails : [],
							"containers": containersPushData
						}
					}
				} else if(data.type == "pallets"){	
					var obj = {
						"status":1,
						"data":{
							"newprductDetails": (palletsPushData.length > 0) ? palletsPushData[0].productDetails : [],
							"pallets": palletsPushData
						}
					}
				} else if(data.type == "masterCartons"){	
					var obj = {
						"status":1,
						"data":{
							"newprductDetails": (mastersCartonsPushData.length > 0) ? mastersCartonsPushData[0].productDetails : [],
							"masterCartons": mastersCartonsPushData
						}
					}
				} else if(data.type == "innerCartons"){	
					var obj = {
						"status":1,
						"data":{
							"newprductDetails": (innerCartonsPushData.length > 0) ? innerCartonsPushData[0].productDetails : [],
							"innerCartons": innerCartonsPushData
						}
					}
				} else {
					var obj = {
						"status":1,
						"data":{
							"newprductDetails": (drugsPushData.length > 0) ? drugsPushData[0].productDetails : [],
							"drugs": drugsPushData
						}
					}
				}
				deferred.resolve(obj)
				
			}
		});
	
		return deferred.promise;	
	},
	getIpfsDataAsPerType: async(data)=> { 
		var deferred = Q.defer();		
		// saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain
		
		if(data.type == 'pallets'){
			
			saveNftsPalletsInChain.aggregate([          
			{
				$match: {
					"containerIpfs":data.ipfsHash
				}
			},
			{$set: {nftBurnByUserId: {$convert: {input: '$nftBurnByUserId', to : 'objectId', onError: '',onNull: ''}}, nftSaveUserId: {$convert: {input: '$nftSaveUserId', to : 'objectId', onError: '',onNull: ''}} }},
			{
				$lookup: {
					from: "tbl_user",
					localField: "nftBurnByUserId",
					foreignField: "_id",
					as: "nftBurnByUserIdDetails"
				}
			},
			{
				$lookup: {
					from: "tbl_blockChainUpdatedIpfsData",
					localField: "ipfsHash",
					foreignField: "ipfsHash",
					as: "blockChainIpfsData"
				}
			},
			{
				"$addFields": {
					"customProductId": {
						"$toObjectId": "$data.productId"
					}
				}
			},
			{
				$lookup: {
					from: "tbl_products",
					localField: "customProductId",
					foreignField: "_id",
					as: "productDetails"
				}
			},
			{
                $project: {
                    "_id": 1,
                    "userId": 1,
                    "ipfsHash": 1,
                    "nftTokenId": 1,
                    "nftBurnByUserId": 1,
					"nftBurnByUserIdDate": {"$first": "$blockChainIpfsData.nftBurnByUserIdDate"},					
                    "nftSaveUserId": {
						"$toObjectId": {"$first": "$blockChainIpfsData.nftSaveUserId"}
					},
					"nftSaveUserIdDate": {"$first": "$blockChainIpfsData.nftSaveUserIdDate"},
                    "status": {"$first": "$blockChainIpfsData.status"},                    
                    "nftVerifyByUserId": {"$first": "$blockChainIpfsData.nftVerifyByUserId"},
                    "nftVerifyByUserIdDate": {"$first": "$blockChainIpfsData.nftVerifyByUserIdDate"},                    
                    "nftBurnTransactionHash": {"$first": "$blockChainIpfsData.nftBurnTransactionHash"},					
                    "nftTransactionHash": 1,
                    "fdaId": 1,
                    "data": 1,
                    "createdDate": 1,
                    "updateDate": 1,
                    "userType": 1,
                    "nftBurnByUserIdDetails": 1,
					"newprductDetails": "$productDetails",

					"nftVerifyLocation": { "$ifNull": [ {"$first": "$blockChainIpfsData.nftVerifyLocation"}, "" ] },
					"nftBurnLocation": { "$ifNull": [ {"$first": "$blockChainIpfsData.nftBurnLocation"}, "" ] },
					"nftSaveLocation": { "$ifNull": [ {"$first": "$blockChainIpfsData.nftSaveLocation"}, "" ] },
                }
            },
			{
				$lookup: {
					from: "tbl_user",
					localField: "nftSaveUserId",
					foreignField: "_id",
					as: "nftSaveUserIdDetails"
				}
			},
			{
				"$addFields": {
					"convertVerifyByUserId": {
						"$toObjectId": {
							"$first": "$nftVerifyByUserId.verifyByUserId"
						}
					}
				}
			},
			{
				$lookup: {
					from: "tbl_user",
					localField: "convertVerifyByUserId",
					foreignField: "_id",
					as: "nftVerifyByUserIdDetails"
				}
			},
			{
                $project: {
                    "_id": 1,
                    "userId": 1,
                    "ipfsHash": 1,
                    "nftTokenId": 1,
                    "nftBurnByUserId": 1,					
                    "nftSaveUserId": 1,
					"nftSaveUserIdDetails":1,
                    "status": 1,
                    "nftSaveUserIdDate": 1,
                    "nftVerifyByUserId": 1,
                    "nftVerifyByUserIdDate": 1,
                    "nftBurnByUserIdDate": 1,
                    "nftBurnTransactionHash": 1,					
                    "nftTransactionHash": 1,
                    "fdaId": 1,
                    "data": 1,
                    "createdDate": 1,
                    "updateDate": 1,
                    "userType": 1,
                    "nftBurnByUserIdDetails": 1,
					"newprductDetails": "$productDetails",
					"nftVerifyByUserIdDetails": "$nftVerifyByUserIdDetails",

					"nftVerifyLocation": 1,
					"nftBurnLocation": 1,
					"nftSaveLocation": 1,
                }
            },
			]).exec(async (err, result) => {
				
				if (err) {
					let obj = {"status":0,"data":err}
					deferred.resolve(obj)
				} else {
					
					let obj = {"status":1,"data":result}
					deferred.resolve(obj)
					
				}
			});
		
		} else if(data.type == 'masterCartons'){
			
			saveNftsMastersInChain.aggregate([          
			{
				$match: {
					"palletIpfs":data.ipfsHash
				}
			},
			{$set: {nftBurnByUserId: {$convert: {input: '$nftBurnByUserId', to : 'objectId', onError: '',onNull: ''}}, nftSaveUserId: {$convert: {input: '$nftSaveUserId', to : 'objectId', onError: '',onNull: ''}} }},
			{
				$lookup: {
					from: "tbl_user",
					localField: "nftBurnByUserId",
					foreignField: "_id",
					as: "nftBurnByUserIdDetails"
				}
			},
			{
				$lookup: {
					from: "tbl_user",
					localField: "nftSaveUserId",
					foreignField: "_id",
					as: "nftSaveUserIdDetails"
				}
			},
			{
				$lookup: {
					from: "tbl_blockChainUpdatedIpfsData",
					localField: "ipfsHash",
					foreignField: "ipfsHash",
					as: "blockChainIpfsData"
				}
			},
			{
				"$addFields": {
					"customProductId": {
						"$toObjectId": "$data.productId"
					}
				}
			},
			{
				$lookup: {
					from: "tbl_products",
					localField: "customProductId",
					foreignField: "_id",
					as: "productDetails"
				}
			},
			{
                $project: {
                    "_id": 1,
                    "userId": 1,
                    "ipfsHash": 1,
                    "nftTokenId": 1,
                    "nftBurnByUserId": 1,					
                    "nftSaveUserId": {"$first": "$blockChainIpfsData.nftSaveUserId"},
                    "status": {"$first": "$blockChainIpfsData.status"},
                    "nftSaveUserIdDate": {"$first": "$blockChainIpfsData.nftSaveUserIdDate"},
                    "nftVerifyByUserId": {"$first": "$blockChainIpfsData.nftVerifyByUserId"},
                    "nftVerifyByUserIdDate": {"$first": "$blockChainIpfsData.nftVerifyByUserIdDate"},
                    "nftBurnByUserIdDate": {"$first": "$blockChainIpfsData.nftBurnByUserIdDate"},
                    "nftBurnTransactionHash": {"$first": "$blockChainIpfsData.nftBurnTransactionHash"},
                    "nftVerifyByUserId": {"$first": "$blockChainIpfsData.nftVerifyByUserId"},					
                    "nftTransactionHash": 1,
                    "fdaId": 1,
                    "data": 1,
                    "createdDate": 1,
                    "updateDate": 1,
                    "userType": 1,
                    "nftBurnByUserIdDetails": 1,
					"newprductDetails": "$productDetails",
					"nftSaveUserIdDetails":1,

					"nftVerifyLocation": { "$ifNull": [ {"$first": "$blockChainIpfsData.nftVerifyLocation"}, "" ] },
					"nftBurnLocation": { "$ifNull": [ {"$first": "$blockChainIpfsData.nftBurnLocation"}, "" ] },
					"nftSaveLocation": { "$ifNull": [ {"$first": "$blockChainIpfsData.nftSaveLocation"}, "" ] },
                }
            },
			{
				"$addFields": {
					"convertVerifyByUserId": {
						"$toObjectId": {
							"$first": "$nftVerifyByUserId.verifyByUserId"
						}
					}
				}
			},
			{
				$lookup: {
					from: "tbl_user",
					localField: "convertVerifyByUserId",
					foreignField: "_id",
					as: "nftVerifyByUserIdDetails"
				}
			},
			{
                $project: {
                    "_id": 1,
                    "userId": 1,
                    "ipfsHash": 1,
                    "nftTokenId": 1,
                    "nftBurnByUserId": 1,					
                    "nftSaveUserId": 1,
					"nftSaveUserIdDetails":1,
                    "status": 1,
                    "nftSaveUserIdDate": 1,
                    "nftVerifyByUserId": 1,
                    "nftVerifyByUserIdDate": 1,
                    "nftBurnByUserIdDate": 1,
                    "nftBurnTransactionHash": 1,					
                    "nftTransactionHash": 1,
                    "fdaId": 1,
                    "data": 1,
                    "createdDate": 1,
                    "updateDate": 1,
                    "userType": 1,
                    "nftBurnByUserIdDetails": 1,
					"newprductDetails": "$productDetails",
					"nftVerifyByUserIdDetails": "$nftVerifyByUserIdDetails",

					"nftVerifyLocation": 1,
					"nftBurnLocation": 1,
					"nftSaveLocation": 1,
                }
            },
			]).exec(async (err, result) => {
				
				if (err) {
					let obj = {"status":0,"data":err}
					deferred.resolve(obj)
				} else {
					
					let obj = {"status":1,"data":result}
					deferred.resolve(obj)
					
				}
			});
			
		} else if(data.type == 'innerCartons'){
			
			saveNftsInnersDataInChain.aggregate([          
			{
				$match: {
					"masterCartoonsIpfs":data.ipfsHash
				}
			},
			{$set: {nftBurnByUserId: {$convert: {input: '$nftBurnByUserId', to : 'objectId', onError: '',onNull: ''}}, nftSaveUserId: {$convert: {input: '$nftSaveUserId', to : 'objectId', onError: '',onNull: ''}} }},
			{
				$lookup: {
					from: "tbl_user",
					localField: "nftBurnByUserId",
					foreignField: "_id",
					as: "nftBurnByUserIdDetails"
				}
			},
			{
				$lookup: {
					from: "tbl_user",
					localField: "nftSaveUserId",
					foreignField: "_id",
					as: "nftSaveUserIdDetails"
				}
			},
			{
				$lookup: {
					from: "tbl_blockChainUpdatedIpfsData",
					localField: "ipfsHash",
					foreignField: "ipfsHash",
					as: "blockChainIpfsData"
				}
			},
			{
				"$addFields": {
					"customProductId": {
						"$toObjectId": "$data.productId"
					}
				}
			},
			{
				$lookup: {
					from: "tbl_products",
					localField: "customProductId",
					foreignField: "_id",
					as: "productDetails"
				}
			},
			{
                $project: {
                    "_id": 1,
                    "userId": 1,
                    "ipfsHash": 1,
                    "nftTokenId": 1,
                    "nftBurnByUserId": 1,					
                    "nftSaveUserId": {"$first": "$blockChainIpfsData.nftSaveUserId"},
                    "status": {"$first": "$blockChainIpfsData.status"},
                    "nftSaveUserIdDate": {"$first": "$blockChainIpfsData.nftSaveUserIdDate"},
                    "nftVerifyByUserId": {"$first": "$blockChainIpfsData.nftVerifyByUserId"},
                    "nftVerifyByUserIdDate": {"$first": "$blockChainIpfsData.nftVerifyByUserIdDate"},
                    "nftBurnByUserIdDate": {"$first": "$blockChainIpfsData.nftBurnByUserIdDate"},
                    "nftBurnTransactionHash": {"$first": "$blockChainIpfsData.nftBurnTransactionHash"},
                    "nftVerifyByUserId": {"$first": "$blockChainIpfsData.nftVerifyByUserId"},					
                    "nftTransactionHash": 1,
                    "fdaId": 1,
                    "data": 1,
                    "createdDate": 1,
                    "updateDate": 1,
                    "userType": 1,
                    "nftBurnByUserIdDetails": 1,
					"newprductDetails": "$productDetails",
					"nftSaveUserIdDetails":1,

					"nftVerifyLocation": { "$ifNull": [ {"$first": "$blockChainIpfsData.nftVerifyLocation"}, "" ] },
					"nftBurnLocation": { "$ifNull": [ {"$first": "$blockChainIpfsData.nftBurnLocation"}, "" ] },
					"nftSaveLocation": { "$ifNull": [ {"$first": "$blockChainIpfsData.nftSaveLocation"}, "" ] },
                }
            },
			{
				"$addFields": {
					"convertVerifyByUserId": {
						"$toObjectId": {
							"$first": "$nftVerifyByUserId.verifyByUserId"
						}
					}
				}
			},
			{
				$lookup: {
					from: "tbl_user",
					localField: "convertVerifyByUserId",
					foreignField: "_id",
					as: "nftVerifyByUserIdDetails"
				}
			},
			{
                $project: {
                    "_id": 1,
                    "userId": 1,
                    "ipfsHash": 1,
                    "nftTokenId": 1,
                    "nftBurnByUserId": 1,					
                    "nftSaveUserId": 1,
					"nftSaveUserIdDetails":1,
                    "status": 1,
                    "nftSaveUserIdDate": 1,
                    "nftVerifyByUserId": 1,
                    "nftVerifyByUserIdDate": 1,
                    "nftBurnByUserIdDate": 1,
                    "nftBurnTransactionHash": 1,					
                    "nftTransactionHash": 1,
                    "fdaId": 1,
                    "data": 1,
                    "createdDate": 1,
                    "updateDate": 1,
                    "userType": 1,
                    "nftBurnByUserIdDetails": 1,
					"newprductDetails": "$productDetails",
					"nftVerifyByUserIdDetails": "$nftVerifyByUserIdDetails",

					"nftVerifyLocation": 1,
					"nftBurnLocation": 1,
					"nftSaveLocation": 1,
                }
            },
			]).exec(async (err, result) => {
				
				if (err) {
					let obj = {"status":0,"data":err}
					deferred.resolve(obj)
				} else {
					
					let obj = {"status":1,"data":result}
					deferred.resolve(obj)
					
				}
			});
			
		} else {
			
			saveNftsDrugsDataInChain.aggregate([          
			{
				$match: {
					"innerCartonsIpfs":data.ipfsHash
				}
			},
			{$set: {nftBurnByUserId: {$convert: {input: '$nftBurnByUserId', to : 'objectId', onError: '',onNull: ''}}, nftSaveUserId: {$convert: {input: '$nftSaveUserId', to : 'objectId', onError: '',onNull: ''}} }},
			{
				$lookup: {
					from: "tbl_user",
					localField: "nftBurnByUserId",
					foreignField: "_id",
					as: "nftBurnByUserIdDetails"
				}
			},
			{
				$lookup: {
					from: "tbl_user",
					localField: "nftSaveUserId",
					foreignField: "_id",
					as: "nftSaveUserIdDetails"
				}
			},
			{
				$lookup: {
					from: "tbl_blockChainUpdatedIpfsData",
					localField: "ipfsHash",
					foreignField: "ipfsHash",
					as: "blockChainIpfsData"
				}
			},
			{
				"$addFields": {
					"customProductId": {
						"$toObjectId": "$data.productId"
					}
				}
			},
			{
				$lookup: {
					from: "tbl_products",
					localField: "customProductId",
					foreignField: "_id",
					as: "productDetails"
				}
			},
			{
                $project: {
                    "_id": 1,
                    "userId": 1,
                    "ipfsHash": 1,
                    "nftTokenId": 1,
                    "nftBurnByUserId": 1,					
                    "nftSaveUserId": {"$first": "$blockChainIpfsData.nftSaveUserId"},
                    "status": {"$first": "$blockChainIpfsData.status"},
                    "nftSaveUserIdDate": {"$first": "$blockChainIpfsData.nftSaveUserIdDate"},
                    "nftVerifyByUserId": {"$first": "$blockChainIpfsData.nftVerifyByUserId"},
                    "nftVerifyByUserIdDate": {"$first": "$blockChainIpfsData.nftVerifyByUserIdDate"},
                    "nftBurnByUserIdDate": {"$first": "$blockChainIpfsData.nftBurnByUserIdDate"},
                    "nftBurnTransactionHash": {"$first": "$blockChainIpfsData.nftBurnTransactionHash"},
                    "nftVerifyByUserId": {"$first": "$blockChainIpfsData.nftVerifyByUserId"},					
                    "nftTransactionHash": 1,
                    "fdaId": 1,
                    "data": 1,
                    "createdDate": 1,
                    "updateDate": 1,
                    "userType": 1,
                    "nftBurnByUserIdDetails": 1,
					"newprductDetails": "$productDetails",
					"nftSaveUserIdDetails":1,

					"nftVerifyLocation": { "$ifNull": [ {"$first": "$blockChainIpfsData.nftVerifyLocation"}, "" ] },
					"nftBurnLocation": { "$ifNull": [ {"$first": "$blockChainIpfsData.nftBurnLocation"}, "" ] },
					"nftSaveLocation": { "$ifNull": [ {"$first": "$blockChainIpfsData.nftSaveLocation"}, "" ] },
                }
            },
			{
				"$addFields": {
					"convertVerifyByUserId": {
						"$toObjectId": {
							"$first": "$nftVerifyByUserId.verifyByUserId"
						}
					}
				}
			},
			{
				$lookup: {
					from: "tbl_user",
					localField: "convertVerifyByUserId",
					foreignField: "_id",
					as: "nftVerifyByUserIdDetails"
				}
			},
			{
                $project: {
                    "_id": 1,
                    "userId": 1,
                    "ipfsHash": 1,
                    "nftTokenId": 1,
                    "nftBurnByUserId": 1,					
                    "nftSaveUserId": 1,
					"nftSaveUserIdDetails":1,
                    "status": 1,
                    "nftSaveUserIdDate": 1,
                    "nftVerifyByUserId": 1,
                    "nftVerifyByUserIdDate": 1,
                    "nftBurnByUserIdDate": 1,
                    "nftBurnTransactionHash": 1,					
                    "nftTransactionHash": 1,
                    "fdaId": 1,
                    "data": 1,
                    "createdDate": 1,
                    "updateDate": 1,
                    "userType": 1,
                    "nftBurnByUserIdDetails": 1,
					"newprductDetails": "$productDetails",
					"nftVerifyByUserIdDetails": "$nftVerifyByUserIdDetails",

					"nftVerifyLocation": 1,
					"nftBurnLocation": 1,
					"nftSaveLocation": 1,
                }
            },
			]).exec(async (err, result) => {
				
				if (err) {
					let obj = {"status":0,"data":err}
					deferred.resolve(obj)
				} else {
					
					let obj = {"status":1,"data":result}
					deferred.resolve(obj)
					
				}
			});
		}		
		return deferred.promise;		
	},
	getIpfsDataAsPerType_30_11: async(data)=> { 
		var deferred = Q.defer();
		
		// saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain
		
		if(data.type == 'pallets'){
			
			saveNftsPalletsInChain.aggregate([          
			{
				$match: {
					"containerIpfs":data.ipfsHash
				}
			},
			{$set: {nftBurnByUserId: {$convert: {input: '$nftBurnByUserId', to : 'objectId', onError: '',onNull: ''}}, nftSaveUserId: {$convert: {input: '$nftSaveUserId', to : 'objectId', onError: '',onNull: ''}} }},
			{
				$lookup: {
					from: "tbl_user",
					localField: "nftBurnByUserId",
					foreignField: "_id",
					as: "nftBurnByUserIdDetails"
				}
			},
			{
				$lookup: {
					from: "tbl_user",
					localField: "nftSaveUserId",
					foreignField: "_id",
					as: "nftSaveUserIdDetails"
				}
			},
			{
				$lookup: {
					from: "tbl_blockChainIpfsData",
					localField: "ipfsHash",
					foreignField: "ipfsHash",
					as: "blockChainIpfsData"
				}
			},
			{
				"$addFields": {
					"customProductId": {
						"$toObjectId": "$data.productId"
					}
				}
			},
			{
				$lookup: {
					from: "tbl_products",
					localField: "customProductId",
					foreignField: "_id",
					as: "productDetails"
				}
			},
			{
                $project: {
                    "_id": 1,
                    "userId": 1,
                    "ipfsHash": 1,
                    "nftTokenId": 1,
                    "nftBurnByUserId": 1,					
                    "nftSaveUserId": {"$first": "$blockChainIpfsData.nftSaveUserId"},
                    "status": {"$first": "$blockChainIpfsData.status"},
                    "nftSaveUserIdDate": {"$first": "$blockChainIpfsData.nftSaveUserIdDate"},
                    "nftVerifyByUserId": {"$first": "$blockChainIpfsData.nftVerifyByUserId"},
                    "nftVerifyByUserIdDate": {"$first": "$blockChainIpfsData.nftVerifyByUserIdDate"},
                    "nftBurnByUserIdDate": {"$first": "$blockChainIpfsData.nftBurnByUserIdDate"},
                    "nftBurnTransactionHash": {"$first": "$blockChainIpfsData.nftBurnTransactionHash"},					
                    "nftTransactionHash": 1,
                    "fdaId": 1,
                    "data": 1,
                    "createdDate": 1,
                    "updateDate": 1,
                    "userType": 1,
                    "nftBurnByUserIdDetails": 1,
					"newprductDetails": "$productDetails",
                }
            },
			{
				"$addFields": {
					"convertVerifyByUserId": {
						"$toObjectId": {
							"$first": "$nftVerifyByUserId.verifyByUserId"
						}
					}
				}
			},
			{
				$lookup: {
					from: "tbl_user",
					localField: "convertVerifyByUserId",
					foreignField: "_id",
					as: "nftVerifyByUserIdDetails"
				}
			},
			{
                $project: {
                    "_id": 1,
                    "userId": 1,
                    "ipfsHash": 1,
                    "nftTokenId": 1,
                    "nftBurnByUserId": 1,					
                    "nftSaveUserId": 1,
                    "status": 1,
                    "nftSaveUserIdDate": 1,
                    "nftVerifyByUserId": 1,
                    "nftVerifyByUserIdDate": 1,
                    "nftBurnByUserIdDate": 1,
                    "nftBurnTransactionHash": 1,					
                    "nftTransactionHash": 1,
                    "fdaId": 1,
                    "data": 1,
                    "createdDate": 1,
                    "updateDate": 1,
                    "userType": 1,
                    "nftBurnByUserIdDetails": 1,
					"newprductDetails": "$productDetails",
					"nftVerifyByUserIdDetails": "$nftVerifyByUserIdDetails",
                }
            },
			]).exec(async (err, result) => {
				
				if (err) {
					let obj = {"status":0,"data":err}
					deferred.resolve(obj)
				} else {
					
					let obj = {"status":1,"data":result}
					deferred.resolve(obj)
					
				}
			});
		
		} else if(data.type == 'masterCartons'){
			
			saveNftsMastersInChain.aggregate([          
			{
				$match: {
					"palletIpfs":data.ipfsHash
				}
			},
			{$set: {nftBurnByUserId: {$convert: {input: '$nftBurnByUserId', to : 'objectId', onError: '',onNull: ''}}, nftSaveUserId: {$convert: {input: '$nftSaveUserId', to : 'objectId', onError: '',onNull: ''}} }},
			{
				$lookup: {
					from: "tbl_user",
					localField: "nftBurnByUserId",
					foreignField: "_id",
					as: "nftBurnByUserIdDetails"
				}
			},
			{
				$lookup: {
					from: "tbl_user",
					localField: "nftSaveUserId",
					foreignField: "_id",
					as: "nftSaveUserIdDetails"
				}
			},
			{
				$lookup: {
					from: "tbl_blockChainIpfsData",
					localField: "ipfsHash",
					foreignField: "ipfsHash",
					as: "blockChainIpfsData"
				}
			},
			{
				"$addFields": {
					"customProductId": {
						"$toObjectId": "$data.productId"
					}
				}
			},
			{
				$lookup: {
					from: "tbl_products",
					localField: "customProductId",
					foreignField: "_id",
					as: "productDetails"
				}
			},
			{
                $project: {
                    "_id": 1,
                    "userId": 1,
                    "ipfsHash": 1,
                    "nftTokenId": 1,
                    "nftBurnByUserId": 1,					
                    "nftSaveUserId": {"$first": "$blockChainIpfsData.nftSaveUserId"},
                    "status": {"$first": "$blockChainIpfsData.status"},
                    "nftSaveUserIdDate": {"$first": "$blockChainIpfsData.nftSaveUserIdDate"},
                    "nftVerifyByUserId": {"$first": "$blockChainIpfsData.nftVerifyByUserId"},
                    "nftVerifyByUserIdDate": {"$first": "$blockChainIpfsData.nftVerifyByUserIdDate"},
                    "nftBurnByUserIdDate": {"$first": "$blockChainIpfsData.nftBurnByUserIdDate"},
                    "nftBurnTransactionHash": {"$first": "$blockChainIpfsData.nftBurnTransactionHash"},
                    "nftVerifyByUserId": {"$first": "$blockChainIpfsData.nftVerifyByUserId"},					
                    "nftTransactionHash": 1,
                    "fdaId": 1,
                    "data": 1,
                    "createdDate": 1,
                    "updateDate": 1,
                    "userType": 1,
                    "nftBurnByUserIdDetails": 1,
					"newprductDetails": "$productDetails",
                }
            },
			{
				"$addFields": {
					"convertVerifyByUserId": {
						"$toObjectId": {
							"$first": "$nftVerifyByUserId.verifyByUserId"
						}
					}
				}
			},
			{
				$lookup: {
					from: "tbl_user",
					localField: "convertVerifyByUserId",
					foreignField: "_id",
					as: "nftVerifyByUserIdDetails"
				}
			},
			{
                $project: {
                    "_id": 1,
                    "userId": 1,
                    "ipfsHash": 1,
                    "nftTokenId": 1,
                    "nftBurnByUserId": 1,					
                    "nftSaveUserId": 1,
                    "status": 1,
                    "nftSaveUserIdDate": 1,
                    "nftVerifyByUserId": 1,
                    "nftVerifyByUserIdDate": 1,
                    "nftBurnByUserIdDate": 1,
                    "nftBurnTransactionHash": 1,					
                    "nftTransactionHash": 1,
                    "fdaId": 1,
                    "data": 1,
                    "createdDate": 1,
                    "updateDate": 1,
                    "userType": 1,
                    "nftBurnByUserIdDetails": 1,
					"newprductDetails": "$productDetails",
					"nftVerifyByUserIdDetails": "$nftVerifyByUserIdDetails",
                }
            },
			]).exec(async (err, result) => {
				
				if (err) {
					let obj = {"status":0,"data":err}
					deferred.resolve(obj)
				} else {
					
					let obj = {"status":1,"data":result}
					deferred.resolve(obj)
					
				}
			});
			
		} else if(data.type == 'innerCartons'){
			
			saveNftsInnersDataInChain.aggregate([          
			{
				$match: {
					"masterCartoonsIpfs":data.ipfsHash
				}
			},
			{$set: {nftBurnByUserId: {$convert: {input: '$nftBurnByUserId', to : 'objectId', onError: '',onNull: ''}}, nftSaveUserId: {$convert: {input: '$nftSaveUserId', to : 'objectId', onError: '',onNull: ''}} }},
			{
				$lookup: {
					from: "tbl_user",
					localField: "nftBurnByUserId",
					foreignField: "_id",
					as: "nftBurnByUserIdDetails"
				}
			},
			{
				$lookup: {
					from: "tbl_user",
					localField: "nftSaveUserId",
					foreignField: "_id",
					as: "nftSaveUserIdDetails"
				}
			},
			{
				$lookup: {
					from: "tbl_blockChainIpfsData",
					localField: "ipfsHash",
					foreignField: "ipfsHash",
					as: "blockChainIpfsData"
				}
			},
			{
				"$addFields": {
					"customProductId": {
						"$toObjectId": "$data.productId"
					}
				}
			},
			{
				$lookup: {
					from: "tbl_products",
					localField: "customProductId",
					foreignField: "_id",
					as: "productDetails"
				}
			},
			{
                $project: {
                    "_id": 1,
                    "userId": 1,
                    "ipfsHash": 1,
                    "nftTokenId": 1,
                    "nftBurnByUserId": 1,					
                    "nftSaveUserId": {"$first": "$blockChainIpfsData.nftSaveUserId"},
                    "status": {"$first": "$blockChainIpfsData.status"},
                    "nftSaveUserIdDate": {"$first": "$blockChainIpfsData.nftSaveUserIdDate"},
                    "nftVerifyByUserId": {"$first": "$blockChainIpfsData.nftVerifyByUserId"},
                    "nftVerifyByUserIdDate": {"$first": "$blockChainIpfsData.nftVerifyByUserIdDate"},
                    "nftBurnByUserIdDate": {"$first": "$blockChainIpfsData.nftBurnByUserIdDate"},
                    "nftBurnTransactionHash": {"$first": "$blockChainIpfsData.nftBurnTransactionHash"},
                    "nftVerifyByUserId": {"$first": "$blockChainIpfsData.nftVerifyByUserId"},					
                    "nftTransactionHash": 1,
                    "fdaId": 1,
                    "data": 1,
                    "createdDate": 1,
                    "updateDate": 1,
                    "userType": 1,
                    "nftBurnByUserIdDetails": 1,
					"newprductDetails": "$productDetails",
                }
            },
			{
				"$addFields": {
					"convertVerifyByUserId": {
						"$toObjectId": {
							"$first": "$nftVerifyByUserId.verifyByUserId"
						}
					}
				}
			},
			{
				$lookup: {
					from: "tbl_user",
					localField: "convertVerifyByUserId",
					foreignField: "_id",
					as: "nftVerifyByUserIdDetails"
				}
			},
			{
                $project: {
                    "_id": 1,
                    "userId": 1,
                    "ipfsHash": 1,
                    "nftTokenId": 1,
                    "nftBurnByUserId": 1,					
                    "nftSaveUserId": 1,
                    "status": 1,
                    "nftSaveUserIdDate": 1,
                    "nftVerifyByUserId": 1,
                    "nftVerifyByUserIdDate": 1,
                    "nftBurnByUserIdDate": 1,
                    "nftBurnTransactionHash": 1,					
                    "nftTransactionHash": 1,
                    "fdaId": 1,
                    "data": 1,
                    "createdDate": 1,
                    "updateDate": 1,
                    "userType": 1,
                    "nftBurnByUserIdDetails": 1,
					"newprductDetails": "$productDetails",
					"nftVerifyByUserIdDetails": "$nftVerifyByUserIdDetails",
                }
            },
			]).exec(async (err, result) => {
				
				if (err) {
					let obj = {"status":0,"data":err}
					deferred.resolve(obj)
				} else {
					
					let obj = {"status":1,"data":result}
					deferred.resolve(obj)
					
				}
			});
			
		} else {
			
			saveNftsDrugsDataInChain.aggregate([          
			{
				$match: {
					"innerCartonsIpfs":data.ipfsHash
				}
			},
			{$set: {nftBurnByUserId: {$convert: {input: '$nftBurnByUserId', to : 'objectId', onError: '',onNull: ''}}, nftSaveUserId: {$convert: {input: '$nftSaveUserId', to : 'objectId', onError: '',onNull: ''}} }},
			{
				$lookup: {
					from: "tbl_user",
					localField: "nftBurnByUserId",
					foreignField: "_id",
					as: "nftBurnByUserIdDetails"
				}
			},
			{
				$lookup: {
					from: "tbl_user",
					localField: "nftSaveUserId",
					foreignField: "_id",
					as: "nftSaveUserIdDetails"
				}
			},
			{
				$lookup: {
					from: "tbl_blockChainIpfsData",
					localField: "ipfsHash",
					foreignField: "ipfsHash",
					as: "blockChainIpfsData"
				}
			},
			{
				"$addFields": {
					"customProductId": {
						"$toObjectId": "$data.productId"
					}
				}
			},
			{
				$lookup: {
					from: "tbl_products",
					localField: "customProductId",
					foreignField: "_id",
					as: "productDetails"
				}
			},
			{
                $project: {
                    "_id": 1,
                    "userId": 1,
                    "ipfsHash": 1,
                    "nftTokenId": 1,
                    "nftBurnByUserId": 1,					
                    "nftSaveUserId": {"$first": "$blockChainIpfsData.nftSaveUserId"},
                    "status": {"$first": "$blockChainIpfsData.status"},
                    "nftSaveUserIdDate": {"$first": "$blockChainIpfsData.nftSaveUserIdDate"},
                    "nftVerifyByUserId": {"$first": "$blockChainIpfsData.nftVerifyByUserId"},
                    "nftVerifyByUserIdDate": {"$first": "$blockChainIpfsData.nftVerifyByUserIdDate"},
                    "nftBurnByUserIdDate": {"$first": "$blockChainIpfsData.nftBurnByUserIdDate"},
                    "nftBurnTransactionHash": {"$first": "$blockChainIpfsData.nftBurnTransactionHash"},
                    "nftVerifyByUserId": {"$first": "$blockChainIpfsData.nftVerifyByUserId"},					
                    "nftTransactionHash": 1,
                    "fdaId": 1,
                    "data": 1,
                    "createdDate": 1,
                    "updateDate": 1,
                    "userType": 1,
                    "nftBurnByUserIdDetails": 1,
					"newprductDetails": "$productDetails",
                }
            },
			{
				"$addFields": {
					"convertVerifyByUserId": {
						"$toObjectId": {
							"$first": "$nftVerifyByUserId.verifyByUserId"
						}
					}
				}
			},
			{
				$lookup: {
					from: "tbl_user",
					localField: "convertVerifyByUserId",
					foreignField: "_id",
					as: "nftVerifyByUserIdDetails"
				}
			},
			{
                $project: {
                    "_id": 1,
                    "userId": 1,
                    "ipfsHash": 1,
                    "nftTokenId": 1,
                    "nftBurnByUserId": 1,					
                    "nftSaveUserId": 1,
                    "status": 1,
                    "nftSaveUserIdDate": 1,
                    "nftVerifyByUserId": 1,
                    "nftVerifyByUserIdDate": 1,
                    "nftBurnByUserIdDate": 1,
                    "nftBurnTransactionHash": 1,					
                    "nftTransactionHash": 1,
                    "fdaId": 1,
                    "data": 1,
                    "createdDate": 1,
                    "updateDate": 1,
                    "userType": 1,
                    "nftBurnByUserIdDetails": 1,
					"newprductDetails": "$productDetails",
					"nftVerifyByUserIdDetails": "$nftVerifyByUserIdDetails",
                }
            },
			]).exec(async (err, result) => {
				
				if (err) {
					let obj = {"status":0,"data":err}
					deferred.resolve(obj)
				} else {
					
					let obj = {"status":1,"data":result}
					deferred.resolve(obj)
					
				}
			});
		}
		
		return deferred.promise;
		
	},
	getCompanyIdIpfs: async(data)=> { 
		var deferred = Q.defer();
		
		// saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain
		console.log(data,"dadatttttttttttttt")

		if(data.filterStatus == 1 || data.filterStatus == "1"){
			var sort = {
				"$sort":{
					"updateDate": -1
				}
			}
		} else if(data.filterStatus == 2 || data.filterStatus == "2"){
			var sort = {
				"$sort":{
					"updateDate": -1
				}
			}			
		} else if(data.filterStatus == 3 || data.filterStatus == "3"){
			var sort = {
				"$sort":{
					"updateDate": -1
				}
			}
		} else {
			var sort = {
				"$sort":{
					"updateDate": -1
					// "nftBurnByUserIdDate": -1,
					// "nftSaveUserIdDate": -1,
					// "nftVerifyByUserIdDate": -1					
				}
			}
		}
		
		ipfsUpdated.aggregate([
			{
				$match: {
					"$or": [
						{ 
							"$and": [
								{ "status": 1 },
								{ "userId":  mongoose.Types.ObjectId(data.userId) },
								{ "nftSaveUserId":  {"$exists" : true, "$ne" : ""} }
							]
						},
						{ 
							"$and": [
								{ "status": 2 },
								{ "userId":  mongoose.Types.ObjectId(data.userId) }
							]
						},
						{ 
							"$and": [
								{ "status": 3 },
								{ "userId":  mongoose.Types.ObjectId(data.userId) }
							]
						},
					]
				}
			},
			{$set: {nftBurnByUserId: {$convert: {input: '$nftBurnByUserId', to : 'objectId', onError: '',onNull: ''}}, nftSaveUserId: {$convert: {input: '$nftSaveUserId', to : 'objectId', onError: '',onNull: ''}} }},
			{
				"$addFields": {
					"convertVerifyByUserId": {
						"$toObjectId": {
							"$first": "$nftVerifyByUserId.verifyByUserId"
						}
					},
					"matchProductId": {
						"$toObjectId": "$data.productId"
					}
				}
			},
			{
				$lookup: {
					from: "tbl_products",
					localField: "matchProductId",
					foreignField: "_id",
					as: "productDetails"
				}
			},
			{
				$lookup: {
					from: "tbl_user",
					localField: "nftBurnByUserId",
					foreignField: "_id",
					as: "nftBurnByUserIdDetails"
				}
			},
			{
				$lookup: {
					from: "tbl_user",
					localField: "nftSaveUserId",
					foreignField: "_id",
					as: "nftSaveUserIdDetails"
				}
			},
			{
				$lookup: {
					from: "tbl_user",
					localField: "convertVerifyByUserId",
					foreignField: "_id",
					as: "nftVerifyByUserIdDetails"
				}
			},
			sort
		]).exec(async (err, result) => {

			console.log(result, "MMMMMMM")
			
			if (err) {
				let obj = {"status":0,"data":err}
				deferred.resolve(obj)
			} else {
				
				let obj = {"status":1,"data":result}
				// console.log(result.length, "emitttt Events")
				io.emit("event",result);
				deferred.resolve(obj)
				
			}
		});
		
		return deferred.promise;
	},
	getOrderByProductId: async(data)=> {
		var deferred = Q.defer();
		getOrder.aggregate([          
			{
				$match: {
					"productId":  mongoose.Types.ObjectId(data.productId),
					"userId":  mongoose.Types.ObjectId(data.userId)
				}
			},
			{ 
				"$lookup": {
					"from": "tbl_products",
					"let": { "productId": "$productId" },
					"pipeline": [
						{ 
							"$match": {
								"$expr": {
									"$eq": [ "$$productId", "$_id" ]
								}
							}
						}    
					],
					"as": "productDetails"
				}
			},
			{
                "$unwind": {
                    "path": "$productDetails",
                    "preserveNullAndEmptyArrays": true
                }
            },
			{ 
				"$lookup": {
					"from": "tbl_fdalebelmetadata",
					"let": { "productId": "$productId", "userId": "$userId", "fdalebelId": "$fdalebelId" },
					"pipeline": [
						{ 
							"$match": {
								"$expr": {
									"$eq": [ "$$productId", "$productId" ],
									"$eq": [ "$$userId", "$userId" ],
									"$eq": [ "$$fdalebelId", "$_id" ]
								}
							}
						}    
					],
					"as": "metaData"
				}
			},
			{
                $project: {
                    "productId": 1,
                    "userId": 1,
                    "invoiceNumber": 1,
                    "fdalebelId":1,
                    "overDueDays": 1,
                    "dueDate": 1,
                    "paymentType": 1,
                    "paymentStatus": 1,
                    "totalNfts": 1,
                    "totalPriceUSD": 1,
                    "totalPriceINR": 1,
                    "createdDate": 1,
                    "generatedNftStatus":1,
                    "packagingType": '$productDetails.packagingType',
                    "batchLotNo": '$productDetails.batchLotNo',
                    "purchaseOrderNo": '$productDetails.purchaseOrderNo',
                    "productName": '$productDetails.productName',
                    "brandName": '$productDetails.brandName',
                    'containerNo':{ $arrayElemAt: [ {"$first": "$metaData.container.nfts"}, 0 ] }
                }
            },
			{
				$sort: {
					"_id":-1
				}
			}
		]).exec(async (err, result) => {
			
			if (err) {
				let obj = {"status":0,"data":err}
				deferred.resolve(obj)
			} else {
				
				let obj = {"status":1,"data":result}
				deferred.resolve(obj)
				
			}
		});
		
		return deferred.promise;		
	},		
	getNftsReportAsPerUserId: async(data)=> {
		var deferred = Q.defer();
		
		// saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain
		
		ipfsUpdatedVerify.aggregate([          
			{
				$match: {
					"userId":  mongoose.Types.ObjectId(data.userId),
					"fdaId":  mongoose.Types.ObjectId(data.fdaId)
				}
			},
			{$set: {nftBurnByUserId: {$convert: {input: '$nftBurnByUserId', to : 'objectId', onError: '',onNull: ''}}, nftSaveUserId: {$convert: {input: '$nftSaveUserId', to : 'objectId', onError: '',onNull: ''}} }},
			{
				$lookup: {
					from: "tbl_user",
					localField: "nftBurnByUserId",
					foreignField: "_id",
					as: "nftBurnByUserIdDetails"
				}
			},
			{
				$lookup: {
					from: "tbl_user",
					localField: "nftSaveUserId",
					foreignField: "_id",
					as: "nftSaveUserIdDetails"
				}
			},
			{
				"$addFields": {
					"customProductId": {
						"$toObjectId": "$data.productId"
					}
				}
			},
			{
				$lookup: {
					from: "tbl_products",
					localField: "customProductId",
					foreignField: "_id",
					as: "productDetails"
				}
			},
			{
				"$addFields": {
					"convertVerifyByUserId": {
						"$toObjectId": {
							"$first": "$nftVerifyByUserId.verifyByUserId"
						}
					}
				}
			},
			{
				$lookup: {
					from: "tbl_user",
					localField: "convertVerifyByUserId",
					foreignField: "_id",
					as: "nftVerifyByUserIdDetails"
				}
			},
			{
				$lookup: {
					from: "tbl_save_nfts_reports",
					localField: "ipfsHash",
					foreignField: "ipfsHash",
					as: "nftVerifyUserFlagDetails"
				}
			},
			{
                $project: {
                    _id: 1,
					userId: 1,
					ipfsHash: 1,
					nftTokenId: 1,
					nftBurnByUserId: 1,
					nftBurnTransactionHash:1,
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

					nftVerifyLocation: { "$ifNull": [ "$nftVerifyLocation", "" ] },
					nftBurnLocation: { "$ifNull": [ "$nftBurnLocation", "" ] },
					nftSaveLocation: { "$ifNull": [ "$nftSaveLocation", "" ] },
                }
            },
			{
				$lookup: {
					from: "tbl_user",
					localField: "nftVerifyUserFlagDetails.userId",
					foreignField: "_id",
					as: "userDetails"
				}
			},
		]).exec(async (err, result) => {
			
			if (err) {
				let obj = {"status":0,"data":err}
				deferred.resolve(obj)
			} else {
				
				var containersPushData = []
				var palletsPushData = []
				var mastersCartonsPushData = []
				var innerCartonsPushData = []
				var drugsPushData = []
				result.filter((item)=>{					
					if(item.data.type == "containers"){
						containersPushData.push(item)						
					} else if(item.data.type == "pallets"){
						palletsPushData.push(item)
					} else if(item.data.type == "masterCartons"){
						mastersCartonsPushData.push(item)
					} else if(item.data.type == "innerCartons"){
						innerCartonsPushData.push(item)
					} else {
						drugsPushData.push(item)
					}
				});
				
				if(data.type == "all"){				
					var obj = {
						"status":1,
							"data":{
								"fdaId": data.fdaId ,
								"newprductDetails": (containersPushData.length > 0) ? containersPushData[0].productDetails : [],
	
								"containers": { "quantity": containersPushData.length, "burned": _.filter(containersPushData, {"status": 3}).length, verified: _.filter(containersPushData, {"status": 2}).length, balance: _.filter(containersPushData, {"status": 1}).length, nftsFlag: containersPushData},
	
								"pallets": { "quantity": palletsPushData.length, "burned": _.filter(palletsPushData, {"status": 3}).length, verified: _.filter(palletsPushData, {"status": 2}).length, balance: _.filter(palletsPushData, {"status": 1}).length, nftsFlag: palletsPushData},
	
								"masterCartons": { "quantity": mastersCartonsPushData.length, "burned": _.filter(mastersCartonsPushData, {"status": 3}).length, verified: _.filter(mastersCartonsPushData, {"status": 2}).length, balance: _.filter(mastersCartonsPushData, {"status": 1}).length, nftsFlag: mastersCartonsPushData},
	
								"innerCartons": { "quantity": innerCartonsPushData.length, "burned": _.filter(innerCartonsPushData, {"status": 3}).length, verified: _.filter(innerCartonsPushData, {"status": 2}).length, balance: _.filter(innerCartonsPushData, {"status": 1}).length, nftsFlag: innerCartonsPushData},
	
								"drugs": { "quantity": drugsPushData.length, "burned": _.filter(drugsPushData, {"status": 3}).length, verified: _.filter(drugsPushData, {"status": 2}).length, balance: _.filter(drugsPushData, {"status": 1}).length, nftsFlag: drugsPushData}
	
							}
						}
				} else if(data.type == "containers"){
					var obj = {
						"status":1,
						"data":{
							"newprductDetails": (containersPushData.length > 0) ? containersPushData[0].productDetails : [],
							"containers": containersPushData
						}
					}
				} else if(data.type == "pallets"){	
					var obj = {
						"status":1,
						"data":{
							"newprductDetails": (palletsPushData.length > 0) ? palletsPushData[0].productDetails : [],
							"pallets": palletsPushData
						}
					}
				} else if(data.type == "masterCartons"){	
					var obj = {
						"status":1,
						"data":{
							"newprductDetails": (mastersCartonsPushData.length > 0) ? mastersCartonsPushData[0].productDetails : [],
							"masterCartons": mastersCartonsPushData
						}
					}
				} else if(data.type == "innerCartons"){	
					var obj = {
						"status":1,
						"data":{
							"newprductDetails": (innerCartonsPushData.length > 0) ? innerCartonsPushData[0].productDetails : [],
							"innerCartons": innerCartonsPushData
						}
					}
				} else {
					var obj = {
						"status":1,
						"data":{
							"newprductDetails": (drugsPushData.length > 0) ? drugsPushData[0].productDetails : [],
							"drugs": drugsPushData
						}
					}
				}
				deferred.resolve(obj)
				
			}
		});
		
		return deferred.promise;
	},
	getCheckAssignContainers: async(data)=> {
		var deferred = Q.defer();

		if(data.type == "pallets"){
			
			var typeMatch = {
					"$or": [
						{ 
							"$and": [
								{ "status": 3 },
								{ "nftBurnByUserId" : data.userId },
								{ "data.type": "containers" },
								{ "fdaId" : mongoose.Types.ObjectId(data.fdaId) },
								{ "userType":  data.userType.toString() }									
							]
						},
						{ 
							"$and": [
								{ "status": 3 },
								{ "nftBurnByUserId" : mongoose.Types.ObjectId(data.userId) },
								{ "data.type": "containers" },
								{ "fdaId" : mongoose.Types.ObjectId(data.fdaId) },
								{ "userType":  data.userType.toString() }										
							]
						}
					]
				}
				
			var perPalletsCount = "container"
			
		} else if(data.type == "masterCartons"){
			
			var typeMatch = {
					"$or": [
						{ 
							"$and": [
								{ "status": 3 },
								{ "nftBurnByUserId" : data.userId },
								{ "data.type": "pallets" },
								{ "fdaId" : mongoose.Types.ObjectId(data.fdaId) },
								{ "userType":  data.userType.toString() }									
							]
						},
						{ 
							"$and": [
								{ "status": 3 },
								{ "nftBurnByUserId" : mongoose.Types.ObjectId(data.userId) },
								{ "data.type": "pallets" },
								{ "fdaId" : mongoose.Types.ObjectId(data.fdaId) },
								{ "userType":  data.userType.toString() }										
							]
						}
					]				
				}
				
			var perPalletsCount = "pallets"
			
		} else if(data.type == "innerCartons"){
			
			var typeMatch = {
					"$or": [
						{ 
							"$and": [
								{ "status": 3 },
								{ "nftBurnByUserId" : data.userId },
								{ "data.type": "masterCartons" },
								{ "fdaId" : mongoose.Types.ObjectId(data.fdaId) },
								{ "userType":  data.userType.toString() }									
							]
						},
						{ 
							"$and": [
								{ "status": 3 },
								{ "nftBurnByUserId" : mongoose.Types.ObjectId(data.userId) },
								{ "data.type": "masterCartons" },
								{ "fdaId" : mongoose.Types.ObjectId(data.fdaId) },
								{ "userType":  data.userType.toString() }										
							]
						}
					]			
				}
				
			var perPalletsCount = "masterCartons"
			
		} else if(data.type == "drugs"){
			
			var typeMatch = {
					"$or": [
						{ 
							"$and": [
								{ "status": 3 },
								{ "nftBurnByUserId" : data.userId },
								{ "data.type": "innerCartons" },
								{ "fdaId" : mongoose.Types.ObjectId(data.fdaId) },
								{ "userType":  data.userType.toString() }									
							]
						},
						{ 
							"$and": [
								{ "status": 3 },
								{ "nftBurnByUserId" : mongoose.Types.ObjectId(data.userId) },
								{ "data.type": "innerCartons" },
								{ "fdaId" : mongoose.Types.ObjectId(data.fdaId) },
								{ "userType":  data.userType.toString() }										
							]
						}
					]			
				}
				
			var perPalletsCount = "innerCartons"
			
		}
		
		ipfsverifydata.aggregate([          
			{
				$match: typeMatch
			},
			{
				"$addFields": {
					"fdalebelId": mongoose.Types.ObjectId(data.fdaId)
				}
			},
			{
				$lookup: {
					from: "tbl_fdalebelmetadata",
					localField: "fdalebelId",
					foreignField: "_id",
					as: "metadata"
				}
			},
			{
				$unwind: {
					"path": "$metadata",
					"preserveNullAndEmptyArrays": true
				}
			},
			{
				"$project":
				{
					"_id": 0,
					"userId":"$nftBurnByUserId",				
					"fdaId": 1,
					"ipfsHash": 1,
					"perPalletsCount": {"$first": "$metadata"+"."+`${perPalletsCount}`+"."+"totalContainerNfts"}
				}
			}
		]).exec(async (err, result) => {
			
			console.log("MMMMMMMMMMMM")
			// console.log(typeMatch)
			// console.log(perPalletsCount)
			console.log(result)
			// return false;
			
			if (err) {
				let obj = {"status":0,"data":err}
				deferred.resolve(obj)
			} else {
				
				    if(data.type == "pallets"){
						
						let ipfsArray = []
						let filterArray = result.filter((item) => { ipfsArray.push(item.ipfsHash); return item });
						
						saveNftsDataInChain.find({"ipfsHash": {"$in":  ipfsArray}}).exec(async (err, result) => {
							if(result.length == 0){
									await saveNftsDataInChain.create(filterArray, async (err, resultChain) => {
										let obj = {"status":1,"data":resultChain}
										deferred.resolve(obj)
									})
							} else {
								
								let obj = {"status":0,"data":result}
								deferred.resolve(obj)
							}
						})
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
	
	
	getCount: async(data)=> {
		var deferred = Q.defer();
		
		// saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain
		
		if(data.type == "pallets"){
			
			saveNftsPalletsInChain.find({"$or": [{"userId": mongoose.Types.ObjectId(data.userId)},{"containerId": mongoose.Types.ObjectId(data.containerId)}]}, async (err, resultData) => {				
				if (err) {
					let obj = {"status":0,"data":err}
					deferred.resolve(obj)
				} else {					
					let obj = {"status":1,"data":resultData.length}
					deferred.resolve(obj)
				}				
			});
			
			
		} else if(data.type == "masterCartons"){
			
			saveNftsMastersInChain.find({"userId": mongoose.Types.ObjectId(data.userId)}, async (err, resultData) => {				
				if (err) {
					let obj = {"status":0,"data":err}
					deferred.resolve(obj)
				} else {					
					let obj = {"status":1,"data":resultData.length}
					deferred.resolve(obj)
				}				
			});
			
			
			
		} else if(data.type == "innerCartons"){
			
			
			saveNftsInnersDataInChain.find({"userId": mongoose.Types.ObjectId(data.userId)}, async (err, resultData) => {				
				if (err) {
					let obj = {"status":0,"data":err}
					deferred.resolve(obj)
				} else {					
					let obj = {"status":1,"data":resultData.length}
					deferred.resolve(obj)
				}				
			});
			
			
			
		} else if(data.type == "drugs"){
			
			saveNftsDrugsDataInChain.find({"userId": mongoose.Types.ObjectId(data.userId)}, async (err, resultData) => {				
				if (err) {
					let obj = {"status":0,"data":err}
					deferred.resolve(obj)
				} else {					
					let obj = {"status":1,"data":resultData.length}
					deferred.resolve(obj)
				}				
			});
			
		}
		
		return deferred.promise;		
	},	
	saveNftsData: async(data)=> {
		var deferred = Q.defer();
		
		if(data.type == "pallets"){
			
			// saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain
			
			//++++++++++++++++++++++++++
			
			saveNftsDataInChain.aggregate([          
				{
					$match: {
						"$or": [
							{ "nftBurnByUserId": mongoose.Types.ObjectId(data.userId) },
							{ "nftBurnByUserId": data.userId }
						],							
						"fdaId": mongoose.Types.ObjectId(data.fdaId),
						"userType": data.userType.toString()
					}
				}
			]).exec(async (err, result) => {
				
				if (err) {
					let obj = {"status":0,"data":err}
					deferred.resolve(obj)
				} else {
					
					if(result.length == 0){
						
						let obj = {"status":4,"data":{}}
						deferred.resolve(obj)
						
					} else {
						
						for(let i = 0; i < result.length; i++){

							if(result[i].palletsCount < result[i].data.size){

								ipfsUpdated.findOneAndUpdate({"ipfsHash" : data.ipfsHash},{"$set": {"nftSaveUserId":mongoose.Types.ObjectId(data.userId), "userType": data.userType, "nftSaveUserIdDate": new Date(),"updateDate": new Date(), "nftSaveLocation": data.nftSaveLocation}},{new: true, upsert: true}).exec();

								saveNftsDataInChain.findOneAndUpdate({"ipfsHash":result[i].ipfsHash},{ $inc: { "palletsCount": 1 } }).exec();
								saveNftsPalletsInChain.findOne({"ipfsHash": data.ipfsHash}, async (err, verifyData) => {

									// if(verifyData == null){

										ipfsUpdatedVerify.findOne({"ipfsHash": data.ipfsHash}, async (err, newData) => {

											if (err) {
												let obj = {"status":0,"data":err}
												deferred.resolve(obj)
											} else {

												await saveNftsPalletsInChain.create({"containerIpfs": result[i].ipfsHash, "userId": newData.userId, "ipfsHash": newData.ipfsHash, "nftTokenId": newData.nftTokenId, "nftTransactionHash": newData.nftTransactionHash, "fdaId": newData.fdaId, "data": newData.data, "nftBurnByUserId": newData.nftBurnByUserId, "nftVerifyByUserId": newData.nftVerifyByUserId, "nftSaveUserId": newData.nftSaveUserId, "masterCartonsCount": 0, "userType": data.userType, "status": 1},
												async (err, resultChain) => {
													let obj = {"status":1,"data":resultChain}
													self.getCompanyIdIpfs({"userId": mongoose.Types.ObjectId(newData.userId),"filterStatus":2})													
													deferred.resolve(obj)
												})

											}
										});
										
									// } else {						
									// 	let obj = {"status":2,"data":{}}
									// 	deferred.resolve(obj)
									// }
								})
								
								break;						
								
							} 
							
							if(i == result.length-1){
								let obj = {"status":3,"data":{}}
								deferred.resolve(obj)
							}
						}
						
					}
					
					
					
				}				
			});
			
			//++++++++++++++++++++++++++	
			
			
		} else if(data.type == "masterCartons") {
				
			// saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain
			
			//++++++++++++++++++++++++++
			
			saveNftsPalletsInChain.aggregate([          
				{
					$match: {
						"$or": [
							{ "nftBurnByUserId": mongoose.Types.ObjectId(data.userId) },
							{ "nftBurnByUserId": data.userId }
						],							
						"fdaId": mongoose.Types.ObjectId(data.fdaId),
						"userType": data.userType.toString()
					}
				}
			]).exec(async (err, result) => {				
				if (err) {
					let obj = {"status":0,"data":err}
					deferred.resolve(obj)
				} else {
					
					if(result.length == 0){
						
						let obj = {"status":4,"data":{}}
						deferred.resolve(obj)
						
					} else {
					
						for(let i = 0; i < result.length; i++){
							
							
							if(result[i].masterCartonsCount < result[i].data.size){

								ipfsUpdated.findOneAndUpdate({"ipfsHash" : data.ipfsHash},{"$set": {"nftSaveUserId":mongoose.Types.ObjectId(data.userId), "userType": data.userType, "nftSaveUserIdDate": new Date(), "updateDate": new Date(), "nftSaveLocation": data.nftSaveLocation}},{new: true, upsert: true}).exec();

								saveNftsPalletsInChain.findOneAndUpdate({"ipfsHash":result[i].ipfsHash},{ $inc: { "masterCartonsCount": 1 } }).exec();
								saveNftsMastersInChain.findOne({"ipfsHash": data.ipfsHash}, async (err, verifyData) => {
									
									// if(verifyData == null){

										ipfsUpdatedVerify.findOne({"ipfsHash": data.ipfsHash}, async (err, newData) => {

											if (err) {
												let obj = {"status":0,"data":err}
												deferred.resolve(obj)
											} else {

												await saveNftsMastersInChain.create({"palletIpfs": result[i].ipfsHash, "userId": newData.userId, "ipfsHash": newData.ipfsHash, "nftTokenId": newData.nftTokenId, "nftTransactionHash": newData.nftTransactionHash, "fdaId": newData.fdaId, "data": newData.data, "nftBurnByUserId": newData.nftBurnByUserId, "nftVerifyByUserId": newData.nftVerifyByUserId, "nftSaveUserId": newData.nftSaveUserId,  "innerCartonsCount": 0, "userType": data.userType, "status": 1},
												async (err, resultChain) => {
													let obj = {"status":1,"data":resultChain}
													self.getCompanyIdIpfs({"userId": mongoose.Types.ObjectId(newData.userId),"filterStatus":2})
													deferred.resolve(obj)
												})

											}
										});
										
									// } else {						
										// let obj = {"status":2,"data":{}}
										// deferred.resolve(obj)
									// }
								})
								
								break;						
								
							}
							
							if(i == result.length-1){
								let obj = {"status":3,"data":{}}
								deferred.resolve(obj)
							}
							
						}
					}
					
				}				
			});
			
			//++++++++++++++++++++++++++	
							
		} else if(data.type == "innerCartons") {
				
			// saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain
			
			//++++++++++++++++++++++++++
			
			saveNftsMastersInChain.aggregate([          
				{
					$match: {
						"$or": [
							{ "nftBurnByUserId": mongoose.Types.ObjectId(data.userId) },
							{ "nftBurnByUserId": data.userId }
						],							
						"fdaId": mongoose.Types.ObjectId(data.fdaId),
						"userType": data.userType.toString()
					}
				}
			]).exec(async (err, result) => {				
				if (err) {
					let obj = {"status":0,"data":err}
					deferred.resolve(obj)
				} else {
					
					if(result.length == 0){
						
						let obj = {"status":4,"data":{}}
						deferred.resolve(obj)
						
					} else {
					
						for(let i = 0; i < result.length; i++){
							
							if(result[i].innerCartonsCount < result[i].data.size){

								ipfsUpdated.findOneAndUpdate({"ipfsHash" : data.ipfsHash},{"$set": {"nftSaveUserId":mongoose.Types.ObjectId(data.userId), "userType": data.userType, "nftSaveUserIdDate": new Date(), "updateDate": new Date(), "nftSaveLocation": data.nftSaveLocation}},{new: true, upsert: true}).exec();

								saveNftsMastersInChain.findOneAndUpdate({"ipfsHash":result[i].ipfsHash},{ $inc: { "innerCartonsCount": 1 } }).exec();
								saveNftsInnersDataInChain.findOne({"ipfsHash": data.ipfsHash}, async (err, verifyData) => {
									
									// if(verifyData == null){

										ipfsUpdatedVerify.findOne({"ipfsHash": data.ipfsHash}, async (err, newData) => {

											if (err) {
												let obj = {"status":0,"data":err}
												deferred.resolve(obj)
											} else {

												await saveNftsInnersDataInChain.create({"masterCartoonsIpfs": result[i].ipfsHash, "userId": newData.userId, "ipfsHash": newData.ipfsHash, "nftTokenId": newData.nftTokenId, "nftTransactionHash": newData.nftTransactionHash, "fdaId": newData.fdaId, "data": newData.data, "nftBurnByUserId": newData.nftBurnByUserId, "nftVerifyByUserId": newData.nftVerifyByUserId, "nftSaveUserId": newData.nftSaveUserId, "drugsCount": 0, "userType": data.userType, "status": 1},
												async (err, resultChain) => {
													let obj = {"status":1,"data":resultChain}
													self.getCompanyIdIpfs({"userId": mongoose.Types.ObjectId(newData.userId),"filterStatus":2})
													deferred.resolve(obj)
												})

											}
										});
										
									// } else {						
										// let obj = {"status":2,"data":{}}
										// deferred.resolve(obj)
									// }
								})
								
								break;						
								
							}
							
							if(i == result.length-1){
								let obj = {"status":3,"data":{}}
								deferred.resolve(obj)
							}
							
						}
					}
					
				}				
			});
			
			//++++++++++++++++++++++++++	
							
		} else if(data.type == "drugs") {
				
			// saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain
			
			//++++++++++++++++++++++++++
			
			saveNftsInnersDataInChain.aggregate([          
				{
					$match: {
						"$or": [
							{ "nftBurnByUserId": mongoose.Types.ObjectId(data.userId) },
							{ "nftBurnByUserId": data.userId }
						],							
						"fdaId": mongoose.Types.ObjectId(data.fdaId),
						"userType": data.userType.toString()
					}
				}
			]).exec(async (err, result) => {				
				if (err) {
					let obj = {"status":0,"data":err}
					deferred.resolve(obj)
				} else {
					
					if(result.length == 0){
						
						let obj = {"status":4,"data":{}}
						deferred.resolve(obj)
						
					} else {
					
						for(let i = 0; i < result.length; i++){
							
							if(result[i].drugsCount < result[i].data.size){

								ipfsUpdated.findOneAndUpdate({"ipfsHash" : data.ipfsHash},{"$set": {"nftSaveUserId":mongoose.Types.ObjectId(data.userId), "userType": data.userType, "nftSaveUserIdDate": new Date(), "updateDate": new Date(), "nftSaveLocation": data.nftSaveLocation}},{new: true, upsert: true}).exec();

								saveNftsInnersDataInChain.findOneAndUpdate({"ipfsHash":result[i].ipfsHash},{ $inc: { "drugsCount": 1 } }).exec();
								saveNftsDrugsDataInChain.findOne({"ipfsHash": data.ipfsHash}, async (err, verifyData) => {

									// if(verifyData == null){

										ipfsUpdatedVerify.findOne({"ipfsHash": data.ipfsHash}, async (err, newData) => {

											if (err) {
												let obj = {"status":0,"data":err}
												deferred.resolve(obj)
											} else {

												await saveNftsDrugsDataInChain.create({"innerCartonsIpfs": result[i].ipfsHash, "userId": newData.userId, "ipfsHash": newData.ipfsHash, "nftTokenId": newData.nftTokenId, "nftTransactionHash": newData.nftTransactionHash, "fdaId": newData.fdaId, "data": newData.data, "nftBurnByUserId": newData.nftBurnByUserId, "nftVerifyByUserId": newData.nftVerifyByUserId, "nftSaveUserId": newData.nftSaveUserId, "userType": newData.userType, "status": 1},
												async (err, resultChain) => {
													let obj = {"status":1,"data":resultChain}
													self.getCompanyIdIpfs({"userId": mongoose.Types.ObjectId(newData.userId),"filterStatus":2})
													deferred.resolve(obj)
												})

											}
										});
										
									// } else {						
										// let obj = {"status":2,"data":{}}
										// deferred.resolve(obj)
									// }
								})
								
								break;						
								
							}
							
							if(i == result.length-1){
								let obj = {"status":3,"data":{}}
								deferred.resolve(obj)
							}
							
						}
					}
					
				}				
			});
			
			//++++++++++++++++++++++++++	
							
		}
		
		return deferred.promise;
	},
	verifyHashUserNftsData: async(data)=> {
		var deferred = Q.defer();
		
		ipfsverifydata.aggregate([          
			{
				$match: {
					"$or": [
						{ 
							"$and": [
								{ "status": parseInt(data.status) },
								{ "userId" : data.userId },
								{ "userType":  data.userType.toString() }										
							]
						},
						{ 
							"$and": [
								{ "status": parseInt(data.status) },
								{ "userId" : mongoose.Types.ObjectId(data.userId) },
								{ "userType":  data.userType.toString() }										
							]
						}
					]					
				}
			}
		]).exec(async (err, result) => {
			
			if (err) {
				let obj = {"status":0,"data":err}
				deferred.resolve(obj)
			} else {
				
				let obj = {"status":1,"data":result}
				deferred.resolve(obj)
			}
		});
		
		return deferred.promise;
	},
	viewAssignDataByWarehouseAndDistributerId: async(data)=> {
		var deferred = Q.defer();
		
		assignContainerToOthersData.aggregate([          
			{
				$match: {					
					status: 1,
					"assignContainerToOthersIds": {
						"$elemMatch": {
							"$or": [
								{ 
									"$and": [
										{ "factoryUserId":  data.factoryUserId },
										{ "userType":  data.userType }										
									]
								},
								{ 
									"$and": [
										{ "factoryUserId":  mongoose.Types.ObjectId(data.factoryUserId) },
										{ "userType":  data.userType }										
									]
								}
							]							
						}
					}				
				}
			},			
			{
				"$lookup": {
					"from": "tbl_products",
					"localField": "productId", 
					"foreignField": "_id",
					"as": "productDetails"
				}
			},
			{ "$unwind": "$productDetails" },
			{
				"$lookup": {
					"from": "tbl_user",
					"localField": "manufacturerId", 
					"foreignField": "_id",
					"as": "userDetails"
				}
			},
			{ "$unwind": "$userDetails" },
			{
				"$project":
				{
					"_id": 1,
					"firstName": "$userDetails.firstName",
					"lastName": "$userDetails.lastName",
					"assignContainerStatus": 1,
					"productDetails":1,
					"fdalebelId": 1,
					"userId":1,
					"productId": 1,
					"createdDate": 1,
					"assignContainerToOthersIds": {
                        '$filter': {
                            input: '$assignContainerToOthersIds',
                            as: 'assignContainerToOthersIdss',
                            cond: {
								$and: [ 
									{ $eq: ["$$assignContainerToOthersIdss.factoryUserId",  data.factoryUserId] }, 
									{ $eq: ["$$assignContainerToOthersIdss.userType",  data.userType] }, 
								]
							}
                        }
                    }				
				}
			},
			{
				"$sort":{
					"_id": -1
				}
			},
		]).exec(async (err, result) => {
			
			if (err) {
				let obj = {"status":0,"data":err}
				deferred.resolve(obj)
			} else {
				
				let obj = {"status":1,"data":result}
				deferred.resolve(obj)
			}
		});
		
		return deferred.promise;
	},
	viewAssignDataByManufacturerId: async(data)=> {
		var deferred = Q.defer();
		
		assignContainerToOthersData.aggregate([          
			{
				$match: {					
					"status": 1,
					"manufacturerId": mongoose.Types.ObjectId(data.manufacturerId),
					"userType":data.userType
				}
			},			
			{
				"$lookup": {
					"from": "tbl_products",
					"localField": "productId", 
					"foreignField": "_id",
					"as": "productDetails"
				}
			},
			{ "$unwind": "$productDetails" },
			{
				"$lookup": {
					"from": "tbl_user",
					"localField": "userId", 
					"foreignField": "_id",
					"as": "userDetails"
				}
			},
			{ "$unwind": "$userDetails" },
			{
				"$project":
				{
					"_id": 1,
					"firstName": "$userDetails.firstName",
					"lastName": "$userDetails.lastName",
					"assignContainerStatus": 1,
					"productDetails":1,
					"fdalebelId": 1,
					"userId":1,
					"productId": 1, 
					"createdDate": 1,
					"assignContainerToOthersIds": 1					
				}
			},


		]).exec(async (err, result) => {
			
			if (err) {
				let obj = {"status":0,"data":err}
				deferred.resolve(obj)
			} else {
				
				let obj = {"status":1,"data":result}
				deferred.resolve(obj)
			}
		});
		
		return deferred.promise;
	},
	saveNftsContainersAfterBurnData: async(data)=> {
		var deferred = Q.defer();
		
		
		ipfsUpdatedVerify.aggregate([          
			{
				$match: {
					"ipfsHash": data.ipfsHash
				}
			},
			{
				"$project":
				{
					"_id": 0,
					"userId":1,				
					"ipfsHash": 1,
					"nftTokenId": 1,
					"nftTransactionHash": 1,
					"fdaId": 1,
					"data": 1,
					"nftBurnByUserId": 1,
					"nftVerifyByUserId": 1,
					"userType": 1
				}
			}
		]).exec(async (err, result) => {
			
			if (err) {
				let obj = {"status":0,"data":err}
				deferred.resolve(obj)
			} else {
				
				let ipfsArray = []
				let checkIpfsIds = []
				let sizeIpfsIds = []
				let filterArray = result.filter((item) => { ipfsArray.push(item.ipfsHash); checkIpfsIds.push(item.data.type); sizeIpfsIds.push(item.data.type); return item });
				
				
				// saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain
				
				if(checkIpfsIds[0] == 'containers'){
					
					saveNftsDataInChain.find({"ipfsHash": {"$in":  ipfsArray}}).exec(async (err, result) => {
						if(result.length == 0){
								await saveNftsDataInChain.create(filterArray, async (err, resultChain) => {
									let obj = {"status":1,"data":resultChain}
									deferred.resolve(obj)
								})
						} else {
							let obj = {"status":0,"data":result}
							deferred.resolve(obj)
						}
					})
					
				} else if(checkIpfsIds[0] == 'pallets'){
					
					saveNftsPalletsInChain.findOneAndUpdate({"ipfsHash":data.ipfsHash},{ "$set": { "nftBurnByUserId": data.nftBurnByUserId, "userType": data.userType}},{new:true, upsert:true}).exec(async (err, result) => {						
						let obj = {"status":0,"data":result}
						deferred.resolve(obj)
					})
					
				} else if(checkIpfsIds[0] == 'masterCartons'){
					
					saveNftsMastersInChain.findOneAndUpdate({"ipfsHash":data.ipfsHash},{ "$set": { "nftBurnByUserId": data.nftBurnByUserId, "userType": data.userType}},{new:true, upsert:true}).exec(async (err, result) => {						
						let obj = {"status":0,"data":result}
						deferred.resolve(obj)
					})
					
				} else if(checkIpfsIds[0] == 'innerCartons'){
					
					saveNftsInnersDataInChain.findOneAndUpdate({"ipfsHash":data.ipfsHash},{ "$set": { "nftBurnByUserId": data.nftBurnByUserId, "userType": data.userType}},{new:true, upsert:true}).exec(async (err, result) => {						
						let obj = {"status":0,"data":result}
						deferred.resolve(obj)
					})
					
				} else {
					
					saveNftsDrugsDataInChain.findOneAndUpdate({"ipfsHash":data.ipfsHash},{ "$set": { "nftBurnByUserId": data.nftBurnByUserId, "userType": data.userType}},{new:true, upsert:true}).exec(async (err, result) => {						
						let obj = {"status":0,"data":result}
						deferred.resolve(obj)
					})
				}					
				
			}
		});
        return deferred.promise;
	},
	hashBurnByUserId: async(data)=> {

		var deferred = Q.defer();
		//	IPFS Type :2- Verify, 3- Burned
		//	IPFS Update Status : 1 - genrated, 2- Verify, 3- Burned
		
		ipfsUpdatedVerify.findOneAndUpdate({"ipfsHash":data.ipfsHash},{ "$set": { "status": 3, "nftBurnTransactionHash": data.nftBurnTransactionHash, "nftBurnByUserId": data.nftBurnByUserId, "userType": data.userType, "nftBurnByUserIdDate": new Date(), "updateDate": new Date(), "nftBurnLocation": data.nftBurnLocation}},{new:true, upsert:true})
		.exec(async (err, result) => {			
			if(err){
				let obj = {"status":0,"data":err}
                deferred.resolve(obj)
			} else {
				self.getCompanyIdIpfs({"userId": mongoose.Types.ObjectId(result.userId),"filterStatus":3})
				const validation = await Promise.all([self.saveNftsContainersAfterBurnData(data)]);
				
				let obj = {"status":1,"data":result}
				deferred.resolve(obj)			
			}		
		});
        return deferred.promise;
	}, 
	
	assignNftsByUserId: async(data)=> {

		var deferred = Q.defer();
		//	IPFS Type :2- Verify, 3- Burned
		//	IPFS Update Status : 1 - genrated, 2- Verify, 3- Burned
					
		ipfsverifydata.findOneAndUpdate({"ipfsHash":data.ipfsHash, "nftVerifyByUserId": {"$elemMatch": {"verifyByUserId": data.verifyByUserId}}},{ "$set": { "nftVerifyByUserId.$.assignEmailId": data.assignEmailId, "status": 1, "nftVerifyByUserId.$.assignUserType": data.assignUserType}},{new:true, upsert:true})
		.exec(async (err, result) => {
			
			if(err){
				let obj = {"status":0,"data":err}
                deferred.resolve(obj)
			} else {
				
				if(result == null){
					
					let obj = {"status":2,"data":result}
					deferred.resolve(obj)
					
				} else {
					
					let obj = {"status":1,"data":result}
					deferred.resolve(obj)
				
				}				
			}		
		});
        return deferred.promise;
	}, 
	verifyHashStatus: async(data)=> {

		// saveNftsReportData - collection

		var deferred = Q.defer();
		//	IPFS Type :2- Verify, 3- Burned
		//	IPFS Update Status : 1 - genrated, 2- Verify, 3- Burned		
		let ipfsHash = data.ipfsHash
		data.status = 2
		delete data.ipfsHash

		// console.log(data,"45t454y5y")


		if(data.boxType == "containers"){

			assignContainerToOthersData.find(
				{
					"assignContainerToOthersIds": {
						"$elemMatch": {
							"nftData.containers": {
								"$elemMatch": {
									"ipfsHash" : ipfsHash
								}
							},
							"factoryUserId": data.nftVerifyByUserId[0].verifyByUserId,
							"userType" : data.userType
						}
					}
				},async (err, result) => {
		
					if(err){
						let obj = {"status":0,"data":err}
						deferred.resolve(obj)				
					} else {
		
						if(result.length > 0){
		
							// Start old One
							let updateData = { $set: {"status": 2, "nftVerifyByUserId": data.nftVerifyByUserId, "nftBurnByUserId": "", "userType": data.userType, "nftVerifyByUserIdDate": new Date(), "updateDate": new Date(), "nftVerifyLocation": data.nftVerifyLocation } }
					
							ipfsUpdatedVerify.findOneAndUpdate({"ipfsHash":ipfsHash},updateData,{new:true, upsert:true}).exec(async (err, newResult) => {			
								if(err){
									let obj = {"status":0,"data":err}
									deferred.resolve(obj)
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
									self.getCompanyIdIpfs({"userId": mongoose.Types.ObjectId(newResult.userId),"filterStatus":1})
									let obj = {"status":1,"data":result}
									deferred.resolve(obj)
								}		
							});
							// End old One
							
							
						} else {
		
							// Start old One
							let updateData = { $set: {"status": 1, "nftVerifyUserFlag": 2, "nftBurnByUserId": "", "userType": data.userType, "nftVerifyByUserIdDate": new Date(), "updateDate": new Date(), "nftVerifyLocation": data.nftVerifyLocation } }
					
							ipfsUpdatedVerify.findOneAndUpdate({"ipfsHash":ipfsHash},updateData,{new:true, upsert:true}).exec(async (err, newResult) => {			
								if(err){
									let obj = {"status":0,"data":err}
									deferred.resolve(obj)
								} else {
		
		
									var reportData = {
										"userId":data.nftVerifyByUserId[0].verifyByUserId,
										"ipfsHash":ipfsHash,
										"nftTokenId":newResult.nftTokenId,
										"nftTransactionHash":newResult.nftTransactionHash,
										"fdaId":newResult.fdaId,
										"data":newResult.data,
										"nftBurnByUserId":newResult.nftBurnByUserId,
										"nftVerifyByUserId":newResult.nftVerifyByUserId,
										"nftSaveUserId":newResult.nftSaveUserId,
										"userType":newResult.userType,
										"nftFlagMsg":"Verify",
										"status":1
									}
		
									saveNftsReportData.create(reportData)
									self.getCompanyIdIpfs({"userId": mongoose.Types.ObjectId(newResult.userId),"filterStatus":1})
									let obj = {"status":2,"data":result}
									deferred.resolve(obj)
								}		
							});
							// End old One
		
						}
					}
		
				});
			
		} else {

			ipfsUpdatedVerify.find({"nftSaveUserId": data.nftVerifyByUserId[0].verifyByUserId}, async (err, result) => {
				if(err){
					let obj = {"status":0,"data":err}
					deferred.resolve(obj)
				} else {

					// if(result.length > 0){

					// 	let obj = {"status":1,"data":result}
					// 	deferred.resolve(obj)

					// } else {

						let updateData = { $set: {"status": 2, "nftVerifyUserFlag": 2, "nftVerifyByUserId": data.nftVerifyByUserId, "nftBurnByUserId": "", "userType": data.userType, "nftVerifyByUserIdDate": new Date(), "updateDate": new Date(), "nftVerifyLocation": data.nftVerifyLocation } }
	
						ipfsUpdatedVerify.findOneAndUpdate({"ipfsHash":ipfsHash},updateData,{new:true, upsert:true}).exec(async (err, newResult) => {			
							if(err){
								let obj = {"status":0,"data":err}
								deferred.resolve(obj)
							} else {

								var reportData = {
									"userId":data.nftVerifyByUserId[0].verifyByUserId,
									"ipfsHash":ipfsHash,
									"nftTokenId":newResult.nftTokenId,
									"nftTransactionHash":newResult.nftTransactionHash,
									"fdaId":newResult.fdaId,
									"data":newResult.data,
									"nftBurnByUserId":newResult.nftBurnByUserId,
									"nftVerifyByUserId":newResult.nftVerifyByUserId,
									"nftSaveUserId":newResult.nftSaveUserId,
									"userType":data.userType,
									"nftFlagMsg":"Verify",
									"status":1
								}
	
								saveNftsReportData.create(reportData)
								self.getCompanyIdIpfs({"userId": mongoose.Types.ObjectId(newResult.userId),"filterStatus":1})
								let obj = {"status":1,"data":newResult}
								deferred.resolve(obj)
							}		
						});

					// }
				}

			});		
			
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
	assignContainerToOthers: async(data)=> {		
		var deferred = Q.defer();
		data.assignContainerStatus = 2
	
		ipfsUpdatedVerify.find({"fdaId": mongoose.Types.ObjectId(data.fdalebelId), "userId":mongoose.Types.ObjectId(data.userId)}, {"fdaId":1,"ipfsHash":1,"nftTokenId":1,"nftTransactionHash":1,"data":"$data"}).exec(async (err, getIpfsData) => {
			
			if(err){
				let obj = {"status":0,"data":err}
				deferred.resolve(obj)
			} else if(getIpfsData.length == 0){
				let obj = {"status":1,"data":[]}
				deferred.resolve(obj)
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

				// let d1 = JSON.stringify(
				// 	getIpfsData[0].assignContainerByFactoryIds[0].nftData
				//   );
				//   let totData1 = getIpfsData.length > 0 ? d1 : [];
				//   totData1 = JSON.parse(totData1);

				let finalArr = [];
				data.assignContainerToOthersIds.forEach((val, ind) => {
					// let assign = parseInt(val.assignContainer);
					// let containers1 = totData1.containers.splice(0, assign);
					// let ln1 = containers1.length
						// ? containers1.length * containers1[0].size
						// : 0;
					// let pallets1 = totData1.pallets.splice(0, assign * ln1);
					// let ln2 = pallets1.length ? pallets1.length * pallets1[0].size : 0;
					// let masterCartons1 = totData1.masterCartons.splice(0, assign * ln2);
					// let ln3 = masterCartons1.length
						// ? masterCartons1.length * masterCartons1[0].size
						// : 0;
					// let innerCartons1 = totData1.innerCartons.splice(0, assign * ln3);
					// let ln4 = innerCartons1.length
						// ? innerCartons1.length * innerCartons1[0].size
						// : 0;
					// let drugs1 = totData1.drugs.splice(0, assign * ln4);
				
				
					let assign = parseInt(val.assignContainer);
					let containerSize = totData1.containers[0].size || 0;
					let palletSize = totData1.pallets[0].size || 0;
					let masterSize = totData1.masterCartons[0].size || 0;
					let innerSize = totData1.innerCartons[0].size || 0;

					let containers1 = totData1.containers.splice(0, assign);
					let ln1 = containers1.length ? containers1.length : 0;
					let pallets1 = totData1.pallets.splice(0, containerSize * ln1);
					let ln2 = pallets1.length ? pallets1.length : 0;
					let masterCartons1 = totData1.masterCartons.splice(0, palletSize * ln2);
					let ln3 = masterCartons1.length ? masterCartons1.length : 0;
					let innerCartons1 = totData1.innerCartons.splice(0, masterSize * ln3);
					let ln4 = innerCartons1.length ? innerCartons1.length : 0;
					let drugs1 = totData1.drugs.splice(0, innerSize * ln4);

					let ar1 = {
						containers: containers1,
						pallets: pallets1,
						masterCartons: masterCartons1,
						innerCartons: innerCartons1,
						drugs: drugs1,
					};
					let data1 = {
						...val,
						nftData: ar1,
						status: 0
					};
					finalArr.push(data1);
					});
					
					let  currentCont = {					
						fdalebelId: data.fdalebelId,
						productId: data.productId
					}
					
					
					let finalData = {
					assignContainerToOthersIds: finalArr,
					...currentCont,
					userId: data.userId,
					manufacturerId: data.manufacturerId,
					assignContainerStatus: data.assignContainerStatus,
					userType: data.userType
					};

					// console.log(finalData, "finalDatafinalDatafinalData")
					// return false
					
					assignContainerToOthersData.create(finalData, async (err, result) => {
						if(err){
							let obj = {"status":0,"data":err}
							deferred.resolve(obj)
						} else {

							await getNftsArray.findOneAndUpdate({"fdalebelId":mongoose.Types.ObjectId(data.fdalebelId),"productId":mongoose.Types.ObjectId(data.productId),"userId":mongoose.Types.ObjectId(data.userId)},{ $set: {"assignContainerStatus": 2 } },{new:true}).exec();
							await getNftsArray.findOneAndUpdate({"fdalebelId":mongoose.Types.ObjectId(data.fdalebelId),"productId":mongoose.Types.ObjectId(data.productId),"userId":mongoose.Types.ObjectId(data.userId),"assignContainerByFactoryIds.factoryId":data.manufacturerId
							},{ $set: {"assignContainerByFactoryIds.$.status": 1 } },{new:true, upsert:true}).exec(async (err, result1) => {
							});
							let obj = {"status":1,"data":result}
							deferred.resolve(obj)
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
	getNftsByFda: async(data)=>{
        var deferred = Q.defer();		
		getNftsArray.find({"fdalebelId":mongoose.Types.ObjectId(data[0].fdalebelId),"productId":mongoose.Types.ObjectId(data[0].productId),"userId":mongoose.Types.ObjectId(data[0].userId)},
		async (err, result) => {
			
			if(err){
				let obj = {"status":0,"data":err}
				deferred.resolve(obj)
			} else {
				let obj = {"status":1,"data":result}
				deferred.resolve(obj)
			}
		});		
		return deferred.promise;
    },
	checkAssignItem:async (data)=>{
        var deferred = Q.defer();

		assignMetaData.aggregate( [
		{
			$match: {
				'_id': mongoose.Types.ObjectId(data.fdalebelId),
				'productId': mongoose.Types.ObjectId(data.productId),
				'userId': mongoose.Types.ObjectId(data.userId)
			}
		},	
		{
			$project:
			{
				"_id" : 1,			
				"container": {
					$map: {
						input: "$container",
						as: "container",
						in: {
							value: {								
								$switch:
								{
									branches: [
										{
											case: { $eq: ["$$container.nfts",data.dataAssign] },											
											then: "success"
										}
									],
									default: "fail"
								}								
							}
						}
					}
				},
				"pallets": {
					$map: {
						input: "$pallets",
						as: "pallets",
						in: {
							value: {								
								$switch:
								{
									branches: [
										{
											case: { $eq: ["$$pallets.nfts",data.dataAssign] },											
											then: "success"
										}
									],
									default: "fail"
								}								
							}
						}
					}
				},
				"masterCartons": {
					$map: {
						input: "$masterCartons",
						as: "masterCartons",
						in: {
							value: {								
								$switch:
								{
									branches: [
										{
											case: { $eq: ["$$masterCartons.nfts",data.dataAssign] },											
											then: "success"
										}
									],
									default: "fail"
								}								
							}
						}
					}
				},
				"innerCartons": {
					$map: {
						input: "$innerCartons",
						as: "innerCartons",
						in: {
							value: {								
								$switch:
								{
									branches: [
										{
											case: { $eq: ["$$innerCartons.nfts",data.dataAssign] },											
											then: "success"
										}
									],
									default: "fail"
								}								
							}
						} 
					}
				},
				"drugs": {
					$map: {
						input: "$drugs",
						as: "drugs",
						in: {
							value: {								
								$switch:
								{
									branches: [
										{
											case: { $eq: ["$$drugs.nfts",data.dataAssign] },											
											then: "success"
										}
									],
									default: "fail"
								}								
							}
						}
					}
				}
			}
		},
		{
			"$group":
			{
				"_id":"$_id",
				"container":{"$first": { $arrayElemAt: [ "$container.value", 0 ] } },
				"pallets":{"$first": { $arrayElemAt: [ "$pallets.value", 0 ] } },
				"masterCartons":{"$first": { $arrayElemAt: [ "$masterCartons.value", 0 ] } },
				"innerCartons":{"$first": { $arrayElemAt: [ "$innerCartons.value", 0 ] } },
				"drugs":{"$first": { $arrayElemAt: [ "$drugs.value", 0 ] } }
			}
		}
		]).exec((err, result) => {

			if (err) {
				let obj = {"status":0,"data":err}
                deferred.resolve(obj)
			} else {
				
				var filterData = Object.assign({}, result)[0]
				
				let obj = {};
				for(let key in filterData){
					if(filterData[key] == "success"){
						obj[key] = filterData[key];
					}
				}
				
				if(Object.keys(obj).length > 0){					
					let obj = {"status":1}
					deferred.resolve(obj)
				} else {
					let obj = {"status":0}
					deferred.resolve(obj)
				}			
			}
		});
        return deferred.promise;
    },
	assignContainer_old:async (data)=>{
        var deferred = Q.defer();
		
		getNftsArray.find({"fdalebelId":mongoose.Types.ObjectId(data.fdalebelId),"productId":mongoose.Types.ObjectId(data.productId),"userId":mongoose.Types.ObjectId(data.userId)},
		async (err, result) => {			
			if(err){
				
				let obj = {"status":0,"data":err}
				deferred.resolve(obj)
				
			} else {
				
				data.assignContainerByFactoryIds.filter(async (item)=>{
					var genrateNfts = result.splice(0,item.assignContainer)
					let updatedArray = []
					genrateNfts.filter(async (filterId)=> {
						updatedArray.push(filterId._id)
					});
					await getNftsArray.findOneAndUpdate({"_id":{"$in": updatedArray}},{"$set": {"factoryId": item.factoryId}},{new:true}).exec();				
				});				
			}
		});
		assignFactotry.findOneAndUpdate({"fdalebelId":mongoose.Types.ObjectId(data.fdalebelId),"productId":mongoose.Types.ObjectId(data.productId),"userId":mongoose.Types.ObjectId(data.userId)},{"$set": data},{new:true, upsert:true},async (err, result) => {
			if(err){
				let obj = {"status":0,"data":err}
				deferred.resolve(obj)
			} else {
				
				await generatedUpdateStatus.findOneAndUpdate({"fdalebelId":mongoose.Types.ObjectId(data.fdalebelId),"productId":mongoose.Types.ObjectId(data.productId),"userId":mongoose.Types.ObjectId(data.userId)},{ $set: {"generatedNftStatus": 2 } },{new:true, upsert:true}).exec(async (err, result1) => {
				});
				let obj = {"status":1,"data":result}
				deferred.resolve(obj)
			}
		});
        return deferred.promise;
    },
	assignContainer:async (data)=>{
        var deferred = Q.defer();
		data.assignContainerStatus = 1
		
		
		
		
		ipfsUpdatedVerify.find({"fdaId": mongoose.Types.ObjectId(data.fdalebelId), "userId":mongoose.Types.ObjectId(data.userId)}, {"fdaId":1,"ipfsHash":1,"nftTokenId":1,"nftTransactionHash":1,"data":"$data"}).exec(async (err, getIpfsData) => {
			
			if(err){
				let obj = {"status":0,"data":err}
                deferred.resolve(obj)
			} else if(getIpfsData.length == 0){
				let obj = {"status":1,"data":[]}
				deferred.resolve(obj)
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

				let finalArr = [];
				data.assignContainerByFactoryIds.forEach((val, ind) => {
				  // let assign = parseInt(val.assignContainer);
				  // let containers1 = totData1.containers.splice(0, assign);
				  // let ln1 = containers1.length
					// ? containers1.length * containers1[0].size
					// : 0;
				  // let pallets1 = totData1.pallets.splice(0, assign * ln1);
				  // let ln2 = pallets1.length ? pallets1.length * pallets1[0].size : 0;
				  // let masterCartons1 = totData1.masterCartons.splice(0, assign * ln2);
				  // let ln3 = masterCartons1.length
					// ? masterCartons1.length * masterCartons1[0].size
					// : 0;
				  // let innerCartons1 = totData1.innerCartons.splice(0, assign * ln3);
				  // let ln4 = innerCartons1.length
					// ? innerCartons1.length * innerCartons1[0].size
					// : 0;
				  // let drugs1 = totData1.drugs.splice(0, assign * ln4);
				  
				  
				      let assign = parseInt(val.assignContainer);
					  let containerSize = totData1.containers[0].size || 0;
					  let palletSize = totData1.pallets[0].size || 0;
					  let masterSize = totData1.masterCartons[0].size || 0;
					  let innerSize = totData1.innerCartons[0].size || 0;

					  let containers1 = totData1.containers.splice(0, assign);
					  let ln1 = containers1.length ? containers1.length : 0;
					  let pallets1 = totData1.pallets.splice(0, containerSize * ln1);
					  let ln2 = pallets1.length ? pallets1.length : 0;
					  let masterCartons1 = totData1.masterCartons.splice(0, palletSize * ln2);
					  let ln3 = masterCartons1.length ? masterCartons1.length : 0;
					  let innerCartons1 = totData1.innerCartons.splice(0, masterSize * ln3);
					  let ln4 = innerCartons1.length ? innerCartons1.length : 0;
					  let drugs1 = totData1.drugs.splice(0, innerSize * ln4);

				  let ar1 = {
					containers: containers1,
					pallets: pallets1,
					masterCartons: masterCartons1,
					innerCartons: innerCartons1,
					drugs: drugs1,
				  };
				  let data1 = {
					...val,
					nftData: ar1,
				  };
				  finalArr.push(data1);
				});
				
				let  currentCont = {					
					fdalebelId: data.fdalebelId,
					productId: data.productId,
					_id: data._id,
				}
				
				
				let finalData = {
				  assignContainerByFactoryIds: finalArr,
				  ...currentCont,
				  userId: data.userId,
				  assignContainerStatus: data.assignContainerStatus,
				};
				
				// console.log("MMMMMMMMMMMMM")
				// console.log(finalData)
				// return false

				getNftsArray.create(finalData, async (err, result) => {
					if(err){
						let obj = {"status":0,"data":err}
						deferred.resolve(obj)
					} else {								
						await generatedUpdateStatus.findOneAndUpdate({"fdalebelId":mongoose.Types.ObjectId(data.fdalebelId),"productId":mongoose.Types.ObjectId(data.productId),"userId":mongoose.Types.ObjectId(data.userId)},{ $set: {"generatedNftStatus": 2 } },{new:true, upsert:true}).exec(async (err, result1) => {
						});
						let obj = {"status":1,"data":result}
						deferred.resolve(obj)
					}
				});
			}			
		});		
        return deferred.promise;
    },
	viewContainerByFactory:async (data)=> {
        var deferred = Q.defer();
		
		assignFactotry.aggregate([          
			{
				$match: {
					'fdalebelId': mongoose.Types.ObjectId(data.fdalebelId),
					'productId': mongoose.Types.ObjectId(data.productId),
					'userId': mongoose.Types.ObjectId(data.userId)
				}
			},
			{
				$unwind: {
					"path": "$assignContainerByFactoryIds",
					"preserveNullAndEmptyArrays": true
				}
			},
			{
				$unwind: {
					"path": "$assignContainerByFactoryIds.factoryId",
					"preserveNullAndEmptyArrays": true
				}
			},
			{
				$lookup: {
					from: "tbl_fdalebelmetadata",
					localField: "fdalebelId",
					foreignField: "_id",
					as: "metadata"
				}
			},
			{
				$unwind: {
					"path": "$metadata",
					"preserveNullAndEmptyArrays": true
				}
			},
			{
				"$project":
				{
					"factoryName": "$assignContainerByFactoryIds.factoryName",
					"factoryId": "$assignContainerByFactoryIds.factoryId",
					"assignContainer": "$assignContainerByFactoryIds.assignContainer",
					"fdalebelId": "$fdalebelId",
					"productId": "$productId",
					"userId": "$userId",
					"createdDate": "$createdDate",
					"deliveryStatus": "$deliveryStatus",
					"status": "$status",
					"updateDate": "$updateDate",
					"container": "$assignContainerByFactoryIds.assignContainer",
					"pallets": {
						"$cond": {
							"if": {
								"$gt": [ {"$size": "$metadata.pallets" }, 0 ]
							},
							"then": {								
								"$multiply": [{ $first: "$metadata.container.totalContainerNfts" },"$assignContainerByFactoryIds.assignContainer"]
							},
							"else": 0
						}
					},
					"masterCartons": {
						"$cond": {
							"if": {
								"$gt": [ {"$size": "$metadata.pallets" }, 0 ]
							},
							"then": {								
								"$multiply": [{ $first: "$metadata.pallets.totalContainerNfts" },{								
								"$multiply": [{ $first: "$metadata.container.totalContainerNfts" },"$assignContainerByFactoryIds.assignContainer"]
							}]
							},
							"else": 0
						}
					},
					"innerCartons": {
						"$cond": {
							"if": {
								"$gt": [ {"$size": "$metadata.innerCartons" }, 0 ]
							},
							"then": {								
								"$multiply": [{ $first: "$metadata.masterCartons.totalContainerNfts" },{								
								"$multiply": [{ $first: "$metadata.pallets.totalContainerNfts" },{								
								"$multiply": [{ $first: "$metadata.container.totalContainerNfts" },"$assignContainerByFactoryIds.assignContainer"]
							}]
							}]
							},
							"else": 0
						}
					},
					"drugs": {
						"$cond": {
							"if": {
								"$gt": [ {"$size": "$metadata.drugs" }, 0 ]
							},
							"then": {								
								"$multiply": [{ $first: "$metadata.innerCartons.totalContainerNfts" }, {								
								"$multiply": [{ $first: "$metadata.masterCartons.totalContainerNfts" },{								
								"$multiply": [{ $first: "$metadata.pallets.totalContainerNfts" },{								
								"$multiply": [{ $first: "$metadata.container.totalContainerNfts" },"$assignContainerByFactoryIds.assignContainer"]
							}]
							}]
							}]
							},
							"else": 0
						}
					}			
				}
			},
		]).exec(async (err, result) => {
			if (err) {
				let obj = {"status":0,"data":err}
                deferred.resolve(obj)
			} else {
				
				let filterNfts = await self.getNftsByFda(result)
				var filterArray = result.filter((item)=>{
					item.genrateNfts = filterNfts.data.splice(0,item.assignContainer)
					return result
				});			
				let obj = {"status":1,"data":filterArray}
                deferred.resolve(obj)
			}
		});
		
		return deferred.promise;
    },
	getUserInfo: async(userId)=>{
        var deferred = Q.defer();		
		getRegisterData.findOne({"_id":mongoose.Types.ObjectId(userId)},
		async (err, result) => {
			if(err){
				let obj = {"status":0,"data":err}
				deferred.resolve(obj)
			} else {
				let obj = {"status":1,"data":result}
				deferred.resolve(obj)
			}
		});		
		return deferred.promise;
    },
	viewContainerByfdalebelId: async(fdalebelId)=>{
        var deferred = Q.defer();		
		getNftsArray.findOne({"fdalebelId":mongoose.Types.ObjectId(fdalebelId), status:1},
		(err, result) => {
			if(err){
				let obj = {"status":0,"data":err}
				deferred.resolve(obj)
			} else {
				let obj = {"status":1,"data":result}
				deferred.resolve(obj)
			}
		});		
		return deferred.promise;
    },
	viewContainerFactoryById_old:async (data)=> {
        var deferred = Q.defer();
		
		getNftsArray.aggregate([          
			{
				$match: {
					'factoryId': mongoose.Types.ObjectId(data.userId) || data.userId
				}
			},
			{
				"$project":
				{
					"_id": 1,
					"fdalebelId": 1,
					"productId": 1,
					"userId": 1,
					"container": 1,
					"factoryId": 1
				}
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
				"$lookup": {
					"from": "tbl_assignContainerFactoryById",
					"let": { "productId": "$productId", "userId": "$userId", "fdalebelId": "$fdalebelId" },
					"pipeline": [
						{ 
							"$match": {
								"$expr": {
									"$eq": [ "$$productId", "$productId" ],
									"$eq": [ "$$userId", "$userId" ],
									"$eq": [ "$$fdalebelId", "$fdalebelId" ]
								}
							}
						}    
					],
					"as": "assignContainerDetails"
				}
			},
			{ "$unwind": "$assignContainerDetails" },
			{
				"$lookup": {
					"from": "tbl_user",
					"localField": "userId",
					"foreignField": "_id",
					"as": "userDetails"
				}
			},
			{ "$unwind": "$userDetails" },
			{
				"$lookup": {
					"from": "tbl_products",
					"localField": "productId",
					"foreignField": "_id",
					"as": "productDetails"
				}
			},
			{ "$unwind": "$productDetails" },
			{
				"$project":
				{
					"_id": 1,
					"fdalebelId": 1,
					"productId": 1,
					"userId": 1,
					"container": 1,
					"factoryId": 1,
					"orderData": 1,
					"createdDate": "$assignContainerDetails.createdDate",
					"assignContainerDetails": {
							$filter: {
								input: "$assignContainerDetails.assignContainerByFactoryIds",
								as: "factoryInfos",
								cond: { $eq: [{"$$factoryInfos.factoryId":data.userId},{"$$factoryInfos.factoryId":mongoose.Types.ObjectId(data.userId)}]}
							}
					},
					"productDetails": 1,
					"userName": "$userDetails.firstName"					
				}
			},
			{
				$lookup: {
					from: "tbl_fdalebelmetadata",
					localField: "fdalebelId",
					foreignField: "_id",
					as: "metadata"
				}
			},
			{
				$unwind: {
					"path": "$metadata",
					"preserveNullAndEmptyArrays": true
				}
			},
			{
				"$project":
				{
					
					"_id": 1,
					"fdalebelId": 1,
					"productId": 1,
					"userId": 1,
					"container": 1,
					"factoryId": 1,
					"assignContainerDetails": 1,
					"createdDate": 1,
					"pallets": {
						"$cond": {
							"if": {
								"$gt": [ {"$size": "$metadata.pallets" }, 0 ]
							},
							"then": {								
								"$multiply": [{ $first: "$metadata.container.totalContainerNfts" },{ $first: "$assignContainerDetails.assignContainer" }]
							},
							"else": 0
						}
					},
					"masterCartons": {
						"$cond": {
							"if": {
								"$gt": [ {"$size": "$metadata.pallets" }, 0 ]
							},
							"then": {								
								"$multiply": [{ $first: "$metadata.pallets.totalContainerNfts" },{								
								"$multiply": [{ $first: "$metadata.container.totalContainerNfts" },{ $first: "$assignContainerDetails.assignContainer" }]
							}]
							},
							"else": 0
						}
					},
					"innerCartons": {
						"$cond": {
							"if": {
								"$gt": [ {"$size": "$metadata.innerCartons" }, 0 ]
							},
							"then": {								
								"$multiply": [{ $first: "$metadata.masterCartons.totalContainerNfts" },{								
								"$multiply": [{ $first: "$metadata.pallets.totalContainerNfts" },{								
								"$multiply": [{ $first: "$metadata.container.totalContainerNfts" },{ $first: "$assignContainerDetails.assignContainer" }]
							}]
							}]
							},
							"else": 0
						}
					},
					"drugs": {
						"$cond": {
							"if": {
								"$gt": [ {"$size": "$metadata.drugs" }, 0 ]
							},
							"then": {								
								"$multiply": [{ $first: "$metadata.innerCartons.totalContainerNfts" }, {								
								"$multiply": [{ $first: "$metadata.masterCartons.totalContainerNfts" },{								
								"$multiply": [{ $first: "$metadata.pallets.totalContainerNfts" },{								
								"$multiply": [{ $first: "$metadata.container.totalContainerNfts" },{ $first: "$assignContainerDetails.assignContainer" }]
							}]
							}]
							}]
							},
							"else": 0
						}
					},
					"productDetails": 1,
					"userName": 1
				}
			},
			{
				"$project":
				{
					
					"_id": 1,
					"fdalebelId": 1,
					"productId": 1,
					"userId": 1,
					"container": 1,
					"factoryId": 1,
					"orderData": 1,
					"assignContainerDetails": 1,
					"createdDate": 1,
					"noOfNfts":  { $sum: [{ $first: "$assignContainerDetails.assignContainer" },"$pallets","$masterCartons","$innerCartons","$drugs", ]  },
					"productDetails": 1,
					"userName": 1
				}
			},
		]).exec(async (err, result) => {
			
			if (err) {
				let obj = {"status":0,"data":err}
				deferred.resolve(obj)
			} else {
				
				let obj = {"status":1,"data":result}
				deferred.resolve(obj)
			}
		});
		
		return deferred.promise;
    },
	getFactoryIds: async(data)=> {
		var deferred = Q.defer();		
		getFactoryInfo.findOne({"userId":mongoose.Types.ObjectId(data.userId), "status": 1, 'userType': 1},
		{"_id":1, "factoryInfo": 1})
		.exec(async (err, result) => {
			if(err){
				let obj = {"status":0,"data":err}
                deferred.resolve(obj)
			} else {
				result = _.filter(result.factoryInfo, { 'manufacturerBYId': undefined });
				let filterArray = []
				result.filter(item => filterArray.push(item._id.toString()))
				let obj = {"status":1,"data":filterArray}
				deferred.resolve(obj)			
			}		
		});
        return deferred.promise;
	},
	viewContainerCompanyFactoryById:async (data)=> {
        var deferred = Q.defer();
		
		const getFactories = await Promise.all([self.getFactoryIds(data)]);
		
		getNftsArray.aggregate([          
			{
				$match: {					
					status: 1,
					"assignContainerByFactoryIds": {
						"$elemMatch": {
							$or: [{"factoryId": { $in : getFactories[0].data } }]							
						}
					}				
				}
			},			
			{
				"$lookup": {
					"from": "tbl_products",
					"localField": "productId", 
					"foreignField": "_id",
					"as": "productDetails"
				}
			},
			{ "$unwind": "$productDetails" },
			{
				"$lookup": {
					"from": "tbl_user",
					"localField": "userId", 
					"foreignField": "_id",
					"as": "userDetails"
				}
			},
			{ "$unwind": "$userDetails" },
			{
				"$project":
				{
					"_id": 1,
					"firstName": "$userDetails.firstName",
					"lastName": "$userDetails.lastName",
					"assignContainerStatus": 1,
					"productDetails":1,
					"fdalebelId": 1,
					"userId":1,
					"productId": 1,
					"createdDate": 1,
					assignContainerByFactoryIds: {
                        '$filter': {
                            input: '$assignContainerByFactoryIds',
                            as: 'assignContainerByFactoryIds',
                            cond: {
								"$and": [
									{ "$in": [ "$$assignContainerByFactoryIds.factoryId", getFactories[0].data ] }
								  ]
							}
                        }
                     }					
				}
			},


		]).exec(async (err, result) => {
			
			if (err) {
				let obj = {"status":0,"data":err}
				deferred.resolve(obj)
			} else {
				
				let obj = {"status":1,"data":result}
				deferred.resolve(obj)
			}
		});
		
		return deferred.promise;
    },
	viewContainerFactoryById:async (data)=> {
        var deferred = Q.defer();		
		getNftsArray.aggregate([          
			{
				$match: {					
					status: 1,
					"assignContainerByFactoryIds": {
						"$elemMatch": {
							$or: [{"factoryId": data.userId },{"factoryId":mongoose.Types.ObjectId(data.userId)}]							
						}
					}				
				}
			},			
			{
				"$lookup": {
					"from": "tbl_products",
					"localField": "productId", 
					"foreignField": "_id",
					"as": "productDetails"
				}
			},
			{ "$unwind": "$productDetails" },
			{
				"$lookup": {
					"from": "tbl_user",
					"localField": "userId", 
					"foreignField": "_id",
					"as": "userDetails"
				}
			},
			{ "$unwind": "$userDetails" },
			{
				"$project":
				{
					"_id": 1,
					"firstName": "$userDetails.firstName",
					"lastName": "$userDetails.lastName",									
					"productDetails":1,
					"fdalebelId": 1,
					"assignContainerStatus": 1,
					"userId":1,
					"productId": 1,
					"createdDate": 1,
					assignContainerByFactoryIds: {
                        '$filter': {
                            input: '$assignContainerByFactoryIds',
                            as: 'assignContainerByFactoryIds',
                            cond: { 
								// $eq: ['$$assignContainerByFactoryIds.factoryId', data.userId]
								$or: [ 
									{ $eq: ["$$assignContainerByFactoryIds.factoryId", data.userId] }, 
									{ $eq: ["$$assignContainerByFactoryIds.factoryId", mongoose.Types.ObjectId(data.userId)] }, 
								]
							}
                        }
                     }					
				}
			},


		]).exec(async (err, result) => {
			
			if (err) {
				let obj = {"status":0,"data":err}
				deferred.resolve(obj)
			} else {
				
				let obj = {"status":1,"data":result}
				deferred.resolve(obj)
			}
		});
		
		return deferred.promise;
    }, 
	getdatafromipfshash:async (ipfshash)=> {

		var deferred = Q.defer();
		
		ipfsUpdated.aggregate([
            {
				$match: {
					ipfsHash:ipfshash
				}
			},
			{
				$unwind: {
					"path": "$ipfsdata",
					"preserveNullAndEmptyArrays": true
				}
			},
			{
                $project: {
                    "ipfsHash": 1,
					"productId": {
						"$toObjectId": "$data.productId"
					},
					"data": 1,
                    "srNo": "$data.srNo",
					"nftSaveUserId": { "$ifNull": [ "$nftSaveUserId", "" ] },
                    "nftTokenId": { "$ifNull": [ "$nftTokenId", "" ] },
                    "nftTransactionHash": { "$ifNull": [ "$nftTransactionHash", "" ] },
                    "nftBurnByUserId": { "$ifNull": [ "$nftBurnByUserId", "" ] },
                    "nftVerifyByUserId": { "$ifNull": [ {"$last": "$nftVerifyByUserId"}, "" ] },
                    "userType": { "$ifNull": [ "$userType", "" ] },
                    "fdaId": "$fdaId" ? "$fdaId" : "",
                    "status": 1,
                    "createdDate": 1,
                    "updateDate": 1,
                }
            },
            {
                $lookup: {
                    from: "tbl_products",					
					localField: "productId",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },                              
            {
                "$unwind": {
                    "path": "$productDetails",
                    "preserveNullAndEmptyArrays": true
                }
            },
			{
				$sort: {
					"_id":-1
				}
			}
        ]).exec((err, result) => {
            if (err) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;

		
    }, 
};