import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import loginRouter from "./routes/login.js";
import logoutRouter from "./routes/logout.js";
import createUserRouter from "./routes/createUser.js";
import profileRouter from "./routes/profile.js";
import dashboardRouter from "./routes/dashboard.js";

const PORT = 5000;

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/ModelHub")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use("/api", loginRouter);
app.use("/api", logoutRouter);
app.use("/api", createUserRouter);
app.use("/api", profileRouter);
app.use("/api", dashboardRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
