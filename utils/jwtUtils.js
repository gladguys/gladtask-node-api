import { verify, sign } from 'jsonwebtoken';

import { config } from '../config';
import { sendDefaultHttpBadRequestResponse, sendDefaultHttpUnauthorizedResponse } from "./httpUtils";

export const checkToken = (req, res, next) => {
	let token = req.headers['x-access-token'] || req.headers['authorization'];
	if (token) {
		verify(token, config.jwtSecret, (err, decoded) => {
			if (err) {
				sendDefaultHttpUnauthorizedResponse(res, 'Token is not valid or expired');
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		sendDefaultHttpBadRequestResponse(res, 'Auth token is not supplied');
	}
};

export const createToken = (id, username) => {
	return sign(
		{id, username},
		config.jwtSecret,
		{expiresIn: config.jwtExpiresIn}
	);
};

export const getUserIdFromToken = (token) => {
	const decoded = verify(token, config.jwtSecret);
	return decoded.id;
};
