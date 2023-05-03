'use strict';
const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,default:''},
    email : {
		type: String,
		required:true,
		unique: true,
		sparse: true
	},
    countryCode:{type:String,required:true},
    mobile:{
		type:Number,
		required:true,
		unique: true,
		sparse: true
	},
	permissions:{type:String,default:'all'},
	companyUserId:{type:String,default:''},
    userType:{type:String,default:"admin"},
    hash:{type:String,required:true},   
    sessionToken:{type:String,required:true},
    uniqueId:{type:String,required:true},
    loginAs:{type:String,default:""},
    permissionTypes:{type:String,default:""},
	status:{type:Number,default:1},
	createdAt: {type: Date, default:Date.now}, 
    updatedAt:{type: Date, default:Date.now}
});

const emailUser = mongoose.model("emailUser", userSchema, 'tbl_user');

// Exporting our model objects
module.exports = {emailUser}
