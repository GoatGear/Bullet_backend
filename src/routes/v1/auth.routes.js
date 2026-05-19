import { Router } from 'express'
import authController from '../../controllers/v1/auth.controller.js'
import { checkJwtMiddleware as auth } from '../../middlewares/checkJwt.js'
import { checkRole } from '../../middlewares/checkRole.js'

const router = Router()

router.post('/register', authController.register)
router.post('/login',    authController.login)
router.get('/me',        auth, authController.getMe)
router.put('/me',        auth, authController.updateMe)

// ── Admin ─────────────────────────────────────────────────────
router.get('/users',               auth, checkRole('admin'), authController.getAllUsers)
router.put('/users/:id',           auth, checkRole('admin'), authController.updateUser)
router.patch('/users/:id/suspend',       auth, checkRole('admin'), authController.toggleSuspend)
router.patch('/users/:id/notifications', auth, checkRole('admin'), authController.toggleNotifications)
router.delete('/users/:id',              auth, checkRole('admin'), authController.deleteUser)

export default router
