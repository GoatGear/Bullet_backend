import { asyncMiddleware } from '../../middlewares/async.middleware.js'
import topTaskModel from '../../models/v1/topTask.model.js'

const getAll   = asyncMiddleware(async (req, res) => { res.json(await topTaskModel.getAll(req.user.id)) })
const create   = asyncMiddleware(async (req, res) => { res.status(201).json(await topTaskModel.create(req.user.id, req.body)) })
const toggle   = asyncMiddleware(async (req, res) => { res.json(await topTaskModel.toggle(req.user.id, req.params.id)) })
const moveTo   = asyncMiddleware(async (req, res) => { res.json(await topTaskModel.moveTo(req.user.id, req.params.id, req.body.horizon)) })
const remove   = asyncMiddleware(async (req, res) => { res.json(await topTaskModel.remove(req.user.id, req.params.id)) })
const reorder  = asyncMiddleware(async (req, res) => { res.json(await topTaskModel.reorder(req.user.id, req.body.horizon, req.body.orderedIds)) })

const topTaskController = { getAll, create, toggle, moveTo, remove, reorder }

export default topTaskController
