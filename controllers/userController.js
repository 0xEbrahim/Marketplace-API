import User from '../models/userModel.js'
import appError from '../utils/error.js'
import {ERROR, FAIL, SUCCESS} from '../utils/errorText.js'
import asyncHandler from "express-async-handler"
import {validateMongoID} from "../utils/validateMongoID.js"


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

const userProfile = asyncHandler(async(req, res, next) => {
    // #TODO: handle user profile
    res.send("Your profile")    
})
export {getAllUsers, getSingleUsers, userProfile, updateUsers, deleteUsers}