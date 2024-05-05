import { Resource } from "../models/resouce.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Controller to fetch all videos
const getAllVideos = asyncHandler(async (req, res) => {
  const videos = await Resource.find({ type: "Video" }).populate("user");
  return res.status(200).json(videos);
});

export { getAllVideos };
