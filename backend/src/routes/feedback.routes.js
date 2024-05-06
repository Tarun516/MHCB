import { Router } from "express";
import { addFeedback } from "../controllers/feedback.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/add-feedback",verifyJWT, addFeedback);

export default router;
