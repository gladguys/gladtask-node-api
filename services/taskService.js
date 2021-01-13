import { Task } from '../models/task';
import { BaseService } from './baseService';
import { TaskCommentService } from './taskCommentService';
import { TimeSpentService } from './timeSpentService';
import { TaskChangeService } from './taskChangeService';

const taskCommentService = new TaskCommentService();
const timeSpentServie = new TimeSpentService();
const taskChangeService = new TaskChangeService();

const moment = require('moment');

export class TaskService extends BaseService {

	constructor() {
		super(Task);
	}

	async getTaskById(taskId) {
		const taskFound = await Task.findById(taskId);
		taskFound.taskComments = await taskCommentService.findByQuery({ taskId: taskId });
		taskFound.timeSpentValues = await timeSpentServie.findByQuery({ taskId: taskId });
		taskFound.taskChanges = await taskChangeService.findByQuery({ taskId: taskId });

		return taskFound;
	}

	async getUserTasksDueWithinDays(userId, days) {
		const date = new Date();
		const futureDate = moment(date).add(days, 'days').toISOString();

		return await Task.find({
			targetUser: userId,
			dueDate : { $lt:  futureDate },
		});
	}

	async getLast4UserEditedTasks(userId) {
		return await Task.find({ targetUser: userId })
			.sort({ 'lastEdited': -1 })
			.limit(4);
	}

	async saveTask(task, creatorUserId) {
		task.creatorUser = creatorUserId;
		return await task.save();
	}

	async updateTaskStatus(taskId, newStatus) {
		return await await Task.updateOne({ _id: taskId }, { $set: { status: newStatus, lastEdited: new Date() } });
	}
}