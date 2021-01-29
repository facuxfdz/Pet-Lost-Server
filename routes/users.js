const express = require('express');
const router = express.Router();
const usersController = require('../controller/usersController');
const { check } = require('express-validator');

router.post('/',
	[
		check('name', 'All fields are required').not().isEmpty(),
		check('password', 'All fields are required').not().isEmpty(),
		check('email', 'All fields are required').not().isEmpty(),
		check('password', 'Password must be at least 6 characters in length').isLength({min: 6}),
		check('email', 'Email is not valid').isEmail()
	],
	usersController.createUser
);

module.exports = router;
