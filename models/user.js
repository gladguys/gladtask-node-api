const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	username: { type: String },
	password: { type: String },
	firstName: { type: String },
	lastName: { type: String },
	email: { type: String },
	profileEnum: { type: String },
	profilePhoto: { type: String }
});

module.exports = mongoose.model('User', userSchema);
