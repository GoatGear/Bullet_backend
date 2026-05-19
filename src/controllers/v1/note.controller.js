import { asyncMiddleware } from '../../middlewares/async.middleware.js'
import noteModel from '../../models/v1/note.model.js'

const getAll   = asyncMiddleware(async (req, res) => { res.json(await noteModel.getAll(req.user.id)) })
const create   = asyncMiddleware(async (req, res) => { res.status(201).json(await noteModel.create(req.user.id, req.body)) })
const update   = asyncMiddleware(async (req, res) => { res.json(await noteModel.update(req.user.id, req.params.id, req.body)) })
const remove   = asyncMiddleware(async (req, res) => { res.json(await noteModel.remove(req.user.id, req.params.id)) })
const archive   = asyncMiddleware(async (req, res) => { res.json(await noteModel.archive(req.user.id, req.params.id)) })
const unarchive = asyncMiddleware(async (req, res) => { res.json(await noteModel.unarchive(req.user.id, req.params.id)) })

const noteController = { getAll, create, update, remove, archive, unarchive }

export default noteController
