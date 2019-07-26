const winston = require('winston');

export const logger = winston.createLogger({
  	level: 'info',
	format: winston.format.json(),
	transports: [
		new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
		new winston.transports.File({ filename: './logs/combined.log' })
	]
});

export const logInfo = (message) => {
	logger.info(message);
};

export const logError = (message) => {
	logger.error(message);
};