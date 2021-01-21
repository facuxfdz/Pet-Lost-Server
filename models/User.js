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
	password: {
		type: String,
		required: true,
		trim: true
	},
	photo_url: {
		type: String,
		required: true
	},
	public_id: {
		type: String,
		required: true,
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
