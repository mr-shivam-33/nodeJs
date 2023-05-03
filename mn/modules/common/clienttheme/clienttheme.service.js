const { themeInfo } = require('./clienttheme.model');
const Q = require('q');
mongoose = require('mongoose');
var config = require('./../../../config.json');
var fs = require('fs');

module.exports = { 
    addtheme: (themeData) => {
        var deferred = Q.defer();
        themeInfo.findOneAndUpdate(
            { userId: mongoose.Types.ObjectId(themeData.userId) },
            themeData,
             { upsert: true, new:true}).exec((err, result)=>{
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
    getThemeByUserid: (userId) => {
        var deferred = Q.defer(); 
        themeInfo.findOne({userId: mongoose.Types.ObjectId(userId)}, (err, result) => {            
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