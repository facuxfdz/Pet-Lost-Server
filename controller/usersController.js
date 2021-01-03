const User = require('../models/User.js');
const path = require('path');
const filevalidation = require('../service/filevalidation');

exports.createUser = (req, res) => {

	try {
		
		filevalidation.validateFile(req.file);
		console.log(req.file);
		res.json({msg: "File received"});
	}catch(error){
		const errorColour = "\x1b[1;31m%s\x1b[0m"; 
		console.log(errorColour, "Invalid file extension");
		res.json({error: "Invalid file extension"});
	}
}

exports.getUsers = (req, res) => {
	res.send('get');
}
