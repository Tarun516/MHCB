import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "25kb",
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Import routes
import userRouter from "./routes/user.routes.js";
import videoRouter from "./routes/video.routes.js";
import articleRouter from "./routes/article.routes.js";
import contactRouter from "./routes/emergencycontact.routes.js";
import feedbackRouter from "./routes/feedback.routes.js";
import webhookRouter from "./routes/webhook.routes.js";

app.use("/api/v1/users", userRouter);

// Use video routes
app.use("/api/v1/videos", videoRouter);

// Use article routes
app.use("/api/v1/articles", articleRouter);

// Use emergency contacts routes
app.use("/api/v1/emergency-contacts", contactRouter);

// Use feedback routes
app.use("/api/v1/feedback", feedbackRouter);

app.use("/webhook", webhookRouter);

app.get("/", (req, res) => {
  // Send "Hello" as response
  res.send("Hello");
});

export { app };
