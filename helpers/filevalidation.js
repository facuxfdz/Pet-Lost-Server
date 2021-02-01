const path = require('path');

exports.validateFile = file => {
	
	if(!file){
		throw new Error();
	}
	const filetypes = /jpeg|jpg|png/;
	const mimetype = filetypes.test(file.mimetype);
	const extname = filetypes.test(path.extname(file.originalname));

	if(!mimetype || !extname){
		throw new Error();
	}

}
