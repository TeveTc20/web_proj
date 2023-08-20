const cartService = require("../services/cartService"); // Import the service
const kitService= require("../services/kitService");
const userService=require("../services/userService")
const orderService=require("../services/orderService")
// Create Cart
const createCartController = async (req, res) => {

    try {
       
        const { kitId,size,quantity } = req.body;
        const userName=req.session.username
        const kit=await kitService.getKitById(kitId)
        const description = kit.description
        let price = parseFloat(kit.price.slice(0, -1));
        price=price*quantity
        const cartItem=await cartService.findCartByKitAndUsername(kitId,userName,size)
        if(cartItem){
        let totalquantity=Number(quantity)+cartItem.quantity
        price=price*totalquantity
        const updateCartItem=await cartService.updateCart(kitId,size,size,totalquantity,price,userName)
    }
    else{
        const cart = await cartService.createCart(userName, kitId,description, size, quantity, price);      
    }
    res.redirect('/allKits.html')
    } catch (error) {
        res.status(500).json({ errors: ['Failed to create cart'] });
    }

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
        const { kitId,size,newsize,quantity} = req.body;
        const { username } = req.session;
        console.log(size)
        const kit=await kitService.getKitById(kitId)
        let price = parseFloat(kit.price.slice(0, -1));
        let totalPrice=price*quantity
        const updateCartItem=await cartService.updateCart(kitId,size,newsize,quantity,totalPrice,username)
        res.json({ message: 'Cart updated successfully' });
    } catch (error) {
        res.status(500).json({ errors: ['Failed to update cart'] });
    }
};

// Delete Cart
const deleteCartController = async (req, res) => {
    try {      
        const kitId  = req.body.kitId
        const{username}=req.session
        await cartService.deleteCart(kitId, username);
        res.json({ message: 'Cart deleted successfully' });
    } catch (error) {
        res.status(500).json({ errors: ['Failed to delete cart'] });
    }
};

// Delete All User Carts
const deleteAllUserCartsController = async (req, res) => {
    try {
        const { username } = req.session
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
  const getCartById = async (req, res) => {
    const { id } = req.params;
    const cart = await cartService.getKitById(id)
    if (!cart) {
      return res.status(404).json({ errors: ['kit was not found'] });
    }
    res.json(cart);
  };
  const checkOut= async (req,res) =>{
    //make an order and append it to the user's oredr history...
    const user= await userService.getUserByUserName(req.session.username)
    const cart=await cartService.getCartsByUsername(req.session.username)
    console.log(cart.length)
    if (cart.length===0) {
        console.log("went in")
        return res.status(400).json({ error: 'NoItemsInCart' }); // Redirecting to the products page with an error message
    }
    var array=[]
    var totalPrice=0
    var totalQuantity=0
    for (const cartItem of cart) {
        array.push(cartItem._id);
        totalPrice += cartItem.totalPrice
        totalQuantity += cartItem.quantity;
    }
        const newOrder=await orderService.createOrder(user,array,totalQuantity,totalPrice)
        await cartService.deleteAllUserCarts(user)
        res.redirect('/finalOrder.html')
    }

module.exports = {
    createCartController,
    getCartsController,
    findCartByKitAndUsernameController,
    updateCartController,
    deleteCartController,
    deleteAllUserCartsController,
    isloggedin,
    getCartById,
    checkOut
};
