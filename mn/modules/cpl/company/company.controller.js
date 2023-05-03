const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
const companyService = require("./company.service");
var validateAddCompanyInput = require('../../../validation/companyprofile');
var validateAddFactoryInput = require('../../../validation/factoryprofile');


module.exports = {
    listAllUsersInfo: (req, res) => {
        try {
            if (req.body.userType == '' || req.body.userType == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "userType field is required", "responseData": {} })
            }           
            let userType = req.body.userType;
            companyService.listAllUsersInfo(userType).then(result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else if(result.status == 2) {
                    res.json({ responseStatus: 0, responseMsgCode: "success.", "responseData": [] })
                }else{
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })   
                }
            })
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    deleteRegisterInfo: (req, res) => {
        try {

            if (req.body.userId == '' || req.body.userId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "UserId field is required", "responseData": {} })
            }
            if (req.body.userType == '' || req.body.userType == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "userType field is required", "responseData": {} })
            }
            if (req.body.registerId == '' || req.body.registerId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "register Id field is required", "responseData": {} })
            }

            companyService.deleteRegisterInfo(req.body).then(result => {
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
    listRegisterInfo: (req, res) => {
        try {

            if (req.body.userId == '' || req.body.userId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "UserId field is required", "responseData": {} })
            }
            if (req.body.userType == '' || req.body.userType == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "userType field is required", "responseData": {} })
            }
            let userId = req.body.userId;
            let userType = req.body.userType;

            companyService.listRegisterInfo(userId,userType).then(result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else if(result.status == 2) {
                    res.json({ responseStatus: 0, responseMsgCode: "success.", "responseData": [] })
                }else{
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })   
                }
            })
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    editRegisterInfo: (req, res) => {
        try {

            var phoneNum = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/; 
            var phone = Number(req.body.contactNo); 
            var mobileCheck = phoneNum.test(phone);
           
            if (req.body.userId == '' || req.body.userId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "UserId field is required", "responseData": {} })
            }
            if (req.body.userType == '' || req.body.userType == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "userType field is required", "responseData": {} })
            }
            if (req.body.companyName == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "companyName field is required", "responseData": {} })
            }
            if (req.body.address == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "address field is required", "responseData": {} })
            }
            if (req.body.country == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "country field is required", "responseData": {} })
            }
            if (req.body.pincode == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "pincode field is required", "responseData": {} })
            }
            if (req.body.addressType == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "addressType is required", "responseData": {} })
            }
            if (mobileCheck == false) {
                return res.json({ responseStatus: 0, responseMsgCode: "Please enter valid mobile no.", "responseData": {} })
            }

            let companyId = req.body.companyId;
            let userId = req.body.userId;
            delete req.body.userId;
            delete req.body.companyId;

            companyService.editRegisterInfo(companyId, userId, req.body).then(result => {
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
    addRegisterInfo: (req, res) => {
        try {  
            
            var phoneNum = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/; 
            var phone = Number(req.body.registerInfo[0].contactNo); 
            var mobileCheck = phoneNum.test(phone);
            
			if (req.body.userId == '' || req.body.userId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "UserId field is required", "responseData": {} })
            }
            if (req.body.userType == '' || req.body.userType == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "userType field is required", "responseData": {} })
            }
            if (req.body.registerInfo[0].companyName == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "companyName field is required", "responseData": {} })
            }
            if (req.body.registerInfo[0].address == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "address field is required", "responseData": {} })
            }
            if (req.body.registerInfo[0].country == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "country field is required", "responseData": {} })
            }
            if (req.body.registerInfo[0].pincode == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "pincode field is required", "responseData": {} })
            }
            if (mobileCheck == false) {
                return res.json({ responseStatus: 0, responseMsgCode: "Please enter valid mobile no.", "responseData": {} })
            }            
            if (req.body.registerInfo[0].addressType == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "addressType is required", "responseData": {} })
            }
            let userId = req.body.userId;
            delete req.body.userId;
            let userType = req.body.userType;
            
            delete req.body.userType;

            // console.log(req.body.registerInfo); 

            companyService.addRegisterInfo(userId, userType, req.body.registerInfo).then(result => {
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
    addfactoryinfo: (req, res) => {
        try {

            var phoneNum = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/; 
            var phone = Number(req.body.contactNo); 
            var mobileCheck = phoneNum.test(phone);

            if (req.body.userId == '' || req.body.userId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "UserId field is required", "responseData": {} })
            }
            if (req.body.userType == '' || req.body.userType == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "userType field is required", "responseData": {} })
            }
            if (req.body.factoryName == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "factoryName field is required", "responseData": {} })
            }
            if (req.body.address == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "address field is required", "responseData": {} })
            }
            if (req.body.country == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "country field is required", "responseData": {} })
            }
            if (req.body.pincode == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "pincode field is required", "responseData": {} })
            }
            if (mobileCheck == false) {
                return res.json({ responseStatus: 0, responseMsgCode: "Please enter valid mobile no.", "responseData": {} })
            } 

            let userId = req.body.userId;
            delete req.body.userId;

            let userType = req.body.userType;
            delete req.body.userType;

            companyService.addfactoryinfo(userId, userType, req.body).then(result => {
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
    deleteFactoryInfo: (req, res) => {
        try {
            if (req.body.userId == '' || req.body.userId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "UserId field is required", "responseData": {} })
            }
            if (req.body.userType == '' || req.body.userType == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "userType field is required", "responseData": {} })
            }
            if (req.body.factoryId == '' || req.body.factoryId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "factoryId field is required", "responseData": {} })
            }

            companyService.deleteFactoryInfo(req.body).then(result => {
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
    editFactoryInfo: (req, res) => {
        try {
			
			if (req.body.userId == '' || req.body.userId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "UserId field is required", "responseData": {} })
            }
            if (req.body.userType == '' || req.body.userType == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "userType field is required", "responseData": {} })
            }
            if (req.body.factoryName == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "factoryName field is required", "responseData": {} })
            }
            if (req.body.address == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "address field is required", "responseData": {} })
            }
            if (req.body.country == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "country field is required", "responseData": {} })
            }
            if (req.body.pincode == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "pincode field is required", "responseData": {} })
            }			
            companyService.editFactoryInfo(req.body).then(result => {
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
    legalinfo: (req, res) => {
        try {
            if (req.body.userId == '' || req.body.userId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "UserId field is required", "responseData": {} })
            }
            if (req.body.userType == '' || req.body.userType == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "userType field is required", "responseData": {} })
            }
            if (req.body.cinNo == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "cinNo field is required", "responseData": {} })
            }
            if (req.body.gstIn == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "gstIn field is required", "responseData": {} })
            }
            if (req.body.panNo == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "panNo field is required", "responseData": {} })
            }
            if (req.body.tanNo == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "tanNo field is required", "responseData": {} })
            }
            let userId = req.body.userId;
            delete req.body.userId;


            companyService.legalDetailsinfo(userId, req.body).then(result => {
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
    editLegalinfo: (req, res) => {
        try {
            if (req.body.userId == '' || req.body.userId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "UserId field is required", "responseData": {} })
            }
            if (req.body.userType == '' || req.body.userType == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "userType field is required", "responseData": {} })
            }
            if (req.body.cinNo == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "cinNo field is required", "responseData": {} })
            }
            if (req.body.gstIn == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "gstIn field is required", "responseData": {} })
            }
            if (req.body.panNo == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "panNo field is required", "responseData": {} })
            }
            if (req.body.tanNo == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "tanNo field is required", "responseData": {} })
            }

            let userId = req.body.userId;
            delete req.body.userId;

            companyService.editLegalinfo(userId, req.body).then(result => {
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
    addbankdetails: (req, res) => {
        try {
            if (req.body.userId == '' || req.body.userId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "UserId field is required", "responseData": {} })
            }
            if (req.body.userType == '' || req.body.userType == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "userType field is required", "responseData": {} })
            }
            if (req.body.bankName == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "Bank name field is required", "responseData": {} })
            }
            // if (req.body.accountNo == '') {
                // return res.json({ responseStatus: 0, responseMsgCode: "Account number field is required", "responseData": {} })
            // }
            // if (req.body.ifscCode == '') {
                // return res.json({ responseStatus: 0, responseMsgCode: "ifscCode field is required", "responseData": {} })
            // }
            // if (req.body.typeOfAccount == '') {
                // return res.json({ responseStatus: 0, responseMsgCode: "Account type field is required", "responseData": {} })
            // }

            let userId = req.body.userId;
            delete req.body.userId;
            let userType = req.body.userType;
            delete req.body.userType;
            companyService.bankDetailsinfo(userId, userType, req.body).then(result => {
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
    deleteBankInfo: (req, res) => {
        try {
            if (req.body.userId == '' || req.body.userId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "UserId field is required", "responseData": {} })
            }
            if (req.body.userType == '' || req.body.userType == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "userType field is required", "responseData": {} })
            }
            if (req.body.bankId == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "bankId field is required", "responseData": {} })
            }

            companyService.deleteBankInfo(req.body).then(result => {
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
    editBankInfo: (req, res) => {
        try {
            if (req.body.userId == '' || req.body.userId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "UserId field is required", "responseData": {} })
            }
            if (req.body.userType == '' || req.body.userType == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "userType field is required", "responseData": {} })
            }
            if (req.body.bankName == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "Bank name field is required", "responseData": {} })
            }
            // if (req.body.accountNo == '') {
                // return res.json({ responseStatus: 0, responseMsgCode: "Account number field is required", "responseData": {} })
            // }
            // if (req.body.ifscCode == '') {
                // return res.json({ responseStatus: 0, responseMsgCode: "ifscCode field is required", "responseData": {} })
            // }
            // if (req.body.typeOfAccount == '') {
                // return res.json({ responseStatus: 0, responseMsgCode: "Account type field is required", "responseData": {} })
            // }
            //console.log(req.body); return;
            let userId = req.body.userId;
            let bankId = req.body.bankId;
            delete req.body.bankId;
            delete req.body.userId;

            companyService.editBankInfo(userId, bankId, req.body).then(result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            })
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    }


}
