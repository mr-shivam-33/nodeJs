const { RegisterInfo, FactoryInfo, LegalInfo, BankInfo } = require('./company.model');
const Q = require('q');
mongoose = require('mongoose');
_ = require('lodash');

module.exports = {
    addRegisterInfo: (userId, userType, facInfo) => {
        var deferred = Q.defer();        
        RegisterInfo.findOneAndUpdate({ userId: userId, 'userType': userType }, { $set: { 'userId': userId,'userType': userType }, $push: { 'registerInfo': facInfo } }, { new: true, upsert: true }, (err, result) => {
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
    deleteRegisterInfo: (info) => {
        var deferred = Q.defer(); 
        RegisterInfo.findOneAndUpdate({
            userId: mongoose.Types.ObjectId(info.userId),
            userType: Number(info.userType),
            registerInfo: {
                $elemMatch: {
                    _id: mongoose.Types.ObjectId(info.registerId) 
                }
            }
        }, { $set: { 'registerInfo.$.status': 0 } }, { 'new': true }, (err, result) => {
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
    listRegisterInfo: (userId,userType) => {
        var deferred = Q.defer();
		
		RegisterInfo.aggregate([           
            {
                $match: {
                    userId:mongoose.Types.ObjectId(userId),
                    userType:Number(userType)
                }                 
            },
            {
                $lookup: {
                    from: 'tbl_bank_info',
                    as: 'bankInfo',
                    let: { userId: '$userId' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$userType', Number(userType)] },
                                        { $eq: ['$userId', mongoose.Types.ObjectId(userId)] }
                                    ]
                                }
                            }
                        }
                    ]
                }
            },
            {
                "$unwind": {
                    "path": "$bankInfo",
                    "preserveNullAndEmptyArrays": true
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
                
                if(result[0].registerInfo!=undefined){
                    _regLength = result[0].registerInfo.length
                    _regData = result[0].registerInfo;
                    if(_regLength > 0){
                        var getDataReg = _.filter(_regData, { 'status': 1 });
                    }
                }else{
                    var getDataReg = []; 
                }
                   
                    if(result[0].factoryInfo!=undefined){
                        _factLength = result[0].factoryInfo.length || 0;
                        _factData = result[0].factoryInfo;
    
                        if(_factLength > 0){
                            var getDataFact = _.filter(_factData, { 'status': 1 });
							getDataFact = getDataFact.filter((item)=>{
								if(item.manufacturerBYId == undefined)
								return item
							});
                        }
                    }else{
                        var getDataFact = [];
                    }
                    if(result[0].bankInfo!=undefined){
                        _bankLength = result[0].bankInfo.bankInfo.length
                        _bankData = result[0].bankInfo.bankInfo;
                        if(_bankLength > 0){
                            var getDataBank = _.filter(_bankData, { 'status': 1 });
                        }
                    }else{
                        var getDataBank = [];
                    }
              
                     let getData = {
                        UserId: result[0].userId,
                        CompanyRegisterData:getDataReg,
                        factoryData:getDataFact,
                        bankData:getDataBank,
                        legalinfo:{
                            cinNo:result[0].cinNo,
                            gstIn:result[0].gstIn,
                            panNo:result[0].panNo,
                            tanNo:result[0].tanNo
                        }
                    };
                let obj = { "status": 1, "data": getData }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },
    editRegisterInfo: (companyId, userId, facInfo) => {
        var deferred = Q.defer();
        RegisterInfo.findOneAndUpdate({
            userId: mongoose.Types.ObjectId(userId),
            userType: Number(facInfo.userType),
            registerInfo: {
                $elemMatch: {
                    _id:mongoose.Types.ObjectId(companyId)
                }
            }
        }, { $set: { 'registerInfo.$.companyName': facInfo.companyName, 'registerInfo.$.address': facInfo.address, 'registerInfo.$.country': facInfo.country, 'registerInfo.$.state': facInfo.state, 'registerInfo.$.city': facInfo.city, 'registerInfo.$.street': facInfo.street, 'registerInfo.$.contactNo': facInfo.contactNo, 'registerInfo.$.pincode': facInfo.pincode,'registerInfo.$.addressType': facInfo.addressType } }, { 'new': true }, (err, result) => {
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
    addfactoryinfo: (userId, userType, facInfo) => {
        var deferred = Q.defer();
        FactoryInfo.findOneAndUpdate({ userId: mongoose.Types.ObjectId(userId),userType:Number(userType)}, { $addToSet: { 'factoryInfo': facInfo } }, { new: true, upsert: true }, (err, result) => {
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
    deleteFactoryInfo: (info) => {
        var deferred = Q.defer();
        FactoryInfo.findOneAndUpdate({
            userId: mongoose.Types.ObjectId(info.userId),
            userType: Number(info.userType),
            factoryInfo: {
                $elemMatch: {
                    _id: mongoose.Types.ObjectId(info.factoryId) 
                }
            }
        }, { $set: { 'factoryInfo.$.status': 0 } }, { 'new': true }, (err, result) => {
          
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
    editFactoryInfo: (facInfo) => {
        var deferred = Q.defer();        
        FactoryInfo.findOneAndUpdate({
            userId: mongoose.Types.ObjectId(facInfo.userId),
            userType: Number(facInfo.userType),
            factoryInfo: {
                $elemMatch: {
                    _id: mongoose.Types.ObjectId(facInfo.factoryId) 
                }
            }            
        }, { $set: { 'factoryInfo.$.factoryName': facInfo.factoryName, 'factoryInfo.$.address': facInfo.address, 'factoryInfo.$.country': facInfo.country, 'factoryInfo.$.state': facInfo.state, 'factoryInfo.$.city': facInfo.city, 'factoryInfo.$.street': facInfo.street, 'factoryInfo.$.contactNo': facInfo.contactNo, 'factoryInfo.$.pincode': facInfo.pincode,'factoryInfo.$.status': facInfo.status } }, { 'new': true }, (err, result) => {			
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
    legalDetailsinfo: (userId, data) => {
        var deferred = Q.defer();
        LegalInfo.findOneAndUpdate({ userId: mongoose.Types.ObjectId(userId),userType: Number(data.userType) }, { $set: { 'cinNo': data.cinNo,'gstIn': data.gstIn,'panNo': data.panNo,'tanNo': data.tanNo}}, { new: true, upsert: true }, (err, result) => {        
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
    editLegalinfo: (userId, data) => {
        var deferred = Q.defer();
        LegalInfo.findOneAndUpdate({ userId: mongoose.Types.ObjectId(userId),userType: Number(data.userType) }, { $set: { 'cinNo': data.cinNo,'gstIn': data.gstIn,'panNo': data.panNo,'tanNo': data.tanNo}}, { new: true }, (err, result) => {    
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
    bankDetailsinfo: (userId, userType, facInfo) => {
        var deferred = Q.defer();
        BankInfo.findOneAndUpdate({ userId: userId,'userType': Number(userType)}, { $set: { 'userId': userId,'userType': Number(userType)}, $push: { 'bankInfo': facInfo } }, { new: true, upsert: true }, (err, result) => {
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
    deleteBankInfo: (info) => {
        var deferred = Q.defer();
        BankInfo.findOneAndUpdate({
            userId: mongoose.Types.ObjectId(info.userId),
            userType: Number(info.userType),
            bankInfo: {
                $elemMatch: {
                    _id: mongoose.Types.ObjectId(info.bankId) 
                }
            }
        }, { $set: { 'bankInfo.$.status': 0 } }, { 'new': true }, (err, result) => {
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
    editBankInfo: (userId, bankId, facInfo) => {
        var deferred = Q.defer();
        BankInfo.findOneAndUpdate({
            userId:mongoose.Types.ObjectId(userId),
            userType: Number(facInfo.userType),
            bankInfo: {
                $elemMatch: {
                    _id: mongoose.Types.ObjectId(bankId)
                }
            }
        }, { $set: { 'bankInfo.$.companyName': facInfo.companyName, 'bankInfo.$.bankName': facInfo.bankName, 'bankInfo.$.accountNo': facInfo.accountNo, 'bankInfo.$.ifscCode': facInfo.ifscCode, 'bankInfo.$.typeOfAccount': facInfo.typeOfAccount, 'bankInfo.$.swiftCode': facInfo.swiftCode, 'bankInfo.$.iBanNumber': facInfo.iBanNumber } }, { 'new': true }, (err, result) => {
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
    listAllUsersInfo: (userType) => {
        var deferred = Q.defer();
        const arrUserType = userType.split(",").map(function(item) {
            return parseInt(item, 10);
        });        
        console.log(arrUserType);		
		RegisterInfo.aggregate([           
            {
                $match: {
                   // userId:mongoose.Types.ObjectId(userId),
                    "userType": { "$in": arrUserType } ,
                    status:1                     
                }                 
            },
            {
				"$project":
				{
													
					 "userId":1,
					"fdalebelId": 1,
					"userId":1,
					"userType": 1,
					//"registerInfo": 1		
                    registerInfo: {
                        $filter : {
                           input : "$registerInfo",
                           "as" : "reinfo",
                           cond: {
                            $eq: ["$$reinfo.status",1],
                          } 
                        }
                     }								
				}
			}            
        ]).exec((err, result) => {
			
			if (err) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            }else {               
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },

};




