'use strict';
const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

// 0 => Assiging 1 => Processing 2 => Reached 3 => Deliverd
const factotrySchema = new Schema({
	productId:{type:Schema.Types.ObjectId,required:true},
	userId:{type:Schema.Types.ObjectId,required:true},
	fdalebelId:{type:Schema.Types.ObjectId,required:true},
    assignContainerByFactoryIds:{type:Array,default:[]},
	deliveryStatus:{type:Number,default:0},
    status:{type:Number,default:1},
    createdDate:{type: Date, default: Date.now},
    updateDate:{type: Date, default: Date.now}
});

const orderSchema = new Schema({
	productId:{type:Schema.Types.ObjectId,required:true},
	userId:{type:Schema.Types.ObjectId,required:true},
	fdalebelId:{type:Schema.Types.ObjectId,required:true},
    invoiceNumber:{type:String,required:true},
    purchaseOrderNo:{type:Number,required:true},
    overDueDays:{type:String,required:true},
    dueDate:{type:String,required:true},
    paymentType:{type:String,required:true},
    paymentStatus:{type:Number},
    totalNfts:{type:String,required:true},
    totalPriceUSD:{type:Number,required:true},
    totalPriceINR:{type:Number,required:true},
    flatDiscount:{type:Number,default:0},
    priceUSDType:{type:String,required:true},
    priceINRType:{type:String,required:true},
    createdDate:{type: Date, default: Date.now},
    updateDate:{type: Date, default: Date.now}  
});

const metaSchema = new Schema({
    productId:{type:Schema.Types.ObjectId,required:true},
    userId:{type:Schema.Types.ObjectId,required:true},
    container:{type:Array,default:[]},
    pallets:{type:Array,default:[]},
    masterCartons:{type:Array,default:[]},
    innerCartons:{type:Array,default:[]},
    drugs:{type:Array,default:[]},
    status:{type:String,default:1},
    totalNfts:{type:String,required:true},
    packageType:{type:String,required:true},
    totalPriceUSD:{type:Number,required:true},
    totalPriceINR:{type:Number,required:true},
    flatDiscount:{type:Number,default:0},
    createdDate:{type: Date, default: Date.now},
    updateDate:{type: Date, default: Date.now}
});

const invoiceNewSchema = new Schema({
    productId:{type:Schema.Types.ObjectId,required:true},
	userId:{type:Schema.Types.ObjectId,required:true},
	fdalebelId:{type:Schema.Types.ObjectId,required:true},
    invoiceNumber:{type:String,required:true},
    purchaseOrderNo:{type:Number,required:true},
    overDueDays:{type:String,required:true},
    dueDate:{type:String,required:true},
    paymentType:{type:String,required:true},
    paymentStatus:{type:Number},
    totalNfts:{type:String,required:true},
    totalPriceUSD:{type:Number,required:true},
    totalPriceINR:{type:Number,required:true},
    flatDiscount:{type:Number,default:0},
    priceUSDType:{type:String,required:true},
    priceINRType:{type:String,required:true},
    createdDate:{type: Date, default: Date.now},
    updateDate:{type: Date, default: Date.now},
    generatedNftStatus:{ type: Number }
});

const assignContainerByFactoryIdsSchema = new Schema({
    productId: {type:Schema.Types.ObjectId,required:true},
    userId: {type:Schema.Types.ObjectId,required:true},
    fdalebelId: {type:Schema.Types.ObjectId,required:true},
	factotryId: {type:Schema.Types.ObjectId,required:true},
    container: { type: Array },
	status: {type:String,default:1},
});

const getNftsSchema_old = new Schema({
    productId: {type:Schema.Types.ObjectId,required:true},
    userId: {type:Schema.Types.ObjectId,required:true},
    fdalebelId: {type:Schema.Types.ObjectId,required:true},
    container: { type: Array },
	factoryId:{type:Schema.Types.ObjectId},
	assignContainerStatus:{type: Number,default:1},
    status:{type:Number,default:1}
});

