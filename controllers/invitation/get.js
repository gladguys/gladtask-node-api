import { OK } from 'http-status-codes';

import { Invitation } from '../../models/invitation';

export const get = async (req, res) => {
  const invitations = await Invitation.find({});
  res.status(OK).json(invitations);
};

export const getInvitationsByUser = async (req, res) => {
  const userId = req.params['userId'];
  const userInvitations = await Invitation.find({ receiver: userId });
  res.status(OK).json(userInvitations);
};
