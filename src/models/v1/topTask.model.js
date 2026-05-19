import TopTask from '../../schemas/topTask.schema.js'
import { ErrorInstance } from '../../config/error.config.js'
import { norm, normMany } from '../../utils/normalize.js'

const getAll = async (userId) => {
    const docs = await TopTask.find({ userId }).sort({ order: 1, createdAt: 1 }).lean()
    const tasks = normMany(docs)
    return {
        day:   tasks.filter(t => t.horizon === 'day'),
        week:  tasks.filter(t => t.horizon === 'week'),
        month: tasks.filter(t => t.horizon === 'month'),
    }
}

const create = async (userId, data) => {
    const { text, horizon, type, priority, deadline, recurring } = data
    if (!text?.trim())  throw new ErrorInstance('text es obligatorio', 400)
    if (!horizon)       throw new ErrorInstance('horizon es obligatorio', 400)

    const count = await TopTask.countDocuments({ userId, horizon })
    const task  = new TopTask({ userId, text: text.trim(), horizon, type: type || 'simple', priority: priority || null, deadline: deadline || null, recurring: recurring || null, order: count })
    return norm((await task.save()).toObject())
}

const toggle = async (userId, id) => {
    const task = await TopTask.findOne({ _id: id, userId })
    if (!task) throw new ErrorInstance('Tarea no encontrada', 404)
    task.done = !task.done
    return norm((await task.save()).toObject())
}

const moveTo = async (userId, id, newHorizon) => {
    const count   = await TopTask.countDocuments({ userId, horizon: newHorizon })
    const updated = await TopTask.findOneAndUpdate(
        { _id: id, userId },
        { $set: { horizon: newHorizon, order: count } },
        { new: true, runValidators: true }
    ).lean()
    if (!updated) throw new ErrorInstance('Tarea no encontrada', 404)
    return norm(updated)
}

const remove = async (userId, id) => {
    const deleted = await TopTask.findOneAndDelete({ _id: id, userId })
    if (!deleted) throw new ErrorInstance('Tarea no encontrada', 404)
    return { message: 'Eliminada' }
}

const reorder = async (userId, horizon, orderedIds) => {
    await Promise.all(orderedIds.map((id, index) =>
        TopTask.updateOne({ _id: id, userId, horizon }, { $set: { order: index } })
    ))
    return { message: 'Reordenadas' }
}

const topTaskModel = { getAll, create, toggle, moveTo, remove, reorder }
export default topTaskModel
