import User from '../models/userModel.js'
import appError from '../utils/error.js'
import {ERROR, FAIL, SUCCESS} from '../utils/errorText.js'
import jwt from 'jsonwebtoken'
import asyncHandler from "express-async-handler"
import {validateMongoID} from "../utils/validateMongoID.js"
import {generateToken, generateRefreshToken} from '../config/generateJWT.js'

/* #TODO:
adding validation to register
*/
const register = asyncHandler(async (req, res, next) => {
    const user = await User.create({...req.body});
    res.status(201).json({status: SUCCESS, data: {
        user
    }});
})

const login = asyncHandler(async (req, res, next) => {

    const {email, password} = req.body;
    if(!email){
        throw appError.create("Neither Email nor password can be empty.", 400 , ERROR);
    }else{
        const user = await User.findOne({email});
        if(!user){
            throw appError.create("Email or password is wrong", 400 , ERROR);
        }else{
            const isPasswordCorrect = await user.matchedPasswords(password);
            if(isPasswordCorrect){
                const refreshToken = await generateRefreshToken({id : user?._id});
                
                res.cookie('refreshToken', refreshToken, {
                    maxAge:72*60*60*1000,
                })

                const accessToken = await generateToken({id : user?._id});
                res.status(200).json({status: SUCCESS, datat:{
                    message:"Successfully loggedIn",
                    accessToken
                }})
            }else{
            throw appError.create("Email or password is wrong", 400 , ERROR);
            }
        }
    }
})

const adminLogin = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body;
    if(!email){
        throw appError.create("Neither Email nor password can be empty.", 400 , ERROR);
    }else{
        const user = await User.findOne({email});
        if(!user){
            throw appError.create("Email or password is wrong", 400 , ERROR);
        }else{
           if(user.role != 'admin'){
                throw appError.create('Only admins are allowed', 401, ERROR)
           }
           else{ 
            const isPasswordCorrect = await user.matchedPasswords(password);
            if(isPasswordCorrect){
                const refreshToken = await generateRefreshToken({id : user?._id});
                
                res.cookie('refreshToken', refreshToken, {
                    maxAge:72*60*60*1000,
                })

                const accessToken = await generateToken({id : user?._id});
                res.status(200).json({status: SUCCESS, datat:{
                    message:"Successfully loggedIn",
                    accessToken
                }})
            }else{
            throw appError.create("Email or password is wrong", 400 , ERROR);
            }
        }
        }
    }
})

const handleRefreshToken = asyncHandler(async (req, res , next) => {
        const {_id} = req.user;
        validateMongoID(_id);
        const user = await User.findById(_id);
        const refreshToken = req?.cookies?.refreshToken;
        const decodedToken = await jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
        if(decodedToken?.id == user._id){
            const accessToken = await generateToken({id : user._id});
            res.status(200).json({status:SUCCESS, data:{
                accessToken
            }})
        }else{  
            throw appError.create("Can't generate token", 401, FAIL)
        }
})

export {register, login, adminLogin, handleRefreshToken}