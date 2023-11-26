import { ERROR } from '../utils/errorText.js'

const notFound = (req, res, _next) => {
    res.status(404).json({ message : 'Resource not found', code: 404, data: null })
}
const error = (err, req, res, _next) => {
    res.status(err.statusCode || 500).json({ status : err.statusText || ERROR, message : err.message, code :err.statusCode || 500, data : null })
}

export { error, notFound }
