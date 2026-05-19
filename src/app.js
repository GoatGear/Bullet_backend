import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import hpp from 'hpp'
import v1Routes from './routes/v1/index.js'
import { errorNotFoundMiddleware, errorConverterMiddleware, errorHandlerMiddleware } from './middlewares/error.js'

const app = express()

app.use(helmet())

app.use(cors({
    origin: process.env.FRONT_URL,
    credentials: true,
}))

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Demasiadas solicitudes, reintenta más tarde.' },
})

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Demasiados intentos. Espera 15 minutos antes de reintentar.' },
})

app.use('/v1', apiLimiter)
app.use('/v1/auth/login',    authLimiter)
app.use('/v1/auth/register', authLimiter)

app.use(morgan('short'))
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: true, limit: '2mb' }))
app.use(mongoSanitize())
app.use(hpp())

app.use('/v1', v1Routes)

app.use(errorNotFoundMiddleware)
app.use(errorConverterMiddleware)
app.use(errorHandlerMiddleware)

export default app
