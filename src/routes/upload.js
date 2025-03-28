import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/upload", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;

    const uploadedUrl = "";
    const docTitle = "";

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.documents.push({
      title: docTitle,
      fileUrl: uploadedUrl,
      date: new Date(),
    });

    await user.save();

    res.json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
