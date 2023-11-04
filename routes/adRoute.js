import express from "express";
const router = express.Router();
import {createAd, deleteAd, editAd, getAllAds, getSingleAd} from "../controllers/adController.js"
import { authMiddleware , isAdmin} from "../middlewares/authMiddleware.js";
import { propUplload } from "../middlewares/multer.js";

router.post('/create',authMiddleware, propUplload.array('image'), createAd)
router.get('/',getAllAds)
router.get('/:id', getSingleAd);
router.delete('/delete/:id', deleteAd);
router.put('/edit/:id', authMiddleware, propUplload.array('image') ,editAd);


export default router