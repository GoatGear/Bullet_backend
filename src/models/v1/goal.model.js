import Goal from '../../schemas/goal.schema.js'
import { ErrorInstance } from '../../config/error.config.js'
import { normNested } from '../../utils/normalize.js'

const N = (doc) => normNested(doc, 'items')

const getAll = async (userId) => {
    const docs = await Goal.find({ userId }).sort({ order: 1, createdAt: -1 }).lean()
    return docs.map(N)
}

const create = async (userId, data) => {
    const { title, icon, accentColor, description, progressStyle, type, deadline, pinned, coverImage } = data
    if (!title?.trim()) throw new ErrorInstance('title es obligatorio', 400)

    const count = await Goal.countDocuments({ userId })
    const goal  = new Goal({
        userId, title: title.trim(),
        icon:          icon          || '🎯',
        accentColor:   accentColor   || '#C6FF00',
        description:   description   || '',
        progressStyle: progressStyle || 'bar',
        type:          type          || 'open',
        deadline:      deadline      || null,
        pinned:        pinned        ?? false,
        coverImage:    coverImage    || null,
        order: count,
    })
    return N((await goal.save()).toObject())
}

const update = async (userId, id, patch) => {
    const allowed = ['title', 'icon', 'accentColor', 'description', 'progressStyle', 'type', 'deadline', 'pinned', 'coverImage', 'order']
    const update  = {}
    for (const key of allowed) {
        if (patch[key] !== undefined) update[key] = patch[key]
    }
    const updated = await Goal.findOneAndUpdate({ _id: id, userId }, { $set: update }, { new: true }).lean()
    if (!updated) throw new ErrorInstance('Goal no encontrado', 404)
    return N(updated)
}

const remove = async (userId, id) => {
    const deleted = await Goal.findOneAndDelete({ _id: id, userId })
    if (!deleted) throw new ErrorInstance('Goal no encontrado', 404)
    return { message: 'Eliminado' }
}

const addItem = async (userId, goalId, text) => {
    if (!text?.trim()) throw new ErrorInstance('text es obligatorio', 400)

    const goal = await Goal.findOne({ _id: goalId, userId })
    if (!goal) throw new ErrorInstance('Goal no encontrado', 404)

    goal.items.push({ text: text.trim(), done: false, order: goal.items.length })
    await goal.save()
    return N(goal.toObject())
}

const toggleItem = async (userId, goalId, itemId) => {
    const goal = await Goal.findOne({ _id: goalId, userId })
    if (!goal) throw new ErrorInstance('Goal no encontrado', 404)

    const item = goal.items.id(itemId)
    if (!item) throw new ErrorInstance('Item no encontrado', 404)

    item.done = !item.done
    await goal.save()
    return N(goal.toObject())
}

const removeItem = async (userId, goalId, itemId) => {
    const goal = await Goal.findOne({ _id: goalId, userId })
    if (!goal) throw new ErrorInstance('Goal no encontrado', 404)

    const item = goal.items.id(itemId)
    if (!item) throw new ErrorInstance('Item no encontrado', 404)

    item.deleteOne()
    await goal.save()
    return N(goal.toObject())
}

const goalModel = { getAll, create, update, remove, addItem, toggleItem, removeItem }
export default goalModel
