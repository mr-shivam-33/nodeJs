const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const managePackageSchema = new Schema(
    {
        name:{type:String,required:true,unique: true, sparse: true},
        packageImg:{type:String,default:""},
        serialNumber:{type:Number,default:1},
        priceUSD:{type:Number,default:0.1},
        priceINR:{type:Number,default:0.31},
        priceUSDType:{type:String,default:"USD"},
        priceINRType:{type:String,default:"INR"},
        status:{type:Number,default:1},
        packageContent:{type:String,default:""},
        comboId:[{ type: Schema.Types.ObjectId }],
        createdDate:{type: Date, default: Date.now},
        updateDate:{type: Date, default: Date.now}
    }
);

// const ManagePackage = mongoose.model("managePackage", managePackageSchema, 'tbl_priceList');
// module.exports = { ManagePackage }
module.exports = { managePackageSchema }
