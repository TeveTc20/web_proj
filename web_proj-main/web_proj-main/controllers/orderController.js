// controllers/orderController.js

const orderService = require('../services/orderService');

const createOrder = async (req, res) => {
    try {
        const { username, carts, totalQuantity, totalPrice } = req.body;
        const order = await orderService.createOrder(username, carts, totalQuantity, totalPrice);
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create order', error });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await orderService.getOrders(req.session.username);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get orders', error });
    }
};


const getAllOrders = async (req, res) => {
    try {
        const allOrders = await orderService.getAllOrders();
        res.json(allOrders);
    } catch (error) {
        res.json({ message: 'Failed to get all orders', error });
    }
};

module.exports = {
    createOrder,
    getOrders,
    getAllOrders
};