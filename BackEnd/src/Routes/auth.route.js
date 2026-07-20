const express = require("express");

const authRouter = express.Router();

const jwt = require("jsonwebtoken");

const userModel = require("../models/user.model");

const crypto = require("crypto");

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({ email });

  const hash = crypto.createHash("md5").update(password).digest("hex");

  if (isUserAlreadyExists) {
    return res.status(409).json({
      message: "User Already Exists",
    });
  }
  const user = await userModel.create({
    name,
    email,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );
  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "User Created Successfully",
    user,
    token,
  });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User Not Found With This Email" });
  }

  const isPasswordCorrect =
    user.password === crypto.createHash("md5").update(password).digest("hex");

  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "Invalid Password" }); // Fixed to standard 401 status code
  }

  // 🚨 FIX: Generate the token for logins
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  // 🚨 FIX: Send token to the browser cookie jar
  res.cookie("jwt_token", token);

  res.status(200).json({
    message: "User Logged In",
    token, // Return token inside JSON payload response structure
  });
});

module.exports = authRouter;
