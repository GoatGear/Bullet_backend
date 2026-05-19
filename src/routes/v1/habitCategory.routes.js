import { Router } from 'express'
import habitCategoryController from '../../controllers/v1/habitCategory.controller.js'
import { checkJwtMiddleware as auth } from '../../middlewares/checkJwt.js'

const router = Router()

router.use(auth)

router.get('/',                                                     habitCategoryController.getAll)
router.post('/categories',                                          habitCategoryController.createCategory)
router.put('/categories/:id',                                       habitCategoryController.updateCategory)
router.delete('/categories/:id',                                    habitCategoryController.deleteCategory)
router.post('/categories/:categoryId/activities',                   habitCategoryController.addActivity)
router.put('/categories/:categoryId/activities/:activityId',        habitCategoryController.updateActivity)
router.delete('/categories/:categoryId/activities/:activityId',     habitCategoryController.deleteActivity)
router.patch('/categories/:categoryId/activities/:activityId/toggle', habitCategoryController.toggleCompletion)

export default router
