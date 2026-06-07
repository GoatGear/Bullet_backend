import { Router } from 'express'
import statsController from '../../controllers/v1/stats.controller.js'
import { checkJwtMiddleware as auth } from '../../middlewares/checkJwt.js'

const router = Router()

router.get('/', auth, statsController.getStats)

export default router
