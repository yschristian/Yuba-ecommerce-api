import express  from "express";
import dotenv from 'dotenv';
import connectDb from "./src/database/dbConnect"
import userRouter from "./src/routes/userRoute"
import productRouter from "./src/routes/productRouter"
import orderRouter from "./src/routes/orderRouter"
import cartRouter from "./src/routes/cartRouter"
import stripeRouter from "./src/routes/stripeRouter";
import cors from "cors"

dotenv.config()

const app = express();
app.use(cors({origin: "*"}));

const port = process.env.PORT;

app.use(express.json());
app.use("/api/user",userRouter);
app.use("/api/product",productRouter);
app.use("/api/order",orderRouter);
app.use("/api/cart",cartRouter)
app.use("/api/checkout",stripeRouter)



connectDb()
app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`)
})