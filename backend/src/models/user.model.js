import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Define the schema for the user collection
const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    username: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    mobile: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    preferences: { type: String },
    profilepic: {
      type: String, // cloudinary url
    },
    smoke: {
      type: String,
      enum: ["yes", "no"],
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
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
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
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
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

// Create and export the User model
export const User = mongoose.model("User", userSchema);
