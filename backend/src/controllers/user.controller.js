// controllers/authController.js
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  //get user details from the frontend

  //check if user already exists
  //upload them to cloudinary,avatar
  //create user object - create entry in db
  //remove password and refresh token field from response
  //check for user creation
  //return res

  const { fullname, username, email, password } = req.body;
  console.log("email", email);
  //validation - not empty
  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are compulsory");
  }

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
    //maybe if the username is already taken even if the email is unique or vice versa,so we can check for both in the same.
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exits");
  }

  const profilepicLocalPath = req.files?.profilepic[0]?.path;

  const profilepic = await uploadOnCloudinary(profilepicLocalPath);

  const user = await User.create({
    fullname,
    profilepic: profilepic?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered succesfully!"));
});

export { registerUser };
