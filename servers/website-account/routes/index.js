import express from 'express';


const router = express.Router();

// Home page
router.get(/.*/, (req, res, next) => {
  res.render('index', { title: 'Website Account' });
});

export default router;
