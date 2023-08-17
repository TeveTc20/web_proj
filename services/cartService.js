const Cart = require("../models/cartModel");

const createCart = async (username, kit, size, quantity, totalPrice) => {
    console.log("creating cart")
    console.log(totalPrice);
    const newCart = new Cart({
        username,
        kit,
        size,
        quantity,
        totalPrice
    });
    // console.log("creating cart and saving")
    // return await newCart.save();
    try {
        const savedCart = await newCart.save();
        console.log("Cart saved:", savedCart);
        return savedCart;
    } catch (error) {
        console.error("Error saving cart:", error);
        throw error; // Rethrow the error to be handled at a higher level
    }
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
