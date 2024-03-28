import express from "express";
import { Post } from "../Model/Post.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const newpost = new Post(req.body);
    await newpost.save();
    return res.status(200).json({
      message: "Post created Sucessfully",
      post: newpost,
    });
  } catch (err) {
    return res.status(200).json({
      message: "Post creation failed",
      Error: err.message,
    });
  }
});

//update post

router.put("/update/:id", async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).json({
      message: "Post updation Sucessfully",
    });
  } catch (err) {
    return res.status(200).json({
      message: "Post updation failed",
      Error: err.message,
    });
  }
});

//delete post by user

router.delete("/delete/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "Post Delete Sucessfully",
    });
  } catch (err) {
    return res.status(200).json({
      message: "Post deletion failed",
      Error: err.message,
    });
  }
});

//get all post
router.get("/allpost", async (req, res) => {
  try {
    const post = await Post.find();
    return res.status(200).json({
      Message: "Post get sucessfully",
      Post: post,
    });
  } catch (err) {
    return res.status(200).json({
      message: "Post not found",
      Error: err.message,
    });
  }
});

//get post by id
router.get("/getpost/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(200).json({
        message: "Post not found",
      });
    }
    return res.status(200).json({
      message: "Post found sucessfully",
      Post: post,
    });
  } catch (err) {
    return res.status(200).json({
      message: "Post not found",
      Error: err.message,
    });
  }
});

//post liked by user
router.put("/like/:postid/:userid", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postid);
    let islike = false;
    post.likes.map((item) => {
      if (item == req.params.userid) {
        islike = true;
      }
    });

    if (islike) {
      const unlike = await Post.updateOne(
        { _id: req.params.postid },
        { $pull: { likes: req.params.userid } }
      );
      return res.status(200).json({
        message: "Post unliked sucessfully",
      });
    }
    const like = await Post.updateOne(
      { _id: req.params.postid },
      { $push: { likes: req.params.userid } }
    );
    return res.status(200).json({
      message: "Post liked sucessfully",
    });
  } catch (err) {
    return res.status(200).json({
      Error: err.message,
      message: "Error in liking the post",
    });
  }
});

//get allpost of any user
router.get("/user/:id", async (req, res) => {
  try {
    const post = await Post.find({ userid: req.params.id });
    if (!post) {
      return res.status(200).json({
        message: "Post not found",
      });
    }
    return res.status(200).json({
      message: "User Post found sucessfullly",
      post: post,
    });
  } catch (err) {
    return res.status(200).json({
      message: "post not found",
      Error: err.message,
    });
  }
});

export default router;
