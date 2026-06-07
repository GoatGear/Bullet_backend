import { Router } from 'express'
import authRoutes          from './auth.routes.js'
import dayTaskRoutes       from './dayTask.routes.js'
import topTaskRoutes       from './topTask.routes.js'
import habitRoutes         from './habitCategory.routes.js'
import noteRoutes          from './note.routes.js'
import goalRoutes          from './goal.routes.js'
import broadcastRoutes     from './broadcast.routes.js'
import personalQuoteRoutes from './personalQuote.routes.js'
import statsRoutes         from './stats.routes.js'

const router = Router()

router.get('/health', (_req, res) => res.json({ status: 'ok' }))

router.use('/auth',        authRoutes)
router.use('/day-tasks',   dayTaskRoutes)
router.use('/top-tasks',   topTaskRoutes)
router.use('/habits',      habitRoutes)
router.use('/notes',       noteRoutes)
router.use('/goals',       goalRoutes)
router.use('/broadcasts',  broadcastRoutes)
router.use('/quotes',      personalQuoteRoutes)
router.use('/stats',       statsRoutes)

export default router
