var express = require('express');
var router = express.Router();
   
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('going in index GET ' + req.query.code);
  res.render('index');
});

router.post('/', function(req, res, next) {
  console.log('going in index POST');
  res.render('index', { title: 'Pimp Me UP - Facebook App POST' });
});

module.exports = router;
