const { userVerifyInfo,UserInfo } = require('./authentication.model');
const Q = require('q');
const { async } = require('q');
mongoose = require('mongoose');

let self = (module.exports = {
    insertUserInfoData: async(data) => {
        var deferred = Q.defer();
        let [customCompanyInfo,customUserInfo] = data;       
        try{
            let userInfoData = await UserInfo.find({}).exec();
            if(userInfoData.length > 0){
                for(let i=0; i <= userInfoData.length; i++){                   
                    customUserInfo.findOneAndUpdate({ email: userInfoData[i].email }, userInfoData[i], { upsert: true, new:true}).exec();
                }
            }            
            let obj = { "status": 1, "data": {} }
            deferred.resolve(obj)
        
        }catch(error){
            let obj = { "status": 0, "data": {} }
            deferred.resolve(obj)
        }
        return deferred.promise;  
    },
    insertCustomCompanyInfo: async(data) => {
        var deferred = Q.defer();
        let [customCompanyInfo,customUserInfo] = data;
        try{

            let companyData = await userVerifyInfo.find({}).exec();
            if(companyData.length > 0){ 
                for(let j=0; j <= companyData.length; j++){
                    customCompanyInfo.findOneAndUpdate({ "userId":  mongoose.Types.ObjectId(companyData[j].userId), "userType" : parseInt(companyData[j].userType) }, companyData[j], { upsert: true,new: true }).exec();
                }
            }
            let obj = { "status": 1, "data": {} }
            deferred.resolve(obj)
        
        }catch(error){
            let obj = { "status": 0, "data": {} }
            deferred.resolve(obj)
        }
      return deferred.promise;  
    },
    userVerify: async(data) => {
        var deferred = Q.defer();
        const getStatus = await Promise.all([self.addPaymentType(data.insertSchema,data.userId)]);
        const getInsertStatus = await Promise.all([self.insertUserInfoData(data.schema), self.insertCustomCompanyInfo(data.schema)]);
        userVerifyInfo.findOne({ "userId": mongoose.Types.ObjectId(data.userId), "userType" : Number(data.userType) },{verified:1}, (err, getData) => {
                if(getData){
                    var getVerified = getData.verified;
                    if(getVerified ==0){
                        var verifiedValue = 1;
                    }else{
                        var verifiedValue = 0;
                    }
                    userVerifyInfo.findOneAndUpdate(
                        { "userId": mongoose.Types.ObjectId(data.userId), "userType" : Number(data.userType) },
                        {
                          $set: {
                              verified: verifiedValue
                          },
                        },
                        function (err, result) {
                          if (err) {
                              let obj = { "status": 0, "data": err }
                              deferred.resolve(obj)
                          }else { 
                            if(verifiedValue ==0) {
                              var message = "Your profile is verified.";
                              var verifiedVa_ = 1;
                            }else{
                              var message = "Your profile is unverified.";
                              var verifiedVa_ = 0;
                            }
                            let obj = { "status": 1, "verifiy":verifiedVa_, "data": message }
                            deferred.resolve(obj)
                        }
                    });
                }else{
                    let obj = { "status": 0, "data": err }
                     deferred.resolve(obj)
                }
            }) ;

        return deferred.promise;
    },
    checkUserVerify: (data) => {
        var deferred = Q.defer();
		userVerifyInfo.aggregate([           
            {
                $match: {
                    "userId": mongoose.Types.ObjectId(data.userId),
                    "userType" : Number(data.userType)
                }                 
            },
            {
                $project: {
                    "verified": 1
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

    userprofilelist: (data) => {
        var deferred = Q.defer();
        // console.log(data.userId);
        // return
        userVerifyInfo.aggregate([
            {
                $match: {
                    userId: mongoose.Types.ObjectId(data.userId),
                    status:1                                     
                }
            },
            {
                "$project":
                {
                    "_id": 1,
                    "userId": 1,
                    "userType": 1,
                    "verified": 1,                    
                    registerInfo: {
                        $filter : {
                           input : "$registerInfo",
                           "as" : "reinfo",
                           cond: {
                            $eq: ["$$reinfo.status",1],
                          } 
                        }
                     },                  
                    "status": 1,                                 
                    factoryInfo: {
                        $filter : {
                           input : "$factoryInfo",
                           "as" : "info",
                           cond: {
                            $eq: ["$$info.status",1],
                          } 
                        }
                     }
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
    addPaymentType: async (schema,userId) => {
        var deferred = Q.defer();
        let [priceList,paymentModeDetails] = schema;
         let dueDate = new Date(Date.now() + 12 * 24 * 60 * 60 * 1000 );
        let data = {
            "overDueDays":"12",
            "dueDate":dueDate,
            "paymentType":"cash",
            "userId":userId
        };
        //paymentModeDetails.findOne({status:parseInt(1)}).exec((err, result) => {            
         paymentModeDetails.findOneAndUpdate({ paymentType:"cash", }, data, { upsert: true, new:true}).exec((err, result) => {  
          if (err || result == null) {  
            let obj = { "status": 0, "data": [] }         
            deferred.resolve(obj);
          } else {  
            let obj = { "status": 1, "data": [] }                   
            deferred.resolve(obj);
          }
        });
        return deferred.promise;
      },

});