var express = require("express");
var router = express.Router();
var dbproducts = require("../migration/product.json");
const axios = require("axios").default;
//Sets handlebars configurations (we will go through them later on)

router.get("/", function (req, res, next) {
  res.render("Home.handlebars");
});
router.get("/home", function (req, res, next) {
  res.render("Home.handlebars");
});
router.get("/hotel", function (req, res, next) {
  const products = {};

  axios
    .get("http://localhost:5001/begroup04-3faad/us-central1/app/hotels")
    .then(function (response) {
      let products1 = {};
      products1.products = response.data;
      console.log(products1);
      var page = parseInt(req.query.page) || 1;
      var perPage = 10;
      var start = (page - 1) * perPage;
      var maxPage = Math.ceil(dbproducts.products.length / perPage);
      var minPage = 1;
      var end = page * perPage;
      res.render("Hotel.handlebars", {
        title: "Quang",
        products: products1.products.slice(start, end),
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
router.get("/hotel/:id", function (req, res, next) {
  const hotelid = req.params.id;
  axios
  .get(`http://localhost:5001/begroup04-3faad/us-central1/app/hotels/${hotelid}`)
  .then(function (response) {
    let product = response.data;
    console.log(product);

    res.render("DetailHotel.handlebars", {
      product: product
      
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
router.get("/hotel/booking", function (req, res, next) {
  res.render("Booking.handlebars");
});
router.get("/hotel/payment", function (req, res, next) {
  res.render("Payment.handlebars");
});
router.get("/blog", function (req, res, next) {
  res.render("Blog.handlebars");
});
router.get("/blogdetail", function (req, res, next) {
  res.render("DetailBlog.handlebars");
});
router.get("/invidual", function (req, res, next) {
  res.render("Invidual.handlebars");
});
module.exports = router;
