const HttpStatus = require('http-status-codes');

const TaskComment = require('../models/taskComment');

exports.saveTaskComment = async (req, res) => {
	const taskId = req.params['taskId'];
	const taskComment = new TaskComment(req.body);
	taskComment.taskId = taskId;
	const commentSaved = await taskComment.save();
	res.status(HttpStatus.CREATED).send(commentSaved);
};