var express = require('express');

var router = express.Router();


//Sets handlebars configurations (we will go through them later on)

router.post('/login', function (req, res) {
    //var post = req.body;
    //if (post.user === 'john' && post.password === 'johnspassword') {
      //req.session.user_id = johns_user_id_here;
      //res.redirect('/my_secret_page');
    //} else {
      //res.send('Bad user/pass');
    //}
    request.session.loggedin = true;
  });
function checkAuth(req, res, next) {
    if (!req.session.loggedin) {
      res.send('You are not authorized to view this page');
    } else {
      next();
    }
  }
module.exports = router;