import React, { useState } from "react";
import Navbar from "./Navbar";
const Feedback = () => {
  const [user, setUser] = useState("");
  const [chatbotRating, setChatbotRating] = useState(0);
  const [comment, setComment] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFeedback = {
      _id: Math.random(),
      user: user,
      chatbotrating: chatbotRating,
      comment: comment,
      createdAt: new Date(),
    };
    setFeedbackList([...feedbackList, newFeedback]);
    setUser("");
    setChatbotRating(0);
    setComment("");
  };

  return (
    <>
    <header>
      <Navbar/>
    </header>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", minHeight: "100vh" }}>
      <header style={{ width: "100%", textAlign: "center", backgroundColor: "#007bff", color: "white", padding: "10px" }}>
        <h1>Feedback</h1>
      </header>
      <br/>
      <br/>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <label style={{ marginBottom: "10px", width: "100%", display: "flex", alignItems: "center" }}>
            Chatbot Rating:
            <div style={{ display: "flex" }}>
              {[1, 2, 3, 4, 5].map((rating) => (
                <label key={rating} style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", marginRight: "10px" }} onClick={() => setChatbotRating(rating)}>
                  <input type="checkbox" style={{ display: "none" }} />
                  <span style={{ fontSize: "0.8rem", marginBottom: "5px" }}>{rating}</span>
                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", border: "1px solid #ccc", backgroundColor: chatbotRating >= rating ? "#007bff" : "transparent" }}></span>
                </label>
              ))}
            </div>
          </label>
          <br/>
          <label style={{ marginBottom: "10px", width: "100%" }}>
            Comment:
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} style={{ width: "100%", padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }} />
          </label>
          <button type="submit" style={{ backgroundColor: "black", color: "white", padding: "10px 20px", borderRadius: "5px", border: "none", cursor: "pointer" }}>Submit Feedback</button>
          
        </form>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px", width: "100%", maxWidth: "800px" }}>
        {feedbackList.map((feedback) => (
          <div key={feedback._id} style={{ backgroundColor: "#f0f0f0", padding: "20px", borderRadius: "10px" }}>
            <div style={{ fontWeight: "bold" }}>{feedback.user}</div>
            <div style={{ marginTop: "10px" }}>Rating: {feedback.chatbotrating}</div>
            <div style={{ marginTop: "10px" }}>Comment: {feedback.comment}</div>
            <div style={{ marginTop: "10px", fontSize: "0.8rem", color: "#777" }}>Timestamp: {new Date(feedback.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>
      <button onClick={fetchOtherFeedbacks} style={{ backgroundColor: "#007bff", color: "white", padding: "10px 20px", borderRadius: "5px", border: "none", cursor: "pointer", marginTop: "20px" }}>Fetch Feedback from Others</button>
    </div>
    </>
  );
};

export default Feedback;
