const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const productSchema = new Schema({
	userId:{type:Schema.Types.ObjectId,required:true},
    companyUserId:{type:String,default:''},
    productName:{type:String,required:true},
    productRating:{ type:Number,default:''},
    productImage:{type:String,default:''},
    productStatus:{type:Number,default:1},
    brandName:{ type:String, required:true },
    manufacturer:{type:String,required:true},
    packagingType:{ type:String, required:true},
    packagingTypeImg:{ type:String, required:true}, 
   packagingDetails:{ type:Array,required:true },
   statusBar:{type:Number,default:1},
   packagingStandard:{type:String,required:true}
});


const userPackageSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId , required: true },
        name:{type:String},
        packageImage:{type:String,default:""},
        serialNumber:{type:Number,default:1},
        priceUSD:{type:Number,default:0.1},
        priceINR:{type:Number,default:0.31},
        priceUSDType:{type:String,default:"USD"},
        priceINRType:{type:String,default:"INR"},
        status:{type:Number,default:1},     
        packageContent:{type:String,default:""}, 
        verified: { type: Number, default:0 },      
        createdDate:{type: Date, default: Date.now},
        updateDate:{type: Date, default: Date.now}
    }
);
const smartContractSchema = new Schema(
    {
        blockChainName:{type:String,required:true},
        accountAddress:{type:String,required:true,max:50},
        userId: { type: Schema.Types.ObjectId },     
        contractAddress:{type:String, default:"",max:50},
        quickNodeURL:{type:String,required:true},
        // mnemonicKey: { type: String, default:'' },
        // privateKey: { type: String, default:'' },
        status:{type:Number,default:1},
        smartStatus: { type: Number, default:0 },
        useStatus: { type: Number, default:0 },         
        createdDate:{type: Date, default: Date.now},
        updateDate:{type: Date, default: Date.now}
    }
);

const smartAssignSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId , required: true },
        productId: { type: Schema.Types.ObjectId },
        smartAssignIds:{type:Array,default:[]},       
        status: { type: Number, default:1 },      
        createdDate:{type: Date, default: Date.now},
        updateDate:{type: Date, default: Date.now}
    }
);

const managePackageSchema = new Schema(
    {        
        packageName:{type:String,default:""},
        serialNumber:{type:String,default:1},
        subscriptionValue:{type:String,default:""},
        subscriptionName:{type:String,default:""},
        price:{type:String,default:""},
        priceType:{type:String,default:""},
        userId: { type: Schema.Types.ObjectId},
        status:{type:String,default:1},
        smartId:{ type: String,default:""},
        smartName:{ type: String, default:""},       
        packageContent:{type:String,default:""},
        comboId:[{ type: Schema.Types.ObjectId }],
        createdDate:{type: Date, default: Date.now},
        updateDate:{type: Date, default: Date.now}
    }
);

const secretManagerSchema = new Schema(
    {
        ClientRequestToken: {type:String, required: true} ,
        Description: {type: String, required:true},
        Name: {type:String, required:true},
        SecretString: {type: String, required: true},
        region: {type: String, required: true}
    }
);
const paymentModeSchema = new Schema({
    overDueDays:{type:String,default:0},
    dueDate:{ type: Date, default: Date.now }, 
    paymentType:{type:String,default:'cash'},
    userId: { type: Schema.Types.ObjectId , required: true },
    status:{type:Number,default:1}
});

const offerModeSchema = new Schema({
    offerName: { type: String },
    offerType: { type: String },
    startDate: { type: Date, default: Date.now },
    EndDate: { type: Date, default: Date.now },    
    productId: { type: Schema.Types.ObjectId , required: true },
    status: { type: Number, default: 1 },
    createdDate: { type: Date, default: Date.now }
});

// managePackageSchema.index({'name': '2dsphere'});


module.exports = {offerModeSchema,paymentModeSchema,secretManagerSchema,managePackageSchema,userPackageSchema,smartContractSchema,smartAssignSchema, productSchema}
