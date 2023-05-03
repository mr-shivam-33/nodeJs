const express = require("express");
const router = express.Router();
const frontpageController = require('./frontpage.controller');
const multer  = require('multer');
var config = require('./../../../config.json');


const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, config.media_path + 'bannerImage')
	},
	filename: function (req, file, cb) {
		if ((file.mimetype == 'image/png') || (file.mimetype == 'image/jpeg') || (file.mimetype == 'image/jpg') ) {
			const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
			cb(null, file.fieldname + '-' + uniqueSuffix + '.png')
		}
	}
});
var upload = multer({ storage: storage });

const ourPartner = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, config.media_path + 'partnerImage')
	},
	filename: function (req, file, cb) {
		if ((file.mimetype == 'image/png') || (file.mimetype == 'image/jpeg') || (file.mimetype == 'image/jpg') ) {
			const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
			cb(null, file.fieldname + '-' + uniqueSuffix + '.png')
		}
	}
});
var ourPartnerUpload = multer({ storage: ourPartner });

const ourAbout = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, config.media_path + 'aboutImage')
	},
	filename: function (req, file, cb) {
		if ((file.mimetype == 'image/png') || (file.mimetype == 'image/jpeg') || (file.mimetype == 'image/jpg') ) {
			const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
			cb(null, file.fieldname + '-' + uniqueSuffix + '.png')
		}
	}
});
var ourAboutUpload = multer({ storage: ourAbout });

const ourTeam = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, config.media_path + 'teamImage')
	},
	filename: function (req, file, cb) {
		if ((file.mimetype == 'image/png') || (file.mimetype == 'image/jpeg') || (file.mimetype == 'image/jpg') ) {
			const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
			cb(null, file.fieldname + '-' + uniqueSuffix + '.png')
		}
	}
});
var ourTeamUpload = multer({ storage: ourTeam });



const ourStory = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, config.media_path + 'ourstoryImage')
	},
	filename: function (req, file, cb) {
		if ((file.mimetype == 'image/png') || (file.mimetype == 'image/jpeg') || (file.mimetype == 'image/jpg') ) {
			const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
			cb(null, file.fieldname + '-' + uniqueSuffix + '.png')
		}
	}
});
var ourStoryUpload = multer({ storage: ourStory });

const solutions = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, config.media_path + 'solutionImage')
	},
	filename: function (req, file, cb) {
		if ((file.mimetype == 'image/png') || (file.mimetype == 'image/jpeg') || (file.mimetype == 'image/jpg') ) {
			const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
			cb(null, file.fieldname + '-' + uniqueSuffix + '.png')
		}
	}
});
var solutionsUpload = multer({ storage: solutions });

const pageDetails = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, config.media_path + 'pagesImage')
	},
	filename: function (req, file, cb) {
		if ((file.mimetype == 'image/png') || (file.mimetype == 'image/jpeg') || (file.mimetype == 'image/jpg') ) {
			const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
			cb(null, file.fieldname + '-' + uniqueSuffix + '.png')
		}
	}
});
var pageDetailsUpload = multer({ storage: pageDetails });





router.post("/addbanner",upload.single('bannerImage'),frontpageController.addBannerInfo);
router.post("/editbanner", upload.single('bannerImage'), frontpageController.editBannerInfo);
router.get("/bannerlist", frontpageController.bannerListInfo);
router.post("/deletebanner", frontpageController.deleteBannerInfo);

router.get("/topbannerlist", frontpageController.topBannerListInfo);

router.post("/addpartner",ourPartnerUpload.single('partnerImage'),frontpageController.addOurPartner);
router.post("/editpartner",ourPartnerUpload.single('partnerImage'),frontpageController.editOurPartner);
router.get("/partnerlist", frontpageController.partnerListInfo);
router.post("/deletepartner", frontpageController.deletePartnerInfo);

router.get("/homepartnerlist", frontpageController.homePartnerListInfo);


router.post("/editabouthomepage", ourAboutUpload.single('aboutImage'), frontpageController.editAboutHomePage);
// our Team
router.post("/addourteam",ourTeamUpload.single('teamImage'),frontpageController.addOurTeamInfo);
router.post("/editourteam", ourTeamUpload.single('teamImage'), frontpageController.editOurTeamInfo);
router.get("/ourteamlist", frontpageController.ourTeamListInfo);
router.get("/homeourteamlist", frontpageController.homePageOurTeamListInfo);
router.post("/deleteteam", frontpageController.deleteTeamInfo);
router.get("/leadershiplist", frontpageController.leaderShipListInfo);
router.get("/aboutcategorylist", frontpageController.aboutCategoryList);
router.post("/editaboutcategory", ourAboutUpload.single('aboutImage'), frontpageController.editAboutCategory);

// our story

router.post("/addourstory",ourStoryUpload.single('ourstoryImage'),frontpageController.addourstoryInfo);
router.get("/ourstorylist", frontpageController.ourstorylistInfo);
router.post("/editourstory", ourStoryUpload.single('ourstoryImage'), frontpageController.editourstoryInfo);
router.post("/deleteourstory", frontpageController.deleteourstoryInfo);
router.get("/homeourstorylist", frontpageController.homeourstorylistInfo);

router.post("/front-details-by-page", frontpageController.detailsByPageInfo);


// solutions

router.post("/addsolutions",solutionsUpload.single('solutionImage'),frontpageController.addSolutionsInfo);
router.get("/solutionslist", frontpageController.solutionsListInfo);
router.post("/editsolutions",solutionsUpload.single('solutionImage'), frontpageController.editSolutionsInfo);
router.post("/deletesolutions", frontpageController.deleteSolutionsInfo);
router.get("/homesolutionslist",frontpageController.homeSolutionsListInfo);

router.get("/pagelist",frontpageController.pagelistInfo);
router.post("/addpagedetails",pageDetailsUpload.single('image'),frontpageController.addPageDetailsInfo);
router.post("/editpagedetails",pageDetailsUpload.single('image'),frontpageController.editPageDetailsInfo);
router.post("/pagedetailslist",frontpageController.pageDetailsListInfo);

router.post("/deletepagedetails", frontpageController.deletePageDetailsInfo);

router.post("/front-page-list",frontpageController.frontPageListInfo);


// Healthcare Platform

router.post("/addhealthcare",frontpageController.addHealthcareInfo);
router.get("/healthcarelist", frontpageController.healthCarelistInfo);
router.post("/edithealthcare", frontpageController.editHealthCareInfo);
router.post("/deletehealthcare", frontpageController.deleteHealthCareInfo);
router.get("/homehealthcarelist", frontpageController.homeHealthCareListInfo);

// meta data

router.post("/addmetadata", frontpageController.addMetaDataInfo);
router.post("/editmetadata",frontpageController.editMetaDataInfo);
router.get("/metadatalist",frontpageController.metaDataListInfo);
router.post("/deletemetadata", frontpageController.deleteMetaDataInfo);


module.exports = router;