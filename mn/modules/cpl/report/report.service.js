const Q = require('q');
var moment = require('moment');
mongoose = require('mongoose');
_ = require('lodash');

let self = module.exports = {
    reportmklist: (data) => {
        var deferred = Q.defer();
        try {
            var page = parseInt(data.page) || 0;
            var limit = parseInt(data.limit) || 20;
            var skip = page * limit;
            let [qrgenerateInfo,sapInfo] = data.schema;
            delete data.schema;
            delete data.page;
            delete data.limit;
            let newObject = Object.keys(data)
                .filter((key) => data[key] != '')
                .reduce((a, key) => ({ ...a, [key]: data[key] }), {});
            //    newObject.DateOfManufacture = { "$gte": data.startDate, "$lte": data.endDate }
                newObject.DateOfManufacture = { "$gte": new Date(data.startDate), "$lte": new Date(data.endDate) }

               if(data.MaterialNumber.length > 0){
                newObject.MaterialNumber = { "$in": data.MaterialNumber }
               }
               
            delete newObject.startDate;
            delete newObject.endDate;
            sapInfo.aggregate([
                {
                    $match: newObject
                },
                { "$addFields": { "sapid": { "$toString": "$_id" }}},                
                {
                    $lookup: {
                        from: "tbl_blockChainUpdatedIpfsData",
                        localField: "sapid",
                        foreignField: "deliveryIntentNo",
                        as: "blockChainDetails"
                    }
                },
                {
                    "$unwind": {
                        "path": "$blockChainDetails",
                        "preserveNullAndEmptyArrays": true
                    }
                },
                {
                    $match: {
                        "$or":[
                            {"blockChainDetails.qrStatus": { $exists: true, "$eq": "3" }},
                            {"blockChainDetails.qrStatus": {"$ne": "3"}}
                        ]                        
                    }
                },
                {
                    $group:{
                        _id: { $ifNull: [ "$blockChainDetails.deliveryIntentNo", "$_id" ] },
                        "qrStatus3": 
                        {
                            $sum: {
                                $cond: [{ $ifNull: [ "$blockChainDetails.deliveryIntentNo", 0 ] }, 1, 0]
                            }
                        },
                        "first": { "$first": "$$ROOT" }
                    }
                },                
                {
                    $project: {
                        _id: 1,
                        totalScanQr: "$qrStatus3",
                        userId:"$first.userId", 
                        ManufacturerAddress:"$first.ManufacturerAddress", 
                        BatchNumber:"$first.BatchNumber", 
                        BrandName:"$first.BrandName",                       
                        Error1:"$first.Error1", 
                        DateOfExpiry:"$first.DateOfExpiry", 
                        GTIN:"$first.GTIN",
                        IText:"$first.IText", 
                        ManufacturerLicenceNo:"$first.ManufacturerLicenceNo", 
                        ManufacturerName:"$first.ManufacturerName", 
                        DateOfManufacture:"$first.DateOfManufacture", 
                        MaterialNumber:"$first.MaterialNumber",                       
                        MeasurementUnit:"$first.MeasurementUnit", 
                        ProducedBatchQty:"$first.ProducedBatchQty", 
                        Plant:"$first.Plant",
                        ProductName:"$first.ProductName",
                        StorageCondition:"$first.StorageCondition", 
                        status:"$first.status"
                    }
                },
                { $sort: { createdDate: -1 } },
                { $skip: skip },
                { $limit: limit }
            ]).exec(async (err, result) => {
                if (err) {
                    
                    let obj = { "status": 0, "data": err }
                    deferred.resolve(obj)
                } else {
                    let obj = { "status": 1, "data": result }
                    deferred.resolve(obj)
                }
            });
        } catch (error) {
            let obj = { "status": 1, "data": [] }
            deferred.resolve(obj)
        }

        return deferred.promise;
    },
    sourcelist: (data) => {
        var deferred = Q.defer();
        let [qrgenerateInfo, , productInfo, printInfo] = data.schema;
        printInfo.aggregate([
            {
                "$group": {
                    "_id": "$source",
                    "first": { "$first": "$$ROOT" }
                }
            },
            {
                "$replaceRoot": {
                    "newRoot": {
                        "$mergeObjects": [
                            "$first",
                        ]
                    }
                }
            },
            {
                $project: {
                    "_id": 0,
                    "source": 1,
                }
            },
            { $sort: { source: 1 } },
        ]).exec(async (err, result) => {
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
    productlist: (data) => {
        var deferred = Q.defer();
        let [qrgenerateInfo, productInfo, printInfo] = data.schema;
        productInfo.aggregate([
            {
                "$match": {
                    "productStatus": 1
                }
            },
            {
                $project: {
                    "productName": 1,
                    "brandName": 1,
                    "manufacturer": 1
                }
            },
            { $sort: { _id: 1 } },
        ]).exec(async (err, result) => {
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
    reportlist: (data) => {
        var deferred = Q.defer();
        try {
            var page = parseInt(data.page) || 0;
            var limit = parseInt(data.limit) || 20;
            var skip = page * limit;
            let [qrgenerateInfo, productInfo, printInfo] = data.schema;
            delete data.schema;
            delete data.page;
            delete data.limit;
            let newObject = Object.keys(data)
                .filter((key) => data[key] != '')
                .reduce((a, key) => ({ ...a, [key]: data[key] }), {});
            newObject.manufacturingDate = { "$gte": new Date(data.startDate), "$lte": new Date(data.endDate) }

            delete newObject.startDate;
            delete newObject.endDate;
            delete newObject.selectPrId;

            printInfo.aggregate([
                {
                    $match: newObject
                },
                { $unwind: "$productDetails" },

                { "$addFields": { "proId": { "$toObjectId": "$productDetails.productId" } } },
                {
                    $lookup: {
                        from: "tbl_products",
                        localField: "proId",
                        foreignField: "_id",
                        as: "prDetails"
                    }
                },
                {
                    $project: {
                        "deliveryIntentNo": 1,
                        "destination": 1,
                        "weekNo": 1,
                        "batchNo": 1,
                        "manufacturingDate": 1,
                        "deliveryIntentDate": 1,
                        "source": 1,
                        "productId": "$productDetails.productId",
                        "productQty": "$productDetails.productQty",
                        "productPrice": "$productDetails.productPrice",
                        "productName": { "$first": "$prDetails.productName" },
                    }
                },
                { $sort: { manufacturingDate: -1 } },
                { $skip: skip },
                { $limit: limit }
            ]).exec(async (err, result) => {
                if (result.length > 0) {
                    var selectProductId = data.selectPrId;
                    if (selectProductId && selectProductId.length > 0) {
                        getData_ = [];
                        result.forEach((item) => {
                            var newProductId = item.productId.toString()
                            selectProductId.forEach((data) => {
                                if (newProductId == data) {
                                    getData_.push(item)
                                }
                            })
                        })
                        let obj = { "status": 1, "data": getData_ }
                        deferred.resolve(obj)

                    } else {
                        let obj = { "status": 1, "data": result }
                        deferred.resolve(obj)
                    }

                } else {
                    let obj = { "status": 0, "data": err }
                    deferred.resolve(obj)
                }
            });
        } catch (error) {
            let obj = { "status": 1, "data": [] }
            deferred.resolve(obj)
        }

        return deferred.promise;
    },
    qrscanlist: (pdata) => {
        var deferred = Q.defer();
        try {

          
            let [qrgenerateInfo, productInfo, printInfo] = pdata.schema;
            var schema = pdata.schema;
            delete pdata.schema;

            let newObject = Object.keys(pdata)
                .filter((key) => pdata[key] != '')
                .reduce((a, key) => ({ ...a, [key]: pdata[key] }), {});
            newObject.createdDate = { "$gte": new Date(pdata.startDate), "$lte": new Date(pdata.endDate) }
            // let data_ = "data.productId";

            
            newObject.qrStatus =  { $exists: true } 

            if (pdata.productId) {
                newObject['data.productId'] = pdata.productId;
            }
            
            delete newObject.startDate;
            delete newObject.endDate;
            delete newObject.productId;

            qrgenerateInfo.aggregate([
                {
                    $match: newObject
                },
                {
                    "$group": {
                        "_id": "$data.productId",
                        "qrGenerated": { "$sum": 1 }
                    }
                },
                { "$addFields": { "productId": { "$toObjectId": "$_id" } } },
                {
                    $lookup: {
                        from: "tbl_products",
                        localField: "productId",
                        foreignField: "_id",
                        as: "prDetails"
                    }
                },
                {
                    $project: {
                        "productId": 1,
                        "qrGenerated": 1,
                        "productName": { "$first": "$prDetails.productName" }

                    }
                }

            ]).exec(async (err, result) => {

                var qrPrinted = await self.getQrPrinted(schema,newObject);
                var qrConsumed = await self.getQrConsumed(schema,newObject);
                if((result && result.length > 0) && (qrPrinted.length > 0) && (qrConsumed.length > 0) ){                   
                    for (i in result) {
                        if (result[i]) {                            
                            result[i].qrPrinted = qrPrinted[i].qrPrinted;
                            result[i].qrConsumed = qrConsumed[i].qrConsumed;
                        }
                    }
                    let obj = { "status": 1, "data": result }
                    deferred.resolve(obj)

                }
                else if (err) {
                    let obj = { "status": 0, "data": err }
                    deferred.resolve(obj)
                } else {
                    let obj = { "status": 1, "data": [] }
                    deferred.resolve(obj)
                }
            });

        } catch (error) {
            let obj = { "status": 1, "data": [] }
            deferred.resolve(obj)
        }
        return deferred.promise;
    },
    
    getQrPrinted: (schema, data) => {
        var deferred = Q.defer();
        delete data.qrStatus;        
        data['qrStatus'] = { $exists: true, "$gt": "1" }
        let [qrgenerateInfo, productInfo, printInfo] = schema;
        qrgenerateInfo.aggregate([
            {
                $match: data
            },
            {
                "$group": {
                    "_id": "$data.productId",
                    "qrPrinted": { "$sum": 1 }
                }
            },
            {
                $project: {
                    "_id": 0,
                    "qrPrinted": 1
                }
            }
        ]).exec(async(err, result)=>{  
            deferred.resolve(result) 
        });
        return deferred.promise;
    },

    getQrConsumed: (schema, data) => {
        var deferred = Q.defer();
        delete data.qrStatus;        
        data['qrStatus'] = { $exists: true, "$gt": "2" }        
        let [qrgenerateInfo, productInfo, printInfo] = schema;

        qrgenerateInfo.aggregate([
            {
                $match: data
            },
            {
                "$group": {
                    "_id": "$data.productId",
                    "qrConsumed": { "$sum": 1 }
                }
            },
            {
                $project: {
                    "_id": 0,
                    "qrConsumed": 1
                }
            }
        ]).exec(async(err, result)=>{          
            deferred.resolve(result) 
        });

        return deferred.promise;
    }
};