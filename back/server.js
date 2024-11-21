
import express from "express";
import signUpRouter from "./router/signUp_router.js";
import loginRouter from "./router/login_router.js";
import dashBoardRouter from "./router/dash_board_router.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";


const app = express();
// const hostname = "10.10.1.93";

dotenv.config();


app.use(express.json());
app.use(cookieParser());

app.use("/sign-up", signUpRouter);
app.use("/log-in", loginRouter);
app.use("/user", dashBoardRouter);

const port = process.env.PORT;

mongoose.connect('mongodb://127.0.0.1:27017/bank?replicaSet=rs0')
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));



app.listen(port, function () {
  console.log(`Server running at http://:localhost:${port}/`);
});
