const HttpStatus = require('http-status-codes');

const Project = require('../models/project');

exports.get = (req, res) => {
	Project.find({}, (err, projects) => res.status(HttpStatus.OK).json({ projects }));
};

exports.getProjectsByUser = (req, res) => {
	const userId = req.params['userId'];
	//TODO Put the logic on the mongoose query
	const allProjects = Project.find({}).populate({ path: 'participants', populate: { path: 'participants' }});
	const projectsOfUser = allProjects &&
		allProjects.filter(project => project.participants.map(participant => participant._id).includes(userId));
	res.status(HttpStatus.OK).json({ projectsOfUser });
};
