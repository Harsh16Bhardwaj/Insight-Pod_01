import { Router } from "express";
const podcastRouter = Router();
import isAuthenticated from "../middlewares/auth.js";
import { createPodcast, getPodcasts, getPodcastsByPreference } from "../controllers/podcast.controller.js";

podcastRouter.post("/create", createPodcast);
podcastRouter.get("/", getPodcasts);
podcastRouter.get("/user",isAuthenticated, getPodcastsByPreference);
export default podcastRouter;