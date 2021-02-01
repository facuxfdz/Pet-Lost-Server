const LostPet = require('../models/LostPet');
const { lostPetsFilter, lostPetsWLimitFilter } = require('../helpers/filter');
const { checkErrors } = require('../helpers/errorCheck');

// Gets all the url images (lost pets)
exports.getData = async (req, res) => {
    
    try {

        let dbResponse = await LostPet.find({}).select('code photo_url isLost lost_at -_id');

        const userResponse = lostPetsFilter(req, res, dbResponse);
        
        res.json({userResponse, msg: 'These are the lost pets that we have registered. Did you see any of them?'});

    } catch (error) {
        res.status(500).json({error, msg: 'Server error :('});
    }
}

// Gets a limit of url images using a "limit" param in the url
exports.getLimitData = async (req, res) => {

    try {

        checkErrors(req,res);

        let dbResponse = await LostPet.find({}).select('code photo_url isLost lost_at -_id');

        const userResponse = lostPetsWLimitFilter(req, res, dbResponse);

        res.status(200).json({userResponse, msg: 'These are the lost pets that we have registered. Did you see any of them?'});

    } catch (error) {
        res.status(500).json({error, msg: 'Server error'});
    }
}