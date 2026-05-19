import jwt from 'jsonwebtoken'

const generateToken = (data) => {
    return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '30d' })
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.TOKEN_SECRET)
}

export const jwtUtils = { generateToken, verifyToken }
