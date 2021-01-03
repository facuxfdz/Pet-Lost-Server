const express = require('express');
const app = express();
const connectDB = require('./config/db');
const multer = require('multer');
const path = require('path');

const PORT = process.env.PORT || 4000;

// Configs
connectDB();
const storage = multer.diskStorage({ // config where the image is saved
	destination: path.join(__dirname, 'petimages/'),
	filename: (req, file, cb) => {
		cb(null, file.originalname); // Saving the image with the original name with the original extension
	}
});

// Middlewares
app.use(express.json({extended: true})); // Allow json using
app.use(multer({
	storage,
	dest: path.join(__dirname, './petimages/')
}).single('image'));

// Using routes
app.use('/api/users', require('./routes/users'));


// Launching app
app.listen(PORT, () =>{
	console.log(`Server on port ${PORT}`);
});
