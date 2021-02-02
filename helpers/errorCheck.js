const { validationResult } = require('express-validator');

exports.checkErrors = (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors});
    }
}

exports.showErrorToDebug = (res) => {
    
    const ERROR_COLOR = "\x1b[1;31m%s\x1b[0m"; 
    
    console.log(ERROR_COLOR, "An error has ocurred");

    console.log(ERROR_COLOR, error);

    return res.status(500).json({msg: 'An error has ocurred', error});

}