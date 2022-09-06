import express from "express";
import paymentController from "../controllers/stripe"

const stripeRouter = express()

stripeRouter.post("/payment",paymentController.payment)

export default stripeRouter