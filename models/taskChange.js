const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const taskChangeSchema = mongoose.Schema({
	_id: { type: ObjectId, auto: true },
	taskId: { type: ObjectId, unique: false },
	userFirstName: { type: String },
	date: { type: Date },
	whatHasChanged: { type: String },
	oldValue: { type: String },
	newValue: { type: String }
});
taskChangeSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('TaskChange', taskChangeSchema);