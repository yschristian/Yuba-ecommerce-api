import express from "express";
import productController from "../controllers/product"

const productRouter = express.Router()

productRouter.post("/create",productController.createProduct)
productRouter.get("/getAllProduct",productController.getAll)

export default productRouter