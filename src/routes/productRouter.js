import express from "express";
import productController from "../controllers/product"
import upload from "../helper/multer";
import { verifyTokenAndAuthorization ,verifyToken} from "../middleware/verifyToken";

const productRouter = express.Router()

productRouter.post("/create", upload.single("img"), productController.createProduct)
productRouter.get("/getAllProduct",productController.getAll)
productRouter.put("/update/:_id",verifyTokenAndAuthorization,productController.updateProduct)
productRouter.get("/getProduct/:_id",productController.getSingleProduct)
productRouter.delete("/delete/:_id",productController.delete)

export default productRouter