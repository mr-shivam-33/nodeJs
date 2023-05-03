const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const adminHistorySchema = new Schema(
    {
        controller:{type:String},
        userAction:{type:String},
        previousData:{type:Object},
        currentData:{type:Object},
        userId:{ type: Schema.Types.ObjectId },
        ipAddress: {type:String},
        status:{type:Number,default:1},       
        createdDate:{type: Date, default: Date.now}        
    }
);
const companyInfoSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId , required: true },
    status: { type: Number, default:1 },
    verified: { type: Number, default:0 },
    userType: { type: Number,  required: true }
});

const subscriptionSchema = new Schema(
    {
        subName: { type: String, required: true },
        subValue: { type: Number },
        status: { type: Number, default: 1 },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    }
);

const subscriptionInfoSchema = mongoose.model("subscriptionInfoSchema", subscriptionSchema, 'tbl_subscription_package_plan');
const AdminHistory = mongoose.model("adminHistory", adminHistorySchema, 'tbl_admin_history');
const companyInfoStatus = mongoose.model("companyInfoStatus", companyInfoSchema, 'tbl_company_info');
module.exports = { AdminHistory,companyInfoStatus,subscriptionInfoSchema }