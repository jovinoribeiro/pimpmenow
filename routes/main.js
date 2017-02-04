var express = require('express');
var router = express.Router();
var graph 		= require('fbgraph');

var graph = require('fbgraph'); 
graph.setVersion("2.8"); 

//CONFIGURATION
var conf = {
    client_id: '1233069123443297',
    client_secret: 'bc26345238acf7303ae7a2b575a3e87f'
};

//ENTRY POINT - after used pressed "login in previous page"
router.get('/', function(req, res, next) {
  console.log('inside of main ');
  console.log(req.query.facebookRes);
  setupAccessToken(req.query.facebookRes);
  
  res.render('main');
});

//SETUP THE ACCESS TOKEN
function setupAccessToken(accessToken) {

	graph.extendAccessToken({ 
	    "access_token": accessToken 
	       , "client_id":      conf.client_id
	      , "client_secret":  conf.client_secret
	    }, function (err, facebookRes) {
	       console.log('result of extending access token:');
	    }); 
  
	graph.setAccessToken(accessToken);
};

//When fetch the ata
router.get('/fetchdata', function(req, res, next) {
	var fields = req.query.query;
	var welcomeMsg = fetchData(fields, req, res, next);
});

function fetchData(query, req, res, next) {
  var options = {
    timeout:  3000
    , pool:     { maxSockets:  Infinity }
    , headers:  { connection:  "keep-alive" }
  };  
       
  graph  
  .setOptions(options)
  .get("/" + query, function(err, result) {   
    console.log(result);     
    res.json(result);
  });
}

module.exports = router;