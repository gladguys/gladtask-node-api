import * as nodemailer from 'nodemailer';

import { config } from '../config';

export const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: config.gladEmail,
		pass: config.gladEmailPassword
	}
});
