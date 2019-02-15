import express from 'express';


const router = express.Router();

// Components page
router.get('/', (req, res, next) => {
  res.render('components', { title: '_Internal Components' });
});

export default router;
