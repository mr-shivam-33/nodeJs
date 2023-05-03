var paymentService = require("./payment.service");

module.exports = {    
    createUniqueNumberByNfts:(req, res)=>{
        try{            
            if (req.body.fdaId == '' || req.body.fdaId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "FDA lable Id is required", "responseData": {} })
            }            
            paymentService.createUniqueNumberByNfts(req.body).then(result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            });

        }catch{
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }

    },
    creditPaymentDetails: (req, res) => {
        try {                        
            if (req.body.userId == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "userId is required", "responseData": {} })
            }            
            paymentService.creditPaymentDetails(req.body).then(result => {
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
    acceptPaymentInfo: (req, res) => {
        try {         
            paymentService.acceptPaymentInfo(req.body).then(result => {
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
