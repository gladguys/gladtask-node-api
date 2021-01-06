import * as mongoose from 'mongoose';

import { User } from './user';
import { TaskChange } from './taskChange';
import { TaskComment } from './taskComment';
import { TimeSpent } from './timeSpent';

const ObjectId = mongoose.Schema.Types.ObjectId;

const taskSchema = mongoose.Schema({
	_id: { type: ObjectId, auto: true },
	title: { type: String },
	status: {
		type: String,
		enum: ['CRIADA', 'EM_ESPERA', 'EM_ANDAMENTO', 'CONCLUIDA'],
		default: 'CRIADA'
	},
	project: { type: ObjectId, ref: 'Project', autopopulate: true },
	priority: {
		type: String,
		enum: ['Baixa', 'Normal', 'Alta'],
		default: 'Normal'
	},
	image: { type: String },
	dueDate: { type: Date },
	lastEdited: { type: Date, default: new Date() },
	creatorUser: { type: ObjectId, ref: User, autopopulate: true },
	targetUser: { type: ObjectId, ref: User, autopopulate: true },
	senderUser: { type: ObjectId, ref: User, autopopulate: true },
	creationDate: { type: Date, default: new Date() },
	description: { type: String },
	taskType: {
		type: String,
		enum: ['Documentação', 'Feature', 'Bug', 'Melhoria', 'Teste', 'Alinhamento', 'Reunião', 'Outro'],
		default: 'Outro'
	},
	estimatedTime: { type: String },
	taskChanges: [{ type: TaskChange.schema }],
	taskComments: [{ type: TaskComment.schema }],
	timeSpentValues: [{ type: TimeSpent.schema }]
});
taskSchema.plugin(require('mongoose-autopopulate'));

export const Task = mongoose.model('Task', taskSchema);
