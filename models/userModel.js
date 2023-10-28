import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

var userSchema = new mongoose.Schema({
    provider:{
        type:String,
        default:'normal'
    },
    isOnline:{
        type:Boolean,
        default:false
    },
    googleId:{
        type:String,
        unique: true,
    }
    ,name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase: true,
    },
    mobile:{
        type:String,
        //required:true,
        //unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin: {
        type:Boolean,
         default:false
        },
    role:{
        type:String,
        required:true,
        default:"user"
    },
    profilePic:{
        type: String
    },
    Favorite:[{
        type: mongoose.Types.ObjectId,
        ref: 'Property'
    }],
    pending:[{
        type: mongoose.Types.ObjectId,
        ref: 'Property'
    }]
},{
    timestamps: true
});

userSchema.pre('save', function (){
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
})

userSchema.methods.matchedPasswords = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

//Export the model
export default mongoose.model('User', userSchema);