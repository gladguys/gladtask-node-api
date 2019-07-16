const HttpStatus = require('http-status-codes');

const Project = require('../models/project');

exports.get = (req, res) => {
	Project.find({}, (err, projects) => res.status(HttpStatus.OK).json({ projects }));
};

exports.getProjectsByUser = (req, res) => {
	const userId = req.params['userId'];
	//TODO Put the logic on the mongoose query
	Project.find({}, (err, projects) => {
		const projectsOfUser =
			projects.filter(project => project.participants.map(participant => participant._id).includes(userId));
		res.status(HttpStatus.OK).json({ projectsOfUser });
	}).populate({ path: 'participants', populate: { path: 'participants' }});
};