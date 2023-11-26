/* eslint-disable no-undef */
import { v2 as cloudinary } from 'cloudinary'
import asyncHandler from 'express-async-handler'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET, 
})

const imageUpload = asyncHandler(async (fileToUpload) => {
    cloudinary.uploader.upload(fileToUpload, { resource_type: 'auto' })
})

export { imageUpload }
