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
        return this.type === "Video" || this.type == "Article";
      },
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
    },
    articleId: {
      type: Number,
      required: () => {
        return this.type === "Article";
      },
    },

    videoId: {
      type: Number,
      required: () => {
        return this.type === "Video";
      },
    },

    tag: {
      type: String,
      enum: ["General", "Stress and Anxiety", "Sleep", "Depression"],
      required: true,
    },
  },
  { timestamps: true }
);

export const Resource = mongoose.model("Resource", resourceSchema);
