var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var commentsRouter = require('./routes/comment');
var ownerRouter = require('./routes/owner');
var app = express();
const paypal = require('paypal-rest-sdk')
//Handlebars
var expressHbs = require('express-handlebars');
var bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.set('view engine', 'handlebars');
app.engine('handlebars', expressHbs({
  layoutsDir: __dirname + '/views/layouts',
  extname: 'handlebars',
  defaultLayout: 'layout.handlebars',
  partialsDir: __dirname + '/views/partials',
  }));


//----------------------
app.set('views', path.join(__dirname, 'views'));
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AUgeAe9UQx32W62zMSF5naDuzTJj3lMBRRQ-PnH320duK_kN529977FUJzi7h5yRaJwwVaExMtqx2Koi',
  'client_secret': 'ELG4A2jmHt85ADqc87esrv9FWWofAbE6P_CSaw8LUwJBpouwbv3JhDAV5pQRRUozEvjxUwiYlSrfpL69'
});
//----------------------
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req,res,next){
  
  req.session.booking={};
  res.locals.booking = req.session.booking;
  res.locals.user=req.session.user;
  res.locals.isLoggedin=req.session.user? true:false;
  next();
});

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/comment', commentsRouter);
app.use('/owner', ownerRouter);
// catch 404 and forward to error handler


// error handler

module.exports = app;

// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;
