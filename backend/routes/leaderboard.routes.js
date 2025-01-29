import { Router } from "express";
const leaderboardRouter = Router();
import isAuthenticated from "../middlewares/auth.js";
import {
  getLeaderboard,
  syncLeaderboardWithUsers,
  updateLeaderboardDaily,
} from "../controllers/leaderboard.controller.js";
leaderboardRouter.get("/", getLeaderboard);
leaderboardRouter.post("/update", updateLeaderboardDaily);
leaderboardRouter.post("/sync", syncLeaderboardWithUsers);
export default leaderboardRouter;
