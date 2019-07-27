import { TimeSpent } from '../models/timeSpent';
import { BaseService } from './baseService';

export class TimeSpentService extends BaseService {

	constructor() {
		super(TimeSpent);
	}

	async saveTimeSpent(timeSpent, taskId) {
		timeSpent.taskId = taskId;
		return await timeSpent.save();
	}
}