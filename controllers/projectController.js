const HttpStatus = require('http-status-codes');

const Project = require('../models/project');

exports.get = (req, res) => {
	Project.find({}, (err, projects) => res.status(HttpStatus.OK).json(projects));
};

exports.getProjectsByUser = async (req, res) => {
	const userId = req.params['userId'];
	//TODO Put the logic on the mongoose query
	const allProjects = await Project.find({});
	const projectsOfUser =
		allProjects.filter(project => project.participants.map(participant => participant._id).includes(userId));
	res.status(HttpStatus.OK).json(projectsOfUser);
};
