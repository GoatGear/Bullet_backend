import { asyncMiddleware } from '../../middlewares/async.middleware.js'
import goalModel from '../../models/v1/goal.model.js'

const getAll     = asyncMiddleware(async (req, res) => { res.json(await goalModel.getAll(req.user.id)) })
const create     = asyncMiddleware(async (req, res) => { res.status(201).json(await goalModel.create(req.user.id, req.body)) })
const update     = asyncMiddleware(async (req, res) => { res.json(await goalModel.update(req.user.id, req.params.id, req.body)) })
const remove     = asyncMiddleware(async (req, res) => { res.json(await goalModel.remove(req.user.id, req.params.id)) })
const addItem    = asyncMiddleware(async (req, res) => { res.status(201).json(await goalModel.addItem(req.user.id, req.params.id, req.body.text)) })
const toggleItem = asyncMiddleware(async (req, res) => { res.json(await goalModel.toggleItem(req.user.id, req.params.id, req.params.itemId)) })
const removeItem = asyncMiddleware(async (req, res) => { res.json(await goalModel.removeItem(req.user.id, req.params.id, req.params.itemId)) })

const goalController = { getAll, create, update, remove, addItem, toggleItem, removeItem }

export default goalController
