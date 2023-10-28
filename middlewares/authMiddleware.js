import asyncHandler from "express-async-handler"
import appError from "../utils/error.js"
import User from "../models/userModel.js"
import jwt from 'jsonwebtoken'
import { ERROR, FAIL } from "../utils/errorText.js"

const authMiddleware = asyncHandler(async(req, res, next) => {
    let token ;
    if(req?.headers?.authorization){
        token = req.headers.authorization.split(' ')[1];
         const{ id } = await jwt.verify(token, process.env.JWT_SECRET_KEY) ;
         const user = await User.findById(id);
    if(!user){
        //console.log(user)
        throw appError.create('Unauthorized', 401, FAIL);
    }else{
        req.user = user;
        next();
    }
}else{
    throw appError.create("Token is required", 401, ERROR);
}
})

const isAdmin = asyncHandler(async(req, res, next) => {
    const { email } = req.user;
    const adminUser = await User.findOne({email:email});
    if(adminUser.role === 'admin')
        next();
    else{
        throw appError.create('Unauthorized', 401, ERROR)
    }
})

export {authMiddleware, isAdmin}