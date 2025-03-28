import jwt from "jsonwebtoken";
import Session from "../models/Session.js";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No auth token" });
    }
    const token = authHeader.split(" ")[1];

    const session = await Session.findOne({ token });
    if (!session) {
      return res.status(401).json({ message: "Invalid token (no session)" });
    }

    if (session.expiresAt < new Date()) {
      await Session.deleteOne({ _id: session._id });
      return res.status(401).json({ message: "Session expired" });
    }

    try {
      jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid token signature" });
    }

    req.userId = session.userId;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export default authMiddleware;
