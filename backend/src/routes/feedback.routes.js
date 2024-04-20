import { Router } from "express";
import { addFeedback } from "../controllers/feedback.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", verifyJWT, addFeedback);

export default router;
