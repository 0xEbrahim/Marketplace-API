import multer from "multer";
import path from "path"
import { URL } from 'url';
import { fileURLToPath } from 'url';
import fs from 'fs'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const userStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,path.join(__dirname,'../images/users'))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + Date.now() +"-" + Math.round(Math.random() * 1e9) + ".jpeg")
    }
})

const propStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,path.join(__dirname,'../images/property'))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + Date.now() +"-" + Math.round(Math.random() * 1e9) + ".jpeg")
    }
})


const userUpload = multer({
    storage: userStorage,
})

const propUplload = multer({
    storage: propStorage
})

export {userUpload, propUplload}