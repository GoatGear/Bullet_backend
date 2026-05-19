import Broadcast from '../../schemas/broadcast.schema.js'
import User      from '../../schemas/user.schema.js'
import { ErrorInstance } from '../../config/error.config.js'

function normBroadcast(doc, userId) {
    const { _id, __v, readBy, createdBy, recipients, ...rest } = doc
    return {
        id:     _id.toString(),
        isRead: readBy.map(String).includes(userId.toString()),
        ...rest,
    }
}

// Build the MongoDB visibility query for a given user.
// Global broadcasts (recipients=[]) are only visible if created AFTER the user registered.
// Targeted broadcasts (recipients includes userId) are always visible regardless of date.
async function visibilityQuery(userId) {
    const user = await User.findById(userId).select('notificationsEnabled createdAt').lean()
    const enabled      = user?.notificationsEnabled ?? true
    const registeredAt = user?.createdAt ?? new Date(0)

    return enabled
        ? { $or: [
            { recipients: { $size: 0 }, createdAt: { $gt: registeredAt } },
            { recipients: userId },
          ]}
        : { recipients: userId }
}

const getAll = async (userId) => {
    const query = await visibilityQuery(userId)
    const docs  = await Broadcast.find(query).sort({ createdAt: -1 }).lean()
    return docs.map(doc => normBroadcast(doc, userId))
}

const getUnreadCount = async (userId) => {
    const query = await visibilityQuery(userId)
    return Broadcast.countDocuments({ ...query, readBy: { $ne: userId } })
}

const getSent = async () => {
    const docs = await Broadcast.find({})
        .populate('recipients', 'name email')
        .populate('readBy', 'name')
        .sort({ createdAt: -1 })
        .lean()
    return docs.map(doc => {
        const { _id, __v, readBy, createdBy, recipients, ...rest } = doc
        return {
            id:              _id.toString(),
            totalRecipients: recipients.length === 0 ? 'all' : recipients.length,
            recipients:      recipients.map(r => ({ id: r._id.toString(), name: r.name })),
            readers:         readBy.map(r => ({ id: r._id.toString(), name: r.name })),
            ...rest,
        }
    })
}

const create = async (adminId, { title = '', content, recipients = [] }) => {
    if (!content?.trim()) throw new ErrorInstance('El contenido es obligatorio', 400)
    const doc = await Broadcast.create({ title, content, createdBy: adminId, recipients })
    return normBroadcast(doc.toObject(), adminId)
}

const markAllRead = async (userId) => {
    const query = await visibilityQuery(userId)
    await Broadcast.updateMany(
        { ...query, readBy: { $ne: userId } },
        { $addToSet: { readBy: userId } }
    )
    return { message: 'ok' }
}

const deleteOne = async (id) => {
    const deleted = await Broadcast.findByIdAndDelete(id)
    if (!deleted) throw new ErrorInstance('Mensaje no encontrado', 404)
    return { message: 'Eliminado' }
}

const createWelcome = async (userId) => {
    await Broadcast.create({
        title:      '¡Bienvenido/a a tu Bullet Journal!',
        content:    'Tu espacio está listo. Aquí encontrarás tus tareas del día, top tasks, goals y notas rápidas.\n\nCualquier anuncio del administrador llegará a esta bandeja. ¡Que sea productivo! 🌱',
        createdBy:  null,
        recipients: [userId],
        readBy:     [],
    })
}

const broadcastModel = { getAll, getUnreadCount, getSent, create, createWelcome, markAllRead, deleteOne }
export default broadcastModel
