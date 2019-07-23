import * as mongoose from 'mongoose';

import { User } from './user';
import { Team } from './team';

const ObjectId = mongoose.Schema.Types.ObjectId;

const projectSchema = mongoose.Schema({
	_id: { type: ObjectId, auto: true },
	name: { type: String },
	description: { type: String },
	manager: { type: ObjectId, ref: User, autopopulate: true },
	team: { type: ObjectId, ref: Team, autopopulate: true },
	creationDate: { type: Date },
	participants: [{ type: ObjectId, ref: User, autopopulate: true }],
	projectImage: { type: String }
});
projectSchema.plugin(require('mongoose-autopopulate'));

export const Project = mongoose.model('Project', projectSchema);
