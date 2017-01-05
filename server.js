'use strict'

//basic server setup
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var movieRoutes = require('./routes/routes.js');
var config = require('./config');

//connect to db
var mongoose = require('mongoose');
mongoose.Promise = global.Promise; //temp fix for mongoose promise deprecation warning
mongoose.connect(config.url);

// use body parser to parse requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//set port to env or 8080
var port = process.env.PORT || 8080;

//setup routes
var router = express.Router();

//test route
app.get('/api', function( req, res) {
    res.json({
        message: 'api default route is working!'
    });
});

//use the imported routes
app.use('/api', movieRoutes);

//start the server and log
app.listen(port);
console.log('Movie server listening on %s', port);