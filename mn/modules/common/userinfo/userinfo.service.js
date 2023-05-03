const { MainUserInfo,ComInfo} = require('./userinfo.model');
const Q = require('q');
mongoose = require('mongoose');

module.exports = {   
    mainUserInfoList: () => {
        var deferred = Q.defer();
        MainUserInfo.aggregate([           
                {
                    $match: {
                        status:1,
                        userType:"admin"                       
                    }                 
                },
                {
                    $project: {
                        "firstName": 1,
                        "lastName": 1,
                        "email": 1,
                        "countryCode":1,
                        "mobile": 1,
                        "permissions": 1,
                        "userType": 1,
                        "uniqueId": 1,
                        "loginAs": 1,
                        "createdAt": 1,
                        "updatedAt": 1,
                        "status": 1,
                        "userSlug":1                                     
                    }
                },
                {
                    $sort: {_id: -1} 
                }                             
                           
            ]).exec((err, result) => {               
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {                
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },
    paymentInfoList: (data) => {
        var deferred = Q.defer();
        let [SuperPaymentInfo,SuperOrderInfo] = data.schema;
        delete data.schema;
        SuperPaymentInfo.find(
            {
                paymentStatus: {
                    $in: [1,2,3]
                }
            }, (err, result) => {              
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {                
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },
    paymentStatusChange: (data) => {
        var deferred = Q.defer();
        let [SuperPaymentInfo,SuperOrderInfo] = data.schema;
        delete data.schema;
        SuperPaymentInfo.findOneAndUpdate({ _id: mongoose.Types.ObjectId(data.paymentId) }, { $set: { paymentStatus: Number(data.status) } }, { new: true }, (err, result) => {
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {
                SuperOrderInfo.updateMany({
                    _id: {
                        $in: result.invoiceInfo
                    }
                }, { $set: { paymentStatus: Number(data.status) } }, (getresult) => {
                    let obj = { "status": 1, "data": result }
                    deferred.resolve(obj)
                });
            }
        });
        return deferred.promise;
    },
    UserProfileView: (userId) => {
        var deferred = Q.defer();
        ComInfo.aggregate([           
            {
                $match: {
                    userId: mongoose.Types.ObjectId(userId)
                }
            },                    
            {
                $lookup: {
                    from: 'tbl_bank_info',
                    as: 'bankInfo',
                    let: { userId: '$userId',the_userType: "$userType"},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$$the_userType', "$userType"] },
                                        { $eq: ['$userId', mongoose.Types.ObjectId(userId)] }                                       
                                    ]
                                }
                            }
                        },
                      
                    ]
                }
            },
            {
                "$project" : {
                    "userId" : 1,
                    "cinNo" : 1,
                    "gstIn" : 1,
                    "panNo" : 1,
                    "tanNo" : 1,
                    "userType" : 1,                    
                    registerInfo: {
                        '$filter': {
                            input: '$registerInfo',
                            as: 'registerInfo',
                            cond: { $eq: ['$$registerInfo.status', 1] }
                        }
                     },
                     factoryInfo: {
                        '$filter': {
                            input: '$factoryInfo',
                            as: 'factoryInfo',
                            cond: { $eq: ['$$factoryInfo.status', 1] }
                        }
                     },
                     bankInfo:1
                     
                }
             }
                              
        ]).exec((err, result) => {
            if (err) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            }else if(result.length == 0){
                let obj = { "status": 2, "data": "No record found" }
                deferred.resolve(obj)
            } else { 
              // console.log(result); return;          
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },
};