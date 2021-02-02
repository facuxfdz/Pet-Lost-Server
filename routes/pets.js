const express = require('express');
const router = express.Router();
const petsController = require('../controller/petsController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// Endpoint that register a lost pet (just an authenticated user can access to this url)
// /api/pets
router.post('/',
    auth,
    [
        check('lost_at', 'All fields are required').not().isEmpty(),
        check('lost_at', 'lost_at must be a Date').isDate()
    ],
    petsController.registerLostPet
);  

module.exports = router;