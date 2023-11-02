import User from '../models/userModel.js'
import appError from '../utils/error.js'
import {ERROR, FAIL, SUCCESS} from '../utils/errorText.js'
import jwt from 'jsonwebtoken'
import asyncHandler from "express-async-handler"
import {validateMongoID} from "../utils/validateMongoID.js"
import {generateToken, generateRefreshToken, resetPasswordToken} from '../config/generateJWT.js'
import queryString from 'query-string'
import axios from 'axios'
import passport from 'passport'
import { validationResult } from 'express-validator'
import { sendEmail } from '../config/emailSend.js'
/* #FIXME:
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

// #TODO: Write logout logic
const logout = asyncHandler(async (req, res, next) => {
    const {_id} = req.user;
    validateMongoID(_id);
    const user = await User.findById(_id);
    if(!user){
        throw appError.create("Resource not found.", 404, ERROR);
    }else{
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure:true,
        })
        res.send("ok")
    }
})

const handleRefreshToken = asyncHandler(async (req, res , next) => {
        const {_id} = req.user;
        validateMongoID(_id);
        const user = await User.findById(_id);
        //console.log(user)
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


// TODO: add google auth
const googleAuth = passport.authenticate('google',{
        session: false,
        scope: ['email', 'profile'],
        passReqToCallback: true
    }
)


const callbackRedirect = asyncHandler(async(req, res, next) => {

    const {_id} = req.user;

    validateMongoID(_id);

    const accessToken = await generateToken({id : _id});

    const refreshToken = await generateRefreshToken({id : _id});

    res.cookie('refreshToken',refreshToken,{
        maxAge: 72 * 60 * 60 * 60 
    })

    res.json({status : SUCCESS, data: {
        accessToken
    }})
})

const changePassword = asyncHandler(async(req, res, next) => {
    const {_id} = req.user;
    validationResult(_id);
    const {password} = req.body;
    const user = await User.findById(_id);
    user.password = password;
    await user.save();
    res.json({status: SUCCESS, data : user});
})

const forgotPassword = asyncHandler(async (req, res, next) => {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user){
        throw appError.create("There is no user with this email.", 400, ERROR);
    }else{
        const token = await resetPasswordToken({id: user._id});
        user.passwordResetToken = token;
        await user.save()
        const resetURL = `Hi, please follow this link to reset your password. this link is valid till 30 minutes from now. <a href='http://localhost:5001/api/auth/reset-password/${token}'>Click Here</a>`
        const data = {
            to:email,
            subject:"Trying NodeMailor",
            text:"Welcome to free trial",
            htm:resetURL
        }
        sendEmail(data);
        res.json({status: SUCCESS, message: "Check the link recieved on your email."})
    }
})

const resetPassword = asyncHandler(async(req, res, next) => {
        const {token} = req.params;
        const user = await User.findOne({passwordResetToken: token});
        if(!user){
            throw appError.create("Expired or invalid token", 401 , ERROR);
        }else{
            const {password} = req.body;
            user.password = password;
            user.passwordResetToken = null;
            await user.save();
            res.json({status: SUCCESS, data: user})
        }
})




export {
    register,
    login,
    adminLogin,
    handleRefreshToken,
    googleAuth,
    callbackRedirect,
    changePassword,
    forgotPassword,
    resetPassword,
    logout,
    
}