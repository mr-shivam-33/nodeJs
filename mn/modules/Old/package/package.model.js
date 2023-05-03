'use strict';
const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const packageSchema = new Schema({
    userID:{
        type:Schema.Types.ObjectId,
        required:true
    },
    packageTypeName:{
        type:String,
        required:true
    },
    packageContent:{
        type:String,
        required:true
    },
    packageImage:{
        type:String,
        required:true
    }, 
    createdAt:{
        type:Date,
        required:true
    },
    updateAt:{
        type:Date,
        required:true
    }
    
});
const packageModel = mongoose.model("tbl_packages",packageSchema);
module.exports = packageModel
