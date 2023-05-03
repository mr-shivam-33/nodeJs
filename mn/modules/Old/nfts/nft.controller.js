const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NodeCache = require( "node-cache" );
const myCache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );
const nftService = require("./nft.service");


// const userProfileParams = ['dob','genderSatatus'];
const assigndataParams = ['assignContainerByFactoryIds','productId', 'userId', 'fdalebelId'];
const viewContainerByFactoryParams = ['productId', 'userId', 'fdalebelId'];
const viewContainerFactoryByIdParams = ['userId'];
const getNftsReportAsPerUserIdParams = ['userId'];
const viewAssignDataByManufacturerIdParams = ['manufacturerId','userType'];
const viewAssignDataByWarehouseIdParams = ['factoryUserId','userType'];
const assigndataWarehouseParams = ['assignContainerByWarehouseFactoryIds','productId', 'userId', 'fdalebelId'];
const assignContainerToOthersParams = ['assignContainerToOthersIds','productId', 'userId', 'fdalebelId'];
const verifyHashParams = ['ipfsHash'];
const getIpfsDataAsPerTypeParams = ['ipfsHash','type'];
const saveNftsDataParams = ['ipfsHash','userId','fdaId','productId','userType','type'];
const verifyHashUserNftsDataParams = ['userId','userType','status'];
const assignNftsByUserIdParams = ['ipfsHash','verifyByUserId','assignEmailId','assignUserType'];
const hashBurnByUserIdParams = ['ipfsHash','nftBurnByUserId'];


const getNftsVerifyUserReportParams = ['boxType', 'fdaId', 'status'];
const changeReportParams = ['ipfsHash', 'status'];

