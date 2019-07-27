import * as mongoose from 'mongoose';

import { User } from './user';

const ObjectId = mongoose.Schema.Types.ObjectId;

const taskCommentSchema = mongoose.Schema({
	_id: { type: ObjectId, auto: true },
	taskId: { type: ObjectId },
	user: { type: ObjectId, ref: User, autopopulate: true },
	date: { type: Date },
	text: { type: String }
});
taskCommentSchema.plugin(require('mongoose-autopopulate'));

export const TaskComment = mongoose.model('TaskComment', taskCommentSchema);
