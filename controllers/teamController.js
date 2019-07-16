const HttpStatus = require('http-status-codes');

const Team = require('../models/team');

exports.get = async (req, res) => {
	const teams = Team.find({})
		.populate('manager')
		.populate({ path: 'participants', populate: { path: 'participants' }});
	res.status(HttpStatus.OK).json(teams);
};

exports.getTeamById = async (req, res) => {
	const teamId = req.params['teamId'];
	const team = await Team.findOne({ _id: teamId })
		.populate('manager')
		.populate({ path: 'participants', populate: { path: 'participants' }});
	res.status(team ? HttpStatus.OK : HttpStatus.NO_CONTENT).json(team);
};

exports.post = async (req, res) => {
	const team = new Team(req.body.team);
	const teamSaved = await team.save();
	res.status(HttpStatus.CREATED).send({ team: teamSaved });
};

exports.getUserTeams = async (req, res) => {
	const userId = req.params['userId'];

	//TODO Put the logic on the mongoose query
	const allTeams = await Team.find({})
		.populate('manager')
		.populate({ path: 'participants', populate: { path: 'participants' }});

	const teamsOfUser =
		allTeams.filter(team => team.participants.map(participant => participant._id).includes(userId));
	res.status(HttpStatus.OK).json(teamsOfUser);
};
