var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('Home.handlebars');
});
router.get('/users', function(req, res, next) {
    res.render('Users.handlebars');
});
router.get('/reviews', function(req, res, next) {
    res.render('Review.handlebars');
});
module.exports = router;