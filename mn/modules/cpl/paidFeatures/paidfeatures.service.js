
const { informationData } = require('./paidfeaturesNew.model');
const Q = require('q');
mongoose = require('mongoose');
_ = require('lodash');

let self = module.exports = {    
    managerAndDistributerData: (info) => {
        var deferred = Q.defer();
        let [paidFeaturesInfo,informationData] = info.schema;

        paidFeaturesInfo.create(info, async (err, result) => {
            if(err){                
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {               
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },
    editManagerAndDistributerData: (info) => {
        var deferred = Q.defer();
        let [paidFeaturesInfo,informationData] = info.schema;

        paidFeaturesInfo.findOneAndUpdate({ _id: mongoose.Types.ObjectId(info.id) },{$set: info},{ new: true }).exec(async (err, result) => {
            if(err){                
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {               
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },
    getReportByCceId: (info) => {
        var deferred = Q.defer();
        let [paidFeaturesInfo,informationData] = info.schema;

        let queryString = {"_id" : mongoose.Types.ObjectId(info.userId)}
		
		paidFeaturesInfo.aggregate([
            {
                $match: queryString
            },
            {
                "$addFields": {
                    "convertMemeberId": { $toString: "$_id" }
                }
            },
            {
                $lookup: {
                    from: "tbl_information",
                    localField: "convertMemeberId",
                    foreignField: "memeberId",
                    as: "memberCount",
                },
            },
            {
                "$addFields": {
                    "scanCreatedAt": { $last: "$memberCount.createdAt" }
                }
            },
            {
                $sort: {
                    "scanCreatedAt":-1
                }
            },
        ]).exec((err, result) => {           
            if(err){                
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },
    ListManagerAndDistributerData: (info) => {
        var deferred = Q.defer();
        let [paidFeaturesInfo,informationData] = info.schema;
        let queryString;
        if(info.type == "1"){
            queryString = {"type":info.type, "userId" : mongoose.Types.ObjectId(info.userId)}
        } else {
            queryString = {"type":info.type, "userId" : mongoose.Types.ObjectId(info.userId), "areaManagerId": info.areaManagerId}
        }


        paidFeaturesInfo.aggregate([
            {
                $match: queryString
            },
            {
                "$addFields": {
                    "convertMemeberId": { $toString: "$_id" }
                }
            },
            {
                $lookup: {
                    from: "tbl_information",
                    localField: "convertMemeberId",
                    foreignField: "memeberId",
                    as: "memberCount",
                },
            },
            {
                "$addFields": {
                    "scanCreatedAt": { $last: "$memberCount.createdAt" }
                }
            },
            {
                $sort: {
                    "scanCreatedAt":-1
                }
            }
        ]).exec((err, result) => {           
            if(err){                
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {               
                result.forEach((val) => {
                    val.scanCount = parseInt(val.memberCount.length)
                    val.uniqueScan = Object.keys(_.countBy(val.memberCount, "mobile")).length
                    delete val.memberCount
                })
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },
    deleteManagerAndDistributerData: (info) => {
        var deferred = Q.defer();
        let [paidFeaturesInfo,informationData] = info.schema;

        paidFeaturesInfo.deleteOne({"_id": mongoose.Types.ObjectId(info.id)}, async (err, result) => {
            if(err){                
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {               
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },
    eachManagerAndDistributerData: (info) => {
        var deferred = Q.defer();
        let [paidFeaturesInfo,informationData] = info.schema;

        paidFeaturesInfo.find({"_id": mongoose.Types.ObjectId(info.id) }).exec(async (err, result) => {
            if(err){                
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {               
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },
    information:async (data)=>{
        var deferred = Q.defer();
        let [paidFeaturesInfo,informationData] = data.schema;
		informationData.create(data, (err, result) => {            
            if(err){
                deferred.resolve(err)
            } else {
                deferred.resolve(result) 
            }
        });
        return deferred.promise;
    },
    infolist:async (data)=>{
        var deferred = Q.defer();
        let [paidFeaturesInfo,informationData] = data.schema;
		
		
		
		if(data.type == 1 || data.type == "1" || data.type == undefined){
			var page = data.current - 1;
			var pageSize = data.pageSize
			var skip = { $skip: page * pageSize };
			var limit = { $limit: pageSize };			
		} else {
			var page = data.current - 1;
			var pageSize = data.pageSize
			var skip = { $group: { _id: null, myCount: { $sum: 1 } } };
			var limit = { $project: { _id: 0 } };
		}

        informationData.aggregate([
            {
                $match: {
                    "status": 1,
                    "userId": mongoose.Types.ObjectId(data.userId),

                }
            },
            {
                "$addFields": {
                    "convertMemeberId": { $toObjectId: "$memeberId" },
                }
            },            
            {
                $lookup: {
                    from: "tbl_managerAndDistributerData",
                    localField: "convertMemeberId",
                    foreignField: "_id",
                    as: "member_info",
                },
            },
            {
                $sort: {
                    "createdAt":-1
                }
            },
            { "$match": { "member_info": { $exists: true, $ne: [] } }},
			skip,
			limit
        ]).exec((err, result) => {           
            if(err || result==null){
                let data = [];
                deferred.resolve(data)
            } else {
                let data = result
                // paidFeaturesInfo.find({}).exec()
                deferred.resolve(data) 
            }
        });
        return deferred.promise;
    },
    countInfoList:async (data)=>{
        var deferred = Q.defer();
        let [paidFeaturesInfo,informationData] = data.schema;

        informationData.aggregate([
            {
                $match: {
                    "status": 1,
                    "userId": mongoose.Types.ObjectId(data.userId),

                }
            },
            {
                $group: {
                    _id: {
                    city: "$city",
                    name: "$channel",
                    status: "$status"
                    },
                    count: { $sum: 1 }
                }
            },
            // {
            //     "$addFields": {
            //         "convertMemeberId": { $toObjectId: "$memeberId" }
            //     }
            // },            
            // {
            //     $lookup: {
            //         from: "tbl_managerAndDistributerData",
            //         localField: "convertMemeberId",
            //         foreignField: "_id",
            //         as: "member_info",
            //     },
            // },
        ]).exec((err, result) => {           
            if(err || result==null){
                let data = [];
                deferred.resolve(data)
            } else {
                let data = result
                // paidFeaturesInfo.find({}).exec()
                deferred.resolve(data) 
            }
        });
        return deferred.promise;
    },
};