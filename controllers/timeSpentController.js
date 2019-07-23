const HttpStatus = require('http-status-codes');

const TimeSpent = require('../models/timeSpent');

exports.saveTimeSpent = async (req, res) => {
	const taskId = req.params['taskId'];
	const timeSpent = new TimeSpent(req.body);
	timeSpent.taskId = taskId;
	const timeSpentSaved = await timeSpent.save();
	res.status(HttpStatus.CREATED).send(timeSpentSaved);
};