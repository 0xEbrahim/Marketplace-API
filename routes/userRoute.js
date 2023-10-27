import express from 'express';
import {deleteUsers, updateUsers, getAllUsers, getSingleUsers} from '../controllers/userController.js'
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/',authMiddleware, isAdmin, getAllUsers);
router.get('/:id',authMiddleware, isAdmin, getSingleUsers);
router.put('/update-user',authMiddleware, updateUsers);
router.delete('/delete/:id',authMiddleware, isAdmin, deleteUsers);
export default router
