const HttpStatus = require('http-status-codes');

const Invitation = require('../models/invitation');

exports.get = (req, res) => {
	Invitation.find({}, (err, invitations) => res.status(HttpStatus.OK).json({ invitations }));
};

exports.getInvitationsByUser = (req, res) => {
	const userId = req.params['userId'];
	//TODO Put the logic on the mongoose query
	Invitation.find({}, (err, invitations) => {
		const invitationsOfUser = invitations.filter(invitation => invitation.receiver._id === userId);
		res.status(HttpStatus.OK).json({ invitationsOfUser });
	}).populate({ path: 'receiver', populate: { path: 'receiver' }});
};