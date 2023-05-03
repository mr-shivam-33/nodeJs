const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const bannerInfoSchema = new Schema({
    title:{type:String,required:true},
    bannerImage:{type:String,default:''},
    status:{type:Number,default:1},   
	createdAt: {type: Date, default:Date.now}, 
    updatedAt:{type: Date, default:Date.now}
});

const ourPartnerSchema = new Schema({
    title:{type:String,required:true},
    partnerImage:{type:String,default:''},
    status:{type:Number,default:1},
    description:{type:String,required:true},   
	createdAt: {type: Date, default:Date.now}, 
    updatedAt:{type: Date, default:Date.now}
});

const aboutSchema = new Schema({
    title:{type:String,required:true},
    aboutImage:{type:String,default:''},
    status:{type:Number,default:1},
    page:{type:String, default:''},
    description:{type:String,required:true},   
	createdAt: {type: Date, default:Date.now}, 
    updatedAt:{type: Date, default:Date.now}
});

const ourTeamSchema = new Schema({
    name:{type:String,required:true},    
    designation:{type:String,required:true},
    teamImage:{type:String,default:''},
    status:{type:Number,default:1},
    order:{type:Number,required:true},
    layer:{type:String,required:true},
    linkedIUrl:{type:String,default:'#'},
    leadership:{type:Number,default:0},
	createdAt: {type: Date, default:Date.now}, 
    updatedAt:{type: Date, default:Date.now}
});

const ourStorySchema = new Schema({
    title:{type:String,required:true},
    description:{type:String,required:true}, 
    ourstoryImage:{type:String,default:''},
    status:{type:Number,default:1},      
	createdAt: {type: Date, default:Date.now}, 
    updatedAt:{type: Date, default:Date.now}
});

const healthCareSchema = new Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},    
    status:{type:Number,default:1},      
	createdAt: {type: Date, default:Date.now}, 
    updatedAt:{type: Date, default:Date.now}
});

const solutionSchema = new Schema({
    title:{type:String,required:true},
    description:{type:String,required:true}, 
    solutionImage:{type:String,default:''},
    status:{type:Number,default:1},      
	createdAt: {type: Date, default:Date.now}, 
    updatedAt:{type: Date, default:Date.now}
});

const pagesListSchema = new Schema({
    pageId:{type:Number,required:true},
    pageName:{type:String,required:true},     
    status:{type:Number,default:1}
});

const singlePageSchema = new Schema({
    pageId:{type:Number,required:true},
    title:{type:String,required:true},
    description:{type:String,required:true}, 
    image:{type:String,default:''},
    order:{type:Number,required:true},
    status:{type:Number,default:1},      
	createdAt: {type: Date, default:Date.now}, 
    updatedAt:{type: Date, default:Date.now}
});

const metaPageSchema = new Schema({
    pageId:{type:Number,required:true},
    meta_title:{type:String,required:true},
    meta_description:{type:String,required:true}, 
    canonical_tag:{type:String,required:true},    
    status:{type:Number,default:1},      
	createdAt: {type: Date, default:Date.now}, 
    updatedAt:{type: Date, default:Date.now}
});




const bannerInfo = mongoose.model("bannerInfo", bannerInfoSchema, 'tbl_banner');
const ourPartnerInfo = mongoose.model("ourPartnerInfo", ourPartnerSchema, 'tbl_ourpartner');
const AboutInfo = mongoose.model("AboutInfo", aboutSchema, 'tbl_aboutus');
const TeamInfo = mongoose.model("TeamInfo", ourTeamSchema, 'tbl_ourteam');
const OurStoryInfo = mongoose.model("OurStoryInfo", ourStorySchema, 'tbl_ourstory');
const HealthCareInfo = mongoose.model("healthCareInfo", healthCareSchema, 'tbl_healthCare');
const SolutionInfo = mongoose.model("solutionInfo", solutionSchema, 'tbl_solution');
const PageInfo = mongoose.model("pageInfo", pagesListSchema, 'tbl_pages');
const SinglePageInfo = mongoose.model("singlePageInfo", singlePageSchema, 'tbl_pagedetails');
const MetaInfo = mongoose.model("metaInfo", metaPageSchema, 'tbl_metadetails');
module.exports = { bannerInfo, ourPartnerInfo, AboutInfo,TeamInfo,OurStoryInfo,HealthCareInfo,SolutionInfo,PageInfo,SinglePageInfo,MetaInfo}