const getNftsSchema = new Schema({
    productId: {type:Schema.Types.ObjectId,required:true},
    userId: {type:Schema.Types.ObjectId,required:true},
    fdalebelId: {type:Schema.Types.ObjectId,required:true},
    assignContainerStatus: {type: Number,default:1},
    assignContainerByFactoryIds: { type: Array },
	factoryId:{type:Schema.Types.ObjectId},
    status:{type:Number,default:1},
    createdDate:{type: Date, default: Date.now},
    updateDate:{type: Date, default: Date.now}
});

const getRegisterSchema = new Schema({    
    companyUserId: {type: String,default:''},
    relationUserId: {type: Array,default:''},
    familyRelation:{type: String},
    userName:{type: String, required:true, unique: true, sparse: true},
    firstName:{type:String,required:true},
    lastName:{type:String,default:''},
    email : {type: String, required:true, unique: true, sparse: true},    
    image: { type: String},
    role:{type:String},
    permissions:{type:String,default:"1"},
    hash:{type:String,required:true},
    userType:{type:String,required:true},
    sessionToken:{type:String,required:true},
    uniqueId:{type:String,required:true},
    status:{type:Number, default:1, required:true},
    permissionTypes:{type:String, default:"1"},
	loginAs:{type:String,default:""},
    memberRegisterStatus:{type:Number},
    userStatusDelete:{type:Number},
    createdAt: {type: Date, default:Date.now}, 
    updatedAt:{type: Date, default:Date.now},
    dateOfBirth:{type: Date }, 
    gender:{ type: String},
    contactEmailId:{ type: String},
    mobile:{type:String},
    contactAltEmailId:{ type: String},
    contactAltMobile:{type:String},
    age:{type:Number},
    weight:{ type: String},
    height:{ type: String},
    bloodGroup:{ type: String},
    pasthistory:{ type: String},
    Address:{ type: String},
    streetOrArea:{ type: String},
    country:{ type: String},
    state:{ type: String},
    city:{ type: String},
    pincode:{ type: Number},
    language:{ type: String}
});

const assignContainerToOthersSchema = new Schema({
    productId: {type:Schema.Types.ObjectId,required:true},
    userId: {type:Schema.Types.ObjectId,required:true},
    fdalebelId: {type:Schema.Types.ObjectId,required:true},
	assignContainerStatus:{type: Number,default:2},
    assignContainerToOthersIds: { type: Array },
	manufacturerId:{type:Schema.Types.ObjectId},
    status:{type:Number,default:1},
    userType:{type:Number},
    createdDate:{type: Date, default: Date.now},
    updateDate:{type: Date, default: Date.now}
});


const ipfsVerifySchema = new Schema({
	userId:{type:Schema.Types.ObjectId,required:true},
	ipfsHash:{type:String},
    nftTokenId:{type:String, default:""},
    nftTransactionHash:{type:String, default:""},
	fdaId:{type:Schema.Types.ObjectId,required:true},
    nftVerifyByUserId:{type:Array, default:[]},
    userType:{type:String, default:""},
    nftBurnByUserId:{type:String, default:""},
    nftBurnTransactionHash:{type:String, default:""},
	
    nftVerifyByUserIdDate:{type: Date},
    nftBurnByUserIdDate:{type: Date},

    nftVerifyUserFlag:{type:Number, default:0}, // 0 : No Flag, 1: Correct User Flag, 2: Not Correct User Flag
	
	
	data:{type:Object,default:{}},
	status:{type:Number,default:1},
    createdDate:{type: Date, default: Date.now},
    updateDate:{type: Date, default: Date.now}
});

const getFactoryInfoSchema = new Schema({   
    userId: { type: mongoose.Schema.Types.ObjectId , required: true },
    status: { type: Number, default:1 }, 
    userType: { type: Number },  
    factoryInfo: [
        {
            factoryName: { type: String, required: true },
            address: { type: String, required: true },
            country: { type: String, required: true },
            manufacturerBYId: { type: Schema.Types.ObjectId, default:"" },
            state: { type: String, required: true },
            city: { type: String, required: true },
            street: { type: String, required: true },
            contactNo: { type: String, required: true },
            pincode: { type: Number, required: true },
            status: { type: Number, default:1 }
        }
    ]
});

