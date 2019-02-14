const cache = require('../../common/cache');
const logger = require('../../common/logger').admin;

module.exports = {
  index(req, res, next) {
    const { uid } = req.cookies;

    res.render('index', { title: 'Website Admin' });
  }
}
