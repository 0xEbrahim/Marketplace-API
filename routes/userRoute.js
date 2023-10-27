import express from 'express';
import {deleteUsers, updateUsers, getAllUsers, getSingleUsers, userProfile} from '../controllers/userController.js'
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';
import passport from 'passport';
const router = express.Router();

router.get('/',authMiddleware, isAdmin, getAllUsers);
router.get('/profile', userProfile)
router.get('/:id',authMiddleware, isAdmin, getSingleUsers);
router.put('/update-user',authMiddleware, updateUsers);
router.delete('/delete/:id',authMiddleware, isAdmin, deleteUsers);


export default router
