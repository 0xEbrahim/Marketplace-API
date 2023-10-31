import User from '../models/userModel.js'
import appError from '../utils/error.js'
import {ERROR, FAIL, SUCCESS} from '../utils/errorText.js'
import asyncHandler from "express-async-handler"
import {validateMongoID} from "../utils/validateMongoID.js"
import { getRandomInt } from '../utils/generateRandomNumber.js'
import otpGenerator from 'otp-generator'
import { sendEmail } from '../config/emailSend.js'

const getAllUsers = asyncHandler(async (req, res, next)=>{
    const limit = req?.query?.limit || 3000;
    const page = req?.query?.page || 1;
    const skip = (page - 1) * limit;
    const users = await User.find({}, {__v:false}).skip(skip).limit(limit);
    res.status(200).json({status:SUCCESS, data : {
        users
    }})
})

const getSingleUsers = asyncHandler(async (req, res, next)=>{
    const {id} = req.params;
    validateMongoID(id);
    const user = await User.findById(id);
    if(!user)
        throw appError.create("Resource not found.", 404, ERROR);
    else
        res.status(200).json({status: SUCCESS, data: {
             user
        }});
})

const updateUsers = asyncHandler(async (req, res, next)=>{
    const {_id} = req.user;
    validateMongoID(_id);
    const user = await User.findByIdAndUpdate(_id, {...req.body}, {new: true});
    if(!user)
    throw appError.create("Resource not found.", 404, ERROR);
else
    res.status(200).json({status: SUCCESS, data: {
         user
    }});
})

const deleteUsers = asyncHandler(async (req, res, next)=>{
        const {id} = req.params;
        validateMongoID(id);
        const user = await User.findByIdAndDelete(id);
        if(!user)
    throw appError.create("Resource not found.", 404, ERROR);
else
    res.status(200).json({status: SUCCESS, data: 
         null
    });
})

const verifyAccount = asyncHandler(async(req, res, next) => {
    const {_id, email} = req.user;
    validateMongoID(_id);
    const Code = otpGenerator.generate(6,{specialChars:false,lowerCaseAlphabets: false, upperCaseAlphabets: false });
    const user = await User.findById(_id);
    if(user.verified){
        return res.json({message: "This account is already verified."});
    }
    user.verificationCode = Code;
    await user.save();
    const verifyURL = `This is the code to verify your account, visit <a href="http://localhost:5001/api/user/verify-account/${Code}">Verify Account</a>`
    const data = {
            to:email,
            subject:"Trying NodeMailor",
            text:"Welcome to free trial",
            htm:verifyURL
    }
    sendEmail(data);
    res.json({status: SUCCESS, message: "Check the link recieved on your email."})
})

const finalVerify = asyncHandler(async(req, res, next) => {
    const {code} = req.params;
    console.log(code);
    const user = await User.findOneAndUpdate({verificationCode: code}, {verified:true, verificationCode:null}, {new : true});
    if(!user){
        throw appError.create("Resource not found", 404, ERROR);
    }else{
        res.json({status: SUCCESS, message: "Your account has been successfully verified"});
    }
})

const updateProfilePic = asyncHandler(async (req, res, next) => {
    const img = req.file;
    if(img){
        res.json({status: SUCCESS})
    }else{
        throw appError.create("Resource not found", 404 , ERROR)
    }
})

export {getAllUsers, getSingleUsers, updateUsers, deleteUsers, verifyAccount, finalVerify, updateProfilePic}