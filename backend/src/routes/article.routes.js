import { Router } from "express";
import { getAllArticles } from "../controllers/article.controller.js";

const router = Router();

// Route to get all videos
router.get("/get-articles", getAllArticles);

export default router;
