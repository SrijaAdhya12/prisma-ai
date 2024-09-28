import { Router } from 'express'
import { saveUser} from '../controllers/index.js'

const router = Router()

router.post('/', saveUser)
export default router
