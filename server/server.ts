import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";

import authRoutes from "./routes/authRoutes";
import movieRoutes from "./routes/movieRoutes";
import collectionRoutes from "./routes/collectionRoutes";
import yearRoutes from "./routes/yearRoutes";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/movies/collections", collectionRoutes);
app.use("/api/movies/collections/years", yearRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
