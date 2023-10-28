import passport from "passport";
import GoogleStrategy from 'passport-google-oauth2'
import User from "../models/userModel.js";
import asyncHandler from 'express-async-handler'
import slugify from "slugify";
import uniqid from 'uniqid'

passport.serializeUser((user, done)=>{
    done(null, user.id)
})

passport.deserializeUser(asyncHandler(async(id, done) => {
    const user = await User.findById(id);
    done(null, user)
}))

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.REDIRECT_URL
},asyncHandler(async(accessToken, refreshToken, profile, done)=>{
    
    const userEmail = profile.email;
    const user  = await User.findOne({email: userEmail});
    if(!user){
        const newUser = await User.create({
            name: profile.displayName,
            provider:'google',
            googleId: profile.id,
            slug:slugify(profile.displayName)+uniqid(),
            email: profile.email,
            password:profile.displayName+profile.email+uniqid(),
            mobile:uniqid(),
            profilePic:profile.picture
        })
        done(null, newUser)
    }else{
        done(null, user)
    }
})
))