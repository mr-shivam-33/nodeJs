var frontpageService = require("./clienttheme.service");
const themeParams = ['userId', 'companyName', 'colorPrimary', 'colorSecondary',
 'colorWhite', 'colorBlack', 'colorText','faviconImage','dashImag','logoImage'];


module.exports = {
addtheme: (req, res) => {
    try {
        let flag = false;
        let mandatoryField;
        themeParams.forEach(function (element, key) {           
            if (req.body[element] == '' || req.body[element] == undefined || req.body[element] == null) {
                flag = true;
                mandatoryField = element
            }
        })
        if (flag) {
            res.status(200).send({ "responseStatus": 0, "responseMsgCode": mandatoryField + " key is mandatory field" });
            return false;
        }
        frontpageService.addtheme(req.body).then(result => {
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

getThemeByUserid: (req, res) => {
    try {
        if (req.body.userId === ''|| req.body.userId == undefined) {
            return res.json({ responseStatus: 0, responseMsgCode: "userId field is required", "responseData": {} })
        } 
        frontpageService.getThemeByUserid(req.body.userId).then(result => {
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
uploadImage: (req, res) => {
    let getImages = req.files;
    let imagePath = [];
    let dashImagImagePath = getImages.dashImag == undefined ? "" : getImages.dashImag[0].location;
    let faviconImagePath = getImages.faviconImage == undefined ? "" : getImages.faviconImage[0].location;
    let logoImageImagePath = getImages.logoImage == undefined ? "" : getImages.logoImage[0].location;
	if(getImages){
		res.status(200).json({ responseStatus: 1, responseMsgCode: "success", "dashImagImagePath":dashImagImagePath,"faviconImagePath":faviconImagePath,"logoImageImagePath":logoImageImagePath});
	}else{
		res.status(403).json({ responseStatus: 0, responseMsgCode: "failure."})
	}
},

}
