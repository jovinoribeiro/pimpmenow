var express = require('express');
var router = express.Router();
var graph 		= require('fbgraph');

var graph = require('fbgraph'); 
graph.setVersion("2.8"); 

var conf = {
    client_id: '1233069123443297',
    client_secret: 'bc26345238acf7303ae7a2b575a3e87f',
    redirect_uri: 'https://pimpmenow.herokuapp.com/'
};

function setupAccessToken(accessToken) {

	graph.extendAccessToken({
	    "access_token": accessToken 
	       , "client_id":      conf.client_id
	      , "client_secret":  conf.client_secret
	    }, function (err, facebookRes) {
	       console.log('result of extending access token:');
	       console.log(facebookRes);
	    }); 

	graph.setAccessToken(accessToken);
};

router.get('/', function(req, res, next) {
	console.log('inside of main ');
	console.log(req.query.facebookRes);
	setupAccessToken(req.query.facebookRes);
	res.render('main');
});

router.get('/fetchdata', function(req, res, next) {
	console.log('fetching data');
	var welcomeMsg = serviceRequest(req, res, next);
	//welcomeMsg = 'xuxa';
	//res.render('main', { welcome  : welcomeMsg });
});

function serviceRequest(req, res, next) {
    console.log('Servicing the REquest');   
var welcomeMsg = '';
    var options = {
        timeout:  3000
      , pool:     { maxSockets:  Infinity }
      , headers:  { connection:  "keep-alive" }
    };  
      
       welcomeMsg = 
       graph  
      .setOptions(options)
      .get("/me?fields=email, name, birthday, work", function(err, result) {
        console.log(result); // { id: '4', name: 'Mark Zuckerberg'... }
         /*res.send('Hello, ' + result.name + '. I will email you at ' + 
            result.email + ' ' + result.work[0].employer.name);*/

        welcomeMsg = 'Hello, ' + result.name + '. I will email you at ' + 
            result.email + ' ' 
            + result.work[0].employer.name;
        
        //return welcomeMsg;    
            //res.render('main', { welcome  : welcomeMsg });
            res.json(result);
   
      });  
      console.log(welcomeMsg.data);
      return welcomeMsg;
}
module.exports = router;