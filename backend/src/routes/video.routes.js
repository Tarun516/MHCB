import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import * as videoController from "../controllers/video.controller.js";

const router = Router();

// Route to get all videos
router.get("/get-videos", videoController.getAllVideos);

// Route to create a new video
router.post("/upload-vid", verifyJWT, videoController.createVideo);

// Route to delete a video by ID
router.delete("/delete-vid", verifyJWT, videoController.deleteVideoById);

// Route to update a video by ID
router.put("/update-vid", verifyJWT, videoController.updateVideoById);

export default router;
