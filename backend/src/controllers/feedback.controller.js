import { Feedback } from "../models/feedback.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addFeedback = asyncHandler(async (req, res) => {
  const { user, chatbotrating, comment } = req.body;

  if (!user || !chatbotrating || !comment) {
    return res.status(400).json({ message: "Incomplete feedback data" });
  }

  const newFeedback = new Feedback({
    user: req.user._id,
    chatbotrating: chatbotrating,
    comment: comment,
  });

  await newFeedback.save();
  return res
    .status(200)
    .json(ApiResponse.succes("The feedback has been submitted", newFeedback));
});

export { addFeedback };
