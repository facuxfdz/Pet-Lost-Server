const { validationResult } = require('express-validator');
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.authUser = async (req, res) => {
    
    // Check for errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({auth: false, msg: 'Email not exists'});
        }

        // Check password
        const rightPass = await bcryptjs.compare(password, user.password);
        if(!rightPass){
            return res.status(400).json({auth: false, msg: 'Password is incorrect'});
        }

        // Sign jwt
        const payload = {
            user: {
                id: user._id
            }
        };
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 86400 // 24 hours
        }, (error, token) => {
            if(error) throw error;
            res.status(200).json({auth: true, msg: 'Hi!', token});
        });

    } catch (error) {
        res.status(500).json({auth: false, msg: 'An error has ocurred'});
    }

}