const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	code: {
		type: Number,
		required: true,
		trim: true,
		unique: true
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
	photo_url: { // LostPet
		type: String,
		required: true
	},
	public_id: { // LostPet
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	lost_at: { // LostPet
		type: Date,
		required: true
	},
	isLost: { // LostPet
		type: Boolean,
		required: true
	}
});

module.exports = mongoose.model('User', UserSchema);
