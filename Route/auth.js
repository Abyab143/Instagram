import { User } from "../Model/user.js";
import bcrypt from "bcrypt";
import express from "express";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(200).json({
        message: "Email is already registered",
      });
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashPassword;
    const newuser = new User(req.body);
    await newuser.save();
    return res.status(200).json({
      message: "User registration Sucessful",
      user: newuser,
    });
  } catch (err) {
    return res.status(200).json({
      message: "User registration failed",
      error: err.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).json({
        message: "Invalid Email id",
      });
    }
    const password =await bcrypt.compare(req.body.password, user.password);
    if (!password) {
      return res.status(200).json({
        message: "Invalid password",
      });
    }
    return res.status(200).json({
      message: "Login Sucessful",
      user: user,
    });
  } catch (err) {
    return res.status(200).json({
      message: "Login failed",
      Eroor: err.message,
    });
  }
});

export default router;
