var express = require('express');
var router = express.Router();
const axios = require("axios").default;
/* GET home page. */
router.get('/', function(req, res, next) {
    axios
    .get("http://localhost:5001/begroup04-3faad/us-central1/app/hotels")
    .then(function (response) {
      let products1 = {};
      products1.products = response.data;
     
      var page = parseInt(req.query.page) || 1;
      var perPage = 10;
      var start = (page - 1) * perPage;
      var maxPage = Math.ceil(products1.products.length / perPage);
      var minPage = 1;
      var end = page * perPage;
      res.render("Home.handlebars", {
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

router.get("/detail/:id", function (req, res, next) {
  const hotelid = req.params.id;
  axios.all(
    [
      axios.get(`http://localhost:5001/begroup04-3faad/us-central1/app/hotels/${hotelid}`), 
      axios.get(`http://localhost:5001/begroup04-3faad/us-central1/app/comment/${hotelid}`)
    ]
  ).then(axios.spread((response1, obj2) => {
    // Both requests are now complete
    let product = response1.data;
    let comments = obj2.data;
    console.log(comments);

    res.render("DetailHotel.handlebars",{
      product: product,listExists:true,
      comments:comments
      
    });
  }));
 
 
});
/* GET home page. */
router.post('/comment/:id',function(req, res, next) {
  const id = req.params.id;
 
  axios.delete("http://localhost:5001/begroup04-3faad/us-central1/app/comment/M6YG8o4Bzd9Hcz9KgUMB")
    .then(function (response) {
      
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  ;
  
  
  
});

router.get('/reviews', function(req, res, next) {
    res.render('Review.handlebars');
});
module.exports = router;