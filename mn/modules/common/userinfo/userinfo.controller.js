var userinfoService = require("./userinfo.service");

module.exports = {
    mainUserInfoList: (req, res) => {
        try {           
            userinfoService.mainUserInfoList(req.body).then(result => {
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
    paymentInfoList: (req, res) => {
        try {           
            userinfoService.paymentInfoList(req.body).then(result => {
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
    paymentStatusChange: (req, res) => {
        try {             
            if (req.body.paymentId == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "paymentId is required", "responseData": {} })
            }
            if (req.body.status == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "payment status is required", "responseData": {} })
            }           
            userinfoService.paymentStatusChange(req.body).then(result => {
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
    UserProfileView: (req, res) => {
        try { 
            if (req.body.userId == '' || req.body.userId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "userId is required", "responseData": {} })
            } 
            
           // console.log(req.body.userId); return;
            userinfoService.UserProfileView(req.body.userId).then(result => {
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
