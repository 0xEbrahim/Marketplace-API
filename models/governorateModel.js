import mongoose from "mongoose";

const govSchema = new mongoose.Schema({
    nameAr:{
        type:String,
        required: true,
    },
    nameEn: {
        type: String,
        required: true,
    },
})

export default mongoose.model("Governorate", govSchema);