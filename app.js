import 'dotenv/config'
import "./config/database.js"
import express from 'express'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import morgan from 'morgan';
import {error, notFound} from './middlewares/errorHandling.js';
import authRouter from "./routes/authRoute.js"
import userRoute from './routes/userRoute.js'
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())
app.use(cookieParser())
app.use(morgan("dev"))

app.use('/api/user', authRouter)
app.use('/api/user', userRoute)
app.use('*', notFound)
app.use(error)


app.listen(PORT, () => {
console.log(`listening to PORT => ${PORT}`)
})
