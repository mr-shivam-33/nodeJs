var supportService = require("./support.service");
var ticketCode = require('ticket-code');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var fs = require('fs');

module.exports = {
    permissionAdd: (req, res) => {
        try {
            if (req.body.pageName == '' || req.body.pageName == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "pageName field is required", "responseData": {} })
            }
            if (req.body.userId == '' || req.body.userId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "userId field is required", "responseData": {} })
            }          
            supportService.permissionAdd(req.body).then(result => {
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

    permissionShow: (req, res) => {        
        try {
            supportService.permissionShow(req.body).then(result => {
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
    supportAdd: (req, res) => {
        try {
            if (req.body.userId == '' || req.body.userId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "userId field is required", "responseData": {} })
            } 
            if (req.body.subject == '' || req.body.subject == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "subject field is required", "responseData": {} })
            }             
            if (req.body.emailId == '' || req.body.emailId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "emailId field is required", "responseData": {} })
            }
            if (req.body.contactNo == '' || req.body.contactNo == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "contactNo field is required", "responseData": {} })
            }
            if (req.body.desc == '' || req.body.desc == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "desc field is required", "responseData": {} })
            }    
            // if(req.file){
            //     req.body.fileImage = req.file.filename;
            // }            

            if(req.files.fileImage != undefined){
                req.body.fileImage = req.files.fileImage[0].location
            }

            let codeLength = 11 // optional (default 10)
            let checksumSeed = 5 // required
            let checksumIdx = 7 // optional
            let code = ticketCode.generate(checksumSeed, codeLength, checksumIdx) ;
            req.body.ticketId = code;
            supportService.supportAdd(req.body).then(result => {
                if (result.status == 1) {
                    var subject = "Ticket Generated";
                    let userName = "ef45bad14f72aa2220459e479592ecfc";
                    let password1 = "ce2340550790bd00a275bc21fabcfa67";
                    var transporter = nodemailer.createTransport(
                        smtpTransport({
                            service: "mailjet",
                            host: "in-v3.mailjet.com",
                            auth: {
                                user: userName, // generated ethereal user
                                pass: password1, // generated ethereal password
                            },
                        })
                    );
                    fs.readFile('./medGrids-email-support.html', { encoding: 'utf-8' }, async (err, data) => {
                       
                        if (err) {
                            console.warn("Error getting password reset template: " + err);                           
                        } else {                           
                            let htmlFile = data;
                            let ticketCode = 'Your ticket ID is '+ req.body.ticketId;                            
                            htmlFile = htmlFile.replace("#ticketId#", ticketCode)

                            var thanksMailOptions = {
                                from: "<info@medgrids.com>",
                                to: result.data.emailId,
                                subject: subject,
                                html: htmlFile
                            };                           
                           
                            await transporter.sendMail(thanksMailOptions);                          
                        }

                        res.json({ responseStatus: 1, responseMsgCode: "success", "responseData": {} });

                    });
                   
                } else {
                    res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData": result.data })
                }
            });

        } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    }, 
    supportList: (req, res) => {        
        try {
            if (req.body.userId == '' || req.body.userId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "userId field is required", "responseData": {} })
            } 
            supportService.supportList(req.body).then(result => {
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
    /*
     
   
    supportDelete: (req, res) => {
        try {
            if (req.body.packageId == '' || req.body.packageId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "packageId field is required", "responseData": {} })
            }            
            let packageId = req.body.packageId;
            delete req.body.packageId;

            packageService.deletePackage(packageId).then(result => {
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

    */
    
}
