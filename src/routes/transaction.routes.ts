import express from 'express'
import { authenticate } from '../middleware/auth'
import { create, get, getPage, summary } from '../controllers/transaction.controller'

const router = express.Router()

router.get('/', authenticate, get)
router.get('/get_page', authenticate, getPage)
router.post('/create', authenticate, create)
router.post('/summary', authenticate, summary)

export default router