const saveNftsDataSchema = new Schema({
	userId:{type:Schema.Types.ObjectId,required:true},
	ipfsHash:{type:String},
	nftTokenId:{type:String},
	nftTransactionHash:{type:String},
	fdaId:{type:Schema.Types.ObjectId,required:true},
	data:{type:Object},
	nftBurnByUserId:{type:String, default:""},
	nftVerifyByUserId:{type:Array},
	nftSaveUserId:{type:String, default:""},
	palletsCount:{type:Number, default:0},
	userType:{type:String},
    status:{type:Number,default:1},
    createdDate:{type: Date, default: Date.now},
    updateDate:{type: Date, default: Date.now}
});

const saveNftsPalletsDataSchema = new Schema({	
	containerIpfs:{type:String,required:true},
	userId:{type:Schema.Types.ObjectId,required:true},
	ipfsHash:{type:String},
	nftTokenId:{type:String},
	nftTransactionHash:{type:String},
	fdaId:{type:Schema.Types.ObjectId,required:true},
	data:{type:Object},
	nftBurnByUserId:{type:String, default:""},
	nftVerifyByUserId:{type:Array},
	nftSaveUserId:{type:String, default:""},
	masterCartonsCount:{type:Number, default:0},
	userType:{type:String},
    status:{type:Number,default:1},
    createdDate:{type: Date, default: Date.now},
    updateDate:{type: Date, default: Date.now}
});

const saveNftsMastersDataSchema = new Schema({
	palletIpfs:{type:String,required:true},
	userId:{type:Schema.Types.ObjectId,required:true},
	ipfsHash:{type:String},
	nftTokenId:{type:String},
	nftTransactionHash:{type:String},
	fdaId:{type:Schema.Types.ObjectId,required:true},
	data:{type:Object},
	nftBurnByUserId:{type:String, default:""},
	nftVerifyByUserId:{type:Array},
	nftSaveUserId:{type:String, default:""},
	innerCartonsCount:{type:Number, default:0},
	userType:{type:String},
    status:{type:Number,default:1},
    createdDate:{type: Date, default: Date.now},
    updateDate:{type: Date, default: Date.now}
});

const saveNftsInnersDataSchema = new Schema({
	masterCartoonsIpfs:{type:String,required:true},
	userId:{type:Schema.Types.ObjectId,required:true},
	ipfsHash:{type:String},
	nftTokenId:{type:String},
	nftTransactionHash:{type:String},
	fdaId:{type:Schema.Types.ObjectId,required:true},
	data:{type:Object},
	nftBurnByUserId:{type:String, default:""},
	nftVerifyByUserId:{type:Array},
	nftSaveUserId:{type:String, default:""},
	drugsCount:{type:Number, default:0},
	userType:{type:String},
    status:{type:Number,default:1},
    createdDate:{type: Date, default: Date.now},
    updateDate:{type: Date, default: Date.now}
});

const saveNftsDrugsDataSchema = new Schema({
	innerCartonsIpfs:{type:String,required:true},
	userId:{type:Schema.Types.ObjectId,required:true},
	ipfsHash:{type:String},
	nftTokenId:{type:String},
	nftTransactionHash:{type:String},
	fdaId:{type:Schema.Types.ObjectId,required:true},
	data:{type:Object},
	nftBurnByUserId:{type:String, default:""},
	nftVerifyByUserId:{type:Array},
	nftSaveUserId:{type:String, default:""},
	userType:{type:String},
    status:{type:Number,default:1},
    createdDate:{type: Date, default: Date.now},
    updateDate:{type: Date, default: Date.now}
});

const saveNftsReportDataSchema = new Schema({
	userId:{type:Schema.Types.ObjectId,required:true},
	ipfsHash:{type:String},
	nftTokenId:{type:String},
	nftTransactionHash:{type:String},
	fdaId:{type:Schema.Types.ObjectId,required:true},
	data:{type:Object},
	nftBurnByUserId:{type:String, default:""},
	nftVerifyByUserId:{type:Array},
	nftSaveUserId:{type:String, default:""},
	userType:{type:String},
    status:{type:Number,default:1},
    nftFlagMsg:{type:String},
    createdDate:{type: Date, default: Date.now},
    updateDate:{type: Date, default: Date.now}
});


