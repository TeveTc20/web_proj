// services/orderService.js

const Order = require('../models/orderModel');

const orderService = {

    async createOrder(username, carts, totalQuantity, totalPrice) {
        const order = new Order({
            username,
            carts,
            totalQuantity,
           totalPrice,
        });
        await order.save();
        return order;
    },

    async getOrders(username) {
        return await Order.find({ username }).populate('carts');
    },
    
    async getAllOrders() {
        return await Order.find().populate('carts');
    }

};

module.exports = orderService;