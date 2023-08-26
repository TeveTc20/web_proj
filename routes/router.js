const express = require('express');
const router = express.Router();
const path = require('path');
const kitController = require('../controllers/kitController');
const cartController=require('../controllers/cartController')
const userController=require('../controllers/userController')
const logInController=require('../controllers/logInController')
const orderController=require('../controllers/orderController')
const branchController=require('../controllers/branchController')



// home-------------------------------------------------------

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "../views/home/home.html"));
});
router.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname, "../views/home/home.html"));
});
router.get('/about', function(req, res) {
    res.sendFile(path.join(__dirname, "../views/home/about.html"));
});
router.get('/contact', function(req, res) {
    res.sendFile(path.join(__dirname, "../views/home/contact.html"));
});
router.route('/branches').get( function(req,res)  {
    res.sendFile(path.join(__dirname,"../views/home/branches.html"))
}).put(branchController.getBranches)

router.get('/nav.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../scripts/nav.js'));
});
router.get('/footer.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../scripts/footer.js'));
});
router.get('/search.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../scripts/search.js'));
});
router.get('/add.js', function(req, res) {
    res.sendFile(path.join(__dirname, "../scripts/add.js"));
});
router.get('/facebook', function(req, res) {
    res.sendFile(path.join(__dirname, "../scripts/facebook.js"));
});
router.get('/matches', function(req, res) {
    res.sendFile(path.join(__dirname, "../views/home/matches.html"));
});
router.get('/nav.html', function(req, res) {
    res.sendFile(path.join(__dirname, "../views/home/nav.html"));
});
router.get('/footer.html', function(req, res) {
    res.sendFile(path.join(__dirname, "../views/home/footer.html"));
});
router.get('/home.css', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/home/home.css'));
});

//kit------------------------------------------------------------
router.post('/getKits', kitController.getKitsSearch);
router.get('/allKits', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/kit/allKits.html'));
});
router.get('/sKit', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/kit/sKit.html'));
});
router.get('/leagueKits', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/kit/leagueKits.html'));
});
router.get('/kits', kitController.getKits);
router.get('/kits/id/:id', kitController.getKitById);
router.get('/kits/league/:league', kitController.getKitsByLeague);
router.get('/kits/team_name/:team_name', kitController.getKitsByTeam);
router.post('/kits/filter',kitController.filter)

//user------------------------------------------------------------
router.get('/users',userController.getUsers)

router.route('/login').get(async(req, res) => {
    res.sendFile(path.join(__dirname, '../views/user/login.html'));
}).post(logInController.loginUser)
router.get('/login.css', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/user/login.css'));
});
router.route('/register').get(async(req, res) => {
    res.sendFile(path.join(__dirname, '../views/user/register.html'));
}).post(logInController.registerUser);
router.get('/register.css', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/user/register.css'));
});
router.get('/user.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../scripts/user.js'));
});
router.get('/check-login' , logInController.isloggedin)

router.get('/myAccount', function(req, res) {
    res.sendFile(path.join(__dirname, "../views/user/myAccount.html"));
});
router.get('/user/username',userController.getUserByUserName)
router.get('/orders/username', orderController.getOrders)

router.get('/logout', logInController.logout)



//admin--------------------------------------------------------------------

router.get('/admin', function(req, res) {
    res.sendFile(path.join(__dirname, "../views/admin/admin.html"));
});
router.get('/admin.js', function(req, res) {
    res.sendFile(path.join(__dirname, "../scripts/admin.js"));
});
router.route('/deleteUser').get(function(req,res) {res.sendFile(path.join(__dirname,"../Views/admin/deleteUser.html"))})
.post(userController.deleteUserByUserName)
router.route('/updateUser').get(function(req,res) {res.sendFile(path.join(__dirname,"../Views/admin/updateUser.html"))})
.post(userController.updateUser)
router.route('/createUser').get(function(req,res) {res.sendFile(path.join(__dirname,"../Views/admin/createUser.html"))})
.post(userController.createUser)

router.route('/createBranch').get(function(req,res) {
    res.sendFile(path.join(__dirname,"../views/admin/createBranch.html"))})
.post(branchController.createBranch)

router.route('/deleteBranch').get(function(req,res) {
    res.sendFile(path.join(__dirname,"../views/admin/deleteBranch.html"))})
.post(branchController.deleteBranch)

router.route('/updateBranch').get(function(req,res) {
    res.sendFile(path.join(__dirname,"../views/admin/updateBranch.html"))})
.post(branchController.updateBranch)

router.route('/createKit').get(function(req,res) {
    res.sendFile(path.join(__dirname,"../views/admin/createKit.html"))})
.post(kitController.createKit)

router.route('/deleteKit').get(function(req,res) {
    res.sendFile(path.join(__dirname,"../views/admin/deleteKit.html"))})
.post(kitController.deleteKit)

router.route('/updateKit').get(function(req,res) {
    res.sendFile(path.join(__dirname,"../views/admin/updateKit.html"))})
.post(kitController.updateKit)
router.get('/kits/topselling',kitController.getTopSellingKits)
router.get('/sales-by-league',kitController.getSalesCountByLeague)

router.get('/adminOnly.js', function(req, res) {
    res.sendFile(path.join(__dirname, "../scripts/adminOnly.js"));
});


//cart/orders-----------------------------------------------------------------

router.get('/cart', function(req, res) {
    res.sendFile(path.join(__dirname, "../views/cart/cart.html"));
});
router.get('/cart.js', function(req, res) {
    res.sendFile(path.join(__dirname, "../views/cart/cart.js"));
});
router.route('/carts/items/:id').post(cartController.isloggedin,cartController.createCartController).put(cartController.updateCartController).delete(cartController.deleteCartController)
router.get('/carts/items',cartController.getCartsController)
router.post('/cart/checkout',cartController.isloggedin,cartController.checkOut)
router.get('/finalOrder.html', function(req, res) {
    res.sendFile(path.join(__dirname, "../views/cart/finalOrder.html"));   
});
router.get('/orders', orderController.getAllOrders);


//images------------------------------------------------------------

router.get('/premier-league', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/home/images/leagues/premier-league.png'));
});
router.get('/la-liga', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/home/images/leagues/la-liga.png'));
});
router.get('/seriaa', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/home/images/leagues/seriaa.png'));
});
router.get('/ligue1', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/home/images/leagues/ligue1.png'));
});
router.get('/bundesliga', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/home/images/leagues/bundesliga.png'));
});
router.get('/international', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/home/images/leagues/international.png'));
});
router.get('/barcelona', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/home/images/cards/barcelona.png'));
});
router.get('/PSG', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/home/images/cards/PSG.png'));
});
router.get('/mancity', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/home/images/cards/mancity.png'));
});
router.get('/messi', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/home/images/home/messi.png'));
});

module.exports = router;