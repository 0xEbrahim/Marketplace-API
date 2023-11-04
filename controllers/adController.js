import User from '../models/userModel.js'
import Ad from "../models/adModel.js"
import Gov from "../models/governorateModel.js"
import Region from "../models/regionModel.js"
import translate from 'translate-google'
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
    console.log(req.body)
    
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

        const {
            name,
            gov,
            region,
            lang,
            lat
        } = req.body;

        // check if this region is already on my DB
        let goverorate = await Gov.findOne({nameAr : gov});
        let enteredRegion = await Region.findOne({cityNameAr: region});
        if(!enteredRegion){
            const translated = await translate(region , {from : 'ar', to : 'en'});
            enteredRegion = await Region.create({cityNameAr : region , cityNameEn : translated})
        }
        if(!goverorate){
            const translated = await translate( gov , {from:'ar', to:'en'});
            goverorate = await Gov.create({nameAr: gov, nameEn: translated})
        }

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
        pictures: urls,
        address: {name, gov, region, lang, lat},
        Region: enteredRegion._id,
        Governorate: goverorate._id,
    })
    
    await newAd.populate('propertyDetails owner Region Governorate');
    
    res.json({status:SUCCESS, data : {newAd}})
})  


const editAd = asyncHandler(async (req, res, next) => {
    const {_id} = req.user;
    const {id} = req.params;
    validateMongoID(id);
    validateMongoID(_id);
    const user = await User.findById(_id);
    let ad = await Ad.findById(id);
    const isTheOwner = (ad.owner.toString() === user._id.toString());
    if(isTheOwner){
        const pics = req.files;
        if(pics.length){
            const urls = []
        for(let file of pics){
            const {path} = file;
            urls.push(path);
        }
            ad = await Ad.findByIdAndUpdate(id, {...req.body, pictures: [...ad.pictures,...urls]}, {new : true});
        }else{
            ad = await Ad.findByIdAndUpdate(id, {...req.body}, {new : true});
        }
    }else{
        throw appError.create("Unautharized", 401, ERROR);
    }
    res.json({status: SUCCESS, data : { ad }});
})

const deleteAd = asyncHandler(async(req, res, next) => {

})



export {getAllAds, getSingleAd, deleteAd, editAd, createAd}