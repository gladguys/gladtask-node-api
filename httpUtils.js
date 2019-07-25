import { CREATED, OK, UNAUTHORIZED, INTERNAL_SERVER_ERROR } from 'http-status-codes';

export const sendDefaultHttpSuccessResponse = (res, payload = {}) => {
	return res.status(OK).json(payload);
};

export const sendDefaultHttpUnauthorizedResponse = (res, message) => {
	return res.status(UNAUTHORIZED).json({ message: message });
};

export const sendDefaultHttpCreatedResponse = (res, payload = {}) => {
	return res.status(CREATED).json(payload);
};

export const sendDefaultHttpErrorResponse = (res, error) => {
	return res.status(INTERNAL_SERVER_ERROR).json({ status: INTERNAL_SERVER_ERROR, message: error.message });
};