import express from "express";
import productController from "../controllers/product"
import upload from "../helper/multer";
import { verifyTokenAndAuthorization ,verifyToken,verifyTokenAndAdmin} from "../middleware/verifyToken";

const productRouter = express.Router()

productRouter.post("/create", verifyTokenAndAdmin,upload.single("img"), productController.createProduct)
productRouter.get("/getAllProduct",productController.getAll)
productRouter.put("/update/:_id",verifyTokenAndAdmin,productController.updateProduct)
productRouter.get("/getProduct/:_id",productController.getSingleProduct)
productRouter.delete("/delete/:_id",verifyTokenAndAdmin,productController.delete)

export default productRouter