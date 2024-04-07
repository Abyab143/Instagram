import express from "express";
import { User } from "../Model/user.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.put("/update/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (!user) {
      return res.status(404).send("User not found!");
    }

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    await User.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
      status: true,
      message: "User data updated successfully!",
    });
  } catch (err) {
    console.error("User Updation failed:", err);
    return res
      .status(500)
      .json({ message: "User Updation failed", error: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (!user) {
      return res.status(404).send("User not found!");
    }

    await User.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      status: true,
      message: "User delete successfully!",
    });
  } catch (err) {
    console.error("User delete failed:", err);
    return res
      .status(500)
      .json({ message: "User delete failed", error: err.message });
  }
});

//get all users
router.get("/users", async (req, res) => {
  const user = await User.find();
  if (!user) {
    return res.status(200).send("User not found!");
  }
  return res.status(200).json({
    user: user,
  });
});

//get user by name
router.get("/user/:name", async (req, res) => {
  const user = await User.find({ name: req.params.name });
  if (!user) {
    return res.status(200).send("User not found!");
  }
  return res.status(200).json({
    user: user,
  });
});

//get user by id
router.get("/users/:id", async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    return res.status(200).send("User not found!");
  }
  return res.status(200).json({
    user: user,
  });
});

//get user by name
router.get("/user/:name", async (req, res) => {
  const user = await User.find({ name: req.params.name });
  if (!user) {
    return res.status(200).send("User not found!");
  }
  return res.status(200).json({
    user: user,
  });
});

//follow user
router.put("/follow/:userid/:curuser", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userid });
    const curentuser = await User.findOne({ _id: req.params.curuser });
    let isfollowed = false;
    user.followers.map((item) => {
      if (item == req.params.curuser) {
        isfollowed = true;
      }
    });
    if (isfollowed) {
      const res1 = await User.updateOne(
        { _id: req.params.userid },
        { $pull: { followers: req.params.curuser } }
      );
      const res2 = await User.updateOne(
        { _id: req.params.curuser },
        { $pull: { following: req.params.userid } }
      );
      return res
        .status(200)
        .json({ status: false, message: "user unfollowed successfully",
       });
    } else {
      const res1 = await User.updateOne(
        { _id: req.params.userid },
        { $push: { followers: req.params.curuser } }
      );
      const res2 = await User.updateOne(
        { _id: req.params.curuser },
        { $push: { following: req.params.userid } }
      );
      return res
        .status(200)
        .json({ status: true, message: "user followed successfully" });
    }
  } catch (err) {
    return res.status(200).json({
      message: "user folllow failed",
      Error: err.message,
    });
  }
});
export default router;
