import express from 'express';
import APIRoutes from './api';
import homeRoutes from './home';


const router = express.Router();

// API Routes
router.use('/api', APIRoutes);
// Home Routes
router.use(/.*/, homeRoutes);

export default router;
