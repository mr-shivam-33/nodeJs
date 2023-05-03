import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import Q from 'q';
import {user} from './model.js';

class userService {

    

    addUser(data) {
        // console.log(data, "ser")
        var deferred = Q.defer();
        user.create(data).then((err, result) => {
            if (err) {
                // console.log(err, "err")
                let obj = { "status": 0, "data": err }
                deferred.resolve(obj)
            } else {
                // console.log(result, "result")
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        });
        return deferred.promise;
    }
    
    getUser(email) {
        var deferred = Q.defer();
        user.findOne({email: email}).then((err, result) => {
            if (err) {
                // console.log(err, "errget")
                let obj = { "status": 0, "data": err}
                deferred.resolve(obj)
            } else {
                // console.log(result, "result")
                let obj = { "status": 1, "data": result }
                deferred.resolve(obj)
            }
        })
    }

}

export default userService;