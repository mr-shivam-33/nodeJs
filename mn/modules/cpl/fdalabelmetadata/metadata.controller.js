const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NodeCache = require( "node-cache" );
const myCache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );
const metadataService = require("./metadata.service");
const centralizedService = require("./fdacentralized.service");

const metadataParams = ['productId','userId'];
const updateMetadataParams = ['fdalebelId', 'productId','userId', 'totalNfts'];
const getMetadataParams = ['orderId', 'productId','userId'];
const ipfsdataParams = ['ipfsData'];


// console.log(req.app.get('socketio'))
let self = module.exports = {
    updateNftHashData: async (req, res) => {
        try {		
			
			metadataService.updateNftHashData(req.body).then(result => {				
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
    ipfsdata: async (req, res) => {
        try {

            //console.log('hellooooooooooooooo'); return;
			
			let secretToken = req.headers['x-access-token'];
            let flag = false;
            ipfsdataParams.forEach(function (element, key) {
                if (req.body[element] == '' || req.body[element] == undefined) {
                    flag = true;
                }
            })
            if (flag) {
                res.status(200).send({ "responseStatus": 0, "responseMsgCode": "mandatoryField" });
            }  
			
			metadataService.ipfsdata(req.body).then(result => {				
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
	getProgressBar: async (req, res) => {
        try {
			metadataService.getProgressBar(req.body,req.headers['typedata']).then(result => {				
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
    addfdametadata: async (req, res) => {
        try {
			
			let secretToken = req.headers['x-access-token'];
            let flag = false;
            metadataParams.forEach(function (element, key) {
                if (req.body[element] == '' || req.body[element] == undefined) {
                    flag = true;
                }
            })
            if (flag) {
                res.status(200).send({ "responseStatus": 0, "responseMsgCode": "mandatoryField" });
            }
            const validation = await Promise.all([metadataService.getpackageNameByproId(req.body.subscriptionPackage,req.headers['typedata']), metadataService.getPaymentType(req.headers['typedata'])]);
            
            if ((validation[0] == null) || (validation[0] == undefined)) {
                res.status(200).send({ "responseStatus": 0, "responseMsgCode": "Please add package type by admin." });
                return false;
            }
            else {
                req.body.packageType = JSON.parse(JSON.stringify(validation[0])).packageName;
            }
            if ((validation[1] == null) || (validation[1] == undefined)) {
                res.status(200).send({ "responseStatus": 0, "responseMsgCode": "Please add payment mode by admin." });
                return false;
            }


            if(req.body.packagingStandard == "1"){

                const getDataString =  req.body.packagingDetails
                const anotherString = req.body.packagingStandardValue
                let randomCount = req.body.numberOfProduct
                var countNfts = 0;

                let arr1 = []
                let obj2 = {};
                for(let key in anotherString){
                    arr1.push(key)
                    obj2[key] = {};
                }
                for (let index = arr1.length-1; index >= 0; index--) {
                    randomCount = randomCount / anotherString[arr1[index]];
                    countNfts = parseInt(countNfts + randomCount)
                    let getData = await centralizedService.repeatString(randomCount)
                    obj2[arr1[index]]['nfts'] = parseInt(randomCount);
                    obj2[arr1[index]]['srNo'] = getData.data;
                    obj2[arr1[index]]['totalContainerNfts'] = parseInt(anotherString[arr1[index]]);
                }
                countNfts =  parseInt(countNfts + parseInt(req.body.numberOfProduct))

                let getMixData = await centralizedService.repeatString(parseInt(req.body.numberOfProduct))
                req.body.totalNfts = countNfts
                req.body.containers = obj2.containers ? [obj2.containers] : []
                req.body.pallets = obj2.pallets ? [obj2.pallets] : []
                req.body.masterCartons = obj2.masterCartons ? [obj2.masterCartons] : []
                req.body.innerCartons = obj2.innerCartons ? [obj2.innerCartons] : []
                req.body.product = [{'nfts': parseInt(req.body.numberOfProduct), 'srNo': getMixData.data}]

            }


            if (JSON.parse(JSON.stringify(validation[0])).subscriptionValue == 1 || JSON.parse(JSON.stringify(validation[0])).subscriptionValue == '1') {
                centralizedService.addfdaCentralized(req.body, req.headers['typedata']).then(result => {
                    var data = {}
                    if (result.status == 1) {
                        data.insertData = result.data
                        var obj = { responseStatus: 1, responseMsgCode: "success", "responseData": data }
                    } else {
                        data.error = result.data
                        var obj = { responseStatus: 0, responseMsgCode: "failure", "responseData": data }
                    }
                    res.json(obj);
                });
            }
            if (JSON.parse(JSON.stringify(validation[0])).subscriptionValue == 3 || JSON.parse(JSON.stringify(validation[0])).subscriptionValue == '3') {
                console.log('Semicentralized..........not working........'); return;
                metadataService.addfdametadata(req.body, req.headers['typedata']).then(result => {
                    var data = {}
                    if (result.status == 1) {
                        data.insertData = result.data
                        var obj = { responseStatus: 1, responseMsgCode: "success", "responseData": data }
                    } else {
                        data.error = result.data
                        var obj = { responseStatus: 0, responseMsgCode: "failure", "responseData": data }
                    }
                    res.json(obj);
                })
            }
            if (JSON.parse(JSON.stringify(validation[0])).subscriptionValue == 2 || JSON.parse(JSON.stringify(validation[0])).subscriptionValue == '2') {
                metadataService.addfdametadata(req.body, req.headers['typedata']).then(result => {
                    var data = {}
                    if (result.status == 1) {
                        data.insertData = result.data
                        var obj = { responseStatus: 1, responseMsgCode: "success", "responseData": data }
                    } else {
                        data.error = result.data
                        var obj = { responseStatus: 0, responseMsgCode: "failure", "responseData": data }
                    }
                    res.json(obj);
                })
            }
			
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    addfdametadata_old: async (req, res) => {
        try {
			
			let secretToken = req.headers['x-access-token'];
            let flag = false;
            metadataParams.forEach(function (element, key) {
                if (req.body[element] == '' || req.body[element] == undefined) {
                    flag = true;
                }
            })
            if (flag) {
                res.status(200).send({ "responseStatus": 0, "responseMsgCode": "mandatoryField" });
            }

            let userId_ = req.body.userId;
            let typedata_ = req.headers['typedata'];
            const validation = await Promise.all([metadataService.getpackageNameByproId(userId_,typedata_), metadataService.getPaymentType(typedata_)]);
          
            if ((validation[0] == null) || (validation[0] == undefined)) {
                res.status(200).send({ "responseStatus": 0, "responseMsgCode": "Please add package type by admin." });
                return false;
            } else { req.body.packageType = validation[0].name; }
            if ((validation[1] == null) || (validation[1] == undefined)) {
                res.status(200).send({ "responseStatus": 0, "responseMsgCode": "Please add payment mode by admin." });
                return false;
            }

			metadataService.addfdametadata(req.body,req.headers['typedata']).then(result => {	
					var data = {}
					if (result.status == 1) {
						data.insertData = result.data					
						var obj = { responseStatus: 1, responseMsgCode: "success", "responseData":data}					
					} else {
						data.error = result.data
						var obj = { responseStatus: 0, responseMsgCode: "failure", "responseData":data}
					}					
					res.json(obj)					
                // } else {					
				// 	res.json({ responseStatus: 0, responseMsgCode: "Somthing Went Wrong!", "responseData":{}})                    
                // }
            })
			
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    updatefdametadata: (req, res) => {
        try {
			
			let secretToken = req.headers['x-access-token'];
            let flag = false;
            updateMetadataParams.forEach(function (element, key) {
                if (req.body[element] == '' || req.body[element] == undefined) {
                    flag = true;
                }
            })
            if (flag) {
                res.status(200).send({ "responseStatus": 0, "responseMsgCode": "mandatoryField" });
            }
			
			metadataService.updatefdametadata(req.body).then(result => {				
				if (result.code != 11000) {					
					var data = {}
					if (result.status == 1) {
						data.updatedData = result.data				
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
	getfdametadata: (req, res) => {
        try {
			
			let secretToken = req.headers['x-access-token'];
            let flag = false;
            getMetadataParams.forEach(function (element, key) {
                if (req.body[element] == '' || req.body[element] == undefined) {
                    flag = true;
                }
            })
            if (flag) {
                res.status(200).send({ "responseStatus": 0, "responseMsgCode": "mandatoryField" });
            }
			
			metadataService.getfdametadata(req.body).then(result => {				
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
}