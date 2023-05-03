const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const mainUserInfoSchema = new Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,default:''},
    email : {type: String,required:true,unique: true,sparse: true},
    countryCode:{type:String,required:true},
    mobile:{type:Number,required:true,unique: true,sparse: true},
	permissions:{type:String,default:'all'},	
    userType:{type:String,default:"admin"},
    hash:{type:String,required:true},   
    sessionToken:{type:String,required:true},
    uniqueId:{type:String,required:true},
    loginAs:{type:String,default:""},
    permissionTypes:{type:String,default:""},
	status:{type:Number,default:1},
    userSlug:{type:String,default:""},
	createdAt: {type: Date, default:Date.now}, 
    updatedAt:{type: Date, default:Date.now}
});
const companyInfoSchema = new Schema({
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
    citanNo: {type:String}
});

const MainUserInfo = mongoose.model("mainUserInfo", mainUserInfoSchema, 'tbl_user');
const ComInfo = mongoose.model("comInfo", companyInfoSchema, 'tbl_company_info');

module.exports = { MainUserInfo,ComInfo}
