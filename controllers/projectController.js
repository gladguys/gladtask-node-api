const HttpStatus = require('http-status-codes');

const jwtHelper = require('../jwtHelper');
const Project = require('../models/project');

exports.get = (req, res) => {
	Project.find({}, (err, projects) => res.status(HttpStatus.OK).json(projects));
};

exports.getProjectsByUser = async (req, res) => {
	const userId = req.params['userId'];
	const userProjects = await Project.find({ participants: userId });
	res.status(HttpStatus.OK).json(userProjects);
};

exports.getProjectsByTeam = async (req, res) => {
	const teamId = req.params['teamId'];
	const teamProjects = await Project.find({ team: teamId });
	res.status(HttpStatus.OK).json(teamProjects);
};

exports.post = async (req, res) => {
	const creatorUserId = jwtHelper.getUserIdFromToken(req.headers['authorization']);
	const project = new Project(req.body);
	project.participants = [creatorUserId];
	const projectSaved = await project.save();
	res.status(HttpStatus.CREATED).send({ project: projectSaved });
};
