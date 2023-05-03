const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var fs = require("fs");
const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
const mailerService = require("./mailer.service");
const userService = require("../user/user.service");

const sendEmailParams = [
  "fromSubject",
  "mainSubject",
  "mailText",
  "email",
  "status",
];
const changePasswordEmail = ["email", "status", "password"];
const contactUsEmailParams = ["name", "email", "mobile", "subject", "message"];

let filterData = async (result,secretToken) => {

  let webtoken = jwt.sign(
    {
      userId: result.data._id,
      firstName: result.data.firstName,
      lastName: result.data.lastName,
      email: result.data.email,
      countryCode: result.data.countryCode,
      mobile: result.data.mobile,
      userType: result.data.userType,
      permissions: result.data.permissions,
      sessionToken: result.data.sessionToken,
      companyUserId: result.data.companyUserId,
      loginAs: result.data.loginAs,
      databaseName: result.data.databaseName,
      userSlug: result.data.userSlug,
      uniqueId: result.data.uniqueId,
      userRelation: result.data.userRelation,
      dob: result.data.dob,
      genderSatatus:result.data.genderSatatus,
      address: result.data.address,
      hash: (result.data.hash == "") ? false : true
    },
    secretToken,
    { expiresIn: "1h" }
  );

  return webtoken;

}
var SibApiV3Sdk = require('sib-api-v3-sdk');
module.exports = {
  tloginEmail: async (req, res) => {

      try {

            
            var SibApiV3Sdk = require('sib-api-v3-sdk');
            SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = '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';

            fs.readFile("./cpl-loginotp-verification.html",{ encoding: "utf-8" },async (err, data) => {
                if (err) {
                  console.warn("Error getting password reset template: " + err);
                } else {

                  var sendOtp = Math.floor(1000 + Math.random() * 9000);
                  let htmlFile = data;
                  htmlFile = htmlFile.replace("#userOtp#", sendOtp);

                  new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
                    {
                      'subject':'Hello from the Node SDK!',
                      'sender' : {'email':'api@sendinblue.com', 'name':'Sendinblue'},
                      'replyTo' : {'email':'api@sendinblue.com', 'name':'Sendinblue'},
                      'to' : [{'name': 'John Doe', 'email':'sharma_manish@controlprint.com'}],
                      'htmlContent' : htmlFile,
                      'params' : {'bodyMessage':'Made just for you!'}
                    }
                  ).then(function(data) {
                      console.log('API called successfully. Returned data: ' + data);
                      res.json({
                        responseStatus: 1,
                        responseMsgCode: "success",
                        responseData: 'API called successfully. Returned data: ' + data,
                      });
                  }, function(error) {
                      res.json({
                        responseStatus: 0,
                        responseMsgCode: "failure",
                        responseData: error,
                      });
                  });

                  
                }
            });


      } catch (error) {

          res.status(200).send({responseStatus: 0, responseMsgCode: "processFailed", responseData: { err: error }, responseInvalid: 0,});
      }

  },
  contactUsEmail: async (req, res) => {
    try {
      let flag = false;
      contactUsEmailParams.forEach(function (element, key) {
        if (req.body[element] == "" || req.body[element] == undefined) {
          flag = true;
        }
      });
      if (flag) {
        res
          .status(200)
          .send({ responseStatus: 0, responseMsgCode: "mandatoryField" });
      }

      let userName = "ef45bad14f72aa2220459e479592ecfc";
      let password1 = "ce2340550790bd00a275bc21fabcfa67";

      var transporter = nodemailer.createTransport(
        smtpTransport({
          service: "mailjet",
          host: "in-v3.mailjet.com",
          auth: {
            user: userName, // generated ethereal user
            pass: password1, // generated ethereal password
          },
        })
      );

      fs.readFile(
        "./cpl-contactUs.html",
        { encoding: "utf-8" },
        async (err, data) => {
          if (err) {
            console.warn("Error getting password reset template: " + err);
          } else {
            let htmlFile = data;
            htmlFile = htmlFile.replace("#name#", req.body.name);
            htmlFile = htmlFile.replace("#email#", req.body.email);
            htmlFile = htmlFile.replace("#mobile#", req.body.mobile);
            htmlFile = htmlFile.replace("#subject#", req.body.subject);
            htmlFile = htmlFile.replace("#message#", req.body.message);

            var mailOptions = {
              from: "<info@controlprint.com>",
              to: "info@controlprint.com",
              subject: "Contact Us",
              html: htmlFile,
            };
			
            await transporter.sendMail(
              mailOptions,
              async function (error, info) {
                if (error) {
                  res.json({
                    responseStatus: 0,
                    responseMsgCode: "failure.",
                    responseData: {},
                  });
                } else {
                  fs.readFile(
                    "./cpl-thanksContactUs.html",
                    { encoding: "utf-8" },
                    async (err, newData) => {
                      if (err) {
                        console.warn(
                          "Error getting password reset template: " + err
                        );
                      } else {
                        let newhtmlFile = newData;
                        newhtmlFile = newhtmlFile.replace(
                          "#name#",
                          req.body.name
                        );
                        var thanksMailOptions = {
                          from: "<info@controlprint.com>",
                          to: req.body.email,
                          subject: "Thank you for contacting us!",
                          html: newhtmlFile,
                        };
                        await transporter.sendMail(thanksMailOptions);
                      }
                    }
                  );
                  res.json({
                    responseStatus: 1,
                    responseMsgCode: "success",
                    responseData: {},
                  });
                }
              }
            );
          }
        }
      );
    } catch (error) {
      res.status(200).send({
        responseStatus: 0,
        responseMsgCode: "processFailed",
        responseData: { err: error },
        responseInvalid: 0,
      });
    }
  },
  sendEmail: async (req, res) => {
    try {
      let secretToken = req.headers["x-access-token"];
      if (req.body.status == 1 || req.body.status == "1") {
        let flag = false;
        sendEmailParams.forEach(function (element, key) {
          if (req.body[element] == "" || req.body[element] == undefined) {
            flag = true;
          }
        });
        if (flag) {
          res
            .status(200)
            .send({ responseStatus: 0, responseMsgCode: "mandatoryField" });
        }

        var sendOtp = Math.floor(1000 + Math.random() * 9000);

        let userName = "ef45bad14f72aa2220459e479592ecfc";
        let password1 = "ce2340550790bd00a275bc21fabcfa67";

        var transporter = nodemailer.createTransport(
          smtpTransport({
            service: "mailjet",
            host: "in-v3.mailjet.com",
            auth: {
              user: userName, // generated ethereal user
              pass: password1, // generated ethereal password
            },
          })
        );

        fs.readFile(
          "./cpl-email-verification.html",
          { encoding: "utf-8" },
          async (err, data) => {
            if (err) {
              console.warn("Error getting password reset template: " + err);
            } else {
              userService
                .findUserEmailId(req.body.email)
                .then(async (result) => {
                  if (result.data == null) {
                    res.json({
                      responseStatus: 0,
                      responseMsgCode: "Your EmailId is not exists!",
                      responseData: {},
                    });
                  } else {
                    let htmlFile = data;
                    htmlFile = htmlFile.replace(
                      "#userName#",
                      result.data.firstName
                    );
                    htmlFile = htmlFile.replace("#userOtp#", sendOtp);

                    var mailOptions = {
                      from: "<info@controlprint.com>",
                      to: req.body.email,
                      subject: req.body.mainSubject,
                      html: htmlFile,
                    };

                    await transporter.sendMail(
                      mailOptions,
                      function (error, info) {
                        if (error) {
                          res.json({
                            responseStatus: 0,
                            responseMsgCode: "failure.",
                            responseData: {
                              status: 0,
                              message: error,
                            },
                          });
                        } else {
                          res.json({
                            responseStatus: 1,
                            responseMsgCode: "success",
                            responseData: {
                              status: 1,
                              message: info.response,
                              // otp: sendOtp,
                            },
                          });
                        }
                      }
                    );
                  }
                });
            }
          }
        );
      } else {
        let flag = false;
        changePasswordEmail.forEach(function (element, key) {
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
        delete req.body.status;

        mailerService.changePasswordByEmailId(req.body).then(async (result) => {
          if (result.data == null) {
            res.json({
              responseStatus: 0,
              responseMsgCode: "Your EmailId is not exists!",
              responseData: {},
            });
          } else {
            const webtoken = jwt.sign(
              {
                userId: result.data._id,
                firstName: result.data.firstName,
                lastName: result.data.lastName,
                email: result.data.email,
                countryCode: result.data.countryCode,
                mobile: result.data.mobile,
                userType: result.data.userType,
                permissions: result.data.permissions,
                permissionTypes: result.data.permissionTypes,
                status: result.data.status,
                sessionToken: result.data.sessionToken,
                companyUserId: result.data.companyUserId,
                loginAs: result.data.loginAs,
                uniqueId: result.data.uniqueId,
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
  loginEmail: async (req, res) => {
    try {
      let secretToken = req.headers["x-access-token"];
      if (req.params.status == 1 || req.params.status == "1") {
        
        var sendOtp = Math.floor(1000 + Math.random() * 9000);

        SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = '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';

        fs.readFile("./cpl-loginotp-verification.html", { encoding: "utf-8" }, async (err, data) => {
          if (err) {
            console.warn("Error getting password reset template: " + err);
          } else {

            let htmlFile = data;
            htmlFile = htmlFile.replace("#userOtp#", sendOtp);

            new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
              {
                'subject': 'Login Verification',
                'sender': { 'email': 'info@controlprint.com', 'name': 'Blokchi' },
                'replyTo': { 'email': 'info@controlprint.com', 'name': 'Blokchi' },
                'to': [{ 'name': req.body.email, 'email': req.body.email }],
                'htmlContent': htmlFile,
                'params': { 'bodyMessage': 'Made just for you!' }
              }
            ).then(async (data) => {
              console.log('API called successfully. Returned data: ' + data);
              req.body.sendOtp = sendOtp;
              req.body.status = req.params.status;
              await userService.saveOtp(req.body);
              res.json({
                responseStatus: 1,
                responseMsgCode: "success",
                responseData: 'API called successfully. Returned data: ' + data,
              });
            }, (error) => {
              res.json({
                responseStatus: 0,
                responseMsgCode: "failure",
                responseData: error,
              });
            });


          }
        });
      } else if (req.params.status == 5 || req.params.status == "5") {
        console.log(req.body);
        // return false;

        var sendOtp = Math.floor(1000 + Math.random() * 9000);

        SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = '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';

        fs.readFile("./cplOtp-verification.html", { encoding: "utf-8" }, async (err, data) => {
          if (err) {
            console.warn("Error getting password reset template: " + err);
          } else {

            let htmlFile = data;
            htmlFile = htmlFile.replace("#userOtp#", sendOtp);

            new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
              {
                'subject': 'Otp Verification',
                'sender': { 'email': 'info@controlprint.com', 'name': 'Blokchi' },
                'replyTo': { 'email': 'info@controlprint.com', 'name': 'Blokchi' },
                'to': [{ 'name': req.body.email, 'email': req.body.email }],
                'htmlContent': htmlFile,
                'params': { 'bodyMessage': 'Made just for you!' }
              }
            ).then(async (data) => {
              // console.log('API called successfully. Returned data: ' + data);
              req.body.sendOtp = sendOtp;
              req.body.status = req.params.status;
              await userService.saveOtp(req.body);
              res.json({
                responseStatus: 1,
                responseMsgCode: "success",
                responseData: 'API called successfully. Returned data: ' + data,
              });
            }, (error) => {
              res.json({
                responseStatus: 0,
                responseMsgCode: "failure",
                responseData: error,
              });
            });


          }
        });

      } else if (req.params.status == 2 || req.params.status == "2") {

        // console.log("else-if", "---------------");
        req.body.sendOtp = req.body.sendOtp;
        req.body.status = req.params.status;
        req.body.userSlug = req.body.email.split("@")[0];

        userService.saveOtp(req.body).then(async (result) => {
          console.log(result.status, "res status 2");
          if (result.status == 1 || result.status == 4) {
            res.json({
              responseStatus: 0,
              responseMsgCode: "Your email and otp not match!",
              responseData: {},
            });
          } else if (result.status == 2) {

            let webtoken = await filterData(result, secretToken);

            var obj = {
              responseStatus: 1,
              responseMsgCode: "success",
              responseData: {
                webtoken: webtoken,
                status: 2,
              },
            };
            res.json(obj);
          } else if (result.status == 6) {
            let webtoken = await filterData(result, secretToken);
            var obj = {
              responseStatus: 1,
              responseMsgCode: "success",
              responseData: {
                webtoken: webtoken,
                status: 6,
              },
            };
            res.json(obj);
          } else {

            var obj = {
              responseStatus: 1,
              responseMsgCode: "success",
              responseData: {
                webtoken: {},
                status: 1,
              },
            };
            res.json(obj);
          }
        });
      } else {
        userService.saveOtp(req.body).then(async (result) => {
          if (result.status == 0) {
            res.json({
              responseStatus: 0,
              responseMsgCode: "Failure",
              responseData: {},
            });
          } else {

            let webtoken = await filterData(result, secretToken);

            var obj = {
              responseStatus: 1,
              responseMsgCode: "success",
              responseData: {
                webtoken: webtoken,
                status: 2,
              },
            };
            res.json(obj);
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
};
