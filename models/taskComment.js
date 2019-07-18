const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const taskCommentSchema = mongoose.Schema({
	_id: { type: ObjectId, auto: true },
	user: { type: ObjectId, ref: 'User', autopopulate: true },
	date: { type: Date },
	text: { type: String }
});
taskCommentSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('TaskComment', taskCommentSchema);