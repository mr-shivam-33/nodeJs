const { PerService,supportService } = require('./support.model');
const Q = require('q');

let self =  module.exports = { 
    supportAdd: (data) => {
        var deferred = Q.defer();
        supportService.create(data, (err, result) => {
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
    supportList: (data) => {
        var deferred = Q.defer();
        supportService.find({userId: mongoose.Types.ObjectId(data.userId), userType: data.userType.toString()}, (err, result) => {            
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
    permissionAdd: (data) => {
        var deferred = Q.defer();        
        PerService.findOneAndUpdate({ userId: mongoose.Types.ObjectId(data.userId), 'pageName': data.pageName }, { $set: { userId: data.userId, 'pageName': data.pageName, admin: data.admin, 'checker': data.checker, 'maker': data.maker, 'noAccess': data.noAccess }}, { new: true, upsert: true }, (err, result) => {
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

    permissionShow: (data) => {
        var deferred = Q.defer();
        if(data.userId)       
            var match = {status:1,userId: mongoose.Types.ObjectId(data.userId)}
        else
            var match = {status:1}
        
        PerService.find(match, (err, result) => {            
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {                
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)               
            }
        });
        return deferred.promise;
    }    
};