import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
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
    },
    
},{
    timestamps: true
}
)

export default mongoose.model("Property", propertySchema)