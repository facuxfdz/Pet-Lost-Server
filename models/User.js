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
		type: Map,
		of: String,
		required: true,
		trim: true
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
