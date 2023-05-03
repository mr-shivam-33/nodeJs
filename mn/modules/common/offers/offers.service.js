const OffersData = require('./offers.model');

const mongoose = require('mongoose');
const Q = require('q');

module.exports = {

    addOffer: async (data) => {
        var deferred = Q.defer();
        let [OffersData] = data.schema;
        delete data.schema;
        OffersData.create(data, (err, result) => {
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

    updateOffer: async (_id,data) => {
        var deferred = Q.defer();
        let [OffersData] = data.schema;
        delete data.schema;

        OffersData.findByIdAndUpdate({ _id: _id }, data, (err, result) => {
            if (err) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {
                let obj = { "status": 1, "data": "Record has been updated successfully."}
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },

    deleteOffer: async (data) => {
        var deferred = Q.defer();
        let [OffersData] = data.schema;
        delete data.schema;
        OffersData.findByIdAndDelete({ _id: data._id }, data, (err, result) => {
            if (err) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {
                let obj = { "status": 1, "data": "Record has been deteted successfully." }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },

    listOffer: async (data) => {
        var deferred = Q.defer();
        let [OffersData] = data.schema;       

        OffersData.find({},(err, result) => {
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


}