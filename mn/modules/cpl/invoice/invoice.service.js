
// const { OrderInfo,TaxInfo,PaymentInfo,BillingInfo } = require('./invoice.model');
const Q = require('q');
mongoose = require('mongoose');
_ = require('lodash');

let self = module.exports = {    
    listInvoiceByUserId: (info) => {
        var deferred = Q.defer();
        let [OrderInfo,TaxInfo,PaymentInfo,BillingInfo] = info.schema;
        let userId = info.userId;        
        let serchData = Number(info.serchData);
        if(serchData >=0){
            var match = {
                userId:mongoose.Types.ObjectId(userId),
                paymentStatus:serchData
            }
        }else{           
            var match = {
                userId:mongoose.Types.ObjectId(userId)                
            }  
        }
        OrderInfo.aggregate([
            { $match: match },
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
                $lookup: {
                    from: "tbl_fdalebelmetadata",
                    localField: "fdalebelId",
                    foreignField: "_id",
                    as: "fdalebelDetails"
                }
            },                              
            {
                "$unwind": "$fdalebelDetails"
            },
            { "$addFields": { "subscriptionPackageId": { "$toObjectId": "$fdalebelDetails.subscriptionPackage" }}},
            {
                $lookup: {
                    from: "tbl_priceList",
                    localField: "subscriptionPackageId",
                    foreignField: "_id",
                    as: "priceList"
                }
            },                              
            {
                "$unwind": {
                    "path": "$priceList",
                    "preserveNullAndEmptyArrays": true
                }
            },
			// { 
				// "$lookup": {
					// "from": "tbl_blockChainIpfsData",
					// "let": { "userId": "$userId", "fdalebelId": "$fdalebelId" },
					// "pipeline": [
						// { 
							// "$match": {
								// "$expr": {
									// "$eq": [ "$$userId", "$userId" ],
									// "$eq": [ "$$fdalebelId", "$fdaId" ]
								// }
							// }
						// },
						// { 
							// "$project": {
								// "data": 1,
								// "fdaId": 1,
								// "ipfsHash": 1,
								// "nftTokenId": 1,
								// "nftTransactionHash": 1,
								// "userId": 1,
							// } 
						// }
					// ],
					// "as": "blockChainIpfsData"
				// }
			// },
			{
                $project: {
                    // "fdaIpfsData": "$blockChainIpfsData",
                    "productId": 1,
                    "userId": 1,
                    "invoiceNumber": 1,
                    "fdalebelId":1,
                    "overDueDays": 1,
                    "dueDate": 1,
                    "paymentType": 1,
                    "paymentStatus": 1,
                    "totalNfts": 1,
                    "price": "$priceList.price",
                    "priceType": "$priceList.priceType",
                    "totalPrice": "$totalPriceINR",
                    "createdDate": 1,
                    "generatedNftStatus":1,
                    "packagingType": '$productDetails.packagingType',
                    // "batchLotNo": '$productDetails.batchLotNo',
                    "purchaseOrderNo": '$productDetails.purchaseOrderNo',
                    "productName": '$productDetails.productName',
                    "brandName": '$productDetails.brandName',
                    "firstPackagingDetails": {"$first": "$fdalebelDetails.packagingDetails"},
                    "packagingDetails": "$productDetails.packagingDetails",
                    "containers":{ $arrayElemAt: [ "$fdalebelDetails.containers.nfts", 0 ] },
                    "pallets":{ $arrayElemAt: [ "$fdalebelDetails.pallets.nfts", 0 ] },
                    "masterCartons":{ $arrayElemAt: [ "$fdalebelDetails.masterCartons.nfts", 0 ] },
                    "innerCartons":{ $arrayElemAt: [ "$fdalebelDetails.innerCartons.nfts", 0 ] },
                    "product":{ $arrayElemAt: [ "$fdalebelDetails.product.nfts", 0 ] },

                    "batchLotNo":"$fdalebelDetails.batchLotNo",
                    "manufacturDate":"$fdalebelDetails.manufacturDate",
                    "expiryDate":"$fdalebelDetails.expiryDate",
                    "purchaseOrderNo":"$fdalebelDetails.purchaseOrderNo",
                    "subscriptionPackage":"$fdalebelDetails.subscriptionPackage",
                    "packagingStandard":"$fdalebelDetails.packagingStandard",
                    "packagingStandardValue":"$fdalebelDetails.packagingStandardValue",
                    "subscriptionValue":"$priceList.subscriptionValue",
                    "packageName":"$priceList.packageName", 
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

                var filterArray = []
                let res = result.filter(async (val)=>{
                    let val1 = val[val['firstPackagingDetails']];
                    console.log(val1, "val1val1val1")
                    if(val1 != undefined){
                        val.containerNo = val1
                    } else {
                        val.containerNo = ""
                    }                    
                    return val
                });
                let obj = { "status": 1, "data": res }

                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },
    invoiceView: (info) => {
        var deferred = Q.defer();
        let [OrderInfo,TaxInfo,PaymentInfo,BillingInfo] = info.schema;

        OrderInfo.aggregate([
            {
                $match: {
                    _id:mongoose.Types.ObjectId(info.invoiceId)
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
                "$unwind": "$productDetails"
            },
            {
                $lookup: {
                    from: "tbl_company_info",
                    localField: "userId",
                    foreignField: "userId",
                    as: "companyAddress"
                }
            },                              
            {
                "$unwind": "$companyAddress"
            },
            {
                $project: {
                    "productId": 1,
                    "userId": 1,
                    "invoiceNumber": 1,
                    "fdalebelId":1,
                    "purchaseOrderNo": 1,
                    "overDueDays": 1,
                    "dueDate": 1,
                    "paymentType": 1,
                    "paymentStatus": 1,
                    "totalNfts": { $convert: { input: "$totalNfts", to: "int" } },
                    "totalPriceUSD": 1,
                   // "totalPriceINR": 1,
                    "createdDate": 1,
                    "packagingType": '$productDetails.packagingType',
                    "batchLotNo": '$productDetails.batchLotNo',
                    "purchaseOrderNo": '$productDetails.purchaseOrderNo',
                    "productName": '$productDetails.productName',
                    "brandName": '$productDetails.brandName',
                    'companyAddress.registerInfo':1                   
                }
            }
        ]).exec( async (err, result) => {
            if (err) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {
                let perNetPrice =  1;
                let tax = "USD";
                let taxValue =  await self.findTaxDetails(tax,info.schema);
                let billInfo =  await self.findSuperAdminDetails(info.schema);
                result.map((item)=> {
                    item.taxValue = (taxValue != null) ? item.value : "";
                    item.perNetPrice = perNetPrice;
                    item.billInfoTo = "";
                    return item
                })
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },
    findTaxDetails:(type,data) => {   
        var deferred = Q.defer();
        let [OrderInfo,TaxInfo,PaymentInfo,BillingInfo] = data;
        TaxInfo.findOne({ type: type },{value:1,_id:0}, (err, result) => {
            if(err){                
                deferred.resolve(err)
            } else {               
                deferred.resolve(result) 
            }
        });
        return deferred.promise;
    },
    findSuperAdminDetails:(data) => {    
        var deferred = Q.defer();
        let [OrderInfo,TaxInfo,PaymentInfo,BillingInfo] = data;
        BillingInfo.find({}, (err, result) => {
            if(err){                
                deferred.resolve(err)
            } else {               
                deferred.resolve(result) 
            }
        });
        return deferred.promise;
    } 
};