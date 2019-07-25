import { TaskChange } from '../models/taskChange';
import { BaseService } from './baseService';

export class TaskChangeService extends BaseService {

	constructor() {
		super(TaskChange);
	}

	async saveTaskChange(taskChange, taskId) {
		taskChange.taskId = taskId;
		return await taskChange.save();
	}
}