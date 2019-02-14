const cache = require('<common>/cache');
const logger = require('<common>/logger').admin;
const { tokenRequired } = require('<common>/decorator');


class Home {
  @tokenRequired
  index(req, res, next) {
    const { uid } = req.cookies;

    res.render('index', { title: 'Website Admin' });
  }
}

module.exports = new Home();
