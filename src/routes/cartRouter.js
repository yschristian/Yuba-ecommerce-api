import express from "express";
import cartController from "../controllers/cart"

const cartRouter = express.Router()

cartRouter.post("/create",cartController.createCart)
cartRouter.get("/getAllProduct",cartController.getAll)
cartRouter.get("/getCart/:userId",cartController.getSingleCart)


export default cartRouter