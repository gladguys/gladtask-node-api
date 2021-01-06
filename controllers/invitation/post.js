import { Invitation } from "../../models/invitation";
import { InvitationService } from '../../services/invitationService';
import { sendDefaultHttpCreatedResponse, sendDefaultHttpErrorResponse } from '../../utils/httpUtils';

const invitationService = new InvitationService();

export const post = async (req,res) => {
    try {
        const invitation = new Invitation(req.body);
        const invitationSaved = invitationService.saveInvitation(invitation);
        sendDefaultHttpCreatedResponse(res, { invitation: invitationSaved });

    } catch (error) {
        sendDefaultHttpErrorResponse(req, res, error);
    }
}