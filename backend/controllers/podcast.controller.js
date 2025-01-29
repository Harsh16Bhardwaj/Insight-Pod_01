import PodcastModel from "../models/podcast.model.js";
import UserModel from "../models/user.model.js";

export const createPodcast = async (req, res) => {
  try {
    const {
      _id,
      title,
      tags,
      description,
      category,
      url,
      platform,
      duration,
      transcript,
      summary,
    } = req.body;

    // Validate required fields
    if (!title || !url) {
      return res.status(400).json({
        success: false,
        message: "Title and URL are required fields.",
      });
    }

    const podcast = await PodcastModel.create({
      _id: _id || new mongoose.Types.ObjectId().toString(), // Ensure unique id if not provided
      title,
      tags,
      description,
      category,
      url,
      platform,
      duration,
      transcript,
      summary,
    });

    res.status(201).json({
      success: true,
      message: "Podcast created successfully.",
      podcast,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error. Could not create podcast.",
      error: error.message,
    });
  }
};

export const getPodcasts = async (req, res) => {
  try {
    const podcasts = await PodcastModel.find();
    res.status(200).json({
      success: true,
      message: "Podcasts retrieved successfully.",
      podcasts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error. Could not retrieve podcasts.",
      error: error.message,
    });
  }
};

export const getPodcastsByPreference = async (req, res) => {
  const { UserId } = req.user;
  try {
    // Find the user and their preferences
    const user = await UserModel.findById(UserId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { preferences } = user;

    // Fetch podcasts that match the user's preferences (either by category or tags)
    const podcasts = await PodcastModel.find({
      $or: [
        { category: { $in: preferences } }, // Match by category
        { tags: { $in: preferences } }, // Match by tags
      ],
    });

    if (podcasts.length === 0) {
      return res
        .status(404)
        .json({ message: "No podcasts found matching your preferences" });
    }

    res.status(200).json({ podcasts });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching podcasts" });
  }
};

export const getPodcastsBySearch = async (req, res) => {
  const { searchQuery } = req.query;  // Search query passed from the client (category or tags)
  
  try {
    // Initialize search condition for the query
    let searchCondition = {
      $or: [],
    };

    if (searchQuery) {
      // If a searchQuery is provided, we refine the search based on the query
      searchCondition.$or.push({ category: { $regex: searchQuery, $options: 'i' } });
      searchCondition.$or.push({ tags: { $regex: searchQuery, $options: 'i' } });
    }

    // Fetch podcasts that match the search condition (category, tags, or searchQuery)
    const podcasts = await PodcastModel.find(searchCondition);

    if (podcasts.length === 0) {
      return res.status(404).json({ message: "No podcasts found matching your search criteria" });
    }

    res.status(200).json({ podcasts });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching podcasts" });
  }
};
