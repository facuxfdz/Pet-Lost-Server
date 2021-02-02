const LostPet = require('../models/LostPet');
const { checkErrors, showErrorToDebug } = require('../helpers/errorCheck');
const { searchPetOwner, isOwner } = require('../helpers/modelSearch');

exports.checkCode = async (req, res) => {

    try {

        checkErrors(req, res);

        const losPetData = await LostPet.findOne({code: req.params.code}).select('owner code isLost -_id'); 
        
        if(!losPetData) return res.status(404).json({msg: 'The provided code does not exist'});
        
        const userResponse = await searchPetOwner(losPetData);
        
        res.status(200).json({userResponse});        

    } catch (error) {

        showErrorToDebug(res);          

    }
    
}

exports.updatePetStatus = async (req, res) => {

    try {

        checkErrors(req, res);

        // Check if the user to edit is in conditions to be edited
        
        let pet = await LostPet.findOne({code: req.params.code}).select('isLost owner');
        
        if(!pet) return res.status(404).json({found: false, msg: 'There are no lost pets with that code registered'});
        
        if(!pet.isLost) return res.status(404).json({found: false, msg: 'There are no lost pets with that code registered'});
        
        const userIsOwner = await isOwner(req,res, pet.owner);
        
        if(!userIsOwner) return res.status(404).json({found: false, msg: 'Invalid owner provided'});
        
        // If everything is okay the pet will be informed as not lost anymore
        
        pet.isLost = false;
        
        const updatedPet = pet;
        
        await LostPet.findByIdAndUpdate(updatedPet._id, updatedPet, {new: true});
        
        res.status(200).json({found: true, msg: 'We are so glad you found your pet!'});

    } catch (error) {

        showErrorToDebug(res);
        
    }

}