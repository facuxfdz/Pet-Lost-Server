const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const { check } = require('express-validator');

router.post('/',
    [
        check('email', 'All fields are required').not().isEmpty(),
        check('password', 'All fields are required').not().isEmpty(),
        check('email', 'Email is not valid').isEmail(),
        check('password', 'Password must be at least 6 characters in length').isLength({min: 6})
    ],
    authController.authUser
);

module.exports = router;