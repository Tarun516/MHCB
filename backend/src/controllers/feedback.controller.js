import { Feedback } from "../models/feedback.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addFeedback = asyncHandler(async (req, res) => {
  const newFeedback = new Feedback({
    user: req.user._id,
    chatbotrating: req.body.chatbotrating,
    comment: req.body.comment,
  });

  await newFeedback.save();
  return res
    .status(200)
    .json(ApiResponse.succes("The feedback has been submitted", newFeedback));
});

export { addFeedback };
