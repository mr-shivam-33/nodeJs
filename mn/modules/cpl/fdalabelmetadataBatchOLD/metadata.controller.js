const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NodeCache = require( "node-cache" );
const myCache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );
const metadataService = require("./metadata.service");

const metadataParams = ['productId','userId', 'totalNfts'];
const updateMetadataParams = ['fdalebelId', 'productId','userId', 'totalNfts'];
const getMetadataParams = ['orderId', 'productId','userId'];
const ipfsdataParams = ['ipfsData'];

module.exports = {
	selfUpdate: async (req, res) => {
        try {		
			
			metadataService.selfUpdate(req.body).then(result => {				
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
    createNftsdataNew: async (req, res) => {
        try {
			
			// console.log("MMMMMMMMM")
			// return

            metadataService.createNftsdataNew(req.body).then(result => {
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
	dummyIpfsdata: async (req, res) => {
        try {
			
			// console.log("MMMMMMMMM")
			// return

            metadataService.dummyIpfsdata().then(result => {				
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
			
			
			metadataService.getProgressBar(req.body).then(result => {				
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
			
			metadataService.addfdametadata(req.body).then(result => {				
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
