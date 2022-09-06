import express from "express";
import cartController from "../controllers/cart"

const cartRouter = express.Router()

cartRouter.post("/create",cartController.createCart)
cartRouter.get("/getAllCart",cartController.getAll)
cartRouter.get("/getCart/:userId",cartController.getSingleCart)
cartRouter.put("/update/:_id",cartController.updateCart)
cartRouter.delete("/delete/:_id",cartController.delete)



export default cartRouter