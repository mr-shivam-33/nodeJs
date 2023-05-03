const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const userVerifySchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId , required: true },
    status: { type: Number },
    userType: { type: Number },  
    registerInfo: [
        {
            companyName: { type: String, required: true },
            address: { type: String, required: true },
            country: { type: String, required: true },
            state: { type: String, required: true },
            city: { type: String, required: true },
            street: { type: String, required: true },
            contactNo: { type: String, required: true },
            pincode: { type: Number, required: true },
            addressType: { type: Number, required: true },
            status: { type: Number, default:1 }
        }
    ],
    factoryInfo: {type:Array},
    cinNo: {type:String},
    gstIn: {type:String},
    panNo: {type:String},
    citanNo: {type:String},
    verified: { type: Number, default:0 }
});

const UserInfoSchema = new Schema({
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
    referredBy:{type:String,default:""},
    loginAs:{type:String,default:"5"},
    permissionTypes:{type:String,default:""},
	status:{type:Number,default:1},
    databaseName:{type:String,default:""},
    userSlug:{type:String,default:""},    
    userRelation:{type:Array, default:[]},
	createdAt: {type: Date, default:Date.now}, 
    updatedAt:{type: Date, default:Date.now}
});

const userVerifyInfo = mongoose.model("userVerifyInfo", userVerifySchema, 'tbl_company_info');
const UserInfo = mongoose.model("UserInfo", UserInfoSchema, 'tbl_user');

module.exports = { userVerifyInfo,UserInfo}

