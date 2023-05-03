const { facbook, google, apple, sloginUser } = require('./socialuser.model');
const Q = require('q');

module.exports = {
	slogin: (data) => {
		var deferred = Q.defer();

		sloginUser.findOne({ email: data.email, userVerify: 1 }, (err, result) => {
			if (err) {
				let obj = { "status": 0, "data": err }
				deferred.resolve(obj)
			} else {

				if(result != null){

					let obj = { "status": 2, "data": result }
					deferred.resolve(obj)

				} else {

					sloginUser.create(data, (err, resultNew) => {            
						if(err){
							let obj = {"status":0,"data":err}
							deferred.resolve(obj)
						} else {
							let obj = {"status":1,"data":resultNew}
							deferred.resolve(obj) 
						}
					});

				}
			}
		});
		return deferred.promise;
	},
	findUserEmailId: (data) => {
		var deferred = Q.defer();

		if (data.status == 1 || data.status == '1') {

			facbook.findOne({ sId: data.sId }, (err, result) => {
				if (err) {
					let obj = { "status": 0, "data": err }
					deferred.resolve(obj)
				} else {
					let obj = { "status": 1, "data": result }
					deferred.resolve(obj)
				}
			});

		} else if (data.status == 2 || data.status == '2') {

			google.findOne({ email: data.email }, (err, result) => {
				if (err) {
					let obj = { "status": 0, "data": err }
					deferred.resolve(obj)
				} else {
					let obj = { "status": 1, "data": result}
					deferred.resolve(obj)
				}
			});

		} else {

			apple.findOne({ email: data.email }, (err, result) => {
				if (err) {
					let obj = { "status": 0, "data": err }
					deferred.resolve(obj)
				} else {
					let obj = { "status": 1, "data": result }
					deferred.resolve(obj)
				}
			});
		}

		return deferred.promise;
	},
	register: async (data) => {
		
		var deferred = Q.defer();

		let obj = {};

		for (let key in data) {
			if (data[key]) {
				obj[key] = data[key];
			}
		}
		

		if (obj.status == 1 || obj.status == '1') {

			obj.fToken = obj.uToken
			delete obj.uToken
			delete obj.status

			facbook.create(obj, (err, result) => {
				if (err) {
					deferred.resolve(err)
				} else {
					result.rstatus = 1
					deferred.resolve(result)
				}
			});
		} else if (obj.status == 2 || obj.status == '2') {
			
			obj.gToken = obj.uToken
			delete obj.uToken
			delete obj.status

			google.create(obj, (err, result2) => {
				if (err) {
					
					deferred.resolve(err)
				} else {
					result2.rstatus = 2
					deferred.resolve(result2)
				}
			});

		} else {


			obj.iToken = obj.uToken
			delete obj.uToken
			delete obj.status

			apple.create(obj, (err, result) => {
				if (err) {
					deferred.resolve(err)
				} else {
					result.rstatus = 3
					deferred.resolve(result)
				}
			});
		}

		return deferred.promise;
	},
	login: async (data) => {
		var deferred = Q.defer();

		let obj = {};

		for (let key in data) {
			if (data[key]) {
				obj[key] = data[key];
			}
		}

		if (obj.status == 1 || obj.status == '1') {
			await facbook.findOneAndUpdate({ sId: obj.sId }, { $set: { "sessionToken": obj.sessionToken, fToken: obj.uToken } });
			facbook.findOne({ sId: obj.sId }, (err, result) => {
				result.rstatus = 1
				deferred.resolve(result)
			});
		} else if (obj.status == 2 || obj.status == '2') {

			await google.findOneAndUpdate({ email: obj.email, sId: obj.sId }, { $set: { "sessionToken": obj.sessionToken, gToken: obj.uToken } });
			google.findOne({ email: obj.email, sId: obj.sId }, (err, result) => {
				result.rstatus = 2
				deferred.resolve(result)
			});
		} else {

			await iToken.findOneAndUpdate({ email: obj.email, sId: obj.sId }, { $set: { "sessionToken": obj.sessionToken, iToken: obj.uToken } });
			apple.findOne({ email: obj.email, sId: obj.sId }, (err, result) => {
				result.rstatus = 3
				deferred.resolve(result)
			});
		}
		return deferred.promise;
	},
	socialLoginRegister: async (data) => {
		var deferred = Q.defer();
		
		if (data.status == 2 || data.status == '2') {
			google.findOne({ sId: data.sId }, (err, result1) => {
				
				if (err) {
					let obj = { "status": 0, "data": err }
					deferred.resolve(obj)
				} else if (result1 == null || result1.length == 0 ) {
					let obj = {};

					for (let key in data) {
						if (data[key]) {
							obj[key] = data[key];
						}
					}
					obj.gToken = obj.uToken
					delete obj.uToken
					delete obj.status

					google.create(obj, (err, result2) => {
						if (err) {
							deferred.resolve(err)
						} else {
							result2.rstatus = 2
							deferred.resolve(result2)
						}
					});
				} else if (result1.length != 0) {
					result1.rstatus = 2
					let objg = { "status": 1, "data": result1 }
					deferred.resolve(objg)
				} 
				
			});
		}
		else if (data.status == 1 || data.status == '1') {
			
			facbook.find({ sId: data.sId }, (err, result1) => {
				
				if (err) {
					let obj = { "status": 0, "data": err }
					deferred.resolve(obj)
				} else if (result1 == null || result1.length == 0) {
					let obj = {};
					
					for (let key in data) {
						if (data[key]) {
							obj[key] = data[key];
						}
					}  
					obj.fToken = obj.uToken
					delete obj.uToken
					delete obj.status

					facbook.create(obj, (err, result) => {
						if (err || result == undefined) {
							deferred.resolve(err)
						} else { 
							result.status = 1
							deferred.resolve(result)
						}
					});
				} else if (result1.length != 0) {
					result1.status = 1
					let objf = { "status": 1, "data": result1 }
					deferred.resolve(objf)
				}
			});
		}
		return deferred.promise;
	}
};