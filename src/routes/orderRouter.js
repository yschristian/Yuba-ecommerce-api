import express from "express";
import orderController from "../controllers/order"

const orderRouter = express.Router()

orderRouter.post("/create",orderController.createOrder)
orderRouter.get("/getAllOrder",orderController.getAll)
orderRouter.get("/income",orderController.income)
orderRouter.put("/update/:_id",orderController.updateOrder)
orderRouter.get("/getOrder/:userId",orderController.getSingleOrder)
orderRouter.delete("/delete/:_id",orderController.delete)

export default orderRouter