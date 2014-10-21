var newrelic = require('newrelic');
var express = require('express');

var app = express();

var redis = require('redis');
var client = redis.createClient();

app.get('/', function(req,res){
	res.send('This is the home page');
});

app.get('/redis', function(req,res){
	setTimeout(function(){console.log('Whatup!');},5000);
	client.on('error', function(err){
		console.log("Error" + err);
	});

	client.set("string key", "Hello World", redis.print);
	client.get("string key", function(err,reply){
		res.send(reply.toString());
	});
	client.quit();
});

app.get('/test', function(req,res){
	var foo = {"day":"monday"}
	client.set(foo);
	client.get(foo)
	res.send(foo.day)
	client.end()
});

app.listen(8888);
console.log('Let the games begin...on port 8888');