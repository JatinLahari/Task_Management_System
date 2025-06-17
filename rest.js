import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";   // used cookie-parser
import dotenv from "dotenv";                // used dotenv
import userRouter from "./routes/user.route.js";
import taskRouter from "./routes/task.route.js";
import "./model/association.js";
dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/task", taskRouter);
app.listen(process.env.PORT,()=>{
  console.log("server started...");
});