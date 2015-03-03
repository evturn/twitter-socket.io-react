var express 			= require('express');
var exphbs  			= require('express-handlebars');
var http 					= require('http');
var mongoose 			= require('mongoose');
var twitter 			= require('ntwitter'),
var routes 				= require('./routes'),
var config 				= require('./config'),
var streamHandler = require('./utils/streamHandler');

var app = express();
var port = process.envPORT || 8080;

app.disable('etag');

var server = http.createServer(app).listen(port, function() {
	console.log('Express listening on port ' + port);
})