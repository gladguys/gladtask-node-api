const HttpStatus = require('http-status-codes');

const TaskChange = require('../models/taskChange');

exports.saveTaskChange = async (req, res) => {
	const taskId = req.params['taskId'];
	const taskChange = new TaskChange(req.body);
	taskChange.taskId = taskId;
	const taskChangeSaved = await taskChange.save();
	res.status(HttpStatus.OK).json(taskChangeSaved);
};