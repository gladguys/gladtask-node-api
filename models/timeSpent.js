const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const timeSpentSchema = mongoose.Schema({
	_id: { type: ObjectId, auto: true },
	gladname: { type: String },
	minutesSpent: { type: Number },
	date: { type: Date }
});
timeSpentSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('TimeSpent', timeSpentSchema);