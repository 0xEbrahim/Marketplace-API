import express from "express";
const router = express.Router();
import {login, register, adminLogin, handleRefreshToken, googleAuth, callbackRedirect, forgotPassword, changePassword, resetPassword } from "../controllers/authController.js"
import {authMiddleware, isAdmin} from '../middlewares/authMiddleware.js'
import passport from "passport";

router.post('/register', register);
router.post('/login', login);
router.get('/forgot-password', forgotPassword);
router.post('/admin-login', adminLogin)
router.post('/refresh', authMiddleware, handleRefreshToken)
router.get('/google', googleAuth)
router.get('/google/callback', passport.authenticate('google',{session: false}), callbackRedirect)
router.put('/change-password', authMiddleware, changePassword)
router.put('/reset-password/:token', resetPassword);

export default router
