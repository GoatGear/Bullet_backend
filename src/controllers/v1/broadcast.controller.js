import { asyncMiddleware } from '../../middlewares/async.middleware.js'
import broadcastModel from '../../models/v1/broadcast.model.js'

const getAll         = asyncMiddleware(async (req, res) => { res.json(await broadcastModel.getAll(req.user.id)) })
const getUnreadCount = asyncMiddleware(async (req, res) => { res.json({ count: await broadcastModel.getUnreadCount(req.user.id) }) })
const getSent        = asyncMiddleware(async (_req, res) => { res.json(await broadcastModel.getSent()) })
const create         = asyncMiddleware(async (req, res) => { res.status(201).json(await broadcastModel.create(req.user.id, req.body)) })
const markAllRead    = asyncMiddleware(async (req, res) => { res.json(await broadcastModel.markAllRead(req.user.id)) })
const deleteOne      = asyncMiddleware(async (req, res) => { res.json(await broadcastModel.deleteOne(req.params.id)) })

const broadcastController = { getAll, getUnreadCount, getSent, create, markAllRead, deleteOne }
export default broadcastController
