import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB and start server
const PORT = process.env.PORT;

connectDB()
  .then(() => {
    console.log(`✅ MongoDB Connected!`);
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });

// Optional test route
app.get("/", (req, res) => {
  res.send("🏨 Hotel Management API is running...");
});
