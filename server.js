const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('./config/database'); //database configuration
var jwt = require('jsonwebtoken');

//create a new express application
const app = express()

var path = require('path');
// set response headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token');
  next();
});



app.set('secretKey', 'ZDhLq7Ssi7RTiThdu7guy4pDWaJVqdasaAPHKruFKK0fZwAVHNzz70hxCEEdtIgT'); // jwt secret token

// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.disable('etag');
app.get('/', function(req, res){
res.json({"Online" : "API is online"});
});

// public route
app.use('/users', users);


app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});



// express doesn't consider not found 404 as an error so we need to handle 404 it explicitly
// handle 404 error
app.use(function(req, res, next) {
	let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle errors
app.use(function(err, req, res, next) {
	console.log(err);
	
  if(err.status === 404)
    res.status(404).json({message: "Not found"});
     else if(err.status === 403)
  res.status(403).json({message: "Unauthorized"})
  else	
    res.status(500).json({message: "Something looks wrong"});

});


let port = process.env.PORT || 3000
app.listen(port, function(){
  console.log('Node server listening on port'+ port)
});
