import { Router } from 'express'
import goalController from '../../controllers/v1/goal.controller.js'
import { checkJwtMiddleware as auth } from '../../middlewares/checkJwt.js'

const router = Router()

router.use(auth)

router.get('/',                          goalController.getAll)
router.post('/',                         goalController.create)
router.put('/:id',                       goalController.update)
router.delete('/:id',                    goalController.remove)
router.post('/:id/items',                goalController.addItem)
router.patch('/:id/items/:itemId/toggle', goalController.toggleItem)
router.delete('/:id/items/:itemId',      goalController.removeItem)

export default router
