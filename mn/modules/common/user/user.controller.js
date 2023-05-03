const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
const userService = require("./user.service");
const requestIp = require("request-ip");

const userRegisterParams = [
  "firstName",
  "lastName",
  "email",
  "countryCode",
  "mobile",
  "password",
];
const userLoginAsParams = ["userId", "loginas"];
const authLogOutParams = ["userId"];
const userLoginParams = ["email", "password"];
const userProfileParams = ["dob", "genderSatatus"];
const setPasswordParams = ["email", "password"];

let filterData = async (result, secretToken) => {
  let webtoken = jwt.sign(
    {
      userId: result.data._id,
      firstName: result.data.firstName,
      lastName: result.data.lastName,
      email: result.data.email,
      countryCode: result.data.countryCode,
      mobile: result.data.mobile,
      userType: result.data.userType,
      plantCode: result.data.plantCode,
      permissionTypes: result.data.permissionTypes,
      permissions: result.data.permissions,
      sessionToken: result.data.sessionToken,
      companyUserId: result.data.companyUserId,
      loginAs: result.data.loginAs,
      databaseName: result.data.databaseName,
      userSlug: result.data.userSlug,
      profileImg: result.data.profileImg ? result.data.profileImg : "",
      uniqueId: result.data.uniqueId,
      userRelation: result.data.userRelation,
      dob: result.data.dob,
      genderSatatus: result.data.genderSatatus,
      address: result.data.address,
      hash: result.data.hash == "" ? false : true,
    },
    secretToken,
    { expiresIn: "1h" }
  );

  return webtoken;
};

