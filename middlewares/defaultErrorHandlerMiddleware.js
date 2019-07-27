import { INTERNAL_SERVER_ERROR } from 'http-status-codes';

//TODO Spice up this logic on the future
module.exports = (err, req, res) => {
	console.error(err.stack);
	res.status(INTERNAL_SERVER_ERROR).send('Something went wrong!!');
};
