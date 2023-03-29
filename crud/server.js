import express from 'express';
var app = express();
var port = 2023;
import bodyParser from 'body-parser';

import DB from './DB/dbConnection.js';
global.con = DB.con;

app.use(bodyParser.urlencoded({limit:'50mb',extended:true,parameterLimit:50000}));
app.use(bodyParser.json({limit: '50mb'}));

import mainroot from './main/mainRouter.js';
app.use("/main", mainroot);

app.get("/", async(req, res) => {
    res.send("Hello shivam");
});

app.listen(port, () => {
    console.log(`Server listning on port no. ${port}`)
})
