import express  from "express";
import dotenv from 'dotenv';
import connectDb from "./database/dbConnect"
import userRouter from "./routes/userRoute"
import productRouter from "./routes/productRouter"
import orderRouter from "./routes/orderRouter"

dotenv.config()

const app = express();

const port = process.env.port;

app.use(express.json());
app.use("/api/user",userRouter);
app.use("/api/product",productRouter);
app.use("/api/order",orderRouter);



connectDb()
app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`)
})