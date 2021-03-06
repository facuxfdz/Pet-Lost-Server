const filevalidation = require('../helpers/filevalidation');
const { v4: uuidv4 } = require('uuid'); 
const LostPet = require('../models/LostPet');
const fs = require('fs-extra');
const cloudinary = require('cloudinary');
const { checkErrors, showErrorToDebug } = require('../helpers/errorCheck');
exports.registerLostPet = async (req, res) => {

    
    try {
        
        checkErrors(req,res);
        
        /* 	
        Multer middleware is launched just when a file is sended to our server, 
        because of this we have to validate here that there are some file uploaded
        */
        filevalidation.validateFile(req.file);
        
        // Create the newUser and fill all this fields to save it in our DB
        
        let newPet = {};
        
        const code = parseInt(uuidv4());
        
        const { lost_at } = req.body;
        
        const cloudinaryResult = await cloudinary.v2.uploader.upload(req.file.path);
        
        const photo_url = cloudinaryResult.secure_url; // Add photo url after the result JSON object is generated by cloudinary
        
        const public_id = cloudinaryResult.public_id; // Add public id after the result JSON object is generated by cloudinary
        
        newPet.owner = req.user.id;
        
        newPet.code = code;
        
        newPet.photo_url = photo_url;
        
        newPet.public_id = public_id;
        
        newPet.lost_at = lost_at;

        const pet = new LostPet(newPet);
        
        await pet.save();
        
        await fs.unlink(req.file.path); // Delete the file from our server

        res.status(200).json({msg: 'Pet reported as lost successfully', code});
    
    } catch (error) {

        showErrorToDebug(res, error);

    }

}