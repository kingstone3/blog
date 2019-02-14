var cache = require('../../common/cache')

module.exports = {
  index(req, res, next) {
    res.render('index', { title: 'Website Admin' });
  }
}
