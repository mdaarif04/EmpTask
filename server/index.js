import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import cookieParser from "cookie-parser";
import { connectDB } from "./DB/index.js";

const app = express()
app.use(express.json());
dotenv.config({
    path:'./env'
});

app.use(
  cors()
);
connectDB()
app.use(express.static("public"))
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import emprouter from "./routes/emp.routes.js";

app.use("/api", userRouter);
app.use("/api", emprouter);



const PORT = 7000 || process.env.PORT

app.listen(PORT, () =>{
    console.log(`Server is running on PORT ${PORT}`)
})
