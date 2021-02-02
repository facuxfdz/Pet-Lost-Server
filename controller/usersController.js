const User = require('../models/User.js');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { checkErrors, showErrorToDebug } = require('../helpers/errorCheck');

exports.createUser = async (req, res) => {

	
	try {		
		
		checkErrors(req,res);
		
		const { name, password, email } = req.body; // Take all the fields from each key value part of req.body
		
		// Check if the user already exists
		
		let newUser = await User.findOne({ email });
		
		if(newUser) return res.status(400).json({ auth: false, msg: 'User already exists' });
		
		// Create DB object with the req object data
		
		newUser = {};
		
		newUser.name = name;
		
		newUser.email = email;

		// Password hash
		
		const salt = await bcryptjs.genSalt(10);
		
		newUser.password = await bcryptjs.hash(password, salt);
		
		// Create DB object with hashed password
		
		const user = new User(newUser);

		// Save the data into our DB and delete the saved file
		
		await user.save();
				
		// Create JWT
		
		const payload = {
		
			user: { id: user._id }
		
		}
		
		jwt.sign(payload, process.env.SECRET, {
		
			expiresIn: 86400
		
		}, (error, token) => {
		
			if(error){
		
				throw 'sign failed';
		
			}
			
			// Inform successful data saving
		
			const SUCCESS_COLOR = "\x1b[1;32m%s\x1b[0m";
		
			console.log(SUCCESS_COLOR, 'Data saved successfully');	
		
			res.status(200).json({auth: true, token});
		});

	}catch(error){

		showErrorToDebug(res, error);

		
	}

}
