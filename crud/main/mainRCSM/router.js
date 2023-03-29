import express from 'express';
var router = express.Router();
import crud from './controller.js';

// console.log('controller');

router.post("/adduser", crud.addUser);
router.get("/adduser", crud.getUser)
// router.route('/adduser').post(controllers.addUser);

export default router;
