import mongoose, { Types, Schema } from "mongoose";
const ObjectId = Types.ObjectId;
const leaderboardSchema = new Schema({
  _id: { type: ObjectId, required: true },
  userId: { type: ObjectId, ref: "User", required: true },
  points: { type: Number, default: 0 },
  rank: { type: Number },
  updatedAt: { type: Date, default: Date.now },
});
const LeaderboardModel = mongoose.model("LeaderBoard", leaderboardSchema);
export default LeaderboardModel;
