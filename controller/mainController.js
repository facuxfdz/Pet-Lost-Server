const User = require('../models/User');
const { validationResult } = require('express-validator');

// Gets all the url images (lost pets)
exports.getData = async (req, res) => {
    
    try {

        let response = await User.find({}).select('code photo_url isLost -_id');
        if(response.length === 0) return res.status(200).json({msg: 'There are no lost pets yet'});
        
        // Filter the response to show only lost pets
        response = response.filter(i => i.isLost);
        if(response.length === 0) return res.status(200).json({msg: 'There are no lost pets yet'});

        res.json({response, msg: 'These are the lost pets that we have registered. Did you see any of them?'});
    } catch (error) {
        res.status(500).json({error, msg: 'Server error :('});
    }
}

// Gets a limit of url images using a "limit" param in the url
exports.getLimitData = async (req, res) => {

    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors});
        }

        let response = await User.find({}).select('code photo_url isLost -_id');
        if(response.length === 0) return res.status(200).json({msg: 'There are no lost pets yet'});
        
        // Filter the response to show only lost pets
        let i = 0;
        response = response.map( user => {
            console.log(i);
            if(i < req.params.limit && user.isLost){
                i++;
                return user;
            }
            return;
        });
        response = response.filter(user => user);
        console.log(response);
        if(response.length === 0) return res.status(200).json({msg: 'There are no lost pets yet'});

        res.status(200).json({response, msg: 'These are the lost pets that we have registered. Did you see any of them?'});
    } catch (error) {
        res.status(500).json({error, msg: 'Server error'});
    }
}