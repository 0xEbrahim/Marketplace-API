import express from 'express';
import {deleteUsers, updateUsers, getAllUsers, getSingleUsers, verifyAccount, finalVerify, updateProfilePic} from '../controllers/userController.js'
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';
import {imageUpload} from '../config/imageUpload.js'
import { userUpload } from '../middlewares/multer.js';
const router = express.Router();

router.get('/',authMiddleware, isAdmin, getAllUsers);
router.get('/verify-account',authMiddleware, verifyAccount)
router.get('/:id',authMiddleware, isAdmin, getSingleUsers);
router.put('/update-user',authMiddleware, updateUsers);
router.put('/update-profilePic', authMiddleware, userUpload.single('image'), updateProfilePic)
router.put('/verify-account/:code', finalVerify)
router.delete('/delete/:id',authMiddleware, isAdmin, deleteUsers);


export default router
