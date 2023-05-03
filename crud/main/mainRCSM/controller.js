import express from 'express';
import services from './service.js';
const UserService = new services();
// import DB from '../../DB/dbConnection.js';
var Address6 = require('ip-address').Address6;

let crud = {
    addUser: async(req, res) => {
        UserService.addUser(req.body).then(async result => {
            if(result) {
                let ob = {"status": 1, "data": result}
                res.status(200).send(ob);
            }
        })
    },


    getUser: async(req, res) => {
        // console.log(req.body, "con")
        // return;
        UserService.getUser(req.body.email), (async result => {
            if(result) {
                console.log(result, "resultcon")
                let ob = {"status": 1, "data": result}
                res.status(200).send(ob);
            }
        })
    },

}


export default crud;