import mongoose, { Schema } from "mongoose";

const emergencyContactSchema = new Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export const Contact = mongoose.model("Contact", emergencyContactSchema);
