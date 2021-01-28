const User = require('../models/User');
const { validationResult } = require('express-validator');

exports.checkCode = async (req, res) => {
    try {

        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({errors});

        const response = await User.findOne({code: req.params.code}).select('code email isLost -_id');
        if(!response) return res.status(404).json({msg: 'The provided code does not exist'});
    
        res.status(200).json({response});        

    } catch (error) {
        res.status(500).json({error, msg: 'An error has ocurred'});        
    }
}

exports.updatePetStatus = async (req, res) => {
    try {

        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({errors});

        // Check if the user to edit is in conditions to be edited
        let oldUser = await User.findOne({code: req.params.code}).select('isLost');
        if(!oldUser) return res.status(404).json({msg: 'There are no lost pets with that code registered'});
        if(!oldUser.isLost) return res.status(404).json({msg: 'There are no lost pets with that code registered'});

        // If everything is okay the pet will be informed as not lost anymore
        oldUser.isLost = false;

        await User.findByIdAndUpdate(oldUser._id, oldUser, {new: true});
        res.status(200).json({found: true, msg: 'Thanks for inform this to its owner!'});

    } catch (error) {
        res.status(500).json({msg: 'An error has ocurred'});
    }
}