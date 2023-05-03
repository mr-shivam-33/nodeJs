const Q = require("q");
var moment = require("moment");
mongoose = require("mongoose");
_ = require("lodash");

let self = (module.exports = {
  findPlantCode: (data) => {
    var deferred = Q.defer();
    let [plant] = data.schema;
    plant.findOne({ plantCode: data.plantCode }, (err, result) => {
      if (err) {
        deferred.resolve(err);
      } else {
        deferred.resolve(result);
      }
    });
    return deferred.promise;
  },

  addPlant: (data) => {
    var deferred = Q.defer();
    let [plant] = data.schema;

    plant.create(data, (err, result) => {
      if (err) {
        let obj = { status: 0, data: err };
        deferred.resolve(obj);
      } else {
        let obj = { status: 1, data: result };
        deferred.resolve(obj);
      }
    });
    return deferred.promise;
  },

  getPlantDetails: (data) => {
    var deferred = Q.defer();
    let [plant] = data.schema;

    plant
      .find({
        $and: [{ userId: mongoose.Types.ObjectId(data.userId) }, { status: 1 }],
      })
      .exec((err, result) => {
        if (err) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          console.log(result, "result");
          let obj = { status: 1, data: result };
          deferred.resolve(obj);
        }
      });
    return deferred.promise;
  },

  updatePlantDetails: async (data) => {
    var deferred = Q.defer();
    let [plant] = data.schema;
    console.log(data, "=====data");

    plant
      .findOneAndUpdate(
        {
          $and: [
            { _id: mongoose.Types.ObjectId(data._id) },
            { userId: mongoose.Types.ObjectId(data.userId) },
          ],
        },

        {
          $set: {
            plantName: data.plantName,
            address: data.address,
            country: data.country,
            state: data.state,
            city: data.city,
            contactNo: data.contactNo,
            pincode: data.pincode,
          },
        }
      )
      .exec((err, result) => {
        if (err) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          let obj = { status: 1, data: result };
          deferred.resolve(obj);
        }
      });
    return deferred.promise;
  },

  deletePlant: async (data) => {
    var deferred = Q.defer();
    let [plant] = data.schema;
    plant.findOneAndUpdate(
      {
        $and: [
          { _id: mongoose.Types.ObjectId(data._id) },
          { userId: mongoose.Types.ObjectId(data.userId) },
        ],
      },
      { $set: { status: 0 } },
      { new: true },
      (err, result) => {
        if (err) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          let obj = { status: 1, data: "Plant deleted" };
          deferred.resolve(obj);
        }
      }
    );
    return deferred.promise;
  },
});
