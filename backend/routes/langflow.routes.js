import { Router } from "express";
const langflowRouter = Router();
import isAuthenticated from "../middlewares/auth.js";
import { fetchFact, fetchQuiz, fetchSummary } from "../controllers/langflow.controller.js";

langflowRouter.post("/facts",  fetchFact);
langflowRouter.post("/quiz",  fetchQuiz);
langflowRouter.post("/summary",  fetchSummary);
export default langflowRouter;