import express from "express";
// var express = require("express");
import * as dotenv from "dotenv";
dotenv.config();
import { connection } from "./config/db";
import { authRouter } from "./routes/auth.route";
import cors from "cors";
import { authenticate } from "./middleware/auth.middleware";
import { postRouter } from "./routes/post.route";
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

const port: string | number = process.env.port || 8080;

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
  })
);
app.use(cookieParser());
app.use("/auth", authRouter);
// app.use(authenticate);
app.use("/post", postRouter);
app.listen(port, async () => {
  try {
    await connection();
    console.log("MongoDB connected!");

    console.log(`Server listening on port ${port}`);
  } catch (err) {
    console.log(err);
  }
});
