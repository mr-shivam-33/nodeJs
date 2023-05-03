'use strict';
const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const getFactoryInfoSchema = new Schema({   
    userId: { type: mongoose.Schema.Types.ObjectId , required: true },
    status: { type: Number, default:1 }, 
    userType: { type: Number },  
    factoryInfo: [
        {
            factoryName: { type: String, required: true },
            address: { type: String, required: true },
            country: { type: String, required: true },
            manufacturerBYId: { type: Schema.Types.ObjectId, default:"" },
            state: { type: String, required: true },
            city: { type: String, required: true },
            street: { type: String, required: true },
            contactNo: { type: String, required: true },
            pincode: { type: Number, required: true },
            status: { type: Number, default:1 }
        }
    ]
});

const getFactoryInfo = mongoose.model("getFactoryInfo", getFactoryInfoSchema, 'tbl_company_info');

module.exports = {getFactoryInfo}