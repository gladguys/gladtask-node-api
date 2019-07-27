import { verify, sign } from 'jsonwebtoken';

import { config } from '../config';

export const checkToken = (req, res, next) => {
	let token = req.headers['x-access-token'] || req.headers['authorization'];
	if (token) {
		verify(token, config.jwt_secret, (err, decoded) => {
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

export const createToken = (id, username) => {
	return sign(
		{id, username},
		config.jwt_secret,
		{expiresIn: config.jwt_expiresIn}
	);
};

export const getUserIdFromToken = (token) => {
	const decoded = verify(token, config.jwt_secret);
	return decoded.id;
};
