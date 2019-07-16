const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const projectSchema = mongoose.Schema({
	name: { type: String },
	description: { type: String },
	manager: { type: ObjectId, ref: 'User' },
	team: { type: ObjectId, ref: 'Team' },
	creationDate: { type: Date },
	participants: [{ type: ObjectId, ref: 'User' }],
	projectImage: { type: String }
});

module.exports = mongoose.model('Project', projectSchema);