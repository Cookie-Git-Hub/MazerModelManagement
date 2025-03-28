import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select(
      "documents upcomingContracts agencies"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const documentsCount = user.documents.length;
    const now = new Date();
    const upcomingContracts = user.upcomingContracts.filter((e) => {
      const contractDate = new Date(e.date);
      return contractDate > now;
    });
    const upcomingCount = upcomingContracts.length;

    const agenciesCount = user.agencies?.length || 0;

    const recentDocuments = user.documents.slice(-3).reverse();


    upcomingContracts.sort((a, b) => new Date(a.date) - new Date(b.date));
    const upcomingSchedule = upcomingContracts.slice(0, 3);

    const dashboardData = {
      stats: {
        documents: documentsCount,
        upcoming: upcomingCount,
        agencies: agenciesCount,
      },
      recentDocuments,
      upcomingSchedule,
    };

    res.json(dashboardData);
  } catch (error) {
    console.error("Error in GET /dashboard:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
