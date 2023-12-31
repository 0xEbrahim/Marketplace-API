import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

var userSchema = new mongoose.Schema({
    provider:{
        type:String,
        default:'normal',
    },
    isOnline:{
        type:Boolean,
        default:false,
    },
    googleId:{
        type:String,
        unique: true,
    }
    , name:{
        type:String,
        required:true,
    },
    slug:{
        type:String,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase: true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin: {
        type:Boolean,
         default:false,
        },
    role:{
        type:String,
        required:true,
        default:'user',
    },
    profilePic:{
        type: String,
    },
    Favourite:[{
        type: mongoose.Types.ObjectId,
        ref: 'Ad',
    }],
    pending:[{
        type: mongoose.Types.ObjectId,
        ref: 'Ad',
    }],
    passwordResetToken:{
        type:String,
        default:null,
    },
    verified:{
        type: Boolean,
        default: false,
    },
    deleted:{
        type:Boolean,
        default: false,
    },
    verificationCode:{
        type:String,
    },
}, {
    timestamps: true,
})

userSchema.pre('save', function () {
    const salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password, salt)
})

userSchema.methods.matchedPasswords = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

//Export the model
export default mongoose.model('User', userSchema)
