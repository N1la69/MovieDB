import express from "express";
import {
  addMovie,
  deleteMovie,
  getAllMovies,
  getMoviesByYear,
  searchMovieOMDB,
  updateMovie,
} from "../controllers/movieController";

const router = express.Router();

router.get("/", getAllMovies);
router.get("/search-omdb", searchMovieOMDB);
router.post("/add", addMovie);

router.get("/:yearId", getMoviesByYear);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

export default router;
