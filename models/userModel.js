import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

var userSchema = new mongoose.Schema({
    name:{
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
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin: Boolean,
    role:{
        type:String,
        required:true,
        default:"user"
    },
    profilePic:{
        type: String
    },
    Advertisements:[{
        type: mongoose.Types.ObjectId,
        ref: 'Property'
    }],
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