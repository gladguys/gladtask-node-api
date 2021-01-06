import * as mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const timeSpentSchema = mongoose.Schema({
	_id: { type: ObjectId, auto: true },
	taskId: { type: ObjectId },
	firstName: { type: String},
	lastName: { type: String},
	gladname: { type: String },
	minutesSpent: { type: Number },
	date: { type: Date }
});
timeSpentSchema.plugin(require('mongoose-autopopulate'));

export const TimeSpent = mongoose.model('TimeSpent', timeSpentSchema);
