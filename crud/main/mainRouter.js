import express from 'express';
var router = express.Router();
import subroot from './mainRCSM/router.js';

// console.log('ssssssssssss');

router.use("/sub", subroot);

export default router;