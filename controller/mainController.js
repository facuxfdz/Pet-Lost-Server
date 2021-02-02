const LostPet = require('../models/LostPet');
const { lostPetsFilter, lostPetsWLimitFilter } = require('../helpers/filter');
const { checkErrors, showErrorToDebug } = require('../helpers/errorCheck');

// Gets all the url images (lost pets)
exports.getData = async (req, res) => {
    
    try {

        let lostPetResponse = await LostPet.find({}).select('code photo_url isLost lost_at -_id');

        const userResponse = lostPetsFilter(req, res, lostPetResponse);
        
        res.json({userResponse, msg: 'These are the lost pets that we have registered. Did you see any of them?'});

    } catch (error) {
        
        showErrorToDebug(res);
        
    }
}

// Gets a limit of url images using a "limit" param in the url
exports.getLimitData = async (req, res) => {

    try {

        checkErrors(req,res);

        let lostPetResponse = await LostPet.find({}).select('code photo_url isLost lost_at -_id');

        const userResponse = lostPetsWLimitFilter(req, res, lostPetResponse);

        res.status(200).json({userResponse, msg: 'These are the lost pets that we have registered. Did you see any of them?'});

    } catch (error) {
        
        showErrorToDebug(res);

    }
}