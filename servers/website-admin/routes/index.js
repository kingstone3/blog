const express = require('express');
const router = express.Router();

const homeRoutes = require('./home');


// Home Routes
router.get(/.?\//, homeRoutes);

module.exports = router;
