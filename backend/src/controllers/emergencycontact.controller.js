import { Contact } from "../models/emergencycontacts.model";
import { ApiError } from "../utils/ApiError.js";

const getAllEmergencyContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    return res.status(200).json(contacts);
  } catch (error) {
    new ApiError(404, "No contacts were found");
  }
};

export { getAllEmergencyContacts };
