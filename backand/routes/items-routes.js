const express = require('express');

const itemsController = require('../controllers/items-controllers')

const router = express.Router();

router.get('/', itemsController.getAllItems); 
router.get('/:itemId', itemsController.getItemById);
router.post('/', itemsController.createItem); 
router.put('/:itemId', itemsController.updateItem); 
router.delete('/:itemId', itemsController.deleteItem); 

module.exports = router;