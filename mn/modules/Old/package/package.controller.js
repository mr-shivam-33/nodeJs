const jwt = require('jsonwebtoken');
const NodeCache = require( "node-cache" );
const myCache = new NodeCache( { stdTTL: 100,checkperiod: 120 } );
var packageService = require("./package.service");
var formidable = require('formidable');
var fs = require('fs');
module.exports = {
    packageList: (req, res) => {        
        try {
            var form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
            req.body = fields;
            console.log(req.body);
            packageService.ServerSideProcessing(req).then(result =>{
                if (result.status ==1) {                   
                        res.json({responseStatus: 1, responseMsgCode: "success", "responseData":result.data,"recordsFiltered":result.recordsFiltered,"recordsTotal":result.recordsTotal,"draw":result.draw});
                } else {                   
                    res.json({responseStatus: 0,responseMsgCode: "failure.", "responseData":result.data})
                }
            });

  });
           
  } catch (error) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
        }
    }
 
}
