import { Router } from 'express'
import noteController from '../../controllers/v1/note.controller.js'
import { checkJwtMiddleware as auth } from '../../middlewares/checkJwt.js'

const router = Router()

router.use(auth)

router.get('/',                 noteController.getAll)
router.post('/',                noteController.create)
router.put('/:id',              noteController.update)
router.patch('/:id',            noteController.update)
router.delete('/:id',           noteController.remove)
router.patch('/:id/archive',    noteController.archive)
router.patch('/:id/unarchive',  noteController.unarchive)

export default router
