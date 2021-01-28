import * as mongoose from 'mongoose';

import { User } from './user';

const ObjectId = mongoose.Schema.Types.ObjectId;

const ProjectSchema = mongoose.Schema({
	_id: { type: ObjectId, auto: true },
	name: { type: String },
	description: { type: String },
	manager: { type: ObjectId, ref: User, autopopulate: true },
	creationDate: { type: Date },
	participants: [{ type: ObjectId, ref: User, autopopulate: true }],
	projectImage: { type: String }
});
projectSchema.plugin(require('mongoose-autopopulate'));

export default ProjectSchema;
