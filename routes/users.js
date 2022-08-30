import express from "express";
import User from "../models/user.js";
var router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await User.find();
    res.json(result);
  } catch (error) {
    res.json({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await User.findById(req.params.id);
    res.json(result);
    next();
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await User.create(req.body);
    res.status(200).json(result);
    next();
  } catch (error) {
    res.json({ message: error });
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const result = await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(result);
    next();
  } catch (error) {
    res.status(500).json({ "User data not updated! ": message.error });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(result);
    next();
  } catch (error) {
    res.status(500).json({ "User data not deleted! ": message.error });
  }
});

export default router;
