var packageService = require("./managepackage.service");

module.exports = {
    packagelist: (req, res) => {
        try {           
            packageService.packagelist(req.body).then(result => {
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
    addPackage: (req, res) => {
        try { 
            if (req.body.name == '' || req.body.name == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "name field is required", "responseData": {} })
            }                               
            packageService.addPackage(req.body).then(result => {
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
    editPackage: (req, res) => {
        try {  
            if (req.body.packageId == '' || req.body.packageId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "packageId is required", "responseData": {} })
            }           
            let packageId = req.body.packageId; 
            delete req.body.packageId;        
            packageService.editPackage(packageId,req.body).then(result => {
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
    deletePackage: (req, res) => {
        try { 
            if (req.body.packageId == '' || req.body.packageId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "packageId field is required", "responseData": {} })
            } 
            
            let packageId = req.body.packageId; 
            delete req.body.packageId; 

            packageService.deletePackage(packageId,req.body).then(result => {
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
