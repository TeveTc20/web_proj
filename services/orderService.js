const order = require('../models/orderModel')

const createOrder = async (userId,carts,totalAmount,totalPrice,date) => {
    const newOrder = new order(
        {
            userId:userId,
            carts:carts,
            totalQuantity:totalAmount,
            totalPrice:totalPrice
        });
    if (date)
    newOrder.createdAt = date;
    
    return await newOrder.save()
}

const getOrders = async(userId) =>{
    return await order.find({userId})
}

const getAllOrders=async()=>{
    return await order.find({});
}
module.exports = {
    createOrder,
    getOrders,
    getAllOrders
}
