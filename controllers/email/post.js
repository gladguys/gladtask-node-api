import { EmailService } from '../../services/emailService';
import { sendDefaultHttpSuccessResponse, sendDefaultHttpErrorResponse } from '../../utils/httpUtils';

const emailService = new EmailService();

export const post = async (req, res) => {
	const recipient = req.params['email'];
	const url = req.body['url'];

	try {
		await emailService.sendGladInviteEmail(recipient, url);
		sendDefaultHttpSuccessResponse(res);
	} catch (error) {
		sendDefaultHttpErrorResponse(res, error);
	}
};