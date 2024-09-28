import { Router } from 'express'
import { getStreamToken } from '../controllers/index.js'

const router = Router()

router.post('/token', getStreamToken)

export default router
