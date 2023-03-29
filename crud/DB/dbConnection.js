// import express from 'express';
// import mongoose from 'mongoose';
// console.log("db")
// var serverURI = 'mongodb://127.0.0.1:27017/cruddemo';

// mongoose.connect(serverURI, {
//     // keepAlive: 1,
//     usenewUrlParser: true,
//     useUnifiedTopology: true,
// })

// mongoose.connection.on("error", err => {
//     console.log("Database not connected...", err)
// })

// var con = mongoose.connection.on("Connected", (err, res) => {
//     console.log("Database connected.........")
// })

// export default con;


import express from 'express';
import mongoose from 'mongoose';
const serverURI = 'mongodb://127.0.0.1:27017/cruddemo';
// const serverURI = 'mongodb://mongo:27017/blokchi_2_MainDB';
// const serverURI = 'mongodb://mongo:27017/blokchi_2_MainDB';
// const serverURI = 'mongodb+srv://my-user:12345678@example-mongodb-svc.blokchi.svc.cluster.local/admin?replicaSet=example-mongodb&ssl=false'

mongoose.connect(serverURI, {
    // keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
mongoose.connection.on("error", err => {
    console.log("Database not connected...", err)
})
const con = mongoose.connection.on("connected", (err, res) => {
    console.log("Database connected..................................")
})

export default con;
