const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const taskSchema = mongoose.Schema({
	_id: { type: ObjectId, auto: true },
	title: { type: String },
	status: {
		type: String,
		enum : ['CRIADA', 'EM ESPERA', 'EM ANDAMENTO', 'CONCLUIDA'],
		default: 'CRIADA'
	},
	project: { type: ObjectId, ref: 'Project', autopopulate: true },
	priority: {
		type: String,
		enum : ['Baixo', 'Normal', 'Alto'],
		default: 'Normal'
	},
	image: { type: String },
	dueDate: { type: Date },
	lastEdited: { type: Date },
	creatorUser: { type: ObjectId, ref: 'User', autopopulate: true },
	targetUser: { type: ObjectId, ref: 'User', autopopulate: true },
	senderUser: { type: ObjectId, ref: 'User', autopopulate: true },
	creationDate: { type: Date },
	description: { type: String },
	taskType: {
		type: String,
		enum : ['Documentação', 'Feature', 'Bug', 'Melhoria', 'Teste', 'Alinhamento', 'Reunião', 'Outro'],
		default: 'Outro'
	},
	estimatedTime: { type: String },
	taskChanges: [{ type: ObjectId, ref: 'TaskChange', autopopulate: true }],
	taskComments: [{ type: ObjectId, ref: 'TaskComment', autopopulate: true }],
	timeSpentValues: [{ type: ObjectId, ref: 'TimeSpent', autopopulate: true }]
});
taskSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Task', taskSchema);