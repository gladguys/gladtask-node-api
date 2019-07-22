const HttpStatus = require('http-status-codes');
const moment = require('moment');

const jwtHelper = require('../jwtHelper');
const Task = require('../models/task');
const TaskComment = require('../models/taskComment');

exports.getTaskById = async (req, res) => {
	const taskId = req.params['taskId'];
	const taskFound = await Task.findById(taskId);
	res.status(HttpStatus.OK).json(taskFound);
};

exports.getTasksByUser = async (req, res) => {
	const userId = req.params['userId'];
	const tasksFound = await Task.find({ targetUser: userId });
	res.status(HttpStatus.OK).json(tasksFound);
};

exports.getTasksByProject = async (req, res) => {
	const projectId = req.params['projectId'];
	const tasksFound = await Task.find({ project: projectId });
	res.status(HttpStatus.OK).json(tasksFound);
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
	const creatorUserId = jwtHelper.getUserIdFromToken(req.headers['authorization']);
	const task = new Task(req.body);
	task.creatorUser = creatorUserId;
	const taskSaved = await task.save();
	res.status(HttpStatus.CREATED).send({ task: taskSaved });
};

//TODO implementation not tested yet
exports.saveTaskComment = async (req, res) => {
	const taskId = req.params['taskId'];
	const taskComment = new TaskComment(req.body);
	const task = await Task.findById(taskId);

	if (task) {
		const comments = task.taskComments;
		comments.push(taskComment);
		const updatedTask = Task.update( {_id: taskId}, { $set: { taskComments : comments} } );
		res.status(HttpStatus.CREATED).send(updatedTask);
	} else {
		res.status(HttpStatus.NOT_FOUND);
	}

};

//TODO implementation not tested yet
exports.updateTaskStatus = async (req, res) => {
	const taskId = req.params['taskId'];
	const newStatus = req.params['newStatus'];
	const taskUpdated = await Task.findOneAndUpdate({ _id: taskId }, { $set:{ status: newStatus } } );
	res.status(HttpStatus.OK).send(taskUpdated);
};
