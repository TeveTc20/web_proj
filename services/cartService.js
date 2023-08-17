const Cart = require("../models/cartModel");

const createCart = async (username, kit, size, quantity, totalPrice) => {
    const newCart = new Cart({
        username: username,
        kit: kit,
        size: size,
        quantity: quantity,
        totalPrice: totalPrice
    });
    return await newCart.save();
};

const getCartsByUsername = async (username) => {
    return await Cart.find({ username });
};

const findCartByKitAndUsername = async (kit, username) => {
    return await Cart.findOne({ kit, username });
};

const updateCart = async (kit, size, quantity, totalPrice, username) => {
    const updateCart = await Cart.findOne({ kit, username });
    updateCart.size = size;
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

module.exports = {
    createCart,
    getCartsByUsername,
    findCartByKitAndUsername,
    updateCart,
    deleteCart,
    deleteAllUserCarts
};
