var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pimp Me UP - Facebook App' });
});

router.post('/', function(req, res, next) {
  res.render('index', { title: 'Pimp Me UP - Facebook App' });
});


module.exports = router;
