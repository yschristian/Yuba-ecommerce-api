import express  from "express";
import dotenv from 'dotenv';
import connectDb from "./database/dbConnect"
import userRouter from "./routes/userRoute"
import productRouter from "./routes/productRouter"
import orderRouter from "./routes/orderRouter"
import cartRouter from "./routes/cartRouter"
import stripeRouter from "./routes/stripeRouter";
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