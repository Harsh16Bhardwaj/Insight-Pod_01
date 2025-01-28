import mongoose from "mongoose";
const podcastSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    tags: [String],
    description: { type: String },
    category: { type: String },
    url: { type: String, required: true },
    platform: { type: String }, // Example: YouTube, Spotify
    duration: { type: Number }, // Duration in seconds
    summary: { type: String },
    transcript: { type: String},
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
const PodcastModel = mongoose.model("Podcast", podcastSchema);
export default PodcastModel;
