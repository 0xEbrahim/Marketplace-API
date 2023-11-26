import express from 'express'
const router = express.Router()
import { createAd, deleteAd, editAd, getAllAds, getSingleAd } from '../controllers/adController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { propUplload } from '../middlewares/multer.js'
import { putWatermark } from '../middlewares/waterMark.js'


router.post('/create', authMiddleware, propUplload.array('image'), putWatermark, createAd)
router.get('/', getAllAds)
router.get('/:id', getSingleAd)
router.delete('/delete/:id', deleteAd)
router.put('/edit/:id', authMiddleware, propUplload.array('image'), putWatermark, editAd)


export default router
