import express from "express";
const router = express.Router();
import {login, register, adminLogin, handleRefreshToken} from "../controllers/authController.js"
import {authMiddleware, isAdmin} from '../middlewares/authMiddleware.js'

router.post('/register', register);
router.post('/login', login);
router.post('/admin-login', adminLogin)
router.post('/refresh', authMiddleware, handleRefreshToken)

export default router
