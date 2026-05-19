import { Router } from 'express'
import dayTaskController from '../../controllers/v1/dayTask.controller.js'
import { checkJwtMiddleware as auth } from '../../middlewares/checkJwt.js'

const router = Router()

router.use(auth)

router.get('/',                dayTaskController.getAll)
router.post('/',               dayTaskController.create)
router.put('/reorder',         dayTaskController.reorder)
router.patch('/:id/toggle',    dayTaskController.toggle)
router.put('/:id',             dayTaskController.update)
router.delete('/:id',          dayTaskController.remove)

export default router
