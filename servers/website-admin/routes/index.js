import express from 'express';
import homeRoutes from './home';


const router = express.Router();

// Home Routes
router.get(/.?\//, homeRoutes);

export default router;
