import { Router } from 'express'
import { getResponse, getExercisesByMood } from '../controllers/index.js'

const router = Router()

router.post('/response', getResponse).post('/exercises', getExercisesByMood)

export default router
