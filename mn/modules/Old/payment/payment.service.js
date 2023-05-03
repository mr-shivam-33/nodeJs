const { PaymentCreadit,MainInfo,GenerateUnique,InsertNumber,PaymentStatusUpdate } = require('./payment.model');
const Q = require('q');
mongoose = require('mongoose');
module.exports = {
    creditPaymentDetails: (data) => {
        var deferred = Q.defer();
        PaymentCreadit.create(data, (err, result) => {
            if (err) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {
                console.log(result.invoiceInfo);
                PaymentStatusUpdate.updateMany({
                    _id: {
                        $in: result.invoiceInfo
                    }
                }, { $set: {paymentStatus: 1 } },(err, result) => {
                   
                    if (result.acknowledged==true) {
                        let obj = { "status": 1, "data": "payment is processing.." }
                        deferred.resolve(obj)
                    } else {
                        let obj = { "status": 0, "data": 'Some internal error.' }
                        deferred.resolve(obj)
                    }
                });               
            }
        });
        return deferred.promise;
    },
    acceptPaymentInfo:(type) => {   
        var deferred = Q.defer();
        MainInfo.find({}, (err, result) => {
            if (err) {
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    },

    // createUniqueNumberByNfts:(data) => {   
        // var deferred = Q.defer();
        // GenerateUnique.findOne({ "_id" : mongoose.Types.ObjectId(data.fdaId) }, (err, result) => {
            // if(result){
                // let noOfContainerNfts = (result.container.length > 0) ? result.container[0].nfts : "";
                // let noOfpalletsNfts = (result.pallets.length > 0) ? result.container[0].totalContainerNfts : "";
                // let noOfmasterCartonsNfts = (result.masterCartons.length > 0) ? result.pallets[0].totalContainerNfts : "";
                // let noOfinnerCartonsNfts = (result.innerCartons.length > 0) ? result.masterCartons[0].totalContainerNfts : "";
                // let noOfdrugsNfts = (result.drugs.length > 0) ? result.innerCartons[0].totalContainerNfts : "";			
                // let fdalData = data.fdaId;
                // let getValue = fdalData.substr(-10,9);
                // let keyValue = getValue+'-MG-';				
				// let container = [];
				// if(noOfContainerNfts >0){					
                    // for(let i=1; i<= noOfContainerNfts; i++){						
                        // let containerInfo = keyValue+'C@'+i
						// let pallets = [];
						// if(noOfpalletsNfts >0){							
							// for(let j=1; j<=noOfpalletsNfts; j++){
								
								// let palletsInfo = keyValue+'C@'+i+'P@'+j
								// let masterCartons = [];
								// if(noOfmasterCartonsNfts >0){
									
									// for(let k=1; k<=noOfmasterCartonsNfts; k++){
										
										// let masterCartonsInfo = keyValue+'C@'+i+'P@'+j+'M@'+k										
										
										// let innerCartons = [];                      
										// if(noOfinnerCartonsNfts >0){
											
											// for(let m=1; m<=noOfinnerCartonsNfts; m++){
												
												// let innerCartonsInfo = keyValue+'C@'+i+'P@'+j+'M@'+k+'I@'+m
												
												// let drugs = [];                      
												// if(noOfdrugsNfts >0){
													
													// for(n=1; n<=noOfdrugsNfts; n++){
														
														// let drugsInfo = keyValue+'C@'+i+'P@'+j+'M@'+k+'I@'+m+'D@'+n
														// drugs.push({"drugsHash":drugsInfo,"status":0});
														
													// }
													
												// }
												
												// innerCartons.push({"innerCartonsHash":innerCartonsInfo,"drugs": drugs,"status":0});
												
											// }       
										// }										
										// masterCartons.push({"masterCartonsHash":masterCartonsInfo, "innerCartons": innerCartons,"status":0});              
										
									// }
								// }
								
								// pallets.push({"palletsHash":palletsInfo, "masterCartons": masterCartons,"status":0});
								
							// }
						// }
						// container.push({"container": [{"containerHash":containerInfo, "pallets":pallets, "status": 0}],"status": 0,"productId": result.productId,"userId": result.userId,"fdalebelId": result._id})
					// }
				// }
				
				// InsertNumber.insertMany(container, (err, resultInsertData) => {
					
					// if (err) {
                        // let obj = { "status": 0, "data": err }
                        // deferred.resolve(obj)
                    // } else {
                        
                        // PaymentStatusUpdate.findOneAndUpdate({fdalebelId:mongoose.Types.ObjectId(data.fdaId)},{$set:{ generatedNftStatus:1 }},{new:true},(err, resultData)=>{
                            // if(err || resultData == null){
                                // let obj = { "status": 0, "data": err }
                                // deferred.resolve(obj)
                            // }else{
                                // let obj = { "status": 1, "data": resultInsertData }
                                // deferred.resolve(obj)
                            // }
                        // });
                        
                    // }
                // }); 

            // }else{
                // let obj = { "status": 0, "data": "No Data found" }
				// deferred.resolve(obj)
            // }
          
        // });
        // return deferred.promise;
    // },
	
	createUniqueNumberByNfts:(data) => {   
        var deferred = Q.defer();
        PaymentStatusUpdate.findOneAndUpdate({fdalebelId:mongoose.Types.ObjectId(data.fdaId)},{$set:{ "generatedNftStatus":1 }},{new:true},(err, resultData)=>{
            if(err || resultData == null){
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            }else{
                let obj = { "status": 1, "data": resultData }
                deferred.resolve(obj)
            }
        });        
        return deferred.promise;
    },

};