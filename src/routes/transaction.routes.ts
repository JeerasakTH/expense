import express from 'express'
import { authenticate } from '../middleware/auth'
import { create, get, getPage } from '../controllers/transaction.controller'

const router = express.Router()

router.get('/', authenticate, get)
router.get('/get_page', authenticate, getPage)
router.post('/create', authenticate, create)

export default router