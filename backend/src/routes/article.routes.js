import { Router } from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import * as articleController from "../controllers/article.controller.js";

const router = Router();

// Route to get all videos
router.get("/", articleController.getAllVideos);

// Route to create a new video
router.post("/upload-article", verifyJWT, articleController.createArticle);

// Route to delete a video by ID
router.delete(
  "/delete-article",
  verifyJWT,
  articleController.deleteArticleById
);

// Route to update a video by ID
router.put("/update-article", verifyJWT, articleController.updateArticleById);

export default router;
