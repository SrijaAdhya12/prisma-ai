import { Router } from 'express'
import { saveMood, getMoodData } from '../controllers/index.js'

const router = Router()

router
    .post('/', saveMood)
    .get('/', getMoodData)
    
export default router
