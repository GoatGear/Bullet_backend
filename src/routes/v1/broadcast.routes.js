import { Router } from 'express'
import broadcastController from '../../controllers/v1/broadcast.controller.js'
import { checkJwtMiddleware as auth } from '../../middlewares/checkJwt.js'
import { checkRole } from '../../middlewares/checkRole.js'

const router = Router()

router.use(auth)

router.get('/',             broadcastController.getAll)
router.get('/unread-count', broadcastController.getUnreadCount)
router.get('/sent',         checkRole('admin'), broadcastController.getSent)
router.post('/',            checkRole('admin'), broadcastController.create)
router.patch('/read-all',   broadcastController.markAllRead)
router.delete('/:id',       checkRole('admin'), broadcastController.deleteOne)

export default router
