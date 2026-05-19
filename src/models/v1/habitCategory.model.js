import HabitCategory from '../../schemas/habitCategory.schema.js'
import { ErrorInstance } from '../../config/error.config.js'
import { normNested } from '../../utils/normalize.js'

const N = (doc) => normNested(doc, 'activities')

const getAll = async (userId) => {
    const docs = await HabitCategory.find({ userId }).sort({ order: 1 }).lean()
    return docs.map(N)
}

const createCategory = async (userId, data) => {
    const { name, icon } = data
    if (!name?.trim()) throw new ErrorInstance('name es obligatorio', 400)

    const count    = await HabitCategory.countDocuments({ userId })
    const category = new HabitCategory({ userId, name: name.trim(), icon: icon || '📋', order: count })
    return N((await category.save()).toObject())
}

const updateCategory = async (userId, id, patch) => {
    const allowed = ['name', 'icon', 'order']
    const update  = {}
    for (const key of allowed) {
        if (patch[key] !== undefined) update[key] = patch[key]
    }
    const updated = await HabitCategory.findOneAndUpdate({ _id: id, userId }, { $set: update }, { new: true }).lean()
    if (!updated) throw new ErrorInstance('Categoría no encontrada', 404)
    return N(updated)
}

const deleteCategory = async (userId, id) => {
    const deleted = await HabitCategory.findOneAndDelete({ _id: id, userId })
    if (!deleted) throw new ErrorInstance('Categoría no encontrada', 404)
    return { message: 'Eliminada' }
}

const addActivity = async (userId, categoryId, data) => {
    const { name } = data
    if (!name?.trim()) throw new ErrorInstance('name es obligatorio', 400)

    const category = await HabitCategory.findOne({ _id: categoryId, userId })
    if (!category) throw new ErrorInstance('Categoría no encontrada', 404)

    category.activities.push({ name: name.trim(), completions: [], order: category.activities.length })
    await category.save()
    return N(category.toObject())
}

const updateActivity = async (userId, categoryId, activityId, patch) => {
    const category = await HabitCategory.findOne({ _id: categoryId, userId })
    if (!category) throw new ErrorInstance('Categoría no encontrada', 404)

    const activity = category.activities.id(activityId)
    if (!activity) throw new ErrorInstance('Actividad no encontrada', 404)

    if (patch.name  !== undefined) activity.name  = patch.name.trim()
    if (patch.order !== undefined) activity.order = patch.order

    await category.save()
    return N(category.toObject())
}

const deleteActivity = async (userId, categoryId, activityId) => {
    const category = await HabitCategory.findOne({ _id: categoryId, userId })
    if (!category) throw new ErrorInstance('Categoría no encontrada', 404)

    const activity = category.activities.id(activityId)
    if (!activity) throw new ErrorInstance('Actividad no encontrada', 404)

    activity.deleteOne()
    await category.save()
    return N(category.toObject())
}

const toggleCompletion = async (userId, categoryId, activityId, date) => {
    const category = await HabitCategory.findOne({ _id: categoryId, userId })
    if (!category) throw new ErrorInstance('Categoría no encontrada', 404)

    const activity = category.activities.id(activityId)
    if (!activity) throw new ErrorInstance('Actividad no encontrada', 404)

    const idx = activity.completions.indexOf(date)
    if (idx === -1) activity.completions.push(date)
    else            activity.completions.splice(idx, 1)

    await category.save()
    return N(category.toObject())
}

const habitCategoryModel = { getAll, createCategory, updateCategory, deleteCategory, addActivity, updateActivity, deleteActivity, toggleCompletion }
export default habitCategoryModel
