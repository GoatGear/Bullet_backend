import { asyncMiddleware } from '../../middlewares/async.middleware.js'
import authModel from '../../models/v1/auth.model.js'

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

const authController = { register, login, getMe, updateMe, getAllUsers, updateUser, toggleSuspend, toggleNotifications, deleteUser }

export default authController
