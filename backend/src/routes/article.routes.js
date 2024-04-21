import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getAllArticles,
  createArticle,
  deleteArticleById,
  updateArticleById,
} from "../controllers/article.controller.js";

const router = Router();

// Route to get all videos
router.get("/get-articles", getAllArticles);

// Route to create a new video
router.post("/upload-article", verifyJWT, createArticle);

// Route to delete a video by ID
router.delete("/delete-article", verifyJWT, deleteArticleById);

// Route to update a video by ID
router.put("/update-article", verifyJWT, updateArticleById);

export default router;
