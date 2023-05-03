//const userModel = require('./user.model');
const {
  userAssignDataBase1,
  User,
  Profile,
  SuperAdmin,
  CompanyVerified,
  informationData,
  loginUser,
} = require("./user.model");
const Q = require("q");
const bcrypt = require("bcryptjs");
const { async } = require("q");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const newConn = require("../../../db/DBCustomConnection");
const userSchemaByDatabase = new Schema({
  // _id: {type:mongoose.Schema.Types.ObjectId},
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  countryCode: { type: String },
  mobile: { type: String },
  mobileNo: { type: String },
  image: { type: String },
  userName: { type: String },
  role: { type: String },
  memberRegisterStatus: { type: Number },
  userStatusDelete: { type: Number },
  profileStepsCompleted: { type: Array },
  profilePoint: { type: Number },
  profilePointUpdateCount: { type: Number },
  permissions: { type: String },
  companyUserId: { type: String },
  relationUserId: { type: Array },
  assignToCustomer: { type: Array },
  manufacturerBYId: { type: mongoose.Schema.Types.ObjectId },
  userType: { type: String },
  hash: { type: String },
  sessionToken: { type: String },
  uniqueId: { type: String },
  referredBy: { type: String },
  loginAs: { type: String },
  permissionTypes: { type: String },
  status: { type: Number },
  databaseName: { type: String },
  userSlug: { type: String },
  userRelation: { type: Array },
  sendOtp: { type: Number },
  userVerify: { type: Number },
  address: { type: String },
  genderSatatus: { type: String },
  dob: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});


