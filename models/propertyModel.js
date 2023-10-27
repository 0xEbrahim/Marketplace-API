import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    AdType: {
        type: String,
        enum:["for sell", "for rent","investment"],
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
        enum:["Cash","Installment"]
    },
    propertyDetails:{
        area:{
            type:String,
            required: true,
        },
        floor:String,
        roomsNumber:{
            type:String,
            required: true,
        },
        decorationType:{
            type: String,
            requiredPaths: true,
        },
        pathNumber:{
            type: String,
            required: true
        },
        Furnished:{
            type: Boolean,
            required: true,
        },
        registered:{
            type:Boolean,
            required: true
        },
        yearOfDelivery:{
            type:String
        }
    },
    description:{
        type:String,
        required:true,
    },
    pictures:[],
    advantages:[],
    location:{
       type: "Point"
    },
    contactNumber:{
        type:String,
        required: true,
    }
})

export default mongoose.model("Property", propertySchema)