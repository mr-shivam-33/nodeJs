'use strict';
const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const facbookSchema = new Schema({
    firstName:{type:String,default:""},
    lastName:{type:String,default:""},
	userImg: {type:String,default:""},
    email : {type: String},
    countryCode:{type:String,default:""},
    mobile:{type:String},
    userType:{type:String,default:"admin"},
	permissions:{type:String,default:'all'},
	permissionTypes:{type:String,default:""},
	status:{type:Number,default:1},
	companyUserId:{type:String,default:''},
    fToken:{type:String},   
    sId:{type:String, default:""},   
    sessionToken:{type:String,required:true},
    uniqueId:{type:String,required:true},
	loginAs:{type:String,default:""},
	createdAt: {type: Date, default:Date.now}, 
    updatedAt:{type: Date, default:Date.now}
});

const googleSchema = new Schema({
    firstName:{type:String,default:""},
    lastName:{type:String,default:""},
	userImg: {type:String,default:""},
    email : {type: String},
    countryCode:{type:String,default:""},
    mobile:{type:String},
    userType:{type:String,default:"admin"},
	permissions:{type:String,default:'all'},
	permissionTypes:{type:String,default:""},
	status:{type:Number,default:1},
	companyUserId:{type:String,default:''},
    gToken:{type:String},
	sId:{type:String,default:""},
    sessionToken:{type:String},
    uniqueId:{type:String},
	loginAs:{type:String,default:""},
	createdAt: {type: Date, default:Date.now}, 
    updatedAt:{type: Date, default:Date.now}
});

const appleSchema = new Schema({
    firstName:{type:String,default:""},
    lastName:{type:String,default:""},
	userImg: {type:String,default:""},
    email : {type: String},
    countryCode:{type:String,default:""},
    userType:{type:String,default:"admin"},
    mobile:{type:String},
	permissions:{type:String,default:'all'},
	permissionTypes:{type:String,default:""},
	status:{type:Number,default:1},
	companyUserId:{type:String,default:''},
    iToken:{type:String},
	sId:{type:String,default:""},
    sessionToken:{type:String},
    uniqueId:{type:String},
	loginAs:{type:String,default:""},
	createdAt: {type: Date, default:Date.now}, 
    updatedAt:{type: Date, default:Date.now}
});

const sloginSchema = new Schema({
    firstName:{type:String,default:""},
    lastName:{type:String,default:""},
    userSlug:{type:String,default:""},
    userRelation:{type:Array, default:[]},
    countryCode:{type:String, default:""},
    mobile:{type:String,default:""},
	permissions:{type:String,default:'all'},
	companyUserId:{type:String,default:''},
    userType:{type:String,default:"admin"},
    hash:{type:String,default:""},
    sessionToken:{type:String,default:""},
    uniqueId:{type:String,default:""},
    referredBy:{type:String,default:""},
    loginAs:{type:String,default:"5"},
    permissionTypes:{type:String,default:""},
	status:{type:Number,default:1},
    databaseName:{type:String,default:""},
    email : {
		type: String,
		required:true,
		unique: true,
		sparse: true
	},
    type:{type:String,default:""},
    sendOtp:{type:Number,default:""},
    userVerify:{type:Number,default:0},
	createdAt: {type: Date, default:Date.now}, 
    updatedAt:{type: Date, default:Date.now}
});

const facbook = mongoose.model("facbook", facbookSchema, 'tbl_user');
const google = mongoose.model("google", googleSchema, 'tbl_user');
const apple = mongoose.model("apple", appleSchema, 'tbl_user');
const sloginUser = mongoose.model("sloginUser", sloginSchema, 'tbl_user');

// Exporting our model objects
module.exports = {facbook, google, apple, sloginUser}
