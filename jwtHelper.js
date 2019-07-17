const jwt = require('jsonwebtoken');
const config = require('./config.js');

const checkToken = (req, res, next) => {
	let token = req.headers['x-access-token'] || req.headers['authorization'];
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

const createToken = (id, username) => {
	return jwt.sign(
		{id, username},
		config.jwt_secret,
		{expiresIn: config.jwt_expiresIn}
	);
};

const getUserIdFromToken = (token) => {
	const decoded = jwt.verify(token, config.jwt_secret);
	return decoded.id;
};

module.exports = {
	checkToken: checkToken,
	createToken: createToken,
	getUserIdFromToken: getUserIdFromToken
};
