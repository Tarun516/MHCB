
import { Resource } from "../models/resouce.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const getAllArticles = asyncHandler(async (req, res) => {
  const articles = await Resource.find({ type: "Article" }).populate("user");
  res.setHeader("Content-Type", "application/json"); // Set Content-Type header
  return res.status(200).json(articles);
});

export { getAllArticles };
