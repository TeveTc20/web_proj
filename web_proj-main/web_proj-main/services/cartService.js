const Cart = require("../models/cartModel");

const createCart = async (username, kit,kitDescription, size, quantity, totalPrice) => {

    const newCart = new Cart({
        username,
        kit,
        kitDescription,
        size,
        quantity,
        totalPrice
    });
    return await newCart.save(); 
};

const getCartsByUsername = async (username) => {
    return await Cart.find({ username });
};

const findCartByKitAndUsername = async (kit, username,size) => {
    
    return await Cart.findOne({ kit, username,size });
};

const updateCart = async (kit, size,newsize, quantity, totalPrice, username) => {
    const updateCart = await Cart.findOne({ kit, username,size});
    updateCart.size = newsize;
    updateCart.quantity = quantity;
    updateCart.totalPrice = totalPrice;
    return await updateCart.save();
    
};

const deleteCart = async (kit, username) => {
    const deleteCart = await Cart.findOne({ kit, username });
    await deleteCart.deleteOne();
    return deleteCart;
};

const deleteAllUserCarts = async (username) => {
    await Cart.deleteMany({ username });
};
const getCartById = async (cart_id) => {
    return await Cart.findById(cart_id);
};

module.exports = {
    createCart,
    getCartsByUsername,
    findCartByKitAndUsername,
    updateCart,
    deleteCart,
    deleteAllUserCarts,
    getCartById
};