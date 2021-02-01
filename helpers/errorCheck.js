const { validationResult } = require('express-validator');

exports.checkErrors = (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors});
    }
}