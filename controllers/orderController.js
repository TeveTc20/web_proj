const orderService = require('../services/orderService');
const userService=require('../services/userService')

const createOrder = async (req,res) => {
    const newOrder = await orderService.createOrder(req.body.id,req.body.user,req.body.products,req.body.quantity,req.body.totalPrice);
    res.json(newOrder);
}

const getOrders = async (req,res) => {
    const user=await userService.getUserByUserName(req.session.username)
    const orders = await orderService.getOrders(user._id);
    res.json(orders);
}
const  getAllOrders=async(req,res)=>{
const allOrders=await orderService.getAllOrders();
res.json(allOrders)
}
module.exports = {
    createOrder,
    getOrders,
    getAllOrders
}