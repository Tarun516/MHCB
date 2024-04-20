import mongoose, { Schema } from "mongoose";

const resourceSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["Article", "Video"],
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: () => {
        if (this.type === "Video") return true;
      },
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: () => {
        if (this.type === "Article") return true;
      },
    },
    videoId: {
      type: String,
      required: () => {
        return this.type === "Video";
      },
      unique: true,
    },
    articleId: {
      type: String,
      required: () => {
        return this.type === "Article";
      },
      unique: true,
    },
  },
  { timestamps: true }
);

export const Resource = mongoose.model("Resource", resourceSchema);
