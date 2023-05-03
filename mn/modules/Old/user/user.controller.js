const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NodeCache = require("node-cache");
var bodyParser = require('body-parser');
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
const userService = require("./user.service");
const isEmpty = require('is-empty');

module.exports = {
    allcontracterlist: (req, res) => {
        try {
            userService.allcontracterlist().then(result => {               
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            })
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    assignCustomerByUser:(req, res) => {
        try {   
            
            if (req.body.email == '' || req.body.email == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "email field is required", "responseData": {} })
            }
            if (req.body.userType == '' || req.body.userType == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "userType field is required", "responseData": {} })
            }
            if (req.body.ipfsHash == '' || req.body.ipfsHash == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "ipfsHash field is required", "responseData": {} })
            }
            if (req.body.verifyByUserId == '' || req.body.verifyByUserId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "verifyByUserId field is required", "responseData": {} })
            }
            userService.assignCustomerByUser(req.body).then(result => {               
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            })
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    customerListByUser:(req, res) => {
        try {
            if (req.body.userId == '' || req.body.userId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "userId field is required", "responseData": {} })
            }
            userService.customerListByUser(req.body.userId).then(result => {               
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            })
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    userListByCompanyId: (req, res) => {
        try {
            if(req.body.userId=='' || req.body.userId == undefined){
                return res.json({ responseStatus: 0, responseMsgCode:"UserId field is required","responseData":{}})
               }
               if(req.body.userType=='' || req.body.userType == undefined){
                return res.json({ responseStatus: 0, responseMsgCode:"userType field is required","responseData":{}})
               }

            let userId = req.body.userId;            
            userService.userListByCompanyId(userId,req.body.userType).then(result => {               
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            })
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    addUserByCompany:async(req, res) => {
        try {             
            const validation = await Promise.all([userService.findUserEmailId(req.body.email), userService.findUserName(req.body.userName)]);            
			if((validation[0]!= null)){
                if ((validation[0].status ==1) || (validation[0].userStatusDelete ==0)) {                    
                    res.json({ responseStatus: 0, responseMsgCode: "Email Id already exists", "responseData":{}})
                } else {                   
                    let _id = validation[0]._id;
                    req.body.hash = bcrypt.hashSync(req.body.password, 10);
                    delete req.body.password;
                    let token = jwt.sign({ email: req.body.email }, "-medGrids$@agiosolutioncompanyApp")
                    req.body.sessionToken = token;
                    req.body.status = 1;
                    req.body.memberRegisterStatus = 0;
                    req.body.userStatusDelete = 0;
                    req.body.uniqueId = Math.random().toString(36).substr(2, 12);
                    await userService.userExitUpdate(_id, req.body).then(result => {
                        if ((result.status == 1) || (result.status == '1')) {
                            res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                        } else {
                            res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                        }
                    })
                } 
				
			} else if((validation[1]!= null)){					
				res.json({ responseStatus: 0, responseMsgCode: "User Name already exists", "responseData":{}})
			}
            req.body.hash = bcrypt.hashSync(req.body.password, 10);
            delete req.body.password;
            let token = jwt.sign({ email: req.body.email }, "-medGrids$@agiosolutioncompanyApp")
            req.body.sessionToken = token;
            req.body.status = 1;            
            req.body.memberRegisterStatus = 0;
            req.body.userStatusDelete = 0;
            req.body.uniqueId = Math.random().toString(36).substr(2, 12);         

            userService.addUserCompany(req.body).then(result => {               
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            })
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    edituserByCompany:(req, res) => {
        try { 
            
            if(req.body.password !==''){
                req.body.hash = bcrypt.hashSync(req.body.password, 10);                
            }else{               
                delete req.body.password;
            }
            if(req.body.userType !==''){
                req.body.userType = req.body.userType;               
            }else{               
                delete req.body.userType;
            }
            if(req.body.permissionTypes !==''){
                req.body.permissionTypes = req.body.permissionTypes;               
            }else{               
                delete req.body.permissionTypes;
            }
            let userId = req.body.userId;
            delete req.body.userId;        
            delete req.body.companyUserId;        
            userService.edituserByCompany(userId,req.body).then(result => {               
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            })
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    }, 
    userModifyPermission: (req, res) => {
        try {
            userService.userModifyPermission(req.body).then(result => {               
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            })
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    listpermissionModule: (req, res) => {
        try {         
            userService.listpermissionModule().then(result => {               
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            })
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    userListPermission: (req, res) => {
        try { 
            if(req.body.userId=='' || req.body.userId == undefined){
                return res.json({ responseStatus: 0, responseMsgCode:"UserId field is required","responseData":{}})
               }
               if(req.body.userType=='' || req.body.userType == undefined){
                return res.json({ responseStatus: 0, responseMsgCode:"userType field is required","responseData":{}})
               }
               
            let userId = req.body.userId; 
            userService.userListPermission(userId,req.body.userType).then(result => {               
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            })
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    deleteuserByCompany: (req, res) => {
        try {
       if(req.body.userId==''){
        return res.json({ responseStatus: 0, responseMsgCode:"UserId field is required","responseData":{}})
       } 
       let userId = req.body.userId;
       
       userService.deleteuserByCompany(userId).then(result => {
                if (result.status ==1) {                   
                        res.json({ responseStatus: 1, responseMsgCode: "success", "responseData":result.data});
                } else {                   
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData":result.data})
                }
            })
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    userProfileUpdate: (req, res) => {
        try { 
            if (req.body.userId == '' || req.body.userId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "UserId field is required", "responseData": {} })
            }            
           let userId = req.body.userId;
           req.body.mobile = parseInt(req.body.mobile);
           delete req.body.userId;          
            userService.userProfileUpdate(userId,req.body).then(result => {               
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            })
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },  
    userProfileView: (req, res) => {
        try {   
            if (req.body.userId == '' || req.body.userId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "UserId field is required", "responseData": {} })
            }      
            userService.userProfileView(req.body.userId).then(result => {               
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            })
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    userAddAdress: (req, res) => {
        try { 
            if (req.body.userId == '' || req.body.userId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "UserId field is required", "responseData": {} })
            }            
            let userId = req.body.userId;
            delete req.body.userId;            
            userService.userAddAdress(userId, req.body).then(result => {               
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            })
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    userEditAddress: (req, res) => {
        try {            
            if (req.body.userId == '' || req.body.userId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "UserId field is required", "responseData": {} })
            }
            if (req.body.addressManageId == '' || req.body.addressManageId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "addressManageId field is required", "responseData": {} })
            } 
            let addressManageId = req.body.addressManageId;
            let userId = req.body.userId;
            delete req.body.userId;
            delete req.body.addressManageId;
            userService.userEditAddress(addressManageId, userId, req.body).then(result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            })
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    userDeleteAddress: (req, res) => {
        try {
            if (req.body.userId == '' || req.body.userId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "UserId field is required", "responseData": {} })
            }
            if (req.body.addressManageId == '' || req.body.addressManageId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "addressManageId field is required", "responseData": {} })
            }

            userService.userDeleteAddress(req.body).then(result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            })
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    addUserMember:async(req, res) => {
        try {             
            const validation = await Promise.all([userService.findUserEmailId(req.body.email)]);            
			if((validation[0]!= null)){
                if ((validation[0].status ==1) || (validation[0].userStatusDelete ==0)) {                    
                    res.json({ responseStatus: 0, responseMsgCode: "Email Id already exists", "responseData":{}})
                }
			} 
            req.body.hash = bcrypt.hashSync("123456", 10);            
            let token = jwt.sign({ email: req.body.email }, "-medGrids$@agiosolutioncompanyApp")
            req.body.sessionToken = token;
            req.body.status = 0;            
            req.body.memberRegisterStatus = 1;
            req.body.userStatusDelete = 0;
            req.body.uniqueId = Math.random().toString(36).substr(2, 12);  
            userService.addUserMember(req.body).then(result => {               
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            })
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    memberEditByUser: (req, res) => {
        try {           
             
            if (req.body.memberId == '' || req.body.memberId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "addressManageId field is required", "responseData": {} })
            }
            let memberId = req.body.memberId;
            delete req.body.memberId;
            userService.memberEditByUser(memberId, req.body).then(result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            })
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    memberListByUser: (req, res) => {
        try {
            if (req.body.userId == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "UserId field is required", "responseData": {} })
            }
            let userId = req.body.userId;
            userService.memberListByUser(userId).then(result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            })
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    memberDeleteUser: (req, res) => {
        try {
            if (req.body.memberId == '' || req.body.memberId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "UserId field is required", "responseData": {} })
            }        

            userService.memberDeleteUser(req.body.memberId).then(result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            })
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    contractManufacturer:async(req, res) => {
        try {   
            
            if (req.body.userId == '' || req.body.userId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "UserId field is required", "responseData": {} })
            }
            if (req.body.firstName == '' || req.body.firstName == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "firstName field is required", "responseData": {} })
            }
            if (req.body.lastName == '' || req.body.lastName == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "lastName field is required", "responseData": {} })
            }
            if (req.body.email == '' || req.body.email == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "email field is required", "responseData": {} })
            }
            if (req.body.countryCode == '' || req.body.countryCode == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "countryCode field is required", "responseData": {} })
            }
            if (req.body.mobileNo == '' || req.body.mobileNo == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "mobileNo field is required", "responseData": {} })
            }
            if (req.body.password == '' || req.body.password == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "password field is required", "responseData": {} })
            }
            if (req.body.loginAs == '' || req.body.loginAs == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "loginAs field is required", "responseData": {} })
            }
            
            req.body.hash = bcrypt.hashSync(req.body.password, 10);            
            let token = jwt.sign({ email: req.body.email }, "-medGrids$@agiosolutioncompanyApp")
            req.body.sessionToken = token;
            req.body.status = 1;            
            req.body.memberRegisterStatus = 0;
            req.body.userStatusDelete = 0;       
            req.body.uniqueId = Math.random().toString(36).substr(2, 12); 
            let userId = req.body.userId;
            delete req.body.userId;
            delete req.body.password;
            //console.log(req.body); return;
            userService.contractManufacturer(userId,req.body).then(result => {               
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            })
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    contracterListByUser: (req, res) => {
        try {  
            
            if(req.body.userId==''){
                res.json({ responseStatus: 0, responseMsgCode:"UserId field is required","responseData":{}})
               }            
               
            let userId = req.body.userId; 
            userService.contracterListByUser(userId).then(result => {               
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            })
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
 
    profilePointUpdate: (req, res) => {

        try {
            if (req.body.userId == undefined || req.body.userId == '') {
                return res.status(200).send({ "responseStatus": 0, "responseMsgCode": "mandatoryField" });
            }

            userService.profilePointUpdate(req.body).then(result => {
                if (result.status == 1) {
                    var obj = { responseStatus: 1, responseMsgCode: "success", "responseData": { "profilePoint": result.data.profilePoint, "profileStepsCompleted": result.data.profileStepsCompleted} }
                    res.json(obj)
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result })
                }
            })


        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }

    }

    
}
