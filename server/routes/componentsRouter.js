var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('components', { title: 'Internal Components' });
});

module.exports = router;
