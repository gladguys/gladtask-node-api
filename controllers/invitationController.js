const HttpStatus = require('http-status-codes');

const Invitation = require('../models/invitation');

exports.get = async (req, res) => {
	const invitations = await Invitation.find({});
	res.status(HttpStatus.OK).json({ invitations });
};

exports.getInvitationsByUser = (req, res) => {
	const userId = req.params['userId'];
	//TODO Put the logic on the mongoose query
	const allInvitations = Invitation.find({}).populate({ path: 'receiver', populate: { path: 'receiver' }});
	const invitationsOfUser = allInvitations &&
		allInvitations.filter(invitation => invitation.receiver._id === userId);
	res.status(HttpStatus.OK).json({ invitationsOfUser });
};
