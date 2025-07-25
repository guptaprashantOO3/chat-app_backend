import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import routes
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";

// Import socket server (which provides both `app` and `server`)
import { app, server } from "./SocketIO/server.js";

// Load environment variables from .env file
dotenv.config();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "https://chat-app-frontend-nu-flax.vercel.app", // ✅ exact frontend domain
    credentials: true, // ✅ allow cookies
  }));

// Read environment variables
const PORT = process.env.PORT || 3001;
const URI = process.env.MONGO_URL; // ✅ Use correct variable name

// Connect to MongoDB
mongoose
  .connect(URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// API Routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

// Start the server
server.listen(PORT, () => {
  console.log(`🚀 Server is Running on port ${PORT}`);
});
