import { logInfo } from '../logger';

const responseTime = require('response-time');

export const responseInfoMiddleware = responseTime((req, res, time) => {
	logInfo(`${new Date()} Method: ${req.method} URL: ${req.originalUrl} Time: ${time}ms Code: ${res.statusCode}`);
});

export const headerMiddleware = (req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token'
	);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PATCH, PUT, DELETE, OPTIONS'
	);
	next();
};
