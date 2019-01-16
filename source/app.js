const newrelic = require('newrelic');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// K8s metadata as custom attributes
var CUSTOM_ATTRIBUTES = {
  'K8S_NODE_NAME': process.env.K8S_NODE_NAME,
  'K8S_HOST_IP': process.env.K8S_HOST_IP,
  'K8S_POD_NAME': process.env.K8S_POD_NAME,
  'K8S_POD_NAMESPACE': process.env.K8S_POD_NAMESPACE,
  'K8S_POD_IP': process.env.K8S_POD_IP,
  'K8S_POD_SERVICE_ACCOUNT': process.env.K8S_POD_SERVICE_ACCOUNT,
  'K8S_POD_TIER': process.env.K8S_POD_TIER
};
app.use(function(req, res, next) {
  newrelic.addCustomAttributes(CUSTOM_ATTRIBUTES);
  next();
});

// For Browser
app.locals.newrelic = newrelic;

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  newrelic.noticeError(err, CUSTOM_ATTRIBUTES);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
