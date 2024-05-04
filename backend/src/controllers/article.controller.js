import { Resource } from "../models/resouce.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"; // Import the uploadOnCloudinary utility

// Controller to fetch all articles
const getAllArticles = asyncHandler(async (req, res) => {
  const articles = await Resource.find({ type: "Article" }).populate("user");
  return res.status(200).json(articles);
});

// Controller to create a new article
const createArticle = asyncHandler(async (req, res) => {
  const { title, content, image, author, url, tag, articleId } = req.body;

  // Check if both image URL and external URL are provided
  if (!url) {
    throw new ApiError(400, "Provide url to the resource");
  }
  // If imageUrl is provided, upload image to Cloudinary
  let Image;
  if (image) {
    Image = await uploadOnCloudinary(image);
  }

  // Create a new resource entry for the article
  const newArticle = new Resource({
    user: req.user._id,
    type: "Article",
    title,
    content,
    author,
    url,
    articleId,
    tag,
    image: Image ? Image.secure_url : undefined,
  });

  await newArticle.save();
  return res
    .status(201)
    .json(ApiResponse.success("Article created successfully", newArticle));
});

// Controller to delete an article by ID
const deleteArticleById = asyncHandler(async (req, res) => {
  const { articleId } = req.params;
  const article = await Resource.findById(articleId);
  if (!article) {
    throw new ApiError(404, "Article not found");
  }

  // Check if the logged-in user is the owner of the article
  if (article.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this article");
  }

  await Resource.findByIdAndDelete(articleId);
  return res
    .status(200)
    .json(ApiResponse.success("Article deleted successfully"));
});

// Controller to update an article by ID
const updateArticleById = asyncHandler(async (req, res) => {
  const { articleId } = req.params;
  const { title, content, image } = req.body;

  const article = await Resource.findById(articleId);
  if (!article) {
    throw new ApiError(404, "Article not found");
  }

  // Check if the logged-in user is the owner of the article
  if (article.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to update this article");
  }

  // If imageUrl is provided, upload image to Cloudinary
  let Image;
  if (image) {
    Image = await uploadOnCloudinary(imageUrl);
  }

  // Update article fields
  article.title = title;
  article.content = content;
  article.image = image;
  article.url = url;

  await article.save();
  return res
    .status(200)
    .json(ApiResponse.success("Article updated successfully", article));
});

export { getAllArticles, createArticle, deleteArticleById, updateArticleById };
