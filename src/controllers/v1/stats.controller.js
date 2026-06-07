import { asyncMiddleware } from '../../middlewares/async.middleware.js'
import statsModel from '../../models/v1/stats.model.js'

const getStats = asyncMiddleware(async (req, res) => {
    const [heatmap, goals] = await Promise.all([
        statsModel.getHeatmap(req.user.id),
        statsModel.getGoalsSummary(req.user.id),
    ])
    res.json({ heatmap, goals })
})

const statsController = { getStats }
export default statsController
