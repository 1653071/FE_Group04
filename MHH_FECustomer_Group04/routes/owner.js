var express = require('express');
var router = express.Router();
const axios = require("axios").default;
/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render('OwnerRegister.handlebars')
});
router.get('/login', function(req, res, next) {
    res.render('OwnerLogin.handlebars')
  });
  
module.exports = router;