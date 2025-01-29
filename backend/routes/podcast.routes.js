import { Router } from "express";
const podcastRouter = Router();
import isAuthenticated from "../middlewares/auth.js";
import { createPodcast, getPodcasts, getPodcastsByPreference } from "../controllers/podcast.controller.js";

podcastRouter.post("/create", createPodcast);
podcastRouter.get("/byPref",isAuthenticated, getPodcastsByPreference);
podcastRouter.get("/", getPodcasts);
export default podcastRouter;