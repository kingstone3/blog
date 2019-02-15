import cache from '<common>/cache';
import { adminLogger } from '<common>/logger';
import { tokenRequired } from '<common>/decorator';


class Home {
  @tokenRequired
  index(req, res, next) {
    const { uid } = req.cookies;

    res.render('index', { title: 'Website Admin' });
  }
}

const home = new Home;

export default home;
