/* eslint-disable no-undef */
import mongoose from 'mongoose'
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Connected to the database ')
}).catch(err=>{
    console.log(err)
})
