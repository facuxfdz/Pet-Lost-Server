const express = require('express');
const router = express.Router();
const informController = require('../controller/informController');
const { param } = require('express-validator');
const auth = require('../middleware/auth');

// Endpoint that bring the lost pet data to any user (via GET petition). When a PUT petition is done, the pet is informed as "found"
// (only an authenticated user can access to this URL) 
// /api/inform
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