'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userRegisterSchema = new Schema({    
    companyUserId: {type:String,default:''},
    relationUserId: {type:String,default:''},
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
    weightType:{ type: String},
    heightType:{ type: String},
    otherBlood:{ type: String},
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
    language: { type: String },
    profileStepsCompleted: {
        type: Array,
        default:[]  
    },
    profilePoint: { type: Number, default: 0 },
    profilePointUpdateCount: { type: Number, default: 0}
});

const userPermissionSchema = new Schema({
    key: {type: String, required:true},
    value: {type: String, required:true },
   
});

const addressInfoSchema = new Schema({
    userType: { type: String },  
    useraddressInfo: { type: Array, required: true },
    updated: { type: Boolean, default: false },
    useraddressInfo:[
        {
            address: { type: String },
            location: { type: String },
            state: { type: String},
            pin: { type: Number},
            mobile: { type: String},
            status:{type:Number, default:1, required:true}            
        }
    ]
});

const userMemberSchema = new Schema({ 
    relationUserId: {type:String, default:''},
    companyUserId: {type:String,default:''},
    familyRelation:{type: String},   
    firstName:{type:String,required:true},
    lastName:{type:String,default:''},
    email : {type: String, required:true, unique: true, sparse: true},    
    image: { type: String},    
    hash:{type:String,required:true},
    sessionToken:{type:String,required:true},
    uniqueId:{type:String,required:true},
    status:{type:Number, default:1, required:true},    
    memberRegisterStatus:{type:Number},
    userStatusDelete:{type:Number},
    createdAt: {type: Date, default:Date.now}, 
    updatedAt:{type: Date, default:Date.now},
    dateOfBirth:{type: Date }, 
    gender:{ type: String},   
    mobileNo:{type:String},
    loginAs:{type:String},
    manufacturerBYId: { type: mongoose.Schema.Types.ObjectId },
    updated: { type: Boolean, default: false }
    

});

const manufacturerfactoryInfoSchema = new Schema({   
    userId: { type: mongoose.Schema.Types.ObjectId , required: true },
    status: { type: Number, default:1 },
    userType: { type: Number },       
    factoryInfo: [
        {
            factoryName: { type: String, required: true, unique: true, sparse: true },
            manufacturerBYId: { type: mongoose.Schema.Types.ObjectId },           
            companyId: { type: mongoose.Schema.Types.ObjectId },           
            status: { type: Number, default:1 },           
            address: { type: String,default:''  },
            country: { type: String,default:''  },
            state: { type: String,default:'' },
            city: { type: String,default:''  },
            street: { type: String,default:'' },
            contactNo: { type: String, default:'' },
            pincode: { type: Number, default:''}
        }
    ]
});

const contractUserSchema = new Schema({     
    firstName:{type:String,required:true},
    lastName:{type:String,default:''},
    email : {type: String, required:true, unique: true, sparse: true},
    hash:{type:String,required:true},
    sessionToken:{type:String,required:true},
    uniqueId:{type:String,required:true},
    status:{type:Number, default:1, required:true},    
    memberRegisterStatus:{type:Number},
    userStatusDelete:{type:Number},
    createdAt: {type: Date, default:Date.now}, 
    updatedAt:{type: Date, default:Date.now},
    mobileNo:{type:String},
    loginAs:{type:String},
	relationUserId: {type: Array, default:[]},
    assignToCustomer:{type: Array, default:[]},
    manufacturerBYId:{type: mongoose.Schema.Types.ObjectId}

});
const addCustomerSchema = new Schema({ 
    assignToCustomer: {type: Array}
});

const ipfsVerifyByCustomerSchema = new Schema({
	userId:{type:Schema.Types.ObjectId,required:true},
	ipfsHash:{type:String},
    nftTokenId:{type:String, default:""},
    nftTransactionHash:{type:String, default:""},
	fdaId:{type:Schema.Types.ObjectId,required:true},
    nftVerifyByUserId:{type:Array, default:[]},
    userType:{type:String, default:""},
    nftBurnByUserId:{type:String, default:""},
	data:{type:Object,default:{}},
	status:{type:Number,default:1},
    createdDate:{type: Date, default: Date.now},
    updateDate:{type: Date, default: Date.now}
});
 

const ManufacturerInfo = mongoose.model("manufacturerInfo", manufacturerfactoryInfoSchema, 'tbl_company_info');
const ContractUserInfo = mongoose.model("contractUserInfo", contractUserSchema, 'tbl_user');
const UserMemberInfo = mongoose.model("userMemberInfo", userMemberSchema, 'tbl_user');
const UserInfo = mongoose.model("userInfo", userRegisterSchema, 'tbl_user');
const AddressInfo = mongoose.model("addressInfo", addressInfoSchema, 'tbl_user');
const PermissionInfo = mongoose.model("permissionInfo", userPermissionSchema, 'tbl_category_module');
const CustomerInfo = mongoose.model("customerInfo", addCustomerSchema, 'tbl_user');
const CustomerVerifyInfo = mongoose.model("customerVerifyInfo", ipfsVerifyByCustomerSchema, 'tbl_blockChainIpfsData');



// Exporting our model objects
module.exports = { UserInfo, PermissionInfo,AddressInfo,UserMemberInfo,ManufacturerInfo,ContractUserInfo,CustomerInfo,CustomerVerifyInfo}

