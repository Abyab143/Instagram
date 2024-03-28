import { Coment } from "../Model/Coments.js";
import express from "express";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const newComent = new Coment(req.body);
    await newComent.save();
    return res
      .status(200)
      .json({ status: true, message: "comment added successfullY" });
  } catch (err) {
    return res.status(200).json({
      messgae: "Coment is not added ",
      Error: err.messgae,
    });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await Coment.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ status: true, message: "Coment delete sucessfully" });
  } catch (err) {
    return res.status(200).send(err.message);
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    await Coment.findByIdAndUpdate(req.params.id, req.body);
    return res
      .status(200)
      .json({ status: true, message: "Coment Updated  sucessfully" });
  } catch (err) {
    return res.status(200).send(err.message);
  }
});

//get allcoments of any post
router.get("/get/:id", async (req, res) => {
  try {
    const data = await Coment.find({ postid: req.params.id });

    return res.status(200).json({
      message: "Coment Get sucessfully",
      Coment: data,
    });
  } catch (err) {
    return res.status(200).send(err.message);
  }
});

export default router;
