import User from '../../schemas/user.schema.js'
import { ErrorInstance } from '../../config/error.config.js'
import { hashUtils } from '../../utils/hash.js'
import { jwtUtils } from '../../utils/jwt.js'
import broadcastModel from './broadcast.model.js'

function makeToken(user) {
    return jwtUtils.generateToken({ id: user._id, email: user.email, role: user.role })
}

const createUser = async (data, metadata = {}) => {
    const { name, email, password } = data

    if (!name || !email || !password) {
        throw new ErrorInstance('name, email y password son obligatorios', 400)
    }

    if (await User.findOne({ email })) {
        throw new ErrorInstance('El correo ya está en uso', 409)
    }

    const newUser = new User({
        name,
        email,
        password: await hashUtils.hash(password),
        role:     'user',
        audit: {
            registration_ip:         metadata.ip || 'desconocida',
            registration_user_agent: metadata.userAgent || 'desconocido',
        },
    })

    const saved = await newUser.save()

    // Fire-and-forget — don't block registration if it fails
    broadcastModel.createWelcome(saved._id).catch(console.error)

    return {
        id:                   saved._id,
        name:                 saved.name,
        email:                saved.email,
        role:                 saved.role,
        notificationsEnabled: saved.notificationsEnabled,
        access_token:         makeToken(saved),
    }
}

const login = async (data) => {
    const { email, password } = data

    const user = await User.findOne({ email })
    if (!user) throw new ErrorInstance('Usuario no encontrado', 404)
    if (user.suspended) throw new ErrorInstance('Cuenta suspendida', 403)

    if (!(await hashUtils.compare(password, user.password))) {
        throw new ErrorInstance('Contraseña incorrecta', 401)
    }

    return {
        id:                   user._id,
        name:                 user.name,
        email:                user.email,
        role:                 user.role,
        notificationsEnabled: user.notificationsEnabled,
        access_token:         makeToken(user),
    }
}

const getMe = async (id) => {
    const user = await User.findById(id).select('name email role notificationsEnabled quoteSettings createdAt').lean()
    if (!user) throw new ErrorInstance('Usuario no encontrado', 404)
    return user
}

const updateMe = async (id, data) => {
    const { name, password, quoteSettings } = data
    const patch = {}

    if (name)          patch.name          = name.trim()
    if (password)      patch.password      = await hashUtils.hash(password)
    if (quoteSettings) patch.quoteSettings = quoteSettings

    const updated = await User.findByIdAndUpdate(id, { $set: patch }, { new: true, runValidators: true })
        .select('name email role quoteSettings').lean()

    if (!updated) throw new ErrorInstance('Usuario no encontrado', 404)
    return updated
}

// ── Admin methods ──────────────────────────────────────────────

function normUser(doc) {
    const { _id, __v, password, resetToken, resetTokenExpiry, audit, ...rest } = doc
    return { id: _id.toString(), ...rest }
}

const getAllUsers = async () => {
    const docs = await User.find({})
        .select('name email role suspended notificationsEnabled createdAt')
        .sort({ createdAt: 1 })
        .lean()
    return docs.map(normUser)
}

const updateUser = async (id, patch) => {
    const allowed = ['name', 'email', 'role']
    const update  = {}
    for (const key of allowed) {
        if (patch[key] !== undefined) update[key] = patch[key]
    }
    if (!Object.keys(update).length) throw new ErrorInstance('Sin campos para actualizar', 400)

    const updated = await User.findByIdAndUpdate(id, { $set: update }, { new: true, runValidators: true })
        .select('name email role suspended notificationsEnabled createdAt').lean()
    if (!updated) throw new ErrorInstance('Usuario no encontrado', 404)
    return normUser(updated)
}

const toggleSuspend = async (id, suspended) => {
    const user = await User.findByIdAndUpdate(
        id,
        { $set: { suspended: !!suspended } },
        { new: true }
    ).select('name email role suspended notificationsEnabled createdAt').lean()
    if (!user) throw new ErrorInstance('Usuario no encontrado', 404)
    return normUser(user)
}

const toggleNotifications = async (id, enabled) => {
    const user = await User.findByIdAndUpdate(
        id,
        { $set: { notificationsEnabled: !!enabled } },
        { new: true }
    ).select('name email role suspended notificationsEnabled createdAt').lean()
    if (!user) throw new ErrorInstance('Usuario no encontrado', 404)
    return normUser(user)
}

const deleteUser = async (id) => {
    const deleted = await User.findByIdAndDelete(id)
    if (!deleted) throw new ErrorInstance('Usuario no encontrado', 404)
    return { message: 'Usuario eliminado' }
}

const authModel = {
    createUser, login, getMe, updateMe,
    getAllUsers, updateUser, toggleSuspend, toggleNotifications, deleteUser,
}

export default authModel
