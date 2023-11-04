import express from 'express';
import {deleteUsers, updateUsers, getAllUsers, getSingleUsers, verifyAccount, finalVerify, yourProfile, userAds, addToFav} from '../controllers/userController.js'
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';
import {imageUpload} from '../config/imageUpload.js'
import { userUpload } from '../middlewares/multer.js';
const router = express.Router();

router.get('/',authMiddleware, isAdmin, getAllUsers);
router.get('/your-ads', authMiddleware, userAds)
router.get('/verify-account',authMiddleware, verifyAccount)
router.get("/your-profile", authMiddleware, yourProfile)
router.get('/:id',authMiddleware, isAdmin, getSingleUsers);
router.put('/add-to-favourite/:id',authMiddleware, addToFav);
router.put('/update-user',authMiddleware, userUpload.single('image'), updateUsers);
router.put('/verify-account/:code', finalVerify)
router.delete('/delete/:id',authMiddleware, isAdmin, deleteUsers);


export default router
