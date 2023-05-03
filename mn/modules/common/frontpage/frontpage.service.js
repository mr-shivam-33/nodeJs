const { bannerInfo,ourPartnerInfo,AboutInfo,TeamInfo,OurStoryInfo,HealthCareInfo,SolutionInfo,PageInfo,SinglePageInfo,MetaInfo } = require('./frontpage.model');
const Q = require('q');
mongoose = require('mongoose');
var config = require('./../../../config.json');
var fs = require('fs');

module.exports = { 
    pagelistInfo: () => {
        var deferred = Q.defer();
        PageInfo.find({},{_id:0,}, (err, result) => {            
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {                
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },
    addPageDetailsInfo: (data) => {
        var deferred = Q.defer();
        SinglePageInfo.create(data, (err, result) => {
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {                
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },
    editPageDetailsInfo: (data,file) => {
        var deferred = Q.defer(); 
        var updateData = {};
        var previousImage = ''; 
        updateData.title = data.title;
        updateData.description = data.description;
        updateData.order = data.order;
        updateData.pageId = data.pageId;
        updateData.status = data.status; 
       
        if (typeof file != 'undefined' || file != null) {
            if (typeof file != 'undefined') {
                if (file.filename) {
                    updateData.image = file.filename;
                }
            }
        } else {
            updateData.image = '';
        }
        SinglePageInfo.findOne({ _id: mongoose.Types.ObjectId(data.pagedetailsId) }, {}, (err, result) => {
            if(result){
                if(updateData.image){
                    previousImage = result.image;
                }
                if(updateData.image==''){
                    delete updateData.image;
                }
                SinglePageInfo.findOneAndUpdate({
                    _id: mongoose.Types.ObjectId(data.pagedetailsId)
                }, updateData, { 'new': true }, (err, result) => {
                    if (err || result == null) {
                        let obj = { "status": 0, "data": err }
                        deferred.resolve(obj)
                    } else {                       
                        if (previousImage) {
                            var fullPath = config.media_path + 'pagesImage/' + previousImage;
                            fs.unlink(fullPath, function (exists) {
                                let obj = { "status": 1, "data": "Records updated successfully." }
                                deferred.resolve(obj);
                            });
                        }else{
                            let obj = { "status": 1, "data": "Records updated successfully." }
                                deferred.resolve(obj);
                        }
                    }
                });
            }
            else{
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            }
        });        
        return deferred.promise;
    },
    pageDetailsListInfo: (data) => {
        var deferred = Q.defer();       
        let objData = {}
        if(data.pageId){
             objData = { "pageId":data.pageId, "status":1}
        }else{
             objData = { "status":1}
        } 
        SinglePageInfo.find(objData,{},{sort:{pageId: 1,order: 1}},(err, result) => {            
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {                
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },
    deletePageDetailsInfo: (pagedetailsId) => {
        var deferred = Q.defer();
        SinglePageInfo.findOne({ _id: mongoose.Types.ObjectId(pagedetailsId) }, {}, (err, result) => {
            if(result){
                let getImage = result.image;
                if(getImage){
                    var fullPath = config.media_path + 'pagesImage/' + getImage;
                    fs.unlink(fullPath, function (exists) {
                        console.log('image has been deleated successfully.')
                    });
                }
                SinglePageInfo.findByIdAndRemove({
                    _id: mongoose.Types.ObjectId(pagedetailsId)
                },(err, result) => {
                    if (err || result == null) {
                        let obj = { "status": 0, "data": err }
                        deferred.resolve(obj)
                    } else {                       
                        let obj = { "status": 1, "data": "'Record deleated successfully." }
                         deferred.resolve(obj);
                    }
                });
            }
            else{
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            }
        });        
        return deferred.promise;
    },
    frontPageListInfo: (data) => {
        var deferred = Q.defer();         
        SinglePageInfo.find({"pageId":data.pageId, "status":1},{_id:0,},{sort:{order: 1}},(err, result) => {            
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {                
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },
    addOurPartner: (data,fileData) => {
        var deferred = Q.defer();
       let image = '';      
        if(fileData!=undefined){
            image = fileData.filename;
        }
        ourPartnerInfo.create({ title: data.title,description: data.description, partnerImage:image }, (err, result) => {
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {                
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },
    editOurPartner: (data,file) => {
        var deferred = Q.defer(); 
        var updateData = {};
        var previousImage = ''; 
        updateData.title = data.title;
        updateData.description = data.description;
        updateData.status = data.status;

        if (typeof file != 'undefined' || file != null) {
            if (typeof file != 'undefined') {
                if (file.filename) {
                    updateData.partnerImage = file.filename;
                }
            }
        } else {
            updateData.partnerImage = '';
        } 
        ourPartnerInfo.findOne({ _id: mongoose.Types.ObjectId(data.partnerId) }, {}, (err, result) => {
            if(result){
                if(updateData.partnerImage){
                    previousImage = result.partnerImage;
                }
                if(updateData.partnerImage==''){
                    delete updateData.partnerImage;
                }
                ourPartnerInfo.findOneAndUpdate({
                    _id: mongoose.Types.ObjectId(data.partnerId)
                }, updateData, { 'new': true }, (err, result) => {
                    if (err || result == null) {
                        let obj = { "status": 0, "data": err }
                        deferred.resolve(obj)
                    } else {                       
                        if (previousImage) {                            
                            var fullPath = config.media_path + 'partnerImage/' + previousImage;
                            fs.unlink(fullPath, function (exists) {
                                let obj = { "status": 1, "data": "Our partner updated successfully." }
                                deferred.resolve(obj);
                            });
                        }else{
                            let obj = { "status": 1, "data": "Our partner updated successfully." }
                            deferred.resolve(obj); 
                        }
                    }
                });
            }
            else{
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            }
        });        
        return deferred.promise;
    },
    partnerListInfo: () => {
        var deferred = Q.defer();
        ourPartnerInfo.find({}, (err, result) => {            
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {                
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },
    deletePartnerInfo: (partnerId) => {
        var deferred = Q.defer();         
        ourPartnerInfo.findOne({ _id: mongoose.Types.ObjectId(partnerId) }, {}, (err, result) => {
            if(result){
                let getImage = result.partnerImage;
                if(getImage){
                    var fullPath = config.media_path + 'partnerImage/' + getImage;
                    fs.unlink(fullPath, function (exists) {
                        console.log('Partner image has been deleated successfully.')
                    });
                }
                ourPartnerInfo.findByIdAndRemove({
                    _id: mongoose.Types.ObjectId(partnerId)
                },(err, result) => {
                    if (err || result == null) {
                        let obj = { "status": 0, "data": err }
                        deferred.resolve(obj)
                    } else {                       
                        let obj = { "status": 1, "data": "'Record deleated successfully." }
                         deferred.resolve(obj);
                    }
                });
            }
            else{
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            }
        });        
        return deferred.promise;
    }, 
    homePartnerListInfo: () => {
        var deferred = Q.defer();
        ourPartnerInfo.find({status:1}, (err, result) => {            
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {                
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },  
    addBannerInfo: (title,fileData) => {
        var deferred = Q.defer();
        let image = '';      
        if(fileData!=undefined){
            image = fileData.filename;
        }
        bannerInfo.create({ title: title, bannerImage:image }, (err, result) => {
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {                
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },
    editBannerInfo: (data,file) => {
        var deferred = Q.defer(); 
        var updateData = {};
        var previousImage = ''; 
        updateData.title = data.title;
        updateData.status = data.status;
        if (typeof file != 'undefined' || file != null) {
            if (typeof file != 'undefined') {
                if (file.filename) {
                    updateData.bannerImage = file.filename;
                }
            }
        } else {
            updateData.bannerImage = '';
        }
        bannerInfo.findOne({ _id: mongoose.Types.ObjectId(data.bannerId) }, {}, (err, result) => {
            if(result){
                if(updateData.bannerImage){
                    previousImage = result.bannerImage;
                }
                if(updateData.bannerImage==''){
                    delete updateData.bannerImage;
                }
                bannerInfo.findOneAndUpdate({
                    _id: mongoose.Types.ObjectId(data.bannerId)
                }, updateData, { 'new': true }, (err, result) => {
                    if (err || result == null) {
                        let obj = { "status": 0, "data": err }
                        deferred.resolve(obj)
                    } else {                       
                        if (previousImage) {
                            var fullPath = config.media_path + 'bannerImage/' + previousImage;
                            fs.unlink(fullPath, function (exists) {
                                let obj = { "status": 1, "data": "Banner updated successfully." }
                                deferred.resolve(obj);
                            });
                        }else{
                            let obj = { "status": 1, "data": "Banner updated successfully." }
                                deferred.resolve(obj);
                        }
                    }
                });
            }
            else{
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            }
        });        
        return deferred.promise;
    },
    bannerListInfo: (data) => {
        var deferred = Q.defer(); 
        bannerInfo.find({}, (err, result) => {            
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {                
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    } ,
    topBannerListInfo: (data) => {
        var deferred = Q.defer(); 
        bannerInfo.find({status:1}, (err, result) => {            
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {                
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },
    deleteBannerInfo: (bannerId) => {
        var deferred = Q.defer();         
        bannerInfo.findOne({ _id: mongoose.Types.ObjectId(bannerId) }, {}, (err, result) => {
            if(result){
                let getImage = result.bannerImage;
                if(getImage){
                    var fullPath = config.media_path + 'bannerImage/' + getImage;
                    fs.unlink(fullPath, function (exists) {
                        console.log('Banner image has been deleated successfully.')
                    });
                }
                bannerInfo.findByIdAndRemove({
                    _id: mongoose.Types.ObjectId(bannerId)
                },(err, result) => {
                    if (err || result == null) {
                        let obj = { "status": 0, "data": err }
                        deferred.resolve(obj)
                    } else {                       
                        let obj = { "status": 1, "data": "'Record deleated successfully." }
                         deferred.resolve(obj);
                    }
                });
            }
            else{
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            }
        });        
        return deferred.promise;
    },
    editAboutHomePage: (data,file) => {
        var deferred = Q.defer();
        var updateData = {};
        var previousImage = ''; 
        updateData.title = data.title;
        updateData.description = data.description;  
        updateData.status = 1;
        updateData.createdAt = Date.now();
        updateData.updatedAt = Date.now();


        if (typeof file != 'undefined' || file != null) {
            if (typeof file != 'undefined') {
                if (file.filename) {
                    updateData.aboutImage = file.filename;
                }
            }
        } else {
            updateData.aboutImage = '';
        } 
        AboutInfo.findOne({ page: data.page }, {}, (err, result) => {
            if(result){
                if(updateData.aboutImage){
                    previousImage = result.aboutImage;
                }
                if(updateData.aboutImage==''){
                    delete updateData.aboutImage;
                }
                AboutInfo.findOneAndUpdate({
                    page: data.page
                }, updateData, { 'new': true }, (err, result) => {
                    if (err || result == null) {
                        let obj = { "status": 0, "data": err }
                        deferred.resolve(obj)
                    } else {                       
                        if (previousImage) {                            
                            var fullPath = config.media_path + 'aboutImage/' + previousImage;
                            fs.unlink(fullPath, function (exists) {
                                let obj = { "status": 1, "data": "Record updated successfully." }
                                deferred.resolve(obj);
                            });
                        }else{
                            let obj = { "status": 1, "data": "Record updated successfully." }
                            deferred.resolve(obj); 
                        }
                    }
                });
            }
            else{
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            }
        });        
        return deferred.promise;
    },    
    addOurTeamInfo: (data,fileData) => {
        var deferred = Q.defer();
        TeamInfo.create(data, (err, result) => {
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {                
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },
    editOurTeamInfo: (data,file) => {
        var deferred = Q.defer(); 
        var updateData = {};
        var previousImage = ''; 
        updateData.name = data.name;
        updateData.designation = data.designation;
        updateData.order = data.order;
        updateData.layer = data.layer;
        updateData.linkedIUrl = data.linkedIUrl;
        updateData.status = data.status; 
        updateData.leadership = data.leadership;        

        if (typeof file != 'undefined' || file != null) {
            if (typeof file != 'undefined') {
                if (file.filename) {
                    updateData.teamImage = file.filename;
                }
            }
        } else {
            updateData.teamImage = '';
        }
        TeamInfo.findOne({ _id: mongoose.Types.ObjectId(data.teamId) }, {}, (err, result) => {
            if(result){
                if(updateData.teamImage){
                    previousImage = result.teamImage;
                }
                if(updateData.teamImage==''){
                    delete updateData.partnerImage;
                }
                TeamInfo.findOneAndUpdate({
                    _id: mongoose.Types.ObjectId(data.teamId)
                }, updateData, { 'new': true }, (err, result) => {
                    if (err || result == null) {
                        let obj = { "status": 0, "data": err }
                        deferred.resolve(obj)
                    } else {                       
                        if (previousImage) {
                            var fullPath = config.media_path + 'teamImage/' + previousImage;
                            fs.unlink(fullPath, function (exists) {
                                let obj = { "status": 1, "data": "Team member updated successfully." }
                                deferred.resolve(obj);
                            });
                        }else{
                            let obj = { "status": 1, "data": "Team member updated successfully." }
                                deferred.resolve(obj);
                        }
                    }
                });
            }
            else{
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            }
        });        
        return deferred.promise;
    },
    ourTeamListInfo: (data) => {
        var deferred = Q.defer(); 
        TeamInfo.find({}, (err, result) => {            
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {                
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    } ,
    homePageOurTeamListInfo: (data) => {
        var deferred = Q.defer(); 
        TeamInfo.find({status:1}, (err, result) => {            
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {                
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },
    deleteTeamInfo: (teamId) => {
        var deferred = Q.defer();         
        TeamInfo.findOne({ _id: mongoose.Types.ObjectId(teamId) }, {}, (err, result) => {
            if(result){
                let getImage = result.teamImage;
                if(getImage){
                    var fullPath = config.media_path + 'teamImage/' + getImage;
                    fs.unlink(fullPath, function (exists) {
                        console.log('Team image has been deleated successfully.')
                    });
                }
                TeamInfo.findByIdAndRemove({
                    _id: mongoose.Types.ObjectId(teamId)
                },(err, result) => {
                    if (err || result == null) {
                        let obj = { "status": 0, "data": err }
                        deferred.resolve(obj)
                    } else {                       
                        let obj = { "status": 1, "data": "'Record deleated successfully." }
                         deferred.resolve(obj);
                    }
                });
            }
            else{
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            }
        });        
        return deferred.promise;
    }, 
    leaderShipListInfo: (data) => {
        var deferred = Q.defer(); 
        TeamInfo.find({leadership:1}, (err, result) => {            
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {                
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    } ,
    aboutCategoryList: (data) => {
        var deferred = Q.defer(); 
        AboutInfo.find({page:"category"}, (err, result) => {            
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {                
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    } ,
    editAboutCategory: (data,file) => {
        var deferred = Q.defer();
        var updateData = {};
        var previousImage = ''; 
        updateData.title = data.title;
        updateData.description = data.description;        

        if (typeof file != 'undefined' || file != null) {
            if (typeof file != 'undefined') {
                if (file.filename) {
                    updateData.aboutImage = file.filename;
                }
            }
        } else {
            updateData.aboutImage = '';
        } 
        AboutInfo.findOne({ _id: mongoose.Types.ObjectId(data.categoryId) }, {}, (err, result) => {
            if(result){
                if(updateData.aboutImage){
                    previousImage = result.aboutImage;
                }
                if(updateData.aboutImage==''){
                    delete updateData.aboutImage;
                }
                AboutInfo.findOneAndUpdate({
                    _id: mongoose.Types.ObjectId(data.categoryId)
                }, updateData, { 'new': true }, (err, result) => {
                    if (err || result == null) {
                        let obj = { "status": 0, "data": err }
                        deferred.resolve(obj)
                    } else {                       
                        if (previousImage) {                            
                            var fullPath = config.media_path + 'aboutImage/' + previousImage;
                            fs.unlink(fullPath, function (exists) {
                                let obj = { "status": 1, "data": "Record updated successfully." }
                                deferred.resolve(obj);
                            });
                        }else{
                            let obj = { "status": 1, "data": "Record updated successfully." }
                            deferred.resolve(obj); 
                        }
                    }
                });
            }
            else{
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            }
        });        
        return deferred.promise;
    }, 
    addourstoryInfo: (title,description,fileData) => {
        var deferred = Q.defer();
        let image = '';      
        if(fileData!=undefined){
            image = fileData.filename;
        }
        OurStoryInfo.create({ title: title, description: description, ourstoryImage:image }, (err, result) => {
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {                
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },
    editourstoryInfo: (data,file) => {
        var deferred = Q.defer(); 
        var updateData = {};
        var previousImage = ''; 
        updateData.title = data.title;
        updateData.description = data.description;
        updateData.status = data.status;
        if (typeof file != 'undefined' || file != null) {
            if (typeof file != 'undefined') {
                if (file.filename) {
                    updateData.ourstoryImage = file.filename;
                }
            }
        } else {
            updateData.ourstoryImage = '';
        }
        OurStoryInfo.findOne({ _id: mongoose.Types.ObjectId(data.ourstoryId) }, {}, (err, result) => {
            if(result){
                if(updateData.ourstoryImage){
                    previousImage = result.ourstoryImage;
                }
                if(updateData.ourstoryImage==''){
                    delete updateData.ourstoryImage;
                }
                OurStoryInfo.findOneAndUpdate({
                    _id: mongoose.Types.ObjectId(data.ourstoryId)
                }, updateData, { 'new': true }, (err, result) => {
                    if (err || result == null) {
                        let obj = { "status": 0, "data": err }
                        deferred.resolve(obj)
                    } else {                       
                        if (previousImage) {
                            var fullPath = config.media_path + 'ourstoryImage/' + previousImage;
                            fs.unlink(fullPath, function (exists) {
                                let obj = { "status": 1, "data": "Our Story updated successfully." }
                                deferred.resolve(obj);
                            });
                        }else{
                            let obj = { "status": 1, "data": "Our Story updated successfully." }
                                deferred.resolve(obj);
                        }
                    }
                });
            }
            else{
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            }
        });        
        return deferred.promise;
    },
    ourstorylistInfo: () => {
        var deferred = Q.defer(); 
        OurStoryInfo.find({}, (err, result) => {            
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {                
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    } ,
    homeourstorylistInfo: () => {
        var deferred = Q.defer(); 
        OurStoryInfo.find({status:1}, (err, result) => {            
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {                
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },
    deleteourstoryInfo: (ourstoryId) => {
        var deferred = Q.defer();
        OurStoryInfo.findOne({ _id: mongoose.Types.ObjectId(ourstoryId) }, {}, (err, result) => {
            if(result){
                let getImage = result.ourstoryImage;
                if(getImage){
                    var fullPath = config.media_path + 'ourstoryImage/' + getImage;
                    fs.unlink(fullPath, function (exists) {
                        console.log('Our Story image has been deleated successfully.')
                    });
                }
                OurStoryInfo.findByIdAndRemove({
                    _id: mongoose.Types.ObjectId(ourstoryId)
                },(err, result) => {
                    if (err || result == null) {
                        let obj = { "status": 0, "data": err }
                        deferred.resolve(obj)
                    } else {                       
                        let obj = { "status": 1, "data": "'Record deleated successfully." }
                         deferred.resolve(obj);
                    }
                });
            }
            else{
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            }
        });        
        return deferred.promise;
    },
    detailsByPageInfo: (data) => {
        var deferred = Q.defer();
        AboutInfo.findOne({ page: data.page }, {}, (err, result) => {
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj);
            }
        });
        return deferred.promise;
    },
    addHealthcareInfo: (title,description) => {
        var deferred = Q.defer();        
        HealthCareInfo.create({ title: title, description: description }, (err, result) => {
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {                
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },
    editHealthCareInfo: (data, file) => {
        var deferred = Q.defer();
        var updateData = {};
        updateData.title = data.title;
        updateData.description = data.description;
        updateData.status = data.status;
        HealthCareInfo.findOneAndUpdate({
            _id: mongoose.Types.ObjectId(data.healthcareId)
        }, updateData, { 'new': true }, (err, result) => {
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {
                let obj = { "status": 1, "data": "HealthCare updated successfully." }
                deferred.resolve(obj);
            }

        });
        return deferred.promise;
    },
    healthCarelistInfo: () => {
        var deferred = Q.defer(); 
        HealthCareInfo.find({}, (err, result) => {            
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {                
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    } ,
    homeHealthCareListInfo: () => {
        var deferred = Q.defer(); 
        HealthCareInfo.find({status:1}, (err, result) => {            
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {                
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },
    deleteHealthCareInfo: (healthcareId) => {
        var deferred = Q.defer();
        HealthCareInfo.findByIdAndRemove({
            _id: mongoose.Types.ObjectId(healthcareId)
        },(err, result) => {
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {                       
                let obj = { "status": 1, "data": "'Record deleated successfully." }
                 deferred.resolve(obj);
            }
        });       
        return deferred.promise;
    },
    addSolutionsInfo: (title,description,fileData) => {
        var deferred = Q.defer();
        let image = '';      
        if(fileData!=undefined){
            image = fileData.filename;
        }
        SolutionInfo.create({ title: title, description: description, solutionImage:image }, (err, result) => {
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {                
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },
    editSolutionsInfo: (data,file) => {
        var deferred = Q.defer(); 
        var updateData = {};
        var previousImage = ''; 
        updateData.title = data.title;
        updateData.description = data.description;
        updateData.status = data.status;
        if (typeof file != 'undefined' || file != null) {
            if (typeof file != 'undefined') {
                if (file.filename) {
                    updateData.solutionImage = file.filename;
                }
            }
        } else {
            updateData.solutionImage = '';
        }
        SolutionInfo.findOne({ _id: mongoose.Types.ObjectId(data.solutionId) }, {}, (err, result) => {
            if(result){
                if(updateData.solutionImage){
                    previousImage = result.solutionImage;
                }
                if(updateData.solutionImage==''){
                    delete updateData.solutionImage;
                }
                SolutionInfo.findOneAndUpdate({
                    _id: mongoose.Types.ObjectId(data.solutionId)
                }, updateData, { 'new': true }, (err, result) => {
                    if (err || result == null) {
                        let obj = { "status": 0, "data": err }
                        deferred.resolve(obj)
                    } else {                       
                        if (previousImage) {
                            var fullPath = config.media_path + 'solutionImage/' + previousImage;
                            fs.unlink(fullPath, function (exists) {
                                let obj = { "status": 1, "data": "Solution updated successfully." }
                                deferred.resolve(obj);
                            });
                        }else{
                            let obj = { "status": 1, "data": "Solution updated successfully." }
                                deferred.resolve(obj);
                        }
                    }
                });
            }
            else{
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            }
        });        
        return deferred.promise;
    },
    solutionsListInfo: () => {
        var deferred = Q.defer(); 
        SolutionInfo.find({}, (err, result) => {            
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {                
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    } ,
    homeSolutionsListInfo: () => {
        var deferred = Q.defer(); 
        SolutionInfo.find({status:1}, (err, result) => {            
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {                
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },
    deleteSolutionsInfo: (solutionId) => {
        var deferred = Q.defer();
        SolutionInfo.findOne({ _id: mongoose.Types.ObjectId(solutionId) }, {}, (err, result) => {
            if(result){
                let getImage = result.solutionImage;
                if(getImage){
                    var fullPath = config.media_path + 'solutionImage/' + getImage;
                    fs.unlink(fullPath, function (exists) {
                        console.log('Solution image has been deleated successfully.')
                    });
                }
                SolutionInfo.findByIdAndRemove({
                    _id: mongoose.Types.ObjectId(solutionId)
                },(err, result) => {
                    if (err || result == null) {
                        let obj = { "status": 0, "data": err }
                        deferred.resolve(obj)
                    } else {                       
                        let obj = { "status": 1, "data": "'Record deleated successfully." }
                         deferred.resolve(obj);
                    }
                });
            }
            else{
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            }
        });        
        return deferred.promise;
    },
    addMetaDataInfo: (data) => {
        var deferred = Q.defer();        
        MetaInfo.create({ pageId: data.pageId, meta_title: data.meta_title,meta_description: data.meta_description, canonical_tag: data.canonical_tag }, (err, result) => {
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {                
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },
    editMetaDataInfo: (data) => {
        var deferred = Q.defer();
        var updateData = {};
        updateData.pageId = data.pageId;
        updateData.meta_title = data.meta_title;
        updateData.meta_description = data.meta_description;
        updateData.canonical_tag = data.canonical_tag; 
        updateData.status = data.status;
        MetaInfo.findOneAndUpdate({
            _id: mongoose.Types.ObjectId(data.metaDataId)
        }, updateData, { 'new': true }, (err, result) => {
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {
                let obj = { "status": 1, "data": "Meta data updated successfully." }
                deferred.resolve(obj);
            }

        });
        return deferred.promise;
    },
    metaDataListInfo: () => {
        var deferred = Q.defer(); 
        MetaInfo.find({}, (err, result) => {            
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {                
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    } ,    
    deleteMetaDataInfo: (metaDataId) => {
        var deferred = Q.defer();
        MetaInfo.findByIdAndRemove({
            _id: mongoose.Types.ObjectId(metaDataId)
        },(err, result) => {
            if (err || result == null) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {                       
                let obj = { "status": 1, "data": "'Record deleated successfully." }
                 deferred.resolve(obj);
            }
        });       
        return deferred.promise;
    },
    
};