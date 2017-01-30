var express = require('express');
var router = express.Router();

var Facebook = require('facebook-node-sdk');
var facebook = new Facebook({ appId: '1233069123443297', secret : 'bc26345238acf7303ae7a2b575a3e87f' });
     
  
   
/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('going in index GET ' + req.query.code);
  res.render('index', { title: 'Pimp Me UP - Facebook App GET' });
});

router.post('/', function(req, res, next) {
  console.log('going in index POST');
  res.render('index', { title: 'Pimp Me UP - Facebook App POST' });
});

router.get('/auth/facebook', function(req, res, next) {
  console.log('Testing auth/facebook');
  res.render('index', { title : 'Testing auth/facebook' });
  
});


module.exports = router;
