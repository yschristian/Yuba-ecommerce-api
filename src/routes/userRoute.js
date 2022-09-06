import express from "express";
import userController from "../controllers/user";
import { verifyTokenAndAuthorization, verifyTokenAndAdmin } from "../middleware/verifyToken";

const userRouter = express.Router()

userRouter.post("/register" , userController.register)
userRouter.post("/login",userController.login)
userRouter.put("/update/:_id",verifyTokenAndAuthorization,userController.updateUser)
userRouter.get("/getAllUser",userController.getAll)
userRouter.get("/findUser/:_id",userController.getSingleUser)
userRouter.delete("/delete/:_id",userController.delete)
userRouter.get("/stats", userController.stats)

export default userRouter
