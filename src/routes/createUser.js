import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

router.post("/createUser", async (req, res) => {
  try {
    const { email, password, name, birthday, phone, location, height, bust, waist, hips, footSize, avatar } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email: email,
      password: hashedPassword,
      name: name || "No Name",
      birthday: birthday,
      phone: phone || "",
      location: location,
      measurements: {
        height: height,
        bust: bust,
        waist: waist,
        hips: hips,
        footSize: footSize,
      },
      avatar: avatar,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Create user error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
