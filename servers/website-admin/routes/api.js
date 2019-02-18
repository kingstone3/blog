import express from 'express';
import api from '<admin>/api';


const router = express.Router();

// Home Page
// post/get/all 要注意使用正确的请求方法
router.post('/', api.index);

export default router;
