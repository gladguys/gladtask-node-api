const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const invitationSchema = mongoose.Schema({
	_id: { type: mongoose.Schema.ObjectId, auto: true },
	author: { type: ObjectId, ref: 'User', autopopulate: true },
	receiver: { type: ObjectId, ref: 'User', autopopulate: true },
	team: { type: ObjectId, ref: 'Team', autopopulate: true },
	isActive: { type: Boolean }
});
invitationSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Invitation', invitationSchema);
