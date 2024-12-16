import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";

import authRoutes from "./routes/authRoutes";

// Load environment variables
dotenv.config();

// Initialize MongoDB connection
connectDB();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/api/auth", authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
