const express = require('express');
const router = express.Router();
const informController = require('../controller/informController');
const { param } = require('express-validator');
const auth = require('../middleware/auth');

router.get('/:code',
    [
        param('code', 'Invalid code provided').isInt({min: 0})
    ],
    informController.checkCode
);

router.put('/:code', 
    auth,    
    [
        param('code', 'Invalid code provided').isInt({min: 0})
    ],
    informController.updatePetStatus
);

module.exports = router;