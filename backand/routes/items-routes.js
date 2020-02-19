const express = require('express');
const { check } = require('express-validator');

const itemsController = require('../controllers/items-controllers')

const router = express.Router();

router.get('/', itemsController.getAllItems); 
router.get('/:itemId', itemsController.getItemById);
router.post('/', 
    [ 
      check('title').not().isEmpty(),
      check('content').isLength({ min: 5 }),
    ], 
    itemsController.createItem,
); 
router.put('/:itemId', 
    [ 
      check('title').not().isEmpty(),
      check('content').isLength({ min: 5 }),
    ], 
    itemsController.updateItem
); 
router.delete('/:itemId', itemsController.deleteItem); 

module.exports = router;