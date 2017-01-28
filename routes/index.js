var express = require('express');
var router = express.Router();

var Facebook = require('facebook-node-sdk');
var facebook = new Facebook({ appId: '1233069123443297', secret : 'bc26345238acf7303ae7a2b575a3e87f' });
     
  
   
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pimp Me UP - Facebook App 5' });
});

router.get('/test', function(req, res, next) {
  res.render('index', { title: 'Pimp Me UP - Facebook App 5.1' });
});

router.post('/', function(req, res, next) {
  res.render('index', { title: 'Pimp Me UP - Facebook App' });
});


router.get('/login', Facebook.loginRequired(), function (req, res) {
  	req.facebook.api('/me', function(err, user) {
   /* res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello, ' + user.name + '!');*/
    res.render('index', { title: 'Pimp Me UP - Facebook App 6' });
  });
});

module.exports = router;
