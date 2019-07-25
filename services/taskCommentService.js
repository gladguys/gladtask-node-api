import { TaskComment } from '../models/taskComment';
import { BaseService } from './baseService';

export class TaskCommentService extends BaseService {

	constructor() {
		super(TaskComment);
	}

	async saveTaskComment(taskComment, taskId) {
		taskComment.taskId = taskId;
		return await taskComment.save();
	}
}