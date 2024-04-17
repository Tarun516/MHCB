import mongoose, { Schema } from "mongoose";

const resourceSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["article", "video"],
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    coverimage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Resource = mongoose.model("Resource", resourceSchema);
