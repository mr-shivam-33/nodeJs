const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const customCompanyInfoSchema = new Schema({
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

const customUserInfoSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, default: "" },
  email: {type: String,required: true, unique: true, sparse: true},
  countryCode: { type: String, required: true },
  mobile: {type: String, default: "" },  
  permissions: { type: String, default: "all" },
  companyUserId: { type: String, default: "" },
  userType: { type: String, default: "admin" },
  hash: { type: String, required: true },
  sessionToken: { type: String, required: true },
  uniqueId: { type: String, required: true },
  referredBy: { type: String, default: "" },
  loginAs: { type: String, default: "5" },
  permissionTypes: { type: String, default: "" },
  status: { type: Number, default: 1 },
  databaseName: { type: String, default: "" },
  userSlug: { type: String, default: "" },
  userRelation: { type: Array, default: [] },
  sendOtp: { type: Number, default: "" },
  userVerify: { type: Number, default: 0 },
  address: { type: String, default: "" },
  genderSatatus: { type: String, default: "" },
  dob: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


const customUserInfoSchemaNew = new Schema({
    _id:{ type: mongoose.Schema.Types.ObjectId },
    firstName:{type:String,default:''},
    lastName:{type:String,default:''},
    email : {type: String,default:''},
    hash:{type:String,default:''},
    sessionToken:{type:String,default:''},
    uniqueId:{type:String,default:''},
    status:{type:Number, default:1, required:true},    
    memberRegisterStatus:{type:Number,default:''},
    userStatusDelete:{type:Number,default:''},
    createdAt: {type: Date, default:Date.now}, 
    updatedAt:{type: Date, default:Date.now},
    mobile:{type:String},
    loginAs:{type:String},
    countryCode:{type:String},
    userSlug:{type:String,default:""},
	relationUserId: {type: Array, default:[]},
    assignToCustomer:{type: Array, default:[]},
    manufacturerBYId:{type: mongoose.Schema.Types.ObjectId}
  });


module.exports = { customUserInfoSchema,customCompanyInfoSchema, customUserInfoSchemaNew}

