const { checkErrors, showErrorToDebug } = require('../helpers/errorCheck');
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.authUser = async (req, res) => {
    
    
    
    try {
        
        checkErrors(req,res);

        const { email, password } = req.body;

        // Check email field

        let user = await User.findOne({ email });
        
        if(!user){
        
            return res.status(400).json({auth: false, msg: 'Email not exists'});
        
        }

        // Check password field
        
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
        
        showErrorToDebug(res);
        
    }

}