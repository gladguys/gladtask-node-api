const HttpStatus = require('http-status-codes');

const Invitation = require('../models/invitation');

exports.get = async (req, res) => {
	const invitations = await Invitation.find({});
	res.status(HttpStatus.OK).json(invitations);
};

exports.getInvitationsByUser = async (req, res) => {
	const userId = req.params['userId'];
	const userInvitations = await Invitation.find({ receiver: userId });
	res.status(HttpStatus.OK).json(userInvitations);
};