module.exports = {


	changeReportStatus: async (req, res) => {
        try {
			
			// let flag = false;
			// if(req.body.status == 1 || req.body.status == "1"){
			// 	var checkMatch = getNftsVerifyUserReportParams
			// } else {
			// 	var checkMatch = changeReportParams
			// }		
			// checkMatch.forEach(function (element, key) {
			// 	if (req.body[element] == '' || req.body[element] == undefined) {
			// 		flag = true;
			// 	}
			// })
			
			// if (flag) {
			// 	res.status(200).send({ "responseStatus": 0, "responseMsgCode": "mandatoryField" });
			// }
			
			nftService.changeReportStatus(req.body).then(result => {				
				if (result.code != 11000) {
					var data = {}
					if (result.status == 1) {
						data.getData = result.data
						var obj = { responseStatus: 1, responseMsgCode: "success", "responseData":data}					
					} else {
						data.error = result.data
						var obj = { responseStatus: 0, responseMsgCode: "failure", "responseData":data}
					}
					res.json(obj)
                } else {					
					res.json({ responseStatus: 0, responseMsgCode: "Somthing Went Wrong!", "responseData":{}})                    
                }
            })
			
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },

	getNftsVerifyUserReport: async (req, res) => {
        try {
			
			let flag = false;
			if(req.body.status == 1 || req.body.status == "1"){
				var checkMatch = getNftsVerifyUserReportParams
			} else {
				var checkMatch = changeReportParams
			}		
			checkMatch.forEach(function (element, key) {
				if (req.body[element] == '' || req.body[element] == undefined) {
					flag = true;
				}
			})
			
			if (flag) {
				res.status(200).send({ "responseStatus": 0, "responseMsgCode": "mandatoryField" });
			}
			
			nftService.getNftsVerifyUserReport(req.body).then(result => {				
				if (result.code != 11000) {
					var data = {}
					if (result.status == 1) {
						data.getData = result.data
						var obj = { responseStatus: 1, responseMsgCode: "success", "responseData":data}					
					} else {
						data.error = result.data
						var obj = { responseStatus: 0, responseMsgCode: "failure", "responseData":data}
					}
					res.json(obj)
                } else {					
					res.json({ responseStatus: 0, responseMsgCode: "Somthing Went Wrong!", "responseData":{}})                    
                }
            })
			
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
	getLastOrderByUserId: async (req, res) => {
        try {
			
			let flag = false;		
			getNftsReportAsPerUserIdParams.forEach(function (element, key) {
				if (req.body[element] == '' || req.body[element] == undefined) {
					flag = true;
				}
			})
			
			if (flag) {
				res.status(200).send({ "responseStatus": 0, "responseMsgCode": "mandatoryField" });
			}
			
			nftService.getLastOrderByUserId(req.body).then(result => {				
				if (result.code != 11000) {
					var data = {}
					if (result.status == 1) {
						data.getData = result.data
						var obj = { responseStatus: 1, responseMsgCode: "success", "responseData":data}					
					} else {
						data.error = result.data
						var obj = { responseStatus: 0, responseMsgCode: "failure", "responseData":data}
					}
					res.json(obj)
                } else {					
					res.json({ responseStatus: 0, responseMsgCode: "Somthing Went Wrong!", "responseData":{}})                    
                }
            })
			
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
	
	getContainerDataAsPerUserType: async (req, res) => {
        try {
			
			let flag = false;		
			viewContainerFactoryByIdParams.forEach(function (element, key) {
				if (req.body[element] == '' || req.body[element] == undefined) {
					flag = true;
				}
			})
			
			if (flag) {
				res.status(200).send({ "responseStatus": 0, "responseMsgCode": "mandatoryField" });
			}
			
			nftService.getContainerDataAsPerUserType(req.body).then(result => {				
				if (result.code != 11000) {
					var data = {}
					if (result.status == 1) {
						data.getData = result.data
						var obj = { responseStatus: 1, responseMsgCode: "success", "responseData":data}					
					} else {
						data.error = result.data
						var obj = { responseStatus: 0, responseMsgCode: "failure", "responseData":data}
					}
					res.json(obj)
                } else {					
					res.json({ responseStatus: 0, responseMsgCode: "Somthing Went Wrong!", "responseData":{}})                    
                }
            })
			
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },	
	getIpfsDataAsPerType: async (req, res) => {
        try {
			
			let flag = false;		
			getIpfsDataAsPerTypeParams.forEach(function (element, key) {
				if (req.body[element] == '' || req.body[element] == undefined) {
					flag = true;
				}
			})
			
			if (flag) {
				res.status(200).send({ "responseStatus": 0, "responseMsgCode": "mandatoryField" });
			}
			
			nftService.getIpfsDataAsPerType(req.body).then(result => {				
				if (result.code != 11000) {
					var data = {}
					if (result.status == 1) {
						data.getData = result.data
						var obj = { responseStatus: 1, responseMsgCode: "success", "responseData":data}					
					} else {
						data.error = result.data
						var obj = { responseStatus: 0, responseMsgCode: "failure", "responseData":data}
					}
					res.json(obj)
                } else {					
					res.json({ responseStatus: 0, responseMsgCode: "Somthing Went Wrong!", "responseData":{}})                    
                }
            })
			
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },	
	getCompanyIdIpfs: async (req, res) => {

		try {
			
			let flag = false;		
			viewContainerFactoryByIdParams.forEach(function (element, key) {
				if (req.body[element] == '' || req.body[element] == undefined) {
					flag = true;
				}
			})
			
			if (flag) {
				res.status(200).send({ "responseStatus": 0, "responseMsgCode": "mandatoryField" });
			}
			
			nftService.getCompanyIdIpfs(req.body).then(result => {				
				if (result.code != 11000) {
					var data = {}
					if (result.status == 1) {
						data.getData = result.data
						var obj = { responseStatus: 1, responseMsgCode: "success", "responseData":data}					
					} else {
						data.error = result.data
						var obj = { responseStatus: 0, responseMsgCode: "failure", "responseData":data}
					}
					res.json(obj)
                } else {					
					res.json({ responseStatus: 0, responseMsgCode: "Somthing Went Wrong!", "responseData":{}})                    
                }
            })
			
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
	getOrderByProductId: async (req, res) => {
        try {
			
			let flag = false;		
			getNftsReportAsPerUserIdParams.forEach(function (element, key) {
				if (req.body[element] == '' || req.body[element] == undefined) {
					flag = true;
				}
			})
			
			if (flag) {
				res.status(200).send({ "responseStatus": 0, "responseMsgCode": "mandatoryField" });
			}
			
			nftService.getOrderByProductId(req.body).then(result => {				
				if (result.code != 11000) {
					var data = {}
					if (result.status == 1) {
						data.getData = result.data
						var obj = { responseStatus: 1, responseMsgCode: "success", "responseData":data}					
					} else {
						data.error = result.data
						var obj = { responseStatus: 0, responseMsgCode: "failure", "responseData":data}
					}
					res.json(obj)
                } else {					
					res.json({ responseStatus: 0, responseMsgCode: "Somthing Went Wrong!", "responseData":{}})                    
                }
            })
			
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
	getNftsReportAsPerUserId: async (req, res) => {
        try {
			
			let flag = false;		
			getNftsReportAsPerUserIdParams.forEach(function (element, key) {
				if (req.body[element] == '' || req.body[element] == undefined) {
					flag = true;
				}
			})
			
			if (flag) {
				res.status(200).send({ "responseStatus": 0, "responseMsgCode": "mandatoryField" });
			}
			
			nftService.getNftsReportAsPerUserId(req.body).then(result => {				
				if (result.code != 11000) {
					var data = {}
					if (result.status == 1) {
						data.getData = result.data
						var obj = { responseStatus: 1, responseMsgCode: "success", "responseData":data}					
					} else {
						data.error = result.data
						var obj = { responseStatus: 0, responseMsgCode: "failure", "responseData":data}
					}
					res.json(obj)
                } else {					
					res.json({ responseStatus: 0, responseMsgCode: "Somthing Went Wrong!", "responseData":{}})                    
                }
            })
			
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
	saveNftsData: async (req, res) => {
        try {
			
			let flag = false;		
			saveNftsDataParams.forEach(function (element, key) {
				if (req.body[element] == '' || req.body[element] == undefined) {
					flag = true;
				}
			})
			
			if (flag) {
				res.status(200).send({ "responseStatus": 0, "responseMsgCode": "mandatoryField" });
			}
			
			nftService.saveNftsData(req.body).then(result => {
				
				if (result.code != 11000) {
					var data = {}
					if (result.status == 1) {
						data.getData = result.data
						var obj = { responseStatus: 1, responseMsgCode: "success", "responseData":data}					
					} else if (result.status == 2) {
						data.getData = result.data
						var obj = { responseStatus: 0, responseMsgCode: "IPFS Hash already exists!", "responseData":data}
					} else if (result.status == 3) {
						data.getData = result.data
						var obj = { responseStatus: 0, responseMsgCode: "This Item does not exists!", "responseData":data}
					} else if (result.status == 4) {
						data.getData = result.data
						var obj = { responseStatus: 0, responseMsgCode: "This Item does not exists!", "responseData":data}	
					} else {
						data.error = result.data
						var obj = { responseStatus: 0, responseMsgCode: "failure", "responseData":data}
					}
					res.json(obj)
                } else {					
					res.json({ responseStatus: 0, responseMsgCode: "Somthing Went Wrong!", "responseData":{}})                    
                }
            })
			
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
	verifyHashUserNftsData: async (req, res) => {
        try {
			
			let flag = false;		
			verifyHashUserNftsDataParams.forEach(function (element, key) {
				if (req.body[element] == '' || req.body[element] == undefined) {
					flag = true;
				}
			})
			
			if (flag) {
				res.status(200).send({ "responseStatus": 0, "responseMsgCode": "mandatoryField" });
			}
			
			nftService.verifyHashUserNftsData(req.body).then(result => {				
				if (result.code != 11000) {
					var data = {}
					if (result.status == 1) {
						data.getData = result.data
						var obj = { responseStatus: 1, responseMsgCode: "success", "responseData":data}					
					} else {
						data.error = result.data
						var obj = { responseStatus: 0, responseMsgCode: "failure", "responseData":data}
					}
					res.json(obj)
                } else {					
					res.json({ responseStatus: 0, responseMsgCode: "Somthing Went Wrong!", "responseData":{}})                    
                }
            })
			
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
	viewAssignDataByWarehouseAndDistributerId: async (req, res) => {
		try {
			
			let flag = false;
			viewAssignDataByWarehouseIdParams.forEach(function (element, key) {
                if (req.body[element] == '' || req.body[element] == undefined) {
                    flag = true;
                }
            })
            if (flag) {
                res.status(200).send({ "responseStatus": 0, "responseMsgCode": "mandatoryField" });
            }
			
			nftService.viewAssignDataByWarehouseAndDistributerId(req.body).then(result => {				
				if (result.code != 11000) {
					var data = {}
					if (result.status == 1) {
						data.fetchData = result.data					
						var obj = { responseStatus: 1, responseMsgCode: "success", "responseData":data}					
					} else {
						data.error = result.data
						var obj = { responseStatus: 0, responseMsgCode: "failure", "responseData":data}
					}					
					res.json(obj)					
                } else {					
					res.json({ responseStatus: 0, responseMsgCode: "Somthing Went Wrong!", "responseData":{}})                    
                }
            })
			
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
	},
	viewAssignDataByManufacturerId: async (req, res) => {
		try {
			
			let flag = false;
			viewAssignDataByManufacturerIdParams.forEach(function (element, key) {
                if (req.body[element] == '' || req.body[element] == undefined) {
                    flag = true;
                }
            })
            if (flag) {
                res.status(200).send({ "responseStatus": 0, "responseMsgCode": "mandatoryField" });
            }
			
			nftService.viewAssignDataByManufacturerId(req.body).then(result => {				
				if (result.code != 11000) {
					var data = {}
					if (result.status == 1) {
						data.fetchData = result.data					
						var obj = { responseStatus: 1, responseMsgCode: "success", "responseData":data}					
					} else {
						data.error = result.data
						var obj = { responseStatus: 0, responseMsgCode: "failure", "responseData":data}
					}					
					res.json(obj)					
                } else {					
					res.json({ responseStatus: 0, responseMsgCode: "Somthing Went Wrong!", "responseData":{}})                    
                }
            })
			
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
	},
	hashBurnByUserId: async (req, res) => {
        try {
			
			let flag = false;		
			hashBurnByUserIdParams.forEach(function (element, key) {
				if (req.body[element] == '' || req.body[element] == undefined) {
					flag = true;
				}
			})
			
			if (flag) {
				res.status(200).send({ "responseStatus": 0, "responseMsgCode": "mandatoryField" });
			}
			
			nftService.hashBurnByUserId(req.body).then(result => {				
				if (result.code != 11000) {
					var data = {}
					if (result.status == 1) {
						data.insertData = result.data
						var obj = { responseStatus: 1, responseMsgCode: "success", "responseData":data}					
					} else {
						data.error = result.data
						var obj = { responseStatus: 0, responseMsgCode: "failure", "responseData":data}
					}
					res.json(obj)
                } else {					
					res.json({ responseStatus: 0, responseMsgCode: "Somthing Went Wrong!", "responseData":{}})                    
                }
            })
			
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },	
	assignNftsByUserId: async (req, res) => {
        try {
			
			let flag = false;		
			assignNftsByUserIdParams.forEach(function (element, key) {
				if (req.body[element] == '' || req.body[element] == undefined) {
					flag = true;
				}
			})
			
			if (flag) {
				res.status(200).send({ "responseStatus": 0, "responseMsgCode": "mandatoryField" });
			}
			
			nftService.assignNftsByUserId(req.body).then(result => {
				
				if (result.code != 11000) {
					var data = {}
					if (result.status == 1) {
						data.insertData = result.data
						var obj = { responseStatus: 1, responseMsgCode: "success", "responseData":data}
					} else if (result.status == 2) {
						data.insertData = result.data
						var obj = { responseStatus: 0, responseMsgCode: "You are not the right person to assign!", "responseData":{}}
					} else {
						data.error = result.data
						var obj = { responseStatus: 0, responseMsgCode: "failure", "responseData":data}
					}
					res.json(obj)
                } else {					
					res.json({ responseStatus: 0, responseMsgCode: "Somthing Went Wrong!", "responseData":{}})                    
                }
            })
			
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },	
	verifyHash: async (req, res) => {
        try {
			
			let flag = false;		
			verifyHashParams.forEach(function (element, key) {
				if (req.body[element] == '' || req.body[element] == undefined) {
					flag = true;
				}
			})
			
			if (flag) {
				res.status(200).send({ "responseStatus": 0, "responseMsgCode": "mandatoryField" });
			}
			
			nftService.verifyHashStatus(req.body).then(result => {				
				if (result.code != 11000) {
					var data = {}
					if (result.status == 1) {
						data.insertData = result.data
						var obj = { responseStatus: 1, responseMsgCode: "success", "responseData":data}
					} else if (result.status == 2) {
						data.insertData = result.data
						var obj = { responseStatus: 0, responseMsgCode: "You are not authorized person!", "responseData":{}}
					} else {
						data.error = result.data
						var obj = { responseStatus: 0, responseMsgCode: "failure", "responseData":data}
					}
					res.json(obj)
                } else {					
					res.json({ responseStatus: 0, responseMsgCode: "Somthing Went Wrong!", "responseData":{}})                    
                }
            })
			
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },	
	assignContainerToOthers: async (req, res) => {
        try {
			
			let flag = false;
				
			assignContainerToOthersParams.forEach(function (element, key) {
				if (req.body[element] == '' || req.body[element] == undefined) {
					flag = true;
				} else if(req.body['assignContainerToOthersIds'].length == 0){
					flag = true;
				}
			})
			
			if (flag) {
				res.status(200).send({ "responseStatus": 0, "responseMsgCode": "mandatoryField" });
			}
			
			
			nftService.assignContainerToOthers(req.body).then(result => {				
				if (result.code != 11000) {
					var data = {}
					if (result.status == 1) {
						data.insertData = result.data					
						var obj = { responseStatus: 1, responseMsgCode: "success", "responseData":data}					
					} else {
						data.error = result.data
						var obj = { responseStatus: 0, responseMsgCode: "failure", "responseData":data}
					}					
					res.json(obj)
                } else {					
					res.json({ responseStatus: 0, responseMsgCode: "Somthing Went Wrong!", "responseData":{}})                    
                }
            })
			
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
	
    assignContainer_old: async (req, res) => {
        try {
			
			let flag = false;
			assigndataParams.forEach(function (element, key) {
                if (req.body[element] == '' || req.body[element] == undefined) {
                    flag = true;
                }
            })
            if (flag) {
                res.status(200).send({ "responseStatus": 0, "responseMsgCode": "mandatoryField" });
            }
			
			let assignContainerByFactoryIdsFlag = false;
			req.body.assignContainerByFactoryIds.map(item => {
				if(item.factoryId == undefined){
					assignContainerByFactoryIdsFlag = true;
				} else if(item.assignContainer == undefined) {
					assignContainerByFactoryIdsFlag = true;
				}
			});
			if (assignContainerByFactoryIdsFlag) {
                res.status(200).send({ "responseStatus": 0, "responseMsgCode": "assignContainerByFactoryIds not mannered!" });
            }
			
			if(req.body.assignContainerByFactoryIds.length > 1){
				req.body.dataAssign = req.body.assignContainerByFactoryIds.reduce((a,b) => a + b.assignContainer, 0)
			} else {
				req.body.dataAssign = req.body.assignContainerByFactoryIds[0].assignContainer
			}
			
			const validation = await Promise.all([nftService.checkAssignItem(req.body)]);
			
			if(validation[0].status == 0){
				
				var obj = { responseStatus: 0, responseMsgCode: "You have assigned wrong number", "responseData":{}}			
				res.json(obj)
				
			}	
			
			nftService.assignContainer(req.body).then(result => {				
				if (result.code != 11000) {
					var data = {}
					if (result.status == 1) {
						data.insertData = result.data					
						var obj = { responseStatus: 1, responseMsgCode: "success", "responseData":data}					
					} else {
						data.error = result.data
						var obj = { responseStatus: 0, responseMsgCode: "failure", "responseData":data}
					}					
					res.json(obj)
                } else {					
					res.json({ responseStatus: 0, responseMsgCode: "Somthing Went Wrong!", "responseData":{}})                    
                }
            })
			
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
	assignContainer: async (req, res) => {
        try {
			
			let flag = false;
			assigndataParams.forEach(function (element, key) {
                if (req.body[element] == '' || req.body[element] == undefined) {
                    flag = true;
                }
            })
            if (flag) {
                res.status(200).send({ "responseStatus": 0, "responseMsgCode": "mandatoryField" });
            }		
			
			nftService.assignContainer(req.body).then(result => {				
				if (result.code != 11000) {
					var data = {}
					if (result.status == 1) {
						data.insertData = result.data					
						var obj = { responseStatus: 1, responseMsgCode: "success", "responseData":data}					
					} else {
						data.error = result.data
						var obj = { responseStatus: 0, responseMsgCode: "failure", "responseData":data}
					}					
					res.json(obj)
                } else {
					res.json({ responseStatus: 0, responseMsgCode: "Somthing Went Wrong!", "responseData":{}})                    
                }
            })
			
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
	viewContainerByFactory: (req, res) => {
        try {
			
			let flag = false;
			viewContainerByFactoryParams.forEach(function (element, key) {
                if (req.body[element] == '' || req.body[element] == undefined) {
                    flag = true;
                }
            })
            if (flag) {
                res.status(200).send({ "responseStatus": 0, "responseMsgCode": "mandatoryField" });
            }
			
			nftService.viewContainerByFactory(req.body).then(result => {				
				if (result.code != 11000) {
					var data = {}
					if (result.status == 1) {
						data.fetchData = result.data					
						var obj = { responseStatus: 1, responseMsgCode: "success", "responseData":data}					
					} else {
						data.error = result.data
						var obj = { responseStatus: 0, responseMsgCode: "failure", "responseData":data}
					}					
					res.json(obj)
                } else {					
					res.json({ responseStatus: 0, responseMsgCode: "Somthing Went Wrong!", "responseData":{}})                    
                }
            })
			
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
	viewContainerFactoryById: (req, res) => {
        try {
			
			let flag = false;
			viewContainerFactoryByIdParams.forEach(function (element, key) {
                if (req.body[element] == '' || req.body[element] == undefined) {
                    flag = true;
                }
            })
            if (flag) {
                res.status(200).send({ "responseStatus": 0, "responseMsgCode": "mandatoryField" });
            }
			
			nftService.viewContainerFactoryById(req.body).then(result => {				
				if (result.code != 11000) {
					var data = {}
					if (result.status == 1) {
						data.fetchData = result.data					
						var obj = { responseStatus: 1, responseMsgCode: "success", "responseData":data}					
					} else {
						data.error = result.data
						var obj = { responseStatus: 0, responseMsgCode: "failure", "responseData":data}
					}					
					res.json(obj)					
                } else {					
					res.json({ responseStatus: 0, responseMsgCode: "Somthing Went Wrong!", "responseData":{}})                    
                }
            })
			
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
	viewContainerCompanyFactoryById: (req, res) => {
        try {
			
			let flag = false;
			viewContainerFactoryByIdParams.forEach(function (element, key) {
                if (req.body[element] == '' || req.body[element] == undefined) {
                    flag = true;
                }
            })
            if (flag) {
                res.status(200).send({ "responseStatus": 0, "responseMsgCode": "mandatoryField" });
            }
			
			nftService.viewContainerCompanyFactoryById(req.body).then(result => {				
				if (result.code != 11000) {
					var data = {}
					if (result.status == 1) {
						data.fetchData = result.data					
						var obj = { responseStatus: 1, responseMsgCode: "success", "responseData":data}					
					} else {
						data.error = result.data
						var obj = { responseStatus: 0, responseMsgCode: "failure", "responseData":data}
					}					
					res.json(obj)					
                } else {					
					res.json({ responseStatus: 0, responseMsgCode: "Somthing Went Wrong!", "responseData":{}})                    
                }
            })
			
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
	viewContainerByfdalebelId: (req, res) => {
        try {
			
			if (req.body.fdalebelId == '' || req.body.fdalebelId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "fdalebelId field is required", "responseData": {} })
            }

			nftService.viewContainerByfdalebelId(req.body.fdalebelId).then(result => {				
				if (result.code != 11000) {
					var data = {}
					if (result.status == 1) {
						data.fetchData = result.data					
						var obj = { responseStatus: 1, responseMsgCode: "success", "responseData":data}					
					} else {
						data.error = result.data
						var obj = { responseStatus: 0, responseMsgCode: "failure", "responseData":data}
					}					
					res.json(obj)					
                } else {					
					res.json({ responseStatus: 0, responseMsgCode: "Somthing Went Wrong!", "responseData":{}})                    
                }
            })
			
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
	getdatafromipfshash: (req, res) => {
        try {
			
			if (!req.body.ipfshash) {
                return res.json({ responseStatus: 0, responseMsgCode: "ipfshash field is required", "responseData": {} })
            }

			nftService.getdatafromipfshash(req.body.ipfshash).then(result => {				
				if (result.code != 11000) {
					var data = {}
					if (result.status == 1) {
						data = result.data					
						var obj = { responseStatus: 1, responseMsgCode: "success", "responseData":data}					
					} else {
						data.error = result.data
						var obj = { responseStatus: 0, responseMsgCode: "failure", "responseData":data}
					}					
					res.json(obj)					
                } else {					
					res.json({ responseStatus: 0, responseMsgCode: "Somthing Went Wrong!", "responseData":{}})                    
                }
            })
			
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    }
}
