const User = require('../models/User.js');
const filevalidation = require('../service/filevalidation');

exports.createUser = async (req, res) => {

	try {
		
		filevalidation.validateFile(req.file); 
		/* 	
			Multer middleware is launched just when a file is sended to our server, 
			because of this we have to validate here that there are some file uploaded
		*/
		
		// Create DB object
		const newUser = {};
		const {code, name, contact, lost_at} = JSON.parse(req.body.data);
		newUser.code = code;
		newUser.name = name;
		newUser.photo = req.file;
		newUser.contact = contact;
		newUser.lost_at = lost_at;
				
		// Save Data
		const user = new User(newUser);
		await user.save();		
		
		const successColour = "\x1b[1;32m%s\x1b[0m";
		console.log(successColour, 'Data saved successfully');
		res.json({msg: "Data saved successfully"});

	}catch(error){ // Error thrown if the file doesn't exist, the data validation and extension validation were made by multer middleware 

		const errorColour = "\x1b[1;31m%s\x1b[0m"; 
		console.log(errorColour, "Invalid data format");

		res.json({error: "Invalid data format"});
	}
}

exports.getUsers = (req, res) => {
	res.send('get');
}
