const express = require('express');
const router = express.Router();
const path = require('path');
const kitController = require('../controllers/kitController');
const userController = require('../controllers/userController');



// htmls-------------------------------------------------------
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
router.get('/allKits.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/kit/allKits.html'));
});
router.get('/sKit.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/kit/sKit.html'));
});
router.get('/test.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/kit/test.html'));
});
router.get('/home.css', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/home/home.css'));
});


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


//Search----------------------------------------------------------
router.post('/getKits', kitController.getKitsSearch);

//Auth------------------------------------------------------------

router.route('/login.html').get(async(req, res) => {
    res.sendFile(path.join(__dirname, '../views/home/login.html'));
}).post(userController.login)

router.get('/login.css', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/home/login.css'));
});

router.route('/register.html').get(async(req, res) => {
    res.sendFile(path.join(__dirname, '../views/home/register.html'));
}).post(userController.register);

router.get('/register.css', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/home/register.css'));
});




//jsons-----------------------------------------------------------
router.get('/kits', kitController.getKits);
router.get('/kits/all', kitController.getKits);
router.get('/kits/:league', kitController.getKitsByLeague);
router.get('/kits/:id', kitController.getKitById);





module.exports = router;