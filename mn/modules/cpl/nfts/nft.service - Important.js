//const userModel = require('./user.model');
const { assignFactotry,getOrder,assignMetaData, generatedUpdateStatus, getNftsArray, getRegisterData, assignContainerToOthersData, ipfsverifydata, getFactoryInfo, saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain }  = require('./nft.model');
const {ipfsdata}  = require('../fdalabelmetadata/metadata.model');
const {productModel}  = require('../product/product.model');
_ = require('lodash');
const Q = require('q');

let self = module.exports = {
	
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
	saveNftsData: async(data)=> {
		var deferred = Q.defer();
		
		await ipfsdata.findOneAndUpdate({"ipfsHash" : data.ipfsHash},{"$set": {"nftSaveUserId":mongoose.Types.ObjectId(data.userId)}},{new: true, upsert: true})
		
		const validation = await Promise.all([self.getCheckAssignContainers(data)]);
		
		
		console.log("MMMMMMMMMMMM")
		console.log(validation)
		console.log(validation[0].data)
		return false;
		
		if(validation[0].status == 1){
			
			// saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain
			
			let containerIdArray = []
			validation[0].data.filter((item) => { containerIdArray.push({"containerId": item._id, "ipfsHash": data.ipfsHash, "userId": data.userId, "fdaId": data.fdaId}); return item });
			
			saveNftsPalletsInChain.create(containerIdArray, async (err, resultData) => {				
				if (err) {
					let obj = {"status":0,"data":err}
					deferred.resolve(obj)
				} else {
					
					let obj = {"status":1,"data":resultData}
					deferred.resolve(obj)
				}				
			});
			
			
		} else {
			
			if(data.type == "pallets"){
				
				let containerIdArray = []
				validation[0].data.filter((item) => { containerIdArray.push(item._id); return item });
				
				saveNftsPalletsInChain.aggregate([          
					{
						$match: {
							"containerId": {"$in":  containerIdArray}
						}
					},
				]).exec(async (err, result) => {
					
					const unique = result.filter(function (a) {
						var key = a.class + '|' + a.containerId;
						if (!this[key]) {
							this[key] = true;
							return true;
						}
					}, Object.create(null));
					
					var res = {};
					result.forEach(function(item) {
					  res[item.containerId] = (res[item.containerId] || 0) + 1;
					  
					})
					
					var arrayData = [];
					for (var key in res) {
						arrayData.push({"containerId": [key][0], "count": res[key]});
					}
					
					const newResult = Object.values([...arrayData, ...unique].reduce((newResult, {containerId,...rest}) => {
					  newResult[containerId] = {
						...(newResult[containerId] || {}),
						containerId,
						...rest
					  };
					  return newResult;
					}, {}));
					
					newResult.forEach((key, value)=> {					
						if(key['count'] < parseInt(validation[0].data[0].perPalletsCount)){
							saveNftsPalletsInChain.create({"containerId": key['containerId'], "ipfsHash": data.ipfsHash, "userId": data.userId, "fdaId": data.fdaId},
							async (err, resultData) => {
								if (err) {
									let obj = {"status":0,"data":err}
									deferred.resolve(obj)
								} else {
									let obj = {"status":1,"data":resultData}
									deferred.resolve(obj)
								}				
							});
							throw BreakException;
						} else {
							let obj = {"status":0,"data":{}}
							deferred.resolve(obj)
						}
					})								
				});
				
			} else if(data.type == "masterCartons") {
				
				
				console.log("MMMMMMMMMMMM")
				console.log(validation[0].data)
				return false;
				
				// saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain
				
				let containerIdArray = []
				validation[0].data.filter((item) => { containerIdArray.push(item._id); return item });
				
				saveNftsPalletsInChain.aggregate([          
					{
						$match: {
							"containerId": {"$in":  containerIdArray}
						}
					}
				]).exec(async (err, result) => {
					
					result.forEach((key, value)=> {
						
						if(key['count'] < parseInt(data.size)){
							saveNftsMastersInChain.create({"containerId": key['containerId'], "palletId": key['_id'],  "ipfsHash": data.ipfsHash, "userId": data.userId, "fdaId": data.fdaId},
							async (err, resultData) => {
								if (err) {
									let obj = {"status":0,"data":err}
									deferred.resolve(obj)
								} else {
									let obj = {"status":1,"data":resultData}
									deferred.resolve(obj)
								}				
							});
							throw BreakException;
						} else {
							let obj = {"status":0,"data":{}}
							deferred.resolve(obj)
						}						
					})					
													
				});				
			}		
			
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
				"$addFields": {
					"factoryUserId":{"$toObjectId": data.factoryUserId}
				}
			},
			{
				"$lookup": {
					"from": "tbl_user",
					"localField": "factoryUserId", 
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
	hashBurnByUserId: async(data)=> {

		var deferred = Q.defer();
		//	IPFS Type :2- Verify, 3- Burned
		//	IPFS Update Status : 1 - genrated, 2- Verify, 3- Burned
		
		ipfsverifydata.findOneAndUpdate({"ipfsHash":data.ipfsHash},{ "$set": { "status": 3, "nftBurnByUserId": data.nftBurnByUserId, "userType": data.userType}},{new:true, upsert:true})
		.exec(async (err, result) => {			
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

		var deferred = Q.defer();
		//	IPFS Type :2- Verify, 3- Burned
		//	IPFS Update Status : 1 - genrated, 2- Verify, 3- Burned		
		let ipfsHash = data.ipfsHash
		data.status = 2
		delete data.ipfsHash
		
		let updateData = { $set: {"status": 2, "nftVerifyByUserId": data.nftVerifyByUserId, "nftBurnByUserId": "", "userType": data.userType } }
		
		ipfsverifydata.findOneAndUpdate({"ipfsHash":ipfsHash},updateData,{new:true, upsert:true}).exec(async (err, result) => {			
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
	assignContainerToOthers: async(data)=> {		
		var deferred = Q.defer();
		data.assignContainerStatus = 2
		assignContainerToOthersData.create(data, async (err, result) => {            
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
		getNftsArray.create(data, async (err, result) => {            
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
		
		ipfsdata.aggregate([
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