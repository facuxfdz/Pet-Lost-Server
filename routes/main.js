const express = require('express');
const router = express.Router();
const mainController = require('../controller/mainController');
const { param } = require('express-validator');

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