var authenticationService = require("./authentication.service");

module.exports = {
    checkUserVerify: (req, res) => {
        try {
            if (req.body.userId == '' || req.body.userId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "userId field is required", "responseData": {} })
            }
            if (req.body.userType == '' || req.body.userType == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "userType field is required", "responseData": {} })
            }

            authenticationService.checkUserVerify(req.body).then(result => {
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
    userVerify: (req, res) => {
        try {
            if (req.body.userId == '' || req.body.userId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "userId field is required", "responseData": {} })
            }
            if (req.body.userType == '' || req.body.userType == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "userType field is required", "responseData": {} })
            }

            authenticationService.userVerify(req.body).then(result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, verifyStatus:result.verifiy, responseMsgCode: result.data });
                }               
                 else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure." })
                }
            });

        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },
    userprofilelist: (req, res) => {
        try {
            if (req.body.userId == '' || req.body.userId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "userId field is required", "responseData": {} })
            } 
            authenticationService.userprofilelist(req.body).then(result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            });

        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    }
}
