import passport from "passport";
import {Strategy as GoogleStrategy}from 'passport-google-oauth20'
import User from "../models/userModel.js"
import asyncHandler from "express-async-handler"
import error from "../utils/error.js";

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.REDIRECT_URL
}, asyncHandler(async (accessToken, refreshToken, profile, done)=>{
   // console.log( profile);
   const user = await User.findOne({email:profile.emails[0].value}) ;
   if(!user){
    new User({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        password:profile.displayName+profile.emails[0].value+profile.id,
        mobile:null,
        provider:'google',
    })
    .save()
    .then((newUser)=>{
        console.log("Completed => ", newUser);
    })
}else{
    console.log("login");
}
})))