const ipfsUpdatedVerifySchema = new Schema({
	userId:{type:Schema.Types.ObjectId,required:true},
	ipfsHash:{type:String},
    nftTokenId:{type:String, default:""},
    nftTransactionHash:{type:String, default:""},
	fdaId:{type:Schema.Types.ObjectId,required:true},
    nftVerifyByUserId:{type:Array, default:[]},
    userType:{type:String, default:""},
    nftBurnByUserId:{type:String, default:""},
    nftBurnTransactionHash:{type:String, default:""},
	
    nftVerifyByUserIdDate:{type: Date},
    nftBurnByUserIdDate:{type: Date},

    nftVerifyUserFlag:{type:Number, default:1}, // 0 : No Flag, 1: Correct User Flag, 2: Not Correct User Flag

    nftVerifyLocation:  { type: {type:String}, coordinates: [Number]},
    nftBurnLocation:  { type: {type:String}, coordinates: [Number]},
	
	
	data:{type:Object,default:{}},
	status:{type:Number,default:1},
    createdDate:{type: Date, default: Date.now},
    updateDate:{type: Date, default: Date.now}
});

ipfsUpdatedVerifySchema.index({'nftVerifyLocation': '2dsphere'});
ipfsUpdatedVerifySchema.index({'nftBurnLocation': '2dsphere'});


const saveNftsReportData = mongoose.model("saveNftsReportData", saveNftsReportDataSchema, 'tbl_save_nfts_reports');
const saveNftsDataInChain = mongoose.model("saveNftsDataInChain", saveNftsDataSchema, 'tbl_save_nfts_container');
const saveNftsPalletsInChain = mongoose.model("saveNftsPalletsInChain", saveNftsPalletsDataSchema, 'tbl_save_nfts_pallets');
const saveNftsMastersInChain = mongoose.model("saveNftsMastersInChain", saveNftsMastersDataSchema, 'tbl_save_nfts_masterCartons');
const saveNftsInnersDataInChain = mongoose.model("saveNftsInnersDataInChain", saveNftsInnersDataSchema, 'tbl_save_nfts_InnerCartons');
const saveNftsDrugsDataInChain = mongoose.model("saveNftsDrugsDataInChain", saveNftsDrugsDataSchema, 'tbl_save_nfts_Drugs');
const getFactoryInfo = mongoose.model("getFactoryInfo", getFactoryInfoSchema, 'tbl_company_info');
const ipfsUpdatedVerify = mongoose.model("ipfsUpdatedVerify", ipfsUpdatedVerifySchema, 'tbl_blockChainUpdatedIpfsData');
const ipfsverifydata = mongoose.model("ipfsverifydata", ipfsVerifySchema, 'tbl_blockChainIpfsData');
const assignContainerToOthersData = mongoose.model('assignContainerToOthersData', assignContainerToOthersSchema, 'tbl_assignContainerToOthersById');
const getRegisterData = mongoose.model("getRegisterData", getRegisterSchema, 'tbl_user');
const factoryByContainerSchema = mongoose.model("factoryByContainerSchema", assignContainerByFactoryIdsSchema, 'tbl_order');
const generatedUpdateStatus = mongoose.model("generatedUpdateStatus", invoiceNewSchema, 'tbl_order');
const assignMetaData = mongoose.model("assignMetaData", metaSchema, 'tbl_fdalebelmetadata');
const assignFactotry = mongoose.model('assignFactotry', factotrySchema, 'tbl_assignContainerFactoryById');
const getOrder = mongoose.model("getOrder", orderSchema, 'tbl_order');
const getNftsArray = mongoose.model("getNftsArray", getNftsSchema, 'tbl_nftgeneratenumber');

// Exporting our model objects
module.exports = {assignFactotry,getOrder,assignMetaData, generatedUpdateStatus, factoryByContainerSchema, getNftsArray, getRegisterData, assignContainerToOthersData, ipfsverifydata, getFactoryInfo, saveNftsDataInChain, saveNftsPalletsInChain, saveNftsMastersInChain, saveNftsInnersDataInChain, saveNftsDrugsDataInChain, saveNftsReportData, ipfsUpdatedVerify}