import express from 'express';
import home from '<admin>/home';


const router = express.Router();

// Home Page
router.get('/', home.index);

export default router;
