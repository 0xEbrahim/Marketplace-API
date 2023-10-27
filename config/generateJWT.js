import jwt from 'jsonwebtoken';

const generateToken = async (id) => {
    return await jwt.sign(id ,process.env.JWT_SECRET_KEY,{expiresIn:'1d'});
}

const generateRefreshToken = async (id) => {
    return await jwt.sign(id ,process.env.JWT_SECRET_KEY, {expiresIn:'3d'});
}


export {generateToken, generateRefreshToken}