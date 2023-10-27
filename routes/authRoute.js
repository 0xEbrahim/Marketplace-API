import express from "express";
const router = express.Router();
import {login, register, adminLogin, handleRefreshToken, googleRedirect} from "../controllers/authController.js"
import {authMiddleware, isAdmin} from '../middlewares/authMiddleware.js'
import passport from "passport";
router.post('/register', register);
router.post('/login', login);
router.post('/admin-login', adminLogin)
router.post('/refresh', authMiddleware, handleRefreshToken)

router.get('/google', passport.authenticate("google", {
    scope: ['email', 'profile'],
    passReqToCallback:true
  }))
router.get('/google/callback', passport.authenticate('google'), googleRedirect)
export default router
