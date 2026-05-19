import { asyncMiddleware } from '../../middlewares/async.middleware.js'
import personalQuoteModel from '../../models/v1/personalQuote.model.js'

const getAll = asyncMiddleware(async (req, res) => {
    res.json(await personalQuoteModel.list(req.user.id))
})

const create = asyncMiddleware(async (req, res) => {
    res.status(201).json(await personalQuoteModel.create(req.user.id, req.body))
})

const remove = asyncMiddleware(async (req, res) => {
    res.json(await personalQuoteModel.remove(req.user.id, req.params.id))
})

const personalQuoteController = { getAll, create, remove }
export default personalQuoteController
