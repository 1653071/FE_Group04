var express = require("express");

var router = express.Router();
const axios = require("axios");

//Sets handlebars configurations (we will go through them later on)

router.post("/create", function (req, res) {
  

  let payload = { userID:res.locals.user.id , hotelID:req.body.hotelID,name:res.locals.user.name,comment:req.body.comment };
  console.log(payload);
  axios
    .post(
      "http://localhost:5001/begroup04-3faad/us-central1/app/comment/create",
      payload
    )
    .then(function (response) {
      console.log(response);
      
      res.redirect('/');
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {});
});

module.exports = router;
