const express = require("express");
const path = require('path');
var fs = require('fs');
const port = 3000;
const app = express();
//////////////////

// Include Nodejs' net module.
const Net = require('net');
// The port number and hostname of the server.
const portNew = 12500;
 const host = '192.168.10.80';

 const server1 = Net.createServer();
server1.listen(portNew,host, () => {
    console.log('TCP Server is running on port ' + portNew +'.');
});

server1.on('connection', function(socket) {
    console.log('A new connection has been established.');
    socket.write('STAR');

});

// Create a new TCP client.
const client = new Net.Socket();
// Send a connection request to the server.
client.connect({ port: portNew, host: host }, () => {
    console.log('TCP connection established with the server.');
    client.write('STAR');
});

// The client can also receive data from the server by reading from its socket.
client.on('data', function(chunk) {
    console.log(`Data received from the server: ${chunk.toString()}.`);
    client.end();
});

client.on('end', function() {
    console.log('Requested an end to the TCP connection');
});
/////////////////

app.get('/message', async (req, res) => {
    res.send({'message':'This is the message'});
});

var server = app.listen(port, function() {
	console.log('Process ' + process.pid + ' is listening to all incoming requests');
});
module.exports = server;