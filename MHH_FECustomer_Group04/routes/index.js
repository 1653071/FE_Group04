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
router.get('/hotel/booking', function(req, res, next) {
    res.render('Booking.handlebars');
});
router.get('/hotel/payment', function(req, res, next) {
    res.render('Payment.handlebars');
});
router.get('/blog', function(req, res, next) {
    res.render('Blog.handlebars')
})
router.get('/blogdetail', function(req, res, next) {
    res.render('DetailBlog.handlebars')
})
router.get('/invidual', function(req, res, next) {
    res.render('Invidual.handlebars')
})
module.exports = router;