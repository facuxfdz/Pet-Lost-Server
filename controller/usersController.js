const User = require('../models/User.js');

exports.createUser = (req, res) => {
		console.log(req.file);
		res.json({msg: "file received"});
}

exports.getUsers = (req, res) => {
	res.send('get');
}
