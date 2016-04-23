

// import some useful libraries
var http = require("http");
var fs = require("fs");
var websocket = require("websocket").server;

// define general variables
var port = 3013;
var webrtc_clients =[];
var webrtc_discussions = {};

// express server to host html file
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/index.html', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

var server = app.listen('3012', function(req, res){
	console.log('listening on port 3012');
});

// var page = undefined;
// fs.readFile("public/index.html", function(err, data){
// 	if(err) {
// 		console.log(err);
// 	}
// 	else {
// 		page = data;
// 	}
// });

// // web server functions
// var http_server = http.createServer(function(request, response){
// 	// response.write();
// 	response.end(page);
// });

// http_server.listen(port, function() {
// 	console.log("server listening at " + port);
// });


// webSocket functions
var websocket_server = new websocket({
	httpServer: http_server
});

websocket_server.on("request", function(request){
	console.log("new request: " + request.origin);
	
	// accept new rquest and assign to connection variable 
	var connection = request.accept(null, request.origin);
	console.log("new connection: " + connection.remoteAddress);
	// console.log(websocket_server);	

	// push connection onto webrtc_clients array
	webrtc_clients.push(connection);
	console.log(webrtc_clients);

	// store position in array
	connection.id = webrtc_clients.length - 1;
	console.log("connection id is: " + connection.id);

	// // handle messages from connected websocket clients
	// connection.on("message", function(message){
	// 	if(message.type === "utf-8") {
	// 		console.log("incoming message: " + message.utf8Data);
	// 	}
	// 	var signal = undefined;
	// 	try { 
	// 		signal = JSON.parse(message.utf8Data);
	// 	} catch(e) { };
	// });
});


