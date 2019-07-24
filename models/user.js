import * as mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = mongoose.Schema({
	_id: { type: ObjectId, auto: true },
	username: { type: String },
	password: { type: String },
	firstName: { type: String },
	lastName: { type: String },
	email: { type: String },
	profileEnum: { type: String },
	profilePhoto: { type: String },
	creationDate: { type: Date, default: new Date() }
});

export const User = mongoose.model('User', userSchema);
