import { Team } from '../models/team';
import { BaseService } from './baseService';

export class TeamService extends BaseService {

	constructor() {
		super(Team);
	}

	async saveTeam(team, creatorUserId) {
		team.manager = creatorUserId;
		team.participants = [creatorUserId];
		return await team.save();
	}
}