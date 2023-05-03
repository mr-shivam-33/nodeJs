
const { OrderInfo,TaxInfo,PaymentInfo,BillingInfo } = require('./invoice.model');
const Q = require('q');
mongoose = require('mongoose');
_ = require('lodash');

let self = module.exports = {    
    listInvoiceByUserId: (info) => {
        var deferred = Q.defer();
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
                    "totalPriceUSD": 1,
                    "totalPriceINR": 1,
                    "createdDate": 1,
                    "generatedNftStatus":1,
                    "packagingType": '$productDetails.packagingType',
                    "batchLotNo": '$productDetails.batchLotNo',
                    "purchaseOrderNo": '$productDetails.purchaseOrderNo',
                    "productName": '$productDetails.productName',
                    "brandName": '$productDetails.brandName',
                    'containerNo':{ $arrayElemAt: [ "$fdalebelDetails.container.nfts", 0 ] }
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
    invoiceView: (info) => {
        var deferred = Q.defer();
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
                "$unwind": {
                    "path": "$productDetails",
                    "preserveNullAndEmptyArrays": true
                }
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
                "$unwind": {
                    "path": "$companyAddress",
                    "preserveNullAndEmptyArrays": true
                }
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
                    "totalNfts": 1,
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
                let perNetPrice =  0.10;
                let tax = "USD";
                let taxValue =  await self.findTaxDetails(tax);
                result[0].taxValue = taxValue.value;
                result[0].perNetPrice = perNetPrice;
                let billInfo =  await self.findSuperAdminDetails();
                result[0].billInfoTo = billInfo;
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },
    findTaxDetails:(type) => {   
        var deferred = Q.defer();
        TaxInfo.findOne({ type: type },{value:1,_id:0}, (err, result) => {
            if(err){                
                deferred.resolve(err)
            } else {               
                deferred.resolve(result) 
            }
        });
        return deferred.promise;
    },
    findSuperAdminDetails:(type) => {   
        var deferred = Q.defer();
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