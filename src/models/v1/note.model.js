import Note from '../../schemas/note.schema.js'
import { ErrorInstance } from '../../config/error.config.js'
import { norm } from '../../utils/normalize.js'

// Map backend 'content' field to frontend 'text'
function normNote(doc) {
    if (!doc) return null
    const { _id, __v, userId, content, ...rest } = doc
    return { id: _id.toString(), text: content, ...rest }
}

const getAll = async (userId) => {
    const notes = await Note.find({ userId }).sort({ order: 1, createdAt: -1 }).lean()
    const mapped = notes.map(normNote)
    return {
        active:   mapped.filter(n => !n.archived),
        archived: mapped.filter(n =>  n.archived),
    }
}

const create = async (userId, data) => {
    const { text, color, x, y } = data
    const count = await Note.countDocuments({ userId, archived: false })
    const note  = new Note({ userId, content: text || '', color: color || 'yellow', x: x || 0, y: y || 0, order: count })
    return normNote((await note.save()).toObject())
}

const update = async (userId, id, patch) => {
    const allowed = ['color', 'x', 'y', 'order']
    const update  = {}
    for (const key of allowed) {
        if (patch[key] !== undefined) update[key] = patch[key]
    }
    // 'text' in patch maps to 'content' in DB
    if (patch.text !== undefined) update.content = patch.text

    const updated = await Note.findOneAndUpdate({ _id: id, userId }, { $set: update }, { new: true }).lean()
    if (!updated) throw new ErrorInstance('Nota no encontrada', 404)
    return normNote(updated)
}

const remove = async (userId, id) => {
    const deleted = await Note.findOneAndDelete({ _id: id, userId })
    if (!deleted) throw new ErrorInstance('Nota no encontrada', 404)
    return { message: 'Eliminada' }
}

const setArchived = async (userId, id, archived) => {
    const updated = await Note.findOneAndUpdate({ _id: id, userId }, { $set: { archived } }, { new: true }).lean()
    if (!updated) throw new ErrorInstance('Nota no encontrada', 404)
    return normNote(updated)
}

const noteModel = {
    getAll, create, update, remove,
    archive:   (u, id) => setArchived(u, id, true),
    unarchive: (u, id) => setArchived(u, id, false),
}
export default noteModel
