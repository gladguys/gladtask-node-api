import { InvitationService } from '../../services/invitationService';
import { sendDefaultHttpSuccessResponse, sendDefaultHttpErrorResponse } from '../../utils/httpUtils';
import { Invitation } from '../../models/invitation';

const invitationService = new InvitationService();

export const deleting = async (req, res) => {
  try {
    const invitationId = req.params['invitationId'];
    console.log(invitationId);
    const invitation = new Invitation();
    invitation._id = invitationId;
    
    await invitationService.delete(invitation);

    sendDefaultHttpSuccessResponse(res);
  } catch (error) {
    sendDefaultHttpErrorResponse(req, res, error);
  }
};