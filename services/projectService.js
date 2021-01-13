import { Project } from '../models/project';
import { BaseService } from './baseService';

export class ProjectService extends BaseService {

	constructor() {
		super(Project);
	}

	async saveProject(project, creatorUserId) {
		project.participants = [creatorUserId];
		const projectCreated = await project.save();
		return projectCreated;
	};
}