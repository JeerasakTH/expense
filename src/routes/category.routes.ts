import express from 'express';
import { authenticate } from '../middleware/auth';
import { create, deleted, get, getPage } from '../controllers/category.controller';

const router = express.Router();

router.get('/', authenticate, get)
router.get('/get_page', authenticate, getPage)
router.post('/create', authenticate, create)
router.delete('/delete', authenticate, deleted)

export default router