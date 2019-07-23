import * as mongoose from 'mongoose';

import { User } from './user';

const ObjectId = mongoose.Schema.Types.ObjectId;

const teamSchema = mongoose.Schema({
	_id: { type: ObjectId, auto: true },
	name: { type: String },
	manager: { type: ObjectId, ref: User, autopopulate: true },
	participants: [{ type: ObjectId, ref: User, autopopulate: true }]
});
teamSchema.plugin(require('mongoose-autopopulate'));

export const Team = mongoose.model('Team', teamSchema);
