import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authroute from "./Route/auth.js";
import userroute from "./Route/User.js";
import postroute from "./Route/post.js";
import comentroute from "./Route/comment.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//mongodb database conections
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "Instagram",
  })
  .then(() => {
    console.log("Database is conected sucessfully");
  });

//user routes
app.use("/api/user", authroute);
app.use("/api/user", userroute);
app.use("/api/post", postroute);
app.use("/api/post/coment", comentroute);

app.listen(process.env.PORT, () => {
  console.log("App is run on port " + process.env.PORT);
});
