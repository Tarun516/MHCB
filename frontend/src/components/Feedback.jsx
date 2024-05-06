import React, { useState } from "react";
import Navbar from "./Navbar";

const Feedback = () => {
  const [user, setUser] = useState("");
  const [chatbotRating, setChatbotRating] = useState(0);
  const [comment, setComment] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFeedback = {
      user: user,
      chatbotrating: chatbotRating,
      comment: comment,
      createdAt: new Date(),
    };

    // Send the feedback data to the backend
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/feedback/add-feedback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newFeedback),
        }
      );

      if (response.ok) {
        // Add the feedback to the local state if the request is successful
        const data = await response.json();
        setFeedbackList([...feedbackList, data]);
        setUser("");
        setChatbotRating(0);
        setComment("");
      } else {
        console.error("Failed to submit feedback");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="flex flex-col items-center  min-h-screen justify-center">
        <div className="w-full max-w-md mt-5 flex flex-col  ">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label htmlFor="chatbotRating">Chatbot Rating:</label>
            <select
              id="chatbotRating"
              value={chatbotRating}
              onChange={(e) => setChatbotRating(e.target.value)}
              className="border-2 rounded p-2"
            >
              {[1, 2, 3, 4, 5].map((rating) => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </select>

            <label htmlFor="comment" className="text-black p-2">
              Comment:
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border rounded p-2"
            />

            <button
              type="submit"
              className="bg-black text-white py-2 px-4 rounded cursor-pointer"
            >
              Submit Feedback
            </button>
          </form>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-3xl mt-8">
          {feedbackList.map((feedback) => (
            <div key={feedback._id} className="bg-gray-200 p-4 rounded">
              <div className="font-bold">{feedback.user}</div>
              <div className="mt-2">Rating: {feedback.chatbotrating}</div>
              <div className="mt-2">Comment: {feedback.comment}</div>
              <div className="mt-2 text-sm text-gray-700">
                Timestamp: {new Date(feedback.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Feedback;
