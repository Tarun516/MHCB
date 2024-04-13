import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Define the schema for the user collection
const userSchema = new Schema(
  {
    // User's full name
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    // User's username
    username: {
      type: String,
      required: true,
      trim: true,
    },
    // User's email (unique)
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    // User's mobile number
    mobile: {
      type: String,
      required: true,
    },
    profilepic: {
      type: String, // cloudinary url
    },
    // Whether the user smokes or not
    smoke: {
      type: String,
      enum: ["yes", "no"],
      required: true,
    },
    // User's age
    age: {
      type: Number,
      required: true,
    },
    // User's password (hashed)
    password: {
      type: String,
      required: true,
    },
    // User's refresh token (used for token refreshing)
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// Middleware to hash the password before saving to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare entered password with stored hashed password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to generate an access token for the user
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      // Payload
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET, // Secret key for signing the token
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY, // Expiry time for the token
    }
  );
};

// Method to generate a refresh token for the user
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      // Payload
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.REFRESH_TOKEN_SECRET, // Secret key for signing the token
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY, // Expiry time for the token
    }
  );
};

// Create and export the User model
export const User = mongoose.model("User", userSchema);
