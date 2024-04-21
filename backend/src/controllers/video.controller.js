import { Resource } from "../models/resouce.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Controller to fetch all videos
const getAllVideos = asyncHandler(async (req, res) => {
  const videos = await Resource.find({ type: "Video" }).populate("user");
  return res.status(200).json(videos);
});

// Controller to create a new video
const createVideo = asyncHandler(async (req, res) => {
  // Handle file upload and upload to Cloudinary
  if (!req.file) {
    throw new ApiError(400, "Please upload a video file");
  }

  const video = await uploadOnCloudinary(req.files.path);
  if (!video) {
    throw new ApiError(500, "Failed to upload video to Cloudinary");
  }

  // Create a new resource entry for the video
  const newVideo = new Resource({
    user: req.user._id,
    type: "Video",
    title: req.body.title,
    url: video.secure_url,
    author: req.body.author,
    image: req.body.image,
    content: req.body.content,
  });

  await newVideo.save();
  return res
    .status(201)
    .json(ApiResponse.success("Video created successfully", newVideo));
});

// Controller to delete a video by ID
const deleteVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const video = await Resource.findById(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  // Check if the logged-in user is the owner of the video
  if (video.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this video");
  }

  await Resource.findByIdAndDelete(videoId);
  return res
    .status(200)
    .json(ApiResponse.success("Video deleted successfully"));
});

// Controller to update a video by ID
const updateVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const video = await Resource.findById(videoId);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  // Check if the logged-in user is the owner of the video
  if (video.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to update this video");
  }

  const updatedVideo = await Resource.findByIdAndUpdate(videoId, req.body, {
    new: true,
  });
  return res
    .status(200)
    .json(ApiResponse.success("Video updated successfully", updatedVideo));
});

export { getAllVideos, createVideo, deleteVideoById, updateVideoById };
