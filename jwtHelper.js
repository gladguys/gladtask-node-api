const jwt = require('jsonwebtoken');
const config = require('./config.js');

let checkToken = (req, res, next) => {
	let token = req.headers['x-access-token'] || req.headers['Authorization'];

	if (token) {
		jwt.verify(token, config.jwt_secret, (err, decoded) => {
			if (err) {
				return res.status(401).json({
					success: false,
					message: 'Token is not valid or expired'
				});
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		return res.status(400).json({
			success: false,
			message: 'Auth token is not supplied'
		});
	}
};

let createToken = (username) => {
	return jwt.sign({username: username},
		config.jwt_secret,
		{expiresIn: config.jwt_expiresIn}
	);
};

module.exports = {
	checkToken: checkToken,
	createToken: createToken
};
