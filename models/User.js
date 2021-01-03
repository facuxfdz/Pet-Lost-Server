const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	code: {
		type: Number,
		required: true,
		trim: true
	},
	name: {
		type: String,
		required: true,
		trim: true
	},
	photo: {
		type: String,
		data: Buffer
	},
	contact: {
		type: String,
		required: true,
		trim: true
	},
	lost_at: {
		type: Date,
		required: true
	}
});

module.exports = mongoose.model('User', UserSchema);
