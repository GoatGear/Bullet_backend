import { ErrorInstance } from '../config/error.config.js'

export const errorNotFoundMiddleware = (_req, _res, next) => {
    next(new ErrorInstance('El recurso solicitado no existe', 404))
}

export const errorConverterMiddleware = (err, _req, _res, next) => {
    let error = err
    if (!(error instanceof ErrorInstance)) {
        error = new ErrorInstance(error.message, 500, err.stack)
    }
    next(error)
}

export const errorHandlerMiddleware = (err, req, res, _next) => {
    const response = {
        message:    err.message,
        code:       err.statusCode,
        url:        req.originalUrl,
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
    }
    console.error(response)
    res.status(err.statusCode).json(response)
}
