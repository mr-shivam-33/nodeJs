const express = require("express");
var helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
var fs = require('fs');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser')
const DB = require("./db/DBConnection");
var cluster = require('cluster');
const app = express();
const jwt_decode = require('jwt-decode');
const port = 3030;
const multer = require("multer");
const multerS3 = require("multer-s3");
var AWS = require('aws-sdk');
// const medsureRouter = require("./modules/medsure/medsureRoutes");
var config = require('./config.json');

var ACCESSKEYID = "AKIA4CMJKB6YJS7LD5OD";
var SECRETACCESSKEY = "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";
var mainBucket = 'cplgreen'

var storageImages = multer.diskStorage({
    destination: function (req, file, cb) {
		var dir = './public/assests/images/'+ req.query.slug;
		if (!fs.existsSync(dir)){
			fs.mkdirSync(dir);
		}
		if(file==undefined){}
        else
		cb(null, './public/assests/images/'+ req.query.slug)
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '_' + file.originalname)
	}
});

var multiImages = multer({storage: storageImages});
var cpUploadCommon = multiImages.fields([{ name: 'post_images', maxCount: 4 }]);


const userAuthParams = ['userToken'];
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({limit:'50mb',extended:true,parameterLimit:1000000}));
 
// parse application/json
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");  //* will allow from all cross domain
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(function (req, res, next) {
    var token = req.headers['x-access-token'];
    if (token) {
		jwt.verify(token, config.appsecret, function (err, decoded) {
			if (err) {
				return res.json({success: false, responseMsgCode: 'tokenNotFound'});
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else if(req.url.split('/').includes('rfstation') == true){
		next();	
    } else {
		return res.status(403).send({
			success: false,
			message: 'No x-access-token provided'
		});
    }
});

const headerCheck = (req, res, next) => {

	var token = req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, config.appsecret, function (err, decoded) {
			if (err) {
				return res.json({success: false, responseMsgCode: 'tokenNotFound'});
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		return res.status(403).send({success: false,message: 'No x-access-token provided'});
	}
}

app.get('/message', function (req, res) {
    res.send({'message':'This is the message'});
});

app.post('/auth', headerCheck, function (req, res) {    
	
	try {
		
		let flag = false;
		userAuthParams.forEach(function (element, key) {
			if (req.body[element] == '' || req.body[element] == undefined) {
				flag = true;
			}
		})
		if (flag) {
			res.status(200).send({ "responseStatus": 0, "responseMsgCode": "mandatoryField" });
		}
		
		var token = req.body.userToken;
		
		if(token){
	  
			var decodedHeader = jwt_decode(token, config.appsecret, algorithms=["HS256"]);
			if (Date.now() >= decodedHeader.exp * 1000) {
				
				res.json({ responseStatus: 0, responseMsgCode: "Your User Token has been expired.", "responseData":{}})
				
			} else {
				
				delete decodedHeader.iat
				delete decodedHeader.exp
				
				res.json({ responseStatus: 1, responseMsgCode: "success", "responseData":decodedHeader});
				
			}
			
		} else {
	  
			res.json({ responseStatus: 0, responseMsgCode: "failure.", "responseData":{}})
		}
	} catch (error) {
		res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
	}
});

const s3 = new AWS.S3({
	accessKeyId: ACCESSKEYID,
	secretAccessKey: SECRETACCESSKEY,
  });
// req.headers['typedata']+'/'+req.headers['category']+'/'+file.fieldname
// req.body.clientName+'/'+req.body.categoryName+'/'+file.fieldname
  var uploadS3 = multer({
	storage: multerS3({
		s3: s3,
		bucket: mainBucket,
		acl: "public-read",
		metadata: function (req, file, cb) {			
			cb(null, { fieldName: file.fieldname });
		},
		key: function (req, file, cb) {			
			const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);		
			cb(null, req.headers['typedata']+'/'+req.headers['category']+'/'+file.fieldname + "-" + uniqueSuffix + ".png");
		},
	}),
});

var cpUpload = uploadS3.fields([
	{ name: "postImage", maxCount: 1 }	
  ]);

app.post('/commonUpload', headerCheck, cpUpload, function (req, res) {
	let getImages = req.files;
	let getData = getImages.postImage;
	if(getData){
		res.status(200).json({ responseStatus: 1, responseMsgCode: "success", "imageFullPath":getData[0].location});
	}else{
		res.status(403).json({ responseStatus: 0, responseMsgCode: "failure.", "imageFullPath":''})
	}
});

app.post('/commonUpload_old', headerCheck, cpUploadCommon, function (req, res) {    
	
	try {		
		images = [];
		if (req.files.post_images != undefined) {
			req.files.post_images.forEach(async function (element) {
				var imagesName = element.filename;
				images.push({ "ImageName": imagesName});			
			})
		}
		req.body.post_images = images
		
		if(req.body.post_images.length > 0){
			
			res.status(200).json({ responseStatus: 1, responseMsgCode: "success", "responseData":req.body.post_images});
			
		} else {
			
			res.status(403).json({ responseStatus: 0, responseMsgCode: "failure.", "responseData":[]})
			
		}
		
		
	} catch (error) {
		res.status(200).send({ "responseStatus": 0, "responseMsgCode": "processFailed", "responseData": { "err": error }, "responseInvalid": 0 });
	}
});

// app.use(express.json());
// app.use("/api/medsure", medsureRouter);
// app.use("/api/medgrids/", commonRoutes);

// if(cluster.isMaster) {
	
	// var numWorkers = require('os').cpus().length;

	// console.log('Master cluster setting up ' + numWorkers + ' workers...');

	// for(var i = 0; i < numWorkers; i++) {
		// cluster.fork();
	// }

	// cluster.on('online', function(worker) {
		// console.log('Worker ' + worker.process.pid + ' is online');
	// });

	// cluster.on('exit', function(worker, code, signal) {
		// console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
		// console.log('Starting a new worker');
		// cluster.fork();
	// });
	
// } else {
	
	// app.all('/*', function(req, res, next) {
		// res.send('process ' + process.pid + ' says hello!').end();
	// })

    var server = app.listen(port, function() {
        console.log('Process ' + process.pid + ' is listening to all incoming requests');
    });


	// var io = require('socket.io')(server);
	// global.DB = DB
	global.io = require('socket.io')(server);

	io.on('connection', function(socket){
		socket.on('event', function(data){
			console.log(data, "Soket Done.............")
		});
		socket.on('disconnect', function(err){
			console.log(err, "Soket Not Done.............")
		});
	});
	
	const medsureRouter = require("./modules/cpl/medsureRoutes");
	const commonRoutes = require("./modules/common/commonRoutes");
	app.use(express.json());
	app.set('socketio', io);
	app.use("/api/cpl", medsureRouter);
	app.use("/api/cplmain", commonRoutes);


	app.get('/socketTesing', function (req, res) {	
		// getCompanyIdIpfsData
		console.log(io)
		var getData = io.emit("event","manish");
		console.log(getData, "Connection Done")
		res.send({'message': getData});
	});
	// ManKind Server Enable
	
// }
module.exports = {server,io};