import express from "express"
import { upload } from "../config/multer.config"
import { deleteProduct, getAllProduct, getSingleProduct, createProduct, updateProduct } from "../controllers/product.controller"

const router = express.Router()

router.get("/", getAllProduct)
router.get('/:slug', getSingleProduct)
router.post("/", upload.array('files', 10), createProduct)
router.put("/:id", upload.array('files', 10), updateProduct)
router.delete('/:id', deleteProduct)

export default router