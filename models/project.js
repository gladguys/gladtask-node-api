const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const projectSchema = mongoose.Schema({
	_id: { type: mongoose.Schema.ObjectId, auto: true },
	name: { type: String },
	description: { type: String },
	manager: { type: ObjectId, ref: 'User', autopopulate: true },
	team: { type: ObjectId, ref: 'Team', autopopulate: true },
	creationDate: { type: Date },
	participants: [{ type: ObjectId, ref: 'User', autopopulate: true }],
	projectImage: { type: String }
});
projectSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Project', projectSchema);