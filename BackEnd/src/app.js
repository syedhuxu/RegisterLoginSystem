const express = require("express");

const authRouter = require("./Routes/auth.route");

const cookieParser = require("cookie-parser");

const path = require("path");

const cors = require("cors");

const app = express();

app.use(express.static("./public"));

app.use(express.json());

app.use(cookieParser());

app.use(cors());

app.use("/api/auth", authRouter);

app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/index.html"));
});

module.exports = app;
