const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    
    // Read header token
    const token = req.header('x-auth-token');

    // If there is no token
    if(!token){
        return res.status(401).json({auth: false, msg: 'No token provided'});
    }

    // Validate token
    try {
        const encryption = jwt.verify(token, process.env.SECRET);
        req.user = encryption.user;
        next();
    } catch (error) {
        res.status(401).json({auth: false, msg: 'Failed to authenticate token'});
    }
}
