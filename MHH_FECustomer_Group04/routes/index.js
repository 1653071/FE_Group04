var express = require('express');
var router = express.Router();


//Sets handlebars configurations (we will go through them later on)

router.get('/', function(req, res, next) {
  res.render('Home.handlebars');
});
router.get('/home', function(req, res, next) {
  res.render('Home.handlebars');
});
router.get('/hotel', function(req, res, next) {
  res.render('Hotel.handlebars');
});
router.get('/hotel/detail', function(req, res, next) {
  res.render('DetailHotel.handlebars');
});
module.exports = router;
