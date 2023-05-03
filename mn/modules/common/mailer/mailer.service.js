const { emailUser}  = require('./mailer.model');
const Q = require('q');

module.exports = {
	findUserEmailId:(email) => {   
        var deferred = Q.defer();
        User.findOne({ email: email }, (err, result) => {
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
	changePasswordByEmailId:(data) => {   
        var deferred = Q.defer();
		emailUser.findOneAndUpdate({ email: data.email },{"$set": {"hash": data.hash}}, (err, result) => {
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
};