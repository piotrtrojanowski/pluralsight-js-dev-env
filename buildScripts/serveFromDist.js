import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';
/* eslint-disable no-console */

const port = 3000;
const http_server=express();

http_server.use(compression());
http_server.use(express.static('dist'));


http_server.get('/', function(req, res) {
	res.sendFile (path.join(__dirname, '//../dist/index.html'));
});

http_server.get('/users', function(req,res) {
	res.json([
		{"id": 1, "firstName":"Bob", "lastName":"Smith","email":"bob@gmail.com"},
		{"id": 2, "firstName":"Tien", "lastName":"Tiem","email":"tien@gmail.com"},
		{"id": 3, "firstName":"Sen", "lastName":"Siem","email":"sen@gmail.com"}
	]);
});

http_server.listen(port, function(err) {
	if (err) {
		console.log(err);
	}
	else {
		open ("http://localhost:" + port);
	}
});