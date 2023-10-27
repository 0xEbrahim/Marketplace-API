import mongoose from "mongoose";

const adSchema = new mongoose.Schema({
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
        type:mongoose.Types.ObjectId,
        ref:"Property"
    },
    description:{
        type:String,
        required:true,
    },
    pictures:[],
    advantages:[],
    location:{
      
    },
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