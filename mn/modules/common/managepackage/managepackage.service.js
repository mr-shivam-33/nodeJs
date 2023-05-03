const { ManagePackage } = require('./managepackage.model');
const Q = require('q');
mongoose = require('mongoose');

module.exports = {
    addPackage: (data) => {
        var deferred = Q.defer();
        let [ManagePackage] = data.schema;
        delete data.schema;   
        ManagePackage.find({ status: 1, name:data.name }, (err, result) => {
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {
                if (result.length == 0) {
                    ManagePackage.create(data, (err, result) => {
                        if (err || result == null) {
                            let obj = { "status": 0, "data": err }
                            deferred.resolve(obj)
                        } else {
                            let obj = { "status": 1, "data": result }
                            deferred.resolve(obj)
                        }
                    });
                }
                else if ( result[0].name == data.name) {
                    let obj = { "status": 0, "data": "Package already exists" }
                    deferred.resolve(obj)
                }
            }
        });

        return deferred.promise;
    },
    editPackage: (packageId,pakData) => {
        var deferred = Q.defer();
        let [ManagePackage] = pakData.schema;
        ManagePackage.findOneAndUpdate({
            _id: mongoose.Types.ObjectId(packageId)
        }, { $set: { 'name': pakData.name, 'packageContent': pakData.packageContent, 'packageImg': pakData.packageImg,'comboId': pakData.comboId,'serialNumber': pakData.serialNumber, 'priceUSD': pakData.priceUSD, 'priceUSDType': pakData.priceUSDType, 'priceINR': pakData.priceINR,'status': pakData.status} }, { 'new': true }, (err, result) => {
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
    deletePackage: (packageId,data) => {
        var deferred = Q.defer(); 
        let [ManagePackage] = data.schema;
        ManagePackage.findOneAndUpdate({
            _id: mongoose.Types.ObjectId(packageId)
        }, { $set: { 'status': 0 } }, { 'new': true }, async (err, result) => {
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
    packagelist: (data) => {
        var deferred = Q.defer();
        let [ManagePackage] = data.schema;
        ManagePackage.find({status:1}, (err, result) => {            
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