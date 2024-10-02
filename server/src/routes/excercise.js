import { Router } from 'express'
import { getMoodExercises } from '../controllers/index.js'

const router = Router()

router.post('/mood-exercises', getMoodExercises)

export default router