module.exports = {

  plantlogin: async (req, res) => {
    try {
      let secretToken = req.headers["x-access-token"];
      
      if (req.body.password == ''|| req.body.password == undefined) {
        return res.json({ responseStatus: 0, responseMsgCode: "password field is required", "responseData": {} })
    }
    if (req.body.email == '' || req.body.email == undefined) {
        return res.json({ responseStatus: 0, responseMsgCode: "email field is required", "responseData": {} })
    } 
    if (req.body.plantCode == '' || req.body.plantCode == undefined) {
        return res.json({ responseStatus: 0, responseMsgCode: "plantCode field is required", "responseData": {} })
    }
      const validation = await Promise.all([userService.activeEmailId(req.body.email)]);
      if (validation[0].status == 1) {
        res.json({
          responseStatus: 0, responseMsgCode: "Your Account already deactivated!", responseData: {},
        });
      }

      let token = jwt.sign({ email: req.body.email },"-medGrids$@agiosolutioncompanyApp");
      req.body.sessionToken = token;

      userService.plantlogin(req.body).then(async (result) => {
        if (result) {
          let isMatch = await bcrypt.compare(req.body.password, result.hash);
          if (isMatch) {
            let sendData = {};
            sendData.data = result;
            let webtoken = await filterData(sendData, secretToken);
            var obj = {
              responseStatus: 1,
              responseMsgCode: "success",
              responseData: webtoken,
            };
            res.json(obj);
          } else {
            res.json({responseStatus: 0, responseMsgCode: "Invalid Password"});
          }
        } else {
          res.json({ responseStatus: 0, responseMsgCode: "Invalid EmailId || plantCode" });
        }
      });
    } catch (error) {
      res.status(200).send({responseStatus: 0,responseMsgCode: "processFailed",responseData: { err: error },responseInvalid: 0});
    }
  },
  setPassword: (req, res) => {
    try {
      let flag = false;
      setPasswordParams.forEach(function (element, key) {
        if (req.body[element] == "" || req.body[element] == undefined) {
          flag = true;
        }
      });
      if (flag) {
        res
          .status(200)
          .send({ responseStatus: 0, responseMsgCode: "mandatoryField" });
      }

      req.body.hash = bcrypt.hashSync(req.body.password, 10);
      delete req.body.password;
      let token = jwt.sign(
        { email: req.body.email },
        "-blokchi$@agiosolutioncompanyApp"
      );
      req.body.sessionToken = token;
      req.body.uniqueId = Math.random().toString(36).substr(2, 12);

      userService.setPassword(req.body).then((result) => {
        if (result.status == 1) {
          var obj = {
            responseStatus: 1,
            responseMsgCode: "success",
            responseData: result,
          };
          res.json(obj);
        } else {
          res.json({
            responseStatus: 0,
            responseMsgCode: "failure.",
            responseData: result.data,
          });
        }
      });
    } catch (error) {
      res.status(200).send({
        responseStatus: 0,
        responseMsgCode: "processFailed",
        responseData: { err: error },
        responseInvalid: 0,
      });
    }
  },
  getUserToken: (req, res) => {
    try {
      let secretToken = req.headers["x-access-token"];
      let flag = false;
      authLogOutParams.forEach(function (element, key) {
        if (req.body[element] == "" || req.body[element] == undefined) {
          flag = true;
        }
      });
      if (flag) {
        res
          .status(200)
          .send({ responseStatus: 0, responseMsgCode: "mandatoryField" });
      }

      userService.getUserToken(req.body).then(async (result) => {
        if (result.status == 1) {
          let sendData = {};
          sendData.data = result;
          let webtoken = await filterData(sendData, secretToken);
          var obj = {
            responseStatus: 1,
            responseMsgCode: "success",
            responseData: webtoken,
          };
          res.json(obj);
        } else {
          res.json({
            responseStatus: 0,
            responseMsgCode: "failure.",
            responseData: result,
          });
        }
      });
    } catch (error) {
      res.status(200).send({
        responseStatus: 0,
        responseMsgCode: "processFailed",
        responseData: { err: error },
        responseInvalid: 0,
      });
    }
  },
  userLoginAs: (req, res) => {
    try {
      let secretToken = req.headers["x-access-token"];
      let flag = false;
      userLoginAsParams.forEach(function (element, key) {
        if (req.body[element] == "" || req.body[element] == undefined) {
          flag = true;
        }
      });
      if (flag) {
        res
          .status(200)
          .send({ responseStatus: 0, responseMsgCode: "mandatoryField" });
      }

      userService.userLoginAs(req.body).then(async (result) => {
        var data = {};
        if (result.status == 1) {
          let webtoken = await filterData(result, secretToken);

          var obj = {
            responseStatus: 1,
            responseMsgCode: "success",
            responseData: webtoken,
          };
          res.json(obj);
        } else {
          res.json({
            responseStatus: 0,
            responseMsgCode: "failure.",
            responseData: result.data,
          });
        }
      });
    } catch (error) {
      res.status(200).send({
        responseStatus: 0,
        responseMsgCode: "processFailed",
        responseData: { err: error },
        responseInvalid: 0,
      });
    }
  },
  authLogOut: (req, res) => {
    try {
      let flag = false;
      authLogOutParams.forEach(function (element, key) {
        if (req.body[element] == "" || req.body[element] == undefined) {
          flag = true;
        }
      });
      if (flag) {
        res
          .status(200)
          .send({ responseStatus: 0, responseMsgCode: "mandatoryField" });
      }

      userService.authLogOut(req.body).then((result) => {
        var data = {};
        if (result.status == 1) {
          data.userUpdate = result.data;
          var obj = {
            responseStatus: 1,
            responseMsgCode: "success",
            responseData: data,
          };
          res.json(obj);
        } else {
          res.json({
            responseStatus: 0,
            responseMsgCode: "failure.",
            responseData: result.data,
          });
        }
      });
    } catch (error) {
      res.status(200).send({
        responseStatus: 0,
        responseMsgCode: "processFailed",
        responseData: { err: error },
        responseInvalid: 0,
      });
    }
  },
  profileUpdate: (req, res) => {
    try {

      let secretToken = req.headers["x-access-token"];

      if (req.files.profileImg != undefined) {
        req.body.profileImg = req.files.profileImg[0].location
      }

      let id = req.body.id;
      userService.profileUpdate(id, req.body).then(async (result) => {
        if (result.status == 1) {
          let webtoken = await filterData(result, secretToken);
          var obj = {
            responseStatus: 1,
            responseMsgCode: "success",
            responseData: webtoken,
          };
          res.json(obj);
        } else {
          res.json({
            responseStatus: 0,
            responseMsgCode: "failure.",
            responseData: result.data,
          });
        }
      });
    } catch (error) {
      res.status(200).send({
        responseStatus: 0,
        responseMsgCode: "processFailed",
        responseData: { err: error },
        responseInvalid: 0,
      });
    }
  },
  register: async (req, res) => {
    try {
      let secretToken = req.headers["x-access-token"];
      let flag = false;
      userRegisterParams.forEach(function (element, key) {
        if (req.body[element] == "" || req.body[element] == undefined) {
          flag = true;
        }
      });
      if (flag) {
        res
          .status(200)
          .send({ responseStatus: 0, responseMsgCode: "mandatoryField" });
      }
      req.body.hash = bcrypt.hashSync(req.body.password, 10);
      delete req.body.password;
      let token = jwt.sign(
        { email: req.body.email },
        "-medGrids$@agiosolutioncompanyApp"
      );
      req.body.sessionToken = token;
      req.body.uniqueId = Math.random().toString(36).substr(2, 12);

      req.body.databaseName = "DB_" + req.body.userSlug;

      const validation = await Promise.all([
        userService.findUserEmailId(req.body.email),
        userService.findMobileNumber(req.body.mobile),
      ]);

      if (validation[0].status == 1 && validation[0].data != null) {
        res.json({
          responseStatus: 0,
          responseMsgCode: "Email Id already exists",
          responseData: {},
        });
      } else if (validation[1].status == 1 && validation[1].data != null) {
        res.json({
          responseStatus: 0,
          responseMsgCode: "Mobile Number already exists",
          responseData: {},
        });
      }

      userService.register(req.body).then(async (result) => {
        if (result.code != 11000) {
          let sendData = {};
          sendData.data = result;

          let webtoken = await filterData(sendData, secretToken);

          var obj = {
            responseStatus: 1,
            responseMsgCode: "success",
            responseData: webtoken,
          };
          res.json(obj);
        } else {
          res.json({
            responseStatus: 0,
            responseMsgCode: "Somthing Went Wrong!",
            responseData: {},
          });
        }
      });
    } catch (error) {
      res.status(200).send({
        responseStatus: 0,
        responseMsgCode: "processFailed",
        responseData: { err: error },
        responseInvalid: 0,
      });
    }
  },
  login: async (req, res) => {
    try {
      let secretToken = req.headers["x-access-token"];
      let flag = false;
      userLoginParams.forEach(function (element, key) {
        if (req.body[element] == "" || req.body[element] == undefined) {
          flag = true;
        }
      });
      if (flag) {
        res
          .status(200)
          .send({ responseStatus: 0, responseMsgCode: "mandatoryField" });
      }

      const validation = await Promise.all([
        userService.activeEmailId(req.body.email),
      ]);
      if (validation[0].status == 1) {
        res.json({
          responseStatus: 0,
          responseMsgCode: "Your Account already deactivated!",
          responseData: {},
        });
      }

      let token = jwt.sign(
        { email: req.body.email },
        "-medGrids$@agiosolutioncompanyApp"
      );
      req.body.sessionToken = token;

      userService.login(req.body).then(async (result) => {
        if (result) {
          let isMatch = await bcrypt.compare(req.body.password, result.hash);
          if (isMatch) {
            let sendData = {};
            sendData.data = result;

            let webtoken = await filterData(sendData, secretToken);

            var obj = {
              responseStatus: 1,
              responseMsgCode: "success",
              responseData: webtoken,
            };
            res.json(obj);
          } else {
            res.json({
              responseStatus: 0,
              responseMsgCode: "Invalid Password",
            });
          }
        } else {
          res.json({ responseStatus: 0, responseMsgCode: "Invalid EmailId" });
        }
      });
    } catch (error) {
      res.status(200).send({
        responseStatus: 0,
        responseMsgCode: "processFailed",
        responseData: { err: error },
        responseInvalid: 0,
      });
    }
  },
  superLogin: async (req, res) => {
    try {
      let secretToken = req.headers["x-access-token"];
      const validation = await Promise.all([
        userService.checkEmailId(req.body.email),
      ]);
      if (validation[0].status == 1) {
        res.json({
          responseStatus: 0,
          responseMsgCode: "Your Account already deactivated!",
          responseData: {},
        });
      }
      let token = jwt.sign(
        { email: req.body.email },
        "-medGrids$@agiosolutioncompanyApp"
      );
      req.body.sessionToken = token;
      userService.superLogin(req.body).then(async (result) => {
        if (result) {
          let isMatch = await bcrypt.compare(req.body.password, result.hash);
          if (isMatch) {
            const webtoken = jwt.sign(
              {
                userId: result._id,
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                mobile: result.mobile,
                sessionToken: result.sessionToken,
              },
              secretToken,
              { expiresIn: "1h" }
            );

            var obj = {
              responseStatus: 1,
              responseMsgCode: "success",
              responseData: webtoken,
            };
            res.json(obj);
          } else {
            res.json({
              responseStatus: 0,
              responseMsgCode: "Invalid Password",
            });
          }
        } else {
          res.json({ responseStatus: 0, responseMsgCode: "Invalid EmailId" });
        }
      });
    } catch (error) {
      res.status(200).send({
        responseStatus: 0,
        responseMsgCode: "processFailed",
        responseData: { err: error },
        responseInvalid: 0,
      });
    }
  },
  userAdminLogOut: (req, res) => {
    try {
      if (req.body.userId == "" || req.body.userId == undefined) {
        return res.json({
          responseStatus: 0,
          responseMsgCode: "UserId field is required",
          responseData: {},
        });
      }
      userService.userAdminLogOut(req.body).then((result) => {
        var data = {};
        if (result.status == 1) {
          data.userUpdate = result.data;
          var obj = {
            responseStatus: 1,
            responseMsgCode: "success",
            responseData: data,
          };
          res.json(obj);
        } else {
          res.json({
            responseStatus: 0,
            responseMsgCode: "failure.",
            responseData: result.data,
          });
        }
      });
    } catch (error) {
      res.status(200).send({
        responseStatus: 0,
        responseMsgCode: "processFailed",
        responseData: { err: error },
        responseInvalid: 0,
      });
    }
  },
  adminChangePassword: async (req, res) => {
    try {
      if (req.body.oldpassword == "" || req.body.oldpassword == undefined) {
        res.json({
          responseStatus: 0,
          responseMsgCode: "oldpassword field is required",
          responseData: {},
        });
      }
      if (req.body.newpassword == "" || req.body.newpassword == undefined) {
        res.json({
          responseStatus: 0,
          responseMsgCode: "newpassword field is required",
          responseData: {},
        });
      }
      const validation = await Promise.all([
        userService.findUserOldPassword(req.body.oldpassword),
      ]);
      console.log(validation);
      if (validation[0] == false) {
        res.json({
          responseStatus: 0,
          responseMsgCode: "Your old password does not match",
          responseData: {},
        });
      } else {
        userService.adminChangePassword(req.body).then((result) => {
          if (result.status == 1) {
            res.json({
              responseStatus: 1,
              responseMsgCode: "success",
              responseData: result.data,
            });
          } else {
            res.json({
              responseStatus: 0,
              responseMsgCode: "failure.",
              responseData: result.data,
            });
          }
        });
      }
    } catch (error) {
      res.status(200).send({
        responseStatus: 0,
        responseMsgCode: "processFailed",
        responseData: { err: error },
        responseInvalid: 0,
      });
    }
  },
  changeUserPassword: async (req, res) => {
    try {
      if (req.body.oldPassword == "" || req.body.oldPassword == undefined) {
        res.json({
          responseStatus: 0,
          responseMsgCode: "oldpassword field is required",
          responseData: {},
        });
      }
      if (req.body.newPassword == "" || req.body.newPassword == undefined) {
        res.json({
          responseStatus: 0,
          responseMsgCode: "newpassword field is required",
          responseData: {},
        });
      }
      const validation = await Promise.all([
        userService.oldUserPasswordCheck(req.body),
      ]);
      if (validation[0].status == 0 || validation[0].status == 2) {
        res.json({
          responseStatus: 0,
          responseMsgCode: "Your old password does not match",
          responseData: {},
        });
      } else {
        userService.changeUserPassword(req.body).then((result) => {
          if (result.status == 1) {
            res.json({
              responseStatus: 1,
              responseMsgCode: "success",
              responseData: result.data,
            });
          } else {
            res.json({
              responseStatus: 0,
              responseMsgCode: "failure.",
              responseData: result.data,
            });
          }
        });
      }
    } catch (error) {
      res.status(200).send({
        responseStatus: 0,
        responseMsgCode: "processFailed",
        responseData: { err: error },
        responseInvalid: 0,
      });
    }
  },
  checkUserSlug: async (req, res) => {
    try {
      if (req.body.name == "" || req.body.name == undefined) {
        res.json({
          responseStatus: 0,
          responseMsgCode: "name field is required",
          responseData: {},
        });
      }

      userService.checkUserSlug(req.body.name).then((result) => {
        if (result) {
          res.json({
            responseStatus: 1,
            responseMsgCode: "success",
            responseData: result,
          });
        } else {
          res.json({
            responseStatus: 0,
            responseMsgCode: "failure.",
            responseData: result,
          });
        }
      });
    } catch (error) {
      res.status(200).send({
        responseStatus: 0,
        responseMsgCode: "processFailed",
        responseData: { err: error },
        responseInvalid: 0,
      });
    }
  },
};
