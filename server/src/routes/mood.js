import { Router } from 'express'
import { saveMood } from '../controllers/index.js'

const router = Router()

router.post('/', saveMood)

export default router
