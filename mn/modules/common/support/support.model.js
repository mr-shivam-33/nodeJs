const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const permissionSchema = new Schema(
    {
        userId:{type: Schema.Types.ObjectId},
        pageName:{type:Number,required:true},
        admin:{type:Number,default:0},
        checker:{type:Number,default:0},
        maker:{type:Number,default:0},
        noAccess:{type:String,default:0},        
        status:{type:Number,default:1},        
        createdDate:{type: Date, default: Date.now},
        updateDate:{type: Date, default: Date.now}
    }
);

const supportSchema = new Schema(
    {
        userId:{type: Schema.Types.ObjectId},
        userType:{type: String, default: "admin"},
        ticketId:{type:String},
        subject:{type:String,required:true},
        emailId:{type:String,required:true},
        contactNo:{type:String,required:true},
        priority:{type:String},
        desc:{type:String,required:true},
        fileImage: {type:String},
        status:{type:Number,default:0},       
        createdDate:{type: Date, default: Date.now}        
    }
);

const PerService = mongoose.model("perService", permissionSchema, 'tbl_subadmin_permission');
const supportService = mongoose.model("supportService", supportSchema, 'tbl_support');
module.exports = { PerService,supportService }
