var express = require('express');
var router = express.Router();

var homeRoutes = require('./home');


// Home Routes
router.get(/.?\//, homeRoutes);

module.exports = router;
