var express = require('express');

var app = express();

app.use(express.static('public'));

app.get('index.html', function(req,res){
	res.sendFile(__dirname + '/index.html');
});

app.listen('3007', function(){
	console.log('app listening on port 3007');
});
