import { config } from '../config';
import { transporter } from '../utils/emailUtils';

export class EmailService {

	async sendEmail(recipients, subject, text) {
		const message = {
			from: config.gladEmail,
			to: recipients,
			subject,
			text
		};
		await transporter.sendMail(message);
	}

	async sendEmailWithHtml(recipients, subject, html) {
		const message = {
			from: config.gladEmail,
			to: recipients,
			subject,
			html
		};
		await transporter.sendMail(message);
	}

	async sendGladInviteEmail(recipient, url) {
		const message = {
			from: config.gladEmail,
			to: recipient,
			subject: 'Invite to join glad',
			text: url
		};
		await transporter.sendMail(message);
	}
}
