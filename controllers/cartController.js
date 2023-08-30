const cartService = require("../services/cartService"); 
const kitService= require("../services/kitService");
const userService=require("../services/userService")
const orderService=require("../services/orderService")

const createCartController = async (req, res) => {

    try {
       
        const { kitId,size,quantity } = req.body;
        const userName=req.session.username
        const kit=await kitService.getKitById(kitId)
        const description = kit.description
        let price = parseFloat(kit.price.slice(0, -1));
        price=price*quantity
        const cartItem=await cartService.findCartByKitAndUsername(kitId,userName,size,false)
        if(cartItem){
        let totalquantity=Number(quantity)+cartItem.quantity
        price=price*totalquantity
        const updateCartItem=await cartService.updateCart(kitId,size,size,totalquantity,price,userName)
    }
    else{
        const cart = await cartService.createCart(userName, kitId,description, size, quantity, price);      
    }
    res.redirect('/allKits')
    } catch (error) {
        res.status(500).json({ errors: ['Failed to create cart'] });
    }

}
const getCartsController = async (req, res) => {
    try {
        const { username } = req.session;
      
        const carts = await cartService.getCartsByUsername(username);
        res.json(carts);
    } catch (error) {
        res.status(500).json({ errors: ['Failed to fetch carts'] });
    }
};
const findCartByKitAndUsernameController = async (req, res) => {
    try {
        const { kitId, username } = req.body; 
        const cart = await cartService.findCartByKitAndUsername(kitId, username,size);
        if (!cart) {
            return res.status(404).json({ errors: ['Cart not found'] });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ errors: ['Failed to fetch cart'] });
    }
};
const updateCartController = async (req, res) => {
    try {
        const { kitId,size,newsize,quantity} = req.body;
        const { username } = req.session;
        const kit=await kitService.getKitById(kitId)
        let price = parseFloat(kit.price.slice(0, -1));
        let totalPrice=price*quantity
        const updateCartItem=await cartService.updateCart(kitId,size,newsize,quantity,totalPrice,username)
        res.json({ message: 'Cart updated successfully' });
    } catch (error) {
        res.status(500).json({ errors: ['Failed to update cart'] });
    }
};
const deleteCartController = async (req, res) => {
    try {      
        const kitId  = req.body.kitId
        const{username}=req.session
        await cartService.deleteCart(kitId, username,false);
        res.json({ message: 'Cart deleted successfully' });
    } catch (error) {
        res.status(500).json({ errors: ['Failed to delete cart'] });
    }
};
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
   
    const cart = await cartService.getCartById(id)
    if (!cart) {
      return res.status(404).json({ errors: ['cart was not found'] });
    }
    res.json(cart);
};
const getNonBoughtController = async (req, res) => {
    try {
        const { username } = req.session;
      
        const carts = await cartService.getNonBought(username);
        res.json(carts);
    } catch (error) {
        res.status(500).json({ errors: ['Failed to fetch carts'] });
    }
};
const checkOut= async (req,res) =>{
    
    const user= await userService.getUserByUserName(req.session.username)
    const cart=await cartService.getNonBought(req.session.username)
    
    if (cart.length===0) {
       
        return res.status(400).json({ error: 'NoItemsInCart' }); 
    }
    var array=[]
    var totalPrice=0
    var totalQuantity=0
    for (const cartItem of cart) {
        kitService.updateSalesCount(cartItem.kit,cartItem.quantity)
        array.push(cartItem._id);
        totalPrice += cartItem.totalPrice
        totalQuantity += cartItem.quantity;
    }
        const newOrder=await orderService.createOrder(user.username,array,totalQuantity,totalPrice)
        await cartService.updateBought(user.username)
        // await cartService.deleteAllUserCarts(user.username)
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
    checkOut,
    getNonBoughtController
};