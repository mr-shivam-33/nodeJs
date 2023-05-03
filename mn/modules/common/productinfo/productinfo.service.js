let { ProductInfo} = require("./productinfo.model");
const mongoose = require("mongoose");
const Q = require("q");

module.exports = {
    getProductInfo: (batchNo) => {
        var deferred = Q.defer();       
        ProductInfo.findOne({batchNo:batchNo, status: 1 },{}).exec(async (err, result) => { 
            if (err ) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj);                    
            } 
        });
        return deferred.promise;
    },

}