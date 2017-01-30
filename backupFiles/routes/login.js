var express 	= require('express');
var graph 		= require('fbgraph');
var router 		= express.Router();

var conf = {
	client_id: '1233069123443297'
	, client_secret: 'bc26345238acf7303ae7a2b575a3e87f'
	, scope: 'email, user_about_me, user_birthday, user_location, publish_actions'
	, redirect_uri: 'http://localhost:3000/login/auth'
};




router.get('/', function(req, res, next) {
	console.log('going into login get');
	res.render('login', { welcome : 'Click link to connect' });
});

router.get('/auth', function(req, res) {

	console.log('going into auth');

	//req.query.code = 'xuxa';
  // we don't have a code yet
  // so we'll redirect to the oauth dialog
  if (!req.query.code) {
    console.log("Performing oauth for some user right now.");

    var authUrl = graph.getOauthUrl({
        "client_id":     conf.client_id
      , "redirect_uri":  conf.redirect_uri
      , "scope":         conf.scope
    });

    if (!req.query.error) { //checks whether a user denied the app facebook login/permissions
      res.redirect(authUrl);
    } else {  //req.query.error == 'access_denied'
      res.send('access denied');
    }
  }
  // If this branch executes user is already being redirected back with 
  // code (whatever that is)
  else {
    console.log("Oauth successful, the code (whatever it is) is: ", req.query.code);
    // code is set
    // we'll send that and get the access token
    graph.authorize({
        "client_id":      conf.client_id
      , "redirect_uri":   conf.redirect_uri
      , "client_secret":  conf.client_secret
      , "code":           req.query.code
    }, function (err, facebookRes) {
    	console.log('after authorizing ');
    	console.log(facebookRes.access_token);
      res.redirect('/userLoggedIn');
    });
  }
});


module.exports = router;