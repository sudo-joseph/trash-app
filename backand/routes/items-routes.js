const express = require('express');

const itemsController = require('../controllers/items-controllers')

const router = express.Router();

router.get('/', itemsController.getAllItems); 
router.get('/:itemId', itemsController.getItemById);

module.exports = router;