import { InvitationService } from '../../services/invitationService';
import { sendDefaultHttpSuccessResponse, sendDefaultHttpErrorResponse } from '../../httpUtils';

const invitationService = new InvitationService();

export const get = async (req, res) => {
  try {
    const invitations = await invitationService.findAll();
    sendDefaultHttpSuccessResponse(res, invitations);
  } catch (error) {
    sendDefaultHttpErrorResponse(res, error);
  }
};

export const getInvitationsByUser = async (req, res) => {
  const userId = req.params['userId'];

  try {
    const userInvitations = await invitationService.findByQuery({ receiver: userId });
    sendDefaultHttpSuccessResponse(res, userInvitations);
  } catch (error) {
    sendDefaultHttpErrorResponse(res, error);
  }
};
