const HttpStatus = require('http-status-codes');

const jwtHelper = require('../jwtHelper');
const Project = require('../models/project');

exports.getById = async (req, res) => {
	const projectId = req.params['projectId'];
	const project = await Project.findById(projectId);

	if (project) {
		res.status(HttpStatus.OK).json(project);
	} else {
		res.status(HttpStatus.NOT_FOUND);
	}
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

exports.getProjectsByName = async (req, res) => {
	const term = req.params['term'];
	const projectsFound = await Project.find( { name : { $regex : term, $options : 'i' } } );
	res.status(projectsFound ? HttpStatus.OK : HttpStatus.NO_CONTENT).json(projectsFound);
};

exports.post = async (req, res) => {
	const creatorUserId = jwtHelper.getUserIdFromToken(req.headers['authorization']);
	const project = new Project(req.body);
	project.participants = [creatorUserId];
	const projectSaved = await project.save();
	res.status(HttpStatus.CREATED).send({ project: projectSaved });
};
