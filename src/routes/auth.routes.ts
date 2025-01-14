import express from 'express';
import { create, get, login } from '../controllers/user.controller'
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticate, get)
router.post('/login', login)
router.post('/create', create)

export default router