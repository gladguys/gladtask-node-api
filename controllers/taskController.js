const HttpStatus = require('http-status-codes');
const moment = require('moment');

const jwtHelper = require('../jwtHelper');
const Task = require('../models/task');
const TaskComment = require('../models/taskComment');
const TimeSpent = require('../models/timeSpent');
const TaskChange = require('../models/taskChange');

exports.getTaskById = async (req, res) => {
	const taskId = req.params['taskId'];
	const taskFound = await Task.findById(taskId);
	taskFound.taskComments = await TaskComment.find({ taskId: taskId });
	taskFound.timeSpentValues = await TimeSpent.find({ taskId: taskId });
	taskFound.taskChanges = await TaskChange.find({ taskId: taskId });
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

exports.getSimilarTasksByTitle = async (req, res) => {
	const title = req.params['title'];
	const tasksFound = await Task.find( { title : { $regex : title, $options : 'i' } } );
	res.status(HttpStatus.OK).json(tasksFound);
};

exports.getTasksByTitleOrDescription = async (req, res) => {
	const term = req.params['term'];
	const tasksFound = await Task.find( { $or: [
		{ title: { $regex : term, $options : 'i' } },
		{ description: { $regex : term, $options : 'i' } }
	] } );
	res.status(tasksFound ? HttpStatus.OK : HttpStatus.NO_CONTENT).json(tasksFound);
};

exports.getLast4UserEditedTasks = async (req, res) => {
	const userId = req.params['userId'];
	const tasksFound = await Task.find({ targetUser: userId })
		.sort({ 'lastEdited': -1 })
		.limit(4);
	res.status(HttpStatus.OK).json(tasksFound);
};

exports.post = async (req, res) => {
	const creatorUserId = jwtHelper.getUserIdFromToken(req.headers['authorization']);
	const task = new Task(req.body);
	task.creatorUser = creatorUserId;
	const taskSaved = await task.save();
	res.status(HttpStatus.CREATED).send({ task: taskSaved });
};

exports.put = async (req, res) => {
	const task = new Task(req.body);
	await Task.replaceOne({ _id: task._id }, task, { upsert: true });
	res.status(HttpStatus.OK).send({ task: task });
};

exports.updateTaskStatus = async (req, res) => {
	const taskId = req.params['taskId'];
	const newStatus = req.params['newStatus'];
	const savedTask = await Task.updateOne({ _id: taskId }, { $set:{ status: newStatus, lastEdited: new Date() } } );
	res.status(HttpStatus.OK).send(savedTask);
};
