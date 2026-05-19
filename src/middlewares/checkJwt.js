import { jwtUtils } from '../utils/jwt.js'
import { ErrorInstance } from '../config/error.config.js'

export const checkJwtMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null

    if (!token) {
        return next(new ErrorInstance('Token no encontrado — usa Authorization: Bearer <token>', 401))
    }

    try {
        const decoded = jwtUtils.verifyToken(token)
        req.user = {
            id:    decoded.id ?? decoded.sub,
            email: decoded.email,
            role:  decoded.role,
        }
        return next()
    } catch (e) {
        if (e.name === 'TokenExpiredError') {
            return next(new ErrorInstance('Token expirado', 401))
        }
        return next(new ErrorInstance('No fue posible decodificar el token', 401))
    }
}
