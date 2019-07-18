const HttpStatus = require('http-status-codes');
const moment = require('moment');

const Task = require('../models/task');

exports.getTaskById = async (req, res) => {
	const taskId = req.params['taskId'];

	const taskFound = await Task.findOne({ _id: taskId });
	console.log(taskFound);
	res.status(HttpStatus.OK).json(taskFound);
};

exports.getUserTasksDueWithinDays = async (req, res) => {
	const days = req.params['days'];
	const userId = req.params['userId'];

	const date = new Date();
	const today = moment(date);
	const passedDate = moment(date).add(-days, 'days');

	const tasksFound = await Task.find({
		targetUser: userId,
		dueDate : { $gte: passedDate, $lt:  today }
	});
	res.status(HttpStatus.OK).json(tasksFound);
};

exports.getLast4UserEditedTasks = async (req, res) => {
	const userId = req.params['userId'];

	const tasksFound = await Task.find({ targetUser: userId })
		.sort({ 'lastEdited': -1 })
		.limit(4);
	res.status(HttpStatus.OK).json(tasksFound);
};