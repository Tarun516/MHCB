// controllers/authController.js
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  //get user details from the frontend
  const { fullname, email, username, password, age, smoke, mobile } = req.body;
  //validation - not empty
  if (
    [fullname, email, username, password, age, smoke, mobile].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are compulsory");
  }

  //check if user already exists
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
    //maybe if the username is already taken even if the email is unique or vice versa,so we can check for both in the same.
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exits");
  }

  //upload them to cloudinary,profile pic
  const profilepicLocalPath = req.files?.profilepic[0]?.path;
  const profilepic = await uploadOnCloudinary(profilepicLocalPath);

  //create user object - create entry in db
  const user = await User.create({
    fullname,
    profilepic: profilepic?.url || "",
    email,
    password,
    username: username.toLowerCase(),
    age,
    smoke,
    mobile,
  });

  //remove password and refresh token field from response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //check for user creation
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  //return res
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered succesfully!"));
});

const loginUser = asyncHandler(async (req, res) => {
  //req body -> data
  const { email, username, password } = req.body;

  //username or email
  if (!email || username) {
    throw new ApiError(400, "Username or password is required");
  }

  //find the user
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  //password check
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  //access and refresh token
  const { accessToken, refreshToken } = await generateRefreshToken(user._id);

  //send cookies
  return res
    .status(200)
    .cookie("accessToken", accessToken)
    .cookie("refreshToken", refreshToken)
    .json(new ApiResponse(200, "User Loggedin Succesfully"));
});

const logoutUser = as
export { registerUser, loginUser };
