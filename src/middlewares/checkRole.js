import { ErrorInstance } from '../config/error.config.js'

export const checkRole = (role) => (req, _res, next) => {
    if (req.user?.role !== role) {
        return next(new ErrorInstance('Acceso denegado', 403))
    }
    next()
}
