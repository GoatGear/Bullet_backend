import { asyncMiddleware } from '../../middlewares/async.middleware.js'
import authModel from '../../models/v1/auth.model.js'
import { jwtUtils } from '../../utils/jwt.js'

const register = asyncMiddleware(async (req, res) => {
    const metadata = {
        ip:        req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        userAgent: req.headers['user-agent'],
    }
    res.status(201).json(await authModel.createUser(req.body, metadata))
})

const login = asyncMiddleware(async (req, res) => {
    res.json(await authModel.login(req.body))
})

const getMe = asyncMiddleware(async (req, res) => {
    res.json(await authModel.getMe(req.user.id))
})

const updateMe = asyncMiddleware(async (req, res) => {
    res.json(await authModel.updateMe(req.user.id, req.body))
})

// ── Admin ────────────────────────────────────────────────────

const getAllUsers = asyncMiddleware(async (_req, res) => {
    res.json(await authModel.getAllUsers())
})

const updateUser = asyncMiddleware(async (req, res) => {
    res.json(await authModel.updateUser(req.params.id, req.body))
})

const toggleSuspend = asyncMiddleware(async (req, res) => {
    res.json(await authModel.toggleSuspend(req.params.id, req.body.suspended))
})

const deleteUser = asyncMiddleware(async (req, res) => {
    res.json(await authModel.deleteUser(req.params.id))
})

const toggleNotifications = asyncMiddleware(async (req, res) => {
    res.json(await authModel.toggleNotifications(req.params.id, req.body.enabled))
})

const refresh = asyncMiddleware(async (req, res) => {
  const user = await authModel.getMe(req.user.id)
  const access_token = jwtUtils.generateToken({ id: user.id, email: user.email, role: user.role })
  res.json({ access_token })
})

const forgotPassword = asyncMiddleware(async (req, res) => {
    await authModel.forgotPassword(req.body.email)
    // Always 200 — don't reveal if the email exists
    res.json({ message: 'Si el correo está registrado recibirás un enlace en breve.' })
})

const resetPassword = asyncMiddleware(async (req, res) => {
    await authModel.resetPassword(req.body.token, req.body.password)
    res.json({ message: 'Contraseña actualizada correctamente.' })
})

const authController = { register, login, getMe, updateMe, refresh, forgotPassword, resetPassword, getAllUsers, updateUser, toggleSuspend, toggleNotifications, deleteUser }

export default authController
