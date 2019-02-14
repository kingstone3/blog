const express = require('express');
const router = express.Router();


// Components page
router.get('/', (req, res, next) => {
  res.render('components', { title: '_Internal Components' });
});

module.exports = router;
