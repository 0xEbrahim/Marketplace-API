import mongoose from 'mongoose'

const regionSchema = new mongoose.Schema({
    cityNameAr:{
        type: JSON,
        required: true,
    },
    cityNameEn:{
        type: JSON,
        required: true,
    },
    governorateId:{
        type: mongoose.Types.ObjectId,
        ref:'Governorate',
    },
})

export default mongoose.model('Region', regionSchema)
