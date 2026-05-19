import { Router } from 'express'
import topTaskController from '../../controllers/v1/topTask.controller.js'
import { checkJwtMiddleware as auth } from '../../middlewares/checkJwt.js'

const router = Router()

router.use(auth)

router.get('/',             topTaskController.getAll)
router.post('/',            topTaskController.create)
router.put('/reorder',      topTaskController.reorder)
router.patch('/:id/toggle', topTaskController.toggle)
router.patch('/:id/move',   topTaskController.moveTo)
router.delete('/:id',       topTaskController.remove)

export default router
