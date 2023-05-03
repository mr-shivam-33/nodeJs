var mongoose = require('mongoose');
var connections = {};
module.exports.getDatabaseConnection = function(dbName) {
    if(connections[dbName]) {
        return connections[dbName];
    } else {
		
		// connections[dbName] = mongoose.createConnection('mongodb://CPLMain:CPLQAZX@172.31.21.192:23047/' + dbName + "?authSource=admin&retryWrites=true");
		connections[dbName] = mongoose.createConnection('mongodb://127.0.0.1:27017/' + dbName);
        return connections[dbName];
    }
}