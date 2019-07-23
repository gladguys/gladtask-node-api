import * as mongoose from 'mongoose';

import { User } from './user';
import { Team } from './team';

const ObjectId = mongoose.Schema.Types.ObjectId;

const invitationSchema = mongoose.Schema({
	_id: { type: ObjectId, auto: true },
	author: { type: ObjectId, ref: User, autopopulate: true },
	receiver: { type: ObjectId, ref: User, autopopulate: true },
	team: { type: ObjectId, ref: Team, autopopulate: true },
	isActive: { type: Boolean }
});
invitationSchema.plugin(require('mongoose-autopopulate'));

export const Invitation = mongoose.model('Invitation', invitationSchema);
