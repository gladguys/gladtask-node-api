const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const teamSchema = mongoose.Schema({
	name: { type: String },
	manager: { type: ObjectId, ref: 'User' },
	participants: [{ type: ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Team', teamSchema);
