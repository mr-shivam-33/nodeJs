let {productModel, getPackageModel, getPackagingType}  = require('./product.model');
const mongoose = require('mongoose');
const Q = require('q');

module.exports = {
	deletePackagestype: async (data)=>{		
		var deferred = Q.defer();
		getPackagingType.deleteOne({"_id":mongoose.Types.ObjectId(data.packagingTypeId)}, (err,result) => { 
			if(err){
                let obj = {"status":0,"data":err}
                deferred.resolve(obj)
            } else {
                let obj = {"status":1,"data":result}
                deferred.resolve(obj) 
            }
        });
        return deferred.promise;
    },
	editPackagestype: async (data)=>{		
		var deferred = Q.defer();
		getPackagingType.findOneAndUpdate({"_id":mongoose.Types.ObjectId(data.packagingTypeId)},{"name": data.packagingType, "packageTypeImg": data.packageTypeImg ? data.packageTypeImg : "", "packageTypeDesc": data.packageTypeDesc ? data.packageTypeDesc : ""},{new:true}, (err,result) => { 
			if(err){
                let obj = {"status":0,"data":err}
                deferred.resolve(obj)
            } else {
                let obj = {"status":1,"data":result}
                deferred.resolve(obj) 
            }
        });
        return deferred.promise;
    },
	addPackagestype: async (data)=>{		
		var deferred = Q.defer();
		getPackagingType.create({"name": data.packagingType, "packageTypeImg": data.packageTypeImg ? data.packageTypeImg : "", "packageTypeDesc": data.packageTypeDesc ? data.packageTypeDesc : ""}, (err,result) => { 

			if(err){
                let obj = {"status":0,"data":err}
                deferred.resolve(obj)
            } else {
                let obj = {"status":1,"data":result}
                deferred.resolve(obj) 
            }
        });
        return deferred.promise;
    },
	getPackagingType:  async (data)=>{
        var deferred = Q.defer();		
		getPackagingType.find({}, (err,result) => {         
            if(err){
                let obj = {"status":0,"data":err}
                deferred.resolve(obj)
            } else {
                let obj = {"status":1,"data":result}
                deferred.resolve(obj) 
            }
        });
        return deferred.promise;
    },
	findUserName:(data) => {   
        var deferred = Q.defer();			
		getPackageModel.findOne({"name":data.name}, (err, findResult) => {
			if(findResult != null){				
				deferred.resolve({"status":0})              
            } else {
				deferred.resolve({"status":1})				
			}
        });		
        return deferred.promise;
    },
	addPackages: async (data)=>{
        var deferred = Q.defer();
		
		var count = await getPackageModel.count();
		
		data.serialNumber = count
		
		getPackageModel.create(data, (err,result) => {         
            if(err){
                let obj = {"status":0,"data":err}
                deferred.resolve(obj)
            } else {
                let obj = {"status":1,"data":result.name}
                deferred.resolve(obj) 
            }
        });
        return deferred.promise;
    },
	getPackages: ()=>{
        var deferred = Q.defer();
        getPackageModel.find({status:1}, (err,result) => {           
            if(err){
                let obj = {"status":0,"data":err}
                deferred.resolve(obj)
            } else {
                let obj = {"status":1,"data":result}
                deferred.resolve(obj) 
            }
        });
        return deferred.promise;
    },
    addProduct: (data)=>{
        var deferred = Q.defer();
        data.companyUserId = data.companyUserId ? mongoose.Types.ObjectId(data.companyUserId) : ""
        productModel.create(data, (err,result) => {           
            if(err){
                let obj = {"status":0,"data":err}
                deferred.resolve(obj)
            } else {
                let obj = {"status":1,"data":result}
                deferred.resolve(obj) 
            }
        });
        return deferred.promise;
    },
    dateFromat:(edate)=>{
        var myDate = new Date(edate);
        var d = myDate.getDate();
        var m =  myDate.getMonth();
        m += 1;  
        var y = myDate.getFullYear();
        var newdate=(y+ "-" + m + "-" + d);
        return newdate;
    },
    list:(data)=>{
        var deferred = Q.defer();        
        productModel.find({"productStatus":"1", "userId": mongoose.Types.ObjectId(data.userId)}, (err, result) => {
            if(err){
                let obj = {"status":0,"data":err}
                deferred.resolve(obj)
            } else {
                let obj = {"status":1,"data":result}
                deferred.resolve(obj)               
            } 
        });
        return deferred.promise;
    },
    getProductByid:(id)=>{
        var deferred = Q.defer();
        productModel.findById(id,(err, result) => {
           if(err){
                let obj = {"status":0,"data":err}
                deferred.resolve(obj)
            } else {
                let obj = {"status":1,"data":result}
                deferred.resolve(obj)
                } 
            });
        return deferred.promise;
    },
    updateProduct:(id,data)=>{
        var deferred = Q.defer();
         productModel.findOneAndUpdate({"_id": mongoose.Types.ObjectId(id), "userId": mongoose.Types.ObjectId(data.userId)},data,{new:true},(err, result) => {
            if(err){
                let obj = {"status":0,"data":err}
                deferred.resolve(obj)
            } else {
                let obj = {"status":1,"data":result}
                deferred.resolve(obj)
            } 
        });
        return deferred.promise;
    },
    deleteProduct:(id,data) =>{
        var deferred = Q.defer();
        productModel.findByIdAndUpdate(id,data,{new:true},(err, result) =>{
           if(err){
                let obj = {"status":0,"data":err}
                deferred.resolve(obj)
            }else{
                let obj = {"status":1,"data":result}
                deferred.resolve(obj)
                } 
            })
        return deferred.promise;
    }
};




