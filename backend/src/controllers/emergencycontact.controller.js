import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Contact } from "../models/emergencycontact.model.js";

const getAllEmergencyContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  if (!contacts || contacts.length === 0) {
    throw new ApiError(404, "No contacts were found");
  }
  res.status(200).json(contacts);
});

export { getAllEmergencyContacts };
