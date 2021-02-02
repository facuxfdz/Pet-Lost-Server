const express = require('express');
const router = express.Router();
const mainController = require('../controller/mainController');
const { param } = require('express-validator');

// Endpoint that bring all (or a limited amount as well) lost pets
// /api/main
router.get('/', 
    mainController.getData
);

router.get('/:limit', 
    [
        param('limit', 'Invalid limit provided').isInt({min: 1})
    ],
    mainController.getLimitData
);

module.exports = router;