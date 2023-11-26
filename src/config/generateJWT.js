/* eslint-disable no-undef */
import jwt from 'jsonwebtoken'

const generateToken = async (id) => {
    return await jwt.sign(id, process.env.JWT_SECRET_KEY, { expiresIn:'1d' })
}

const generateRefreshToken = async (id) => {
    return await jwt.sign(id, process.env.JWT_SECRET_KEY, { expiresIn:'3d' })
}

const resetPasswordToken = async (id) => {
    return await jwt.sign(id, process.env.JWT_SECRET_KEY, { expiresIn:'10m' })
}


export { generateToken, generateRefreshToken, resetPasswordToken }
