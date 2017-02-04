var express 	= require('express');
var graph 		= require('fbgraph');
var router 		= express.Router();

var conf1 = {
	client_id: '1233069123443297'
	, client_secret: 'bc26345238acf7303ae7a2b575a3e87f'
	, scope: 'read_custom_friendlists,user_friends , email, user_about_me, user_work_history, user_birthday, user_location, publish_actions'
	/*, redirect_uri: 'http://localhost:3000/login/auth'*/
  , redirect_uri: 'http://localhost:3000/facebooklogin/auth'
  /*, redirect_uri: 'https://pimpmenow.herokuapp.com/login/auth'*/
};

/*router.get('/', function(req, res, next) {
	console.log('going into login get');
	res.render('login', { welcome : 'Click link to connect' });
});*/

router.get('/auth', function(req, res) {

    //res.send('bozolindo');

var conf = {
  client_id: '1233069123443297'
  , client_secret: 'bc26345238acf7303ae7a2b575a3e87f'
  , scope: 'read_custom_friendlists,user_friends , email, user_about_me, user_work_history, user_birthday, user_location, publish_actions'
  /*, redirect_uri: 'http://localhost:3000/login/auth'*/
  , redirect_uri: 'http://localhost:3000/mylogin/login'
  /*, redirect_uri: 'https://pimpmenow.herokuapp.com/login/auth'*/
};

  // we don't have a code yet
  // so we'll redirect to the oauth dialog
  console.log('3 login.js/auth');
 
  var isCodeAvailable = req.query.code;
  console.log("code " + isCodeAvailable); 
  if ( !isCodeAvailable ) {
    console.log("code is not available");
    //console.log("Performing oauth for some user right now.");

    var authUrl = graph.getOauthUrl({
        "client_id":     conf.client_id
      , "redirect_uri":  conf.redirect_uri
      , "scope":         conf.scope
    });

    console.log("authUrl" + authUrl);

    if (!req.query.error) { //checks whether a user denied the app facebook login/permissions
      console.log('111 RETURNING to ' + authUrl);
      //res.redirect(authUrl);
      res.status(300).send({redirect: authUrl });
    } else {  //req.query.error == 'access_denied'
    	//in case user does not log into FB
      //res.send('access denieds');
      res.render('index', { errorMsg : 'Login Failed'});
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
      //res.send('maria');
      //res.status(200).send({facebookRes: facebookRes.access_token });
      res.redirect('/main?facebookRes=' + facebookRes.access_token);
    });
  }
});


module.exports = router;