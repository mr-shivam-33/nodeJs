const { UserInfo,PermissionInfo,AddressInfo,UserMemberInfo,ManufacturerInfo,ContractUserInfo,CustomerInfo,CustomerVerifyInfo } = require('./user.model');
const Q = require('q');
var config = require('./../../../config.json');

let self = module.exports = {

    allcontracterlist:() => {        
        var deferred = Q.defer();     
        ManufacturerInfo.aggregate([
            {
                $match: {                    
                    //"userType": {$in: [1]},
                     "userType": 1,                     
                                   
                }
            },
            {
                $project: {
					"_id":0,             
                    "factoryInfo": {
						$filter: {
							input: "$factoryInfo",
							as: "factoryInfos",
							cond: {
                                 $ne: [ "$$factoryInfos.manufacturerBYId",null]                                
                                } 
						}
					}                  

                }
            },            
            {
				$unwind: "$factoryInfo"
			},           
           { $replaceRoot: { newRoot: { $mergeObjects: [ "$factoryInfo" ] } } },
            {
				$lookup: {
					from: "tbl_user",
					localField: "manufacturerBYId",
					foreignField: "_id",
					as: "userDetails"
				}
			},
            {
                "$unwind": {
                    "path": "$userDetails",
                    "preserveNullAndEmptyArrays": true
                }
            },

            
        ]).exec(async(err, result)=>{
            var contracterlis = [];
            let resultCont = await self.getContracter();
            if (result.length > 0) {
                for (i in result) {
                    if(result[i].manufacturerBYId!=undefined){
                        contracterlis.push(result[i]);
                    }                    
                }
            } 
            if (resultCont.length > 0) {
                for (i in resultCont) {
                    contracterlis.push(resultCont[i]);                    
                }
            } 
          
            if(err){
                let obj = {"status":0,"data":err}
                deferred.resolve(obj)
            } else {                
                let obj = {"status":1,"data":{"factoryInfo":contracterlis}}
                deferred.resolve(obj) 
            }
        });
        return deferred.promise;
    },

    getContracter:() => {        
        var deferred = Q.defer();     
        ManufacturerInfo.aggregate([
            {
                $match: {
                     "userType": 2 
                }
            },               
            {
				$unwind: "$registerInfo"
			},           
            {
                "$addFields":{
                    "registerInfo.userId":"$userId",
                     "registerInfo.manufacturerBYId" : "$userId" 
                }
            },
           
            {
                $project: {
					"_id":0,
                    "registerInfo": 1
                                 
                }
            },
            { $replaceRoot: { newRoot: { $mergeObjects: [ "$registerInfo" ] } } },

               {
                $lookup: {
                    from: "tbl_user",
                    localField: "userId",
                    foreignField: "_id",
                    as: "userDetails"
                }
			},
            {
                "$unwind": {
                    "path": "$userDetails",
                    "preserveNullAndEmptyArrays": true
                }
            },
        ]).exec(async(err, result)=>{          
            deferred.resolve(result) 
        });
        return deferred.promise;
    },
    assignCustomerByUser:(data) =>{
        var deferred = Q.defer();        
        UserMemberInfo.findOne({ email: data.email }, { _id: 1, email: 1 }, (err, result) => {
            if(err || result==null){                
                let obj = {"status":0,"data":err}
                deferred.resolve(obj)
            } else {
                CustomerInfo.findOneAndUpdate({
                    _id: mongoose.Types.ObjectId(data.verifyByUserId),
                    assignToCustomer: { "$nin": [mongoose.Types.ObjectId(result._id)] }                    
                },
                    { $push: { 'assignToCustomer': result._id } }, { new: true }, (err, result) => {
                    if (err) {
                        let obj = { "status": 0, "data": err }
                        deferred.resolve(obj)
                    } else {

                        CustomerVerifyInfo.findOneAndUpdate({
                            ipfsHash: data.ipfsHash,
                            nftVerifyByUserId: {
                                $elemMatch: {
                                    verifyByUserId: data.verifyByUserId
                                }
                            }
                        },
                            {
                                $set:
                                {
                                    'nftVerifyByUserId.$.assignToEmailId': data.email,
                                    'nftVerifyByUserId.$.assignToUserType': Number(data.userType)
                                }
                            },
                            { new: true }, (err, resultData) => {

                                if(err){
                                    let obj = {"status":0,"data":err}
                                    deferred.resolve(obj)
                                } else {
                                    let obj = {"status":1,"data":resultData}
                                    deferred.resolve(obj) 
                                }
                            })
                    }
                });
                
            }
        })
        return deferred.promise;
    },

    customerListByUser_working:(userId) => {        
        var deferred = Q.defer();
        UserMemberInfo.findOne({_id: mongoose.Types.ObjectId(userId) }, { "_id": 0, "assignToCustomer": 1 }, (err, resultUser) => {           
           // console.log(resultUser);
            if(err || resultUser==null){                
                let obj = {"status":0,"data":err}
                deferred.resolve(obj)
            }else{

                console.log(resultUser);
                UserInfo.aggregate([
                    {
                        $match: {
                            "_id": {
                                $in: [ 
                                    "617bccecd2856625a54add5c", 
                                    "618a50ce3242930fc3c37065"
                                ]
                            }                
                        }                          
                    },
                             
                ]).exec((err, resultData)=>{
        
                    console.log(resultData);  return;
                   
                    if(err){
                        let obj = {"status":0,"data":err}
                        deferred.resolve(obj)
                    } else {
                        let obj = {"status":1,"data":resultData}
                        deferred.resolve(obj) 
                    }
                });

            }
        });    
        return deferred.promise;
    },

    customerListByUser:(userId) => {        
        var deferred = Q.defer();
        UserInfo.aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId(userId),                
                }
                  
            },            
            {
                $lookup: {
                    from: 'tbl_user',
                    "let": { "assignToCustomer": "$assignToCustomer" },
                    "pipeline": [
                        { "$match": { "$expr": { "$in": [ "$_id", "$$assignToCustomer" ] } } }
                      ],
                       "as": "userDetails"
                }
            },           
            { 
                $project: {  
                    userDetails: 1           
                }
            }           
        ]).exec((err, result)=>{
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
    userExitUpdate: (_id, info) => {
        var deferred = Q.defer(); 
        UserInfo.findByIdAndUpdate({ _id: _id }, info, { new: true }, (err, result) => {
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
    addUserCompany: (data) => {        
        var deferred = Q.defer();
        UserInfo.create(data, (err, result) => {
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
    userListByCompanyId:(userId,userType) => {        
        var deferred = Q.defer();        
        UserInfo.aggregate([
            {
                $match: {
                    $or: [{
                        "companyUserId": mongoose.Types.ObjectId(userId), "status": 1, "userType": Number(userType.toString()),
                        "userStatusDelete": 0
                    }, {
                        "companyUserId": mongoose.Types.ObjectId(userId), "status": 1, "userType": userType.toString(),
                        "userStatusDelete": 0
                    },
                    {
                        "companyUserId": userId, "status": 1, "userType": Number(userType.toString()),
                        "userStatusDelete": 0
                    },
                    {
                        "companyUserId": userId, "status": 1, "userType": userType.toString(),
                        "userStatusDelete": 0
                    }]
                }
                  
              },
            {
                $project: {
                    permissions:0,
                    hash:0,
                    sessionToken:0
                }
            },
            {
              $sort: {                
                "_id" :  -1
              }
            }
        ]).exec((err, result)=>{
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
    userModifyPermission: (info) => {
        var deferred = Q.defer();       
        UserInfo.findOneAndUpdate({
            _id: info.userId 
        }, { $set: { 'permissions': info.permissions } }, { 'new': true }, (err, result) => {
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
    listpermissionModule:() => {        
        var deferred = Q.defer();
        PermissionInfo.find({}, (err, result) => {
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
    userListPermission:(userId,userType) => {        
        var deferred = Q.defer();
        UserInfo.aggregate([
            {
                $match: {
                    $or: [{
                        "companyUserId": mongoose.Types.ObjectId(userId), "status": 1, "userType": Number(userType.toString()),
                        "userStatusDelete": 0
                    }, {
                        "companyUserId": mongoose.Types.ObjectId(userId), "status": 1, "userType": userType.toString(),
                        "userStatusDelete": 0
                    }, {
                        "companyUserId": userId, "status": 1, "userType": Number(userType.toString()),
                        "userStatusDelete": 0
                    }, {
                        "companyUserId": userId, "status": 1, "userType": userType.toString(),
                        "userStatusDelete": 0
                    }]
                }
                  
            },
            {
                $project: {                    
                    hash:0,
                    sessionToken:0,
                    uniqueId:0,
                    memberRegisterStatus:0,
                    userStatusDelete:0
                }
            }           
        ]).exec((err, result)=>{
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
    findUserName:(userName) => {   
        var deferred = Q.defer();
        UserInfo.findOne({ userName: userName },{userName:1,email:1}, (err, result) => {
            if(err){                
                deferred.resolve(err)
            } else {               
                deferred.resolve(result) 
            }
        });
        return deferred.promise;
    },
    findUserEmailId:(email) => {   
        var deferred = Q.defer();
        UserInfo.findOne({ email: email },{userName:1,email:1,status:1,userStatusDelete:1}, (err, result) => {
            if(err){                
                deferred.resolve(err)
            } else {               
                deferred.resolve(result) 
            }
        });
        return deferred.promise;
    },
    edituserByCompany: (userId, facInfo) => {
        var deferred = Q.defer();
            UserInfo.findOneAndUpdate({_id:mongoose.Types.ObjectId(userId)}, { $set: facInfo},{ 'new': true },(err, result) => {
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
    deleteuserByCompany: (userId) => {
        var deferred = Q.defer();        
        UserInfo.findOneAndUpdate({
            _id:mongoose.Types.ObjectId(userId)           
        }, { $set: { 'status': 0, 'userStatusDelete':1 } }, { 'new': true }, (err, result) => {
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
    userProfileUpdate: (userId, userInfo) => {
        var deferred = Q.defer();

        //console.log(userInfo); return;

            UserInfo.findOneAndUpdate({_id:mongoose.Types.ObjectId(userId)}, { $set: userInfo},{ 'new': true },(err, result) => {
            if (err) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {
                let obj = { "status": 1, "data": "Profile updated successfully." }               
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },
    userProfileView:(userId) => {        
        var deferred = Q.defer();

        UserInfo.aggregate([
            {
                $match: {
                    _id:mongoose.Types.ObjectId(userId),
                }                 
            },
            {
                $project: {                    
                    hash:0,
                    sessionToken:0,
                    uniqueId:0,
                    memberRegisterStatus:0,
                    userStatusDelete:0
                }
            }           
        ]).exec((err, result)=>{
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
    userAddAdress: (userId, userAddressInfo) => {
        var deferred = Q.defer();        
        AddressInfo.findOneAndUpdate({ _id: mongoose.Types.ObjectId(userId)}, { $push: { 'useraddressInfo': userAddressInfo } }, { new: true }, (err, result) => {
            if (err) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {
                let obj = { "status": 1, "data": "Address added successfully." } 
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },
    userEditAddress: (addressManageId, userId, addressData) => {
        var deferred = Q.defer();        
        AddressInfo.findOneAndUpdate({
            _id: mongoose.Types.ObjectId(userId),     
            useraddressInfo: {
                $elemMatch: {
                    _id: mongoose.Types.ObjectId(addressManageId) 
                }
            }            
        }, { $set: { 'useraddressInfo.$.address': addressData.address, 'useraddressInfo.$.location': addressData.location, 'useraddressInfo.$.state': addressData.state, 'useraddressInfo.$.pin': addressData.pin, 'useraddressInfo.$.mobile': addressData.mobile,'useraddressInfo.$.status': addressData.status} }, { 'new': true }, (err, result) => {
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {
                let obj = { "status": 1, "data": "Address updated successfully." }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },
    userDeleteAddress: (info) => {
        var deferred = Q.defer();
        AddressInfo.findOneAndUpdate({
            _id: mongoose.Types.ObjectId(info.userId),            
            useraddressInfo: {
                $elemMatch: {
                    _id: mongoose.Types.ObjectId(info.addressManageId) 
                }
            } 
        }, { $set: { 'useraddressInfo.$.status': 0 } }, { 'new': true }, (err, result) => {
          
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {
                let obj = { "status": 1, "data": "Address deleted successfully." }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },
    addUserMember: (data) => {        
        var deferred = Q.defer();
		data.relationUserId = (data.relationUserId != undefined) ? data.relationUserId : ""
		data.companyUserId = (data.companyUserId != undefined) ? data.companyUserId : ""
		UserMemberInfo.create(data, (err, result) => {
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
    memberEditByUser: (memberId, memberData) => {
        var deferred = Q.defer(); 

        //console.log(memberData); return;

        UserMemberInfo.findOneAndUpdate({
            _id: mongoose.Types.ObjectId(memberId)
        }, { $set: { 'firstName': memberData.firstName, 'lastName': memberData.lastName, 'email': memberData.email, 'countryCode': memberData.countryCode, 'mobileNo': memberData.mobileNo,'gender': memberData.gender,'dateOfBirth': memberData.dateOfBirth,'familyRelation': memberData.familyRelation} }, (err, result) => {
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {
                let obj = { "status": 1, "data": "Member updated successfully." }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },
    memberListByUser:(userId) => {        
        var deferred = Q.defer();        
        UserMemberInfo.aggregate([
            {
                $match: {
                    "relationUserId": userId,
                    "memberRegisterStatus": 1
                }

            },
            {
                $project: {
                    hash:0,
                    sessionToken:0
                }
            },
            {
              $sort: {                
                "_id" :  -1
              }
            }
        ]).exec((err, result)=>{
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
    memberDeleteUser: (memberId) => {
        var deferred = Q.defer();
        UserMemberInfo.findOneAndUpdate({
            _id: mongoose.Types.ObjectId(memberId),            
           
        }, { $set: { 'memberRegisterStatus': 0 } }, { 'new': true }, (err, result) => {
          
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {
                let obj = { "status": 1, "data": "Member deleted successfully." }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },
    contractManufacturer: (userId,data) => {
        var deferred = Q.defer();
		var relationUserId = []
		relationUserId.push(userId) 
		data.relationUserId = relationUserId
		UserMemberInfo.findOne({ email: data.email }, { _id: 1, email: 1 }, (err, result) => {
            if (result == null) {               
                ContractUserInfo.create(data, (err, newResult) => {
					if(newResult){        
                        ManufacturerInfo.findOneAndUpdate({
                            userId:mongoose.Types.ObjectId(userId),
                            userType:1
                        }, { $push: {'factoryInfo': {"factoryName": data.firstName,'manufacturerBYId':newResult._id,"companyId": userId } }}, { 'new': true, 'upsert': true }, (err, result1) => {                   
                            if (err || result1 == null) {
                                let obj = { "status": 0, "data": err }
                                deferred.resolve(obj)
                            } else {
                                let obj = { "status": 1, "data": "Record added successfully." }
                                deferred.resolve(obj)
                            }
                        });
                    }
                });
            }
            else {
                ManufacturerInfo.findOneAndUpdate({
                    userId:mongoose.Types.ObjectId(userId),
                    userType:1
                }, { $push: {'factoryInfo': {"factoryName": data.firstName,'manufacturerBYId':result._id,"companyId": userId } }}, { 'new': true, 'upsert': true }, (err, result1) => {                   
                    if (err || result1 == null) {
                        let obj = { "status": 0, "data": err }
                        deferred.resolve(obj)
                    } else {
                        let obj = { "status": 1, "data": "Record added successfully." }
                        deferred.resolve(obj)
                    }
                });
            }           

        });
        return deferred.promise;
    },
    contracterListByUser:(userId) => {        
        var deferred = Q.defer();     
        ManufacturerInfo.aggregate([
            {
                $match: {
                    "userId": mongoose.Types.ObjectId(userId),
                    "userType": 1
                }
            },
            {
                $project: {
					"_id":0,
                    "factoryInfo": {
						$filter: {
							input: "$factoryInfo",
							as: "factoryInfos",
							cond: { $eq: [ "$$factoryInfos.companyId",mongoose.Types.ObjectId(userId)]}
						}
					}
                }
            },
            {
                $project: {
                    "factoryInfo": 1
                }
            },
            {
				$unwind: "$factoryInfo"
			},
            { $replaceRoot: { newRoot: { $mergeObjects: [ "$factoryInfo" ] } } },
            {
				$lookup: {
					from: "tbl_user",
					localField: "manufacturerBYId",
					foreignField: "_id",
					as: "userDetails"
				}
			},
            {
                "$unwind": {
                    "path": "$userDetails",
                    "preserveNullAndEmptyArrays": true
                }
            },
        ]).exec((err, result)=>{
            if(err){
                let obj = {"status":0,"data":err}
                deferred.resolve(obj)
            } else {
                // let obj = {"status":1,"data":Object.assign({}, result)[0]}
                let obj = {"status":1,"data":{"factoryInfo":result}}
                deferred.resolve(obj) 
            }
        });
        return deferred.promise;
    },


    profilePointUpdate: (data) => {
        var deferred = Q.defer();

        UserInfo.findById({ _id: mongoose.Types.ObjectId(data.userId) }, (err, result) => {
            if (err) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {
                if (result == null || result == undefined) {
                    let obj = { "status": 0, "data": err }
                    deferred.resolve(obj)
                      
                } else {
                    let obj = { "status": 1, "data": result }
                    deferred.resolve(obj)
                    result.profileStepsCompleted = (result.profileStepsCompleted == null) ? [] : result.profileStepsCompleted
                    result.profilePoint = (result.profilePoint == null) ? 0 : result.profilePoint
                    result.profilePointUpdateCount = (result.profilePointUpdateCount == null) ? 0 : result.profilePointUpdateCount

                    if (result.profileStepsCompleted.includes(Number(data.step))) {
                        let obj = { "status": 1, "data": result }
                        deferred.resolve(obj)

                    }
                    else {
                        let tempArr = result.profileStepsCompleted
                        tempArr.push(Number(data.step))
                        data.profileStepsCompleted = tempArr;
                        data.profilePoint = Number(result.profilePoint) + 20;
                        data.profilePointUpdateCount = result.profilePointUpdateCount + 1;

                        UserInfo.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(data.userId) }, data, { new: true }, (err, newResult) => {

                            if (err) {
                                let obj = { "status": 0, "data": err }
                                deferred.resolve(obj)
                            } else {
                                let obj = { "status": 1, "data": newResult }
                                deferred.resolve(obj)
                            }
                        });
                    }
                }
                
            }            
        })
        return deferred.promise;
    }


};




