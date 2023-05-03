const { async } = require("q");
var productinfoService = require("./productinfo.service");

module.exports = {
    getProductInfo: (req, res) => {
        try {
            // console.log('hello..............',req.body.batchNo); return;
            if (req.body.batchNo == '' || req.body.batchNo == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "batchNo field is required", "responseData": {} })
            }
            productinfoService.getProductInfo(req.body.batchNo).then(result => {
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
    }
   
}