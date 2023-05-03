const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const themeInfoSchema = new Schema({
        userId:{type:Schema.Types.ObjectId,required:true},    
        faviconImage:{type:String},
        dashImag:{type:String},
        logoImage:{type:String},       
        companyName:{type:String,required:true},  
        colorPrimary:{type:String,required:true},  
        colorSecondary:{type:String,required:true},  
        colorWhite:{type:String,required:true},    
        colorBlack:{type:String,required:true},  
        colorText:{type:String,required:true},  
        status:{type:Number,default:1},   
        createdAt: {type: Date, default:Date.now}, 
        updatedAt:{type: Date, default:Date.now}
});

const themeInfo = mongoose.model("themeInfo", themeInfoSchema, 'tbl_theme');
module.exports = { themeInfo }