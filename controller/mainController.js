const User = require('../models/User');
const { validationResult } = require('express-validator');

exports.getData = async (req, res) => {
    
    try {
        const response = await User.find({}).select('photo_url -_id');
        if(response.length === 0) return res.status(200).json({response, msg: 'There are no lost pets yet'});
        
        res.json({response, msg: 'These are the lost pets that we have registered. Did you see any of them?'});
    } catch (error) {
        res.status(500).json({error, msg: 'Server error :('});
    }
}

exports.getLimitData = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors});
        }

        const response = await User.find({}).select('photo_url -_id').limit(parseInt(req.params.limit));

        res.status(200).json({response, msg: 'These are the lost pets that we have registered. Did you see any of them?'});
    } catch (error) {
        res.status(500).json({error, msg: 'Server error'});
    }
}