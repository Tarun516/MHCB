import mongoose, { Schema } from "mongoose";

const emergencyContactSchema = new Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String},
    description: { type: String },
  },
  { timestamps: true }
);

export const Contact = mongoose.model("Contact", emergencyContactSchema);
