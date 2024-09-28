import { Router } from 'express'
import { generateResponse } from '../controllers/index.js'

const router = Router()

router.post('/response', generateResponse)

export default router
