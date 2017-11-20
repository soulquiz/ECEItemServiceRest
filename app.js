var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var basicAuth = require('express-basic-auth');

// route files
var index = require('./routes/index');
var users = require('./routes/users');
var hike = require('./routes/hike');
var order = require('./routes/order');
var examine = require('./routes/examine');
var take = require('./routes/take');

// app instance
var app = express();

// basic authentication
app.use(basicAuth({
    users: { 'happyrest': '1234' },
    challenge: true,
    unauthorizedResponse: getUnauthorizedResponse
}))

function getUnauthorizedResponse(req) {
    return req.auth ?
        ('Credentials  rejected') :
        'No credentials provided'
}

// route url
app.get('/hikes', hike.index);
app.post('/add_hike', hike.add_hike);
app.get('/get_last_order', order.get_last_order);
app.get('/get_order/:order_number', order.get_order);
app.get('/get_examine_info/:order_number', examine.get_examine_info);
app.get('/get_take_info/:order_number', take.get_take_info);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
