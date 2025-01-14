import express from 'express'
import authRoutes from './auth.routes'
import accountRoutes from './account.routes'
import categoryRoutes from './category.routes'
import transactionRoutes from './transaction.routes'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/account', accountRoutes)
router.use('/category', categoryRoutes)
router.use('/transaction', transactionRoutes)

export default router