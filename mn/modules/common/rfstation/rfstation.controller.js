const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NodeCache = require( "node-cache" );
const myCache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );
const rfstationService = require("./rfstation.service");

module.exports = {
	addRfIdData : (req, res) => {
		try {
			console.log(req.body,"ucvuwvducvsudvcusyvs")
			rfstationService.addRfIdData(req.body).then(result => {
				var data = {}
				if (result.status ==1) {
					var obj = { responseStatus: 1, responseMsgCode: "success", "responseData":result.data}
					res.json(obj)
                } else {                   
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData":result.data})
                }
            })
			
		} catch (error) {
			res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
		}
	},
	getRfIdData : (req, res) => {
		try {
			console.log(req.body,"ucvuwvducvsudvcusyvs")
			rfstationService.getRfIdData(req.body).then(result => {
				var data = {}
				if (result.status ==1) {
					var obj = { responseStatus: 1, responseMsgCode: "success", "responseData":result.data}
					res.json(obj)
                } else {                   
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData":result.data})
                }
            })
			
		} catch (error) {
			res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
		}
	},
}
