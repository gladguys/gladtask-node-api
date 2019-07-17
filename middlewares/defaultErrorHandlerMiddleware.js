const HttpStatus = require('http-status-codes');

//TODO Spice up this logic on the future
module.exports = (err, req, res) => {
	console.error(err.stack);
	res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Something went wrong!!');
};