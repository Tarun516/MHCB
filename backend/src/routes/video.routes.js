import { Router } from "express";
import * as videoController from "../controllers/video.controller.js";

const router = Router();

// Route to get all videos
router.get("/get-videos", videoController.getAllVideos);

export default router;
