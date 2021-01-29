const mongoose = require('mongoose');

const LostPetSchema = mongoose.Schema({
    
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    code: {
		type: Number,
		required: true,
		unique: true
    },
    
    photo_url: {
		type: String,
		required: true
    },

    public_id: {
		type: String,
		required: true,
    },

	lost_at: { 
		type: Date,
		required: true
    },    
    
	isLost: {
		type: Boolean,
		required: true,
		default: true
    }
        
});

module.exports = mongoose.model('LostPet', LostPetSchema);