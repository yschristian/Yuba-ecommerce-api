import express from "express";
import cartController from "../controllers/cart"
import { verifyToken, verifyTokenAndAuthorization,verifyTokenAndAdmin } from "../middleware/verifyToken";
const cartRouter = express.Router()

cartRouter.post("/create",verifyToken,cartController.createCart)
cartRouter.get("/getAllCart",verifyTokenAndAdmin,cartController.getAll)
cartRouter.get("/getCart/:userId",verifyTokenAndAuthorization,cartController.getSingleCart)
cartRouter.put("/update/:_id",verifyTokenAndAuthorization,cartController.updateCart)
cartRouter.delete("/delete/:_id",verifyTokenAndAuthorization,cartController.delete)



export default cartRouter