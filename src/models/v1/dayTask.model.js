import DayTask from '../../schemas/dayTask.schema.js'
import { ErrorInstance } from '../../config/error.config.js'
import { norm, normMany } from '../../utils/normalize.js'

function todayStart() {
    const d = new Date(); d.setHours(0, 0, 0, 0); return d
}
function tomorrowStart() {
    const d = todayStart(); d.setDate(d.getDate() + 1); return d
}

async function carryOver(userId) {
    await DayTask.updateMany(
        { userId, done: false, scheduledFor: { $lt: todayStart() } },
        { $set: { scheduledFor: todayStart() } }
    )
}

const getAll = async (userId) => {
    await carryOver(userId)
    const docs = await DayTask.find({ userId, scheduledFor: { $gte: todayStart(), $lt: tomorrowStart() } })
        .sort({ order: 1, createdAt: 1 }).lean()
    return normMany(docs)
}

const create = async (userId, data) => {
    const { text, type, priority, deadline, recurring } = data
    if (!text?.trim()) throw new ErrorInstance('text es obligatorio', 400)

    const count = await DayTask.countDocuments({ userId, scheduledFor: { $gte: todayStart(), $lt: tomorrowStart() } })
    const task  = new DayTask({
        userId, text: text.trim(),
        type:         type      || 'simple',
        priority:     priority  || null,
        deadline:     deadline  || null,
        recurring:    recurring || null,
        scheduledFor: todayStart(),
        order:        count,
    })
    return norm((await task.save()).toObject())
}

const toggle = async (userId, id) => {
    const task = await DayTask.findOne({ _id: id, userId })
    if (!task) throw new ErrorInstance('Tarea no encontrada', 404)
    task.done = !task.done
    return norm((await task.save()).toObject())
}

const update = async (userId, id, data) => {
    const allowed = ['text', 'type', 'priority', 'deadline', 'recurring']
    const patch = {}
    for (const key of allowed) {
        if (data[key] !== undefined) patch[key] = data[key]
    }
    const updated = await DayTask.findOneAndUpdate({ _id: id, userId }, { $set: patch }, { new: true, runValidators: true }).lean()
    if (!updated) throw new ErrorInstance('Tarea no encontrada', 404)
    return norm(updated)
}

const remove = async (userId, id) => {
    const deleted = await DayTask.findOneAndDelete({ _id: id, userId })
    if (!deleted) throw new ErrorInstance('Tarea no encontrada', 404)
    return { message: 'Eliminada' }
}

const reorder = async (userId, orderedIds) => {
    await Promise.all(orderedIds.map((id, index) =>
        DayTask.updateOne({ _id: id, userId }, { $set: { order: index } })
    ))
    return { message: 'Reordenadas' }
}

const dayTaskModel = { getAll, create, toggle, update, remove, reorder }
export default dayTaskModel
