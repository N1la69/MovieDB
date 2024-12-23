import express from "express";
import {
  addMovie,
  deleteMovie,
  getAllMovies,
  getMoviesByYear,
  updateMovie,
} from "../controllers/movieController";

const router = express.Router();

router.get("/", getAllMovies);
router.get("/:yearId", getMoviesByYear);
router.post("/add", addMovie);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

export default router;
