let { getCommonPackagingType } = require("./productcommon.model");
const mongoose = require("mongoose");
const Q = require("q");

module.exports = {
  deletePackagestype: async (data) => {
    var deferred = Q.defer();
    // let [getPackagingType, getPackageModel, productModel] = data.schema;
    // delete data.schema;
    getCommonPackagingType.deleteOne(
      { _id: mongoose.Types.ObjectId(data.packagingTypeId) },
      (err, result) => {
        if (err) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          let obj = { status: 1, data: result };
          deferred.resolve(obj);
        }
      }
    );
    return deferred.promise;
  },
  editPackagestype: async (data) => {
    var deferred = Q.defer();
    // let [getPackagingType, getPackageModel, productModel] = data.schema;
    // delete data.schema;
    getCommonPackagingType.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(data.packagingTypeId) },
      {
        name: data.packagingType,
        packageTypeImg: data.packageTypeImg ? data.packageTypeImg : "",
        packageTypeDesc: data.packageTypeDesc ? data.packageTypeDesc : "",
      },
      { new: true },
      (err, result) => {
        if (err) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          let obj = { status: 1, data: result };
          deferred.resolve(obj);
        }
      }
    );
    return deferred.promise;
  },
  addPackagestype: async (data) => {
    var deferred = Q.defer();
    // let [getPackagingType, getPackageModel, productModel] = data.schema;
    getCommonPackagingType.create(
      {
        name: data.packagingType,
        packageTypeImg: data.packageTypeImg ? data.packageTypeImg : "",
        packageTypeDesc: data.packageTypeDesc ? data.packageTypeDesc : "",
      },
      (err, result) => {
        if (err) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          let obj = { status: 1, data: result };
          deferred.resolve(obj);
        }
      }
    );
    return deferred.promise;
  },
  getPackagingType: async (data) => {
    var deferred = Q.defer();
    // let [getPackagingType, getPackageModel, productModel] = data.schema;
    getCommonPackagingType.find({}, (err, result) => {
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
  findUserName: (data) => {
    var deferred = Q.defer();
    let [getPackagingType, getPackageModel, productModel] = data.schema;
    delete data.schema;
    getPackageModel.findOne({ name: data.name }, (err, findResult) => {
      if (findResult != null) {
        deferred.resolve({ status: 0 });
      } else {
        deferred.resolve({ status: 1 });
      }
    });
    return deferred.promise;
  },
  addPackages: async (data) => {
    var deferred = Q.defer();
    let [getPackagingType, getPackageModel, productModel] = data.schema;
    delete data.schema;
    var count = await getPackageModel.count();

    data.serialNumber = count;

    getPackageModel.create(data, (err, result) => {
      if (err) {
        let obj = { status: 0, data: err };
        deferred.resolve(obj);
      } else {
        let obj = { status: 1, data: result.name };
        deferred.resolve(obj);
      }
    });
    return deferred.promise;
  },
  getPackages: (data) => {
    var deferred = Q.defer();
    let [getPackagingType, getPackageModel, productModel] = data.schema;
    getPackageModel.find(
      { status: 1, userId: mongoose.Types.ObjectId(data.userId) },
      (err, result) => {
        if (err) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          let obj = { status: 1, data: result };
          deferred.resolve(obj);
        }
      }
    );
    return deferred.promise;
  },
  addProduct: (data) => {
    var deferred = Q.defer();

    let [getPackagingType, getPackageModel, productModel] = data.schema;
    delete data.schema;

    try {
      data.packagingDetails = data.packagingDetails.split(',')
      data.companyUserId = data.companyUserId ? mongoose.Types.ObjectId(data.companyUserId) : "";
      productModel.create(data, (err, result) => {
          if (err) {
            let obj = { status: 0, data: err };
            deferred.resolve(obj);
          } else {
            let obj = { status: 1, data: result };
            deferred.resolve(obj);
          }
      });

    } catch (error) {
      let obj = { status: 0, data: error };
      deferred.resolve(obj);
    }
    return deferred.promise;
  },
  dateFromat: (edate) => {
    var myDate = new Date(edate);
    var d = myDate.getDate();
    var m = myDate.getMonth();
    m += 1;
    var y = myDate.getFullYear();
    var newdate = y + "-" + m + "-" + d;
    return newdate;
  },
  list: (data) => {
    var deferred = Q.defer();
    let [getPackagingType, getPackageModel, productModel] = data.schema;
    delete data.schema;
    productModel.find({ productStatus: "1", userId: mongoose.Types.ObjectId(data.userId) }).sort({"_id":-1}).exec(async(err, result) => {
        if (err) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          let obj = { status: 1, data: result };
          deferred.resolve(obj);
        }
      }
    );
    return deferred.promise;
  },
  getProductByid: (id) => {
    var deferred = Q.defer();
    let [getPackagingType, getPackageModel, productModel] = data.schema;
    delete data.schema;
    productModel.findById(id, (err, result) => {
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
  updateProduct: (data) => {
    var deferred = Q.defer();
    let [getPackagingType, getPackageModel, productModel] = data.schema;
    delete data.schema;
    data.packagingDetails = data.packagingDetails.split(',')
    productModel.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(data.productId),
        userId: mongoose.Types.ObjectId(data.userId),
      },
      data,
      { new: true },
      (err, result) => {
        if (err) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          let obj = { status: 1, data: result };
          deferred.resolve(obj);
        }
      }
    );
    return deferred.promise;
  },
  deleteProduct: (id, data) => {
    var deferred = Q.defer();
    let [getPackagingType, getPackageModel, productModel] = data.schema;
    productModel.findByIdAndUpdate(id, data, { new: true }, (err, result) => {
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
};
