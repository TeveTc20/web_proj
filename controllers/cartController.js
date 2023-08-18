const cartService = require("../services/cartService"); // Import the service
const kitService= require("../services/kitService");
// Create Cart
const createCartController = async (req, res) => {

    try {
       
        const { kitId,size, quantity } = req.body;
        const userName=req.session.username
        const kit=await kitService.getKitById(kitId)
        let price = parseFloat(kit.price.slice(0, -1));
        const cartItem=await cartService.findCartByKitAndUsername(kitId,userName,size)
        if(cartItem){
        let totalquantity=Number(quantity)+cartItem.quantity
        price=price*totalquantity
        const updateCartItem=await cartService.updateCart(kitId,size,totalquantity,price,userName)
    }
    else{
        const cart = await cartService.createCart(userName, kitId, size, quantity, price);      
    }
    } catch (error) {
        res.status(500).json({ errors: ['Failed to create cart'] });
    }
    res.redirect('/allKits.html')
}


// Get Carts by Username
const getCartsController = async (req, res) => {
    try {
        const { username } = req.session;
        console.log(username) // Assuming you are passing the username as a URL parameter
        const carts = await cartService.getCartsByUsername(username);
        res.json(carts);
    } catch (error) {
        res.status(500).json({ errors: ['Failed to fetch carts'] });
    }
};

// Find Cart by Kit and Username
const findCartByKitAndUsernameController = async (req, res) => {
    try {
        const { kitId, username } = req.body; // Can be adjusted based on request structure
        const cart = await cartService.findCartByKitAndUsername(kitId, username,size);
        if (!cart) {
            return res.status(404).json({ errors: ['Cart not found'] });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ errors: ['Failed to fetch cart'] });
    }
};

// Update Cart
const updateCartController = async (req, res) => {
    try {
        const { kitId, size, quantity, totalPrice, username } = req.body;
        const updatedCart = await cartService.updateCart(kitId, size, quantity, totalPrice, username);
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ errors: ['Failed to update cart'] });
    }
};

// Delete Cart
const deleteCartController = async (req, res) => {
    try {
        const { kitId, username } = req.body; 
        await cartService.deleteCart(kit, username);
        res.json({ message: 'Cart deleted successfully' });
    } catch (error) {
        res.status(500).json({ errors: ['Failed to delete cart'] });
    }
};

// Delete All User Carts
const deleteAllUserCartsController = async (req, res) => {
    try {
        const { username } = req.params; // Assuming you are passing the username as a URL parameter
        await cartService.deleteAllUserCarts(username);
        res.json({ message: 'All carts deleted successfully for user' });
    } catch (error) {
        res.status(500).json({ errors: ['Failed to delete carts'] });
    }
};
const isloggedin=async(req,res,next)=>{
    if(req.session.username){
        console.log("user is logged in");
      return next()
    }

    else 
      res.json({isloggedin:false})
  }
module.exports = {
    createCartController,
    getCartsController,
    findCartByKitAndUsernameController,
    updateCartController,
    deleteCartController,
    deleteAllUserCartsController,
    isloggedin
};
