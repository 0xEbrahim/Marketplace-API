import mongoose from "mongoose";

const adSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    slug:{
        type:String,
        unique:true
    },
    AdType: {
        type: String,
        required: true,
    },
    propertyType:{
        type:String,
        required:true
    },
    unitType:{
        type:String,
        required: true
    },
    price: {
        type:Number,
        required: true
    },
    sellingSystem:{
        type:String,
        required:true,
    },
    propertyDetails:{
        type:mongoose.Types.ObjectId,
        ref:"Property"
    },
    description:{
        type:String,
        required:true,
    },
    pictures:[],
    advantages:[],
    address:{ 
       name:{
        type: String,
        required: true,
       },
       gov: {
        type: String,
        required: true,
       },
       region : {
        type: String,
        required: true,
       },
       lat:{
        type: String
       },
       lang:{
        type: String
       }
    },
    // Address:{
    //     type: JSON,
    //     required: true,
    // },
    Governorate:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Governorate"
    },
    Region:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Region"
    }
    ,
    owner:{
        type: mongoose.Types.ObjectId,
        ref:"User"
    },
    contactNumber:{
        type:String,
        required: true,
    }
},{
    timestamps: true
})

export default mongoose.model("Ad", adSchema)