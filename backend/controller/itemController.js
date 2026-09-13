const Item = require('../models/items');

// Add item
const addItem = async (req, res) => {
    try {
        const {itemName, description, price, quantity} = req.body;
        const item = await Item.create({
            itemName: itemName,
            description: description,
            price: price,
            quantity: quantity
        });
        res.status(201).json(item);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Unable to add item"
        });
    }
};

// Get all items
const getItems = async (req, res) => {
    try {
        const items = await Item.findAll();
        res.status(200).json(items);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Unable to get items"
        });
    }
};

// Update quantity
const updateQuantity = async (req, res) => {
    try {
        const {id} = req.params;
        const {quantity} = req.body;

        const item = await Item.findByPk(id);
        if (!item) {
            res.status(404).json({
                message: "Item not found"
            });
            return;
        }
        if (quantity < 0) {
            res.status(400).json({
                message: "Quantity cannot be negative"
            });
            return;
        }
        await item.update({
            quantity: quantity
        });
        res.status(200).json(item);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Unable to update quantity"
        });
    }
};


module.exports = {
    addItem,
    getItems,
    updateQuantity
};