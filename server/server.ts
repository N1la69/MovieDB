import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";

// Load environment variables
dotenv.config();

// Initialize MongoDB connection
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
