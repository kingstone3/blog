var express = require('express');
var router = express.Router();

var home = require('../home');

// Home Page
router.get('/', home.index);

module.exports = router;
