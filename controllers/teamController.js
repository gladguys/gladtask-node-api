const HttpStatus = require('http-status-codes');

const Team = require('../models/team');

exports.get = async (req, res) => {
	const teams = await Team.find({});
	res.status(HttpStatus.OK).json(teams);
};

exports.getTeamById = async (req, res) => {
	const teamId = req.params['teamId'];
	const team = await Team.findOne({ _id: teamId });
	res.status(team ? HttpStatus.OK : HttpStatus.NOT_FOUND).json(team);
};

exports.post = async (req, res) => {
	const team = new Team(req.body.team);
	const teamSaved = await team.save();
	res.status(HttpStatus.CREATED).send({ team: teamSaved });
};

exports.getUserTeams = async (req, res) => {
	const userId = req.params['userId'];

	//TODO Put the logic on the mongoose query
	const allTeams = await Team.find({});
	const teamsOfUser =
		allTeams.filter(team => team.participants.map(participant => participant._id).includes(userId));
	res.status(HttpStatus.OK).json(teamsOfUser);
};
