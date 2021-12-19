var express = require('express');
var router = express.Router();
const axios = require("axios").default;
/* GET users listing. */
router.get('/', function(req, res, next) {
    axios
      .get("http://localhost:5001/begroup04-3faad/us-central1/app/users")
      .then(function (response) {
        let users = {};
        users.users = response.data;
       
        var page = parseInt(req.query.page) || 1;
        var perPage = 10;
        var start = (page - 1) * perPage;
        var maxPage = Math.ceil(users.users.length / perPage);
        var minPage = 1;
        var end = page * perPage;
        res.render("Users.handlebars", {
        
          users1: users.users.slice(start, end),
          listExists: true,
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
      
  });
router.put('/banned/:id', async function(req, res, next) {
  const id = req.params.id;
   await axios
    .put(`http://localhost:5001/begroup04-3faad/us-central1/app/users/banned/${id}`)
    .then(function (response) {
       res.redirect('/')
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
    
});

module.exports = router;