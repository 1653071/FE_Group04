var express = require("express");
var router = express.Router();
const axios = require("axios").default;
/* GET users listing. */
router.get("/register", function (req, res, next) {
  res.render("OwnerRegister.handlebars");
});
router.post("/login", function (req, res, next) {
  let username1 = req.body.username;
  let password1 = req.body.password;
  let payload = { username: username1, password: password1 };
  console.log(payload);
  axios
    .post(
      "http://localhost:5001/begroup04-3faad/us-central1/app/owner/login",
      payload
    )
    .then(function (response) {
      console.log(response);
      req.session.user = response.data;
      res.redirect("/owner/hotels");
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {});
});
router.get("/login", function (req, res, next) {
  res.render("OwnerLogin.handlebars");
});
router.get("/hotels", function (req, res, next) {
  axios
    .get(
      "http://localhost:5001/begroup04-3faad/us-central1/app/hotels/owner/niPjya8JEbCJrgYXsczl"
    )
    .then(function (response) {
      let hotels = response.data;
      res.render("HotelsOwner.handlebars", { hotels: hotels });
    });
});
router.get("/hotels/add", function (req, res, next) {
  res.render("AddHotel.handlebars");
});
router.post("/hotels/add", function (req, res, next) {
  const name = req.body.name;
  const description = req.body.description;
  const phone = req.body.phone;
  const address = req.body.address;
  const type = req.body.type;

  let payload = {
    address: address,
    description: description,
    name: name,
    phone: phone,
    type: type,
    ownerID: "niPjya8JEbCJrgYXsczl",
  };
  axios
    .post(
      "http://localhost:5001/begroup04-3faad/us-central1/app/hotels/add",
      payload
    )
    .then(function (response) {
      res.redirect("/owner/hotels");
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {});
});
router.get("/hotels/detail", function (req, res, next) {
  res.render("OwnerDetailHotel.handlebars");
});

module.exports = router;
