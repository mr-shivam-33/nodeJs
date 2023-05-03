'use strict';
const mongoose = require('mongoose');
const  Schema = mongoose.Schema;
const userAssignDataBaseSchema = new Schema({	
	userRelation:{type:Array,default:[]},   
    updateDate:{type: Date, default: Date.now}
});
const userAssignDataBase = mongoose.model("userAssignDataBase", userAssignDataBaseSchema, 'tbl_user');
// Exporting our model objects
module.exports = {userAssignDataBase}

