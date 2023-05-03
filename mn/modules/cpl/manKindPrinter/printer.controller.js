
var printerService = require("./printer.service");

module.exports = {
    printerSAPData: async(req, res) => {   
        try {
            
            printerService.printerSAPData(req.body).then(async result => {
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

    printerQR: async(req, res) => {   
        try {
            if (req.body.userId == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "fdaId field is required", "responseData": {} })
            } 

            printerService.printerQR(req.body).then(async result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            });

        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "errrr": error }, "responseInvalid": 0 });
        }
    },

    getSAPData: async(req, res) => {   
        try {
            if (req.query.userId == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "userId field is required", "responseData": {} })
            } 

            printerService.getSAPData(req.query).then(async result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            });

        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "errrr": error }, "responseInvalid": 0 });
        }
    },

    updateQrScannerStatus: async(req, res) => {   
        try {
            // if (req.query.userId == '') {
            //     return res.json({ responseStatus: 0, responseMsgCode: "userId field is required", "responseData": {} })
            // } 

            printerService.updateQrScannerStatus(req.body).then(async result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            });

        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "errrr": error }, "responseInvalid": 0 });
        }
    },

    getQRCode: async(req, res) => {   
        try {
            // if (req.query.userId == '') {
            //     return res.json({ responseStatus: 0, responseMsgCode: "userId field is required", "responseData": {} })
            // } 

            printerService.getQRCode(req.body).then(async result => {
                if (result.status == 1) {
                    res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            });

        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "errrr": error }, "responseInvalid": 0 });
        }
    },

}