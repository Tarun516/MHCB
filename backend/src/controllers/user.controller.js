import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

let loggedInUser = false;

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Something went wrong");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  //get user details from the frontend
  const {
    fullname,
    email,
    username,
    password,
    age,
    smoke,
    mobile,
    gender,
    userId,
  } = req.body;
  //validation - not empty
  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
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
  const profilePic = await uploadOnCloudinary(profilepicLocalPath);

  //create user object - create entry in db
  const user = await User.create({
    fullname,
    profilepic: profilePic?.url || "",
    email,
    password,
    username: username.toLowerCase(),
    age,
    gender,
    smoke,
    mobile,
    userId,
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
  if (!(email || username)) {
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
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  loggedInUser = true;

  //send cookies
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      user: (loggedInUser = true),
      accessToken,
      refreshToken,
      message: "User logged In Successfully",
    });
});

const logoutUser = asyncHandler(async (req, res) => {
  try {
    // Revoke refresh token by setting it to undefined in the database
    await User.findByIdAndUpdate(
      req.user._id,
      { refreshToken: undefined },
      { new: true }
    );

    // Clear user authentication status in the session
    req.session.isLoggedIn = false;

    // Configure options for clearing cookies
    const options = {
      httpOnly: true,
      secure: true, // Set to true if using HTTPS
    };

    // Clear access and refresh tokens from cookies and send response
    res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorizd request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invald refresf token ");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      // secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const checkLoginStatus = asyncHandler(async (req, res) => {
  try {
    // Check if the session exists and contains loggedInUser

    req.session && req.session.loggedInUser ? req.session.loggedInUser : false;
    console.log(loggedInUser);
    console.log("User login status checked successfully.");
    res.status(200).json({ loggedInUser });
  } catch (error) {
    console.error("Error checking login status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  checkLoginStatus,
  getCurrentUser,
};
