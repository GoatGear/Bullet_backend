import mongoose from 'mongoose'
import DayTask from '../../schemas/dayTask.schema.js'
import Goal    from '../../schemas/goal.schema.js'

const getHeatmap = async (userId, days = 84) => {
    const start = new Date()
    start.setDate(start.getDate() - days + 1)
    start.setHours(0, 0, 0, 0)

    const docs = await DayTask.aggregate([
        {
            $match: {
                userId:       new mongoose.Types.ObjectId(userId),
                scheduledFor: { $gte: start },
            },
        },
        {
            $group: {
                _id:       { $dateToString: { format: '%Y-%m-%d', date: '$scheduledFor' } },
                total:     { $sum: 1 },
                completed: { $sum: { $cond: ['$done', 1, 0] } },
            },
        },
        { $sort: { _id: 1 } },
    ])

    return docs.map(d => ({ date: d._id, total: d.total, completed: d.completed }))
}

const getGoalsSummary = async (userId) => {
    const goals = await Goal.find({ userId })
        .select('title icon accentColor items pinned order')
        .sort({ order: 1 })
        .lean()

    return goals.map(g => {
        const total    = g.items.length
        const done     = g.items.filter(i => i.done).length
        const progress = total > 0 ? Math.round((done / total) * 100) : 0
        return { id: g._id, title: g.title, icon: g.icon, color: g.accentColor, total, done, progress, pinned: g.pinned }
    })
}

const statsModel = { getHeatmap, getGoalsSummary }
export default statsModel
