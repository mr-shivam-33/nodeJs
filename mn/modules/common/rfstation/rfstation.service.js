//const userModel = require('./user.model');
const {rfIdData}  = require('./rfstation.model');
const Q = require('q');
const bcrypt = require('bcryptjs');

module.exports = {
	addRfIdData:async (data)=>{
        var deferred = Q.defer();
        let [rfIdData] = data.schema;
        delete data.schema;
        rfIdData.find().count(function(err, count){
            data.id= count + 1;
            rfIdData.create(data,(err, result) => {
                if(err){
                    let obj = {"status":0,"data":err}
                    deferred.resolve(obj)
                } else {
                    io.emit("rfIds", result);
                    let obj = {"status":1,"data":result}
                    deferred.resolve(obj) 
                }
            });
        });
        return deferred.promise;
    },
    getRfIdData:async (data)=>{
        var deferred = Q.defer();
        let [rfIdData] = data.schema;
        delete data.schema;
        // return

        let getCount = await rfIdData.count();

        var size = data.size;
        var page = data.page;

        if (page == 1) {
            var skipData = 0;
            var sizeData = data.size;
        } else {
            var skipData = parseInt((page - 1) * size);
            var sizeData = data.size;
        }

        rfIdData.aggregate([
            {
                $match: {
                    epc: {
                        "$ne": ""
                    }
                },
            },
            {
                "$sort": {
                    "_id": -1
                }
            },
            {   "$skip" : parseInt(skipData) },            
            {   "$limit": parseInt(sizeData) },
            {
                $project: {
                    epc: 1,
                    timestamp: 1,
                    customcode: 1
                },
            },
            {
                $lookup: {
                    from: "tbl_blockChainUpdatedIpfsData",
                    localField: "epc",
                    foreignField: "serialno",
                    as: "blockChainUpdatedIpfsData",
                },
            },
            {
                $project: {
                    productId: {
                        $toObjectId: {"$first": "$blockChainUpdatedIpfsData.data.productId"},
                    },
                    epc: 1,
                    timestamp: 1,
                    customcode: 1
                },
            },
            {
                $lookup: {
                    from: "tbl_products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "productData",
                },
            },
            { "$unwind": "$productData" },
            {
                $addFields: {
                    "productData.epc": "$epc",
                    "productData.timestamp": "$timestamp",
                    "productData.customcode": "$customcode",
                },
            },
            { $replaceRoot: { newRoot: "$productData" }},
        ]).exec(async (err, result) => {
            if (err) {
                let obj = { status: 0, data: err };
                deferred.resolve(obj);
            } else {
                let obj = { status: 1, data: { "getData": result, "count": getCount } };
                deferred.resolve(obj);
            }
        });
        return deferred.promise;
    },
};