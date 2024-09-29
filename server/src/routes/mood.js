import { Router } from 'express'
import { saveMood, getMoodByDateRange, getCurrentMood } from '../controllers/index.js'

const router = Router()

router
    .patch('/', saveMood)
    .get('/', getMoodByDateRange)
    .get('/current', getCurrentMood)

export default router
