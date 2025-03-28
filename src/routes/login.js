import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Session from "../models/Session.js";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const SESSION_LIFETIME = 60 * 60 * 1000; // 1 hour

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const session = new Session({
      userId: user._id,
      token,
      expiresAt: new Date(Date.now() + SESSION_LIFETIME),
    });
    await session.save();

    res.json({ token });
  } catch (error) {
    console.error("Ошибка входа:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;