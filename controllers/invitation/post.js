import { Invitation } from "../../models/invitation";
import { InvitationService } from '../../services/invitationService';
import { sendDefaultHttpCreatedResponse, sendDefaultHttpErrorResponse } from '../../utils/httpUtils';

const invitationService = new InvitationService();

export const post = async (req,res) => {
    try {
        console.log(req.body);
        const invitation = new Invitation(req.body);
        const invitationSaved = invitationService.saveInvitation(invitation);
        console.log("after saving: " + req);
        sendDefaultHttpCreatedResponse(res, { invitation: invitationSaved });

    } catch (error) {
        sendDefaultHttpErrorResponse(req, res, error);
    }
}