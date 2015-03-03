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

// Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Disable headers
app.disable('etag');

// Twitter
var twit = new twitter(config.twitter);


app.get('/', routes.index);

app.get('/page/:page/:skip', routes.page);

app.use('/', express.static(__dirname + '/public/'));


var server = http.createServer(app).listen(port, function() {
	console.log('Express listening on port ' + port);
})

var io = require('socket.io').listen(server);

twit.stream('statuses/filter',{
	track: 'isomorphic',
	'#isomorphic'
}, function(stream) {
  streamHandler(stream,io);
});