import { hashSync } from 'bcrypt';

import { User } from '../models/user';
import { Team } from '../models/team';
import { TeamService } from './teamService';
import { BaseService } from './baseService';
import { config } from '../config';

const mongoose = require('mongoose');
const teamService = new TeamService();

export class UserService extends BaseService {

	constructor() {
		super(User);
	}

	async saveUser(userFromRequest, teamId) {
		const user = new User(userFromRequest);
		user._id = mongoose.Types.ObjectId();
		user.password = hashSync(userFromRequest['password'], config.bcryptSaltRounds);
		const savedUser = await this.save(user);

		if (teamId) {
			const existingTeam = await teamService.findById(teamId);
			existingTeam.participants.push(savedUser._id);
			await existingTeam.findOneAndUpdate({ _id: teamId }, { $set:{ participants: existingTeam.participants } });
		} else {
			const team = new Team({ teamId });
			team.name = 'Meu time';
			team.manager = savedUser._id;
			team.participants = [savedUser._id];
			await teamService.save(team);
		}
	}
}
