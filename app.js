var express = require('express');
var graph = require('fbgraph'); 
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();

var BACKEND = 'http://localhost:3000';
//var BACKEND = 'http://pimpmenow.herokuapp.com';

// this should really be in a config file!
var conf = {
  client_id: '1233069123443297'
  , client_secret: 'bc26345238acf7303ae7a2b575a3e87f'
  , scope: 'read_custom_friendlists,user_friends , email, user_about_me, user_work_history, user_birthday, user_location, publish_actions'
  , redirect_uri: BACKEND + '/pimpme/facebookauth/'
};

//Use this to call the method below as service...
var router = express.Router();
app.use('/pimpme', router);

//Facebook auth - when user first click on authentication
router.get('/facebookauth', function(req, res, next) {

  if ( !req.query.code ) {
    console.log("Performing oauth with Facebook for some user right now");

    var authUrl = graph.getOauthUrl({
        "client_id":     conf.client_id
      , "redirect_uri":  conf.redirect_uri
      , "scope":         conf.scope
    }); 

    if ( !req.query.error ) {
      console.log('Access Granted');
      res.redirect(authUrl);
    
    } else {
      console.log('Access Denied');
      res.send('Access Denied');
    }
  }  
  else {
    console.log("Oauth successful, the code (whatever it is) is: ", req.query.code);
    // code is set, we'll send that and get the access token
    graph.authorize({
        "client_id":      conf.client_id
      , "redirect_uri":   conf.redirect_uri
      , "client_secret":  conf.client_secret
      , "code":           req.query.code
    }, function (err, facebookRes) {
      res.redirect('/main?facebookRes=' + facebookRes.access_token);
    });
  }
});  


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Setup routes
var index = require('./routes/index');
var main = require('./routes/main');

//Will get in the Welcome page and the angular ng-view
app.use('/', index);
app.use('/main', main);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
