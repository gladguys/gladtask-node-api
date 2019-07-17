const HttpStatus = require('http-status-codes');

const Project = require('../models/project');

exports.get = (req, res) => {
	Project.find({}, (err, projects) => res.status(HttpStatus.OK).json(projects));
};

exports.getProjectsByUser = async (req, res) => {
	const userId = req.params['userId'];
	const userProjects = await Project.find({ participants: userId });
	res.status(HttpStatus.OK).json(userProjects);
};
