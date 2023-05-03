var invoiceService = require("./invoice.service");

module.exports = {
    invoiceList: (req, res) => {
        try {
            if (req.body.userId == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "UserId is required", "responseData": {} })
            }            
            invoiceService.listInvoiceByUserId(req.body).then(result => {
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
    invoiceView: (req, res) => {
        try {
            if (req.body.invoiceId == '') {
                return res.json({ responseStatus: 0, responseMsgCode: "InvoiceId is required", "responseData": {} })
            }            
            invoiceService.invoiceView(req.body).then(result => {
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
