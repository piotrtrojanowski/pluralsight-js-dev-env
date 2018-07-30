import express from 'express';
import path from 'path';
import open from 'open';

import webpack from 'webpack';
import config from '../webpack.config.dev';

/* eslint-disable no-console */

const port = 3000;

const http_server=express();

const compiler = webpack(config);

http_server.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));

http_server.get('/', function(req, res) {
	res.sendFile (path.join(__dirname, '//../src/index.html'));
});

http_server.listen(port, function(err) {
	if (err) {
		console.log(err);
	}
	else {
		open ("http://localhost:" + port);
	}
});