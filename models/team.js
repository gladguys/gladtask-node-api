const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const teamSchema = mongoose.Schema({
	_id: { type: mongoose.Schema.ObjectId, auto: true },
	name: { type: String },
	manager: { type: ObjectId, ref: 'User', autopopulate: true },
	participants: [{ type: ObjectId, ref: 'User', autopopulate: true }]
});
teamSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Team', teamSchema);
