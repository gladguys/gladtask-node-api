const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const invitationSchema = mongoose.Schema({
	author: { type: ObjectId, ref: 'User' },
	receiver: { type: ObjectId, ref: 'User' },
	team: { type: ObjectId, ref: 'Team' },
	isActive: { type: Boolean }
});

module.exports = mongoose.model('Invitation', invitationSchema);