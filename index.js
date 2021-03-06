const express = require('express');
const app = express();
const connectDB = require('./config/db');
const multer = require('multer');
const path = require('path');
const filevalidation = require('./helpers/filevalidation');
const cloudinary = require('cloudinary');
const PORT = process.env.PORT || 4000;

// Configs
connectDB();

const storage = multer.diskStorage({ // config where and how the image is saved

	destination: path.join(__dirname, 'petimages/'),

	filename: (req, file, cb) => {

		const imageName = new Date().getTime() + path.extname(file.originalname);

		cb(null, imageName); // Saving the image with the original name with a unique name

	}

});

cloudinary.config({

	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,

	api_key: process.env.CLOUDINARY_API_KEY,

	api_secret: process.env.CLOUDINARY_API_SECRET

});

// Middlewares
app.use(express.json({extended: true})); // Allow json using

app.use(multer({

	fileFilter: (req, file, cb) => {

		try {
			
			filevalidation.validateFile(file); 

			/* 
			validateFile throw error if the file has the incorrect extension
			but not if the file doesn't exist (because multer middleware is not even launched, that validation is done in the usersController)
			*/

			cb(null,true); // If the validation goes okay the file is saved

		} catch (error) {

			const errorColour = "\x1b[1;31m%s\x1b[0m"; 

			console.log(errorColour, 'An error has ocurred');

			cb(null,false); // If the validation goes wrong the file is not saved

		}

	},

	storage

}).single('image'));

// Using routes
app.use('/api/users', require('./routes/users'));

app.use('/api/login', require('./routes/login'));

app.use('/api/main', require('./routes/main'));

app.use('/api/inform', require('./routes/inform'));

app.use('/api/pets', require('./routes/pets'));

// Launching app
app.listen(PORT, () =>{

	console.log(`Server on port ${PORT}`);

});
