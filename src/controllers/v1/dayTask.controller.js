import { asyncMiddleware } from '../../middlewares/async.middleware.js'
import dayTaskModel from '../../models/v1/dayTask.model.js'

const getAll   = asyncMiddleware(async (req, res) => { res.json(await dayTaskModel.getAll(req.user.id)) })
const create   = asyncMiddleware(async (req, res) => { res.status(201).json(await dayTaskModel.create(req.user.id, req.body)) })
const toggle   = asyncMiddleware(async (req, res) => { res.json(await dayTaskModel.toggle(req.user.id, req.params.id)) })
const update   = asyncMiddleware(async (req, res) => { res.json(await dayTaskModel.update(req.user.id, req.params.id, req.body)) })
const remove   = asyncMiddleware(async (req, res) => { res.json(await dayTaskModel.remove(req.user.id, req.params.id)) })
const reorder  = asyncMiddleware(async (req, res) => { res.json(await dayTaskModel.reorder(req.user.id, req.body.orderedIds)) })

const dayTaskController = { getAll, create, toggle, update, remove, reorder }

export default dayTaskController
