const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT;

const mongoose = require("mongoose");

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to the database");
});

const body_parser = require("body-parser");
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

const posts_routes = require("./routes/posts_routes");
app.use("/", posts_routes);

app.listen(port, () => {
  console.log("app is running!");
});
