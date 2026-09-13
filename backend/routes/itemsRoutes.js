const express = require('express');

const router = express.Router();

const itemController = require('../controller/itemController');

// Add item
router.post('/item/add-item', itemController.addItem);

// Get all items
router.get('/item/get-items', itemController.getItems);

// Update quantity
router.put('/item/update-quantity/:id', itemController.updateQuantity);

module.exports = router;