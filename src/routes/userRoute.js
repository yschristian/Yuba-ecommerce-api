import express from "express";
import userController from "../controllers/user";
import { verifyTokenAndAuthorization, verifyTokenAndAdmin,verifyToken } from "../middleware/verifyToken";

const userRouter = express.Router()

userRouter.post("/register" , userController.register)
userRouter.post("/login",userController.login)
userRouter.put("/update/:_id",verifyTokenAndAuthorization,userController.updateUser)
userRouter.get("/getAllUser",verifyTokenAndAdmin,userController.getAll)
userRouter.get("/findUser/:_id",verifyTokenAndAdmin,userController.getSingleUser)
userRouter.delete("/delete/:_id",verifyTokenAndAuthorization,userController.delete)
userRouter.get("/stats",verifyTokenAndAdmin, userController.stats)

export default userRouter
