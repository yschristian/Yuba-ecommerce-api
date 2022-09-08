import express from "express";
import orderController from "../controllers/order"
import { verifyToken, verifyTokenAndAuthorization,verifyTokenAndAdmin } from "../middleware/verifyToken";


const orderRouter = express.Router()

orderRouter.post("/create",verifyToken,orderController.createOrder)
orderRouter.get("/getAllOrder",verifyTokenAndAdmin,orderController.getAll)
orderRouter.get("/income",verifyTokenAndAdmin,orderController.income)
orderRouter.put("/update/:_id",verifyTokenAndAdmin,orderController.updateOrder)
orderRouter.get("/getOrder/:userId",verifyTokenAndAuthorization,orderController.getSingleOrder)
orderRouter.delete("/delete/:_id",verifyTokenAndAdmin,orderController.delete)

export default orderRouter