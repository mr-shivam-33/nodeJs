'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const registerInfoSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId , required: true },
    status: { type: Number, default:1 },
    userType: { type: Number,  required: true },  
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
    ]
});

const factoryInfoSchema = new Schema({   
    userId: { type: mongoose.Schema.Types.ObjectId , required: true },
    status: { type: Number, default:1 }, 
    userType: { type: Number },  
    factoryInfo: [
        {
            factoryName: { type: String, required: true },
            address: { type: String, required: true },
            country: { type: String, required: true },
            state: { type: String, required: true },
            city: { type: String, required: true },
            street: { type: String, required: true },
            contactNo: { type: String, required: true },
            pincode: { type: Number, required: true },
            status: { type: Number, default:1 }
        }
    ]
});


const legalInfoSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId , required: true },
    userType: { type: Number },
    cinNo: { type: String, required: true },
    gstIn: { type: String, required: true },
    panNo: { type: String, required: true },
    tanNo: { type: String, required: true }
});

const bankInfoSchema = new Schema({    
    userId: { type: mongoose.Schema.Types.ObjectId , required: true },
    userType: { type: Number,  required: true },      
    bankInfo: [
        {
            companyName: { type: String, required: true },
            bankName: { type: String, required: true },
            accountNo: { type: String },
            ifscCode: { type: String },
            swiftCode: { type: String },
            iBanNumber: { type: String },
            typeOfAccount: { type: String },
            status: { type: Number, default:1 }
        }
    ]
});

const RegisterInfo = mongoose.model("registerInfo", registerInfoSchema, 'tbl_company_info');
const FactoryInfo = mongoose.model("factoryInfo", factoryInfoSchema, 'tbl_company_info');
const LegalInfo = mongoose.model("legalInfo", legalInfoSchema, 'tbl_company_info');
const BankInfo = mongoose.model("bankInfo", bankInfoSchema, 'tbl_bank_info');



// Exporting our model objects
module.exports = { RegisterInfo, FactoryInfo, LegalInfo, BankInfo}

