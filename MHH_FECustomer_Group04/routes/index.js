var express = require("express");
var router = express.Router();
var dbproducts = require("../migration/product.json");
const axios = require("axios");
const paypal = require("paypal-rest-sdk");
const { json } = require("express");
paypal.configure({
  'mode': "sandbox", //sandbox or live
  'client_id':
    "AUgeAe9UQx32W62zMSF5naDuzTJj3lMBRRQ-PnH320duK_kN529977FUJzi7h5yRaJwwVaExMtqx2Koi",
  'client_secret':
    "EBE3x3UEBHHJetwjS5xmU4kPN_agi9KvJiAyvg1WP4v5t3KnNrn6rV-8UzSJEGUbjh8az08rQ_qazxc7",
});
//---
//Sets handlebars configurations (we will go through them later on)
router.post("/user/login", function (req, res, next) {
  let username1 = req.body.username;
  let password1 = req.body.password;
  let payload = { username: username1, password: password1 };
  console.log(payload);
  axios
    .post(
      "http://localhost:5001/begroup04-3faad/us-central1/app/user/login",
      payload
    )
    .then(function (response) {
      console.log(response);
      req.session.user = response.data;
      res.redirect("/");
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {});
});
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
router.get("/hotel/search", function (req, res, next) {
  const products1 = {};
  const search = req.query.search;
  console.log(search);
  axios
    .get(
      `http://localhost:5001/begroup04-3faad/us-central1/app/search?name=${search}`
    )
    .then(function (response) {
      let products1 = {};
      products1.products = response.data;
      var id = req.query.id;
      var page = parseInt(req.query.page) || 1;
      var perPage = 10;
      var start = (page - 1) * perPage;

      var end = page * perPage;
      console.log(products1.products);
      res.render("Search.handlebars", {
        result: search,
        products: products1.products,
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
    .all([
      axios.get(
        `http://localhost:5001/begroup04-3faad/us-central1/app/hotels/${hotelid}`
      ),
      axios.get(
        `http://localhost:5001/begroup04-3faad/us-central1/app/comment/${hotelid}`
      ),
    ])
    .then(
      axios.spread((response, response1) => {
        let product = response.data;
        let comment = response1.data;

        res.render("DetailHotel.handlebars", {
          product: product,
          comment: comment,
        });
      })
    )
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
});
router.get("/booking/:id", function (req, res, next) {
  req.session.booking.name = req.query.productname;
  req.session.booking.datestart = req.query.datestart;
  req.session.booking.dateend = req.query.dateend;
  req.session.booking.id = req.query.id;
  
  console.log(res.locals.booking.name);
  res.render("Booking.handlebars");
});
router.get("/payment", function (req, res, next) {
  
  res.render("Payment.handlebars");
});
router.post("/payment", function (req, res, next) {
  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:3000/success",
        "cancel_url": "http://localhost:3000/cancle"
    },
    "transactions": [{
        "item_list": {
            "items" :  [{
              "name": "Red Sox Hat",
              "sku": "001",
              "price": "1.00",
              "currency": "USD",
              "quantity": 1,
              "datestart": res.locals.booking.datestart
             
          }]
        },
        "amount": {
            "currency": "USD",
            "total": "1.00"
        },
        "description": "Hat for the best team ever"
    }]
};
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      console.log(error);
      res.send("cancle");
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
});
router.get("/cancle", function (req, res) {
  res.render("cancle.handlebars");
});
router.get("/success", (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  const name = res.locals.booking.name;
 

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
        "amount": {
          "currency": "USD",
            "total": "1.00"
        }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
       res.render('cancle.handlebars');
    } else {
        res.render('success.handlebars');
        
        
        let payload = {
        "firstname":  name,
        "lastname": "asd",
        "paymentid": "asd",
        "datestart": "12/11/2021",
        "dateend": "21/21/2021"
        };
        axios
          .post(
            "http://localhost:5001/begroup04-3faad/us-central1/app/payment/add",
            payload
          )
          .then(function (response) {
            
          })
          .catch(function (error) {
            console.log(error);
          });
          
        
    }
});
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
