import { asyncMiddleware } from '../../middlewares/async.middleware.js'
import habitCategoryModel from '../../models/v1/habitCategory.model.js'

const getAll           = asyncMiddleware(async (req, res) => { res.json(await habitCategoryModel.getAll(req.user.id)) })
const createCategory   = asyncMiddleware(async (req, res) => { res.status(201).json(await habitCategoryModel.createCategory(req.user.id, req.body)) })
const updateCategory   = asyncMiddleware(async (req, res) => { res.json(await habitCategoryModel.updateCategory(req.user.id, req.params.id, req.body)) })
const deleteCategory   = asyncMiddleware(async (req, res) => { res.json(await habitCategoryModel.deleteCategory(req.user.id, req.params.id)) })
const addActivity      = asyncMiddleware(async (req, res) => { res.status(201).json(await habitCategoryModel.addActivity(req.user.id, req.params.categoryId, req.body)) })
const updateActivity   = asyncMiddleware(async (req, res) => { res.json(await habitCategoryModel.updateActivity(req.user.id, req.params.categoryId, req.params.activityId, req.body)) })
const deleteActivity   = asyncMiddleware(async (req, res) => { res.json(await habitCategoryModel.deleteActivity(req.user.id, req.params.categoryId, req.params.activityId)) })
const toggleCompletion = asyncMiddleware(async (req, res) => { res.json(await habitCategoryModel.toggleCompletion(req.user.id, req.params.categoryId, req.params.activityId, req.body.date)) })

const habitCategoryController = { getAll, createCategory, updateCategory, deleteCategory, addActivity, updateActivity, deleteActivity, toggleCompletion }

export default habitCategoryController
