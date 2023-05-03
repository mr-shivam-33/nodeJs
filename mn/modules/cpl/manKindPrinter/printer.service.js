const Q = require('q');
var moment = require('moment');
mongoose = require('mongoose');
_ = require('lodash');

let self = module.exports = {
  
    printerSAPData: (data) => {
        var deferred = Q.defer();
        let [printerApp,ipfsUpdated] = data.schema;
        printerApp.create(data, (err, result) => {
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

    printerQR: (data) => {
        var deferred = Q.defer();
        let [printerApp,ipfsUpdated] = data.schema;

        ipfsUpdated.aggregate([
            {
                $match: {
                    "userId": mongoose.Types.ObjectId(data.userId),
                    "data.productCode": data.productCode,
                    "qrStatus" : "1"
                }
            },
            {
              $project: {
                "_id": 0,
                "qrCodeUrl": 1
              }
            },
            {
              $limit: data.size
            },
            
          ]).exec(async (err, result) => {
            if (err) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {
              let res = result.map(val=>val.qrCodeUrl);
              if(res && res.length){

                ipfsUpdated.updateMany(
                  { qrCodeUrl: { $in: res } },
                  { $set: { qrStatus: "2"}},
                  { new: true }
                ).exec();
              }
              let obj = { "status": 1, "data": res }
              deferred.resolve(obj)
            }
        });
        return deferred.promise; 
    },

    getSAPData: (data) => {
      var deferred = Q.defer();
      let [printerApp,ipfsUpdated] = data.schema;
      printerApp.find({userId: mongoose.Types.ObjectId(data.userId)}).exec((err, result) => {
          if (err) {
              let obj = { "status": 0, "data": err }
              deferred.resolve(obj)
          } else {
            console.log(result, "resultrew")
              let obj = { "status": 1, "data": result }
              deferred.resolve(obj)
          }
      });
      return deferred.promise;
  },

  updateQrScannerStatus: async (data, databaseName, typedata) => {
    var deferred = Q.defer();

    try {
      let [printerApp,ipfsUpdated] = data.schema;

      let updateDate = new Date();

      ipfsUpdated
        .updateMany(
          { qrCodeUrl: { $in: data.qrCodeUrl } },
          {
            $set: {
              deliveryIntentNo: data.deliveryIntentNo,
              qrEditUser: data.userId,
              transactionDate: updateDate,
              qrStatus: "3",
            },
          },
          { new: true }
        )
        .exec(async (err, result) => {
          if (err) {
            let obj = { status: 0, data: result };
            deferred.resolve(obj);
          } else {
			  let getCount = await ipfsUpdated.aggregate([
				  {
					$match: {
					  "deliveryIntentNo": data.deliveryIntentNo,
					  "qrStatus" : "3"
					},
				  },
				])
				.exec();
				
				result.productCount = getCount.length
				
				let obj = { status: 1, data: result };
				deferred.resolve(obj);
				
		  }
		});
    } catch (error) {
      let obj = { status: 0, data: {} };
      deferred.resolve(obj);
    }
    return deferred.promise;
  },

  getQRCode: (data) => {
    var deferred = Q.defer();
    let [printerApp,ipfsUpdated] = data.schema;

    ipfsUpdated.aggregate([
        {
            $match: {
                "userId": mongoose.Types.ObjectId(data.userId)
                            }
        },
        {
          $project: {
            "_id": 0,
            "qrCodeUrl": 1
                     }
        },
        {
          $limit: data.size
        },
        
      ]).exec(async (err, result) => {
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

};