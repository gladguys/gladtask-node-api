const HttpStatus = require('http-status-codes');

const Team = require('../models/team');

exports.get = (req, res) => {
	Team.find({}, (err, teams) => res.status(HttpStatus.OK).json({ teams }))
		.populate('manager')
		.populate({ path: 'participants', populate: { path: 'participants' }});
};

exports.post = (req, res) => {
	const team = new Team(req.body.team);
	team.save((err, teamSaved) => {
		res.status(HttpStatus.CREATED).send({ team: teamSaved });
	});
};

exports.getUserTeams = (req, res) => {
	const userId = req.params['userId'];
	//TODO Put the logic on the mongoose query
	Team.find({}, (err, teams) => {
		const teamsOfUser =
			teams.filter(team => team.participants.map(participant => participant._id).includes(userId));
		res.status(HttpStatus.OK).json({ teamsOfUser });
	}).populate({ path: 'participants', populate: { path: 'participants' }});
};
