const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const User = require('./user');
const Team = require('./team');

const invitationSchema = mongoose.Schema({
	_id: { type: ObjectId, auto: true },
	author: { type: ObjectId, ref: User, autopopulate: true },
	receiver: { type: ObjectId, ref: User, autopopulate: true },
	team: { type: ObjectId, ref: Team, autopopulate: true },
	isActive: { type: Boolean }
});
invitationSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Invitation', invitationSchema);
