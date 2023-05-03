const offerService = require('./offers.service');
const offerParams = ['offerTitle', 'validFrom', 'validTo', 'offerType','offerValue'];

module.exports = {
    addOffer: (req, res) => {
        try {
            if (req.body != undefined) {
                let flag = false;
                offerParams.forEach((param)=> {
                    if (req.body[param] == '' || req.body[param] == undefined) {
                        flag = true;
                    }
                })
                if (flag) {
                    res.status(200).send({ "responseStatus": 0, "responseMsgCode": "mandatoryField" });
                }
                offerService.addOffer(req.body).then(result => {
                    if (result.status == 1) {
                        res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                    } else {
                        res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                    }
                });
            }
        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },

    updateOffer: (req, res) => {
        try {
            if (req.body != undefined) {
                
                let flag = false;
                offerParams.forEach((param)=> {
                    if (req.body[param] == '' || req.body[param] == undefined) {
                        flag = true;
                    }
                })
                
                if (flag) {
                    res.status(200).send({ "responseStatus": 0, "responseMsgCode": "mandatoryField" });
                }
                offerService.updateOffer(req.body._id, req.body).then(result => {
                    if (result.status == 1) {
                        res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": result.data });
                    } else {
                        res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                    }
                });
            }
        } catch (error) {

            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    },

    deleteOffer: (req, res) => {
        try {
            offerService.deleteOffer(req.body).then(result => {

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

    listOffer: (req, res) => {
        try {
            offerService.listOffer(req.body).then(result => {

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