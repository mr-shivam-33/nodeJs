// let medgridsMsg = require('../../../message/medgrids');
const { async } = require("q");
var userPackageService = require("./packagebyadmin.service");
const requestIp = require('request-ip');

module.exports = { 
    
    editsubscription: async (req, res) => {
        try { 
            if (req.body.subscriptionId == '' || req.body.subscriptionId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "subscriptionId field is required", "responseData": {} })
            }  
            if (req.body.subName == '' || req.body.subName == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "subName field is required", "responseData": {} })
            }
            userPackageService.editsubscription(req.body).then(result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "sucess", "responseData": result.data });
                } else if (result.status == 2) {
                    res.json({ responseStatus: 2, responseMsgCode: "Not verified!", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            });

        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    listsubscription: (req, res) => {
        try { 
            userPackageService.listsubscription().then(result => {
                if (result.status == 1) {
                    //responseMsgCode: "sucess",
                    //responseMsgCode: medgridsMsg.user_login_success,
                   res.json({ responseStatus: 1, responseMsgCode: "sucess", "responseData": result.data });
                } else if (result.status == 2) {
                    res.json({ responseStatus: 2, responseMsgCode: "Not verified!", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            });

        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },    
    addPaymentType: async (req, res) => {
        try {
            if (req.body.paymentType == '' || req.body.paymentType == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "paymentType field is required", "responseData": {} })
            }
            if (req.body.overDueDays == '' || req.body.overDueDays == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "overDueDays field is required", "responseData": {} })
            }
            if (req.body.dueDate == '' || req.body.dueDate == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "dueDate field is required", "responseData": {} })
            }
            var clientIp = requestIp.getClientIp(req);
             var history = {
                controller: "payment",
                userAction: "payment type Add",
                previousData: "",
                currentData: "",
                userId: req.body.adminUserId,
                ipAddress: clientIp,
            }
            delete req.body.adminUserId;  
            req.body.status = 1;          
            userPackageService.addPaymentType(req.body, history).then(result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "sucess", "responseData": result.data });
                } else if (result.status == 2) {
                    res.json({ responseStatus: 2, responseMsgCode: "Not verified!", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            });

        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    paymentTypeList: (req, res) => {
        try {           
            userPackageService.paymentTypeList(req.body).then(result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "sucess", "responseData": result.data });
                } else if (result.status == 2) {
                    res.json({ responseStatus: 2, responseMsgCode: "Not verified!", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            });

        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
	deletePaymentType: (req, res) => {
        try {
            if (req.body.paymenttypeId == '' || req.body.paymenttypeId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "paymenttypeId field is required", "responseData": {} })
            }
            if (req.body.adminUserId == '' || req.body.adminUserId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "adminUserId field is required", "responseData": {} })
            }

             var clientIp = requestIp.getClientIp(req);
             var history = {
                controller: "payment type",
                userAction: "payment type delete",
                previousData: "",
                currentData: "",
                userId: req.body.adminUserId,
                ipAddress: clientIp,
            }
           delete req.body.adminUserId;
            userPackageService.deletePaymentType(req.body, history).then(result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "sucess", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            });

        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    smartContractDeploy: (req, res) => {
        try {
            if (req.body.accountAddress  == '' || req.body.accountAddress == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "accountAddress field is required", "responseData": {} })
            }
            userPackageService.smartContractDeploy(req.body).then(result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "sucess", "responseData": result.data });
                } else if (result.status == 2) {
                    res.json({ responseStatus: 2, responseMsgCode: "Not verified!", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            });

        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    smartDeploye: (req, res) => {
        try {
            if (req.body.smartId  == '' || req.body.smartId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "smartId field is required", "responseData": {} })
            }            
            userPackageService.smartDeploye(req.body).then(result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "sucess", "responseData": result.data });
                } else if (result.status == 2) {
                    res.json({ responseStatus: 2, responseMsgCode: "Not verified!", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            });

        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    smartStatus: (req, res) => {
        try {
            userPackageService.smartStatus(req.body).then(result => {
                
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "sucess", "responseData": result.data });
                } else if (result.status == 2) {
                    res.json({ responseStatus: 2, responseMsgCode: "Not verified!", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            });

        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    deletePackegesListByUserId: (req, res) => {
        try {
            if (req.body.packageId == '' || req.body.packageId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "packageId field is required", "responseData": {} })
            }
            if (req.body.adminUserId == '' || req.body.adminUserId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "adminUserId field is required", "responseData": {} })
            }

             var clientIp = requestIp.getClientIp(req);
             var history = {
                controller: "Package",
                userAction: "Package Add",
                previousData: "",
                currentData: "",
                userId: req.body.adminUserId,
                ipAddress: clientIp,
            }
           delete req.body.adminUserId;
            userPackageService.deletePackegesListByUserId(req.body, history).then(result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "sucess", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            });

        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    packegesListByUserId: (req, res) => {
        try {
            if (req.body.userId == '' || req.body.userId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "userId field is required", "responseData": {} })
            }
            userPackageService.packegesListByUserId(req.body).then(result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "sucess", "responseData": result.data });
                } else if (result.status == 2) {
                    res.json({ responseStatus: 2, responseMsgCode: "Not verified!", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            });

        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    addPackegesByUserId: async (req, res) => {
        try {
            if (req.body.packageName == '' || req.body.packageName == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "name field is required", "responseData": {} })
            }           

            // var clientIp = requestIp.getClientIp(req);
            //  var history = {
            //     controller: "Package",
            //     userAction: "Package Add",
            //     previousData: "",
            //     currentData: "",
            //     userId: req.body.adminUserId,
            //     ipAddress: clientIp,
            // }
            // delete req.body.adminUserId;           
            userPackageService.addPackegesByUserId(req.body).then(result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "sucess", "responseData": result.data });
                } else if (result.status == 2) {
                    res.json({ responseStatus: 2, responseMsgCode: "Not verified!", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            });

        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },

    unUsedSmartContractList: (req, res) => {
        try {
            if (req.body.userId == '' || req.body.userId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "userId field is required", "responseData": {} })
            }           
            userPackageService.unUsedSmartContractList(req.body).then(result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "sucess", "responseData": result.data });
                } else if (result.status == 2) {
                    res.json({ responseStatus: 2, responseMsgCode: "Not verified!", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            });

        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    companyProfileStatus: (req, res) => {
        try { 
            if (req.body.userId == '' || req.body.userId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "userId field is required", "responseData": {} })
            }
            if (req.body.userType == '' || req.body.userType == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "userType field is required", "responseData": {} })
            }
            userPackageService.companyProfileStatus(req.body).then(result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "verified!", "responseData": {} });
                } else if (result.status == 2) {
                    res.json({ responseStatus: 2, responseMsgCode: "Not verified!", "responseData": {} });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": {} })
                }
            });

        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    smartUserListByProduct: (req, res) => {
        try { 
           
            if (req.body.adminUserId == '' || req.body.adminUserId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "adminUserId field is required", "responseData": {} })
            }
            if (req.body.userId == '' || req.body.userId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "userId field is required", "responseData": {} })
            }
            
            var clientIp = requestIp.getClientIp(req);

          //  console.log(req.body); return;
            
            var history = {
               controller: "smart user",
               userAction: "list by product",
               previousData: "",
               currentData: "",
               userId: req.body.adminUserId,
               ipAddress: clientIp,
           }
          
            // delete req.body.userId;
            delete req.body.adminUserId;
            userPackageService.smartUserListByProduct(req.body, history).then(result => {
                if (result.status == 1) {

                    
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            });

        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    smartAssignDelete: (req, res) => {
        try {
            if (req.body.adminUserId == '' || req.body.adminUserId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "adminUserId field is required", "responseData": {} })
            }    
            if (req.body.assignId == '' || req.body.assignId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "assignId field is required", "responseData": {} })
            }       

             var clientIp = requestIp.getClientIp(req);
             var history = {
                controller: "Package",
                userAction: "Package Add",
                previousData: "",
                currentData: "",
                userId: req.body.adminUserId,
                ipAddress: clientIp,
            }
            delete req.body.adminUserId;
           
            userPackageService.smartAssignDelete(req.body, history).then(result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            });

        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    smartAssignEdit: (req, res) => {
        try { 
            if (req.body.assignId == '' || req.body.assignId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "assignId field is required", "responseData": {} })
            }  
            if (req.body.userId == '' || req.body.userId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "userId field is required", "responseData": {} })
            } 
            if (req.body.assignId == '' || req.body.assignId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "assignId field is required", "responseData": {} })
            }        
            userPackageService.smartAssignEdit(req.body).then(result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            });

        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    smartAssignByadmin: (req, res) => {
        try { 
            if (req.body.adminUserId == '' || req.body.adminUserId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "adminUserId field is required", "responseData": {} })
            }
            if (req.body.userId == '' || req.body.userId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "userId field is required", "responseData": {} })
            }
            if (req.body.productId == '' || req.body.productId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "productId field is required", "responseData": {} })
            }
            if (req.body.assignId == '' || req.body.assignId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "assignId field is required", "responseData": {} })
            }       
            var clientIp = requestIp.getClientIp(req);
            var history = {
               controller: "smart assign",
               userAction: "smart assign by admin",
               previousData: "",
               currentData: "",
               userId: req.body.adminUserId,
               ipAddress: clientIp,
           }
           delete req.body.adminUserId;
            // delete req.body.userId; 
            userPackageService.smartAssignByadmin(req.body, history).then(result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else  if (result.status == 2) {
                    res.json({ responseStatus: 2, responseMsgCode: "exists", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            });

        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    smartAssignList: (req, res) => {
        try { 
            if (req.body.userId == '' || req.body.userId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "userId field is required", "responseData": {} })
            }          
            userPackageService.smartAssignList(req.body).then(result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            });

        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    userPackagelist: (req, res) => {
        try { 
            if (req.body.userId == '' || req.body.userId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "userId field is required", "responseData": {} })
            }          
            userPackageService.userPackagelist(req.body.userId).then(result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            });

        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    addPackage: (req, res) => {
        try {
           
            if (req.body.userId == '' || req.body.userId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "userId field is required", "responseData": {} })
            }
            if (req.body.priceUSDType == '' || req.body.priceUSDType == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "priceUSDType field is required", "responseData": {} })
            }
            if (req.body.priceUSD == '' || req.body.priceUSD == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "priceUSD field is required", "responseData": {} })
            }
            if (req.body.priceINR == '' || req.body.priceINR == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "priceINR field is required", "responseData": {} })
            }
            if (req.body.packageContent == '' || req.body.packageContent == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "packageContent field is required", "responseData": {} })
            } 
            if (req.body.name == '' || req.body.name == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "name field is required", "responseData": {} })
            }           
            // if (req.file == '' || req.file == undefined) {
            //     return res.json({ responseStatus: 0, responseMsgCode: "Package Image field is required", "responseData": {} })
            // } 
           
            var clientIp = requestIp.getClientIp(req);
            
            var history = {
                controller: "Package",
                userAction: "Package Add",
                previousData: "",
                currentData: "",
                userId: req.body.userId,
                ipAddress: clientIp,
            }
        
           
            userPackageService.addPackage(req.body,req.file, history).then(result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            });

        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    editPackage: (req, res) => {
        try {  
            if (req.body.packageContent == '' || req.body.packageContent == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "packageContent field is required", "responseData": {} })
            } 
            if (req.body.packageId == '' || req.body.packageId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "packageId field is required", "responseData": {} })
            } 
            if (req.body.name == '' || req.body.name == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "name field is required", "responseData": {} })
            }       
            userPackageService.editPackage(req.body,req.file).then(result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            });

        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    smartlist: (req, res) => {
        try { 
            if (req.body.userId == '' || req.body.userId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "userId field is required", "responseData": {} })
            } 
            userPackageService.smartlist(req.body).then(result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            });

        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    smartadd: (req, res) => {
        try {
           if (req.body.blockChainName == '' || req.body.blockChainName == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "blockChainName field is required", "responseData": {} })
            }
            if (req.body.accountAddress == '' || req.body.accountAddress == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "accountAddress field is required", "responseData": {} })
            }
          
            if (req.body.quickNodeURL == '' || req.body.quickNodeURL == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "quickNodeURL field is required", "responseData": {} })
            }           
            userPackageService.smartadd(req.body).then(result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            });

        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    smartedit: (req, res) => {
        try {
            if (req.body.smartId == '' || req.body.smartId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "smartId field is required", "responseData": {} })
            }
            if (req.body.blockChainName == '' || req.body.blockChainName == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "blockChainName field is required", "responseData": {} })
            }
            if (req.body.accountAddress == '' || req.body.accountAddress == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "accountAddress field is required", "responseData": {} })
            }
            if (req.body.contractAddress == '' || req.body.contractAddress == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "contractAddress field is required", "responseData": {} })
            }
            if (req.body.privateKey == '' || req.body.privateKey == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "privateKey field is required", "responseData": {} })
            } 
            if (req.body.quickNodeURL == '' || req.body.quickNodeURL == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "quickNodeURL field is required", "responseData": {} })
            }        
                           
            userPackageService.smartedit(req.body).then(result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            });

        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    smartdelete: (req, res) => {
        try {            
            if (req.body.smartId == '' || req.body.smartId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "smartId field is required", "responseData": {} })
            }
            userPackageService.smartdelete(req.body).then(result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            });

        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    smartUseStatusChange: (req, res) => {
        try {            
            if (req.body.smartId == '' || req.body.smartId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "smartId field is required", "responseData": {} })
            }
            if (req.body.smartStatusValue == '' || req.body.smartStatusValue == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "smartStatusValue field is required", "responseData": {} })
            }
            userPackageService.smartdelete(req.body).then(result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            });

        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },

    smanager: (req, res) => {
       
        if (req.body.Name == '' || req.body.Name == undefined) {
            return res.json({ responseStatus: 0, responseMsgCode: "Name field is required", "responseData": {} })
        }
        if (req.body.SecretString == '' || req.body.SecretString == undefined) {
            return res.json({ responseStatus: 0, responseMsgCode: "SecretString field is required", "responseData": {} })
        }           
        userPackageService.smanager(req.body).then(result => {
            console.log(result)
            if(result){
                let ob = {"status":1, "data": result}
                res.status(200).send(ob);
            }
        })
    },

    gsvalue: (req, res) => {
        console.log(req.body)
         userPackageService.gsvalue(req.body).then(result => {
             console.log(result)
             if(result){
                 let ob = {"status":1, "data": result}
                 res.status(200).send(ob);
             }
         })
     },
    offerByProductId: async (req, res) => {
        try {
            if (req.body.offerName == '' || req.body.offerName == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "offerName field is required", "responseData": {} })
            }
            var clientIp = requestIp.getClientIp(req);
             var history = {
                controller: "offerName",
                userAction: "offer Name Add",
                previousData: "",
                currentData: "",
                userId: req.body.adminUserId,
                ipAddress: clientIp,
            }
            delete req.body.adminUserId;
            userPackageService.offerByProductId(req.body, history).then(result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "sucess", "responseData": result.data });
                } else if (result.status == 2) {
                    res.json({ responseStatus: 2, responseMsgCode: "Not verified!", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            });
    
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    offerListByProductId: (req, res) => {
        try {
            if (req.body.userId == '' || req.body.userId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "userId field is required", "responseData": {} })
            }
            if (req.body.adminUserId == '' || req.body.adminUserId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "adminUserId field is required", "responseData": {} })
            }
    
             var clientIp = requestIp.getClientIp(req);
             var history = {
                controller: "offer",
                userAction: "offer List",
                previousData: "",
                currentData: "",
                userId: req.body.adminUserId,
                ipAddress: clientIp,
            }
           delete req.body.adminUserId;
            userPackageService.offerListByProductId(req.body, history).then(result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "sucess", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            });
    
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    deleteOfferByProductId: (req, res) => {
        try {
            if (req.body.offerId == '' || req.body.offerId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "offerId field is required", "responseData": {} })
            }
            var clientIp = requestIp.getClientIp(req);
             var history = {
                controller: "offer",
                userAction: "offer Delete",
                previousData: "",
                currentData: "",
                userId: req.body.adminUserId,
                ipAddress: clientIp,
            }
           delete req.body.adminUserId;
            userPackageService.deleteOfferByProductId(req.body,history).then(result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "sucess", "responseData": result.data });
                } else if (result.status == 2) {
                    res.json({ responseStatus: 2, responseMsgCode: "Not verified!", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            });
    
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },

    smartDeployList: (req, res) => {
        try {
            if (req.body.userId  == '' || req.body.userId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "userId field is required", "responseData": {} })
            }            
            userPackageService.smartDeployList(req.body).then(result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "sucess", "responseData": result.data });
                } else if (result.status == 2) {
                    res.json({ responseStatus: 2, responseMsgCode: "Not verified!", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            });

        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },


}
