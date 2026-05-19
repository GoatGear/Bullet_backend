import { Router } from 'express'
import personalQuoteController from '../../controllers/v1/personalQuote.controller.js'
import { checkJwtMiddleware as auth } from '../../middlewares/checkJwt.js'

const router = Router()

router.use(auth)

router.get('/',     personalQuoteController.getAll)
router.post('/',    personalQuoteController.create)
router.delete('/:id', personalQuoteController.remove)

export default router
