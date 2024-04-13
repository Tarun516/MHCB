// routes/authRoutes.js
import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// Signup route
router.post(
  "/api/v1/register",
  upload.fields([
    {
      name: "coverimage",
      maxCount: 1,
    },
  ]),
  registerUser
);

// Login route
// router.post("/api/v1/login", loginUser);

export default router;
