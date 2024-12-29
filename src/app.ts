import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT;
import mongoose from "mongoose";

mongoose.connect(process.env.DB_CONNECT);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to the database");
});

import body_parser from "body-parser";
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

import posts_routes from "./routes/posts_routes";
app.use("/", posts_routes);

import comments_routes from "./routes/comments_routes";
app.use("/", comments_routes);

app.listen(port, () => {
  console.log("app is running!");
});
