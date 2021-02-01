const User = require('../models/User');

exports.searchPetOwner = async petData => {
    
    const ownerData = await User.findById({_id: petData.owner});
    let userResponse = {};
    userResponse.petCode = petData.code;
    userResponse.ownerName = ownerData.name;
    userResponse.ownerEmail = ownerData.email;
    
    return userResponse;
} 

exports.isOwner = async (req, res, ownerID) => {
    const dbResponse = await User.findById({_id: ownerID}).select('_id');
    if(!dbResponse) return res.status(404).json({found: false, msg: 'Invalid owner id'});
    if (JSON.stringify(ownerID) === JSON.stringify(req.user.id)) return true;
    return false;
}