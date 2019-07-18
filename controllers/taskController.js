const HttpStatus = require('http-status-codes');
const moment = require('moment');

const Task = require('../models/task');

exports.getTaskById = async (req, res) => {
	const taskId = req.params['taskId'];
	const taskFound = await Task.findById(taskId);
	res.status(HttpStatus.OK).json(taskFound);
};

exports.getUserTasksDueWithinDays = async (req, res) => {
	const days = req.params['days'];
	const userId = req.params['userId'];

	const date = new Date();
	const today = moment(date).toISOString();
	const futureDate = moment(date).add(days, 'days').toISOString();

	const tasksFound = await Task.find({
		targetUser: userId,
		dueDate : { $gte: today, $lt:  futureDate }
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

exports.getSimilarTasksByTitle = async (req, res) => {
	const title = req.params['title'];
	const tasksFound = await Task.find( { title : { $regex : title, $options : 'i' } } );
	res.status(HttpStatus.OK).json(tasksFound);
};

exports.post = async (req, res) => {
	const task = new Task(req.body);
	const taskSaved = await task.save();
	res.status(HttpStatus.CREATED).send({ task: taskSaved });
};

//TODO implementation not tested yet
exports.updateTaskStatus = async (req, res) => {
	const taskId = req.params['taskId'];
	const newStatus = req.params['newStatus'];
	const taskUpdated = await Task.findOneAndUpdate({ _id: taskId }, { $set:{ status: newStatus } } );
	res.status(HttpStatus.OK).send(taskUpdated);
};
