import mongoose from 'mongoose'
import appError from './error.js'
import { FAIL } from './errorText.js'
const validateMongoID = async (id) => {
    const valid = await mongoose.Types.ObjectId.isValid(id)
    if (!valid)
       throw appError.create('Invalid ID', 400, FAIL)
}

export { validateMongoID }
