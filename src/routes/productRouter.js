import express from "express";
import productController from "../controllers/product"

const productRouter = express.Router()

productRouter.post("/create",productController.createProduct)
productRouter.get("/getAllProduct",productController.getAll)
productRouter.put("/update/:_id",productController.updateProduct)
productRouter.get("/getProduct/:_id",productController.getSingleProduct)
productRouter.delete("/delete/:_id",productController.delete)

export default productRouter