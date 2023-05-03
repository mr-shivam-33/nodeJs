var frontpageService = require("./frontpage.service");
var multer = require('multer');


module.exports = {
    pagelistInfo: (req, res) => {
        try { 
            frontpageService.pagelistInfo().then(result => {
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
    pageDetailsListInfo: (req, res) => {
        try { 
            frontpageService.pageDetailsListInfo(req.body).then(result => {
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
    editPageDetailsInfo: (req, res) => {
        try {
            if (req.body.pagedetailsId == ''|| req.body.pagedetailsId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "pagedetailsId field is required", "responseData": {} })
            }
            if (req.body.pageId == '' || req.body.pageId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "pageId field is required", "responseData": {} })
            } 
            if (req.body.title == '' || req.body.title == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "title field is required", "responseData": {} })
            } 
            if (req.body.description == '' || req.body.description == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "description field is required", "responseData": {} })
            }
            if (req.body.order == '' || req.body.order == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "order field is required", "responseData": {} })
            }
            if (req.body.status === ''|| req.body.status == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "status field is required", "responseData": {} })
            }           
            
            frontpageService.editPageDetailsInfo(req.body,req.file).then(result => {
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
    addPageDetailsInfo: (req, res) => {
        try {
            if (req.body.pageId == '' || req.body.pageId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "pageId field is required", "responseData": {} })
            } 
            if (req.body.title == '' || req.body.title == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "title field is required", "responseData": {} })
            } 
            if (req.body.description == '' || req.body.description == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "description field is required", "responseData": {} })
            }
            if (req.body.order == '' || req.body.order == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "order field is required", "responseData": {} })
            }
            if(req.file){
                req.body.image = req.file.filename;
            }
            // req.body.page_title = req.body.title
            // delete req.body.title;
            frontpageService.addPageDetailsInfo(req.body).then(result => {
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
    deletePageDetailsInfo: (req, res) => {
        try {            
            if (req.body.pagedetailsId == '' || req.body.pagedetailsId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "pagedetailsId field is required", "responseData": {} })
            }              
            let pagedetailsId = req.body.pagedetailsId;
            
            frontpageService.deletePageDetailsInfo(pagedetailsId).then(result => {
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
    frontPageListInfo: (req, res) => {
        try { 
            if (req.body.pageId == '' || req.body.pageId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "pageId field is required", "responseData": {} })
            } 
            frontpageService.frontPageListInfo(req.body).then(result => {
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
    addOurTeamInfo: (req, res) => {
        try {
            if (req.body.name == '' || req.body.name == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "name field is required", "responseData": {} })
            } 
            if (req.body.designation == '' || req.body.designation == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "designation field is required", "responseData": {} })
            }
            if (req.body.order == '' || req.body.order == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "order field is required", "responseData": {} })
            }
            if (req.body.layer == '' || req.body.layer == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "layer field is required", "responseData": {} })
            }
            if (req.body.linkedIUrl == '' || req.body.linkedIUrl == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "LinkedIn url field is required", "responseData": {} })
            }
            if (req.file == '' || req.file == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "Team Image field is required", "responseData": {} })
            }
            req.body.teamImage = req.file.filename;
            frontpageService.addOurTeamInfo(req.body).then(result => {
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
    editOurTeamInfo: (req, res) => {
        try {
            if (req.body.teamId == ''|| req.body.teamId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "teamId field is required", "responseData": {} })
            }
            if (req.body.name == ''|| req.body.name == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "name field is required", "responseData": {} })
            } 
            if (req.body.designation == ''|| req.body.designation == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "designation field is required", "responseData": {} })
            }
            if (req.body.order == ''|| req.body.order == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "order field is required", "responseData": {} })
            }
            if (req.body.layer == ''|| req.body.layer == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "layer field is required", "responseData": {} })
            }
            if (req.body.linkedIUrl == ''|| req.body.linkedIUrl == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "LinkedIn url field is required", "responseData": {} })
            }
            if (req.body.status === ''|| req.body.status == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "status field is required", "responseData": {} })
            }            
            if(req.body.leadership ==''){
                req.body.leadership = 0
            }
            frontpageService.editOurTeamInfo(req.body,req.file).then(result => {
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
    ourTeamListInfo: (req, res) => {
        try { 
            frontpageService.ourTeamListInfo().then(result => {
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
    homePageOurTeamListInfo: (req, res) => {
        try { 
            frontpageService.homePageOurTeamListInfo().then(result => {
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
    deleteTeamInfo: (req, res) => {
        try {            
            if (req.body.teamId == '' || req.body.teamId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "teamId field is required", "responseData": {} })
            }              
            let teamId = req.body.teamId;
            frontpageService.deleteTeamInfo(teamId).then(result => {
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
    addBannerInfo: (req, res) => {
        try {
            if (req.body.title == '' || req.body.title == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "name field is required", "responseData": {} })
            } 
            if (req.file == '' || req.file == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "Banner Image field is required", "responseData": {} })
            }   
            let title = req.body.title;
            frontpageService.addBannerInfo(title,req.file).then(result => {
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
    editBannerInfo: (req, res) => {
        try {
            if (req.body.title == '' || req.body.title == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "name field is required", "responseData": {} })
            } 
            if (req.body.status === '' || req.body.status == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "status field is required", "responseData": {} })
            } 
            // if (req.file == '' || req.file == undefined) {
                // return res.json({ responseStatus: 0, responseMsgCode: "Banner Image field is required", "responseData": {} })
            // }   
            frontpageService.editBannerInfo(req.body,req.file).then(result => {
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
    bannerListInfo: (req, res) => {
        try { 
            frontpageService.bannerListInfo().then(result => {
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
    topBannerListInfo: (req, res) => {
        try { 
            frontpageService.topBannerListInfo().then(result => {
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
    deleteBannerInfo: (req, res) => {
        try {            
            if (req.body.bannerId == '' || req.body.bannerId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "bannerId field is required", "responseData": {} })
            }              
            let bannerId = req.body.bannerId;
            frontpageService.deleteBannerInfo(bannerId).then(result => {
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
    addOurPartner: (req, res) => {
        try {
            if (req.body.title == '' || req.body.title == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "title field is required", "responseData": {} })
            }            
            if (req.body.description == '' || req.body.description == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "description field is required", "responseData": {} })
            }
            if (req.file == '' || req.file == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "Image field is required", "responseData": {} })
            } 
            frontpageService.addOurPartner(req.body,req.file).then(result => {
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
    editOurPartner: (req, res) => {
        try {
            if (req.body.title == '' || req.body.title == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "title field is required", "responseData": {} })
            }           
            if (req.body.description == '' || req.body.description == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "description field is required", "responseData": {} })
            }            
            frontpageService.editOurPartner(req.body,req.file).then(result => {
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
    partnerListInfo: (req, res) => {
        try { 
            frontpageService.partnerListInfo().then(result => {
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
    deletePartnerInfo: (req, res) => {
        try {            
            if (req.body.partnerId == '' || req.body.partnerId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "bannerId field is required", "responseData": {} })
            }              
            let partnerId = req.body.partnerId;
            frontpageService.deletePartnerInfo(partnerId).then(result => {
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
    homePartnerListInfo: (req, res) => {
        try { 
            frontpageService.homePartnerListInfo().then(result => {
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
    editAboutHomePage: (req, res) => {
        try {
            if (req.body.page == '' || req.body.page == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "page field is required", "responseData": {} })
            }  
            if (req.body.title == '' || req.body.title == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "title field is required", "responseData": {} })
            }         
            if (req.body.description == '' || req.body.description == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "description field is required", "responseData": {} })
            }
            frontpageService.editAboutHomePage(req.body,req.file).then(result => {
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
    leaderShipListInfo: (req, res) => {
        try { 
            frontpageService.leaderShipListInfo().then(result => {
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
    aboutCategoryList: (req, res) => {
        try { 
            frontpageService.aboutCategoryList().then(result => {
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
    editAboutCategory: (req, res) => {
        try {
            if (req.body.categoryId == '' || req.body.categoryId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "categoryId field is required", "responseData": {} })
            }  
            if (req.body.title == '' || req.body.title == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "title field is required", "responseData": {} })
            }         
            if (req.body.description == '' || req.body.description == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "description field is required", "responseData": {} })
            }          
            
            frontpageService.editAboutCategory(req.body,req.file).then(result => {
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
    addourstoryInfo: (req, res) => {
        try {
            if (req.body.title == '' || req.body.title == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "title field is required", "responseData": {} })
            } 
            if (req.body.description == '' || req.body.description == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "description field is required", "responseData": {} })
            } 
            if (req.file == '' || req.file == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "Banner Image field is required", "responseData": {} })
            }   
            let title = req.body.title;
            let description = req.body.description;
            frontpageService.addourstoryInfo(title,description,req.file).then(result => {
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
    editourstoryInfo: (req, res) => {
        try {
            if (req.body.ourstoryId == '' || req.body.ourstoryId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "ourstoryId field is required", "responseData": {} })
            }
            if (req.body.title == '' || req.body.title == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "title field is required", "responseData": {} })
            } 
            if (req.body.description == '' || req.body.description == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "description field is required", "responseData": {} })
            }
            if (req.body.status === '' || req.body.status == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "status field is required", "responseData": {} })
            } 
            if (req.file == '' || req.file == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "Our Story field is required", "responseData": {} })
            }   
            frontpageService.editourstoryInfo(req.body,req.file).then(result => {
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
    ourstorylistInfo: (req, res) => {
        try {              
            frontpageService.ourstorylistInfo().then(result => {
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
    homeourstorylistInfo: (req, res) => {
        try { 
            frontpageService.homeourstorylistInfo().then(result => {
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
    deleteourstoryInfo: (req, res) => {
        try {            
            if (req.body.ourstoryId == '' || req.body.ourstoryId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "ourstoryId field is required", "responseData": {} })
            }              
            let ourstoryId = req.body.ourstoryId;
            
            frontpageService.deleteourstoryInfo(ourstoryId).then(result => {
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
    detailsByPageInfo: (req, res) => {
        try {            
            if (req.body.page == '' || req.body.page == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "page field is required", "responseData": {} })
            }
            frontpageService.detailsByPageInfo(req.body).then(result => {
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
    addHealthcareInfo: (req, res) => {
        try {
            if (req.body.title == '' || req.body.title == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "title field is required", "responseData": {} })
            } 
            if (req.body.description == '' || req.body.description == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "description field is required", "responseData": {} })
            } 
              
            let title = req.body.title;
            let description = req.body.description;
            frontpageService.addHealthcareInfo(title,description).then(result => {
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
    editHealthCareInfo: (req, res) => { 
        try {
            if (req.body.healthcareId == '' || req.body.healthcareId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "healthcareId field is required", "responseData": {} })
            }
            if (req.body.title == '' || req.body.title == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "title field is required", "responseData": {} })
            } 
            if (req.body.description == '' || req.body.description == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "description field is required", "responseData": {} })
            }
            if (req.body.status === '' || req.body.status == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "status field is required", "responseData": {} })
            } 
            frontpageService.editHealthCareInfo(req.body).then(result => {
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
    healthCarelistInfo: (req, res) => {
        try {              
            frontpageService.healthCarelistInfo().then(result => {
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
    homeHealthCareListInfo: (req, res) => {
        try { 
            frontpageService.homeHealthCareListInfo().then(result => {
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
    deleteHealthCareInfo: (req, res) => {
        try {            
            if (req.body.healthcareId == '' || req.body.healthcareId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "healthcareId field is required", "responseData": {} })
            }              
            let healthcareId = req.body.healthcareId;
            
            frontpageService.deleteHealthCareInfo(healthcareId).then(result => {
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

    addSolutionsInfo: (req, res) => {
        try {
            if (req.body.title == '' || req.body.title == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "title field is required", "responseData": {} })
            } 
            if (req.body.description == '' || req.body.description == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "description field is required", "responseData": {} })
            } 
            if (req.file == '' || req.file == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "Banner Image field is required", "responseData": {} })
            }   
            let title = req.body.title;
            let description = req.body.description;
            frontpageService.addSolutionsInfo(title,description,req.file).then(result => {
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
    editSolutionsInfo: (req, res) => {
        try {
            if (req.body.solutionId == '' || req.body.solutionId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "solutionId field is required", "responseData": {} })
            }
            if (req.body.title == '' || req.body.title == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "title field is required", "responseData": {} })
            } 
            if (req.body.description == '' || req.body.description == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "description field is required", "responseData": {} })
            }
            if (req.body.status === '' || req.body.status == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "status field is required", "responseData": {} })
            } 
            if (req.file == '' || req.file == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "Banner Image field is required", "responseData": {} })
            }   
            frontpageService.editSolutionsInfo(req.body,req.file).then(result => {
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
    solutionsListInfo: (req, res) => {
        try {              
            frontpageService.solutionsListInfo().then(result => {
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
    homeSolutionsListInfo: (req, res) => {
        try { 
            frontpageService.homeSolutionsListInfo().then(result => {
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
    deleteSolutionsInfo: (req, res) => {
        try {            
            if (req.body.solutionId == '' || req.body.solutionId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "solutionId field is required", "responseData": {} })
            }              
            let solutionId = req.body.solutionId;
            
            frontpageService.deleteSolutionsInfo(solutionId).then(result => {
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
    addMetaDataInfo: (req, res) => {
        try {
            if (req.body.pageId == '' || req.body.pageId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "pageId field is required", "responseData": {} })
            }
            if (req.body.meta_title == '' || req.body.meta_title == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "meta_title field is required", "responseData": {} })
            }  
            if (req.body.meta_description == '' || req.body.meta_description == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "meta_description field is required", "responseData": {} })
            } 
            if (req.body.canonical_tag == '' || req.body.canonical_tag == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "canonical tag field is required", "responseData": {} })
            }
            frontpageService.addMetaDataInfo(req.body).then(result => {
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
    editMetaDataInfo: (req, res) => { 
        try {
            if (req.body.metaDataId == '' || req.body.metaDataId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "metaDataId field is required", "responseData": {} })
            }
            if (req.body.pageId == '' || req.body.pageId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "pageId field is required", "responseData": {} })
            }
            if (req.body.meta_title == '' || req.body.meta_title == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "meta_title field is required", "responseData": {} })
            }  
            if (req.body.meta_description == '' || req.body.meta_description == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "meta_description field is required", "responseData": {} })
            } 
            if (req.body.canonical_tag == '' || req.body.canonical_tag == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "canonical tag field is required", "responseData": {} })
            }
            if (req.body.status === '' || req.body.status == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "status field is required", "responseData": {} })
            } 
            frontpageService.editMetaDataInfo(req.body).then(result => {
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
    metaDataListInfo: (req, res) => {
        try {              
            frontpageService.metaDataListInfo().then(result => {
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
    deleteMetaDataInfo: (req, res) => {
        try {            
            if (req.body.metaDataId == '' || req.body.metaDataId == undefined) {
                return res.json({ responseStatus: 0, responseMsgCode: "metaDataId field is required", "responseData": {} })
            }
            frontpageService.deleteMetaDataInfo(req.body.metaDataId).then(result => {
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
