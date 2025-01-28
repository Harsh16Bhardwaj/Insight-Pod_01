import mongoose from "mongoose";
import UserModel from "../models/user.model.js";
import LeaderboardModel from "../models/leaderboard.model.js";

/**
 * Fetch the current leaderboard sorted by points
 */
export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await LeaderboardModel.find()
      .populate("userId", "name email")
      .sort({ points: -1 }) // Sort by points in descending order
      .exec();

    res.status(200).json({ leaderboard });
  } catch (error) {
    console.error("Error fetching leaderboard:", error.message);
    res.status(500).json({ error: "Error fetching leaderboard" });
  }
};

/**
 * Update leaderboard ranks based on user points, run daily via cron
 */
export const updateLeaderboardDaily = async (req, res) => {
  try {
    const leaderboardData = await LeaderboardModel.find().sort({ points: -1 });

    // Update ranks based on sorted points
    await Promise.all(
      leaderboardData.map((entry, index) => {
        entry.rank = index + 1;
        return entry.save();
      })
    );

    res.status(200).json({ message: "Leaderboard updated successfully" });
  } catch (error) {
    console.error("Error updating leaderboard:", error.message);
    res.status(500).json({ error: "Error updating leaderboard" });
  }
};

/**
 * Sync leaderboard with user points (for daily maintenance)
 */
export const syncLeaderboardWithUsers = async (req, res) => {
  try {
    const users = await UserModel.find();

    const leaderboardUpdates = users.map(user => ({
      updateOne: {
        filter: { userId: user._id },
        update: { points: user.totalPoints, updatedAt: new Date() },
        upsert: true,
      },
    }));

    await LeaderboardModel.bulkWrite(leaderboardUpdates);

    res.status(200).json({ message: "Leaderboard synced successfully" });
  } catch (error) {
    console.error("Error syncing leaderboard:", error.message);
    res.status(500).json({ error: "Error syncing leaderboard" });
  }
};
    