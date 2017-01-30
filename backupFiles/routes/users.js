/*var express = require('express');
var router = express.Router();*/

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
*/ 
console.log('starting users.js');
var Facebook = require('facebook-node-sdk');
var facebook = new Facebook({ appId: '1233069123443297', secret : 'bc26345238acf7303ae7a2b575a3e87f' });
     
var FB = require('fb');
//console.log('FB:' + JSON.stringify(FB));
 

var express = require('express');
//console.log('express:' + express);
var router = express.Router();

/*var Facebook = require('facebook-node-sdk');
var facebook = new Facebook({ appID: '1233069123443297', secret : 'bc26345238acf7303ae7a2b575a3e87f' });
*/
//console.log('printing facebook:' + JSON.stringify(facebook));
//console.log('printing Facebook:' + JSON.stringify( Facebook ));



router.get('/', function(req, res, next) {
	
  res.send('respond with a resource xuxa a');
});



router.get('/login', Facebook.loginRequired(), function (req, res, next) {
  	console.log('login in');
  	//req.facebook.api('/me', function(err, user) {
    //res.writeHead(200, {'Content-Type': 'text/plain'});
    //res.end('Hello, ' + user.name + '!');
    res.render('index', { title: 'Pimp Me UP - Facebook App 7' });
    //res.send('respond with a resource xuxa b');
  
});

module.exports = router;