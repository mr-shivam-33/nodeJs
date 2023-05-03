const metadataService = require("./metadata.service");
const fdabatchcentralized = require("./fdabatchcentralized.service");
const axios = require("axios").default;

module.exports = {
	updateNftHashData: async (req, res) => {
        try {	
			
			// console.log('....getPackageName.......',req.body); return;

			if (req.headers['typedata'] == ''|| req.headers['typedata'] == undefined) {
				res.json({ responseStatus: 0, responseMsgCode: "databaseName field is required", "responseData": {} })
		    }
			if (req.body.subscriptionValue == '' || req.body.subscriptionValue == undefined) {
				res.json({ responseStatus: 0, responseMsgCode: "subscriptionValue field is required", "responseData": {} })
			}

			// let subscriptionName = await Promise.all([metadataService.getSubscriptionName(req.body.packagename,req.headers['typedata'])]);
			// let getSubpType = subscriptionName[0].data;

			// if (getSubpType == '' || getSubpType == undefined) {
			// 	res.json({ responseStatus: 0, responseMsgCode: "Please add subscription in package name by admin.", "responseData": {} })
			// }   

			if (req.body.subscriptionValue == 1 || req.body.subscriptionValue == '1' ) {
				 // this is centralized
				fdabatchcentralized.updateNftHashCentralizedData(req.body,req.headers['typedata']).then(result => {				
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


			}
			if (req.body.subscriptionValue == 3 || req.body.subscriptionValue == '3' ) {
				 // this is Semicentralized
			}
			if (req.body.subscriptionValue == 2 || req.body.subscriptionValue == '2' ) {
				 // this is Decentralized
				metadataService.updateNftHashData(req.body,req.headers['typedata']).then(result => {				
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

			}
			
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },	

	getDataSAP: async (req, res) => {

		let data = {
			"PlantCode":"AI",
			"MaterialCode":"50002971",
			"Batch":"5CAIR017"
		  }

		let getData = await axios.post("http://14.140.17.206:50000/RESTAdapter/QRCodeDetails_ControlPrint", data, {
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				authorization: "Basic cG9kcmZjOk1ua1BPREA0NTY="
			},
		});

		console.log(getData.data, "Manishhhhhhhhhhhhh");
		return false;


        try {	
			
			
			
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },	
}
