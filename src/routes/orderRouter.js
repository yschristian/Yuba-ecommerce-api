import express from "express";
import orderController from "../controllers/order"

const orderRouter = express.Router()

orderRouter.post("/create",orderController.createOrder)
orderRouter.get("/getAllorder",orderController.getAll)
orderRouter.get("/income",orderController.income)

export default orderRouter