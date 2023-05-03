'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userPermissionSchema = new Schema({
    key: {type: String, required:true},
    value: {type: String, required:true },
   
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

module.exports = {userPermissionSchema,ipfsVerifyByCustomerSchema}

