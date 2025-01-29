import { Router } from "express";
const podcastRouter = Router();
import isAuthenticated from "../middlewares/auth.js";
import {
  createPodcast,
  getPodcastById,
  getPodcasts,
  getPodcastsByPreference,
  getPodcastsBySearch,
} from "../controllers/podcast.controller.js";

podcastRouter.post("/create", createPodcast);
podcastRouter.get("/byPref", isAuthenticated, getPodcastsByPreference);
podcastRouter.get("/search", getPodcastsBySearch);
podcastRouter.get("/:id", getPodcastById);
podcastRouter.get("/", getPodcasts);

export default podcastRouter;
