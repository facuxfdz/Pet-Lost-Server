const express = require('express');
const router = express.Router();
const usersController = require('../controller/usersController');
const auth = require ('../middleware/auth');

router.post('/',
	usersController.createUser
);

router.get('/',
	auth,
	usersController.getUsers
);

module.exports = router;
