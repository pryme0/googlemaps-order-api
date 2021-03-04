require('dotenv').config();
const express = require('express');
const app = express();
const https = require('https');
const mongoose = require('mongoose');
const path = require('path');
const dotEnv = require('dotenv');
const fs = require('fs');
const cluster = require('cluster');
const cpus = require('os').cpus().length;
const log = require('bunyan').createLogger({ name: 'chatter' });
const Routes = require('./routes/index');
const { request } = require('http');

dotEnv.config({
	path:'./env'
})

mongoose.connect(process.env.MONGODB_CONN_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	autoIndex: false,
}).then(con=>{
	con&&console.log('Mongodb connected sucessfully');
	
}).catch(err=>{
	console.log(err.message)
});

const port = parseInt(process.env.PORT|| '4000');
const options = {
	key: fs.readFileSync(path.resolve('./key.pem')),
	cert: fs.readFileSync(path.resolve('./cert.pem')),
};

if (cluster.isMaster) {
	for (let x = 0; x < cpus; x++) cluster.fork();
	cluster.on('exit', (worker) => {
		console.log(process.pid, ' has die');
		// cluster.fork();
	});
} else {
	console.log('Started a Worker at ID: ', process.pid);
	https.createServer(options, app).listen(port, () => {
		console.log('Server started at PORT: ', port);
	});
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', Routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	log.warn({ error: 'Resource not found' });
	next(new Error('Resource Not Found'));
});

// Error Handler - catch all
app.use(function (err, req, res, next) {
	log.warn({ error: err });
	res.status(500).json({ error: err });
	next(err);
});
