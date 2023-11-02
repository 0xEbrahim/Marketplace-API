import User from '../models/userModel.js'
import Ad from "../models/adModel.js"
import Property from "../models/propertyModel.js"
import appError from '../utils/error.js'
import {ERROR, FAIL, SUCCESS} from '../utils/errorText.js'
import asyncHandler from "express-async-handler"
import {validateMongoID} from "../utils/validateMongoID.js"

const getAllAds = asyncHandler(async(req, res, next) => {
    const limit = req.query.limit || 10 ;
    const page = req.query.page || 1;
    const skip = (page - 1 ) * limit;
    const ads = await Ad.find({}, {__v : false}).skip(skip).limit(limit);
    res.json({status: SUCCESS, data : {
        ads
    }})
})

const getSingleAd = asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    validateMongoID(id);
    const ad = await Ad.findById(id);
    if(!ad){
        throw appError.create('Resource not found.', 404, ERROR);
    }else{
        res.json({status:SUCCESS, data: {
            ad
        }})
    }
})

const createAd = asyncHandler(async(req, res, next) => {
    const {_id} = req.user;
    validateMongoID(_id);

        // extract ad info from the body
    const {
        title,
        sellingSystem,
        price,
        unitType,
        propertyType,
        AdType,
        contactNumber,
        advantages
        } = req.body;

        // extract property info from the body
    const {
        registered,
         Furnished,
          pathNumber,
           decorationType,
            floor,
            roomsNumber,
            area,
             yearOfDelivery,
             description
                } = req.body;

        // create the property
    const property = await Property.create({
        registered,
        Furnished,
         pathNumber,
          decorationType,
           floor,
            roomsNumber,
            area,
            yearOfDelivery
        })

        // extrect urls from multer path
        const pics = req.files;
        const urls = []
        for(let file of pics){
            const {path} = file;
            urls.push(path);
        }

        // create the ad
     let newAd = await Ad.create({
        title,
        sellingSystem,
        price,
        unitType,
        propertyType,
        AdType,
        propertyDetails:property._id,
        description,
        contactNumber,
        owner:_id,
        advantages,
        pictures: urls
    })
    
    await newAd.populate('propertyDetails owner');

    res.json({status:SUCCESS, data : {newAd}})
})  


const editAd = asyncHandler(async (req, res, next) => {

})

const deleteAd = asyncHandler(async(req, res, next) => {

})



export {getAllAds, getSingleAd, deleteAd, editAd, createAd}