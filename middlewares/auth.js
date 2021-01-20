const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
	// Reader token from header
	const token = req.header('x-auth-token');

	if(!token){
		return res.status(401).json({msg: 'There is no token, invalid permission'});
	}

	// If there is some token it will be verified
	try{
		const encryption = jwt.verify(token,process.env.SECRET);
		req.user = encryption.user;
		next();
	}catch(err){
		res.status(401).json({msg: 'Invalid token'});
	}
}
