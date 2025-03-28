import express from "express";
import Session from "../models/Session.js";

const router = express.Router();

router.post("/logout", async (req, res) => {
  try {
    const { token } = req.body;

    await Session.deleteOne({ token });
    res.json({ message: "Logged out" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;