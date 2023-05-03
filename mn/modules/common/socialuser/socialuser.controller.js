const socialuserService = require("./socialuser.service");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const request = require('request');
const fs = require('fs');
const NodeCache = require( "node-cache" );
const myCache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );
const socialuserRegisterParams = ['email', 'uToken', 'status', 'sId'];
const socialuserFRegisterParams = ['uToken', 'status', 'sId'];
const socialuserFLoginParams = ['uToken', 'sId', 'status'];
const socialuserLoginParams = ['email','uToken', 'sId', 'status'];
const socialLoginRegisterparams = ['email', 'uToken', 'sId', 'status'];
const sloginParams = ['email', 'firstName', 'lastName']

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
  
module.exports = {
    register: async (req, res) => {
        try {
			
			let secretToken = req.headers['x-access-token'];
			let flag = false;
			if(req.body.status == 1 || req.body.status == '1'){			
				socialuserFRegisterParams.forEach(function (element, key) {
					if (req.body[element] == '' || req.body[element] == undefined) {
						flag = true;
					}
				})			
			} else {
				socialuserRegisterParams.forEach(function (element, key) {
					if (req.body[element] == '' || req.body[element] == undefined) {
						flag = true;
					}
				})
			}
            
            if (flag) {
                res.status(200).send({ "responseStatus": 0, "responseMsgCode": "mandatoryField" });
            }
			
			if(req.body.status == 1 || req.body.status == '1'){			
				const validation = await Promise.all([socialuserService.findUserEmailId(req.body)]);
				if(validation[0].status == 1 && validation[0].data != null){				
					res.json({ responseStatus: 0, responseMsgCode: "Token already exists", "responseData":{}})				
				}				
			} else {
				const validation = await Promise.all([socialuserService.findUserEmailId(req.body)]);			
				if(validation[0].status == 1 && validation[0].data != null){				
					res.json({ responseStatus: 0, responseMsgCode: "Email Id already exists", "responseData":{}})				
				}
			}
			
			
			
			if(req.body.userImg != ''){
				
				var imageName = Date.now() + '_' + 'simg.png'
				var imageUrl = req.body.userImg			
				request({
					url : imageUrl,
					encoding : null
				}, function(error, response, body) {
					
					var destPath = './public/assests/images/user/' +  imageName
					fs.writeFile(destPath, body, {
						encoding : null
					}, function(err) {
						if (err)
						throw err;
						console.log('It\'s saved!');
					});
				});
				
				req.body.userImg = '/assests/images/user/' + imageName
				
			} else {
				req.body.userImg = ''
			}
			
			
            
			if(req.body.status == 1 || req.body.status == '1'){			
				var token = jwt.sign({ sId: req.body.sId }, "-medGrids$@agiosolutioncompanyApp")
			} else {
				var token = jwt.sign({ email: req.body.email }, "-medGrids$@agiosolutioncompanyApp")
			}
			
            req.body.sessionToken = token;
            req.body.uniqueId = Math.random().toString(36).substr(2, 12);
			
			socialuserService.register(req.body).then(result => {
				
				if (result.code != 11000) {
					
					if(result.rstatus == 1){
						
						var webtoken = jwt.sign(
						{
						userId: result._id,
						firstName: result.firstName,
						lastName: result.lastName,
						userImg: result.userImg,
						email: result.email,
						countryCode: result.countryCode,
						mobile: result.mobile,
						permissions: result.permissions,
						userType: result.userType,
						companyUserId: result.companyUserId,
						uniqueId: result.uniqueId,
						fToken: result.fToken,
						sId: result.sId,
						},
						secretToken,
						{ expiresIn: "1h" }
						);
						
					} else if(result.rstatus == 2){
						
						var webtoken = jwt.sign(
						{
						userId: result._id,
						firstName: result.firstName,
						lastName: result.lastName,
						userImg: result.userImg,
						email: result.email,
						countryCode: result.countryCode,
						mobile: result.mobile,
						userType: result.userType,
						permissions: result.permissions,
						companyUserId: result.companyUserId,
						uniqueId: result.uniqueId,
						gToken: result.gToken,
						sId: result.sId,
						},
						secretToken,
						{ expiresIn: "1h" }
						);
						
					} else {
						
						var webtoken = jwt.sign(
						{
						userId: result._id,
						firstName: result.firstName,
						lastName: result.lastName,
						userImg: result.userImg,
						email: result.email,
						countryCode: result.countryCode,
						mobile: result.mobile,
						userType: result.userType,
						permissions: result.permissions,
						companyUserId: result.companyUserId,
						uniqueId: result.uniqueId,
						iToken: result.iToken,
						sId: result.sId,
						},
						secretToken,
						{ expiresIn: "1h" }
						);
					}
					
					var obj = { responseStatus: 1, responseMsgCode: "success", "responseData":webtoken}
					res.json(obj)
					
				} else {

					res.json({ responseStatus: 0, responseMsgCode: "Something went wrong", "responseData":result})

					// console.log("result")
					// console.log(Object.assign({},result))
					
					// console.log("result")
					// console.log(Object.assign({},result))
					
					// if(result.keyPattern.mobile == 1){
					// 	res.json({ responseStatus: 0, responseMsgCode: "Mobile Number already exists", "responseData":result})
					// } else {
					// 	res.json({ responseStatus: 0, responseMsgCode: "Email Id already exists", "responseData":result})
					// }
				}
			})
            
			
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    login: async (req, res) => {
		
        try {
			let secretToken = req.headers['x-access-token'];
            let flag = false;
			if(req.body.status == 1 || req.body.status == '1'){			
				socialuserFLoginParams.forEach(function (element, key) {
					if (req.body[element] == '' || req.body[element] == undefined) {
						flag = true;
					}
				})			
			} else {
				socialuserLoginParams.forEach(function (element, key) {
					if (req.body[element] == '' || req.body[element] == undefined) {
						flag = true;
					}
				})
			}
			
            
            if (flag) {
                res.status(200).send({ "responseStatus": 0, "responseMsgCode": "mandatoryField" });
            }
			
			if(req.body.status == 1 || req.body.status == '1'){			
				var token = jwt.sign({ sId: req.body.sId }, "-medGrids$@agiosolutioncompanyApp")
			} else {
				var token = jwt.sign({ email: req.body.email }, "-medGrids$@agiosolutioncompanyApp")
			}
			req.body.sessionToken = token;
			
			socialuserService.login(req.body).then(async result => {
				
				if(result){
					
					
					if(result.rstatus == 1){
						
						var webtoken = jwt.sign(
						{
						userId: result._id,
						firstName: result.firstName,
						lastName: result.lastName,
						userImg: result.userImg,
						email: result.email,
						countryCode: result.countryCode,
						mobile: result.mobile,
						userType: result.userType,
						permissions: result.permissions,
						permissionTypes: result.permissionTypes,
						status: result.status,
						sessionToken: result.sessionToken,
						companyUserId: result.companyUserId,
						uniqueId: result.uniqueId,
						loginAs: result.loginAs,
						fToken: result.fToken,
						sId: result.sId,
						},
						secretToken,
						{ expiresIn: "1h" }
						);
						
					} else if(result.rstatus == 2){
						
						var webtoken = jwt.sign(
						{
						userId: result._id,
						firstName: result.firstName,
						lastName: result.lastName,
						userImg: result.userImg,
						email: result.email,
						countryCode: result.countryCode,
						mobile: result.mobile,
						userType: result.userType,
						permissions: result.permissions,
						permissionTypes: result.permissionTypes,
						status: result.status,
						sessionToken: result.sessionToken,
						companyUserId: result.companyUserId,
						uniqueId: result.uniqueId,
						loginAs: result.loginAs,
						gToken: result.gToken,
						sId: result.sId,
						},
						secretToken,
						{ expiresIn: "1h" }
						);
						
					} else {
						
						var webtoken = jwt.sign(
						{
						userId: result._id,
						firstName: result.firstName,
						lastName: result.lastName,
						userImg: result.userImg,
						email: result.email,
						countryCode: result.countryCode,
						mobile: result.mobile,
						userType: result.userType,
						permissions: result.permissions,
						permissionTypes: result.permissionTypes,
						status: result.status,
						sessionToken: result.sessionToken,
						companyUserId: result.companyUserId,
						uniqueId: result.uniqueId,
						loginAs: result.loginAs,
						iToken: result.iToken,
						sId: result.sId,
						},
						secretToken,
						{ expiresIn: "1h" }
						);
					}
					
					var obj = { responseStatus: 1, responseMsgCode: "success", "responseData":webtoken}
					res.json(obj)
             
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "Invalid EmailId"})
                }             
            })
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
	},
	
	socialLoginRegister: async (req, res) => {
		
		try {
			let secretToken = req.headers['x-access-token'];
			let flag = false;
			if (req.body.status == 1 || req.body.status == '1') {
				socialLoginRegisterparams.forEach(function (element, key) {
					if (req.body[element] == '' || req.body[element] == undefined) {
						flag = true;
					}
				})
			} else if (req.body.status == 2 || req.body.status == '2') {
				socialLoginRegisterparams.forEach(function (element, key) {
					if (req.body[element] == '' || req.body[element] == undefined) {
						flag = true;
					}
				})
			}
			else if (req.body.status == 3 || req.body.status == '3') {
				socialLoginRegisterparams.forEach(function (element, key) {
					if (req.body[element] == '' || req.body[element] == undefined) {
						flag = true;
					}
				})
			}
			
			if (flag) {
				res.status(200).send({ "responseStatus": 0, "responseMsgCode": "mandatoryField" });
			}
			
			req.body.sessionToken = jwt.sign({ sId: req.body.sId }, "-medGrids$@agiosolutioncompanyApp");
			req.body.uniqueId = Math.random().toString(36).substr(2, 12);

			socialuserService.socialLoginRegister(req.body).then(async result => {
				
				if (result) {
					if (result.status == 1) {
						var webtoken = jwt.sign(
							{
								userId: result._id,
								firstName: result.firstName,
								lastName: result.lastName,
								userImg: result.userImg,
								email: result.email,
								countryCode: result.countryCode,
								mobile: result.mobile,
								userType: result.userType,
								permissions: result.permissions,
								permissionTypes: result.permissionTypes,
								status: result.status,
								sessionToken: result.sessionToken,
								companyUserId: result.companyUserId,
								uniqueId: result.uniqueId,
								loginAs: result.loginAs,
								fToken: result.fToken,
								sId: result.sId,
							},
							secretToken,
							{ expiresIn: "1h" }
						);

					} else if (result.status == 2) {
						var webtoken = jwt.sign(
							{
								userId: result._id,
								firstName: result.firstName,
								lastName: result.lastName,
								userImg: result.userImg,
								email: result.email,
								countryCode: result.countryCode,
								mobile: result.mobile,
								userType: result.userType,
								permissions: result.permissions,
								permissionTypes: result.permissionTypes,
								status: result.status,
								sessionToken: result.sessionToken,
								companyUserId: result.companyUserId,
								uniqueId: result.uniqueId,
								loginAs: result.loginAs,
								gToken: result.gToken,
								sId: result.sId,
							},
							secretToken,
							{ expiresIn: "1h" }
						);

					} else if (result.status == 3) {
						var webtoken = jwt.sign(
							{
								userId: result._id,
								firstName: result.firstName,
								lastName: result.lastName,
								userImg: result.userImg,
								email: result.email,
								countryCode: result.countryCode,
								mobile: result.mobile,
								userType: result.userType,
								permissions: result.permissions,
								permissionTypes: result.permissionTypes,
								status: result.status,
								sessionToken: result.sessionToken,
								companyUserId: result.companyUserId,
								uniqueId: result.uniqueId,
								loginAs: result.loginAs,
								iToken: result.iToken,
								sId: result.sId,
							},
							secretToken,
							{ expiresIn: "1h" }
						);
					}

					var obj = { responseStatus: 1, responseMsgCode: "success", "responseData": webtoken }
					res.json(obj)

				} else {
					res.json({ responseStatus: 0, responseMsgCode: "Process failed" })
				}
			})
		} catch (error) {
			res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
		}
	},
	slogin: async (req, res) => {
		
		try {
			let secretToken = req.headers['x-access-token'];
			let flag = false;
			sloginParams.forEach(function (element, key) {
				if (req.body[element] == '' || req.body[element] == undefined) {
					flag = true;
				}
			})
			
			if (flag) {
				res.status(200).send({ "responseStatus": 0, "responseMsgCode": "mandatoryField" });
			}

			socialuserService.slogin(req.body).then(async result => {
				
				if (result) {

					console.log(result, "resultresultresult")

					if(result.status == 2 || result.status == "2"){


						let webtoken = await filterData(result, secretToken);
						
						var obj = { responseStatus: 1, responseMsgCode: "success", "responseData":{
							"webtoken": webtoken, "status": 2
						}}
						res.json(obj)


					} else if(result.status == 1 || result.status == "1"){

							let webtoken = await filterData(result, secretToken);
							
							var obj = { responseStatus: 1, responseMsgCode: "success", "responseData":{
								"webtoken": webtoken, "status": 1
							}}
							res.json(obj)
					} else {

						res.json({responseStatus: 0, responseMsgCode: "Failure", "responseData":{}});
					}

					

				} else {
					res.json({ responseStatus: 0, responseMsgCode: "Process failed" })
				}
			})
		} catch (error) {
			res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
		}
	},
}