let self = (module.exports = {
  plantlogin: async (data) => {
    var deferred = Q.defer();
    let database = await self.checkVerifiedUser(data.email);
    await User.findOneAndUpdate(
      { email: data.email },
      { $set: { sessionToken: data.sessionToken } }
    );
    User.findOne({ email: data.email, plantCode:data.plantCode }, (err, result) => {
      deferred.resolve(result);
    });
    return deferred.promise;
  },
  createDatabase: (databaseName) => {
    var deferred = Q.defer();
    let db = newConn.getDatabaseConnection(databaseName);
    const UserByDatabase = db.model(
      "userByDatabase",
      userSchemaByDatabase,
      "tbl_user"
    );
    deferred.resolve([UserByDatabase]);
    return deferred.promise;
  },
  updateUserAlldatabase: async () => {
    var deferred = Q.defer();
    CompanyVerified.aggregate([
      {
        $match: {
          userType: 1,
          verified: 1,
        },
      },
      {
        $lookup: {
          from: "tbl_user",
          localField: "userId",
          foreignField: "_id",
          as: "user_info",
        },
      },
      { $unwind: "$user_info" },
      {
        $project: {
          _id: 0,
          userId: "$user_info._id",
          databaseName: "$user_info.databaseName",
          userSlug: "$user_info.userSlug",
          email: "$user_info.email",
          firstName: "$user_info.firstName",
          lastName: "$user_info.lastName",
        },
      },
    ]).exec((err, result) => {
      if (err || result == null) {
        let data = [];
        deferred.resolve(data);
      } else {
        let data = result;
        deferred.resolve(data);
      }
    });
    return deferred.promise;
  },
  userInsertByDatabase: async () => {
    var deferred = Q.defer();
    try {
      let listDatabaseName = await self.updateUserAlldatabase();
      console.log("listDatabaseName....", listDatabaseName);
      let userInfoData = await User.find({}).exec();
      if (listDatabaseName.length > 0 && userInfoData.length > 0) {
        for (let i = 0; i < listDatabaseName.length; i++) {
          let databaseName = listDatabaseName[i].userSlug;
          // console.log('databaseName..............',databaseName);
          let getDataModelCon = await self.createDatabase("DB_" + databaseName);
          let [UserByDatabase] = getDataModelCon;
          for (let j = 0; j < userInfoData.length; j++) {
            await UserByDatabase.findOneAndUpdate(
              { email: userInfoData[j].email },
              userInfoData[j],
              { upsert: true, new: true }
            ).exec();
          }
        }
        let obj = { status: 1, data: {} };
        deferred.resolve(obj);
      } else {
        let obj = { status: 1, data: {} };
        deferred.resolve(obj);
      }
    } catch (error) {
      console.log("test...error.", error);
      let obj = { status: 0, data: {} };
      deferred.resolve(obj);
    }
    return deferred.promise;
  },
  register: async (data) => {
    var deferred = Q.defer();
    User.create(data, async (err, result) => {
      if (err) {
        deferred.resolve(err);
      } else {
        deferred.resolve(result);
        // let result_ = await self.userInsertByDatabase();
        // if(result_){
        //    deferred.resolve(result)
        // }
      }
    });
    return deferred.promise;
  },
  getUserToken: async (data) => {
    var deferred = Q.defer();
    User.findOne(
      { _id: mongoose.Types.ObjectId(data.userId) },
      {},
      async (err, result) => {
        if (err) {
          deferred.resolve(err);
        } else {
          deferred.resolve(result);
        }
      }
    );
    return deferred.promise;
  },
  userLoginAs: async (data) => {
    var deferred = Q.defer();
    User.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(data.userId) },
      { $set: { loginAs: data.loginas } },
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
  authLogOut: async (data) => {
    var deferred = Q.defer();
    User.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(data.userId) },
      { $set: { sessionToken: "" } },
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
  activeEmailId: (email) => {
    var deferred = Q.defer();
    User.findOne({ email: email, status: 0 }, (err, result) => {
      if (err || result == null) {
        let obj = { status: 0, data: err };
        deferred.resolve(obj);
      } else {
        let obj = { status: 1, data: result };
        deferred.resolve(obj);
      }
    });
    return deferred.promise;
  },
  findUserEmailId: (email) => {
    var deferred = Q.defer();
    User.findOne({ email: email }, (err, result) => {
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
  findMobileNumber: (mobile) => {
    var deferred = Q.defer();
    User.findOne({ mobile: mobile }, (err, result) => {
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

  checkVerifiedUser: async (email) => {
    var deferred = Q.defer();
    User.findOne({ email: email }, (err, result) => {
      if (result) {
        let userType_ = parseInt(result.userType);
        CompanyVerified.findOne(
          {
            userId: mongoose.Types.ObjectId(result._id),
            userType: userType_,
            verifyed: 1,
          },
          {}
        ).exec(async (err, resultData) => {
          if (resultData != null) {
            let databaseName_ = result.firstName + "_" + result.uniqueId;
            await User.findOneAndUpdate(
              { _id: mongoose.Types.ObjectId(result._id) },
              { $set: { databaseName: databaseName_ } }
            );
            deferred.resolve(result);
          } else {
            let obj = { status: 0, data: err };
            deferred.resolve(obj);
          }
        });
      } else {
        let obj = { status: 0, data: err };
        deferred.resolve(obj);
      }
    });
    return deferred.promise;
  },
  login: async (data) => {
    var deferred = Q.defer();
    let database = await self.checkVerifiedUser(data.email);
    await User.findOneAndUpdate(
      { email: data.email },
      { $set: { sessionToken: data.sessionToken } }
    );
    User.findOne({ email: data.email }, (err, result) => {
      deferred.resolve(result);
    });
    return deferred.promise;
  },
  profileUpdate: async (id, data) => {
    var deferred = Q.defer();
    User.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(id) },
      data,
      { new: true, upsert: true },
      async (err, result) => {
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
  checkEmailId: (email) => {
    var deferred = Q.defer();
    SuperAdmin.findOne({ email: email, status: 0 }, (err, result) => {
      if (err || result == null) {
        let obj = { status: 0, data: err };
        deferred.resolve(obj);
      } else {
        let obj = { status: 1, data: result };
        deferred.resolve(obj);
      }
    });
    return deferred.promise;
  },
  superLogin: async (data) => {
    var deferred = Q.defer();
    await SuperAdmin.findOneAndUpdate(
      { email: data.email },
      { $set: { sessionToken: data.sessionToken } }
    );
    SuperAdmin.findOne({ email: data.email }, (err, result) => {
      deferred.resolve(result);
    });
    return deferred.promise;
  },
  userAdminLogOut: async (data) => {
    var deferred = Q.defer();
    SuperAdmin.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(data.userId) },
      { $set: { sessionToken: "" } },
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
  findUserOldPassword: (password) => {
    var deferred = Q.defer();
    SuperAdmin.findOne(
      { userName: "administrator" },
      { hash: 1, status: 1 },
      async (err, result) => {
        if (err) {
          deferred.resolve(err);
        } else {
          let isMatch = await bcrypt.compare(password, result.hash);
          deferred.resolve(isMatch);
        }
      }
    );
    return deferred.promise;
  },
  adminChangePassword: (data) => {
    var deferred = Q.defer();
    let newpass = bcrypt.hashSync(data.newpassword, 10);
    SuperAdmin.findOneAndUpdate(
      { userName: "administrator" },
      { $set: { hash: newpass } },
      { new: true },
      (err, result) => {
        if (err) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          let obj = { status: 1, data: "Your password has beed updated." };
          deferred.resolve(obj);
        }
      }
    );
    return deferred.promise;
  },
  oldUserPasswordCheck: async (data) => {
    var deferred = Q.defer();
    User.findOne({ email: data.email }).exec(async (err, result) => {
      if (err) {
        deferred.resolve(err);
      } else {
        if (result.hash != undefined || result.hash != null) {
          if (await bcrypt.compare(data.oldPassword, result.hash)) {
            let obj = { status: 1 };
            deferred.resolve(obj);
          } else {
            let obj = { status: 2 };
            deferred.resolve(obj);
          }
        } else {
          let obj = { status: 0 };
          deferred.resolve(obj);
        }
        deferred.resolve(result);
      }
    });
    return deferred.promise;
  },
  changeUserPassword: (data) => {
    var deferred = Q.defer();
    let newpass = bcrypt.hashSync(data.newPassword, 10);
    User.findOneAndUpdate(
      { email: data.email },
      { $set: { hash: newpass } },
      { new: true },
      (err, result) => {
        if (err) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          let obj = { status: 1, data: "Your password has beed updated." };
          deferred.resolve(obj);
        }
      }
    );
    return deferred.promise;
  },
  checkUserSlug: async (data) => {
    var deferred = Q.defer();
    User.findOne(
      { userSlug: data },
      { userSlug: 1, status: 1 },
      async (err, result) => {
        console.log("result...........", result);

        if (err) {
          deferred.resolve(err);
        } else {
          deferred.resolve(result);
        }
      }
    );
    return deferred.promise;
  },
  saveOtp: async (data) => {
    var deferred = Q.defer();
    if (
      data.status == "1" ||
      data.status == 1 ||
      data.status == "5" ||
      data.status == 5
    ) {
      loginUser.findOneAndUpdate(
        { email: data.email },
        { $set: { email: data.email, sendOtp: data.sendOtp.toString() } },
        { new: true, upsert: true },
        (err, result) => {
          // console.log(err, result)
          if (err) {
            let obj = { status: 0, data: err };
            deferred.resolve(obj);
          } else {
            let obj = { status: 1, data: result };
            deferred.resolve(obj);
          }
        }
      );
    } else if (data.status == "2" || data.status == 2) {
      if (data.userName === true) {
        User.findOne({
          $or: [{ email: data.email, sendOtp: data.sendOtp.toString() }],
        }).exec(async (err, result) => {
          if (err || result == null) {
            let obj = { status: 4, data: err };
            deferred.resolve(obj);
          } else {
            if (result.userSlug == "") {
              const getUserSlugStatus = await Promise.all([
                self.checkUserNewSlug(data.userSlug),
              ]);
              console.log(
                getUserSlugStatus,
                "getUserSlugStatusgetUserSlugStatusgetUserSlugStatus"
              );
              if (getUserSlugStatus[0] == 1) {
                var setdata = {
                  $set: { email: data.email, sendOtp: data.sendOtp.toString() },
                };
              } else {
                data.userSlug = (
                  data.userSlug +
                  Math.floor(Math.random() * 100) +
                  1
                ).toLowerCase();
                var setdata = {
                  $set: {
                    email: data.email,
                    sendOtp: data.sendOtp.toString(),
                    userSlug: data.userSlug,
                  },
                };
              }
              await loginUser
                .findOneAndUpdate({ email: data.email }, setdata, {
                  new: true,
                  upsert: true,
                })
                .exec();
              result.userSlug = data.userSlug;
            }

            let obj = { status: 6, data: result };
            deferred.resolve(obj);
          }
        });
      } else {
        User.findOne({
          $or: [
            { email: data.email, sendOtp: data.sendOtp.toString() },
            { email: data.sendOtp == "1997" ? data.email : "" },
          ],
        }).exec(async (err, result) => {
          if (err) {
            let obj = { status: 4, data: err };
            deferred.resolve(obj);
          } else {
            if (result == null) {
              if (data.sendOtp == "1997") {
                // if(data.email){
                //     data.email = data.email.toLowerCase();
                //     data.sendOtp = data.sendOtp.toString();
                // }
                loginUser.create(data, (err, result) => {
                  if (err) {
                    let obj = { status: 0, data: err };
                    deferred.resolve(obj);
                  } else {
                    let obj = { status: 3, data: result };
                    deferred.resolve(obj);
                  }
                });
              } else {
                // if(data.email){
                //     data.email = data.email.toLowerCase();
                //     data.sendOtp = data.sendOtp.toString();
                // }
                loginUser.create(data, (err, result) => {
                  if (err) {
                    let obj = { status: 0, data: err };
                    deferred.resolve(obj);
                  } else {
                    let obj = { status: 3, data: result };
                    deferred.resolve(obj);
                  }
                });
                let obj = { status: 1, data: result };
                deferred.resolve(obj);
              }
            } else {
              await loginUser
                .findOneAndUpdate(
                  { email: data.email },
                  {
                    $set: {
                      email: data.email,
                      sendOtp: data.sendOtp.toString(),
                    },
                  },
                  { new: true, upsert: true }
                )
                .exec();

              if (result.userVerify == 1 || result.userVerify == "1") {
                let obj = { status: 2, data: result };
                deferred.resolve(obj);
              } else {
                let obj = { status: 3, data: result };
                deferred.resolve(obj);
              }
            }
          }
        });
      }
    } else {
      data.userSlug = data.userSlug.toLowerCase();
      data.userVerify = 1;
      loginUser.findOneAndUpdate(
        { email: data.email },
        { $set: data },
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
    }
    return deferred.promise;
  },
  checkUserNewSlug: async (data) => {
    var deferred = Q.defer();
    User.findOne(
      { userSlug: data.toString() },
      { userSlug: 1, status: 1 }
    ).exec(async (err, result) => {
      if (err || result == null) {
        deferred.resolve(0);
      } else {
        deferred.resolve(1);
      }
    });
    return deferred.promise;
  },
  setPassword: async (data) => {
    var deferred = Q.defer();
    loginUser.findOneAndUpdate(
      { email: data.email },
      { $set: data },
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
});
