import express from "express";
import {
  handleVideoResourceRequest,
  handleArticleResourceRequest,
} from "../controllers/webhook.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", verifyJWT, (req, res) => {
  // Extract necessary information from the request
  const { queryResult } = req.body;
  const { intent, parameters } = queryResult;
  console.log(parameters);
  // Route request based on intent
  switch (intent.displayName) {
    case "Video Resource Request Intent":
      handleVideoResourceRequest(parameters)
        .then((response) => res.json(response))
        .catch((error) =>
          res.status(500).json({ message: "Internal Server Error" })
        );
      break;
    case "Article Resource Request Intent":
      handleArticleResourceRequest(parameters)
        .then((response) => res.json(response))
        .catch((error) =>
          res.status(500).json({ message: "Internal Server Error" })
        );
      break;
    default:
      // Handle unknown intents
      res.status(400).json({ message: "Unknown intent" });
      break;
  }
});

export default router;
