const express = require('express');
const router = express.Router();
const path = require('path');
const kitController = require('../controllers/kitController');
const cartController=require('../controllers/cartController')
const userController=require('../controllers/userController')
const logInController=require('../controllers/logInController')

// home-------------------------------------------------------
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "../views/home/home.html"));
});
router.get('/home.html', function(req, res) {
    res.sendFile(path.join(__dirname, "../views/home/home.html"));
});
router.get('/nav.html', function(req, res) {
    res.sendFile(path.join(__dirname, "../views/home/nav.html"));
});
router.get('/footer.html', function(req, res) {
    res.sendFile(path.join(__dirname, "../views/home/footer.html"));
});
router.get('/about.html', function(req, res) {
    res.sendFile(path.join(__dirname, "../views/home/about.html"));
});
router.get('/contact.html', function(req, res) {
    res.sendFile(path.join(__dirname, "../views/home/contact.html"));
});
router.get('/branches.html', function(req, res) {
    res.sendFile(path.join(__dirname, "../views/home/branches.html"));
});
router.get('/home.css', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/home/home.css'));
});

//kits------------------------------------------------------------
router.get('/allKits.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/kit/allKits.html'));
});
router.get('/sKit.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/kit/sKit.html'));
});
router.get('/leagueKits.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/kit/leagueKits.html'));
});
router.get('/kits', kitController.getKits);
router.get('/kits/id/:id', kitController.getKitById);
router.get('/kits/league/:league', kitController.getKitsByLeague);
router.get('/kits/team_name/:team_name', kitController.getKitsByTeam);
router.post('/kits/filter',kitController.filter)

//user------------------------------------------------------------
router.route('/login.html').get(async(req, res) => {
    res.sendFile(path.join(__dirname, '../views/user/login.html'));
}).post(logInController.loginUser)

router.get('/login.css', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/user/login.css'));
});

router.route('/register.html').get(async(req, res) => {
    res.sendFile(path.join(__dirname, '../views/user/register.html'));
}).post(logInController.registerUser);

router.get('/register.css', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/user/register.css'));
});

//cart-----------------------------------------------------------------
router.get('/cart.html', function(req, res) {
    res.sendFile(path.join(__dirname, "../views/cart/cart.html"));
});

router.route('/carts/items/:id').post(cartController.isloggedin,cartController.createCartController).put(cartController.updateCartController).delete(cartController.deleteCartController)
router.get('/carts/items',cartController.getCartsController)


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