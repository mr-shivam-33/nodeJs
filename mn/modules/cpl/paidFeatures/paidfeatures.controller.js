var paidfeaturesService = require("./paidfeatures.service");

module.exports = {
    managerAndDistributerData: (req, res) => {
        try {
            if (req.body.userId == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "UserId is required", "responseData": {} })
            }
            paidfeaturesService.managerAndDistributerData(req.body).then(result => {
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
    editManagerAndDistributerData: (req, res) => {
        try {
            if (req.body.id == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "Id is required", "responseData": {} })
            }
            paidfeaturesService.editManagerAndDistributerData(req.body).then(result => {
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
    getReportByCceId: (req, res) => {
        try {
            if (req.body.userId == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "User Id is required", "responseData": {} })
            }
            paidfeaturesService.getReportByCceId(req.body).then(result => {
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
    ListManagerAndDistributerData: (req, res) => {
        try {
            if (req.body.type == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "User Type is required", "responseData": {} })
            }
            paidfeaturesService.ListManagerAndDistributerData(req.body).then(result => {
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
    deleteManagerAndDistributerData: (req, res) => {
        try {
            if (req.body.type == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "User Type is required", "responseData": {} })
            }
            paidfeaturesService.deleteManagerAndDistributerData(req.body).then(result => {
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
    eachManagerAndDistributerData: (req, res) => {
        try {
            if (req.body.type == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "User Type is required", "responseData": {} })
            }
            paidfeaturesService.eachManagerAndDistributerData(req.body).then(result => {
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
    information: async (req, res) => {
        try {

            if (req.body.mobile == '' || req.body.mobile == undefined) {
                res.json({ responseStatus: 0, responseMsgCode: "mobile field is required", "responseData": {} })
            } 
            // var clientIp = requestIp.getClientIp(req);
            // req.body.ip_address = req.ip ;
			paidfeaturesService.information(req.body).then(result => {
                if (result) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result })
                }
            })
            
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    infolist: async (req, res) => {
        try {
           
			paidfeaturesService.infolist(req.body).then(result => {
                if (result) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result })
                }
            })
            
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    countInfoList: async (req, res) => {
        try {
           
			paidfeaturesService.countInfoList(req.body).then(result => {
                if (result) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result })
                }
            })
            
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
}
